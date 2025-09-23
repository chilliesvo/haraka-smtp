const { Message } = require("./message.model");

function initMessageModel(sequelize) {
  return {
    Message: Message.initModel(sequelize)
  };
}

module.exports = { initMessageModel };
