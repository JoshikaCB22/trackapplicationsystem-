import './TaskList.css';

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString();
};

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (!tasks.length) {
    return <div className="task-empty">No tasks found. Create one to get started!</div>;
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task._id} className={`task-card priority-${task.priority} status-${task.status.replace(' ', '-')}`}>
          <div className="task-info">
            <div className="task-title">{task.title}</div>
            {task.description && <div className="task-description">{task.description}</div>}
            <div className="task-meta">
              <span className={`badge badge-status-${task.status.replace(' ', '-')}`}>{task.status}</span>
              <span className={`badge badge-priority-${task.priority}`}>{task.priority}</span>
              {task.category && <span className="badge badge-category">{task.category}</span>}
              {task.dueDate && <span className="badge badge-due">Due: {formatDate(task.dueDate)}</span>}
            </div>
          </div>
          <div className="task-actions">
            <button onClick={() => onEdit(task)} className="btn-edit">Edit</button>
            <button onClick={() => onDelete(task._id)} className="btn-delete">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
