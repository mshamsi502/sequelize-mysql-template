import { Model, DataTypes } from "sequelize"
import { sequelize } from "./index.js"

export class Vehicle extends Model {}
Vehicle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    make: { type: DataTypes.STRING, allowNull: true },
    model: { type: DataTypes.STRING, allowNull: true },
    trim: { type: DataTypes.STRING, allowNull: true },
    body: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize, modelName: "Vehicle" }
)
