const request = require("supertest");
const app = require("../../src/app");
const sequelize = require("../../src/config/database");
const jwt = require("jsonwebtoken");


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

    describe("DELETE /api/lineups/:id", () => {
        let token;
        let monthId;
        let players;
        let lineupId;

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

            // Passage utilisateur en Admin
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

            // Création du mois pour le test
            const month = await Month.create({
                label: "Janvier 2026",
                start_date: "2026-01-01",
                end_date: "2026-01-31",
                publish_date: "2025-12-31",
                status: "open",
            });
            
            monthId = month.id;

            // Création des joueurs du mois
            players = await MonthlyPlayer.bulkCreate([
                { fullname: "P1", position: "PG", team_name: "Team", pts: 30, ast: 8, reb: 6, month_id: month.id },
                { fullname: "P2", position: "SG", team_name: "Team", pts: 28, ast: 6, reb: 4, month_id: month.id },
                { fullname: "P3", position: "SF", team_name: "Team", pts: 26, ast: 7, reb: 8, month_id: month.id },
                { fullname: "P4", position: "PF", team_name: "Team", pts: 29, ast: 6, reb: 11, month_id: month.id },
                { fullname: "P5", position: "C",  team_name: "Team", pts: 27, ast: 9, reb: 12, month_id: month.id },
            ]);

            // Création du lineup
            const lineup = await Lineup.create({
                user_id: user.id,
                month_id: month.id,
            });

            lineupId = lineup.id;

            // Création des LineupPlayers composant le Lineup
            await LineupPlayer.bulkCreate([
                { lineup_id: lineup.id, monthly_player_id: players[0].id, predicted_pts: 22, predicted_ast: 6, predicted_reb: 4 },
                { lineup_id: lineup.id,monthly_player_id: players[1].id, predicted_pts: 25, predicted_ast: 4, predicted_reb: 5 },
                { lineup_id: lineup.id, monthly_player_id: players[2].id, predicted_pts: 18, predicted_ast: 7, predicted_reb: 8 },
                { lineup_id: lineup.id, monthly_player_id: players[3].id, predicted_pts: 20, predicted_ast: 3, predicted_reb: 10 },
                { lineup_id: lineup.id, monthly_player_id: players[4].id, predicted_pts: 15, predicted_ast: 2, predicted_reb: 12 },
            ]);
        });

         // Test suppression lineup par id
        it("Doit supprimer le lineup sélectionné", async () => {
            const res = await request(app)
                .delete(`/api/lineups/${lineupId}`)
                .set("Authorization", `Bearer ${token}`)
        
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        });

        // Test si lineup inexistant
        it("Retourne 404 si aucun Top 5 n'existe pour le mois", async () => {
            await Lineup.destroy({ where: {} });

            const res = await request(app)
                .delete("/api/lineups/9999")
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(404);
            expect(res.body.success).toBe(false);
        });
    });


    // Test si non Admin
    describe("DELETE /api/lineups/:id", () => {
        let monthId;
        let players;
        let lineupId;
        let token;

        beforeEach(async () => {
            await request(app)
                .post("/api/auth/register")
                .send({
                    username: "admin",
                    email: "admin@example.com",
                    password: "AdminPassword123",
                    favorite_player: "Jordan",
                });
            // Passage utilisateur en Admin
            const user = await User.findOne({
                where: { email: "admin@example.com" }
            });

            // role = "user" par défaut → PAS admin
            token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

             // Création mois pour le test
            const month = await Month.create({
                label: "Janvier 2026",
                start_date: "2026-01-01",
                end_date: "2026-01-31",
                publish_date: "2025-12-31",
                status: "open",
            });

            monthId = month.id;

            // Création des joueurs du mois
            players = await MonthlyPlayer.bulkCreate([
                { fullname: "P1", position: "PG", team_name: "Team", pts: 30, ast: 8, reb: 6, month_id: month.id },
                { fullname: "P2", position: "SG", team_name: "Team", pts: 28, ast: 6, reb: 4, month_id: month.id },
                { fullname: "P3", position: "SF", team_name: "Team", pts: 26, ast: 7, reb: 8, month_id: month.id },
                { fullname: "P4", position: "PF", team_name: "Team", pts: 29, ast: 6, reb: 11, month_id: month.id },
                { fullname: "P5", position: "C",  team_name: "Team", pts: 27, ast: 9, reb: 12, month_id: month.id },
            ]);

        
             // Création du lineup
            const lineup = await Lineup.create({
                user_id: user.id,
                month_id: month.id,
            });

            lineupId = lineup.id

            // Création des LineupPlayers composant le Lineup
            await LineupPlayer.bulkCreate([
                { lineup_id: lineup.id, monthly_player_id: players[0].id, predicted_pts: 22, predicted_ast: 6, predicted_reb: 4 },
                { lineup_id: lineup.id,monthly_player_id: players[1].id, predicted_pts: 25, predicted_ast: 4, predicted_reb: 5 },
                { lineup_id: lineup.id, monthly_player_id: players[2].id, predicted_pts: 18, predicted_ast: 7, predicted_reb: 8 },
                { lineup_id: lineup.id, monthly_player_id: players[3].id, predicted_pts: 20, predicted_ast: 3, predicted_reb: 10 },
                { lineup_id: lineup.id, monthly_player_id: players[4].id, predicted_pts: 15, predicted_ast: 2, predicted_reb: 12 },
            ]);
        });
            

        it("Refuse l'accès si utilisateur non Admin", async () => {
            const res = await request(app)
                .delete(`/api/lineups/${lineupId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(403);
        });
    });
});