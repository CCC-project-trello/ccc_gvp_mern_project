import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";

const Column = ({ columnId, column, onRemoveTask }) => {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
          <h2>{column.name}</h2>
          {column.items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Card task={item} onRemove={onRemoveTask} /> {/* Pass onRemove as a prop */}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
