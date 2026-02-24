const request = require("supertest");
const sequelize = require("../../src/config/database");
const app = require("../../src/app");
const User = require("../../src/models/User");
const jwt = require("jsonwebtoken");

describe("MonthlyPlayer Endpoints", () => {
    beforeEach(async ()=> {
        await sequelize.models.Month.destroy({ where: {} });
        await User.destroy({where: {} });
    });

    describe("POST /api/monthlyPlayers/:monthId", () => {
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
            const month = await sequelize.models.Month.create({
                label: "Janvier 2026",
                start_date: "2026-01-01",
                end_date: "2026-01-31",
                publish_date: "2025-12-31",
                status: "open",
            });

            monthId = month.id;

        });

        // Création du joueur du mois 
        it("Doit créer un nouveau joueur du mois", async () => {
            const res = await request (app)
                .post(`/api/monthlyPlayers/${monthId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    fullname: "Stephen Curry",
                    position: "PG",
                    team_name: "Golden State Warriors",
                    pts: 30.2,
                    ast: 8.3,
                    reb: 6.7,
                    photo_url: "https://test.com/curry_30.png"
                });
            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty("id");
            expect(res.body.data.fullname).toBe("Stephen Curry");
        });

        // Refus création joueur du mois si champs obligatoire manquant
        it("Refuse la création si un champ obligatoire est manquant", async () => {
            const res = await request(app)
                .post(`/api/monthlyPlayers/${monthId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                fullname: "Stephen Curry",
                // position manquante
                pts: 30.2,
                ast: 8.3,
                reb: 6.7,
                });

            expect(res.statusCode).toBe(400);
            });

        // Refus création du joueur si position n'est pas comprise dans la liste des 5 proposées
        it("Refuse la création si la position est invalide", async () => {
            const res = await request(app)
                .post(`/api/monthlyPlayers/${monthId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                fullname: "Stephen Curry",
                position: "XYZ", // invalide
                pts: 30.2,
                ast: 8.3,
                reb: 6.7,
                });

            expect(res.statusCode).toBe(400);
            });

        // Refus création joueur si une ou plusieurs des statistiques sont négatives
        it("Refuse la création si une ou plusieurs des statistiques sont négatives", async () => {
            const res = await request(app)
                .post(`/api/monthlyPlayers/${monthId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    fullname: "Stephen Curry",
                    position: "PG", 
                    pts: 30.2,
                    ast: 8.3,
                    reb: -6.7,
                });

            expect(res.statusCode).toBe(400);
        });

        // Test si mois inexistant
        it("Ne peut pas créer de nouveux joueur du mois car mois invalide", async () => {
            const res = await request (app)
                .post(`/api/monthlyPlayers/9999`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    fullname: "Stephen Curry",
                    position: "PG",
                    team_name: "Golden State Warriors",
                    pts: 30.2,
                    ast: 8.3,
                    reb: 6.7,
                    photo_url: "https://test.com/curry_30.png"
                });
            expect(res.statusCode).toBe(404);
        });
    });

    
    // Test si utilisateur non Admin
    describe("POST /api/monthlyPlayers/:monthId", () => {
        let token;
        let monthId;

        // Création utilisateur
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
            const month = await sequelize.models.Month.create({
                label: "Janvier 2026",
                start_date: "2026-01-01",
                end_date: "2026-01-31",
                publish_date: "2025-12-31",
                status: "open",
            });

            monthId = month.id;
        });
        it("Ne peut pas créer le joueur du mois car non Admin", async () => {
            const res = await request (app)
                .post(`/api/monthlyPlayers/${monthId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    fullname: "Stephen Curry",
                    position: "PG",
                    team_name: "Golden State Warriors",
                    pts: 30.2,
                    ast: 8.3,
                    reb: 6.7,
                    photo_url: "https://test.com/curry_30.png"
                });

            expect(res.statusCode).toBe(403);
        });
    });


});