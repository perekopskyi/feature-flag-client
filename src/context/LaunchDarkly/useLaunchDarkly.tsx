import { useContext } from 'react'
import { LaunchDarklyContext } from './context'
import { LaunchDarklyContextType } from './types'

// Create a custom hook for accessing the LaunchDarkly client from child components
export const useLaunchDarkly = (): LaunchDarklyContextType =>
  useContext(LaunchDarklyContext)
