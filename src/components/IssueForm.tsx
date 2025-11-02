import { useState } from 'react'
import type { Issue, IssueStatus, IssuePriority } from '../types'

interface IssueFormProps {
    onAddIssue: (issue: Omit<Issue, 'id' | 'createdAt'>) => void
}

export function IssueForm({ onAddIssue }: IssueFormProps) {
    // You'll need state for each form field
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('low' as IssuePriority)
    const [status, setStatus] = useState('todo' as IssueStatus)
   
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()  // Prevents page reload

      onAddIssue({
        title,
        description,
        priority,
        status
      })
      setTitle('')
      setDescription('')
      setPriority('low')
      setStatus('todo')
    }

    return (
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="title">Title: </label>
        <input name="title" type='text' value={title} onChange={ (e) => setTitle(e.target.value)}/>
        <label htmlFor="desciption">Description: </label>
        <input name="desciption" type='text' value={description} onChange={ (e) => setDescription(e.target.value)}/>
        <label htmlFor="status">Status: </label>
        <select name ="status"  value={status} onChange={ (e) => setStatus(e.target.value as IssueStatus)}>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
        </select>
        <label htmlFor="priority">Priority: </label>
        <select name ="priority" value={priority} onChange={ (e) => setPriority(e.target.value as IssuePriority)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
         <button type="submit">Add Issue</button>
      </form>
    )
  }