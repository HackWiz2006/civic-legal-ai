# 🏛️ Lexis Counsel — CivicLegal-AI

> **Autonomous Multi-Agent Civic & Legal Empowerment Platform for Indian Citizens**

[![Python Version](https://img.shields.io/badge/Python-3.11%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111.0-009688.svg)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black.svg)](https://nextjs.org/)
[![LangGraph](https://img.shields.io/badge/LangGraph-0.2.20-orange.svg)](https://langchain-ai.github.io/langgraph/)
[![Jurisdiction](https://img.shields.io/badge/Jurisdiction-India-orange.svg)](https://e-daakhil.nic.in/)

---

## 📌 Executive Overview

**Lexis Counsel (CivicLegal-AI)** is an end-to-end, deterministic multi-agent AI system designed to empower Indian citizens to navigate statutory consumer dispute resolutions, regulatory ombudsman channels, and transparency petitions without falling victim to procedural rejections, legal jargon, or corporate defense pre-emption.

Operating as an algorithmic procedural assistant and fact-compiler for **Party-in-Person** self-representation pursuant to **Section 35(1) of the Consumer Protection Act, 2019**, Lexis Counsel bridges the gap between raw citizen grievances and court-admissible legal petitions.

---

## ✨ Core Features & Key Capabilities

- **🎙️ Multilingual Intake & Narrative Audit (FR-01)**: Speech-to-text and text intake supporting regional Indian languages (Hindi, Tamil, Telugu, Kannada, Marathi, Bengali) with parallel translation and structured fact extraction.
- **📁 Multi-Modal Evidence Ledger (FR-02)**: Ingests invoices, WhatsApp screenshots, bank slips, and postal receipts; auto-labels court-admissible exhibits (**Exhibit A**, **Exhibit B**, etc.) conforming to Section 65B of the Indian Evidence Act / BSA 2023.
- **⚖️ Statutory RAG & Jurisdiction Validator (FR-03)**: Automatically computes pecuniary jurisdiction (District Commissions for claims $\le ₹50\text{L}$, State Commissions up to $₹2\text{Cr}$, National Commission above $₹2\text{Cr}$) and limitation periods under Section 69 CPA 2019.
- **🧮 Realistic 4-Part Damages Calculator (FR-04)**: Calculates exact, court-accepted claim values:
  $$\text{Total Claim } (T) = \text{Direct Loss } (D) + \text{Consequential Expenses } (C) + \text{Interest at 8\% p.a. } (I) + \text{Statutory Non-Pecuniary Relief } (N)$$
- **📄 Two-Tier Legal Procedural Drafter (FR-05)**:
  - **Tier 1**: 15-Day Statutory Pre-Litigation Legal Notice to corporate Nodal Officers.
  - **Tier 2**: Full e-Daakhil Court Petition Packet (Index, Statutory Fee Calc, Synopsis, Memo of Parties, Statement of Facts, Prayer Clause, and Verification Affidavit).
- **🛡️ Adversarial Red-Team Compliance QA (FR-06)**: Emulates opposing corporate counsel to catch technical vulnerabilities (Commercial Use exclusion under Sec. 2(7), Intermediary Safe Harbor under Sec. 79 IT Act, Arbitration preemption under *Emaar MGF* precedent).
- **📊 Zero-Trip Pre-Filing Readiness Meter (FR-07)**: Real-time weighted score widget ensuring all mandatory legal prerequisites are fulfilled before filing.
- **🗺️ Multi-Forum Cost vs. Time Forecaster (FR-08)**: Side-by-side comparison of dispute resolution paths (NCH 1915, RBI Ombudsman, e-Daakhil Consumer Court, RTI Online).
- **⏳ Dynamic 15-Day Statutory Countdown (FR-09)**: Manages post-notice compliance deadlines and unlocks one-click e-Daakhil petition drafting on Day 16.
- **🔒 Cyber Security & PII Shield (FR-10)**: Automated real-time redaction of Aadhaar numbers, PAN, 16-digit card details, CVVs, and OTPs prior to LLM processing.
- **🚨 Emergency Safety Gates (FR-11)**: Instant triage banners for cyber fraud (National Cyber Crime 1930 portal & RBI Zero-Liability freeze letters), medical negligence (*Jacob Mathew* warnings), and tenancy disputes.

---

## 🏗️ System Architecture & Multi-Agent Pipeline

The core architecture relies on a **Deterministic Multi-Agent State Machine** orchestrated via **LangGraph**:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 FRONTEND / CLIENT LAYER                                │
│   Next.js 16 (App Router) / React 19 / Tailwind CSS v4 / Material Symbols & Manrope    │
│   • 60/40 Split Workspace (Left: Interactive Chat/Drafter | Right: Context/Evidence)   │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ (HTTP REST / JSON / TLS 1.3)
┌───────────────────────────────────────────▼────────────────────────────────────────────┐
│                             SECURITY & API GATEWAY LAYER                               │
│     FastAPI Gateway | PII Redactor | OWASP Sanitizer | SlowAPI Rate Limiter           │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
┌───────────────────────────────────────────▼────────────────────────────────────────────┐
│                    DETERMINISTIC MULTI-AGENT ORCHESTRATION (LangGraph)                  │
│  ┌───────────────────────┐   ┌───────────────────────┐   ┌───────────────────────────┐ │
│  │ Agent 1: Evidence OCR │──▶│ Agent 2: RAG & Juris. │──▶│ Agent 3: Damages Engine   │ │
│  └───────────────────────┘   └───────────────────────┘   └─────────────┬─────────────┘ │
│                                                                        │               │
│  ┌───────────────────────┐   ┌───────────────────────┐                 │               │
│  │ State: Ready / Export │◀──│ Agent 5: Red-Team QA  │◀────────────────┘               │
│  └───────────────────────┘   └───────────┬───────────┘                                 │
│                                    ▲     │ (Feedback Loop on Vulnerability)            │
│                                    └─────┴──────────┐                                  │
│                                                     ▼                                  │
│                                          ┌───────────────────────┐                     │
│                                          │ Agent 4: Legal Drafter│                     │
│                                          └───────────────────────┘                     │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
┌───────────────────────────────────────────▼────────────────────────────────────────────┐
│                            KNOWLEDGE BASE & RETRIEVAL LAYER                            │
│  • Bare Acts: CPA 2019, RTI Act 2005, IT Act 2000, RB-IOS 2021, DGCA CAR 2023            │
│  • Hybrid RAG: InLegalBERT Embeddings + BM25 Sparse Search + Qdrant / Vector Store     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 UI/UX Design System: Parchment & Warm Amber Glassmorphism

Lexis Counsel breaks away from generic corporate blue dashboards by incorporating a warm, authoritative visual identity:

- **Parchment Base (`#fdfaf1`)**: Solves screen fatigue during intensive document drafting.
- **Warm Amber & Ochre Accents (`#903f00`, `#b45309`, `#fe932c`)**: Conveys statutory weight and empowering warmth.
- **Frosted Glass Cards (`backdrop-blur-xl`, `border-glass-stroke`)**: Organizes complex multi-agent outputs, exhibit ledgers, and countdown widgets gracefully.
- **60/40 Split Panel Layout**:
  - **Left Pane (60%)**: Interactive narrative intake and generated document viewer.
  - **Right Pane (40%)**: Persistent Zero-Trip Readiness Meter, Statutory Countdown, Exhibit Ledger, Precedents, and Forum Comparator.

---

## 💻 Tech Stack Specification

| Component | Framework / Library | Purpose |
|---|---|---|
| **Frontend Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | Server-rendered React 19 UI with responsive routing |
| **Styling & Design System** | [TailwindCSS v4](https://tailwindcss.com/) | Custom design tokens for Parchment & Amber theme |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) | Centralized state store for case metadata, exhibits & pipeline state |
| **Backend API** | [FastAPI 0.111.0](https://fastapi.tiangolo.com/) | Async Python REST server with Pydantic v2 validation |
| **Agent Orchestration** | [LangGraph 0.2.20](https://langchain-ai.github.io/langgraph/) | State-machine workflow for multi-agent legal collaboration |
| **AI Framework** | [LangChain 0.2.x](https://python.langchain.com/) | LLM abstraction, prompt templates, and chain management |
| **Legal Embeddings & RAG** | InLegalBERT + BM25 | Statutory chunk retrieval and judicial precedent matching |
| **PDF Generation** | [ReportLab](https://www.reportlab.com/) | Court-formatted PDF generation for legal notices and petitions |

---

## 🚀 Quick Start & Local Installation Guide

Follow these step-by-step instructions to download, configure, and run **Lexis Counsel (CivicLegal-AI)** locally on any Linux, macOS, or Windows machine.

---

### 📋 Prerequisites

Before starting, ensure you have the following installed on your machine:

- **Git**: `v2.x` or higher (Verify with `git --version`)
- **Python**: `v3.11` or higher (Verify with `python3 --version` or `python --version`)
- **Node.js**: `v18.x` or `v20.x` (Verify with `node -v`)
- **npm**: `v9.x` or higher (Verify with `npm -v`)

---

### Step 1: Download & Extract the Code

Choose **one** of the following methods to get the source code on your local system:

#### Option A: Clone via Git (Terminal / Command Line)

Open your terminal (macOS/Linux) or PowerShell/Command Prompt (Windows) and run:

```bash
# Clone the repository
git clone https://github.com/HackWiz2006/civic-legal-ai.git

# Navigate into the project root directory
cd civic-legal-ai
```

#### Option B: Download via ZIP Archive

1. Visit the repository page on GitHub and click **Code ➔ Download ZIP** (or download the source ZIP).
2. Extract the downloaded `civic-legal-ai.zip` file to your preferred folder.
3. Open your terminal or PowerShell and navigate to the extracted folder:

```bash
# Linux / macOS
cd ~/Downloads/civic-legal-ai-main

# Windows (Command Prompt / PowerShell)
cd %USERPROFILE%\Downloads\civic-legal-ai-main
```

---

### Step 2: Backend Setup & API Launch

Open a terminal inside the project root folder (`civic-legal-ai`):

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Create a Python virtual environment (.venv)
# On Linux / macOS:
python3 -m venv .venv
# On Windows:
python -m venv .venv

# 3. Activate the virtual environment
# On Linux / macOS:
source .venv/bin/activate
# On Windows (PowerShell):
.venv\Scripts\Activate.ps1
# On Windows (Command Prompt):
.venv\Scripts\activate.bat

# 4. Install backend dependencies
pip install --upgrade pip
pip install -r requirements.txt

# 5. Configure environment variables
# Create a .env file inside backend/ and set required values:
```

**Creating `backend/.env`:**
```ini
OPENAI_API_KEY=your_openai_api_key_here
ALLOWED_ORIGINS=["http://localhost:3000"]
TARGET_JURISDICTION=India
```

> 💡 *Note: On Linux/macOS, you can quickly create this file with:* `echo 'OPENAI_API_KEY=your_key_here' > .env`

```bash
# 6. Start the FastAPI development server
uvicorn app.main:app --reload --port 8000
```

✅ **Backend Server Status**: The API is now running at **`http://localhost:8000`**  
👉 Interactive API Docs (Swagger UI): **[http://localhost:8000/api/docs](http://localhost:8000/api/docs)**

---

### Step 3: Frontend Setup & Web Application Launch

Open a **new terminal window or tab** (keep the backend server running in the first terminal) and navigate to the project root:

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install Node.js dependencies
npm install

# 3. Start the Next.js development server
npm run dev
```

✅ **Frontend Application Status**: The web application is now running at **`http://localhost:3000`**

---

### Step 4: Verify Local Setup

1. Open your web browser and navigate to **`http://localhost:3000`**.
2. You will be greeted by the **Lexis Counsel — Parchment & Warm Amber** workspace.
3. Test the application by typing a citizen grievance into the narrative intake bar or viewing the interactive **Zero-Trip Readiness Meter** and **Statutory Countdown Dashboard** in the right panel.

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | API service health check & version info |
| `POST` | `/api/v1/intake` | Ingest raw narrative text/audio & sanitize facts |
| `POST` | `/api/v1/pipeline/run` | Trigger full LangGraph 5-agent legal pipeline |
| `GET` | `/api/v1/pipeline/status/{session_id}` | Query current pipeline execution state |
| `POST` | `/api/v1/export/pdf` | Export court-formatted PDF Legal Notice or e-Daakhil Petition |

---

## 📜 Statutory Frameworks & Covered Jurisdictions

Lexis Counsel is grounded in Indian statutory law:
- **Consumer Protection Act, 2019 (CPA 2019)** — Sec. 35 (Filing), Sec. 69 (Limitation), Sec. 2(7) (Consumer definition)
- **Right to Information Act, 2005 (RTI Act)** — Sec. 6(1) petitions & 30-day statutory timeline
- **Information Technology Act, 2000 (IT Act)** — Sec. 79 (Intermediary liability) & Consumer E-Commerce Rules 2020
- **RBI Integrated Ombudsman Scheme, 2021 (RB-IOS)** — Financial & banking dispute resolution
- **DGCA Civil Aviation Requirements (CAR 2023)** — Flight cancellation/delay compensation rights

---

## ⚠️ Statutory Disclaimer & Legal Representation Standard

> **[!IMPORTANT]**
> **Lexis Counsel is an algorithmic procedural assistant and statutory fact-compiler designed exclusively for Party-in-Person self-representation pursuant to Section 35(1) of the Consumer Protection Act, 2019.**
>
> Lexis Counsel **does not** provide formal legal counsel, legal opinion, or courtroom representation. Engagement with the platform does not create an attorney-client relationship. Citizens requiring judicial representation before High Courts or the Supreme Court of India should consult a qualified Advocate-on-Record.

---

<p align="center">Made with ❤️ for Civic Empowerment in India 🇮🇳</p>

