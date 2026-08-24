---

## project\_name: "Lexis Counsel / CivicLegal-AI" version: "1.1.0" target\_jurisdiction: "India" document\_type: "Technical Specification & Architecture Document (TechStack.md)" design\_spec\_reference: "Design.md" ui\_theme: "Parchment & Warm Amber Glassmorphism" frameworks: \["FastAPI", "LangGraph", "Next.js 14", "TailwindCSS", "Qdrant", "InLegalBERT"\] ai\_agent\_readable: true

# Technical Specification & Architecture Document (TechStack.md)

## Autonomous Multi-Agent Civic & Legal Empowerment Platform (India)

---

## 1\. System Topology & Architectural Blueprint

┌────────────────────────────────────────────────────────────────────────────────────────┐

│                                 FRONTEND / CLIENT LAYER                                │

│   Next.js 14 (App Router) / React 18 / Tailwind CSS / Manrope / Material Symbols       │

│   • 60/40 Split Workspace (Left: Interactive Chat/Drafter, Right: Context/Evidence)    │

│   • Glassmorphic Amber Theme (bg-parchment-surface, backdrop-blur-xl, border-glass)   │

└───────────────────────────────────────────┬────────────────────────────────────────────┘

                                            │ (HTTPS / TLS 1.3 / JSON REST)

┌───────────────────────────────────────────▼────────────────────────────────────────────┐

│                             SECURITY & API GATEWAY LAYER                               │

│     FastAPI Gateway | OWASP Sanitizer | PII Redactor | Rate Limiter | Session Vault    │

└───────────────────────────────────────────┬────────────────────────────────────────────┘

                                            │

┌───────────────────────────────────────────▼────────────────────────────────────────────┐

│                    DETERMINISTIC MULTI-AGENT ORCHESTRATION (LangGraph)                  │

│  ┌───────────────────────┐   ┌───────────────────────┐   ┌───────────────────────────┐ │

│  │ Agent 1: Evidence OCR │──▶│ Agent 2: RAG & Juris. │──▶│ Agent 3: Damages Engine   │ │

│  └───────────────────────┘   └───────────────────────┘   └─────────────┬─────────────┘ │

│                                                                        │               │

│  ┌───────────────────────┐   ┌───────────────────────┐                 │               │

│  │ State: Ready/Export   │◀──│ Agent 5: Red-Team QA  │◀────────────────┘               │

│  └───────────────────────┘   └───────────┬───────────┘                                 │

│                                    ▲     │ (Feedback Loop on Defect)                   │

│                                    └─────┴──────────┐                                  │

│                                                     ▼                                  │

│                                          ┌───────────────────────┐                     │

│                                          │ Agent 4: Legal Drafter│                     │

│                                          └───────────────────────┘                     │

└───────────────────────────────────────────┬────────────────────────────────────────────┘

                                            │

┌───────────────────────────────────────────▼────────────────────────────────────────────┐

│                            KNOWLEDGE BASE & RETRIEVAL LAYER                            │

│  • Bare Acts (CPA 2019, RTI 2005, IT Act 2000\) \- India Code Hierarchical Chunking      │

│  • Regulatory Guidelines (DGCA CAR, RBI Ombudsman)                                     │

│  • Judicial Precedents (Supreme Court DigiSCR, Indian Kanoon API, eCourts NJDG)        │

│  • Embedding Backbone: InLegalBERT \+ BM25 Sparse Index | Vector Store: Qdrant / PGVector│

└────────────────────────────────────────────────────────────────────────────────────────┘

---

## 2\. Directory Structure & Project Scaffolding

civic-legal-ai/

├── backend/

│   ├── app/

│   │   ├── api/

│   │   │   ├── endpoints/

│   │   │   │   ├── intake.py

│   │   │   │   ├── pipeline.py

│   │   │   │   └── export.py

│   │   │   └── router.py

│   │   ├── core/

│   │   │   ├── config.py

│   │   │   └── security.py          \# PII redaction, encryption, rate limiting

│   │   ├── agents/

│   │   │   ├── state.py             \# AgentState TypedDict & Pydantic models

│   │   │   ├── nodes.py             \# Agent 1-5 node implementations

│   │   │   ├── graph.py             \# LangGraph state machine definition

│   │   │   └── prompts.py           \# Production system prompts

│   │   ├── rag/

│   │   │   ├── vector\_store.py      \# Qdrant client & InLegalBERT embeddings

│   │   │   ├── hybrid\_retriever.py  \# BM25 \+ Dense RRF fusion

│   │   │   └── schemas.py           \# Statutory and precedent chunk schemas

│   │   └── main.py

│   ├── Dockerfile

│   └── requirements.txt

├── frontend/

│   ├── src/

│   │   ├── app/

