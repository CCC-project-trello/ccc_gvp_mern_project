import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import AddCardForm from "./AddCardForm";

const initialData = {
  columns: {
    "task-ready": {
      name: "Task Ready",
      items: [
        { id: "1", title: "Konsep hero title yang menarik", type: "Copywriting", date: "2025-11-24", phase: "task-ready" },
        { id: "2", title: "Icon di section our services", type: "UI Design", date: "2025-11-24", phase: "task-ready" }
      ]
    },
    "in-progress": {
      name: "In Progress",
      items: [
        { id: "3", title: "Replace lorem ipsum text in final designs", type: "UI Design", date: "2025-11-24", phase: "in-progress" },
        { id: "4", title: "Create and generate the custom SVG illustrations", type: "Illustration", date: "2025-11-24", phase: "in-progress" }
      ]
    },
    "needs-review": {
      name: "Needs Review",
      items: [
        { id: "5", title: "Check the company we copied doesn't think we copied them", type: "Copywriting", date: "2025-11-24", phase: "needs-review" },
        { id: "6", title: "Design the about page.", type: "UI Design", date: "2025-11-24", phase: "needs-review" }
      ]
    },
    "done": {
      name: "Done",
      items: [
        { id: "7", title: "Send Advent illustrations to production company", type: "Illustration", date: "2025-11-24", phase: "done" },
        { id: "8", title: "Dawn wants to move text box to the right", type: "Illustration", date: "2025-11-24", phase: "done" }
      ]
    }
  }
};

const Board = () => {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("kanban-data");
    return saved ? JSON.parse(saved) : initialData.columns;
  });

  const [taskGlow, setTaskGlow] = useState(null);  // state for glow animation

  useEffect(() => {
    localStorage.setItem("kanban-data", JSON.stringify(columns));
  }, [columns]);

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];

    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];

    const [movedItem] = sourceItems.splice(source.index, 1);

    // ✅ Update the task's phase when moved
    const updatedTask = { ...movedItem, phase: destination.droppableId };
    destItems.splice(destination.index, 0, updatedTask);

    setColumns({
      ...columns,
      [source.droppableId]: { ...sourceCol, items: sourceItems },
      [destination.droppableId]: { ...destCol, items: destItems }
    });
  };

  const addCard = (columnId, newTask) => {
    const newCard = {
      id: Date.now().toString(),
      ...newTask,
      phase: columnId
    };
    const updatedItems = [...columns[columnId].items, newCard];
    setColumns({
      ...columns,
      [columnId]: { ...columns[columnId], items: updatedItems }
    });

    // Trigger glow effect for new task
    setTaskGlow(newCard.id);
    setTimeout(() => setTaskGlow(null), 1500);  // Reset glow after 1.5s
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
        task.id === taskId ? { ...updatedTask, phase: columnId } : task
      );
    }
    setColumns(updatedColumns);

    // Trigger glow effect for updated task
    setTaskGlow(taskId);
    setTimeout(() => setTaskGlow(null), 1500);  // Reset glow after 1.5s
  };

  return (
    <div className="background-wrapper">
      <div className="task-manager">
        <h2 className="board-title">Task Manager</h2>
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
                taskGlow={taskGlow}  // Pass the glow effect prop to Column
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
