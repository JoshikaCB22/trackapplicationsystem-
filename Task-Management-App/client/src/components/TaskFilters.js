import './TaskFilters.css';

const TaskFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setFilters({ search: '', status: '', priority: '', category: '', sort: 'latest' });
  };

  return (
    <div className="task-filters">
      <div className="filters-grid">
        <div className="filter-group">
          <label>Search</label>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search by title..."
          />
        </div>
        <div className="filter-group">
          <label>Status</label>
          <select name="status" value={filters.status} onChange={handleChange}>
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Priority</label>
          <select name="priority" value={filters.priority} onChange={handleChange}>
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Sort</label>
          <select name="sort" value={filters.sort} onChange={handleChange}>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div className="filter-group">
          <label>&nbsp;</label>
          <button onClick={handleClear} className="btn-clear">Clear</button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