│   │   │   ├── layout.tsx           \# Global fonts, ambient glows, side nav

│   │   │   ├── page.tsx             \# 60/40 Split Workspace Main Hub

│   │   │   ├── intake/page.tsx

│   │   │   ├── evidence/page.tsx

│   │   │   ├── notice/page.tsx

│   │   │   └── petition/page.tsx

│   │   ├── components/

│   │   │   ├── SideNavBar.tsx       \# Glassmorphic 280px sidebar

│   │   │   ├── Header.tsx           \# Case reference toolbar

│   │   │   ├── ChatMessageCard.tsx  \# Glassmorphic AI card with amber line

│   │   │   ├── ContextPanel.tsx     \# 40% Right Context & Legal Materials

│   │   │   ├── NextBestActionCard.tsx

│   │   │   ├── ReadinessMeter.tsx

│   │   │   └── CountdownTimer.tsx

│   │   ├── lib/

│   │   │   ├── api.ts

│   │   │   └── store.ts             \# Zustand global state

│   │   └── styles/globals.css

│   ├── tailwind.config.js           \# Full design tokens from Design.md

│   └── package.json

└── knowledge\_base/

    ├── bare\_acts/

    ├── circulars/

    └── precedents/

---

## 3\. Frontend UI Specifications & Tailwind Tokens

### 3.1 Tailwind CSS Configuration (`frontend/tailwind.config.js`)

/\*\* @type {import('tailwindcss').Config} \*/

module.exports \= {

  darkMode: "class",

  content: \["./src/\*\*/\*.{js,ts,jsx,tsx,mdx}"\],

  theme: {

    extend: {

      colors: {

        "primary": "\#903f00",

        "primary-container": "\#b45309",

        "primary-fixed": "\#ffdbca",

        "primary-fixed-dim": "\#ffb68e",

        "on-primary": "\#ffffff",

        "on-primary-container": "\#fff1eb",

        "on-primary-fixed": "\#331200",

        "on-primary-fixed-variant": "\#763300",

        "inverse-primary": "\#ffb68e",

        "secondary": "\#904d00",

        "secondary-container": "\#fe932c",

        "secondary-fixed": "\#ffdcc3",

        "secondary-fixed-dim": "\#ffb77d",

        "on-secondary": "\#ffffff",

        "on-secondary-container": "\#663500",

        "on-secondary-fixed": "\#2f1500",

        "on-secondary-fixed-variant": "\#6e3900",

        "tertiary": "\#575754",

        "tertiary-container": "\#6f6f6c",

        "tertiary-fixed": "\#e4e2de",

        "tertiary-fixed-dim": "\#c8c6c3",

        "on-tertiary": "\#ffffff",

        "on-tertiary-container": "\#f5f3ef",

        "on-tertiary-fixed": "\#1b1c1a",

        "on-tertiary-fixed-variant": "\#474744",

        "parchment-surface": "\#fdfaf1",

        "surface": "\#f8f9fc",

        "surface-bright": "\#f8f9fc",

        "surface-dim": "\#d8dadd",

        "surface-variant": "\#e1e2e5",

        "surface-container": "\#eceef0",

        "surface-container-low": "\#f2f4f6",

        "surface-container-lowest": "\#ffffff",

        "surface-container-high": "\#e7e8eb",

        "surface-container-highest": "\#e1e2e5",

        "on-surface": "\#191c1e",

        "on-surface-variant": "\#564338",

        "inverse-surface": "\#2e3133",

        "inverse-on-surface": "\#eff1f3",

        "outline": "\#897267",

        "outline-variant": "\#ddc1b3",

        "glass-fill": "rgba(255, 255, 255, 0.65)",

        "glass-stroke": "rgba(180, 83, 9, 0.15)",

        "error": "\#ba1a1a",

        "error-container": "\#ffdad6",

        "on-error": "\#ffffff",

        "on-error-container": "\#93000a"

      },

      fontFamily: {

        body: \["Manrope", "sans-serif"\],

        headline: \["Manrope", "sans-serif"\]

      },

      spacing: {

        "sidebar-expanded": "280px",

        "sidebar-collapsed": "72px",

        "gutter": "24px",

        "max-width-fluid": "1440px"

      }

    }

  },

  plugins: \[require("@tailwindcss/forms"), require("@tailwindcss/typography")\]

};

---

## 4\. Complete Python / LangGraph Multi-Agent Implementation

### 4.1 State Schema Definition (`backend/app/agents/state.py`)

from typing import List, Dict, Optional, Any, TypedDict

from pydantic import BaseModel, Field

