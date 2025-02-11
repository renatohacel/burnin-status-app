import { AuthModel } from "../models/auth.model.js";
import { validateAuth } from "../validate_schemas/authValidate.schema.js";


export class AuthController {

    static async login(req, res) {
        // Validaciones
        const result = validateAuth(req.body);
        if (result.error) {
            return res.status(400).json(JSON.parse(result.error.message));
        }

        const { username, password } = req.body;

        try {
            const user = await AuthModel.login({ username, password });


            if (user === null) return res.status(401).send({ message: 'El usuario no esta registrado' });
            if (!user) return res.status(401).send({ message: 'Contraseña incorrecta' });

            res.send({ user });

        } catch (e) {
            res.status(401).send(e.message);
        }
    }

    static async logout(req, res) {
        res.json({ message: 'Cerrado sesión con exito' })
    }
}