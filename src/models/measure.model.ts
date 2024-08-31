import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from "../database/config";
import { UUIDV4 } from "sequelize";

class Measure extends Model {
  public id!: number;
  public customer_code!: string;
  public measure_datetime!: Date;
  public measure_type!: string;
  public image_url!: string;
  public measure_uuid!: string;
  public has_confirmed!: boolean;
}

Measure.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  customer_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  measure_datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  measure_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // valor_medida: {
  //   type: DataTypes.NUMBER,
  //   allowNull: false,
  // },
  measure_uuid: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
  },
  has_confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },

}, {
  sequelize,
  modelName: "Measure",
  tableName: "measures",
  timestamps: false,
});

export default Measure;