import Measure from '../models/measure.model';

export const getCustomerMeasures = async (customer_code: string, measure_type?: string) => {
  const whereCondition: any = {
    customer_code
  };

  if (measure_type) {
    whereCondition.measure_type = measure_type.toUpperCase();
  }

  const measures = await Measure.findAll({
    where: whereCondition,
    order: [['measure_datetime', 'DESC']],
  });

  return measures;
};
