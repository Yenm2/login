const bcrypt = require('bcryptjs');
const authRepository = require('./auth.repository');

const registerUser = async ({ name, email, password }) => {
    const existingUser = await authRepository.findByEmail(email);
    if (existingUser) {
        throw new Error('El correo ya se registró');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await authRepository.createUser({
        name,
        email,
        password: hashedPassword
    });

    return newUser;
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

    return {
        id: user.id,
        name: user.name,
        email: user.email
    };
};

module.exports = {
    registerUser,
    loginUser
};