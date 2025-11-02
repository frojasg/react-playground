# React Learning Session 

## Overview

Built a lightweight issue tracking web UI (Jira/Trello hybrid) using React, TypeScript, and Vite. Focused on hands-on learning through guided implementation.

  ---
  What You Built

  A functional issue tracker with:
  - Create new issues with title, description, priority, and status
  - Display list of all issues
  - Update issue status and priority via dropdowns
  - Delete issues
  - Local storage persistence (survives page refresh)

  ---
## Key Concepts Learned

  1. React Fundamentals

  Components - Functions that return UI
  function App() {
    return <h1>Issue Tracker</h1>
  }

  State - Data that triggers re-renders when changed
  const [count, setCount] = useState(0)
  // count: current value
  // setCount: function to update value

  Props - Data passed from parent to child components
  interface IssueListProps {
    issues: Issue[]
  }

  function IssueList({ issues }: IssueListProps) {
    // Use destructuring to extract props
  }

  2. State Updates

  Direct value - when new state doesn't depend on old:
  setCount(5)
  setUser(null)

  Functional update - when computing from previous state:
  setCount(prev => prev + 1)  // Guarantees latest state

  3. Controlled Components

  Form inputs where React controls the value:
  <input
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />

  4. Side Effects with useEffect

  Run code after render (for localStorage, API calls, etc):
  useEffect(() => {
    localStorage.setItem('issues', JSON.stringify(issues))
  }, [issues])  // Re-run when 'issues' changes

  5. Lifting State Up

  Child components communicate with parents via callback props:
  // Parent
  function App() {
    const [issues, setIssues] = useState([])
    const handleAdd = (newIssue) => { /* ... */ }
    return <IssueForm onAddIssue={handleAdd} />
  }

  // Child
  function IssueForm({ onAddIssue }) {
    const handleSubmit = () => {
      onAddIssue(newIssue)  // Call parent's function
    }
  }

  6. Common State Patterns

  Add to array:
  setIssues([...issues, newIssue])

  Delete from array:
  setIssues(issues.filter(issue => issue.id !== id))

  Update item in array:
  setIssues(issues.map(issue =>
    issue.id === id ? { ...issue, ...updates } : issue
  ))

  ---
# Project Structure

  react-playground/
  ├── src/
  │   ├── components/
  │   │   ├── IssueList.tsx    # Displays all issues
  │   │   └── IssueForm.tsx    # Form to create new issues
  │   ├── types.ts             # TypeScript interfaces
  │   ├── App.tsx              # Main component with state
  │   ├── App.css
  │   └── main.tsx
  ├── package.json
  └── vite.config.ts

  ---
  Key Files Created

  src/types.ts

  export type IssueStatus = "todo" | "in-progress" | "done"
  export type IssuePriority = "low" | "medium" | "high"

  export interface Issue {
    id: string
    title: string
    description: string
    status: IssueStatus
    priority: IssuePriority
    createdAt: Date
  }

  src/components/IssueForm.tsx

  - Uses useState for each form field
  - Controlled inputs with value and onChange
  - Calls onAddIssue prop on submit
  - Resets form after submission

  src/components/IssueList.tsx

  - Receives issues array as prop
  - Maps over issues and displays each with .map()
  - Delete button for each issue
  - Dropdowns to update status/priority

  src/App.tsx

  - Main state management with useState
  - localStorage persistence with useEffect
  - CRUD operations: create, read, update, delete
  - Passes data and callbacks to child components

  ---
  Important Lessons

  Array Destructuring

  const [value, setValue] = useState(0)
  // Same as:
  // const stateArray = useState(0)
  // const value = stateArray[0]
  // const setValue = stateArray[1]

  Why Not Mutate State Directly?

  // ❌ Wrong - React won't detect change
  count = count + 1

  // ✓ Correct - React tracks change and re-renders
  setCount(count + 1)

  JSX Differences from HTML

  - Use htmlFor instead of for
  - Use className instead of class
  - Event handlers are camelCase: onClick, onChange
  - Wrap expressions in curly braces: {issue.title}

  TypeScript Best Practices

  - Avoid any type - be specific
  - Use Partial<T> for optional fields
  - Use union types for constrained values
  - Type JSON data accurately (dates become strings)

  ---
  localStorage Pattern

  Save to localStorage:
  localStorage.setItem('issues', JSON.stringify(issues))

  Load from localStorage:
  const saved = localStorage.getItem('issues')
  if (saved) {
    const issuesJson = JSON.parse(saved)
    // Convert date strings back to Date objects
    return issuesJson.map(issue => ({
      ...issue,
      createdAt: new Date(issue.createdAt)
    }))
  }

  ---
  Next Steps

  Immediate (Not Completed)

  - Build Kanban board view with three columns (todo, in-progress, done)
  - Use derived state to filter issues by status
  - Display columns side-by-side

  Future Enhancements

  - Add tags/labels to issues
  - Add search/filter functionality
  - Improve styling with CSS
  - Add due dates
  - Sort issues by priority or date
  - Add issue editing (not just status/priority)
  - Add drag-and-drop between columns

  ---
  Commands Reference

  # Start dev server
  npm run dev

  # Run linter
  npm run lint

  # Build for production
  npm run build

  ---
  Key Takeaways

  1. React components are just functions that take props and return JSX
  2. useState hook manages component state and triggers re-renders
  3. useEffect hook handles side effects after render
  4. Props flow down, events flow up (via callback functions)
  5. TypeScript helps catch bugs before runtime
  6. Controlled components keep React as single source of truth
  7. Immutable state updates using spread operator and array methods



