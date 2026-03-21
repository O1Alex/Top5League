const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../src/app");

require("../../src/models/index");

const User = require("../../src/models/User");
const Month = require("../../src/models/Month");
const Winner = require("../../src/models/Winner");

describe("GET /api/winner/:monthId", () => {

    let month;
    let token;
    let user;

    beforeEach(async () => {

        await Winner.destroy({ where: {} });
        await Month.destroy({ where: {} });
        await User.destroy({ where: {} });

        // Création utilisateur
        await request(app)
            .post("/api/auth/register")
            .send({
                username: "admin",
                email: "admin@example.com",
                password: "AdminPassword123",
                favorite_player: "Jordan",
            });

        // Passage Admin
        user = await User.findOne({
            where: { email: "admin@example.com" }
        });

        user.role = "admin";
        await user.save();

        token = jwt.sign(
            { userId: user.id, id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Création mois pour le test 
        month = await Month.create({
            label: "Test Month",
            start_date: "2026-01-01",
            end_date: "2026-01-31",
            publish_date: "2026-02-01",
            status: "closed",
        });

        // Création winner
        await Winner.create({
            month_id: month.id,
            user_id: user.id,
            score: 5
        });
    });


    // Test récupération du gagnant
    it("Récupère le gagnant du mois par l'id du mois pour un utilisateur connecté", async () => {

        const res = await request(app)
            .get(`/api/winner/${month.id}`)
            .set("Authorization", `Bearer ${token}`);


        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);

        expect(res.body.data.user_id).toBe(user.id);
        expect(res.body.data.score).toBe(5);
    });


    // Test si aucun gagnant
    it("Retourne 404 si aucun gagnant n'existe", async () => {

        await Winner.destroy({ where: {} });

        const res = await request(app)
            .get(`/api/winner/${month.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(404);
    });


    // Test sans token
    it("Refuse l'accès si l'utilisateur n'est pas authentifié", async () => {

        const res = await request(app)
            .get(`/api/winner/${month.id}`);

        expect(res.statusCode).toBe(401);
    });

});