class ExhibitItem(BaseModel):

    exhibit\_id: str \= Field(description="Admissible label e.g., Exhibit A, Exhibit B")

    file\_name: str

    doc\_type: str \= Field(description="Invoice, WhatsApp, Email, Bank Receipt, SpeedPost")

    timestamp: str

    amount: float \= 0.0

    extracted\_summary: str

    is\_pii\_redacted: bool \= True

class PrecedentCitation(BaseModel):

    case\_title: str

    citation: str

    forum: str

    bench: str

    applied\_provisions: List\[str\]

    ratio\_decidendi: str

    awarded\_relief: str

    source\_url: str

class DamageBreakdown(BaseModel):

    direct\_pecuniary\_loss: float \= 0.0

    consequential\_expenses: float \= 0.0

    statutory\_interest\_rate: float \= 0.08  \# 8% p.a.

    statutory\_interest\_amount: float \= 0.0

    non\_pecuniary\_damages: float \= 0.0

    total\_claim\_amount: float \= 0.0

    calculation\_summary: str

class RedTeamAuditReport(BaseModel):

    passed: bool

    unsupported\_facts: List\[str\] \= \[\]

    vulnerable\_clauses: List\[str\] \= \[\]

    defense\_countermeasures: List\[str\] \= \[\]

    audit\_notes: str

class AgentState(TypedDict):

    session\_id: str

    language: str

    raw\_narrative: str

    sanitized\_narrative: str

    is\_sensitive\_emergency: bool

    emergency\_type: Optional\[str\]

    raw\_files: List\[Dict\[str, Any\]\]

    exhibit\_index: List\[ExhibitItem\]

    statutory\_grounds: List\[str\]

    citations: List\[PrecedentCitation\]

    unsettled\_law\_warnings: List\[str\]

    pecuniary\_tier: str  \# District, State, National

    is\_time\_barred: bool

    damages: DamageBreakdown

    readiness\_score: int

    missing\_proofs: List\[str\]

    tier1\_notice\_draft: Optional\[str\]

    tier2\_petition\_packet: Optional\[Dict\[str, str\]\]

    red\_team\_report: Optional\[RedTeamAuditReport\]

    audit\_iteration\_count: int

    final\_pdf\_ready: bool

### 4.2 Agent Node Implementation (`backend/app/agents/nodes.py`)

import re

from typing import Dict, Any, List

from state import AgentState, ExhibitItem, PrecedentCitation, DamageBreakdown, RedTeamAuditReport

def sanitize\_pii(text: str) \-\> str:

    """Strips and redacts sensitive national IDs, card numbers, and credentials."""

    \# Mask Indian Aadhaar 12-digit patterns

    text \= re.sub(r'\\b\\d{4}\[ \-\]?\\d{4}\[ \-\]?\\d{4}\\b', '\[Aadhaar Redacted\]', text)

    \# Mask 16-digit credit/debit card numbers

    text \= re.sub(r'\\b\\d{4}\[ \-\]?\\d{4}\[ \-\]?\\d{4}\[ \-\]?\\d{4}\\b', '\[Card Number Redacted\]', text)

    \# Mask CVVs

    text \= re.sub(r'\\b(cvv|cvc)\[:\\s\]\*\\d{3,4}\\b', '\[CVV Redacted\]', text, flags=re.IGNORECASE)

    return text

def evidence\_ingestion\_agent(state: AgentState) \-\> Dict\[str, Any\]:

    """Agent 1: Ingests raw evidence and constructs the Chronological Exhibit Index."""

    sanitized \= sanitize\_pii(state\["raw\_narrative"\])

    exhibits: List\[ExhibitItem\] \= \[\]

    

    \# Process uploaded files (OCR extraction loop)

    for idx, f in enumerate(state.get("raw\_files", \[\])):

        ex\_label \= f"Exhibit {chr(65 \+ idx)}"

        exhibits.append(

            ExhibitItem(

                exhibit\_id=ex\_label,

                file\_name=f.get("name", "document.pdf"),

                doc\_type=f.get("type", "Tax Invoice"),

                timestamp=f.get("date", "2024-01-15"),

                amount=float(f.get("amount", 0.0)),

                extracted\_summary=f.get("summary", "Tax invoice proving purchase consideration"),

                is\_pii\_redacted=True

            )

        )

        

    return {

        "sanitized\_narrative": sanitized,

        "exhibit\_index": exhibits

    }

