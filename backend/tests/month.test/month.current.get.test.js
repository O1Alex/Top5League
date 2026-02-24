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

    describe("GET /api/months/current", () => {
        
        // Récupération du mois open
        it("Doit récupérer le mois open", async () => {
            // Création des mois pour le test
            await sequelize.models.Month.bulkCreate([
                {
                    label: "Janvier 2026",
                    start_date: "2026-01-01",
                    end_date: "2026-01-31",
                    publish_date: "2025-12-31",
                    status: "closed",
                },
                {
                    label: "Février 2026",
                    start_date: "2026-02-01",
                    end_date: "2026-02-28",
                    publish_date: "2026-01-31",
                    status: "open",
                }
            ]);

            const res = await request(app)
                .get("/api/months/current")
            
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.label).toBe("Février 2026");
            expect(res.body.data.status).toBe("open");
        });

        // Récupération du mois closed le plus récent
        it("Doit récupérer le mois closed le plus récent", async () => {
            // Création des mois pour le test
            await sequelize.models.Month.bulkCreate([
                {
                    label: "Janvier 2026",
                    start_date: "2026-01-01",
                    end_date: "2026-01-31",
                    publish_date: "2025-12-31",
                    status: "closed",
                },
                {
                    label: "Février 2026",
                    start_date: "2026-02-01",
                    end_date: "2026-02-28",
                    publish_date: "2026-01-31",
                    status: "closed",
                }
            ]);
            
            const res = await request(app)
                .get("/api/months/current")
            
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.label).toBe("Février 2026");
            expect(res.body.data.status).toBe("closed");
        });

        // Erreur aucun mois existant
        it("Retourne 404 s'il n'existe aucun mois", async () => {
            const res = await request(app)
                .get("/api/months/current")

            expect(res.statusCode).toBe(404);
            expect(res.body.success).toBe(false);
        });
    });
});