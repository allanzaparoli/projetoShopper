import { Request, Response } from 'express';
import { getCustomerMeasures } from '../services/list.service';

export const listMeasures = async (req: Request, res: Response) => {
  try {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    // Validação do tipo de medição
    if (measure_type && !['WATER', 'GAS'].includes((measure_type as string).toUpperCase())) {
      return res.status(400).json({
        error_code: "INVALID_TYPE",
        error_description: "Tipo de medição não permitida",
      });
    }

    // Busca as medições do cliente no banco de dados
    const measures = await getCustomerMeasures(customer_code, measure_type as string);

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

  } catch (error) {
    console.error('Error listing measures:', error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
