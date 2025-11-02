import { useState, useEffect } from 'react'
import './App.css'
import { IssueList } from './components/IssueList'
import { IssueForm } from './components/IssueForm'
import type { Issue } from './types'

// Initial mock data
  const initialIssues: Issue[] = [
    {
      id: '1',
      title: 'Fix login bug',
      description: 'Users unable to login with special characters in password',
      status: 'in-progress',
      priority: 'high',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Add dark mode',
      description: 'Implement dark mode toggle in settings',
      status: 'todo',
      priority: 'medium',
      createdAt: new Date('2024-01-20')
    },
    {
      id: '3',
      title: 'Update documentation',
      description: 'Add API documentation for new endpoints',
      status: 'done',
      priority: 'low',
      createdAt: new Date('2024-01-10')
    }
  ]

function App() {
    // Convert initialIssues to state
    const [issues, setIssues] = useState<Issue[]>(() => {
        const saved = localStorage.getItem('issues')
        if (saved) {
            const issuesJson = JSON.parse(saved)
            return issuesJson.map((issue: Omit<Issue, 'createdAt'> & { createdAt: string }) => ({
                ...issue,
                createdAt: new Date(issue.createdAt)  // Convert string to Date
            }))
        }
        return initialIssues
    })
    // useEffect runs code after render:
    useEffect(() => {
        localStorage.setItem('issues', JSON.stringify(issues))
    }, [issues])

    const handleDeleteIssue = (id: string) => {
        setIssues(issues.filter(issue => issue.id !== id))
    }
    const handleUpdateIssue = (id: string, updates: Partial<Issue>) => {
    setIssues(issues.map(issue =>
      issue.id === id ? { ...issue, ...updates } : issue
    ))
  }

    // Function to add a new issue
    const handleAddIssue = (newIssue: Omit<Issue, 'id' | 'createdAt'>) => {
      const issue: Issue = {
        ...newIssue,
        id: crypto.randomUUID(),  // Generate unique ID
        createdAt: new Date()
      }
      setIssues([...issues, issue])  // Add to the list
    }

    return (
        <>
        <h1>Issue Tracker</h1>
        <IssueForm onAddIssue={handleAddIssue} />
        <IssueList issues={issues} onDeleteIssue={handleDeleteIssue} onUpdateIssue={handleUpdateIssue}/>
        </>
    )
}

export default App
