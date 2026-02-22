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

    describe("PUT /api/months/:id", () => {
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

        // Modification du mois par son id
        it("Doit récupérer le mois correspondant à l'id", async () => {
            const res = await request(app)
                .put(`/api/months/${monthId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    label: "Mois modifié"
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty("id", monthId);
            expect(res.body.data.label).toBe("Mois modifié");
        });

        // Test si le mois n'existe pas
        it("Retourne 404 si le mois n'existe pas", async () => {
            const res = await request(app)
                .put("/api/months/9999")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    label: "Mois non modifié car erreur"
                });

            expect(res.statusCode).toBe(404);
            expect(res.body.success).toBe(false);
        });
    });

    // Test accès uniquement admin
    describe("PUT /api/months/:id", () => {
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
        it("Refuse la modification d'un mois pour un utilisateur non admin", async () => {
            const res = await request(app)
                .put(`/api/months/1`)
                .set("Authorization", `Bearer ${token}`)
                .send({ label: "Tentative modif" });

            expect(res.statusCode).toBe(403);
        });
    });
});