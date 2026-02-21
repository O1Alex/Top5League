const request = require("supertest");
const sequelize = require("../src/config/database");
const app = require("../src/app");
const User = require("../src/models/User");
const jwt = require("jsonwebtoken");

describe("Month Endpoints", () => {
    beforeEach(async ()=> {
        await sequelize.models.Month.destroy({ where: {} });
        await User.destroy({where: {} });
    });


    // POST
    describe("POST /api/months - admin", () => {
        let token;

        // Création utilisateur nécessaire
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
    

    // Test erreur création pour non Admin
    describe("POST /api/months", () => {
        let token;
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


    //  /GET
    describe("GET /api/month/", () => {
         // Création de mois pour le test
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
});
