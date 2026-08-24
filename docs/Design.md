---

## project\_name: "Lexis Counsel / CivicLegal-AI" version: "1.0.0" target\_jurisdiction: "India" document\_type: "Design System & UI/UX Specification (Design.md)" design\_theme: "Parchment & Warm Amber Glassmorphism" typography: "Manrope" iconography: "Material Symbols Outlined" ai\_agent\_readable: true

# Design System & UI/UX Specification (Design.md)

## Autonomous Multi-Agent Civic & Legal Empowerment Platform

---

## 1\. Design Philosophy & Visual Identity

### 1.1 "Parchment & Warm Amber Glassmorphism" Theme

The visual identity bridges traditional legal gravity with modern, accessible civic technology. The design avoids sterile corporate blue aesthetics in favor of a warm, trustworthy, and authoritative palette:

* **Parchment Surface Base (`#fdfaf1`):** Evokes authentic legal manuscript parchment, reducing eye strain during dense document analysis.  
* **Warm Amber & Burnt Ochre Primary (`#903f00`, `#b45309`, `#fe932c`):** Communicates statutory authority, warmth, and legal empowerment.  
* **Frosted Glass Panes (`glass-fill: rgba(255, 255, 255, 0.65)`, `glass-stroke: rgba(180, 83, 9, 0.15)`):** Multi-layered depth with `backdrop-blur-xl` to organize dense multi-agent workflows without visual clutter.  
* **Ambient Golden Glows:** Atmospheric background radial blur elements creating a warm "Golden Hour" lighting effect.

---

## 2\. Design Tokens & Tailwind Configuration

### 2.1 Color Palette Tokens

// tailwind.config.js color extensions

colors: {

  // Primary (Amber / Burnt Ochre)

  "primary": "\#903f00",

  "primary-container": "\#b45309",

  "primary-fixed": "\#ffdbca",

  "primary-fixed-dim": "\#ffb68e",

  "on-primary": "\#ffffff",

  "on-primary-container": "\#fff1eb",

  "on-primary-fixed": "\#331200",

  "on-primary-fixed-variant": "\#763300",

  "inverse-primary": "\#ffb68e",

  // Secondary (Warm Tangerine)

  "secondary": "\#904d00",

  "secondary-container": "\#fe932c",

  "secondary-fixed": "\#ffdcc3",

  "secondary-fixed-dim": "\#ffb77d",

  "on-secondary": "\#ffffff",

  "on-secondary-container": "\#663500",

  "on-secondary-fixed": "\#2f1500",

  "on-secondary-fixed-variant": "\#6e3900",

  // Tertiary (Muted Neutral Slate)

  "tertiary": "\#575754",

  "tertiary-container": "\#6f6f6c",

  "tertiary-fixed": "\#e4e2de",

  "tertiary-fixed-dim": "\#c8c6c3",

  "on-tertiary": "\#ffffff",

  "on-tertiary-container": "\#f5f3ef",

  "on-tertiary-fixed": "\#1b1c1a",

  "on-tertiary-fixed-variant": "\#474744",

  // Surface & Parchment System

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

  // Outlines & Borders

  "outline": "\#897267",

  "outline-variant": "\#ddc1b3",

  "glass-fill": "rgba(255, 255, 255, 0.65)",

  "glass-stroke": "rgba(180, 83, 9, 0.15)",

  // Semantic Alerts & Errors

  "error": "\#ba1a1a",

  "error-container": "\#ffdad6",

  "on-error": "\#ffffff",

  "on-error-container": "\#93000a"

}

### 2.2 Typography Scale (`Manrope`)

fontFamily: {

  sans: \["Manrope", "sans-serif"\],

  headline: \["Manrope", "sans-serif"\],

  body: \["Manrope", "sans-serif"\]

},

