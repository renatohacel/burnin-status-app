import { UserModel } from "../models/user.model.js";
import { validatePartialUser, validateUser } from "../validate_schemas/userValida.schema.js";


export class UserController {

    static async getAll(req, res) {
        const users = await UserModel.getAll();
        return res.status(200).send(users);
    }

    static async create(req, res) {
        // validate user data
        const input = validateUser(req.body);

        if (input.error) {
            return res.status(400).json({ error: JSON.parse(input.error.message) });
        }

        try {
            const result = await UserModel.create({ input: req.body });

            if (result.error) {
                let errorMessage;

                switch (result.error) {
                    case 'username_exists':
                        errorMessage = 'username_exists';
                        break;
                    case 'num_employee_exists':
                        errorMessage = 'num_employee_exists';
                        break;
                    default:
                        errorMessage = 'Unknow Error.';
                }

                return res.status(409).send({ error: errorMessage });
            }

            return res.status(201).send({ result });

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Server error' })
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            const result = await UserModel.delete({ id });
            if (!result) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json({ message: 'User successfully deleted.' });

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Server error' })
        }
    }

    static async update(req, res) {
        const { id } = req.params
        // validate user data
        const input = validatePartialUser(req.body);

        if (input.error) {
            return res.status(400).json({ error: JSON.parse(input.error.message) });
        }

        try {
            const result = await UserModel.update({ id, input: req.body })

            //if not exists
            if (result === null) return res.status(404).send({ message: 'User not found' });

            if (result.error) {
                let errorMessage;

                switch (result.error) {
                    case 'username_exists':
                        errorMessage = 'username_exists';
                        break;
                    case 'num_employee_exists':
                        errorMessage = 'num_employee_exists';
                        break;
                    case 'email_exists':
                        errorMessage = 'email_exists';
                        break;
                    default:
                        errorMessage = 'Unknow error.';
                }

                return res.status(409).send({ error: errorMessage });
            }

            return res.status(201).send({ result });


        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Server error' });
        }
    }

}