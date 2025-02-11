import z from "zod";

const userSchema = z.object({
    username: z.string({
        invalid_type_error: 'Username must be a string',
        required_error: 'Username is required',
    }).min(5, { message: 'Username must have at least 5 characters' }),

    password: z.string({
        invalid_type_error: 'Password must be a string',
        required_error: 'Password is required',
    }).min(5, { message: 'Password must have at least 5 characters' }),

    num_employee: z.number({
        invalid_type_error: 'Num Employee must be a number',
        required_error: 'Num Employee is required'
    }).refine((num) => num.toString().length <= 7, { message: 'Num Employee must have at least 7 numbers' }),

    name: z.string({
        invalid_type_error: 'Name must be a string',
        required_error: 'Name is required',
    }).min(3, { message: 'Name must have at least 3 characters' }),

    shift: z.number({
        invalid_type_error: 'Shift must be a number between 1-3',
        required_error: 'Shift is required'
    }).min(1, { message: 'The minimum shift is 1' }).max(3, { message: 'The maximun shift is 3' }),

    isAdmin: z.number({
        invalid_type_error: 'The type user must be 1 or 0'
    })
})

export function validateUser(input) {
    return userSchema.safeParse(input);
}

export function validatePartialUser(input) {
    return userSchema.partial().safeParse(input);
}