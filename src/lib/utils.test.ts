import { filterSuggestions } from './utils'
import { searchSuggestions } from './utils'
import { sortSuggestions } from './utils'
import { getSuggestionStats } from './utils'
import { Employee, Suggestion } from '@/types'

const employees: Employee[] = [
  { id: 'e1', name: 'Alice Smith', department: 'HR', riskLevel: 'low', jobTitle: 'Coordinator', workstation: 'Office', lastAssessment: '2024-10-01T00:00:00.000Z' },
  { id: 'e2', name: 'Bob Jones', department: 'Ops', riskLevel: 'high', jobTitle: 'Operator', workstation: 'Warehouse', lastAssessment: '2024-09-15T00:00:00.000Z' },
]

const base: Omit<Suggestion, 'id'> = {
  employeeId: 'e1',
  type: 'exercise',
  description: 'Daily stretching routine',
  status: 'pending',
  priority: 'medium',
  source: 'admin',
  dateCreated: '2024-10-10T10:00:00.000Z',
  dateUpdated: '2024-10-10T10:00:00.000Z',
  notes: '',
  estimatedCost: '£0',
}

const suggestions: Suggestion[] = [
  { id: 's1', ...base },
  { id: 's2', ...base, employeeId: 'e2', type: 'equipment', description: 'New ergonomic chair', priority: 'high', status: 'in_progress', estimatedCost: '£250', dateUpdated: '2024-10-12T10:00:00.000Z' },
  { id: 's3', ...base, type: 'behavioural', description: 'Micro-break reminders', status: 'completed', dateUpdated: '2024-10-11T10:00:00.000Z' },
]

describe('utils', () => {
  test('filterSuggestions by status and type', () => {
    const filtered = filterSuggestions(suggestions, { status: ['pending'], type: [], priority: [], employee: [] }, employees)
    expect(filtered.map(s => s.id)).toEqual(['s1'])

    const filteredType = filterSuggestions(suggestions, { status: [], type: ['equipment'], priority: [], employee: [] }, employees)
    expect(filteredType.map(s => s.id)).toEqual(['s2'])
  })

  test('searchSuggestions finds by employee name and description', () => {
    const byName = searchSuggestions(suggestions, 'Alice', employees)
    expect(byName.some(s => s.employeeId === 'e1')).toBe(true)

    const byDesc = searchSuggestions(suggestions, 'chair', employees)
    expect(byDesc.map(s => s.id)).toEqual(['s2'])
  })

  test('sortSuggestions sorts by dateUpdated desc then asc', () => {
    const desc = sortSuggestions(suggestions, 'dateUpdated', 'desc')
    expect(desc.map(s => s.id)).toEqual(['s2', 's3', 's1'])

    const asc = sortSuggestions(suggestions, 'dateUpdated', 'asc')
    expect(asc.map(s => s.id)).toEqual(['s1', 's3', 's2'])
  })

  test('getSuggestionStats returns counts', () => {
    const stats = getSuggestionStats(suggestions)
    expect(stats.total).toBe(3)
    expect(stats.pending).toBe(1)
    expect(stats.inProgress).toBe(1)
    expect(stats.completed).toBe(1)
  })
})
