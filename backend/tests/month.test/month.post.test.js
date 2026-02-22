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

    describe("POST /api/months - admin", () => {
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
        });

        // Création du mois
        it("Doit créer un nouveau mois", async () => {
            const res = await request(app)
                .post("/api/months")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    label: "testMonth",
                    start_date: "2026-01-01",
                    end_date: "2026-01-31",
                    publish_date: "2025-12-31",
                    status: "open",
                });
        

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data.label).toBe("testMonth");
        expect(res.body.data.status).toBe("open");
        });

        // Test erreur création si champs manquant
        it("Ne peut pas créer de mois car champs manquant", async () => {
            const res = await request(app)
                .post("/api/months")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    label: "testMonth",
                    start_date: "2026-01-01",
                    // end_date manquant
                    publish_date: "2025-12-31",
                    status: "open",
                });
            expect(res.statusCode).toBe(400);
        });
    });
    
    // Test si utilisateur non Admin
    describe("POST /api/months/", () => {
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
        it("Refuse la création d'un mois pour un utilisateur non admin", async () => {
            const res = await request(app)
                .post(`/api/months/`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    label: "testMonth",
                    start_date: "2026-01-01",
                    end_date: "2026-01-31",
                    publish_date: "2025-12-31",
                    status: "open",
                });


            expect(res.statusCode).toBe(403);
        });
    });
});