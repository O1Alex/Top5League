const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../src/app");

const User = require("../../src/models/User");
const Month = require("../../src/models/Month");
const MonthlyPlayer = require("../../src/models/MonthlyPlayer");
const OfficialLineup = require("../../src/models/OfficialLineup");
const OfficialLineupPlayer = require("../../src/models/OfficialLineupPlayer");
const Lineup = require("../../src/models/Lineup");
const LineupPlayer = require("../../src/models/LineupPlayer");
const Winner = require("../../src/models/Winner");
const winnerService = require("../../src/services/winnerService");


describe("GET /api/winner/lineup", () => {
    beforeEach(async () => {
        await Winner.destroy({ where: {} });
        await LineupPlayer.destroy({ where: {} });
        await Lineup.destroy({ where: {} });
        await OfficialLineupPlayer.destroy({ where: {} });
        await OfficialLineup.destroy({ where: {} });
        await MonthlyPlayer.destroy({ where: {} });
        await Month.destroy({ where: {} });
        await User.destroy({ where: {} });
    });

    let month;
    let players;
    let user1;
    let user2;

    beforeEach(async () => {

        // Création utilisateur 1
        user1 = await User.create({
            username: "user1",
            email: "user1@test.com",
            password: "Password123",
            favorite_player: "Kobe"
        });

        //  Création utilisateur 2
        user2 = await User.create({
            username: "user2",
            email: "user2@test.com",
            password: "Password123",
            favorite_player: "LeBron"
        });

        // Création mois pour le test 
        month = await Month.create({
            label: "Test Month",
            start_date: "2026-01-01",
            end_date: "2026-01-31",
            publish_date: "2026-02-01",
            status: "closed",
        });

        // Création des joueurs
        players = await MonthlyPlayer.bulkCreate([
            { fullname: "P1", position: "PG", team_name: "Team", pts: 30, ast: 8, reb: 6, month_id: month.id },
            { fullname: "P2", position: "SG", team_name: "Team", pts: 25, ast: 5, reb: 4, month_id: month.id },
            { fullname: "P3", position: "SF", team_name: "Team", pts: 20, ast: 6, reb: 7, month_id: month.id },
            { fullname: "P4", position: "PF", team_name: "Team", pts: 18, ast: 4, reb: 10, month_id: month.id },
            { fullname: "P5", position: "C",  team_name: "Team", pts: 22, ast: 3, reb: 12, month_id: month.id },
        ]);

        players = await MonthlyPlayer.findAll({
            where: { month_id: month.id }
        });

        // Création du Top 5 Officiel
        const officialLineup = await OfficialLineup.create({
            month_id: month.id
        });

        // Création des joueurs du Top 5 Officiel
        await OfficialLineupPlayer.bulkCreate(players.map(p => ({
            official_lineup_id: officialLineup.id,
            monthly_player_id: p.id,
            pts: p.pts,
            ast: p.ast,
            reb: p.reb
        })));


        // Lineup du joueur 1 (meilleur)
        const lineup1 = await Lineup.create({
            user_id: user1.id,
            month_id: month.id
        });

        // Prédiction des stats
        const predictionsUser1 = [
            { player: players[0], pts: 30, ast: 8, reb: 6 },
            { player: players[1], pts: 25, ast: 5, reb: 4 },
            { player: players[2], pts: 20, ast: 6, reb: 7 },
            { player: players[3], pts: 18, ast: 4, reb: 10 },
            { player: players[4], pts: 22, ast: 3, reb: 12 },
        ];

        await LineupPlayer.bulkCreate(
            predictionsUser1.map(p => ({
                lineup_id: lineup1.id,
                monthly_player_id: p.player.id,
                predicted_pts: p.pts,
                predicted_ast: p.ast,
                predicted_reb: p.reb
            }))
        );

        // Lineup du joueur 2 (moins bon)
        const lineup2 = await Lineup.create({
            user_id: user2.id,
            month_id: month.id
        });

        // Prédiction
        const predictionsUser2 = [
            { player: players[0], pts: 40, ast: 10, reb: 8 },
            { player: players[1], pts: 35, ast: 7, reb: 6 },
            { player: players[2], pts: 28, ast: 9, reb: 10 },
            { player: players[3], pts: 26, ast: 6, reb: 14 },
            { player: players[4], pts: 30, ast: 5, reb: 15 },
        ];

       await LineupPlayer.bulkCreate(
            predictionsUser2.map(p => ({
                lineup_id: lineup2.id,
                monthly_player_id: p.player.id,
                predicted_pts: p.pts,
                predicted_ast: p.ast,
                predicted_reb: p.reb
            }))
        );

    });


    // Test récupération lineup gagnant du mois
    it("Récupère le lineup du gagnant du mois", async () => {
        await winnerService.computeWinner(month.id);

        const res = await request(app)
            .get(`/api/winner/lineup`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);

        expect(res.body.data).toBeDefined();
    });

    // Test pas de gagnant du mois
    it("Retourne 404 si aucun winner n'existe", async () => {

        const res = await request(app)
            .get("/api/winner/lineup");

        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
    });

});