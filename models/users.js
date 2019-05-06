module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: DataTypes.STRING,
    steamid: { type: DataTypes.STRING, primaryKey: true },
    avatar: DataTypes.STRING,
  });

  User.associate = function(models) {
    models.User.hasMany(models.Alert);
  };
  
  return User;
};