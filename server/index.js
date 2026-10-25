
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

// Test backend
app.get("/", (req, res) => {
  res.send("LazyTask AI backend is running!");
});

// AI task prioritization
app.post("/api/prioritize", async (req, res) => {
  try {
    if (!groq || !process.env.GROQ_MODEL) {
      return res.status(500).json({
        error: "Missing GROQ_API_KEY or GROQ_MODEL in .env"
      });
    }

    const { tasks } = req.body;

    if (
      !Array.isArray(tasks) ||
      tasks.length === 0 ||
      !tasks.every(
        (task) => typeof task === "string" && task.trim().length > 0
      )
    ) {
      return res.status(400).json({
        error: "Provide a non-empty array of task strings."
      });
    }

    const taskList = tasks
      .map((task, index) => `${index + 1}. ${task.trim()}`)
      .join("\n");

    const result = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are LazyTask AI, a productivity assistant. " +
            "Prioritize tasks by urgency and importance. " +
            "Create a realistic schedule and briefly explain your reasoning. " +
            "Use clear headings and a numbered list."
        },
        {
          role: "user",
          content: `Prioritize these tasks and create a realistic schedule:\n${taskList}`
        }
      ],
      max_tokens: 500,
      temperature: 0.3
    });

    const answer = result.choices?.[0]?.message?.content;

    if (!answer) {
      throw new Error("The AI returned an empty response.");
    }

    return res.json({ answer });
} catch (error) {
  console.error("GROQ ERROR:", error);
  console.error("MESSAGE:", error.message);
  console.error("STATUS:", error.status);

  return res.status(500).json({
    error: error.message || "Unknown error",
    status: error.status || null
  });
}
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






