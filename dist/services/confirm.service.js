"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveConfirmedValue = exports.checkIfMeasureExists = exports.validateConfirmData = void 0;
const measure_model_1 = __importDefault(require("../models/measure.model"));
const validateConfirmData = (measure_uuid, confirmed_value) => {
    if (!measure_uuid || typeof confirmed_value !== 'number') {
        return "UUID ou valor confirmado inválido.";
    }
    return null;
};
exports.validateConfirmData = validateConfirmData;
const checkIfMeasureExists = async (measure_uuid) => {
    const measure = await measure_model_1.default.findOne({ where: { measure_uuid } });
    return measure;
};
exports.checkIfMeasureExists = checkIfMeasureExists;
const saveConfirmedValue = async (measure_uuid, confirmed_value) => {
    const measure = await (0, exports.checkIfMeasureExists)(measure_uuid);
    if (measure) {
        measure.has_confirmed = true;
        // Salve o valor confirmado se necessário
        await measure.save();
    }
};
exports.saveConfirmedValue = saveConfirmedValue;
//# sourceMappingURL=confirm.service.js.map