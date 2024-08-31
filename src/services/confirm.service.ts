import Measure from '../models/measure.model';

export const validateConfirmData = (measure_uuid: string, confirmed_value: number) => {
  if (!measure_uuid || typeof confirmed_value !== 'number') {
    return "UUID ou valor confirmado inválido.";
  }
  return null;
};

export const checkIfMeasureExists = async (measure_uuid: string) => {
  const measure = await Measure.findOne({ where: { measure_uuid } });
  return measure;
};

export const saveConfirmedValue = async (measure_uuid: string, confirmed_value: number) => {
  const measure = await checkIfMeasureExists(measure_uuid);
  if (measure) {
    measure.has_confirmed = true;
    // Salve o valor confirmado se necessário
    await measure.save();
  }
};
