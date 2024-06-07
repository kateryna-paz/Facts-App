import "../style.css";

export default function Header({ showForm, setShowForm }) {
  const appTitle = "Today I learned";
  return (
    <>
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="logo" width="68" />
          <h1>{appTitle}</h1>
        </div>
        <button
          className="btn btn-large btn-open"
          onClick={() => setShowForm((show) => !show)}
        >
          {showForm ? "Close" : "Share a fact"}
        </button>
      </header>
    </>
  );
}
