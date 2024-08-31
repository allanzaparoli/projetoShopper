"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmMeasurement = void 0;
const confirm_service_1 = require("../services/confirm.service");
const confirmMeasurement = async (req, res) => {
    try {
        const { measure_uuid, confirmed_value } = req.body;
        // Validação dos dados enviados
        const validationError = (0, confirm_service_1.validateConfirmData)(measure_uuid, confirmed_value);
        if (validationError) {
            return res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: validationError,
            });
        }
        // Verifica se a medida existe
        const measure = await (0, confirm_service_1.checkIfMeasureExists)(measure_uuid);
        if (!measure) {
            return res.status(404).json({
                error_code: "MEASURE_NOT_FOUND",
                error_description: "Leitura não encontrada",
            });
        }
        // Verifica se a medida já foi confirmada
        if (measure.has_confirmed) {
            return res.status(409).json({
                error_code: "CONFIRMATION_DUPLICATE",
                error_description: "Leitura já confirmada",
            });
        }
        // Salva o valor confirmado no banco de dados
        await (0, confirm_service_1.saveConfirmedValue)(measure_uuid, confirmed_value);
        return res.status(200).json({ success: true });
    }
    catch (error) {
        console.error('Error confirming measurement:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.confirmMeasurement = confirmMeasurement;
//# sourceMappingURL=confirm.controller.js.map