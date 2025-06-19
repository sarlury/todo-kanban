export enum Status {
  Ready = 'Ready to start',
  InProgress = 'In Progress',
  Review = 'Waiting for review',
  Deploy = 'Pending Deploy',
  Done = 'Done',
  Stuck = 'Stuck'
}

export enum Priority {
  Critical = 'Critical',
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
  Effort = 'Best Effort'
}

export enum Type {
  Feature = 'Feature Enhancements',
  Bug = 'Bug',
  Other = 'Other'
}
