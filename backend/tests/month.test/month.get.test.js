const request = require("supertest");
const sequelize = require("../../src/config/database");
const app = require("../../src/app");
const User = require("../../src/models/User");
const jwt = require("jsonwebtoken");


describe("Month Endpoints", () => {
    beforeEach(async ()=> {
        await sequelize.models.Month.destroy({ where: {} });
        await User.destroy({where: {} });
    });

    describe("GET /api/months/", () => {
        let token;
        
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
        
            // Création des mois pour le test
            await sequelize.models.Month.bulkCreate([
                {
                    label: "Janvier 2026",
                    start_date: "2026-01-01",
                    end_date: "2026-01-31",
                    publish_date: "2025-12-31",
                    status: "open",
                },
                {
                    label: "Février 2026",
                    start_date: "2026-02-01",
                    end_date: "2026-02-28",
                    publish_date: "2026-01-31",
                    status: "open",
                }
            ]);
        });

        // Récupération des mois existants
        it("Doit récupérer la liste des mois", async () => {
            const res = await request(app)
                .get("/api/months")
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.data.length).toBe(2);
        });
    });

     // Test si utilisateur non Admin
    describe("GET /api/months/", () => {
        let token;

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
        });
        it("Refuse l'accès à a la liste des mois pour un utilisateur non admin", async () => {
            const res = await request(app)
                .get(`/api/months/`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(403);
        });
    });
});