const request = require("supertest");
const sequelize = require("../../src/config/database");
const app = require("../../src/app");
const User = require("../../src/models/User");
const jwt = require("jsonwebtoken");
const Month = require("../../src/models/Month");
const MonthlyPlayer = require("../../src/models/MonthlyPlayer");


describe("Lineup Endpoints", () => {
    beforeEach(async ()=> {
        await Month.destroy({ where: {} });
        await User.destroy({where: {} });
        await MonthlyPlayer.destroy({where: {}});
    });

    describe("POST /api/lineups/me", () => {
        let token;
        let players;
        let month;

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
        

            // Création mois pour le test
            month = await Month.create({
                label: "Janvier 2026",
                start_date: "2026-01-01",
                end_date: "2026-01-31",
                publish_date: "2025-12-31",
                status: "open",
            });
        });

        it("Crée le lineup comportant 5 joueurs de 5 postes différents", async () => {
            players = await MonthlyPlayer.bulkCreate([
                { fullname: "P1", position: "PG", team_name: "Team", pts: 30, ast: 8, reb: 6, month_id: month.id },
                { fullname: "P2", position: "SG", team_name: "Team", pts: 28, ast: 6, reb: 4, month_id: month.id },
                { fullname: "P3", position: "SF", team_name: "Team", pts: 26, ast: 7, reb: 8, month_id: month.id },
                { fullname: "P4", position: "PF", team_name: "Team", pts: 29, ast: 6, reb: 11, month_id: month.id },
                { fullname: "P5", position: "C", team_name: "Team", pts: 27, ast: 9, reb: 12, month_id: month.id },
            ]);

            const res = await request(app)
                .post("/api/lineups/me")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    picks: players.map(p => ({
                    playerId: p.id,
                    predicted_pts: 20,
                    predicted_ast: 5,
                    predicted_reb: 7,
                }))
            });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.MonthlyPlayers.length).toBe(5);

            const positions = res.body.data.MonthlyPlayers.map(p => p.position);
            expect(new Set(positions).size).toBe(5);
        });

        // Test si + ou - de 5 joueurs
        it("Refuse la création si plus ou moins de 5 joueurs", async () => {
            players = await MonthlyPlayer.bulkCreate([
                { fullname: "P1", position: "PG", team_name: "Team", pts: 30, ast: 8, reb: 6, month_id: month.id },
                { fullname: "P2", position: "SG", team_name: "Team", pts: 28, ast: 6, reb: 4, month_id: month.id },
                { fullname: "P3", position: "SF", team_name: "Team", pts: 26, ast: 7, reb: 8, month_id: month.id },
                { fullname: "P4", position: "PF", team_name: "Team", pts: 29, ast: 6, reb: 11, month_id: month.id },
                // Joueur manquant
            ]);

            const res = await request(app)
                .post("/api/lineups/me")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    picks: players.map(p => ({
                    playerId: p.id,
                    })),
                });
            
            expect(res.statusCode).toBe(400);
        });

        // Test si les 5 posts ne sont pas différents
        it("Refuse la création si les 5 postes ne sont pas différents", async () => {
           players = await MonthlyPlayer.bulkCreate([
                { fullname: "P1", position: "PG", team_name: "Team", pts: 30, ast: 8, reb: 6, month_id: month.id },
                { fullname: "P2", position: "SG", team_name: "Team", pts: 28, ast: 6, reb: 4, month_id: month.id },
                { fullname: "P3", position: "SF", team_name: "Team", pts: 26, ast: 7, reb: 8, month_id: month.id },
                { fullname: "P4", position: "PF", team_name: "Team", pts: 29, ast: 6, reb: 11, month_id: month.id },
                { fullname: "P5", position: "PF", team_name: "Team", pts: 27, ast: 9, reb: 12, month_id: month.id },
            ]);

            const res = await request(app)
                .post("/api/lineups/me")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    picks: players.map(p => ({
                    playerId: p.id,
                    })),
                });
            
            expect(res.statusCode).toBe(400);
        });

        // Test si une des prédiction est négative
         it("Crée le lineup comportant 5 joueurs de 5 postes différents", async () => {
            players = await MonthlyPlayer.bulkCreate([
                { fullname: "P1", position: "PG", team_name: "Team", pts: 30, ast: 8, reb: 6, month_id: month.id },
                { fullname: "P2", position: "SG", team_name: "Team", pts: 28, ast: 6, reb: 4, month_id: month.id },
                { fullname: "P3", position: "SF", team_name: "Team", pts: 26, ast: 7, reb: 8, month_id: month.id },
                { fullname: "P4", position: "PF", team_name: "Team", pts: 29, ast: 6, reb: 11, month_id: month.id },
                { fullname: "P5", position: "C", team_name: "Team", pts: 27, ast: 9, reb: 12, month_id: month.id },
            ]);

            const res = await request(app)
                .post("/api/lineups/me")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    picks: players.map(p => ({
                        playerId: p.id,
                        predicted_pts: 20,
                        predicted_ast: -5,
                        predicted_reb: 7,
                }))
            });

            expect(res.statusCode).toBe(400);
         });
    });


    // Test si utilisateur non connecté
    describe("POST /api/lineups/me", () => {
        it("Refuse la création si utilisateur non connecté", async () => {
            const res = await request(app)
                .post("/api/lineups/me")
                .send({
                    picks: [
                        { playerId: 1, predicted_pts: 20, predicted_ast: 5, predicted_reb: 7 }
                    ]
                });

            expect(res.statusCode).toBe(401);
        });
    });
});