// Custom hook for authentication management

import { useAppStore } from '@/store/useAppStore'
import { authenticateUser, saveUserToSession, logoutUser as authLogout } from '@/lib/auth'
import { AdminUser } from '@/types'

/**
 * Hook for managing authentication state and actions
 */
export const useAuth = () => {
  const {
    currentUser,
    setCurrentUser,
    setLoading,
    setError,
    loading,
    error
  } = useAppStore()

  /**
   * Authenticates user with provided credentials
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise resolving to success status
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
    setError(null)

    try {
      const user = await authenticateUser(email, password)
      
      if (user) {
        setCurrentUser(user)
        saveUserToSession(user)
        return true
      } else {
        setError('Invalid email or password. Please try again.')
        return false
      }
    } catch {
      setError('An error occurred during login. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }

  /**
   * Logs out the current user
   */
  const logout = () => {
    setCurrentUser(null)
    authLogout()
  }

  /**
   * Checks if user is authenticated
   * @returns True if user is authenticated
   */
  const isAuthenticated = (): boolean => {
    return currentUser !== null
  }

  /**
   * Gets current user data
   * @returns Current user or null
   */
  const getUser = (): AdminUser | null => {
    return currentUser
  }

  /**
   * Checks if user has specific permission
   * @param permission - Permission to check
   * @returns True if user has permission
   */
  const hasPermission = (permission: string): boolean => {
    if (!currentUser) return false
    return currentUser.permissions.includes(permission)
  }

  /**
   * Checks if user has any of the specified permissions
   * @param permissions - Array of permissions to check
   * @returns True if user has any of the permissions
   */
  const hasAnyPermission = (permissions: string[]): boolean => {
    if (!currentUser) return false
    return permissions.some(permission => currentUser.permissions.includes(permission))
  }

  /**
   * Checks if user has all of the specified permissions
   * @param permissions - Array of permissions to check
   * @returns True if user has all permissions
   */
  const hasAllPermissions = (permissions: string[]): boolean => {
    if (!currentUser) return false
    return permissions.every(permission => currentUser.permissions.includes(permission))
  }

  return {
    // State
    currentUser,
    loading,
    error,
    
    // Actions
    login,
    logout,
    
    // Getters
    isAuthenticated,
    getUser,
    
    // Permission checks
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    
    // Setters
    setLoading,
    setError
  }
}
