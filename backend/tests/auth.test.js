const request = require("supertest");
const sequelize = require("../src/config/database");
const { app } = require("../src/server");

describe("Auth Endpoints", () => {
    beforeEach(async ()=> {
        await sequelize.models.Users.destroy({ where: {} });
    });

    describe("POST /api/auth/register", () => {
        it("doit enregistrer un nouvel utilisateur avec succès", async () => {
            const res = await request(app).post("/api/auth/register").send({
                username: "testuser",
                email: "testuser@example.com",
                password: "TestPassword123",
                favorite_player: "Michael Jordan",
            });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty("success", true);
            expect(res.body.data).toHaveProperty("token");
            expect(res.body.data.user).toHaveProperty("email", "testuser@example.com");
            expect(res.body.data.user).not.toHaveProperty("password");  
        });
    });
});