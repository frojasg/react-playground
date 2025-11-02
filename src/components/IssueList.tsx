 import type { Issue } from "../types";

  interface IssueListProps {
    issues: Issue[]  // This is the prop type
  }

  export function IssueList({ issues }: IssueListProps) {
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
            </li>
        ))}
        </ul>
      </div>
    )
  }