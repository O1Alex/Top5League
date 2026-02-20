const request = require("supertest");
const sequelize = require("../src/config/database");
const { app } = require("../src/server");

describe("Auth Endpoints", () => {
    beforeEach(async ()=> {
        await sequelize.models.Users.destroy({ where: {} });
    });


    //  /REGISTER
    describe("POST /api/auth/register", () => {

        // Enregistrement d'un nouvel utilisateur
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

        // Unicité de l'adresse mail pour création du compte
        it ("erreur si mail déjà utilisé", async () => {
            await request(app).post("/api/auth/register").send({
                username: "testusers1",
                email: "testuser@example.com",
                password: "TestPassword123",
                favorite_player: "Michael Jordan",
            });
            const res = await request(app).post("/api/auth/register").send({
                username: "testusers2",
                email: "testuser@example.com",
                password: "TestPassword123",
                favorite_player: "Michael Jordan",
            });
            expect(res.statusCode).toEqual(400);
            expect(res.body.success).toBe(false);
        });

        // Bon format de l'email
        it ("email invalide", async () => {
            const res = await request(app).post("/api/auth/register").send({
                username: "testusers3",
                email: "testuser",
                password: "123",
                favorite_player: "Michael Jordan",
            });
            expect(res.statusCode).toEqual(400);
        });
    });



    //  /LOGIN
    describe("POST /api/auth/login", () => {

        // Enregistrement d'un nouvel utilisateur
        beforeEach(async () => {
            await request(app).post("/api/auth/register").send({
                username: "testuser",
                email: "testuser@example.com",
                password: "TestPassword123",
                favorite_player: "Michael Jordan",
            });
        });

        // Connexion de l'utilisateur déjà inscrit
        it("Doit connecter un utilisateur inscrit avec succès", async () => {
            const res = await request(app).post("/api/auth/login").send({
                email: "testuser@example.com",
                password: "TestPassword123",
            });
            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty("token");  
        });

        // Erreur de connexion mot de passe incorrect
        it("Mot de passe incorrect", async () => {
            const res = await request(app).post("/api/auth/login").send({
                email: "testuser@example.com",
                password: "TestPassword",
            });
            expect(res.statusCode).toEqual(401);
            expect(res.body.success).toBe(false);
        });
    });

    //  /ME
    describe("GET/api/auth/me", () => {
        let token;
        // Enregistrement d'un nouvel utilisateur
        beforeEach(async () => {
            const res = await request(app).post("/api/auth/register").send({
                username: "meuser",
                email: "meuser@example.com",
                password: "TestPassword123",
                favorite_player: "Michael Jordan",
            });
            token = res.body.data.token;
        });


        // Récupération des informations de cet utilisateur
        it("Récupération des informations de l'utilisateur connecté", async () => {
            const res = await request(app)
                .get("/api/auth/me")
                .set("Authorization", `Bearer ${token}`)
            expect(res.statusCode).toEqual(200);
            expect(res.body.data.email).toEqual("meuser@example.com");
        }); 

        // Erreur récupération des informations de cet utilisateur (absence token)
        it("Récupération des informations de l'utilisateur connecté", async () => {
            const res = await request(app)
                .get("/api/auth/me")
            expect(res.statusCode).toEqual(401);
        }); 

    });
});