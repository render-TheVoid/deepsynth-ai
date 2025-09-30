# DeepSynth

**DeepSynth** is a web-based chatbot powered by a **local LLM** (Ollama Deepseek-R1 1.5B, distilled 4-bit quantized model). It allows users to chat locally with the model and download their conversation logs as JSON. No database is required — all data is handled in-memory or exported from the frontend.

---

## Features

- **Local LLM Integration:** Uses `deepseek-r1:1.5b` locally for fast, private inference.  
- **Frontend:** Built with React.js and styled using Tailwind CSS. Handles chat UI and JSON export.  
- **Backend:** Node.js + Express.js handles chat messages to the local model.  
- **Downloadable Chat Logs:** Frontend allows exporting conversations as structured JSON files.  
- **Session Metadata:** Each message includes timestamps, roles, and model metadata (like quantization and response time).  
- **No Database:** All chats are temporary and can be saved locally as JSON.

---

## Tech Stack

- **Frontend:** React.js + Tailwind CSS  
- **Backend:** Node.js + Express.js  
- **Local Model:** Ollama Deepseek-R1 1.5B (distilled 4-bit quantized model)  
- **Data Storage:** Frontend JSON export (no database required)

## Screenshot

![DeepSynth AI](screenshot.png)

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)  
- npm or yarn  
- Ollama local LLM installed (deepseek-r1:1.5b or any)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/render-thevoid/deepsynth-ai.git
cd deepsynth

npx nodemon service/ai.service.js

npm run dev

```

# Future Improvements

- **Dark mode** for the frontend UI  
- **Database integration** for persistent chat history  
- **Enhanced analytics** for exported conversations  
- **Support for multiple local LLM models**  
- **Mobile-friendly responsive design**


---

# Contributing

We welcome contributions! You can help by:

- Submitting bug reports or feature requests  
- Forking the repository and making improvements  
- Creating pull requests for new features or fixes  
- Suggesting enhancements or optimizations  

Please follow standard GitHub workflow and best practices when contributing.
