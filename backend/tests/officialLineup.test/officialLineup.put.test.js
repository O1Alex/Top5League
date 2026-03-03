const request = require("supertest");
const sequelize = require("../../src/config/database");
const app = require("../../src/app");
const User = require("../../src/models/User");
const jwt = require("jsonwebtoken");
const Month = require("../../src/models/Month");
const MonthlyPlayer = require("../../src/models/MonthlyPlayer");
const OfficialLineup = require("../../src/models/OfficialLineup");
const OfficialLineupPlayer = require("../../src/models/OfficialLineupPlayer");
const LineupService = require("../../src/services/lineupService");



describe("OfficialLineup Endpoints", () => {
    beforeEach (async () => {
        await OfficialLineupPlayer.destroy({ where: {} });
        await OfficialLineup.destroy({ where: {} });
        await MonthlyPlayer.destroy({ where: {} });
        await Month.destroy({ where: {} });
        await User.destroy({ where: {} });
    });
    
    describe("PUT /api/officialLineup/", () => {
        let token;
        let month;
        let players;

        beforeEach(async () => {
            
            // Création utilisateur
            await request(app)
                .post("/api/auth/register")
                .send({
                    username: "admin",
                    email: "admin@example.com",
                    password: "AdminPassword123",
                    favorite_player: "Jordan",
                });

            // Passage Admin
            const user = await User.findOne({
                where: { email: "admin@example.com" }
            });

            user.role = "admin";
            await user.save();

            token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            // Création du mois
            month = await Month.create({
                label: "Janvier 2026",
                start_date: "2026-01-01",
                end_date: "2026-01-31",
                publish_date: "2025-12-31",
                status: "open",
            });
        });


        // Test modification du Top 5 officiel du mois
        it("Crée le OfficialLineup du mois en cours", async () => {

            // Création des joueurs
            players = await MonthlyPlayer.bulkCreate([
                { fullname: "P1", position: "PG", team_name: "Team", pts: 30, ast: 8, reb: 6, month_id: month.id },
                { fullname: "P2", position: "SG", team_name: "Team", pts: 28, ast: 6, reb: 4, month_id: month.id },
                { fullname: "P3", position: "SF", team_name: "Team", pts: 26, ast: 7, reb: 8, month_id: month.id },
                { fullname: "P4", position: "PF", team_name: "Team", pts: 29, ast: 6, reb: 11, month_id: month.id },
                { fullname: "P5", position: "C",  team_name: "Team", pts: 27, ast: 9, reb: 12, month_id: month.id },
            ]);

            const res = await request(app)
                .put("/api/officialLineup/")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    picks: players.map(p => ({
                        playerId: p.id,
                        pts: 30,
                        ast: 5,
                        reb: 8
                    }))
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);

            const returnedPlayers = res.body.data.MonthlyPlayers;
            expect(returnedPlayers.length).toBe(5);

            returnedPlayers.forEach(p => {
                expect(p.OfficialLineupPlayer).toHaveProperty("pts");
                expect(p.OfficialLineupPlayer).toHaveProperty("ast");
                expect(p.OfficialLineupPlayer).toHaveProperty("reb");
            });

            const positions = returnedPlayers.map(p => p.position);
            expect(new Set(positions).size).toBe(5);
        });


        // // Test si + ou - de 5 joueurs
        // it("Refuse la modification si plus ou moins de 5 joueurs", async () => {
        //     // Création des joueurs
        //     players = await MonthlyPlayer.bulkCreate([
        //         { fullname: "P1", position: "PG", team_name: "Team", pts: 30, ast: 8, reb: 6, month_id: month.id },
        //         { fullname: "P2", position: "SG", team_name: "Team", pts: 28, ast: 6, reb: 4, month_id: month.id },
        //         { fullname: "P3", position: "SF", team_name: "Team", pts: 26, ast: 7, reb: 8, month_id: month.id },
        //         { fullname: "P4", position: "PF", team_name: "Team", pts: 29, ast: 6, reb: 11, month_id: month.id },
        //         { fullname: "P5", position: "C",  team_name: "Team", pts: 27, ast: 9, reb: 12, month_id: month.id },
        //     ]);

        //     const res = await request(app)
        //         .put("/api/officialLineup/")
        //         .set("Authorization", `Bearer ${token}`)
        //         .send({
        //             picks: players.map(p => ({
        //                 playerId: p.id,
        //                 pts: 30,
        //                 ast: 5,
        //                 reb: 8
        //             }))
        //         });

        //     expect(res.statusCode).toBe(400);
            
        // });


        // Test si une des prédiction est négative
        it("Refuse la cmodification si une statistique est négative", async () => {
            const players = await MonthlyPlayer.bulkCreate([
                { fullname: "P1", position: "PG", team_name: "Team", pts: 30, ast: 8, reb: 6, month_id: month.id },
                { fullname: "P2", position: "SG", team_name: "Team", pts: 28, ast: 6, reb: 4, month_id: month.id },
                { fullname: "P3", position: "SF", team_name: "Team", pts: 26, ast: 7, reb: 8, month_id: month.id },
                { fullname: "P4", position: "PF", team_name: "Team", pts: 29, ast: 6, reb: 11, month_id: month.id },
                { fullname: "P5", position: "C", team_name: "Team", pts: 27, ast: 9, reb: 12, month_id: month.id },
            ]);

            const res = await request(app)
                .put("/api/officialLineup/")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    picks: players.map(p => ({
                        playerId: p.id,
                        pts: 20,
                        ast: -5,
                        reb: 7,
                }))
            });

            expect(res.statusCode).toBe(400);
        });

        // Test si les 5 posts ne sont pas différents
        it("Refuse la modification si les 5 postes ne sont pas différents", async () => {
           players = await MonthlyPlayer.bulkCreate([
                { fullname: "P1", position: "PG", team_name: "Team", pts: 30, ast: 8, reb: 6, month_id: month.id },
                { fullname: "P2", position: "SG", team_name: "Team", pts: 28, ast: 6, reb: 4, month_id: month.id },
                { fullname: "P3", position: "SF", team_name: "Team", pts: 26, ast: 7, reb: 8, month_id: month.id },
                { fullname: "P4", position: "PF", team_name: "Team", pts: 29, ast: 6, reb: 11, month_id: month.id },
                { fullname: "P5", position: "PF", team_name: "Team", pts: 27, ast: 9, reb: 12, month_id: month.id },
            ]);

            const res = await request(app)
                .put("/api/officialLineup/")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    picks: players.map(p => ({
                    playerId: p.id,
                    })),
                });
            
            expect(res.statusCode).toBe(400);
        });
    });


    // Test si non administrateur
    describe("PUT /api/officialLineup/", () => {
        let token;
        let month;
        let players;

        beforeEach(async () => {
            // Création utilisateur simple (non admin)
            await request(app)
                .put("/api/auth/register")
                .send({
                    username: "user",
                    email: "user@example.com",
                    password: "UserPassword123",
                    favorite_player: "Kobe",
                });

            const normalUser = await User.findOne({
                where: { email: "user@example.com" }
            });

            token = jwt.sign(
                { id: normalUser.id, role: normalUser.role }, // role = "user"
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

             // Création du mois
            month = await Month.create({
                label: "Janvier 2026",
                start_date: "2026-01-01",
                end_date: "2026-01-31",
                publish_date: "2025-12-31",
                status: "open",
            });

            players = await MonthlyPlayer.bulkCreate([
                { fullname: "P1", position: "PG", team_name: "Team", pts: 30, ast: 8, reb: 6, month_id: month.id },
                { fullname: "P2", position: "SG", team_name: "Team", pts: 28, ast: 6, reb: 4, month_id: month.id },
                { fullname: "P3", position: "SF", team_name: "Team", pts: 26, ast: 7, reb: 8, month_id: month.id },
                { fullname: "P4", position: "PF", team_name: "Team", pts: 29, ast: 6, reb: 11, month_id: month.id },
                { fullname: "P5", position: "C",  team_name: "Team", pts: 27, ast: 9, reb: 12, month_id: month.id },
            ]);
        });

        it("Refuse la modification si l'utilisateur n'est pas admin", async () => {
            const res = await request(app)
                .put("/api/officialLineup/")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    picks: players.map(p => ({
                        playerId: p.id,
                        pts: 20,
                        ast: 5,
                        reb: 7
                    }))
                });

            expect(res.statusCode).toBe(403);
        });
    });
});