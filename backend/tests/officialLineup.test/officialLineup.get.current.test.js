const request = require("supertest");
const sequelize = require("../../src/config/database");
const app = require("../../src/app");
const User = require("../../src/models/User");
const jwt = require("jsonwebtoken");
const Month = require("../../src/models/Month");
const MonthlyPlayer = require("../../src/models/MonthlyPlayer");
const OfficialLineup = require("../../src/models/OfficialLineup");
const OfficialLineupPlayer = require("../../src/models/OfficialLineupPlayer");



describe("OfficialLineup Endpoints", () => {
    beforeEach (async () => {
        await OfficialLineupPlayer.destroy({ where: {} });
        await OfficialLineup.destroy({ where: {} });
        await MonthlyPlayer.destroy({ where: {} });
        await Month.destroy({ where: {} });
        await User.destroy({ where: {} });
    });
    
    describe("GET /api/officialLineup/current", () => {
        let month;
        let players;
        let officialLineup;

        beforeEach(async () => {

            // Création du mois
            month = await Month.create({
                label: "Janvier 2026",
                start_date: "2026-01-01",
                end_date: "2026-01-05",
                publish_date: "2026-01-31",
                status: "closed",
            });

            // Création des joueurs
            players = await MonthlyPlayer.bulkCreate([
                { fullname: "P1", position: "PG", team_name: "Team", pts: 30, ast: 8, reb: 6, month_id: month.id },
                { fullname: "P2", position: "SG", team_name: "Team", pts: 28, ast: 6, reb: 4, month_id: month.id },
                { fullname: "P3", position: "SF", team_name: "Team", pts: 26, ast: 7, reb: 8, month_id: month.id },
                { fullname: "P4", position: "PF", team_name: "Team", pts: 29, ast: 6, reb: 11, month_id: month.id },
                { fullname: "P5", position: "C",  team_name: "Team", pts: 27, ast: 9, reb: 12, month_id: month.id },
            ]);

            // Création du lineup officiel
            officialLineup = await OfficialLineup.create({
                month_id: month.id,
            });

            // Création des officialLineupPlayer qui composent l'officialLineup
           await OfficialLineupPlayer.bulkCreate([
                { official_lineup_id: officialLineup.id, monthly_player_id: players[0].id, pts: 22, ast: 6, reb: 4 },
                { official_lineup_id: officialLineup.id, monthly_player_id: players[1].id, pts: 25, ast: 4, reb: 5 },
                { official_lineup_id: officialLineup.id, monthly_player_id: players[2].id, pts: 18, ast: 7, reb: 8 },
                { official_lineup_id: officialLineup.id, monthly_player_id: players[3].id, pts: 20, ast: 3, reb: 10 },
                { official_lineup_id: officialLineup.id, monthly_player_id: players[4].id, pts: 15, ast: 2, reb: 12 },
            ]);
        });


       it("Retourne le OfficielLineup du mois", async () => {

            // Passage du mois en published
            await month.update({
                status: "published"
            });

            const res = await request(app)
                .get(`/api/officialLineup/current`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);

            expect(res.body.data).toHaveProperty("id");
            expect(res.body.data.MonthlyPlayers.length).toBe(5);

            res.body.data.MonthlyPlayers.forEach(player => {
                expect(player.OfficialLineupPlayer).toHaveProperty("pts");
                expect(player.OfficialLineupPlayer).toHaveProperty("ast");
                expect(player.OfficialLineupPlayer).toHaveProperty("reb");
            });
        });


        // Test si pas encore d'officialLineup
        it("Retourne 404 si aucun OfficialLineup n'existe pour le mois courant", async () => {

            // Passage du mois en published
            await month.update({
                status: "published"
            });
            await OfficialLineup.destroy({ where: {} });

            const res = await request(app)
                .get("/api/officialLineup/current");

            expect(res.statusCode).toBe(404);
            expect(res.body.success).toBe(false);
        });
    });
});