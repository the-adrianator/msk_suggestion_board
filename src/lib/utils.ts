// Utility functions for MSK Suggestion Management Board

import { Suggestion, Employee, FilterState } from '@/types'

/**
 * Filters suggestions based on provided criteria
 * @param suggestions - Array of suggestions to filter
 * @param filters - Filter criteria
 * @param employees - Array of employees for name matching
 * @returns Filtered array of suggestions
 */
export const filterSuggestions = (
  suggestions: Suggestion[],
  filters: FilterState,
  employees: Employee[]
): Suggestion[] => {
  return suggestions.filter(suggestion => {
    // Filter by status
    if (filters.status.length > 0 && !filters.status.includes(suggestion.status)) {
      return false
    }

    // Filter by type
    if (filters.type.length > 0 && !filters.type.includes(suggestion.type)) {
      return false
    }

    // Filter by priority
    if (filters.priority.length > 0 && !filters.priority.includes(suggestion.priority)) {
      return false
    }

    // Filter by employee
    if (filters.employee.length > 0) {
      const employee = employees.find(emp => emp.id === suggestion.employeeId)
      if (!employee || !filters.employee.includes(employee.id)) {
        return false
      }
    }

    return true
  })
}

/**
 * Searches suggestions by description and employee name
 * @param suggestions - Array of suggestions to search
 * @param searchTerm - Search term
 * @param employees - Array of employees for name matching
 * @returns Filtered array of suggestions
 */
export const searchSuggestions = (
  suggestions: Suggestion[],
  searchTerm: string,
  employees: Employee[]
): Suggestion[] => {
  if (!searchTerm.trim()) {
    return suggestions
  }

  const term = searchTerm.toLowerCase()
  
  return suggestions.filter(suggestion => {
    // Search in description
    if (suggestion.description.toLowerCase().includes(term)) {
      return true
    }

    // Search in notes
    if (suggestion.notes.toLowerCase().includes(term)) {
      return true
    }

    // Search in employee name
    const employee = employees.find(emp => emp.id === suggestion.employeeId)
    if (employee && employee.name.toLowerCase().includes(term)) {
      return true
    }

    return false
  })
}

/**
 * Calculates completion rate for suggestions
 * @param suggestions - Array of suggestions
 * @returns Percentage completion rate (0-100)
 */
export const calculateCompletionRate = (suggestions: Suggestion[]): number => {
  if (suggestions.length === 0) return 0
  
  const completedCount = suggestions.filter(s => s.status === 'completed').length
  return Math.round((completedCount / suggestions.length) * 100)
}

/**
 * Gets suggestion statistics
 * @param suggestions - Array of suggestions
 * @returns Object with various statistics
 */
export const getSuggestionStats = (suggestions: Suggestion[]) => {
  const stats = {
    total: suggestions.length,
    pending: suggestions.filter(s => s.status === 'pending').length,
    inProgress: suggestions.filter(s => s.status === 'in_progress').length,
    completed: suggestions.filter(s => s.status === 'completed').length,
    dismissed: suggestions.filter(s => s.status === 'dismissed').length,
    overdue: suggestions.filter(s => s.status === 'overdue').length,
    completionRate: calculateCompletionRate(suggestions)
  }

  return stats
}

/**
 * Sorts suggestions by various criteria
 * @param suggestions - Array of suggestions to sort
 * @param sortBy - Sort criteria
 * @param sortOrder - Sort order (asc/desc)
 * @returns Sorted array of suggestions
 */
export const sortSuggestions = (
  suggestions: Suggestion[],
  sortBy: 'dateCreated' | 'dateUpdated' | 'priority' | 'status' | 'type',
  sortOrder: 'asc' | 'desc' = 'desc'
): Suggestion[] => {
  return [...suggestions].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case 'dateCreated':
      case 'dateUpdated':
        comparison = new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime()
        break
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority]
        break
      case 'status':
        const statusOrder = { pending: 1, in_progress: 2, completed: 3, dismissed: 4, overdue: 5 }
        comparison = statusOrder[a.status] - statusOrder[b.status]
        break
      case 'type':
        comparison = a.type.localeCompare(b.type)
        break
    }

    return sortOrder === 'desc' ? -comparison : comparison
  })
}

/**
 * Formats date for display
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Gets status colour for styling
 * @param status - Suggestion status
 * @returns TailwindCSS colour class
 */
export const getStatusColour = (status: Suggestion['status']): string => {
  const colours = {
    pending: 'text-gray-500 bg-gray-100 dark:bg-gray-800',
    in_progress: 'text-blue-500 bg-blue-100 dark:bg-blue-900',
    completed: 'text-green-500 bg-green-100 dark:bg-green-900',
    dismissed: 'text-red-500 bg-red-100 dark:bg-red-900',
    overdue: 'text-amber-500 bg-amber-100 dark:bg-amber-900'
  }
  
  return colours[status]
}

/**
 * Gets priority colour for styling
 * @param priority - Suggestion priority
 * @returns TailwindCSS colour class
 */
export const getPriorityColour = (priority: Suggestion['priority']): string => {
  const colours = {
    low: 'text-green-500 bg-green-100 dark:bg-green-900',
    medium: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900',
    high: 'text-red-500 bg-red-100 dark:bg-red-900'
  }
  
  return colours[priority]
}

/**
 * Gets type colour for styling
 * @param type - Suggestion type
 * @returns TailwindCSS colour class
 */
export const getTypeColour = (type: Suggestion['type']): string => {
  const colours = {
    exercise: 'text-purple-500 bg-purple-100 dark:bg-purple-900',
    equipment: 'text-blue-500 bg-blue-100 dark:bg-blue-900',
    behavioural: 'text-orange-500 bg-orange-100 dark:bg-orange-900',
    lifestyle: 'text-green-500 bg-green-100 dark:bg-green-900'
  }
  
  return colours[type]
}
