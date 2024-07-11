import bcrypt from 'bcrypt'
import User from './users.model.js'

export const register = async (req, res) => {
    try {
        const { email, password } = req.body

        const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS))
        
        const newUser = await User.create(
            {
                email: email,
                password: hashedPassword
            }
        )

        res.status(200).json(
            {
                success: true,
                message: "User registered successfully",
                data: newUser
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                succes: false,
                message: "Error registering user",
                error: error.message
            }
        )
        
    }
}