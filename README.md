# LazyTask AI ✨
### Less stress. More progress.

**LazyTask AI** is an AI-powered productivity assistant that helps students and busy people prioritize their tasks, organize their day, and spend less time planning what to do next.

Instead of staring at an overwhelming to-do list, simply enter your tasks and let AI suggest a practical order of priorities and a daily schedule.

<p align="center">
  <strong>Plan smarter. Focus better. Rest easier.</strong>
</p>

---

## 🌟 Features

- 📝 **Simple Task Input** — Enter multiple tasks, one per line.
- 🧠 **AI-Powered Prioritization** — Get tasks organized by urgency and importance.
- 📅 **Daily Schedule Suggestions** — Receive a suggested plan for your day.
- 💡 **Reasoning and Guidance** — Understand why certain tasks should come first.
- ⚡ **Fast API Integration** — Connect a React frontend to an Express backend.
- 🔄 **Plan Again** — Generate another plan whenever your priorities change.
- 🔐 **Environment-Based Configuration** — Keep API credentials outside your source code.

## 🎬 Demo

**Demo video:** Add your recorded demo link here.

The demo will show how a user enters a list of tasks and receives an AI-generated priority list and suggested schedule.

**Screenshots:** Add screenshots of the application here as the project evolves.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Interactive user interface |
| Vite | Frontend development server and build tool |
| Node.js | JavaScript runtime for the backend |
| Express.js | Backend API and request handling |
| GroqCloud | Hosted AI inference |
| `openai/gpt-oss-20b` | Open-weight AI model |
| JavaScript | Application logic |
| CSS | Responsive styling |
| dotenv | Environment variable configuration |

## 🧠 How It Works

LazyTask AI connects a React frontend with an Express backend that communicates with an open-weight AI model through GroqCloud.

```text
User enters tasks
       |
       v
React frontend
       |
       | POST /api/prioritize
       v
Express.js backend
       |
       v
GroqCloud API
       |
       v
openai/gpt-oss-20b
       |
       v
AI-generated priorities
and suggested schedule
       |
       v
Results displayed in React
```

### Request flow

1. The user enters tasks in the web interface.
2. React sends the tasks to the backend as JSON.
3. Express validates the request and builds a prompt.
4. The backend sends the prompt to the configured AI model.
5. The model generates a prioritized plan.
6. Express returns the response, and React displays it.

## 🚀 Getting Started

Follow these instructions to run LazyTask AI locally.

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/) — preferably a current LTS release
- npm, which comes with Node.js
- A [GroqCloud account](https://console.groq.com/) and API key

**Note:** The model runs through hosted inference. You do not need to download the model weights onto your computer.

### 1. Clone the repository

```bash
git clone https://github.com/Sathi-Seth/lazytask-ai.git
cd lazytask-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a file named `.env` in the project root, alongside `package.json`.

Add the following configuration:

```dotenv
GROQ_API_KEY=your_actual_groq_api_key
GROQ_MODEL=openai/gpt-oss-20b
PORT=5000
```

Replace `your_actual_groq_api_key` with your own API key from the Groq Console.

**Security:** Never commit your real API key to GitHub. Keep it in `.env` and use `.env.example` for placeholders only.

### 4. Start the backend

Open a terminal in the project root and run:

```bash
node server/index.js
```

The terminal should display:

```text
Server running on port 5000
```

You can check the backend by opening:

http://localhost:5000/

Expected response:

```text
LazyTask AI backend is running!
```

### 5. Start the frontend

Open a **second terminal** in the same project directory and run:

```bash
npm run dev
```

Open the local URL displayed by Vite, usually:

http://localhost:5173/

### 6. Try it out

Enter a few example tasks:

```text
Finish my DSA assignment
Study Express.js for one hour
Submit my project tomorrow
```

Click **Prioritize my tasks** and wait for the AI-generated plan.

Keep both the frontend and backend terminals running while you use the application.

## 🔌 API Documentation

### `GET /`

Checks whether the backend is running.

**Example response:**

```text
LazyTask AI backend is running!
```

### `POST /api/prioritize`

Prioritizes the submitted tasks and generates a suggested schedule.

**Request URL (local development):**

```text
http://localhost:5000/api/prioritize
```

**Request headers:**

```http
Content-Type: application/json
```

**Request body:**

```json
{
  "tasks": [
    "Finish my DSA assignment",
    "Study Express.js for one hour",
    "Submit my project tomorrow"
  ]
}
```

**Successful response:**

```json
{
  "answer": "AI-generated priorities and a suggested daily schedule..."
}
```

The `answer` field contains the model's text response.

**Validation:** The endpoint expects a non-empty array of non-empty task strings. Invalid requests return a `400` response.

## 📁 Project Structure

```text
lazytask-ai/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── server/
│   └── index.js
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## 🔐 Security Notes

- Store your real API key in `.env`.
- Keep `.env` out of Git using `.gitignore`.
- Commit `.env.example` with placeholder values only.
- Never publish API keys in screenshots, logs, documentation, or source files.
- Keep the Groq API key on the backend; do not expose it in frontend code.
- If a key is exposed, revoke it and replace it.

## 🌍 Why Open-Weight AI?

Open-weight models give developers more opportunities to experiment with AI and build applications beyond a single proprietary model ecosystem.

LazyTask AI uses `openai/gpt-oss-20b` through GroqCloud's hosted inference service. This makes experimentation practical without downloading a large model locally.

The model's weights and the hosted inference service are separate parts of the system. Hosting through a third-party provider is not the same as running the model locally or offline.

## 🗺️ Future Improvements

- [ ] User authentication and personal task lists
- [ ] Save plans and task history in a database
- [ ] Set deadlines, priorities, and estimated durations
- [ ] Edit and reorder generated schedules
- [ ] Add a calendar view and reminders
- [ ] Support configurable model providers
- [ ] Deploy the frontend and backend
- [ ] Add automated tests and accessibility improvements

## 🤝 Contributing

Contributions, bug reports, and feature suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the application locally.
5. Submit a pull request describing your changes.

## 👩‍💻 Author

**Sathi Seth**

- GitHub: [@Sathi-Seth](https://github.com/Sathi-Seth)
- Project repository: [lazytask-ai](https://github.com/Sathi-Seth/lazytask-ai)

## 🏁 Built for Hacktoberfest 2026

LazyTask AI was built for the **Hacktoberfest Open-Source AI Challenge — Week 3: Slow and Steady**.

The idea is simple: use AI to reduce the mental effort of organizing everyday work, so people can spend more energy making progress.

**Less time planning. More time progressing.**

---

*This project uses hosted AI inference and requires a valid API key. Availability and usage are subject to the provider's terms and limits.*

