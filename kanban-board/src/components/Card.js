import React from "react";

const Card = ({ task, onRemove }) => {
  return (
    <div className="card">
      <div className="card-type">{task.type}</div>
      <div>{task.title}</div>
      <div className="card-date">📅 {task.date}</div>
      {/* Remove button */}
      <button className="remove-task-button" onClick={() => onRemove(task.id)}>
        Remove
      </button>
    </div>
  );
};

export default Card;
