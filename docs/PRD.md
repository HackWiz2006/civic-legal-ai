---

## project\_name: "Lexis Counsel / CivicLegal-AI" version: "1.1.0" target\_jurisdiction: "India" primary\_statutes: \["CPA 2019", "RTI Act 2005", "IT Act 2000", "RB-IOS 2021", "DGCA CAR 2023"\] architecture\_type: "Deterministic Multi-Agent State Machine with Hybrid Legal RAG" document\_type: "Product Requirements Document (PRD)" ui\_theme: "Parchment & Warm Amber Glassmorphism" design\_spec\_reference: "Design.md" ai\_agent\_readable: true

# Product Requirements Document (PRD.md)

## Autonomous Multi-Agent Civic & Legal Empowerment Platform (India)

---

## 1\. System Metadata & Mission Overview

### 1.1 Executive Objective

To build an autonomous, deterministic, multi-agent AI system that empowers Indian citizens to navigate statutory consumer dispute resolution, regulatory ombudsmen, and transparency petitions without falling victim to procedural rejections, legal jargon, or corporate defense pre-emption.

### 1.2 Persona & Statutory Self-Representation Standard

The platform operates as an algorithmic procedural assistant and fact-compiler for **Party-in-Person** self-representation pursuant to **Section 35(1) of the Consumer Protection Act, 2019**. The platform does not provide legal representation in court, which is explicitly reserved for the human user or a licensed Advocate-on-Record.

### 1.3 UI/UX Theme & Visual Metaphor

The platform adopts the **"Parchment & Warm Amber Glassmorphism"** aesthetic specified in `Design.md`:

* **Parchment Surface Base (`#fdfaf1`)**: Reduces eye fatigue during dense document analysis.  
* **Warm Amber & Burnt Ochre Accents (`#903f00`, `#b45309`, `#fe932c`)**: Conveys statutory authority and empowerment.  
* **60/40 Split Desktop Layout**: Left 60% for interactive conversation and drafting; Right 40% for active case metadata, statutory references, zero-trip readiness meter, 15-day countdown, and exhibit ledgers.

---

## 2\. Functional Requirements (FR) Specification

┌────────────────────────────────────────────────────────────────────────────────────────┐

│                                 FUNCTIONAL MODULE MATRIX                               │

├──────────────┬──────────────────────────────────────────┬──────────────────────────────┤

│ Module ID    │ Name                                     │ Primary Responsible Agent    │

├──────────────┼──────────────────────────────────────────┼──────────────────────────────┤

│ FR-01        │ Multilingual Voice/Text Intake & Audit   │ Bureaucracy Translator       │

│ FR-02        │ Multi-Modal Evidence Ingestion & Ledger  │ Agent 1 (Evidence Specialist)│

│ FR-03        │ Statutory RAG & Jurisdiction Validator   │ Agent 2 (Legal Research)     │

│ FR-04        │ Realistic 4-Part Damages Calculator      │ Agent 3 (Pecuniary Calc)     │

│ FR-05        │ Two-Tier Legal Procedural Drafter        │ Agent 4 (Legal Drafter)      │

│ FR-06        │ Adversarial Red-Team Compliance Auditor  │ Agent 5 (Red-Team QA)        │

│ FR-07        │ Zero-Trip Pre-Filing Readiness Meter     │ Agent 3 & 4 Validation Engine│

│ FR-08        │ Multi-Forum Cost vs. Time Forecaster     │ Forum Routing Engine         │

│ FR-09        │ 15-Day Statutory Countdown Dashboard     │ State Manager & Notification │

│ FR-10        │ Multi-Layer Cyber Security & PII Shield  │ Gateway & Sanitizer Pipeline │

│ FR-11        │ Sensitive Case Emergency Safety Gates    │ Triage Gatekeeper            │

│ FR-12        │ InLegalNER Precedent & Unsettled Law QA  │ Agent 2 & 5 Attribution Engine│

└──────────────┴──────────────────────────────────────────┴──────────────────────────────┘

---

### FR-01: Multilingual Voice/Text Narrative Intake & "What Happened to You?" Audit

