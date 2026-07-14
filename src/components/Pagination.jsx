export const Pagination = ({ page, totalPages, limit, onPageChange, onLimitChange }) => {
  return (
    <div className="pagination-bar">
      <label className="limit-selector">
        Mostrar
        <select value={limit} onChange={(e) => onLimitChange(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
        por página
      </label>

      <div className="page-controls">
        <button className="page-btn" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>« Anterior</button>
        <span>Página {page} de {totalPages || 1}</span>
        <button className="page-btn" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>Siguiente »</button>
      </div>
    </div>
  );
};