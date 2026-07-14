import { useState, useEffect, useCallback } from 'react';
import {
  fetchProducts,
  fetchCategories,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../services/productsService';
import { Filters } from './Filters';
import { Pagination } from './Pagination';
import { ProductModal } from './ProductModal';

const getParamsFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    page: Number(params.get('page')) || 1,
    limit: Number(params.get('limit')) || 10,
    search: params.get('search') || '',
    category: params.get('category') || '',
  };
};

const updateURL = ({ page, limit, search, category }) => {
  const params = new URLSearchParams();
  params.set('page', page);
  params.set('limit', limit);
  if (search) params.set('search', search);
  if (category) params.set('category', category);
  window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
};

export const ProductsTable = () => {
  const initial = getParamsFromURL();
  const [page, setPage] = useState(initial.page);
  const [limit, setLimit] = useState(initial.limit);
  const [search, setSearch] = useState(initial.search);
  const [category, setCategory] = useState(initial.category);

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {});
  }, []);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchProducts({ page, limit, search, category });
      setProducts(data.products || []);
      setTotal(data.total || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, category]);

  useEffect(() => {
    updateURL({ page, limit, search, category });
    loadProducts();
  }, [page, limit, search, category, loadProducts]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const handleSearchChange = (value) => { setSearch(value); setPage(1); };
  const handleCategoryChange = (value) => { setCategory(value); setPage(1); };
  const handleLimitChange = (value) => { setLimit(value); setPage(1); };

  const handleAddConfirm = async (formData) => {
    try {
      await addProduct({
        title: formData.title,
        price: Number(formData.price),
        category: formData.category,
        description: formData.description,
      });
      setModalMode(null);
      loadProducts(); // reflejamos el cambio en la tabla
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditConfirm = async (formData) => {
    if (!window.confirm('¿Confirmas que deseas guardar los cambios de este producto?')) return;
    try {
      await updateProduct(selectedProduct.id, {
        title: formData.title,
        price: Number(formData.price),
        category: formData.category,
        description: formData.description,
      });
      setModalMode(null);
      setSelectedProduct(null);
      loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`¿Seguro que deseas eliminar "${product.title}"?`)) return;
    try {
      await deleteProduct(product.id);
      loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="products-table-wrapper">
      <div className="table-toolbar">
        <Filters
          search={search}
          onSearchChange={handleSearchChange}
          category={category}
          onCategoryChange={handleCategoryChange}
          categories={categories}
        />
        <button className="glass-btn" onClick={() => setModalMode('add')}>
          + Agregar producto
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}
      {loading && <p className="loading-text">Cargando...</p>}

      {!loading && (
        <table className="data-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.category}</td>
                <td>${p.price}</td>
                <td className="actions-cell">
                  <button className="table-btn" onClick={() => { setSelectedProduct(p); setModalMode('edit'); }}>
                    Editar
                  </button>
                  <button className="table-btn danger" onClick={() => handleDelete(p)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan="4">No se encontraron productos.</td></tr>
            )}
          </tbody>
        </table>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={handleLimitChange}
      />

      {modalMode === 'add' && (
        <ProductModal
          title="Agregar producto"
          onClose={() => setModalMode(null)}
          onConfirm={handleAddConfirm}
        />
      )}
      {modalMode === 'edit' && selectedProduct && (
        <ProductModal
          title="Editar producto"
          initialData={selectedProduct}
          onClose={() => { setModalMode(null); setSelectedProduct(null); }}
          onConfirm={handleEditConfirm}
        />
      )}
    </div>
  );
};