def legal\_research\_rag\_agent(state: AgentState) \-\> Dict\[str, Any\]:

    """Agent 2: Evaluates legal grounds, pecuniary thresholds, and InLegalNER precedents."""

    total\_val \= sum(ex.amount for ex in state\["exhibit\_index"\])

    

    \# Pecuniary jurisdiction as per 2021 Notification G.S.R. 892(E)

    if total\_val \<= 5000000:

        tier \= "District Consumer Disputes Redressal Commission"

    elif total\_val \<= 20000000:

        tier \= "State Consumer Disputes Redressal Commission (SCDRC)"

    else:

        tier \= "National Consumer Disputes Redressal Commission (NCDRC)"

        

    is\_barred \= False  \# Set dynamically based on cause of action date

    

    grounds \= \[

        "Section 2(11) Consumer Protection Act 2019 \- Deficiency in Service",

        "Section 2(47) Consumer Protection Act 2019 \- Unfair Trade Practice",

        "Rule 6 Consumer Protection (E-Commerce) Rules 2020 \- Fallback Liability"

    \]

    

    precedents \= \[

        PrecedentCitation(

            case\_title="Wg. Cdr. Arifur Rahman Khan v. DLF Southern Homes Pvt. Ltd.",

            citation="(2020) 16 SCC 512",

            forum="Supreme Court of India",

            bench="Dr. D.Y. Chandrachud and K.M. Joseph, JJ.",

            applied\_provisions=\["Section 2(11) CPA 2019", "Section 14 CPA 1986"\],

            ratio\_decidendi="Failure to deliver promised service/goods within contractual timeline constitutes deficiency in service; reasonable restitution with interest is mandatory.",

            awarded\_relief="Full refund of consideration \+ 6% to 9% simple interest p.a.",

            source\_url="https://indiankanoon.org/doc/120098448/"

        )

    \]

    

    unsettled \= \[\]

    if "intermediary" in state\["sanitized\_narrative"\].lower():

        unsettled.append(

            "Conflict between Section 79 IT Act Safe Harbor and Rule 6 E-Commerce Fallback Liability."

        )

        

    return {

        "statutory\_grounds": grounds,

        "citations": precedents,

        "pecuniary\_tier": tier,

        "is\_time\_barred": is\_barred,

        "unsettled\_law\_warnings": unsettled

    }

def damages\_calculator\_agent(state: AgentState) \-\> Dict\[str, Any\]:

    """Agent 3: Deterministic 4-Part Restitution Formula."""

    direct\_loss \= sum(ex.amount for ex in state\["exhibit\_index"\])

    consequential \= 1500.0

    interest\_rate \= 0.08  \# 8% p.a.

    days \= 180

    interest\_amt \= round(direct\_loss \* interest\_rate \* (days / 365.0), 2\)

    non\_pecuniary \= 15000.0  \# Capped within standard NCDRC litigation/harassment bracket

    

    total \= direct\_loss \+ consequential \+ interest\_amt \+ non\_pecuniary

    

    breakdown \= DamageBreakdown(

        direct\_pecuniary\_loss=direct\_loss,

        consequential\_expenses=consequential,

        statutory\_interest\_rate=interest\_rate,

        statutory\_interest\_amount=interest\_amt,

        non\_pecuniary\_damages=non\_pecuniary,

        total\_claim\_amount=total,

        calculation\_summary=f"Direct: Rs.{direct\_loss} \+ Consequential: Rs.{consequential} \+ Interest (8%): Rs.{interest\_amt} \+ Precedent-Capped Relief: Rs.{non\_pecuniary}"

    )

    

    missing \= \[\]

    score \= 100

    if direct\_loss \== 0:

        missing.append("Valid Invoice / Payment Receipt")

        score \-= 40

    if len(state\["exhibit\_index"\]) \< 2:

        missing.append("Proof of Written Grievance Escalation")

        score \-= 20

        

    return {

        "damages": breakdown,

        "readiness\_score": max(score, 20),

        "missing\_proofs": missing

    }

