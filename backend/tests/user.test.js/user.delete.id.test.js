const request = require("supertest");
const sequelize = require("../../src/config/database");
const app = require("../../src/app");
const User = require("../../src/models/User");
const jwt = require("jsonwebtoken");


describe("User Endpoints", () => {
    beforeEach(async ()=> {
        await User.destroy({where: {} });
    });

    describe("DELETE /api/users/:id", () => {
        let token;
        let userId;
        
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
            const admin = await User.findOne({
                where: { email: "admin@example.com" }
            });

            admin.role = "admin";
            await admin.save();

            token = jwt.sign(
                { id: admin.id, role: admin.role },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );
        
            // Création des utilisateurs pour le test pour le test
            const user = await User.create({
                    username: "testuser1",
                    email: "testuser1@example.com",
                    password: "TestPassword123",
                    role: "user",
                    favorite_player: "Michael Jordan", 
            });

            userId = user.id;
        });

        // Suppression des utilisateurs existants
        it("Doit supprimer l'utilisateur par son id", async () => {
            const res = await request(app)
                .delete(`/api/users/${userId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);;
        });
    });

     // Test si utilisateur non Admin
    describe("DELETE /api/users/:id", () => {
        let token;
        let userId;

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

            // Création des utilisateurs pour le test pour le test
            const target = await User.create({
                    username: "testuser1",
                    email: "testuser1@example.com",
                    password: "TestPassword123",
                    role: "user",
                    favorite_player: "Michael Jordan", 
            });

            userId = target.id;
        });
        
        it("Suppression impossible de l'utilisateur'", async () => {
            const res = await request(app)
                .get(`/api/users/${userId}`)                
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(403);
        });
    });
});