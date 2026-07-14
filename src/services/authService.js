const API_URL = 'https://dummyjson.com/auth/login';

/**
 * Función para iniciar sesión en la API de DummyJSON
 * @param {string} username - Nombre de usuario (ej. 'emilys')
 * @param {string} password - Contraseña (ej. 'emilyspass')
 */
export const loginUser = async (username, password) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  // Si la respuesta no es correcta, lanzamos un error
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Usuario o contraseña incorrectos');
  }

  // Si todo sale bien, retornamos los datos del usuario
  return await response.json();
};