# Product Requirements Document (PRD): ExitPapers

## 1. Product Overview
**Product Name:** ExitPapers  
**Version:** 1.0  
**Status:** MVP (Minimum Viable Product)  
**Description:** A military leave management system that digitizes the approval process for base exits. It allows commanders to manage soldier rosters and approvals efficiently while providing soldiers with verifiable digital exit papers.

## 2. Problem Statement
Manual exit protocols in local military fields are often bureaucratic, paper-heavy, and slow. 
- **Commanders** struggle with tracking who is authorized to leave.
- **Soldiers** wait for physical signatures.
- **Gate Guards** lack a quick way to verify the authenticity of a paper pass.

## 3. Goals & Objectives
- **Digitize Operations:** Replace physical paper slips with digital assets.
- **Formalize Protocol:** Use AI to ensure every exit approval maintains strict military formality without manual drafting.
- **Increase Speed:** Reduce the time from "request" to "exit" for soldiers.
- **Enhance Security:** Provide a standardized, QR-coded digital asset that is harder to forge than hand-written notes.

## 4. User Personas
### 4.1. The Field Commander (Admin)
- **Role:** Head of the local military field unit.
- **Needs:** Bulk management of soldiers, quick approval toggles, automated protocol generation.
- **Pain Point:** Administrative burden of writing permissions manually.

### 4.2. The Soldier (User)
- **Role:** Active duty personnel requesting leave.
- **Needs:** Instant access to their approved paper on their phone.
- **Pain Point:** Losing physical papers or waiting for commander availability.

## 5. Functional Requirements

### 5.1. Authentication & Onboarding
- **FR-01:** System must allow users to log in with an email/ID and passcode.
- **FR-02:** New commanders must complete an "Onboarding" flow to register their Field Name, Location, and Commander Name.
- **FR-03:** Field profile data must persist in the session to appear on generated documents.

### 5.2. Command Dashboard
- **FR-04:** Commanders must be able to view a list of soldiers.
- **FR-05:** Commanders must be able to import soldiers via CSV parsing or load mock data.
- **FR-06:** Commanders must be able to search/filter soldiers by name.
- **FR-07:** Commanders must be able to toggle "Approved" status for a soldier.
- **FR-08:** **AI Integration:** When a soldier is approved, the system must use Google Gemini (`gemini-2.5-flash`) to generate a unique, formal military exit statement based on the specific soldier and field details.
- **FR-09:** The system must simulate an SMS notification to the soldier upon approval.

### 5.3. Soldier Portal (Public/Restricted)
- **FR-10:** A separate view for soldiers to retrieve their papers.
- **FR-11:** Soldiers search by Surname.
- **FR-12:** System validates if the soldier exists and is `isApproved`. If not, access is denied.

### 5.4. Digital Exit Paper (The Artifact)
- **FR-13:** A specialized view representing the official document.
- **FR-14:** Must display: Soldier Name, Rank, Age, Exit/Rejoin Dates, and the AI-generated Commander's Protocol.
- **FR-15:** Must include a visual QR Code for verification.
- **FR-16:** Must include a digital signature of the Commander.

## 6. Non-Functional Requirements
- **NFR-01 (Performance):** AI text generation should take less than 3 seconds.
- **NFR-02 (UX):** The interface should look "official" yet modern (Tailwind CSS).
- **NFR-03 (Reliability):** If AI fails, a fallback standard protocol text must be used.

## 7. Technical Specifications
- **Frontend Framework:** React 19
- **Styling:** Tailwind CSS
- **AI Model:** Google Gemini Flash 2.5 (`gemini-2.5-flash`) via `@google/genai`
- **Icons:** Lucide React
- **Data State:** Client-side in-memory (MVP scope).

## 8. Future Roadmap (Post-MVP)
- **v1.1:** Persistent Database (Supabase/Firebase).
- **v1.2:** PDF Generation (jspdf) for physical printing.
- **v1.3:** Gate Guard Mode (QR Scanner implementation).
- **v1.4:** Real SMS integration (Twilio).