* **Description:** Ingests raw narrative in English or Indian regional languages (Hindi, Kannada, Tamil, Telugu, Marathi, Bengali, etc.) via speech-to-text or typed input in the minimal bottom input bar.  
* **Input Schema:** `{"raw_text": string, "audio_blob"?: binary, "input_language": string}`  
* **Output Schema:** `{"sanitized_facts": string, "extracted_dates": string[], "breached_rights": string[], "plain_summary": string}`  
* **Acceptance Criteria:**  
  * Given a regional language audio input, the system must transcribe and translate the input into structured English facts while providing a parallel regional summary to the citizen.  
  * Must extract date of occurrence, total amount involved, and name of the opposing party.

---

### FR-02: Multi-Modal Evidence Ingestion & Chronological Exhibit Ledger

* **Description:** Ingests PDF, PNG, JPG, and EML files (Invoices, WhatsApp chats, Bank slips, Postal receipts) via the attachment icon button in the bottom input bar.  
* **Input Schema:** `{"files": Array<{"file_name": string, "mime_type": string, "base64_data": string}>}`  
* **Output Schema:** `{"exhibits": Array<{"exhibit_id": string, "doc_type": string, "date": string, "amount": float, "summary": string, "is_verified": bool}>}`  
* **Acceptance Criteria:**  
  * Must assign sequential court-admissible labels (**Exhibit A**, **Exhibit B**, **Exhibit C...**).  
  * Must display items dynamically in the Right Pane's **Referenced Legal Materials** gallery.  
  * Must extract invoice numbers, transaction IDs (UPI/NEFT/IMPS), and timestamps conforming to Section 65B Indian Evidence Act / Section 63 BSA 2023\.

---

### FR-03: Statutory Grounding & Jurisdiction Validator (RAG Engine)

