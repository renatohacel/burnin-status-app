import { Sequelize } from 'sequelize';
import path from 'path'; // Importar el módulo path para manejar rutas

// Obtener la ruta absoluta al archivo de la base de datos
const dbPath = path.resolve('database', 'db_status_burnin.db');

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath, // Ruta absoluta
    logging: false,
});

try {
    await sequelize.authenticate();
    console.log('-------------------DATABASE------------------');
    console.log('Connection has been established successfully.');
    console.log('---------------------------------------------');
} catch (error) {
    console.log('-------------------DATABASE------------------');
    console.error('Unable to connect to the database:', error);
    console.log('---------------------------------------------');
}