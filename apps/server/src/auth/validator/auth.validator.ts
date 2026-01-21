import {z} from "zod"
export const authValidator = z.object({
    firstname:z.string().max(20),
    lastname:z.string().max(20),
    email:z.email(),
    password:z.string().max(20)
})