// TypeScript interfaces for MSK Suggestion Management Board
// Following British spelling conventions throughout

export interface Employee {
  id: string;
  name: string;
  department: string;
  riskLevel: 'low' | 'medium' | 'high';
  jobTitle: string;
  workstation: string;
  lastAssessment: string; // ISO date string
}

export interface Suggestion {
  id: string;
  employeeId: string;
  type: 'exercise' | 'equipment' | 'behavioural' | 'lifestyle';
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'dismissed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  source: 'vida' | 'admin';
  createdBy?: string; // For admin-created suggestions
  dateCreated: string; // ISO date string
  dateUpdated: string; // ISO date string
  dateCompleted?: string; // ISO date string
  notes: string;
  estimatedCost: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  department: string;
  permissions: string[];
}

export interface AppState {
  employees: Employee[];
  suggestions: Suggestion[];
  currentUser: AdminUser | null;
  filters: {
    status: string[];
    type: string[];
    priority: string[];
    employee: string[];
  };
  theme: 'light' | 'dark' | 'system';
  loading: boolean;
  error: string | null;
}

export interface FilterState {
  status: string[];
  type: string[];
  priority: string[];
  employee: string[];
}

// Mock authentication credentials as specified in PRD
export const mockAdminCredentials = {
  email: 'hsmanager@company.com',
  password: 'admin123'
};
