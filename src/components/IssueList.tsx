 import type { Issue } from "../types";

  interface IssueListProps {
    issues: Issue[]  // This is the prop type
    onDeleteIssue: (id: string) => void
  }

  export function IssueList({ issues, onDeleteIssue }: IssueListProps) {
    return (
      <div>
        <h2>Issues</h2>
        <ul>
        {issues.map( issue => (
            <li key={issue.id}>
                <div>{issue.title}</div>
                <div>{issue.createdAt.toLocaleDateString()}</div>
                <div>{issue.priority}</div>
                <div>{issue.status}</div>
                <div>{issue.description}</div>
                <button onClick={() => onDeleteIssue(issue.id)}>Delete</button>
            </li>
        ))}
        </ul>
      </div>
    )
  }