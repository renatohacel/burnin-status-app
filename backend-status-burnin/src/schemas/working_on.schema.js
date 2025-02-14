import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

export const WorkingOn = sequelize.define('working_on', {
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
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'working_on',
    timestamps: false,
    freezeTableName: true,
})