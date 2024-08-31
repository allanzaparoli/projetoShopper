"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerMeasures = void 0;
const measure_model_1 = __importDefault(require("../models/measure.model"));
const getCustomerMeasures = async (customer_code, measure_type) => {
    const whereCondition = {
        customer_code
    };
    if (measure_type) {
        whereCondition.measure_type = measure_type.toUpperCase();
    }
    const measures = await measure_model_1.default.findAll({
        where: whereCondition,
        order: [['measure_datetime', 'DESC']],
    });
    return measures;
};
exports.getCustomerMeasures = getCustomerMeasures;
//# sourceMappingURL=list.service.js.map