* **Description:** Queries Bare Acts, circulars, and judicial repositories to determine statutory grounds and forum hierarchy.  
* **Pecuniary Rules ([Notification G.S.R. 892(E) / 2021 Rules](https://www.pib.gov.in/PressReleasePage.aspx?PRID=1786342)):**  
  * `total_consideration <= 50,00,000` $\\rightarrow$ **District Consumer Disputes Redressal Commission**  
  * `50,00,000 < total_consideration <= 2,00,00,000` $\\rightarrow$ **State Consumer Disputes Redressal Commission (SCDRC)**  
  * `total_consideration > 2,00,00,000` $\\rightarrow$ **National Consumer Disputes Redressal Commission (NCDRC)**  
* **Limitation Check (Section 69 CPA 2019):**  
  * If `(current_date - cause_of_action_date) > 730 days (2 years)`, flag `is_time_barred: true` and trigger *Application for Condonation of Delay u/s 69(2)*.

---

### FR-04: Realistic 4-Part Damages Calculator

* **Description:** Calculates exact court-compliant compensation.  
* **Mathematical Formula:** $$\\text{Total Claim } (T) \= D \+ C \+ I \+ N$$  
  * $D \= \\sum \\text{Verified Invoices / Debit Receipts}$  
  * $C \= \\sum \\text{Documented Consequential Expenses}$  
  * $I \= D \\times 0.08 \\times \\left(\\frac{\\text{Days Elapsed}}{365}\\right)$ (8% p.a. default interest)  
  * $N \= \\text{Non-Pecuniary Relief capped between ₹10,000 and ₹50,000 (per NCDRC precedents)}$  
* **Acceptance Criteria:** Prevents frivolous inflation by strictly rejecting moral claims exceeding statutory precedent ceilings.

---

### FR-05: Two-Tier Legal Procedural Drafter

* **Tier 1 (15-Day Pre-Litigation Legal Notice):**  
  * Formally addressed to the Opposite Party's designated **Nodal Officer / Grievance Officer**.  
  * Contains formal demand, 15-day compliance window, statutory citations, and dispatch instructions (Speed Post AD / Nodal Email).  
* **Tier 2 (Court Petition Packet for e-Daakhil):**  
  * Generates complete structured packet:  
    1. **Index of Documents & Statutory Court Fee Calculation** (₹0 for claims up to ₹5L; ₹200 for ₹5L–₹10L; ₹400 for ₹10L–₹20L).  
    2. **List of Dates & Synopsis**.  
    3. **Memo of Parties** (Complainant vs. Opposite Parties).  
    4. **Statement of Facts & Grounds** (Every fact line linked to an Exhibit ID).  
    5. **Prayer Clause**.  
    6. **Verification Affidavit** (Solemn affirmation format).

---

### FR-06: Adversarial Red-Team QA & Compliance Auditor

* **Description:** Emulates opposing corporate counsel to audit the petition.  
* **Vulnerabilities Audited:**  
  1. *Commercial Purpose Exclusion (Sec. 2(7) CPA 2019):* Ensures explicit pleading of self-employment livelihood if business goods were involved.  
  2. *Intermediary Safe Harbor (Sec. 79 IT Act 2000):* Ensures pleading of Fallback Liability under Rule 6 of Consumer Protection (E-Commerce) Rules 2020\.  
  3. *Arbitration Clause Pre-emption:* Cites *Emaar MGF Land Ltd. v. Aftab Singh* ((2019) 12 SCC 751\) to uphold Consumer Commission jurisdiction.  
  4. *Exhibit Linkage Check:* Verifies that 100% of factual assertions cite an existing Exhibit ID.

---

### FR-07: "Zero-Trip" Pre-Filing Readiness Meter Widget

* **Visual Location:** Displayed persistently in the Right Context Panel (`bg-glass-fill backdrop-blur-sm border border-glass-stroke rounded-2xl p-5`).  
* **Checklist Items & Weights:**  
  - [ ] Tax Invoice / Proof of Purchase (Weight: 30%)  
  - [ ] Proof of Payment / Transaction Reference (Weight: 20%)  
  - [ ] Prior Written Escalation / Rejection Proof (Weight: 20%)  
  - [ ] Opposite Party Registered Address / Nodal Email (Weight: 15%)  
  - [ ] Complainant Identity Proof with Redacted PII (Weight: 15%)  
* **Score $\\ge 80%$:** Ready for filing badge (Emerald).  
* **Score $\< 80%$:** Prompts user to upload specific missing items with an amber warning pill.

---

### FR-08: Multi-Forum Cost vs. Time Forecaster

* Compares dispute paths in real-time within the Right Panel:  
  * **National Consumer Helpline (NCH 1915):** ₹0 fee | 15–45 days | Informal conciliation.  
  * **RBI Integrated Ombudsman (CMS):** ₹0 fee | 30–90 days | Binding award up to statutory caps.  
  * **District Consumer Commission (e-Daakhil):** ₹0 (up to ₹5L) | 6–18 months | Judicial decree with penal enforcement.  
  * **RTI Online Portal:** ₹10 fee | 30-day statutory response deadline.

---

### FR-09: Dynamic 15-Day Countdown & Next Best Action Dashboard

* Manages state transitions post-dispatch:  
  * `DAY 1 - 15`: Displays active statutory countdown clock widget in the Right Pane.  
  * `SETTLEMENT OFFER RECEIVED`: Launches settlement analyzer pill (evaluates offer against statutory 4-part claim).  
  * `DAY 16 (NO RESOLUTION)`: Unlocks one-click compilation of Tier 2 e-Daakhil Court Petition via primary action button.

---

### FR-10: Multi-Layer Cyber Security & Data Privacy

* **PII Redaction Engine:** Automatically redacts 12-digit Aadhaar numbers (`[Aadhaar Redacted]`), 16-digit card numbers, CVVs, passwords, and banking OTPs prior to LLM ingestion.  
* **Cryptographic Standards:** TLS 1.3 in-transit, AES-256-GCM at-rest, SHA-256 document hashing for tamper evidence.  
* **Incognito Mode:** Allows instantaneous purge of all session state and evidence files upon document download.

---

### FR-11: Sensitive Case Detection & Emergency Safety Protocols

* **Cyber / Banking Fraud:** Displays urgent amber/red banner to dial **1930** ([National Cyber Crime Reporting Portal](https://cybercrime.gov.in/)) and auto-generates a Bank Branch Account Freeze Letter under [RBI Zero Liability Rules](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11040&Mode=0).  
* **Medical Negligence:** Displays statutory *Jacob Mathew* expert medical opinion warning and recommends a certified medico-legal counsel.  
* **Tenancy Eviction / Violence:** Informs the user of Rent Control Act / Civil Court exclusive jurisdiction and provides District Legal Services Authority (DLSA) emergency legal aid contacts.

---

### FR-12: InLegalNER Precedent Schema & Unsettled Law Warnings

* Precedent cards in the Right Pane rendered as: `{"case_title": string, "citation": string, "forum": string, "bench": string, "applied_provisions": string[], "ratio_decidendi": string, "awarded_relief": string, "source_url": string}`  
* **Unsettled Law Protocol:** If conflicting High Court or NCDRC rulings exist, the system renders an **Unsettled Legal Position Warning** card with opposing views and a joint-party pleading strategy.

---

## 3\. End-to-End Control Flow & Interactive Flowchart

                                      \[CITIZEN LANDING SCREEN\]

                                                  │

                                         (Click "Start Intake")

                                                  │

                                                  ▼

                              \[SCREEN 1: NARRATIVE INTAKE & TRIAGE\]

                              │ \- Language Selection (10+ Languages)

                              │ \- Text / Voice Recording Input

                              │ \- PII Sanitization Engine Activated

                              │

                    ┌─────────────────────────────┴─────────────────────────────┐

        (If High-Risk / Emergency)                                     (Standard Dispute)

                    │                                                           │

                    ▼                                                           ▼

        \[SENSITIVE SAFETY GATE\]                                      (Click "Proceed to Evidence")

        • Cyber Fraud: Alert 1930 \+ Freeze Letter                               │

        • Medical Negligence: Jacob Mathew Warning                              ▼

        • Tenancy: DLSA / Rent Control Warning                       \[SCREEN 2: EVIDENCE UPLOAD\]

                    │                                                │ \- Drag & drop Invoices, Chats,

                    └─────────────────────────────┬──────────────────┘   Emails, Receipts, SMS

                                                  │                  │ \- Auto-OCR & Timestamp Parsing

                                                  │                  │ \- Chronological Exhibit Ledger

                                                  │

                                                  │ (Click "Analyze My Case")

                                                  │

                                                  ▼

                              ┌───────────────────────────────────────┐

                              │   MULTI-AGENT DETERMINISTIC ENGINE    │

                              │ • Agent 1: Evidence Indexer (Exhibits)│

                              │ • Agent 2: RAG \+ InLegalNER Precedents│

                              │ • Agent 3: Restitution Calculator     │

                              │ • Precedent & Jurisdiction Audit      │

                              └───────────────────┬───────────────────┘

                                                  │

                                                  ▼

                              \[SCREEN 3: CASE DIAGNOSIS & GAP METER\]

                              │ \- Zero-Trip Readiness Score (0%–100%)

                              │ \- Forum Comparison: NCH vs. Ombudsman vs. e-Daakhil

                              │ \- Unsettled Law Warnings (if any)

                              │ \- Structured InLegalNER Precedent Cards

                              │

                    ┌─────────────────────────────┴─────────────────────────────┐

           (If Gap Score \< 80%)                                        (If Ready to Proceed)

                    │                                                           │

                    ▼                                                           ▼

       \[CLICK "UPLOAD MISSING PROOFS"\]                                \[CLICK "GENERATE 15-DAY NOTICE"\]

       (Opens targeted upload modal)                                            │

                    │                                                           ▼

                    └─────────────────────────────┬─────────────────────────────┘

                                                  │

                                                  ▼

                              ┌───────────────────────────────────────┐

                              │ \[Agent 4: Drafter\] ──▶ Tier 1 Notice  │

                              │                          │            │

                              │ \[Agent 5: Red Team\] ◀────┘ (Audit)    │

                              │     │                                 │

                              │     ├──▶ \[Defect\] ──▶ Re-draft loop   │

                              │     └──▶ \[Passed\] ──▶ Proceed         │

                              └───────────────────┬───────────────────┘

                                                  │

                                                  ▼

                              \[SCREEN 4: TIER 1 LEGAL NOTICE PREVIEW\]

                              │ \- Addressed to Company Nodal Officer

                              │ \- Dual View: Formal English \+ Vernacular Summary

                              │ \- Statutory Citations & Red-Team Audit Badge

                              │

                                   ┌──────────────┴──────────────┐

                                   ▼                             ▼

                    \[CLICK "DOWNLOAD NOTICE PDF"\]   \[CLICK "START NOTICE TRACKER"\]

                                   │                             │

                                   └──────────────┬──────────────┘

                                                  │

                                                  ▼

                              \[SCREEN 5: NOTICE TRACKER & 15-DAY COUNTDOWN\]

                              │ \- Enter Postal Speed Post Tracking / Email Timestamp

                              │ \- Active 15-Day Statutory Countdown Clock

                              │

                    ┌─────────────────────────────┴─────────────────────────────┐

        (If Company Offers Settlement)                                 (If 15 Days Elapse / Refusal)

                    │                                                           │

                    ▼                                                           ▼

       \[CLICK "EVALUATE SETTLEMENT"\]                                  \[CLICK "ESCALATE TO e-DAAKHIL"\]

       │ \- Compares offer against claim                                         │

       │ \- Accept / Reject Recommendation                                       ▼

                                                              ┌───────────────────────────────────┐

                                                              │ \[Agent 4: Drafter\] ──▶ Petition   │

                                                              │ \[Agent 5: Red Team\] ──▶ Final QA  │

                                                              └─────────────────┬─────────────────┘

                                                                                │

                                                                                ▼

                                                              \[SCREEN 6: COURT PETITION BUILDER\]

                                                              │ \- Full Packet: Index, Synopsis,

                                                              │   Memo, Grounds, Prayer, Affidavit

                                                              │ \- 100% Exhibit-Linked Fact Lines

                                                              │ \- Court Fee Calculation (₹0 \<= ₹5L)

                                                              │

                                                                   (Click "Export PDF Bundle")

                                                                                │

                                                                                ▼

                                                              \[SCREEN 7: SUBMISSION GUIDE\]

                                                              │ \- Download Paginated PDF (\<25MB)

                                                              │ \- Step-by-step e-Daakhil Upload

                                                              │ \- Diary Number & Hearing Tracker

---

## 4\. Screen-by-Screen Button Action Dictionary

| Screen | Button Label | Triggered System Event / Agent Action | Destination |
| :---- | :---- | :---- | :---- |
| **Landing** | `[Start Intake]` | Initializes session state, applies TLS 1.3 handshake, launches multilingual interface. | Screen 1 |
| **Screen 1** | `[Record Voice]` / `[Type]` | Captures speech/text; runs translation and PII scrub; extracts dates, amounts, parties. | Screen 1 Preview |
| **Screen 1** | `[Proceed to Evidence]` | Validates non-empty input; runs sensitive triage gate (checks cyber fraud/medical negligence). | Screen 2 |
| **Screen 2** | `[Upload Documents]` | Runs multi-modal OCR; extracts invoice numbers, dates, payment IDs; compiles `Exhibit_Index`. | Screen 2 Gallery |
| **Screen 2** | `[Analyze My Case]` | Executes **Agent 1** (Parser), **Agent 2** (RAG/Jurisdiction), and **Agent 3** (Damages). | Screen 3 |
| **Screen 3** | `[Upload Missing Proofs]` | Opens targeted file uploader for flagged missing evidence (e.g., payment receipt). | Screen 2 (Append) |
| **Screen 3** | `[Generate 15-Day Notice]` | Passes state to **Agent 4** (Drafter) and **Agent 5** (Red Team) to compile Tier 1 Notice. | Screen 4 |
| **Screen 4** | `[Download Notice PDF]` | Compiles watermarked PDF with dispatch instructions (Speed Post AD / Nodal Email). | Download Trigger |
| **Screen 4** | `[Start Notice Tracker]` | Prompts for Postal Tracking ID; starts active 15-day statutory countdown timer. | Screen 5 |
| **Screen 5** | `[Evaluate Settlement]` | Analyzes company offer against statutory 4-part restitution claim. | Settlement Modal |
| **Screen 5** | `[Escalate to e-Daakhil]` | Triggered upon expiry of 15 days or rejection. Invokes Agent 4 & 5 for Tier 2 Petition. | Screen 6 |
| **Screen 6** | `[Export PDF Bundle]` | Merges Index, Synopsis, Memo, Grounds, Affidavit, and Exhibits into compliant PDF (\<25MB). | Screen 7 |
| **Screen 7** | `[e-Daakhil Portal Guide]` | Displays step-by-step registry upload instructions with field-by-field mapping. | External Portal |

