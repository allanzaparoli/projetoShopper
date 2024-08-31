import { Request, Response } from 'express';
import { validateConfirmData, checkIfMeasureExists, saveConfirmedValue } from '../services/confirm.service';

export const confirmMeasurement = async (req: Request, res: Response) => {
  try {
    const { measure_uuid, confirmed_value } = req.body;

    // Validação dos dados enviados
    const validationError = validateConfirmData(measure_uuid, confirmed_value);
    if (validationError) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: validationError,
      });
    }

    // Verifica se a medida existe
    const measure = await checkIfMeasureExists(measure_uuid);
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
    await saveConfirmedValue(measure_uuid, confirmed_value);

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error confirming measurement:', error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
