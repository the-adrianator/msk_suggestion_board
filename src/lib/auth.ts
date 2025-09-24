// Mock authentication system for MSK Suggestion Management Board

import { AdminUser, mockAdminCredentials } from '@/types'

// Mock admin user data
const mockAdminUser: AdminUser = {
  id: '1',
  email: 'hsmanager@company.com',
  name: 'Health & Safety Manager',
  role: 'Health & Safety Manager',
  department: 'Health & Safety',
  permissions: ['view_suggestions', 'create_suggestions', 'update_suggestions', 'delete_suggestions']
}

/**
 * Authenticates user with provided credentials
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise resolving to user data or null if authentication fails
 */
export const authenticateUser = async (email: string, password: string): Promise<AdminUser | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Check credentials against mock data
  if (email === mockAdminCredentials.email && password === mockAdminCredentials.password) {
    return mockAdminUser
  }
  
  return null
}

/**
 * Logs out the current user by clearing session storage
 */
export const logoutUser = (): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('msk-user')
  }
}

/**
 * Gets the current authenticated user from session storage
 * @returns Current user data or null if not authenticated
 */
export const getCurrentUser = (): AdminUser | null => {
  if (typeof window === 'undefined') return null
  
  const userData = sessionStorage.getItem('msk-user')
  return userData ? JSON.parse(userData) : null
}

/**
 * Saves user data to session storage
 * @param user - User data to save
 */
export const saveUserToSession = (user: AdminUser): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('msk-user', JSON.stringify(user))
  }
}

/**
 * Checks if user is currently authenticated
 * @returns True if user is authenticated, false otherwise
 */
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null
}
