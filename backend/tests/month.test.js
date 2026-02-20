const request = require("supertest");
const sequelize = require("../src/config/database");
const app = require("../src/app");


describe("Month Endpoints", () => {
    beforeEach(async ()=> {
        await sequelize.models.Month.destroy({ where: {} });
    });

    // POST/
    describe("POST /api/months", () => {
        let token;
        // Création Utilisateur
        beforeEach(async () => {
            await sequelize.models.Month.destroy({ where: {} });

            const res = await request(app)
                .post("/api/auth/register")
                .send({
                    username: "admin",
                    email: "admin@example.com",
                    password: "AdminPassword123",
                    favorite_player: "Jordan",
                });
            
            // Passage Admin
            const user = await sequelize.models.Users.findOne({
                where: { email: "admin@example.com" }
            });

            user.role = "admin";
            await user.save();

            token = res.body.data.token;
        });

        // Création d'un mois
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
    

    describe("POST /api/months", () => {
        let token;
        // Test erreur création pour non Admin
        beforeEach(async () => {
            await sequelize.models.Month.destroy({ where: {} });

            const res = await request(app)
                .post("/api/auth/register")
                .send({
                    username: "usertest",
                    email: "usertest@example.com",
                    password: "TestPassword123",
                    favorite_player: "Jordan",
                });

            token = res.body.data.token;
        });

        it("Doit refuser la création pour un utilisateur non admin", async () => {
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

            expect(res.statusCode).toBe(403);
        });
    });

});