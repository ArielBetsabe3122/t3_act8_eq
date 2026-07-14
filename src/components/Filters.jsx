export const Filters = ({ search, onSearchChange, category, onCategoryChange, categories }) => {
  return (
    <div className="filters-bar">
      <input
        type="text"
        className="glass-input filter-input"
        placeholder="Buscar por título..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        className="filter-select"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">Todas las categorías</option>
        {categories.map((cat) => {
          const value = typeof cat === 'string' ? cat : cat.slug;
          const label = typeof cat === 'string' ? cat : cat.name;
          return (
            <option key={value} value={value}>{label}</option>
          );
        })}
      </select>
    </div>
  );
};