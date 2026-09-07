const validateLogin = ({ email, password }) => {
    if (!email || !password) {
        throw new Error('El correo y la contraseña son obligatorios');
    }

    return true;
};

const validateRegister = ({ name, email, password }) => {
    if (!name || !email || !password) {
        throw new Error('Nombre, correo y contraseña son obligatorios');
    }

    return true;
};

module.exports = {
    validateLogin,
    validateRegister
};