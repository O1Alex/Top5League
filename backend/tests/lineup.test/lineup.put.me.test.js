const request = require("supertest");
const app = require("../../src/app");
const sequelize = require("../../src/config/database");

const User = require("../../src/models/User");
const Month = require("../../src/models/Month");
const MonthlyPlayer = require("../../src/models/MonthlyPlayer");
const Lineup = require("../../src/models/Lineup");
const LineupPlayer = require("../../src/models/LineupPlayer");

describe("Lineup Endpoints", () => {
    beforeEach(async () => {
        await LineupPlayer.destroy({ where: {} });
        await Lineup.destroy({ where: {} });
        await MonthlyPlayer.destroy({ where: {} });
        await Month.destroy({ where: {} });
        await User.destroy({ where: {} });
    });

    describe("PUT /api/lineups/me", () => {
        let token;
        let user;
        let month;
        let players;
        let lineup;

        beforeEach(async () => {
            // Création utilisateur
            const res = await request(app)
                .post("/api/auth/register")
                .send({
                    username: "user",
                    email: "user@example.com",
                    password: "UserPassword123",
                    favorite_player: "Jordan",
                });

            token = res.body.data.token;
            user = res.body.data.user;

            // Création du mois pour le test
            month = await Month.create({
                label: "Janvier 2026",
                start_date: "2026-01-01",
                end_date: "2026-01-31",
                publish_date: "2025-12-31",
                status: "open",
            });

            // Création des joueurs du mois
            players = await MonthlyPlayer.bulkCreate([
                { fullname: "P1", position: "PG", team_name: "Team", pts: 30, ast: 8, reb: 6, month_id: month.id },
                { fullname: "P2", position: "SG", team_name: "Team", pts: 28, ast: 6, reb: 4, month_id: month.id },
                { fullname: "P3", position: "SF", team_name: "Team", pts: 26, ast: 7, reb: 8, month_id: month.id },
                { fullname: "P4", position: "PF", team_name: "Team", pts: 29, ast: 6, reb: 11, month_id: month.id },
                { fullname: "P5", position: "C",  team_name: "Team", pts: 27, ast: 9, reb: 12, month_id: month.id },
            ]);

            // Création du lineup
            lineup = await Lineup.create({
                user_id: user.id,
                month_id: month.id,
            });

            // Création des LineupPlayers composant le Lineup

            await LineupPlayer.bulkCreate([
                { lineup_id: lineup.id, monthly_player_id: players[0].id, predicted_pts: 22, predicted_ast: 6, predicted_reb: 4 },
                { lineup_id: lineup.id,monthly_player_id: players[1].id, predicted_pts: 25, predicted_ast: 4, predicted_reb: 5 },
                { lineup_id: lineup.id, monthly_player_id: players[2].id, predicted_pts: 18, predicted_ast: 7, predicted_reb: 8 },
                { lineup_id: lineup.id, monthly_player_id: players[3].id, predicted_pts: 20, predicted_ast: 3, predicted_reb: 10 },
                { lineup_id: lineup.id, monthly_player_id: players[4].id, predicted_pts: 15, predicted_ast: 2, predicted_reb: 12 },
            ]);
        });

        // Test modification du lineup
        it("Modifie le Top 5 de l'utilisateur pour le mois en cours", async () => {
            const picks = [
                {
                    playerId: players[0].id,
                    predicted_pts: 30, //Valeur modifié pour le test
                    predicted_ast: 4, //Valeur modifié pour le test
                    predicted_reb: 8, //Valeur modifié pour le test
                },
                {
                    playerId: players[1].id,
                    predicted_pts: 25,
                    predicted_ast: 4,
                    predicted_reb: 5,
                },
                {
                    playerId: players[2].id,
                    predicted_pts: 18,
                    predicted_ast: 7,
                    predicted_reb: 8,
                },
                {
                    playerId: players[3].id,
                    predicted_pts: 20,
                    predicted_ast: 3,
                    predicted_reb: 10,
                },
                {
                    playerId: players[4].id,
                    predicted_pts: 15,
                    predicted_ast: 2,
                    predicted_reb: 12,
                },
            ];

            const res = await request(app)
                .put("/api/lineups/me")
                .set("Authorization", `Bearer ${token}`)
                .send({ picks });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);

            const playersReturned = res.body.data.MonthlyPlayers;
            expect(playersReturned.length).toBe(5);

            // Vérification que la MAJ a bien été appliquée
            const updatedPlayer = playersReturned.find(
                p => p.id === players[0].id
            );

            expect(updatedPlayer.LineupPlayer.predicted_pts).toBe(30);
            expect(updatedPlayer.LineupPlayer.predicted_ast).toBe(4);
            expect(updatedPlayer.LineupPlayer.predicted_reb).toBe(8);

            const positions = playersReturned.map(p => p.position);
            expect(new Set(positions).size).toBe(5);
        });


        // Test si pas de lineup
        it("Retourne 404 si aucun Top 5 n'existe pour le mois", async () => {
            await Lineup.destroy({ where: {} });

            const picks = players.map(p => ({
                playerId: p.id,
                predicted_pts: 20,
                predicted_ast: 5,
                predicted_reb: 7,
            }));

            const res = await request(app)
                .put("/api/lineups/me")
                .set("Authorization", `Bearer ${token}`)
                .send({ picks })

            expect(res.statusCode).toBe(404);
        });


        // Test si une des prédiction est négative
        it("Ne modifie pas le lineup puisqu'une valeur est négative", async () => {
            const picks = [
                {
                    playerId: players[0].id,
                    predicted_pts: -30, //Valeur modifié pour le test
                    predicted_ast: 4, 
                    predicted_reb: 8, 
                },
                {
                    playerId: players[1].id,
                    predicted_pts: 25,
                    predicted_ast: 4,
                    predicted_reb: 5,
                },
                {
                    playerId: players[2].id,
                    predicted_pts: 18,
                    predicted_ast: 7,
                    predicted_reb: 8,
                },
                {
                    playerId: players[3].id,
                    predicted_pts: 20,
                    predicted_ast: 3,
                    predicted_reb: 10,
                },
                {
                    playerId: players[4].id,
                    predicted_pts: 15,
                    predicted_ast: 2,
                    predicted_reb: 12,
                }
            ];

            const res = await request(app)
                .put("/api/lineups/me")
                .set("Authorization", `Bearer ${token}`)
                .send({ picks })

            expect(res.statusCode).toBe(400);    
            
        });
    });



    // Test si utilisateur non connecté
    describe("PUT /api/lineups/me", () => {
        it("Refuse l'accès si utilisateur non connecté", async () => {
            const res = await request(app)
                .put("/api/lineups/me")
                .send({ picks: [] });

            expect(res.statusCode).toBe(401);
        });
    });
});