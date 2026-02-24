const request = require("supertest");
const sequelize = require("../../src/config/database");
const app = require("../../src/app");
const Month = require("../../src/models/Month");
const MonthlyPlayer = require("../../src/models/MonthlyPlayer");

describe("GET /api/monthlyPlayers/current", () => {

    beforeEach(async () => {
        await MonthlyPlayer.destroy({ where: {} });
        await Month.destroy({ where: {} });
    });

    // Test si mois open
    it("Retourne tous les joueurs du mois open", async () => {
        const closedMonth = await Month.create({
            label: "Janvier 2026",
            start_date: "2026-01-01",
            end_date: "2026-01-31",
            publish_date: "2025-12-31",
            status: "closed",
        });

        const openMonth = await Month.create({
            label: "Février 2026",
            start_date: "2026-02-01",
            end_date: "2026-02-28",
            publish_date: "2026-01-31",
            status: "open",
        });

        await MonthlyPlayer.bulkCreate([
            {
                fullname: "LeBron James",
                position: "SF",
                team_name: "Lakers",
                pts: 28.4,
                ast: 7.1,
                reb: 8.2,
                photo_url: "https://example.com/lebron.png",
                month_id: closedMonth.id,
            },
            {
                fullname: "Stephen Curry",
                position: "PG",
                team_name: "Warriors",
                pts: 30.2,
                ast: 8.3,
                reb: 6.7,
                photo_url: "https://example.com/curry.png",
                month_id: openMonth.id,
            },
            {
                fullname: "Kevin Durant",
                position: "PF",
                team_name: "Suns",
                pts: 29.1,
                ast: 5.8,
                reb: 7.5,
                photo_url: "https://example.com/durant.png",
                month_id: openMonth.id,
            },
        ]);

        const res = await request(app).get("/api/monthlyPlayers/current");

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBe(2);

        const names = res.body.data.map(p => p.fullname);
        expect(names).toContain("Stephen Curry");
        expect(names).toContain("Kevin Durant");
    });

    // Test si pas de mois open
    it("Retourne les joueurs du dernier mois closed si aucun mois open", async () => {
        const month1 = await Month.create({
            label: "Janvier 2026",
            start_date: "2026-01-01",
            end_date: "2026-01-31",
            publish_date: "2025-12-31",
            status: "closed",
        });

        const month2 = await Month.create({
            label: "Février 2026",
            start_date: "2026-02-01",
            end_date: "2026-02-28",
            publish_date: "2026-01-31",
            status: "closed",
        });

        await MonthlyPlayer.bulkCreate([
            {
                fullname: "Giannis Antetokounmpo",
                position: "PF",
                team_name: "Bucks",
                pts: 31.0,
                ast: 6.2,
                reb: 11.4,
                photo_url: "https://example.com/giannis.png",
                month_id: month2.id,
            },
            {
                fullname: "Nikola Jokic",
                position: "C",
                team_name: "Nuggets",
                pts: 26.8,
                ast: 9.1,
                reb: 12.3,
                photo_url: "https://example.com/jokic.png",
                month_id: month2.id,
            },
        ]);

        const res = await request(app).get("/api/monthlyPlayers/current");

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.length).toBe(2);

        const names = res.body.data.map(p => p.fullname);
        expect(names).toContain("Giannis Antetokounmpo");
        expect(names).toContain("Nikola Jokic");
    });

    // Si pas de joueurs du mois
    it("Retourne 404 s'il n'existe aucun joueur du mois", async () => {
        const res = await request(app).get("/api/monthlyPlayers/current");

        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
    });
});