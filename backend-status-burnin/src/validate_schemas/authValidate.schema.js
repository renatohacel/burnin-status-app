import z from "zod";

const authSchema = z.object({
    username: z.string({
        invalid_type_error: 'Username must be a string',
        required_error: 'Username is required',
    }).min(5, { message: 'Username must have at least 5 characters' }),

    password: z.string({
        invalid_type_error: 'Password must be a string',
        required_error: 'Password is required',
    }).min(5, { message: 'Password must have at least 5 characters' }),
});

export function validateAuth(input) {
    return authSchema.safeParse(input);
}
