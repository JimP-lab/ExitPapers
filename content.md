
# Developer Guide & Content Strategy: ExitPapers

## 1. Project Structure & Organization

This project uses a single-directory structure (root-level `src` concept) for simplicity in this environment, but logic is separated into clearly defined modules.

### Core Files
- `index.html`: Entry point. Loads Tailwind CSS via CDN and the React application.
- `index.tsx`: React DOM root renderer.
- `App.tsx`: **Main Controller.** Handles the global state (`currentView`, `fieldProfile`, `soldiers`) and routing between views.
- `types.ts`: **Type Definitions.** Contains the Single Source of Truth for data interfaces (`Soldier`, `MilitaryFieldProfile`, `AppView`).

### Component Architecture (`/components`)
1.  **LandingPage.tsx**: The public marketing face. Pure presentation. Triggers `onEnterApp`.
2.  **Auth.tsx**: Handles Login/Register UI toggle. Passes control to `App.tsx` on success.
3.  **Onboarding.tsx**: Collects critical field data (Commander Name, Location) needed for the PDF generation.
4.  **Dashboard.tsx**: **Complex View.**
    - Manages the soldier list state locally for filtering/searching.
    - Triggers the Gemini Service for approvals.
    - Handles file import parsing.
5.  **SoldierPortal.tsx**: A restricted view for soldiers to find their specific paper.
6.  **DigitalPaper.tsx**: The "Output" artifact. Designed with CSS to look like a physical official document.

### Services (`/services`)
- `geminiService.ts`: Wraps `@google/genai` API calls.
    - **Function:** `generateExitProtocol`
    - **Input:** Soldier Data + Field Profile
    - **Output:** Formal military text string.

## 2. Content Strategy for AI Generation

The application uses Google Gemini to generate dynamic content. When developing or modifying the prompt in `geminiService.ts`, adhere to these principles:

### Tone of Voice
- **Strictly Formal:** No colloquialisms.
- **Authoritative:** Use words like "Authorized," "Mandated," "In accordance with."
- **Concise:** Military protocols prioritize brevity.

### Data Injection
The prompt must always receive:
1.  **Rank & Surname:** The primary identifiers in military contexts.
2.  **Dates:** Exit and Rejoin dates must be explicit.
3.  **Commander's Name:** Adds authority to the generated text.

*Example Prompt Structure used in code:*
> "Generate a short, strictly formal military exit approval statement... citing accordance with standard regulations."

## 3. Development Workflow

### Adding a New View
1.  Add the view key to `AppView` enum in `types.ts`.
2.  Create the component in `components/`.
3.  Import component in `App.tsx`.
4.  Add a conditional render block in `App.tsx` (e.g., `{currentView === AppView.NEW_VIEW && ...}`).

### Modifying the Dashboard Data
Currently, data is held in React State (`useState` in `App.tsx`).
- **To Persist Data:** Replace the `useState` hooks in `App.tsx` with calls to a backend API or `localStorage`.
- **To Change Soldier Data Structure:** Update `Soldier` interface in `types.ts` first, then update `Dashboard.tsx` table and `handleFileUpload`.

### Styling Guide
- **Framework:** Tailwind CSS.
- **Primary Color:** Emerald (`bg-emerald-600`, `text-emerald-600`) representing "Go/Safe/Approved".
- **Secondary Color:** Slate (`bg-slate-900`) representing "Official/Military/Hardware".
- **Fonts:** 'Inter' (sans-serif) for UI, 'Serif' (default system serif) for the official document text to mimic print.

## 4. Asset Management
- **Video:** The preview video is located at `attachments/ExitPapers-Preview.mp4`. Ensure this directory and file exist for the `LandingPage.tsx` to display the video correctly.
- **Images:** External placeholders (Unsplash) are used for backgrounds. For production, replace with local assets to ensure offline capability.
