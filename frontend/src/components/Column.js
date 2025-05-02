// src/components/Column.js
import React from "react";
import Card from "./Card";

const Column = ({ columnId, column, onRemoveTask, onUpdateTask }) => {
  return (
    <div className="board-column">
      <div className="column-title">{column.name}</div>
      {column.items.map((item) => (
        <div key={item.id} className="task-card">
          <Card
            task={item}
            onRemove={onRemoveTask}
            onUpdate={onUpdateTask}
          />
        </div>
      ))}
    </div>
  );
};

export default Column;
