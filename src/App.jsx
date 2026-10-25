
import { useState } from "react";
import "./App.css";

function App() {
  const [taskInput, setTaskInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePrioritize(event) {
    event.preventDefault();

    const tasks = taskInput
      .split("\n")
      .map((task) => task.trim())
      .filter(Boolean);

    if (tasks.length === 0) {
      setError("Please enter at least one task.");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await fetch("http://localhost:5000/api/prioritize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tasks }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to prioritize tasks.");
      }

      setAnswer(data.answer);
    } catch (err) {
      setError(
        err.message ||
          "Could not connect to the backend. Make sure it is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">
      <header className="navbar">
        <a className="brand" href="#">
          <span className="brand-icon">z</span>
          LazyTask<span className="brand-ai"> AI</span>
        </a>
        <span className="status">
          <span className="status-dot"></span> Your AI productivity buddy
        </span>
      </header>

      <section className="hero">
        <div className="eyebrow">LESS STRESS. MORE PROGRESS.</div>
        <h1>
          Work smarter.
          <br />
          <span>Rest easier.</span>
        </h1>
        <p className="subtitle">
          Too much to do and not enough energy? Let AI organize your day
          so you can focus on what matters.
        </p>
      </section>

      <section className="workspace">
        <form className="task-card" onSubmit={handlePrioritize}>
          <div className="card-heading">
            <div>
              <span className="step-label">YOUR DAY, SIMPLIFIED</span>
              <h2>What's on your mind?</h2>
            </div>
            <span className="sparkle">✳</span>
          </div>

          <label htmlFor="tasks">Add one task per line</label>
          <textarea
            id="tasks"
            value={taskInput}
            onChange={(event) => setTaskInput(event.target.value)}
            placeholder={
              "Finish my DSA assignment\nStudy Express.js for 1 hour\nSubmit my project tomorrow"
            }
            rows={7}
            required
          />

          <div className="form-footer">
            <span>{taskInput.split("\n").filter((t) => t.trim()).length} tasks added</span>
            <button type="submit" disabled={loading}>
              {loading ? "Planning your day..." : "Prioritize my tasks →"}
            </button>
          </div>

          {loading && (
            <p className="loading-message">
              ✨ Your AI assistant is organizing your tasks...
            </p>
          )}

          {error && <p className="error-message">{error}</p>}
        </form>

        {answer && (
          <section className="result-card" aria-live="polite">
            <div className="result-heading">
              <span className="step-label">YOUR PERSONAL PLAN</span>
              <h2>Here's your game plan ✨</h2>
            </div>
            <div className="answer-text">{answer}</div>
            <button
              className="reset-button"
              type="button"
              onClick={() => {
                setAnswer("");
                setError("");
              }}
            >
              Plan another day ↻
            </button>
          </section>
        )}
      </section>

      <footer>
        <p>Made for slower days and smarter work.</p>
        <span>LazyTask AI · Open-weight AI powered</span>
      </footer>
    </main>
  );
}

export default App;

