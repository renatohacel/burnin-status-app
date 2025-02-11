import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    num_employee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    shift: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: 'users',
    timestamps: false,
    freezeTableName: true,
});