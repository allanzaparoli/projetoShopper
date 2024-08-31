"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
const sequelize_2 = require("sequelize");
class Measure extends sequelize_1.Model {
    id;
    customer_code;
    measure_datetime;
    measure_type;
    image_url;
    measure_uuid;
    has_confirmed;
}
Measure.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customer_code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    measure_datetime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    measure_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    // valor_medida: {
    //   type: DataTypes.NUMBER,
    //   allowNull: false,
    // },
    measure_uuid: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_2.UUIDV4,
        allowNull: false,
    },
    has_confirmed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
}, {
    sequelize: config_1.sequelize,
    modelName: "Measure",
    tableName: "measures",
    timestamps: false,
});
exports.default = Measure;
//# sourceMappingURL=measure.model.js.map