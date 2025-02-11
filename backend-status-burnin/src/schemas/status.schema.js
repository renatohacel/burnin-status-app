import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

export const Status = sequelize.define('status', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    time: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    updated_by: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'status',
    timestamps: false,
    freezeTableName: true,
})