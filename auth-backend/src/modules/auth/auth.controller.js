const authService = require('./auth.service');

const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const user = await authService.registerUser({ name, email, password });
		return res.status(201).json({
			mensaje: 'Usuario registrado exitosamente',
			user
		});
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await authService.loginUser(email, password);
		return res.status(200).json({
			mensaje: 'Login exitoso',
			user
		});
	} catch (error) {
		return res.status(401).json({ error: error.message });
	}
};

module.exports = {
	register,
	login
};