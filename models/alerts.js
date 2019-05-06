module.exports = (sequelize, DataTypes) => {
    const Alert = sequelize.define("Alert", {
        threshold: DataTypes.INTEGER,
        gameid: DataTypes.INTEGER,
    });

    Alert.associate = function(models) {
        models.Alert.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Alert;
};