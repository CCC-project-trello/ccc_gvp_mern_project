import './Board.css';

const data = [
  {
    title: "Task Ready",
    tasks: [
      { label: "Copywriting", text: "Konsep hero title yang menarik", date: "Nov 24" },
      { label: "UI Design", text: "Icon di section our services", date: "Nov 24" },
    ],
  },
  {
    title: "In Progress",
    tasks: [
      { label: "UI Design", text: "Replace lorem ipsum text in final designs", date: "Nov 24" },
      { label: "Illustration", text: "Create and generate the custom SVG illustrations", date: "Nov 24" },
    ],
  },
  {
    title: "Needs Review",
    tasks: [
      { label: "Copywriting", text: "Check the company we copied doesn't think we copied them", date: "Nov 24" },
      { label: "UI Design", text: "Design the about page.", date: "Nov 24" },
    ],
  },
  {
    title: "Done",
    tasks: [
      { label: "Illustration", text: "Send Advent illustrations to production company", date: "Nov 24" },
      { label: "Illustration", text: "Dawn wants to move text 3px to the right", date: "Nov 24" },
    ],
  },
];

export default function Board() {
  return (
    <div className="board-container">
      <h1 className="board-title">Homepage Design</h1>
      <div className="board-columns">
        {data.map((column, idx) => (
          <div key={idx} className="board-column">
            <h2 className="column-title">{column.title}</h2>
            {column.tasks.map((task, tidx) => (
              <div key={tidx} className="task-card">
                <div className="task-label">{task.label}</div>
                <div className="task-text">{task.text}</div>
                <div className="task-footer">
                  <span className="task-date">🕒 {task.date}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
