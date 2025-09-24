// Custom hooks for suggestion management

import { useAppStore } from '@/store/useAppStore'
import { filterSuggestions, searchSuggestions, sortSuggestions, getSuggestionStats } from '@/lib/utils'
import { Suggestion } from '@/types'

/**
 * Hook for managing suggestions with filtering, searching, and sorting
 */
export const useSuggestions = () => {
  const {
    suggestions,
    employees,
    filters,
    loading,
    error,
    setLoading,
    setError,
    addSuggestion,
    updateSuggestion,
    deleteSuggestion,
    updateSuggestionStatus,
    bulkUpdateStatus,
    setFilters,
    clearFilters
  } = useAppStore()

  /**
   * Gets filtered and searched suggestions
   * @param searchTerm - Optional search term
   * @param sortBy - Sort criteria
   * @param sortOrder - Sort order
   * @returns Processed suggestions array
   */
  const getProcessedSuggestions = (
    searchTerm?: string,
    sortBy: 'dateCreated' | 'dateUpdated' | 'priority' | 'status' | 'type' = 'dateUpdated',
    sortOrder: 'asc' | 'desc' = 'desc'
  ): Suggestion[] => {
    let processed = suggestions

    // Apply filters
    processed = filterSuggestions(processed, filters, employees)

    // Apply search
    if (searchTerm) {
      processed = searchSuggestions(processed, searchTerm, employees)
    }

    // Apply sorting
    processed = sortSuggestions(processed, sortBy, sortOrder)

    return processed
  }

  /**
   * Gets suggestion statistics
   */
  const stats = getSuggestionStats(suggestions)

  /**
   * Gets filtered suggestion statistics
   */
  const filteredStats = getSuggestionStats(
    filterSuggestions(suggestions, filters, employees)
  )

  /**
   * Creates a new suggestion
   * @param suggestionData - Suggestion data
   */
  const createSuggestion = async (suggestionData: Omit<Suggestion, 'id' | 'dateCreated' | 'dateUpdated'>) => {
    setLoading(true)
    setError(null)

    try {
      const newSuggestion: Suggestion = {
        ...suggestionData,
        id: `sug-${Date.now()}`,
        dateCreated: new Date().toISOString(),
        dateUpdated: new Date().toISOString()
      }

      addSuggestion(newSuggestion)
    } catch (err) {
      setError('Failed to create suggestion. Please try again.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * Updates a suggestion
   * @param id - Suggestion ID
   * @param updates - Updates to apply
   */
  const editSuggestion = async (id: string, updates: Partial<Suggestion>) => {
    setLoading(true)
    setError(null)

    try {
      updateSuggestion(id, updates)
    } catch (err) {
      setError('Failed to update suggestion. Please try again.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * Updates suggestion status
   * @param id - Suggestion ID
   * @param status - New status
   * @param notes - Optional notes
   */
  const changeStatus = async (id: string, status: Suggestion['status'], notes?: string) => {
    setLoading(true)
    setError(null)

    try {
      updateSuggestionStatus(id, status, notes)
    } catch (err) {
      setError('Failed to update suggestion status. Please try again.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * Bulk updates suggestion statuses
   * @param ids - Array of suggestion IDs
   * @param status - New status
   * @param notes - Optional notes
   */
  const bulkChangeStatus = async (ids: string[], status: Suggestion['status'], notes?: string) => {
    setLoading(true)
    setError(null)

    try {
      bulkUpdateStatus(ids, status, notes)
    } catch (err) {
      setError('Failed to update suggestions. Please try again.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * Removes a suggestion
   * @param id - Suggestion ID
   */
  const removeSuggestion = async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      deleteSuggestion(id)
    } catch (err) {
      setError('Failed to delete suggestion. Please try again.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * Updates filters
   * @param newFilters - New filter values
   */
  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(newFilters)
  }

  /**
   * Resets all filters
   */
  const resetFilters = () => {
    clearFilters()
  }

  return {
    // Data
    suggestions,
    employees,
    filters,
    loading,
    error,
    
    // Computed
    stats,
    filteredStats,
    
    // Actions
    getProcessedSuggestions,
    createSuggestion,
    editSuggestion,
    changeStatus,
    bulkChangeStatus,
    removeSuggestion,
    updateFilters,
    resetFilters,
    
    // Setters
    setLoading,
    setError
  }
}
