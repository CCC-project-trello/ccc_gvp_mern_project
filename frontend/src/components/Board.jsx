// src/components/Board.js
import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import AddCardForm from "./AddCardForm";

const initialData = {
  columns: {
    "task-ready": {
      name: "Task Ready",
      items: [
        { id: "1", title: "Konsep hero title yang menarik", type: "Copywriting", date: "2025-11-24" },
        { id: "2", title: "Icon di section our services", type: "UI Design", date: "2025-11-24" }
      ]
    },
    "in-progress": {
      name: "In Progress",
      items: [
        { id: "3", title: "Replace lorem ipsum text in final designs", type: "UI Design", date: "2025-11-24" },
        { id: "4", title: "Create and generate the custom SVG illustrations", type: "Illustration", date: "2025-11-24" }
      ]
    },
    "needs-review": {
      name: "Needs Review",
      items: [
        { id: "5", title: "Check the company we copied doesn't think we copied them", type: "Copywriting", date: "2025-11-24" },
        { id: "6", title: "Design the about page.", type: "UI Design", date: "2025-11-24" }
      ]
    },
    "done": {
      name: "Done",
      items: [
        { id: "7", title: "Send Advent illustrations to production company", type: "Illustration", date: "2025-11-24" },
        { id: "8", title: "Dawn wants to move text box to the right", type: "Illustration", date: "2025-11-24" }
      ]
    }
  }
};

const Board = () => {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("kanban-data");
    return saved ? JSON.parse(saved) : initialData.columns;
  });

  useEffect(() => {
    localStorage.setItem("kanban-data", JSON.stringify(columns));
  }, [columns]);

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];

    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];

    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: { ...sourceCol, items: sourceItems },
      [destination.droppableId]: { ...destCol, items: destItems }
    });
  };

  const addCard = (columnId, newTask) => {
    const updatedItems = [...columns[columnId].items, { id: Date.now().toString(), ...newTask }];
    setColumns({
      ...columns,
      [columnId]: { ...columns[columnId], items: updatedItems }
    });
  };

  const onRemoveTask = (taskId) => {
    const updatedColumns = { ...columns };
    for (const columnId in updatedColumns) {
      updatedColumns[columnId].items = updatedColumns[columnId].items.filter(task => task.id !== taskId);
    }
    setColumns(updatedColumns);
  };

  const onUpdateTask = (taskId, updatedTask) => {
    const updatedColumns = { ...columns };
    for (const columnId in updatedColumns) {
      updatedColumns[columnId].items = updatedColumns[columnId].items.map(task =>
        task.id === taskId ? updatedTask : task
      );
    }
    setColumns(updatedColumns);
  };

  return (
    <>
      <AddCardForm columns={columns} onAdd={addCard} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {Object.entries(columns).map(([columnId, column]) => (
            <Column
              key={columnId}
              columnId={columnId}
              column={column}
              onRemoveTask={onRemoveTask}
              onUpdateTask={onUpdateTask}
            />
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default Board;
