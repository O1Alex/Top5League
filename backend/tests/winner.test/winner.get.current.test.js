const request = require("supertest");
const app = require("../../src/app");

const User = require("../../src/models/User");
const Month = require("../../src/models/Month");
const Winner = require("../../src/models/Winner");

describe("GET /api/winner/current", () => {

    let month;
    let user;

    beforeEach(async () => {
        await Winner.destroy({ where: {} });
        await Month.destroy({ where: {} });
        await User.destroy({ where: {} });

        // Création utilisateur
        user = await User.create({
            username: "winnerUser",
            email: "winner@test.com",
            password: "Password123",
            favorite_player: "Jordan"
        });

        // Création mois pour le test 
        month = await Month.create({
            label: "Test Month",
            start_date: "2024-01-01",
            end_date: "2030-01-01",
            publish_date: "2023-12-01",
            status: "closed",
        });

        month = await Month.create({
            label: "Test Month",
            start_date: "2024-01-01",
            end_date: "2030-01-01",
            publish_date: "2023-12-01",
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
    it("Récupère le gagnant du mois", async () => {

        const res = await request(app)
            .get(`/api/winner/${month.id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);

        expect(res.body.data).toHaveProperty("user_id");
        expect(res.body.data).toHaveProperty("score");

        expect(res.body.data.user_id).toBe(user.id);
        expect(res.body.data.score).toBe(5);
    });


    // Test si aucun gagnant
    it("Retourne 404 si aucun gagnant n'existe", async () => {

        await Winner.destroy({ where: {} });

        const res = await request(app)
            .get(`/api/winner/${month.id}`);

        expect(res.statusCode).toBe(404);
    });


    // Test mois inexistant
    it("Retourne 404 si le mois n'existe pas", async () => {

        const res = await request(app)
            .get("/api/winner/999");

        expect(res.statusCode).toBe(404);
    });

});