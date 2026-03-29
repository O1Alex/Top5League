const request = require("supertest"); 
const sequelize = require("../../src/config/database"); 
const app = require("../../src/app"); 
const User = require("../../src/models/User"); 
const jwt = require("jsonwebtoken"); 
const MonthlyPlayer = require("../../src/models/MonthlyPlayer"); 
const Month = require("../../src/models/Month");

describe("GET /api/monthlyPlayers/:id", () => {
    let adminToken;
    let userToken;
    let playerId;

    beforeEach(async () => {
        await MonthlyPlayer.destroy({ where: {} });
        await Month.destroy({ where: {} });
        await User.destroy({ where: {} });

        // Création admin
        const admin = await User.create({
            username: "admin",
            email: "admin@test.com",
            password: "password",
            role: "admin"
        });

        adminToken = jwt.sign(
            { id: admin.id, role: admin.role },
            process.env.JWT_SECRET
        );

        // Création utilisateur
        const user = await User.create({
            username: "user",
            email: "user@test.com",
            password: "password",
            role: "user"
        });

        userToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET
        );

        // Création du mois
        const month = await Month.create({
            label: "Janvier 2026",
            start_date: "2026-01-01",
            end_date: "2026-01-31",
            publish_date: "2025-12-31",
            status: "open"
        });

        // Création joueur
        const player = await MonthlyPlayer.create({
            fullname: "Stephen Curry",
            position: "PG",
            team_name: "Warriors",
            pts: 30,
            ast: 8,
            reb: 6,
            month_id: month.id
        });

        playerId = player.id;
    });

    // Test récupération du joueur par son ID
    it("Permet de récupérer un joueur par son ID", async () => {
        const res = await request(app)
            .get(`/api/monthlyPlayers/${playerId}`)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toBeDefined();
        expect(res.body.data.fullname).toBe("Stephen Curry");
    });

    // Test si pas Admin
    it("Refuse l'accès pour un user non admin", async () => {
        const res = await request(app)
            .get(`/api/monthlyPlayers/${playerId}`)
            .set("Authorization", `Bearer ${userToken}`);

        expect(res.statusCode).toBe(403);
    });

    // Test si utilisateur non connecté
    it("Refuse l'accès sans token", async () => {
        const res = await request(app)
            .get(`/api/monthlyPlayers/${playerId}`);

        expect(res.statusCode).toBe(401);
    });

    // Test si joueur inexistant
    it("Retourne 404 si joueur inexistant", async () => {
        const res = await request(app)
            .get(`/api/monthlyPlayers/999`)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
    });

});