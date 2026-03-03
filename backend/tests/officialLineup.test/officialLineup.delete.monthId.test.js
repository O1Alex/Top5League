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
    
    describe("DELETE /api/officialLineup/:id", () => {
        let token;
        let monthId;
        let players;
        let officialLineup;

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
            const month = await Month.create({
                label: "Janvier 2026",
                start_date: "2026-01-01",
                end_date: "2026-01-31",
                publish_date: "2025-12-31",
                status: "open",
            });

            monthId = month.id;


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


        // Test suppression du Top 5 officiel du mois
        it("Supprime le OfficielLineup du mois par l'id du mois", async () => {
            const res = await request(app)
                .delete(`/api/officialLineup/${monthId}`)
                .set("Authorization", `Bearer ${token}`)

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);

            const count = await OfficialLineup.count();
            expect(count).toBe(0);
        });
        

        // Test si pas encore d'officialLineup
        it("Retourne 404 si aucun Top 5 officiel n'existe pour le mois", async () => {
            await OfficialLineup.destroy({ where: {} });

            const res = await request(app)
                .delete(`/api/officialLineup/${monthId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(404);
            expect(res.body.success).toBe(false);
        });

        
        // Test si non administrateur
        it("Refuse l'accès si l'utilisateur n'est pas admin", async () => {
            // Création utilisateur non admin
            await request(app)
                .post("/api/auth/register")
                .send({
                    username: "user",
                    email: "user@example.com",
                    password: "UserPassword123",
                    favorite_player: "Kobe",
                });

            const normalUser = await User.findOne({
                where: { email: "user@example.com" }
            });

            const userToken = jwt.sign(
                { id: normalUser.id, role: normalUser.role },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            const res = await request(app)
                .delete(`/api/officialLineup/${monthId}`)
                .set("Authorization", `Bearer ${userToken}`);

            expect(res.statusCode).toBe(403);
        });
    });
});