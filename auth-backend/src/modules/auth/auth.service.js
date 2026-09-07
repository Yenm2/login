const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRepository = require('./auth.repository');

const registerUser = async ({ name, email, password }) => {
    const existingUser = await authRepository.findByEmail(email);

    if (existingUser) {
        throw new Error('El correo ya se registró');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return authRepository.createUser({
        name,
        email,
        password: hashedPassword
    });
};

const loginUser = async (email, password) => {
    const user = await authRepository.findByEmail(email);

    if (!user) {
        throw new Error('Correo inválido');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Contraseña inválida');
    }

    const token = jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        token
    };
};

module.exports = {
    registerUser,
    loginUser
};