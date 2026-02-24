const request = require("supertest");
const sequelize = require("../../src/config/database");
const app = require("../../src/app");
const User = require("../../src/models/User");
const jwt = require("jsonwebtoken");


describe("User Endpoints", () => {
    beforeEach(async ()=> {
        await User.destroy({where: {} });
    });

    describe("GET /api/users/", () => {
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
        
            // Création des utilisateurs pour le test pour le test
            await User.bulkCreate([
                {
                    username: "testuser1",
                    email: "testuser1@example.com",
                    password: "TestPassword123",
                    role: "user",
                    favorite_player: "Michael Jordan",
                },
                {
                    username: "testuser2",
                    email: "testuser2@example.com",
                    password: "TestPassword123",
                    role: "user",
                    favorite_player: "Michael Jordan",
                }
            ]);
        });

        // Récupération des utilisateurs existants
        it("Doit récupérer la liste des utilisateurs", async () => {
            const res = await request(app)
                .get("/api/users")
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.data.length).toBe(3);

            res.body.data.forEach(user => {
                expect(user).toHaveProperty("email");
                expect(user).toHaveProperty("role");
                expect(user).not.toHaveProperty("password");
            });
        });
    });

     // Test si utilisateur non Admin
    describe("GET /api/users/", () => {
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
        // Récupération des utilisateurs existants
        it("Récupération impossible de la liste des utilisateurs", async () => {
            const res = await request(app)
                .get("/api/users")
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(403);
        });
    });
});