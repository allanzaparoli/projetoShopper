import { Request, Response } from 'express';
import { validateUploadData, checkMonthlyReading, extractMeasurementFromImage } from '../services/upload.service';
import Measure from '../models/measure.model';

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { image, customer_code, measure_datetime, measure_type } = req.body;

    // Validação dos dados enviados
    const validationError = validateUploadData(image, customer_code, measure_datetime, measure_type);
    if (validationError) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: validationError,
      });
    }

    // Verifica se já existe uma leitura para o tipo no mês atual
    const duplicateError = await checkMonthlyReading(customer_code, measure_type, measure_datetime);
    if (duplicateError) {
      return res.status(409).json({
        error_code: "DOUBLE_REPORT",
        error_description: duplicateError,
      });
    }

    // Integração com a API Gemini (simulada)
    const { imageUrl, measureValue, measureUuid } = await extractMeasurementFromImage(image);

    // Salvar a nova leitura no banco de dados
    const newMeasure = await Measure.create({
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

  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
