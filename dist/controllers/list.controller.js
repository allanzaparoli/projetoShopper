"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMeasures = void 0;
const list_service_1 = require("../services/list.service");
const listMeasures = async (req, res) => {
    try {
        const { customer_code } = req.params;
        const { measure_type } = req.query;
        // Validação do tipo de medição
        if (measure_type && !['WATER', 'GAS'].includes(measure_type.toUpperCase())) {
            return res.status(400).json({
                error_code: "INVALID_TYPE",
                error_description: "Tipo de medição não permitida",
            });
        }
        // Busca as medições do cliente no banco de dados
        const measures = await (0, list_service_1.getCustomerMeasures)(customer_code, measure_type);
        if (measures.length === 0) {
            return res.status(404).json({
                error_code: "MEASURES_NOT_FOUND",
                error_description: "Nenhuma leitura encontrada",
            });
        }
        return res.status(200).json({
            customer_code,
            measures,
        });
    }
    catch (error) {
        console.error('Error listing measures:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listMeasures = listMeasures;
//# sourceMappingURL=list.controller.js.map