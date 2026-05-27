# Todo List System with API Integration

A simple Todo application with API integration built using React, TypeScript, and Vite.

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Filter tasks
- Search for tasks by keyword
- Loading skeleton UI
- Error handling for API requests
- Responsive UI

## Tech Stack

- React
- TypeScript
- Vite
- Axios
- CSS
- FontAwesome

## How to run the project

### 1. Clone the repository

```bash
git clone https://github.com/gapdapper/todo-list-system-assignment.git
```

### 2. Navigate to the project folder

```bash
cd todo-list-system-assignment
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Open in browser

```bash
http://localhost:5173
```

## Thought Process

The goal of this project was to create a simple and clean Todo application while focusing on frontend fundamentals and user experience.

### Architecture & Structure

The project was separated into:
- Assets (images and other static assets)
- Components (reusable React components)
- Context (React Context API providers and shared state)
- Hooks (custom React hooks)
- Services (API and business logic)
- Types (TypeScript type definitions)

This structure helps improve maintainability and keeps responsibilities clearly separated.

### API Handling

Axios was used to handle API request because it provides a cleaner syntax, automatic JSON transformation, and easier error handling compared to the native Fetch API.

API logic was separated into service files to avoid mixing networking logic with UI logic and to improve reusability.

### State Management

React Context API was used to centralize todo-related state and actions such as:
- fetching todos
- creating tasks
- updating tasks
- deleting tasks

This helps keep API and state logic separated from presentation components and makes the codebase easier to scale in the future.

Some states remain local because they are only used within a single component.

### User Experience Highlights

- Skeleton loading screen during initial fetch
- Disabled actions while requests are processing
- Separate handling for loading errors and action errors
- Responsive layout for different screen sizes

### Error Handling

The application handles:
- Failed API requests by displaying meaningful error messages
- Invalid user input by disabling the submit button when necessary
- Loading and action failures through toast error notifications

This was done to provide better feedback and prevent unexpected UI behavior.

## Author

Puri Pongsomboonsuk