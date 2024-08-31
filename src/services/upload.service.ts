import Sequelize from 'sequelize';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import Measure from '../models/measure.model';
import axios from 'axios';

export const validateUploadData = (image: string, customer_code: string, measure_datetime: string, measure_type: string) => {
  if (!image || !customer_code || !measure_datetime || !measure_type) {
    return "Todos os campos são obrigatórios.";
  }

  if (!['WATER', 'GAS'].includes(measure_type.toUpperCase())) {
    return "Tipo de medição inválido.";
  }

  return null;
};

export const checkMonthlyReading = async (customer_code: string, measure_type: string, measure_datetime: string) => {
  const currentMonthStart = format(startOfMonth(new Date(measure_datetime)), 'yyyy-MM-dd');
  const currentMonthEnd = format(endOfMonth(new Date(measure_datetime)), 'yyyy-MM-dd');

  const existingMeasure = await Measure.findOne({
    where: {
      customer_code,
      measure_type: measure_type.toUpperCase(),
      measure_datetime: {
        [Sequelize.Op.between]: [currentMonthStart, currentMonthEnd]
      }
    }
  });

  if (existingMeasure) {
    return "Leitura do mês já realizada";
  }

  return null;
};

export const extractMeasurementFromImage = async (image: string) => {
  const base64Image = image;
  try {
    const response = await axios.post('https://vision.googleapis.com/v1/images:annotate', {
    image_base64: base64Image,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
        'Content-Type': 'applicatiaon/json',
      },
    });

    const data = response.data;

    // Verificar se a api está retornando no formato abaixo 
    const imageUrl = data.image_url;
    const measureValue = data.measure_value;
    const measureUuid = data.measure_uuid;

    return { imageUrl, measureValue, measureUuid };

  } catch (error) {
    console.error('Error integrating with Gemini API:', error);
    throw new Error('Error integrating with Gemini API');
  }
};
