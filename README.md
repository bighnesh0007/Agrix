---

# ais -(https://bighnesh-kktv1x52v-varsshiths-projects.vercel.app/)  

This project is a web application built using Next.js with various tools and libraries to enhance the UI/UX, handle forms, manage API calls, and more.

## Table of Contents

- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [License](#license)

## Installation

To get started with this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repo
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Dependencies

This project leverages the following key dependencies:

- **@clerk/nextjs**: Authentication and user management for Next.js applications.
- **@google/generative-ai**: Integration with Google's generative AI tools.
- **@radix-ui/react-* (Label, Popover, Progress, Select, Slot, Tabs)**: Radix UI components for building accessible and high-quality interfaces.
- **@tabler/icons-react**: A set of open-source icons optimized for React.
- **@tailwindcss/forms**: Tailwind CSS plugin to style forms.
- **@tsparticles/engine**, **@tsparticles/react**, **@tsparticles/slim**: Particle engine and React components for creating particle animations.
- **aceternity-ui**: UI component library.
- **axios**: Promise-based HTTP client for making API requests.
- **chart.js** & **react-chartjs-2**: Charting library and its React wrapper for creating data visualizations.
- **class-variance-authority** & **clsx**: Utility libraries for conditionally joining class names.
- **cobe**: Lightweight library for building 3D globe visualizations.
- **date-fns**: Utility library for working with dates in JavaScript.
- **express**: Web framework for Node.js, used for server-side routing.
- **formidable**: Node.js module for parsing form data, especially file uploads.
- **framer-motion**: Library for animations and gestures in React.
- **lucide-react**: React components for Lucide icons.
- **next**: The core Next.js framework.
- **openai**: Integration with OpenAI's API for building AI-powered features.
- **react** & **react-dom**: The core React library and its DOM renderer.
- **react-big-calendar**: A customizable calendar component for React.
- **react-day-picker**: Date picker component for React.
- **react-hook-form**: Hook-based form validation and management.
- **react-icons**: Popular icons as React components.
- **recharts**: Another charting library for React, focusing on composability.
- **shadcn-ui**: UI library based on Radix UI and Tailwind CSS.
- **tailwind-merge**: Utility for merging Tailwind CSS class names.
- **tailwindcss-animate**: Tailwind CSS plugin for animations.
- **twilio**: Twilio API integration for SMS, voice, and video features.

## Usage

### Authentication

To manage user authentication, this project uses `@clerk/nextjs`. You need to configure Clerk by setting up your Clerk instance and providing your frontend API key.

### API Integration

This project integrates with multiple external APIs, including Google's generative AI and OpenAI. Ensure that you have valid API keys for each service in your environment variables.

### UI Components

The UI is built using components from Radix UI, Shadcn UI, and Tailwind CSS. The project also uses `react-icons`, `lucide-react`, and `@tabler/icons-react` for iconography.

### Data Visualization

Data visualization is handled using `chart.js`, `react-chartjs-2`, and `recharts`. You can find pre-configured chart components under the `components` directory.

## Features

- **Authentication**: Secure user authentication and session management.
- **API Integrations**: Connect with various APIs like Google Generative AI and OpenAI.
- **Responsive Design**: Built with responsive UI components for a seamless experience on all devices.
- **Animations**: Smooth and engaging animations using Framer Motion and Tailwind CSS.
- **Form Handling**: Robust form handling with `react-hook-form` and Tailwind CSS forms.
- **Real-time Communication**: Integrated with Twilio for real-time communication features.

## Project Structure

```plaintext
.
├── components
│   ├── UI
│   ├── Charts
│   ├── Forms
├── pages
│   ├── api
│   ├── auth
│   ├── index.tsx
├── public
├── styles
├── utils
└── README.md
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---
![image](https://github.com/user-attachments/assets/d6290f58-1d49-4136-ada0-562a7885ef9d)

