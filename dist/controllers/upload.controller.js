"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const upload_service_1 = require("../services/upload.service");
const measure_model_1 = __importDefault(require("../models/measure.model"));
const uploadImage = async (req, res) => {
    try {
        const { image, customer_code, measure_datetime, measure_type } = req.body;
        // Validação dos dados enviados
        const validationError = (0, upload_service_1.validateUploadData)(image, customer_code, measure_datetime, measure_type);
        if (validationError) {
            return res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: validationError,
            });
        }
        // Verifica se já existe uma leitura para o tipo no mês atual
        const duplicateError = await (0, upload_service_1.checkMonthlyReading)(customer_code, measure_type, measure_datetime);
        if (duplicateError) {
            return res.status(409).json({
                error_code: "DOUBLE_REPORT",
                error_description: duplicateError,
            });
        }
        // Integração com a API Gemini (simulada)
        const { imageUrl, measureValue, measureUuid } = await (0, upload_service_1.extractMeasurementFromImage)(image);
        // Salvar a nova leitura no banco de dados
        const newMeasure = await measure_model_1.default.create({
            customer_code,
            measure_datetime,
            measure_type,
            image_url: imageUrl,
            measure_uuid: measureUuid,
            has_confirmed: false,
        });
        return res.status(200).json({
            image_url: imageUrl,
            measure_value: measureValue,
            measure_uuid: newMeasure.measure_uuid,
        });
    }
    catch (error) {
        console.error('Error uploading image:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.uploadImage = uploadImage;
//# sourceMappingURL=upload.controller.js.map