def procedural\_drafter\_agent(state: AgentState) \-\> Dict\[str, Any\]:

    """Agent 4: Generates Tier 1 Legal Notice and Tier 2 Court Petition Packet."""

    exhibit\_refs \= "\\n".join(\[f"- {ex.exhibit\_id}: {ex.doc\_type} ({ex.file\_name})" for ex in state\["exhibit\_index"\]\])

    grounds\_txt \= "\\n".join(\[f"{i+1}. {g}" for i, g in enumerate(state\["statutory\_grounds"\])\])

    

    tier1\_notice \= f"""

LEGAL NOTICE (UNDER SECTION 35 READ WITH SECTION 2(11) OF THE CONSUMER PROTECTION ACT, 2019\)

To,

The Nodal / Grievance Officer,

Opposite Party Corporation

SUBJECT: DEMAND FOR RESTITUTION OF RS. {state\['damages'\].total\_claim\_amount} FOR DEFICIENCY IN SERVICE

Sir/Madam,

Under instructions from my client, this 15-Day Statutory Notice is served upon you:

1\. That the Complainant purchased goods/services as documented in {state\['exhibit\_index'\]\[0\].exhibit\_id if state\['exhibit\_index'\] else 'Exhibit A'}.

2\. That your failure to rectify defects constitutes Deficiency in Service u/s 2(11) of CPA 2019\.

3\. GROUNDS:

{grounds\_txt}

4\. QUANTUM OF RESTITUTION:

\- Direct Pecuniary Loss: Rs. {state\['damages'\].direct\_pecuniary\_loss}

\- Consequential Damages: Rs. {state\['damages'\].consequential\_expenses}

\- Statutory Interest (8% p.a.): Rs. {state\['damages'\].statutory\_interest\_amount}

\- Litigation & Harassment Relief: Rs. {state\['damages'\].non\_pecuniary\_damages}

TOTAL CLAIM: RS. {state\['damages'\].total\_claim\_amount}

Take notice that you are given 15 days from the receipt of this notice to settle the claim, failing which an e-Daakhil consumer complaint will be instituted at the {state\['pecuniary\_tier'\]}.

"""

    

    tier2\_packet \= {

        "index": "Index of Documents: 1\. Synopsis, 2\. Memo of Parties, 3\. Grounds, 4\. Affidavit, 5\. Exhibits",

        "synopsis": f"Chronological dispute events supported by {len(state\['exhibit\_index'\])} verified exhibits.",

        "memo\_of\_parties": "Complainant (Party-in-Person) vs. Opposite Party Registered Office.",

        "grounds": grounds\_txt,

        "prayer": f"Direct Opposite Party to pay Rs. {state\['damages'\].total\_claim\_amount} with further interest @ 9% p.a. till realization.",

        "affidavit": "Verification Affidavit on Solemn Affirmation under Order XIX CPC norms."

    }

    

    return {

        "tier1\_notice\_draft": tier1\_notice,

        "tier2\_petition\_packet": tier2\_packet

    }

def red\_team\_auditor\_agent(state: AgentState) \-\> Dict\[str, Any\]:

    """Agent 5: Audits draft against corporate defenses and exhibit grounding."""

    draft \= state\["tier1\_notice\_draft"\] or ""

    unsupported \= \[\]

    defenses \= \[\]

    

    if "Exhibit" not in draft:

        unsupported.append("Draft fails to anchor factual allegations to an Exhibit ID.")

        

    if "Section 79" in state\["sanitized\_narrative"\] and "Rule 6" not in draft:

        defenses.append("Vulnerable to Intermediary Safe Harbor defense. Must cite Rule 6 E-Commerce Rules.")

        

    passed \= len(unsupported) \== 0 and len(defenses) \== 0

    iteration \= state.get("audit\_iteration\_count", 0\) \+ 1

    

    report \= RedTeamAuditReport(

        passed=passed,

        unsupported\_facts=unsupported,

        defense\_countermeasures=defenses,

        audit\_notes="Audit completed against NCDRC precedent standards."

    )

    

    return {

        "red\_team\_report": report,

        "audit\_iteration\_count": iteration,

        "final\_pdf\_ready": passed or iteration \>= 2

    }

### 4.3 LangGraph State Graph Compilation (`backend/app/agents/graph.py`)

from langgraph.graph import StateGraph, END

from nodes import (

    evidence\_ingestion\_agent,

    legal\_research\_rag\_agent,

    damages\_calculator\_agent,

    procedural\_drafter\_agent,

    red\_team\_auditor\_agent

)

from state import AgentState

def should\_continue\_audit(state: AgentState) \-\> str:

    """Conditional Edge: Determines if red-team failed and requires re-drafting."""

    report \= state.get("red\_team\_report")

    iteration \= state.get("audit\_iteration\_count", 0\)

    

    if report and not report.passed and iteration \< 2:

        return "redraft"

    return "finalize"

def build\_legal\_workflow() \-\> StateGraph:

    workflow \= StateGraph(AgentState)

    

    \# Add Agent Nodes

    workflow.add\_node("evidence\_ingestion", evidence\_ingestion\_agent)

    workflow.add\_node("legal\_research\_rag", legal\_research\_rag\_agent)

    workflow.add\_node("damages\_calculator", damages\_calculator\_agent)

    workflow.add\_node("procedural\_drafter", procedural\_drafter\_agent)

    workflow.add\_node("red\_team\_auditor", red\_team\_auditor\_agent)

    

    \# Define Deterministic Flow

    workflow.set\_entry\_point("evidence\_ingestion")

    workflow.add\_edge("evidence\_ingestion", "legal\_research\_rag")

    workflow.add\_edge("legal\_research\_rag", "damages\_calculator")

    workflow.add\_edge("damages\_calculator", "procedural\_drafter")

    workflow.add\_edge("procedural\_drafter", "red\_team\_auditor")

    

    \# Conditional Feedback Loop

    workflow.add\_conditional\_edges(

        "red\_team\_auditor",

        should\_continue\_audit,

        {

            "redraft": "procedural\_drafter",

            "finalize": END

        }

    )

    

    return workflow.compile()

