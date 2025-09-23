const { DataTypes, Model } = require("sequelize");

const MESSAGE_STATUS = {
  PENDING: 1,
  SUCCESS: 2,
  FAIL: 3
};

class Message extends Model {
  static initModel(sequelize) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        from: { type: DataTypes.STRING(100) },
        to: { type: DataTypes.STRING(100) },
        port: { type: DataTypes.INTEGER },
        clientIp: { type: DataTypes.TEXT },
        username: { type: DataTypes.STRING(100) },
        status: { type: DataTypes.TINYINT },
        createdDate: { type: DataTypes.DATE },
        extraData: { type: DataTypes.TEXT }
      },
      { sequelize, tableName: "message", modelName: "message", timestamps: false }
    );
  }
}

module.exports = { Message, MESSAGE_STATUS };
