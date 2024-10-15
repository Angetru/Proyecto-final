const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    
    // Verifica si hay un token en el encabezado
    if (!authorization) {
        return res.status(401).json({ message: 'Acceso no autorizado: Token no proporcionado' });
    }

    try {
        const [type, token] = authorization.split(" ");

        // Verifica el tipo de token
        if (type === 'Bearer') {
            const openToken = jwt.verify(token, process.env.SECRET);

            req.user = openToken; // Asigna el payload del token a req.user
            next();
        } else {
            return res.status(401).json({ message: 'Acceso no autorizado: Tipo de token inválido' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Ocurrió un error al procesar el token', error });
    }
};