## What You've Accomplished Today:

✓ Learned React fundamentals (components, props, state)✓ Built a form with controlled inputs✓ Implemented localStorage persistence✓ Created CRUD
operations (Create, Read, Update, Delete)✓ Handled TypeScript types properly

Next step when you return: Build the Kanban board component!



# Next steps

 Step 7: Create a Kanban Board View

  Let's make this look like a real issue tracker! You'll build a board with three columns: Todo, In Progress, and Done.

  This teaches you about derived state - computing new data from existing state without storing it separately.

  Your Task:

  Create a new component src/components/KanbanBoard.tsx that:
  1. Takes the same props as IssueList (issues, onDeleteIssue, onUpdateIssue)
  2. Groups issues by status into three columns
  3. Displays each column side-by-side

  Starter structure:
```
  import { Issue, IssueStatus } from '../types'

  interface KanbanBoardProps {
    issues: Issue[]
    onDeleteIssue: (id: string) => void
    onUpdateIssue: (id: string, updates: Partial<Issue>) => void
  }

  export function KanbanBoard({ issues, onDeleteIssue, onUpdateIssue }: KanbanBoardProps) {
    // Filter issues by status
    const todoIssues = issues.filter(issue => issue.status === 'todo')
    const inProgressIssues = issues.filter(issue => issue.status === 'in-progress')
    const doneIssues = issues.filter(issue => issue.status === 'done')

    return (
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Create three columns here */}
      </div>
    )
  }
```

  Hints:
  - Create a helper function or separate component for rendering a column
  - Each column should show the status name and the filtered issues
  - Reuse the same delete button and dropdowns from IssueList
  - Use inline styles for now (or add CSS later if you want)

  Challenge: Can you make it so when you change the status dropdown, the issue automatically moves to the correct column?

  Give it a shot! Once you have the basic structure, we can improve the styling.



# Prompt generated by claude when I come back to learn this:
 I'm a backend engineer learning React through hands-on practice. I learn best by doing, not by having someone do the work for me. I want guidance and
  explanations, but I should write most of the code myself.

  Project Context

  I'm building a lightweight issue tracker (like a tiny Jira/Trello) using React, TypeScript, and Vite. The project is located at /home/frojas/...

What I've Completed

  ✓ Step 1-2: Learned React basics (components, props, state) and defined TypeScript types for Issue data model✓ Step 3: Built IssueList component that
  displays issues using .map() and props✓ Step 4: Created IssueForm component with controlled inputs for creating new issues✓ Step 5: Implemented
  localStorage persistence using useEffect hook✓ Step 6: Added CRUD operations - delete issues and update status/priority via dropdowns

  Current Project Structure

  src/
  ├── components/
  │   ├── IssueList.tsx    # Displays issues with delete & update controls
  │   └── IssueForm.tsx    # Form to create new issues
  ├── types.ts             # Issue, IssueStatus, IssuePriority types
  ├── App.tsx              # Main component with state management
  └── main.tsx

  Where I Left Off

  Next Task: Build a Kanban board view (src/components/KanbanBoard.tsx) that:
  - Groups issues into three columns by status (todo, in-progress, done)
  - Uses derived state (filtering) rather than storing separately
  - Displays columns side-by-side
  - Reuses existing delete and update functionality

  How to Help Me

  1. Let me write the code - Give me hints, structure, and explanations, but let me implement
  2. Review my code - When I say "done" or "take a look", review what I wrote and provide feedback
  3. Explain concepts - When I ask "why", explain the reasoning (I especially appreciate backend analogies)
  4. Correct mistakes - Point out errors and TypeScript issues, but let me fix them when possible
  5. Track progress - Use the TodoWrite tool to track tasks

  What I Know So Far

  - Components, props, and state (useState)
  - Controlled components and form handling
  - Side effects (useEffect) and localStorage
  - Array destructuring and functional updates
  - Common state patterns (add, delete, update items in arrays)
  - TypeScript types and interfaces
  - Lifting state up (parent-child communication)

  Start by helping me build the Kanban board component. Give me a structure to start with, then let me implement it.

  ---
  This prompt gives the assistant full context to resume your learning session exactly where you left off!