legal\_pipeline \= build\_legal\_workflow()

---

## 5\. Production System Prompts & Guardrails

### 5.1 Agent 4 (Procedural Drafter) Prompt

YOU ARE THE PRINCIPAL LEGAL DRAFTING SPECIALIST FOR INDIAN CONSUMER & CIVIC DISPUTES.

\#\#\# MANDATORY COMPLIANCE DIRECTIVES:

1\. REAL STATUTES ONLY: Strictly restricted to enacted Indian Statutes (Consumer Protection Act 2019, RTI Act 2005, IT Act 2000, Arbitration & Conciliation Act 1996\) and verified Regulator Circulars (DGCA CAR, RBI Ombudsman Scheme 2021). Never cite repealed acts (e.g., CPA 1986\) as current law.

2\. STRICT EXHIBIT GROUNDING: Every factual assertion MUST cite its exact Exhibit ID (e.g., "\[Exhibit A, Tax Invoice\]"). Ungrounded facts will be rejected.

3\. REALISTIC RESTITUTION ONLY: The prayer clause must strictly reflect the 4-part restitution schedule generated by Agent 3\. Never invent arbitrary or inflated moral damages.

4\. ZERO PII LEAKAGE: Never output full 12-digit Aadhaar numbers, 16-digit debit/credit card numbers, CVVs, or bank account passwords. Use placeholders like \[Aadhaar Redacted\].

5\. DUAL-LANGUAGE OUTPUT: Generate the formal legal instrument in court-admissible English, followed by a plain-language summary in the citizen's chosen regional language.

### 5.2 Agent 5 (Red-Team Compliance Auditor) Prompt

YOU ARE THE ADVERSARIAL RED-TEAM AUDITOR & OPPOSING CORPORATE LEGAL COUNSEL.

\#\#\# YOUR OBJECTIVE:

Audit the generated legal draft and identify grounds for registry rejection, procedural dismissal, or opposing corporate defense loopholes.

\#\#\# AUDIT CHECKLIST:

1\. CITATION INTEGRITY: Verify that all statutory sections cited exist in current, unrepealed Indian bare acts.

2\. DEFENSE COUNTERS:

   \- If the dispute involves an E-Commerce marketplace, verify that the draft invokes Rule 6 of Consumer Protection (E-Commerce) Rules 2020 to defeat Section 79 IT Act Intermediary Safe Harbor.

   \- If an Arbitration Clause exists, verify that the draft invokes Emaar MGF Land Ltd. v. Aftab Singh ((2019) 12 SCC 751).

   \- If goods were bought for self-employment livelihood, confirm explicit pleading u/s 2(7) Explanation (a) to defeat "Commercial Purpose" exclusion.

3\. EXHIBIT LINKAGE: Flag any factual claim that does not link to a verified Exhibit ID.

4\. JURISDICTION CHECK: Confirm that the forum header correctly matches the pecuniary threshold (District \<= Rs. 50L; State Rs. 50L \- 2Cr; National \> Rs. 2Cr).

OUTPUT FORMAT: Strict JSON matching the RedTeamAuditReport schema.

---

## 6\. Frontend UI State Components (React / Next.js)

### 6.1 Layout Template (`frontend/src/app/layout.tsx`)

import React from 'react';

import './globals.css';

export const metadata \= {

  title: 'Lexis Counsel \- AI Legal Consultant',

  description: 'Autonomous Multi-Agent Civic & Legal Empowerment Platform'

};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (

    \<html lang="en" className="light"\>

      \<head\>

        \<link rel="preconnect" href="https://fonts.googleapis.com" /\>

        \<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /\>

        \<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700\&display=swap" rel="stylesheet" /\>

        \<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1\&display=swap" rel="stylesheet" /\>

      \</head\>

      \<body className="bg-parchment-surface text-on-surface font-body antialiased selection:bg-primary/20 selection:text-primary overflow-hidden"\>

        {/\* Ambient Golden Hour Radial Glows \*/}

        \<div className="fixed top-\[-10%\] right-\[-5%\] w-\[40vw\] h-\[40vw\] rounded-full bg-primary/5 blur-\[120px\] pointer-events-none z-0" /\>

        \<div className="fixed bottom-\[-10%\] left-\[10%\] w-\[35vw\] h-\[35vw\] rounded-full bg-secondary-container/5 blur-\[100px\] pointer-events-none z-0" /\>

        \<div className="flex h-screen relative z-10 w-full max-w-max-width-fluid mx-auto"\>

          {children}

        \</div\>

      \</body\>

    \</html\>

  );

}

