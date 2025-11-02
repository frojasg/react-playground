 import type { Issue, IssueStatus, IssuePriority } from '../types'

  interface IssueListProps {
    issues: Issue[]  // This is the prop type
    onDeleteIssue: (id: string) => void
    onUpdateIssue: (id: string, updates: Partial<Issue>) => void
  }

  export function IssueList({ issues, onDeleteIssue, onUpdateIssue }: IssueListProps) {
    return (
      <div>
        <h2>Issues</h2>
        <ul>
        {issues.map( issue => (
            <li key={issue.id}>
                <div>{issue.title}</div>
                <div>{issue.createdAt.toLocaleDateString()}</div>
                <div>
                  <select id="priority" name ="priority" value={issue.priority} onChange={ (e) => onUpdateIssue(issue.id, {priority: e.target.value as IssuePriority})}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                </div>
                <div>
                  <select name ="status"  value={issue.status} onChange={(e) => onUpdateIssue(issue.id, { status: e.target.value as IssueStatus })}>
                      <option value="todo">Todo</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                  </select>
                </div>
                <div>{issue.description}</div>
                <button onClick={() => onDeleteIssue(issue.id)}>Delete</button>
            </li>
        ))}
        </ul>
      </div>
    )
  }