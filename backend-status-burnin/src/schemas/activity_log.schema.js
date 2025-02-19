import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

export const BurninActivityLog = sequelize.define('burnin_activity_log', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    shift: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    activity: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    engineers: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'burnin_activity_log',
    timestamps: false,
    freezeTableName: true,
});

export const BCActivityLog = sequelize.define('bc_activity_log', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    shift: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    activity: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    engineers: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'bc_activity_log',
    timestamps: false,
    freezeTableName: true,
});