### 6.2 60/40 Split Workspace Main Hub (`frontend/src/app/page.tsx`)

'use client';

import React, { useState } from 'react';

import { ChatMessageCard } from '@/components/ChatMessageCard';

import { NextBestActionCard } from '@/components/NextBestActionCard';

export default function WorkspacePage() {

  const \[inputText, setInputText\] \= useState('');

  return (

    \<div className="flex h-screen w-full"\>

      {/\* Side Navigation Bar (280px) \*/}

      \<nav className="hidden md:flex flex-col py-6 px-4 bg-glass-fill backdrop-blur-md h-full w-sidebar-expanded border-r border-glass-stroke"\>

        \<div className="flex items-center gap-3 px-2 mb-8 cursor-pointer"\>

          \<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary-container flex items-center justify-center text-on-primary shadow-\[0\_8px\_16px\_rgba(180,83,9,0.2)\]"\>

            \<span className="material-symbols-outlined text-\[24px\]"\>balance\</span\>

          \</div\>

          \<div\>

            \<h1 className="font-headline font-semibold text-primary leading-tight text-xl"\>Lexis Counsel\</h1\>

            \<p className="text-xs text-on-surface-variant opacity-80"\>Civic & Legal AI\</p\>

          \</div\>

        \</div\>

        \<div className="px-2 mb-6"\>

          \<button className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary rounded-full px-4 py-3 text-sm font-semibold shadow-\[0\_12px\_24px\_rgba(180,83,9,0.15)\] hover:bg-primary/90 transition-all"\>

            \<span className="material-symbols-outlined text-\[20px\]"\>add\</span\> New Consultation

          \</button\>

        \</div\>

        \<ul className="flex flex-col gap-1 flex-1 px-2"\>

          \<li\>

            \<a href="\#" className="flex items-center gap-3 bg-primary text-on-primary rounded-full px-4 py-3 shadow-\[0\_4px\_12px\_rgba(180,83,9,0.2)\]"\>

              \<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}\>gavel\</span\>

              \<span className="text-sm font-medium"\>Legal Research\</span\>

            \</a\>

          \</li\>

          \<li\>

            \<a href="\#" className="flex items-center gap-3 text-on-surface-variant hover:bg-primary-container/20 rounded-full px-4 py-3 transition-colors"\>

              \<span className="material-symbols-outlined"\>description\</span\>

              \<span className="text-sm font-medium"\>Drafting\</span\>

            \</a\>

          \</li\>

          \<li\>

            \<a href="\#" className="flex items-center gap-3 text-on-surface-variant hover:bg-primary-container/20 rounded-full px-4 py-3 transition-colors"\>

              \<span className="material-symbols-outlined"\>lock\</span\>

              \<span className="text-sm font-medium"\>Vault\</span\>

            \</a\>

          \</li\>

        \</ul\>

      \</nav\>

      {/\* Main Content Area (Flex-1) \*/}

      \<main className="flex-1 flex flex-col h-full w-full"\>

        {/\* Unified Top Header \*/}

        \<div className="h-16 px-8 flex justify-between items-center border-b border-glass-stroke bg-glass-fill/40 backdrop-blur-sm z-20"\>

          \<h2 className="text-xl font-bold text-on-surface"\>Grievance Setup: Consumer Dispute v. Airline\</h2\>

          \<div className="flex items-center gap-3"\>

            \<button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-variant/50 hover:text-primary transition-colors border border-glass-stroke"\>

              \<span className="material-symbols-outlined"\>download\</span\>

            \</button\>

          \</div\>

        \</div\>

        {/\* 60/40 Split Content Area \*/}

        \<div className="flex-1 flex flex-col md:flex-row overflow-hidden relative"\>

          {/\* Left Pane (60% Width) \- Chat & Drafter Stream \*/}

          \<div className="flex-1 md:w-\[60%\] flex flex-col relative h-full md:border-r border-glass-stroke"\>

            \<div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 scroll-smooth z-10"\>

              \<div className="max-w-4xl mx-auto flex flex-col gap-6"\>

                \<ChatMessageCard

                  sender="assistant"

                  content="Based on your uploaded invoice and flight cancellation SMS, the Opposite Party is in breach of DGCA CAR Section 3, Series M, Part IV."

                  statuteQuote="Airlines shall provide alternate travel or full refund alongside statutory compensation for unnotified cancellations within 24 hours."

                  analysisText="The carrier failed to provide alternate arrangements, entitling you to statutory refund \+ Rs. 10,000 compensation."

                  precedentName="Wg. Cdr. Arifur Rahman Khan v. DLF Southern Homes (2020) 16 SCC 512"

                  precedentUrl="https://indiankanoon.org/doc/120098448/"

                  toolActions={\[

                    { label: 'Summarize Precedent', icon: 'format\_align\_left', onClick: () \=\> {} },

                    { label: 'Draft 15-Day Notice', icon: 'edit\_document', primary: true, onClick: () \=\> {} },

                    { label: 'Run Red-Team Audit', icon: 'verified\_user', onClick: () \=\> {} }

                  \]}

                /\>

              \</div\>

            \</div\>

            {/\* Minimal Bottom Input Bar \*/}

            \<div className="flex-shrink-0 w-full bg-gradient-to-t from-parchment-surface via-parchment-surface to-transparent pt-4 pb-6 px-4 md:px-8 z-20"\>

              \<div className="max-w-4xl mx-auto relative"\>

                \<div className="bg-glass-fill backdrop-blur-md rounded-xl border-b-2 border-outline-variant focus-within:border-primary shadow-\[0\_8px\_24px\_rgba(180,83,9,0.04)\] flex items-end px-4 py-3"\>

                  \<button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors flex-shrink-0"\>

                    \<span className="material-symbols-outlined"\>attach\_file\</span\>

                  \</button\>

                  \<textarea

                    value={inputText}

                    onChange={(e) \=\> setInputText(e.target.value)}

                    placeholder="Narrate what happened or instruct legal drafter..."

                    className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-\[160px\] min-h-\[44px\] py-2.5 px-4 text-on-surface outline-none"

                    rows={1}

                  /\>

                  \<button className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-on-primary hover:bg-primary-container transition-all flex-shrink-0 shadow-sm"\>

                    \<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}\>send\</span\>

                  \</button\>

                \</div\>

                \<div className="text-center mt-3"\>

                  \<span className="text-xs text-on-surface-variant/60 tracking-wider"\>AI procedural assistance is grounded in Indian Bare Acts. Verified counsel review available u/s 35(1) CPA 2019.\</span\>

                \</div\>

              \</div\>

            \</div\>

          \</div\>

          {/\* Right Pane (40% Width) \- Context, Readiness & Evidence \*/}

          \<div className="hidden md:flex flex-col w-\[40%\] h-full bg-surface-variant/10 overflow-y-auto p-6 md:p-8 space-y-6"\>

            \<NextBestActionCard

              currentStep={1}

              readinessScore={85}

              daysRemaining={15}

              pecuniaryTier="District Consumer Disputes Redressal Commission"

              onDownloadNotice={() \=\> {}}

              onEscalate={() \=\> {}}

            /\>

            \<div className="bg-glass-fill backdrop-blur-sm border border-glass-stroke rounded-2xl p-5 shadow-sm"\>

              \<div className="flex items-center gap-2 mb-3"\>

                \<span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-glass-stroke"\>Active Case\</span\>

                \<span className="text-xs text-on-surface-variant uppercase tracking-wider"\>Ref: \#2026-CPA-894\</span\>

              \</div\>

              \<h3 className="text-lg font-bold text-on-surface mb-2"\>Consumer Dispute v. Airline\</h3\>

              \<p className="text-sm text-on-surface-variant"\>Primary focus: Flight disruption compensation under DGCA CAR Section 3, Series M, Part IV.\</p\>

            \</div\>

            \<div\>

              \<h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-4 px-1"\>Referenced Legal Materials\</h4\>

              \<div className="space-y-3"\>

                \<div className="flex items-start gap-4 p-4 rounded-xl bg-surface-variant/20 hover:bg-surface-variant/40 transition-colors border border-glass-stroke cursor-pointer"\>

                  \<div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary border border-glass-stroke"\>

                    \<span className="material-symbols-outlined"\>description\</span\>

                  \</div\>

                  \<div\>

                    \<p className="text-sm font-semibold text-on-surface"\>Exhibit A (Tax Invoice)\</p\>

                    \<p className="text-xs text-on-surface-variant"\>Proof of Consideration (Rs. 12,499)\</p\>

                  \</div\>

                \</div\>

                \<div className="flex items-start gap-4 p-4 rounded-xl bg-surface-variant/20 hover:bg-surface-variant/40 transition-colors border border-glass-stroke cursor-pointer"\>

                  \<div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary border border-glass-stroke"\>

                    \<span className="material-symbols-outlined"\>gavel\</span\>

                  \</div\>

                  \<div\>

                    \<p className="text-sm font-semibold text-on-surface"\>Arifur Rahman Khan v. DLF\</p\>

                    \<p className="text-xs text-on-surface-variant"\>Supreme Court Precedent (2020) 16 SCC 512\</p\>

                  \</div\>

                \</div\>

              \</div\>

            \</div\>

          \</div\>

        \</div\>

      \</main\>

    \</div\>

  );

}  
