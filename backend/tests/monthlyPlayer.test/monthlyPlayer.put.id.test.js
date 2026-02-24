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

    describe("PUT /api/monthlyPlayers/:id", () => {
        let token;
        let monthId;
        let playerId;

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
            const player = await MonthlyPlayer.create({
                fullname: "Stephen Curry",
                position: "C",
                team_name: "Golden State Warriors",
                pts: 30.2,
                ast: 8.3,
                reb: 6.7,
                photo_url: "https://test.com/curry_30.png",
                month_id: monthId
            });

            playerId = player.id;
            
        });

        // Test modification joueur
        it("Doit modifier le joueur selectionné", async () => {
            const res = await request(app)
                .put(`/api/monthlyPlayers/${playerId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    position: "PG",
                    pts: 31,
                });
        
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.position).toBe("PG");
            expect(res.body.data.pts).toBe(31);
        });

        // Test si joueur n'existe pas
        it("Retourne 404 si le joueur n'existe pas", async () => {
            const res = await request(app)
                .put("/api/monthlyPlayers/9999")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    position: "PG",
                    pts: 31,
                });

            expect(res.statusCode).toBe(404);
        });

        // Test si position n'est pas comprise dans la liste des 5 proposées
        it("Refuse la modification si la position est invalide", async () => {
            const res = await request(app)
                .put(`/api/monthlyPlayers/${monthId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({ 
                    position: "XYZ", // invalide
                    pts: 30.2,
                });

            expect(res.statusCode).toBe(400);
            });

        // Test si une ou plusieurs des statistiques sont négatives
        it("Refuse la modification si une ou plusieurs des statistiques sont négatives", async () => {
            const res = await request(app)
                .put(`/api/monthlyPlayers/${monthId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    position: "PG", 
                    pts: 31,
                    reb: -6.7,
                });

            expect(res.statusCode).toBe(400);
        });
    });

    // Test si utilisateur non Admin
    describe("PUT /api/monthlyPlayers/:id", () => {
        let token;
        let monthId;
        let playerId;

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
            const player = await MonthlyPlayer.create({
                fullname: "Stephen Curry",
                position: "C",
                team_name: "Golden State Warriors",
                pts: 30.2,
                ast: 8.3,
                reb: 6.7,
                photo_url: "https://test.com/curry_30.png",
                month_id: monthId
            });

            playerId = player.id
        });
        it("Refuse la modification du joueur si non admin", async () => {
            const res = await request(app)
                .put(`/api/monthlyPlayers/${playerId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    position: "PG",
                    pts: 31,
                });


            expect(res.statusCode).toBe(403);
        });
    });
});