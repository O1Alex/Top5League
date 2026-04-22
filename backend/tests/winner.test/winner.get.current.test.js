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

        // Céation mois fermé
        month = await Month.create({
            label: "Janvier 2026",
            start_date: new Date("2026-01-01"),
            end_date: new Date("2026-01-31"),
            publish_date: new Date("2026-02-01"),
            status: "closed", // ✅ DOIT être closed
        });

        // Création winner 
        await Winner.create({
            month_id: month.id,
            user_id: user.id,
            score: 5
        });
    });

    // Si tout est bon
    it("Récupère le gagnant du dernier mois terminé", async () => {

        const res = await request(app)
            .get(`/api/winner/current`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);

        expect(res.body.data).toHaveProperty("user_id");
        expect(res.body.data).toHaveProperty("score");

        expect(res.body.data.user_id).toBe(user.id);
        expect(res.body.data.score).toBe(5);
    });

    // Si pas de gagnant
    it("Retourne 404 si aucun gagnant n'existe pour le dernier mois", async () => {

        await Winner.destroy({ where: {} });

        const res = await request(app)
            .get(`/api/winner/current`);

        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
    });

    // Ignore mois ouvert
    it("Ignore le mois en cours (open) et récupère le dernier mois closed", async () => {

        // Mois fermé le plus récent utilisé
        await Month.create({
            label: "Février 2026",
            start_date: new Date("2026-02-01"),
            end_date: new Date("2026-02-28"),
            publish_date: new Date("2026-03-01"),
            status: "open",
        });

        const res = await request(app)
            .get(`/api/winner/current`);

        expect(res.statusCode).toBe(200);

        // Vérification utilisattion mois fermé
        expect(res.body.data.user_id).toBe(user.id);
    });

});