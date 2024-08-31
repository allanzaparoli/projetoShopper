"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractMeasurementFromImage = exports.checkMonthlyReading = exports.validateUploadData = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const date_fns_1 = require("date-fns");
const measure_model_1 = __importDefault(require("../models/measure.model"));
const axios_1 = __importDefault(require("axios"));
const validateUploadData = (image, customer_code, measure_datetime, measure_type) => {
    if (!image || !customer_code || !measure_datetime || !measure_type) {
        return "Todos os campos são obrigatórios.";
    }
    if (!['WATER', 'GAS'].includes(measure_type.toUpperCase())) {
        return "Tipo de medição inválido.";
    }
    return null;
};
exports.validateUploadData = validateUploadData;
const checkMonthlyReading = async (customer_code, measure_type, measure_datetime) => {
    const currentMonthStart = (0, date_fns_1.format)((0, date_fns_1.startOfMonth)(new Date(measure_datetime)), 'yyyy-MM-dd');
    const currentMonthEnd = (0, date_fns_1.format)((0, date_fns_1.endOfMonth)(new Date(measure_datetime)), 'yyyy-MM-dd');
    const existingMeasure = await measure_model_1.default.findOne({
        where: {
            customer_code,
            measure_type: measure_type.toUpperCase(),
            measure_datetime: {
                [sequelize_1.default.Op.between]: [currentMonthStart, currentMonthEnd]
            }
        }
    });
    if (existingMeasure) {
        return "Leitura do mês já realizada";
    }
    return null;
};
exports.checkMonthlyReading = checkMonthlyReading;
const extractMeasurementFromImage = async (image) => {
    try {
        const response = await axios_1.default.post('https://api.google.dev/gemini/v1/vision', {
            image_base64: image,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        const data = response.data;
        // Verificar se a api está retornando no formato abaixo mesmo
        const imageUrl = data.image_url;
        const measureValue = data.measure_value;
        const measureUuid = data.measure_uuid;
        return { imageUrl, measureValue, measureUuid };
    }
    catch (error) {
        console.error('Error integrating with Gemini API:', error);
        throw new Error('Error integrating with Gemini API');
    }
};
exports.extractMeasurementFromImage = extractMeasurementFromImage;
//# sourceMappingURL=upload.service.js.map