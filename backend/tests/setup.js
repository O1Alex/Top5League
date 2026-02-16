const sequelize = require("../src/config/database");
require("../src/models");

// Synchronisation avec le model
beforeAll(async () => {
    await sequelize.sync({ force : true });
});

// Fermeture de la base de données après les tests
afterAll(async () => {
    await sequelize.close();
});