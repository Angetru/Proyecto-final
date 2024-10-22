const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // Verifica si el token está presente
  if (!authorization) {
    return res.status(401).json({ message: 'Acceso no autorizado: Token no proporcionado' });
  }

  try {
    const [type, token] = authorization.split(" ");

    // Verifica si el tipo de token es Bearer
    if (type !== 'Bearer') {
      return res.status(401).json({ message: 'Acceso no autorizado: Tipo de token inválido' });
    }

    // Verifica y decodifica el token
    const decodedToken = jwt.verify(token, process.env.SECRET || process.env.JWT_SECRET);

    // Verifica si el token tiene un ID de usuario
    if (!decodedToken.id) {
      return res.status(401).json({ message: 'Acceso no autorizado: Token inválido' });
    }

    // Asigna el ID del usuario al objeto req.user
    req.user = { id: decodedToken.id };

    next();
  } catch (error) {
    console.error('Error al procesar el token:', error);
    return res.status(500).json({ message: 'Ocurrió un error al procesar el token', error });
  }
};
