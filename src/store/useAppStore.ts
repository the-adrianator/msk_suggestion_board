// Zustand store for MSK Suggestion Management Board

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Employee, Suggestion, AdminUser, FilterState } from '@/types'
import { sampleEmployees, sampleSuggestions, sampleAdminUser } from '@/data/sampleData'

interface AppState {
  // Data
  employees: Employee[]
  suggestions: Suggestion[]
  currentUser: AdminUser | null
  
  // UI State
  filters: FilterState
  loading: boolean
  error: string | null
  
  // Actions
  setEmployees: (employees: Employee[]) => void
  setSuggestions: (suggestions: Suggestion[]) => void
  setCurrentUser: (user: AdminUser | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // Suggestion actions
  addSuggestion: (suggestion: Suggestion) => void
  updateSuggestion: (id: string, updates: Partial<Suggestion>) => void
  deleteSuggestion: (id: string) => void
  updateSuggestionStatus: (id: string, status: Suggestion['status'], notes?: string) => void
  
  // Filter actions
  setFilters: (filters: Partial<FilterState>) => void
  clearFilters: () => void
  
  // Bulk actions
  bulkUpdateStatus: (ids: string[], status: Suggestion['status'], notes?: string) => void
  
  // Initialisation
  initialiseData: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      employees: [],
      suggestions: [],
      currentUser: null,
      filters: {
        status: [],
        type: [],
        priority: [],
        employee: []
      },
      loading: false,
      error: null,

      // Basic setters
      setEmployees: (employees) => set({ employees }),
      setSuggestions: (suggestions) => set({ suggestions }),
      setCurrentUser: (currentUser) => set({ currentUser }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      // Suggestion actions
      addSuggestion: (suggestion) => set((state) => ({
        suggestions: [...state.suggestions, suggestion]
      })),

      updateSuggestion: (id, updates) => set((state) => ({
        suggestions: state.suggestions.map(suggestion =>
          suggestion.id === id
            ? { ...suggestion, ...updates, dateUpdated: new Date().toISOString() }
            : suggestion
        )
      })),

      deleteSuggestion: (id) => set((state) => ({
        suggestions: state.suggestions.filter(suggestion => suggestion.id !== id)
      })),

      updateSuggestionStatus: (id, status, notes) => set((state) => ({
        suggestions: state.suggestions.map(suggestion => {
          if (suggestion.id === id) {
            const updates: Partial<Suggestion> = {
              status,
              dateUpdated: new Date().toISOString()
            }
            
            if (status === 'completed') {
              updates.dateCompleted = new Date().toISOString()
            }
            
            if (notes) {
              updates.notes = notes
            }
            
            return { ...suggestion, ...updates }
          }
          return suggestion
        })
      })),

      // Filter actions
      setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
      })),

      clearFilters: () => set({
        filters: {
          status: [],
          type: [],
          priority: [],
          employee: []
        }
      }),

      // Bulk actions
      bulkUpdateStatus: (ids, status, notes) => set((state) => ({
        suggestions: state.suggestions.map(suggestion => {
          if (ids.includes(suggestion.id)) {
            const updates: Partial<Suggestion> = {
              status,
              dateUpdated: new Date().toISOString()
            }
            
            if (status === 'completed') {
              updates.dateCompleted = new Date().toISOString()
            }
            
            if (notes) {
              updates.notes = notes
            }
            
            return { ...suggestion, ...updates }
          }
          return suggestion
        })
      })),

      // Initialisation
      initialiseData: () => set({
        employees: sampleEmployees,
        suggestions: sampleSuggestions,
        currentUser: sampleAdminUser,
        loading: false,
        error: null
      })
    }),
    {
      name: 'msk-suggestion-store',
      partialize: (state) => ({
        employees: state.employees,
        suggestions: state.suggestions,
        currentUser: state.currentUser,
        filters: state.filters
      })
    }
  )
)
