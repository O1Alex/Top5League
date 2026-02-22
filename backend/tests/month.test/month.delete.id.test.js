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

    describe("DELETE /api/months/:id", () => {
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

        // Suppression du mois par son id
        it("Doit supprimer le mois correspondant à l'id", async () => {
            const res = await request(app)
                .delete(`/api/months/${monthId}`)
                .set("Authorization", `Bearer ${token}`)

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        // Test si le mois n'existe pas
        it("Retourne 404 si le mois n'existe pas", async () => {
            const res = await request(app)
                .delete(`/api/months/9999`)                
                .set("Authorization", `Bearer ${token}`)

            expect(res.statusCode).toBe(404);
            expect(res.body.success).toBe(false);
        });
    });
    
    describe("DELETE /api/months/:id", () => {
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

        it("Refuse la suppression d'un mois pour un utilisateur non admin", async () => {
            const res = await request(app)
                .delete(`/api/months/1`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(403);
        });
    });
});