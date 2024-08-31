"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL || 'postgresql://postgres:postgres@db:5432/mydatabase', {
    dialect: 'postgres',
    logging: false,
});
const connectDatabase = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
exports.connectDatabase = connectDatabase;
//# sourceMappingURL=config.js.map