import { useState } from 'react';

export const ProductModal = ({ initialData, title, onClose, onConfirm }) => {
  const [form, setForm] = useState({
    title: initialData?.title || '',
    price: initialData?.price ?? '',
    category: initialData?.category || '',
    description: initialData?.description || '',
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-card modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Título</label>
            <input className="glass-input" value={form.title} onChange={(e) => handleChange('title', e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Precio</label>
            <input className="glass-input" type="number" step="0.01" value={form.price} onChange={(e) => handleChange('price', e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Categoría</label>
            <input className="glass-input" value={form.category} onChange={(e) => handleChange('category', e.target.value)} />
          </div>
          <div className="input-group">
            <label>Descripción</label>
            <textarea className="glass-input" rows={3} value={form.description} onChange={(e) => handleChange('description', e.target.value)} />
          </div>
          <div className="modal-actions">
            <button type="button" className="glass-btn secondary-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="glass-btn">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};