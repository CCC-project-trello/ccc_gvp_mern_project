// src/components/Card.js
import React, { useState, useEffect } from "react";

const Card = ({ task, onRemove, onUpdate }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [isRemoving, setIsRemoving] = useState(false);

  // Animate new task on mount
  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => setIsNew(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  // Animate update
  const handleUpdate = () => {
    const newTitle = prompt("Enter new title:", task.title);
    const newType = prompt("Enter new type:", task.type);
    const newDate = prompt("Enter new date:", task.date);

    if (newTitle && newType && newDate) {
      onUpdate(task.id, {
        ...task,
        title: newTitle,
        type: newType,
        date: newDate
      });
      setIsUpdated(true);
      setTimeout(() => setIsUpdated(false), 1500);
    }
  };

  // Animate remove
  const handleRemove = () => {
    setIsRemoving(true);
    setIsUpdated(true);
    setTimeout(() => {
      onRemove(task.id);
    }, 500);
  };

  return (
    <div
      className={`card 
        ${isNew ? "added-glow" : ""} 
        ${isUpdated && !isNew ? "updated-glow" : ""} 
        ${isRemoving ? "fading-out" : ""}`}
    >
      <div className="card-type">{task.type}</div>
      <div>{task.title}</div>
      <div className="card-date">📅 {task.date}</div>
      <button className="remove-task-button" onClick={handleRemove}>
        Remove
      </button>
      <button className="update-task-button" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default Card;
