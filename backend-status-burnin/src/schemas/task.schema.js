import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

export const Task = sequelize.define('task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

}, {
    tableName: 'tasks',
    timestamps: false,
    freezeTableName: true,
})