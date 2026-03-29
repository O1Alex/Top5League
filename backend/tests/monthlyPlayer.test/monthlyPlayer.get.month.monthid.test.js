const request = require("supertest");
const sequelize = require("../../src/config/database");
const app = require("../../src/app");
const User = require("../../src/models/User");
const jwt = require("jsonwebtoken");
const MonthlyPlayer = require("../../src/models/MonthlyPlayer");
const Month = require("../../src/models/Month");

describe("MonthlyPlayer Endpoints", () => {
    beforeEach(async ()=> {
        await Month.destroy({ where: {} });
        await User.destroy({where: {} });
        await MonthlyPlayer.destroy({where: {} });
    });

    describe("GET /api/monthlyPlayers/month/:monthId", () => {
        let token;
        let monthId;

         // Création utilisateur
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

            user.role = "admin";
            await user.save();

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

            // Création du joueur du mois 
            await MonthlyPlayer.create({
                fullname: "Stephen Curry",
                position: "PG",
                team_name: "Golden State Warriors",
                pts: 30.2,
                ast: 8.3,
                reb: 6.7,
                photo_url: "https://test.com/curry_30.png",
                month_id: monthId
            });
        });

        // Test Récupération liste joueur du mois selectionné
        it("Doit récupérer les joueurs du mois selectionné", async () => {
            const res = await request(app)
                .get(`/api/monthlyPlayers/month/${monthId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.data.length).toBe(1);

            const player = res.body.data[0];
            expect(player.fullname).toBe("Stephen Curry");
            expect(player.month_id).toBe(monthId);
        });
    });


    // Test si utilisateur non Admin
    describe("GET /api/months/:id", () => {
        let token;
        let monthId;

        beforeEach(async () => {
            await request(app)
                .post("/api/auth/register")
                .send({
                    username: "user",
                    email: "user@example.com",
                    password: "UserPassword123",
                    favorite_player: "Jordan",
                });

            const user = await User.findOne({
                where: { email: "user@example.com" }
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

            // Création du joueur du mois 
            await MonthlyPlayer.create({
                fullname: "Stephen Curry",
                position: "PG",
                team_name: "Golden State Warriors",
                pts: 30.2,
                ast: 8.3,
                reb: 6.7,
                photo_url: "https://test.com/curry_30.png",
                month_id: monthId
            });
        });
        it("Refuse l'accès à la liste des joueurs aux utilisateurs non admin", async () => {
            const res = await request(app)
                .get(`/api/monthlyPlayers/month/${monthId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(403);
        });
    });
});