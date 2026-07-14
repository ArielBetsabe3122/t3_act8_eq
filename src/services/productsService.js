const API_URL = 'https://dummyjson.com/products';

export const fetchProducts = async ({ page = 1, limit = 10, search = '', category = '' }) => {
  const skip = (page - 1) * limit;
  let url;

  if (search) {
    url = `${API_URL}/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
  } else if (category) {
    url = `${API_URL}/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
  } else {
    url = `${API_URL}?limit=${limit}&skip=${skip}`;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error('No se pudieron cargar los productos.');
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) throw new Error('No se pudieron cargar las categorías.');
  return response.json();
};

export const addProduct = async (product) => {
  const response = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('No se pudo agregar el producto.');
  return response.json();
};

export const updateProduct = async (id, updates) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('No se pudo actualizar el producto.');
  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('No se pudo eliminar el producto.');
  return response.json();
};