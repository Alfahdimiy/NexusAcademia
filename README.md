# NexusAcademia

NexusAcademia is a modern,learning Management System (LMS) built to empower students through structured learning paths, collaborative peer interactions, and intelligent tutoring.

## 🚀 Features

- **AI Tutoring Assistant**: Leveraging Google Gemini via Genkit to instantly summarize complex lecture notes and generate practice quizzes.
- **Structured Learning Path**: Weekly units mapped out with reading materials, assignments, and milestones to keep students on track.
- **Post-First Discussion Forums**: Encourages original academic thought by requiring students to post their own response before viewing peer contributions.
- **Private Learning Journal**: A secure channel for students to share weekly reflections, breakthroughs, or challenges directly with their instructors.
- **Student Dashboard**: A centralized hub for tracking course progress, GPA, upcoming tasks, and peer review status.
- **Responsive Design**: Built with Tailwind CSS and ShadCN UI for a professional, seamless experience across all devices.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Database & Auth**: [Firebase](https://firebase.google.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

- `src/app`: Next.js application routes and layouts.
- `src/ai`: Genkit flow definitions for AI summarization and quiz generation.
- `src/components`: Reusable UI components including ShadCN and custom layout elements.
- `src/firebase`: Firebase configuration and client-side hooks.
- `src/lib`: Utility functions and placeholder data.

## 🚦 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Google API keys configured in your environment.

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Run Genkit Dev UI**:
   ```bash
   npm run genkit:dev
   ```

NexusAcademia is designed to transform the digital classroom into a truly connected and intelligent learning environment.