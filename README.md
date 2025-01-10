# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

# Responsive Task Management System

## Overview

The Responsive Task Management System is a feature-rich application designed to manage tasks efficiently. Built with React and TypeScript, the application leverages Firebase for user authentication and real-time data storage. The system includes the ability to add, edit, delete, filter, sort, and search tasks, ensuring a seamless and user-friendly experience across all devices.

## Features

- **Add Tasks**: Users can create new tasks with a title, description, category, due date, and status.
- **Edit Tasks**: Existing tasks can be updated dynamically.
- **Delete Tasks**: Remove tasks with a single click.
- **Filter Tasks**: Filter tasks based on categories, statuses, or due dates.
- **Sort Tasks**: Sort tasks by title, due date, or status.
- **Search Tasks**: Quickly find tasks using a search bar.
- **Responsive Design**: Fully functional on desktops, tablets, and mobile devices.
- **Firebase Integration**:
  - User authentication (sign-up, login, logout).
  - Real-time database for storing and updating tasks.

## Deployment

The live application is hosted on [Vercel](https://vercel.com) and can be accessed at:
[Deployment URL](#)

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- Yarn or npm
- Firebase Project Setup:
  - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
  - Enable Authentication and Firestore Database.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd responsive-task-management
   ```
2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```
3. Configure Firebase:
   - Create a `.env` file in the root directory and add your Firebase configuration:
     ```env
     REACT_APP_FIREBASE_API_KEY=AIzaSyAKVOtskLCNKXHsKD8LINmJH4B3F3mBi1U
     REACT_APP_FIREBASE_AUTH_DOMAIN=task-management-app1-f6b3f.firebaseapp.com
     REACT_APP_FIREBASE_PROJECT_ID=task-management-app1-f6b3f
     REACT_APP_FIREBASE_STORAGE_BUCKET=task-management-app1-f6b3f.firebasestorage.app
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=744452578604
     REACT_APP_FIREBASE_APP_ID=1:744452578604:web:c063827d35330d61ae6089
     ```
4. Start the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```
5. Open the application in your browser at `http://localhost:3000`.

### Building and Deploying

1. Build the project for production:
   ```bash
   yarn build
   # or
   npm run build
   ```
2. Deploy the build to your hosting platform (e.g., Vercel, Firebase Hosting).

## Challenges Faced and Solutions Implemented

1. **Real-time Database Updates:**

   - **Challenge**: Handling real-time updates and ensuring data consistency.
   - **Solution**: Used Firebase's `onValue` and `update` methods for efficient and consistent data manipulation.

2. **Responsive Design:**

   - **Challenge**: Ensuring the UI is intuitive and functional across devices.
   - **Solution**: Used CSS flexbox and grid with media queries to create a responsive layout.

3. **Filtering and Sorting Logic:**

   - **Challenge**: Managing multiple filters and sorting criteria without performance issues.
   - **Solution**: Implemented optimized filtering and sorting functions in the component state.

4. **Form Validation:**
   - **Challenge**: Validating form inputs dynamically.
   - **Solution**: Used `Yup` with `Formik` to validate forms efficiently.

## Judging Criteria

- **Code Quality and Organization:**
  - Modular structure with reusable components.
  - Clear and concise TypeScript types for props and states.
- **Implementation of Features:**
  - Fully functional add, edit, delete, filter, sort, and search features.
- **Responsiveness and Performance Metrics:**
  - Optimized for all screen sizes with smooth interactions.
- **Completeness and Functionality:**
  - Full implementation of all task management requirements.

## Technologies Used

- **Frontend**:
  - React (with TypeScript)
  - SASS/Tailwind CSS for styling
- **Backend**:
  - Firebase Authentication
  - Firebase Realtime Database

## Folder Structure

```
responsive-task-management/
├── public/
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Main application pages
│   ├── services/     # Firebase service integration
│   ├── utils/        # Helper functions and types
│   └── App.tsx       # Main application entry
├── .env              # Firebase configuration
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Submit a pull request with a detailed description of the changes.

---

Thank you for checking out the Responsive Task Management System!
