const User = require("./User");
const Month = require("./Month");
const MonthlyPlayer = require("./MonthlyPlayer");
const Lineup = require("./Lineup");
const LineupPlayer = require("./LineupPlayer");
const OfficialLineup = require("./OfficialLineup");
const OfficialLineupPlayer = require("./OfficialLineupPlayer");
const Winner = require("./Winner");
const sequelize = require("../config/database");



//Relation User/Lineup
User.hasMany(Lineup, { foreignKey: "user_id" });
Lineup.belongsTo(User, { foreignKey: "user_id" });

//Relation User/Winner
User.hasMany(Winner, { foreignKey: "user_id" });
Winner.belongsTo(User, { foreignKey: "user_id" });

//Relation Month/MonthlyPlayer
Month.hasMany(MonthlyPlayer, {foreignKey: "month_id"});
MonthlyPlayer.belongsTo(Month, {foreignKey: "month_id"});

//Relation Month/Lineup
Month.hasMany(Lineup, {foreignKey: "month_id"});
Lineup.belongsTo(Month, {foreignKey:"month_id"});

//Relation Month/OfficialLineup
Month.hasOne(OfficialLineup, { foreignKey: "month_id" });
OfficialLineup.belongsTo(Month, { foreignKey: "month_id" });

//Relation Month/Winner
Month.hasOne(Winner, { foreignKey: "month_id" });
Winner.belongsTo(Month, { foreignKey: "month_id" });


//Relation OfficialLineup/MonthlyPlayer avec OfficialLineupPlayer comme table de liaison
OfficialLineup.belongsToMany(MonthlyPlayer, {
    through: OfficialLineupPlayer,
    foreignKey: "official_lineup_id",
    otherKey: "monthly_player_id",
});
MonthlyPlayer.belongsToMany(OfficialLineup, {
    through: OfficialLineupPlayer,
    foreignKey: "monthly_player_id",
    otherKey: "official_lineup_id",
});


//Relation Lineup/MonthlyPlayer avec LineupPlayer comme table de lisaion.
Lineup.belongsToMany(MonthlyPlayer, {
    through: LineupPlayer,
    foreignKey: "lineup_id",
    otherKey: "monthly_player_id",
});
MonthlyPlayer.belongsToMany(Lineup, {
    through: LineupPlayer,
    foreignKey: "monthly_player_id",
    otherKey: "lineup_id",
});



module.exports = {
    sequelize, 
    User,
    Month, 
    MonthlyPlayer,
    Lineup, 
    LineupPlayer, 
    OfficialLineup, 
    OfficialLineupPlayer, 
    Winner
};