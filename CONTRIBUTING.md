# Contributing to DeepSynth

First off, thank you for considering contributing to DeepSynth! It's people like you that make it such a great tool. We welcome contributions from everyone, whether it's fixing a bug, adding a new feature, improving documentation, or suggesting an idea.

## Table of Contents

- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
  - [Prerequisites](#prerequisites)
  - [Local Setup](#local-setup)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Coding Guidelines](#coding-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)

---

## How to Contribute

### Reporting Bugs
If you find a bug in DeepSynth, please create an issue on GitHub. Before creating a new issue, please check if one already exists.
When creating an issue, please include:
- A clear and descriptive title.
- Steps to reproduce the issue.
- Expected and actual behavior.
- Any relevant logs, error messages, or screenshots.
- Your OS, Node.js version, browser, and Ollama model details.

### Suggesting Enhancements
Have an idea for a new feature or improvement? We'd love to hear it! Please open an issue to discuss it before starting work on a major feature. 
When suggesting an enhancement, please include:
- A clear and descriptive title.
- A detailed description of the proposed feature and its use case.
- Any relevant mockups or examples.

### Pull Requests
1. Fork the repository and create your branch from `main`.
2. Ensure you have followed the [Development Setup](#development-setup) instructions.
3. Make your changes and test them locally.
4. Update documentation if necessary.
5. Create a pull request to the `main` branch with a clear title and description of your changes.

---

## Development Setup

### Prerequisites
Before you start, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v18+ recommended)
- `npm` or `yarn`
- [Ollama](https://ollama.com/) (You need a model like `gemma3:4b` downloaded locally: `ollama run gemma3:4b`)
- [Docker](https://www.docker.com/) (Optional, for containerized development)

### Local Setup
1. **Fork and Clone:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/deepsynth.git
   cd deepsynth
   ```

2. **Install Dependencies:**
   Install dependencies for both the frontend (`client`) and backend (`server`).
   ```bash
   cd client && npm install
   cd ../server && npm install
   cd ..
   ```

### Environment Variables
DeepSynth uses Auth0 for authentication. You will need to set up an Auth0 tenant and configure environment variables for both the client and server.

**Client (`client/.env`):**
Create a `.env` file in the `client` directory:
```env
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_AUTH0_AUDIENCE=your_auth0_api_audience
```

**Server (`server/.env`):**
Create a `.env` file in the `server` directory:
```env
AUTH0_DOMAIN=your_auth0_domain
AUTH0_AUDIENCE=your_auth0_api_audience
```

### Running the Application

**Option A: Manual Execution**
Open two terminal windows/tabs.

Terminal 1 (Frontend):
```bash
cd client
npm run dev
```

Terminal 2 (Backend):
```bash
cd server
npm start
```

**Option B: Docker Compose**
You can also run the entire stack using Docker Compose:
```bash
docker compose up --build
```
This starts the client on `http://localhost:5173` and the server on `http://localhost:5000`.

---

## Project Structure

- `client/`: Contains the React.js (Vite) frontend application, structured with Tailwind CSS and React Markdown.
- `server/`: Contains the Node.js/Express backend that handles secure communication with the local Ollama LLM.
- `docker-compose.yml`: Orchestrates the client and server containers.

---

## Coding Guidelines

- **Frontend (Client):** 
  - We use React with TypeScript (`.tsx`, `.ts`). Ensure strict typing where possible.
  - Styling is done via Tailwind CSS utility classes.
  - Follow standard ESLint rules provided in the Vite configuration. Run `npm run lint` inside the `client` directory before committing.
- **Backend (Server):** 
  - Standard Node.js/Express conventions apply.
  - Keep route handlers clean and delegate logic to controllers where necessary.

---

## Commit Message Guidelines

We prefer clear, descriptive commit messages. A good commit message should answer:
1. Why is this change necessary?
2. How does it address the issue?
3. What side effects does this change have?

**Example:**
```
fix: resolve issue with markdown code block highlighting

- Updated react-markdown configuration to properly render code blocks
- Added missing CSS for highlight.js
```

Common prefixes:
- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor:` A code change that neither fixes a bug nor adds a feature
- `test:` Adding missing tests or correcting existing tests
- `chore:` Changes to the build process or auxiliary tools and libraries

---

Thank you for contributing!
