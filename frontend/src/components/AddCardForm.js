import React, { useState } from "react";

const AddCardForm = ({ columns, onAdd }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [columnId, setColumnId] = useState(Object.keys(columns)[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !type || !date) return;
    onAdd(columnId, { title, type, date });
    setTitle("");
    setType("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <select value={columnId} onChange={(e) => setColumnId(e.target.value)}>
        {Object.entries(columns).map(([id, col]) => (
          <option key={id} value={id}>{col.name}</option>
        ))}
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddCardForm;