fontSize: {

  "headline-xl": \["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }\],

  "headline-lg": \["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "600" }\],

  "headline-lg-mobile": \["24px", { lineHeight: "32px", fontWeight: "600" }\],

  "headline-md": \["24px", { lineHeight: "32px", fontWeight: "600" }\],

  "body-lg": \["18px", { lineHeight: "28px", fontWeight: "400" }\],

  "body-md": \["16px", { lineHeight: "24px", fontWeight: "400" }\],

  "label-md": \["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "500" }\],

  "label-sm": \["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "600" }\]

}

### 2.3 Layout Spacing & Sizing Constants

* **Expanded Sidebar Width:** `280px` (`w-sidebar-expanded`)  
* **Collapsed Sidebar Width:** `72px` (`w-sidebar-collapsed`)  
* **Desktop Split Layout Ratio:** `60%` (Left Interactive Workspace) / `40%` (Right Context & Evidence Panel)  
* **Maximum Viewport Width:** `1440px` (`max-w-max-width-fluid`)  
* **Gutter:** `24px`

---

## 3\. Structural Layout & Component Specifications

┌────────────────────────────────────────────────────────────────────────────────────────┐

│ \[Side Navigation: 280px\] │ \[Main Application Workspace: Flex-1\]                        │

│                          │ ┌─────────────────────────────────────────────────────────┐ │

│ • Brand Header           │ │ Unified Header: Case Ref & Action Toolbar (Download/More)│ │

│ • "New Consultation" CTA │ ├────────────────────────────┬────────────────────────────┤ │

│ • Dashboard              │ │ Left Pane (60% Width):     │ Right Pane (40% Width):    │ │

│ • Legal Research (Active)│ │ • Scrollable Agent Chat    │ • Active Case Ref Card     │ │

│ • Procedural Drafting    │ │ • Glassmorphic AI Cards    │ • Zero-Trip Readiness Meter│ │

│ • Exhibit Vault          │ │ • In-Line Tool Pills       │ • 15-Day Countdown Widget  │ │

│ • Dispute History        │ │ • Minimal Bottom Input Bar │ • InLegalNER Precedent Deck│ │

│ • Support & User Profile │ │   (Attach, Voice, Send)    │ • Exhibit Ledger Gallery   │ │

└──────────────────────────┴─┴────────────────────────────┴────────────────────────────┴─┘

---

### 3.1 Side Navigation Bar (Desktop)

* **Visual Styling:** `bg-glass-fill backdrop-blur-md border-r border-glass-stroke w-sidebar-expanded`.  
* **Brand Header:**  
  * Logo container: `w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary-container text-on-primary shadow-[0_8px_16px_rgba(180,83,9,0.2)]` with Material icon `balance`.  
  * Title: `font-headline-md text-primary` ("Lexis Counsel").  
  * Subtitle: `font-label-sm text-on-surface-variant opacity-80` ("Elite Legal AI / Civic Empowerment").  
* **Action Button:** Full-width rounded-full button `bg-primary text-on-primary shadow-[0_12px_24px_rgba(180,83,9,0.15)] hover:bg-primary/90 hover:-translate-y-0.5 transition-all` ("New Consultation").  
* **Nav Links:** Rounded-full items with smooth hover state (`hover:bg-primary-container/20 hover:text-primary`). Active item styled with `bg-primary text-on-primary shadow-[0_4px_12px_rgba(180,83,9,0.2)]`.

---

### 3.2 Main Content Area & Unified Header

* **Unified Top Header:** Fixed `h-16 px-8 flex justify-between items-center border-b border-glass-stroke bg-glass-fill/40 backdrop-blur-sm`.  
* **Title:** Case Name & Subject (e.g., `Grievance Setup: Consumer Dispute v. Airline`).  
* **Toolbar Actions:** Icon buttons for `download` (bundle export) and `more_vert` (case settings/purge).

---

### 3.3 Left Pane (60% Interactive Workspace & Chat Stream)

* **Message Containers:**  
  * **User Message:** Clean pill bubble `bg-surface-variant/40 rounded-[20px] rounded-tr-sm px-6 py-4 max-w-[75%]`.  
  * **AI Consultant Message:** Glassmorphic card `bg-glass-fill backdrop-blur-xl border border-glass-stroke rounded-[24px] rounded-tl-sm p-6 shadow-[0_24px_48px_rgba(180,83,9,0.06)] relative overflow-hidden`.  
  * **Amber Accent Glow Line:** `absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent`.  
  * **Statutory Blockquotes:** `pl-4 border-l-2 border-primary/40 text-on-surface-variant italic my-3`.  
* **Tool Action Pills (In-Line Decision Triggers):**  
  * Rounded-full interactive pills placed below AI analysis:  
    * `[Summarize Precedent]` (`bg-primary/5 hover:bg-primary/10 border border-glass-stroke text-primary`)  
    * `[Cite Case Law]` (`bg-primary/5 hover:bg-primary/10 border border-glass-stroke text-primary`)  
    * `[Draft 15-Day Notice]` (`bg-primary text-on-primary hover:bg-primary-container shadow-[0_4px_12px_rgba(180,83,9,0.2)]`)  
    * `[Run Red-Team Audit]` (`bg-secondary-container/20 text-on-secondary-container border border-secondary-container/30`)  
* **Minimal Bottom Input Area:**  
  * Floating card container `bg-glass-fill backdrop-blur-md rounded-xl border-b-2 border-outline-variant focus-within:border-primary shadow-[0_8px_24px_rgba(180,83,9,0.04)]`.  
  * Multi-modal actions: Attachment clip (`attach_file`), Voice record button (`mic`), auto-expanding textarea, and Primary send button (`send` in filled state).  
  * Footnote: `font-label-sm text-on-surface-variant/60` ("AI procedural assistance is grounded in Indian Bare Acts. Verified counsel review available u/s 35(1) CPA 2019.").

---

### 3.4 Right Pane (40% Context, Readiness & Evidence Panel)

* **Active Case Meta Card:**  
  * Display reference: `Ref: 2026-CPA-DCDRC-894`.  
  * Forum badge: `px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm border border-glass-stroke` ("District Commission Jurisdiction: Consideration \<= ₹50L").  
* **Zero-Trip Pre-Filing Readiness Meter Widget:**  
  * Radial / Progress bar indicator displaying live readiness percentage (0% to 100%).  
  * Checklist items with interactive status badges (Verified, Missing, Needs Redaction).  
* **15-Day Statutory Countdown Clock Widget:**  
  * Circular time-ring displaying remaining days/hours for Opposite Party compliance.  
  * Status indicator: `Days 1-15: Active Notice Window` $\\rightarrow$ `Day 16+: e-Daakhil Escalation Unlocked`.  
* **InLegalNER Precedent Cards Deck:**  
  * Clean card items `bg-surface-variant/20 hover:bg-surface-variant/40 border border-glass-stroke rounded-xl p-4 transition-colors cursor-pointer`.  
  * Leading icon badge: `w-10 h-10 rounded-lg bg-surface text-primary border border-glass-stroke flex items-center justify-center`.  
  * Title, Citation (`(2020) 16 SCC 512`), Court/Bench, and Clickable link to [Indian Kanoon](https://indiankanoon.org/) or [DigiSCR](https://digiscr.sci.gov.in/).  
* **Exhibit Ledger Attachment Gallery:**  
  * Structured list of parsed documents (**Exhibit A: Tax Invoice**, **Exhibit B: WhatsApp Chat Export**, **Exhibit C: Speed Post Delivery Receipt**).

---

## 4\. Mobile Responsive Adaptation (Breakpoints \< 768px)

* **Navigation:** Collapses to a sticky top app bar with hamburger drawer.  
* **Layout:** Switches from 60/40 horizontal split to a bottom-tabbed view:  
  * Tab 1: **Consultant Chat & Drafter** (Workspace).  
  * Tab 2: **Case Context & Precedents** (Referenced Materials).  
  * Tab 3: **Exhibits & Readiness Meter** (Evidence Vault).

---

## 5\. UI Component Implementation Snippets (React \+ Tailwind CSS)

### 5.1 Glassmorphic Chat Message Card (`ChatMessage.tsx`)

import React from 'react';

interface ChatMessageProps {

  sender: 'user' | 'assistant';

  content: string;

  statuteQuote?: string;

  analysisText?: string;

  precedentName?: string;

  precedentUrl?: string;

  toolActions?: Array\<{ label: string; icon: string; primary?: boolean; onClick: () \=\> void }\>;

}

export const ChatMessageCard: React.FC\<ChatMessageProps\> \= ({

  sender,

  content,

  statuteQuote,

  analysisText,

  precedentName,

  precedentUrl,

  toolActions \= \[\]

}) \=\> {

  if (sender \=== 'user') {

    return (

      \<div className="flex flex-col items-end w-full mb-6"\>

        \<span className="font-label-md text-label-md text-on-surface-variant mb-2 mr-2"\>You\</span\>

        \<div className="bg-surface-variant/40 rounded-\[20px\] rounded-tr-sm px-6 py-4 max-w-\[85%\] md:max-w-\[70%\] text-on-surface font-body-md text-body-md shadow-sm"\>

          {content}

        \</div\>

      \</div\>

    );

  }

  return (

    \<div className="flex flex-col items-start w-full mb-8"\>

      \<div className="flex items-center gap-3 mb-2 ml-2"\>

        \<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-\[0\_4px\_12px\_rgba(180,83,9,0.3)\]"\>

          \<span className="material-symbols-outlined text-\[18px\]"\>balance\</span\>

        \</div\>

        \<span className="font-label-md text-label-md text-primary font-semibold"\>Lexis Counsel\</span\>

      \</div\>

      \<div className="bg-glass-fill backdrop-blur-xl border border-glass-stroke rounded-\[24px\] rounded-tl-sm p-6 md:p-8 max-w-\[95%\] md:max-w-\[85%\] shadow-\[0\_24px\_48px\_rgba(180,83,9,0.06)\] relative overflow-hidden"\>

        {/\* Ambient Top Glow Line \*/}

        \<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/25 to-transparent" /\>

        \<div className="prose space-y-4 text-on-surface font-body-md text-body-md leading-relaxed"\>

          \<p\>{content}\</p\>

          {statuteQuote && (

            \<div className="pl-4 border-l-2 border-primary/40 text-on-surface-variant italic"\>

              "{statuteQuote}"

            \</div\>

          )}

          {analysisText && (

            \<p\>

              \<strong\>Analysis:\</strong\> {analysisText}

            \</p\>

          )}

          {precedentName && precedentUrl && (

            \<p\>

              Statutory grounding supported by{' '}

              \<a href={precedentUrl} target="\_blank" rel="noreferrer" className="text-primary font-medium underline hover:text-primary-container"\>

                {precedentName}

              \</a\>.

            \</p\>

          )}

        \</div\>

        {toolActions.length \> 0 && (

          \<div className="mt-6 pt-4 border-t border-glass-stroke flex flex-wrap gap-2 md:gap-3"\>

            {toolActions.map((action, idx) \=\> (

              \<button

                key={idx}

                onClick={action.onClick}

                className={\`flex items-center gap-1.5 px-4 py-2 rounded-full font-label-sm text-label-sm transition-all duration-300 ${

                  action.primary

                    ? 'bg-primary text-on-primary hover:bg-primary-container shadow-\[0\_4px\_12px\_rgba(180,83,9,0.2)\]'

                    : 'bg-primary/5 hover:bg-primary/10 border border-glass-stroke text-primary shadow-sm hover:shadow-\[0\_4px\_12px\_rgba(180,83,9,0.08)\]'

                }\`}

              \>

                \<span className="material-symbols-outlined text-\[16px\]"\>{action.icon}\</span\>

                {action.label}

              \</button\>

            ))}

          \</div\>

        )}

      \</div\>

    \</div\>

  );

};  
