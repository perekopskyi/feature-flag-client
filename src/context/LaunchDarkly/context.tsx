import { createContext, useEffect, useMemo, useState } from 'react'
import LaunchDarkly from 'launchdarkly-js-client-sdk'
import { LaunchDarklyContextType } from './types'

const LAUNCH_DARKLY_CLIENT_ID = process.env
  .REACT_APP_LAUNCH_DARKLY_CLIENT_ID as string

// Create a new context object
export const LaunchDarklyContext = createContext<LaunchDarklyContextType>({
  ldClient: LaunchDarkly.initialize(LAUNCH_DARKLY_CLIENT_ID, {
    kind: 'user',
    anonymous: true,
  }),
  flags: {},
  setFlags: () => {},
})

// Create a provider component that initializes the LaunchDarkly client and provides it to child components
export const LaunchDarklyProvider = ({ children, user }) => {
  const [flags, setFlags] = useState({})

  const client = useMemo(
    () =>
      LaunchDarkly.initialize(LAUNCH_DARKLY_CLIENT_ID, {
        'kind': 'user',
        'key': user.uuid,
        'name': user.name,
      }),
    [user]
  )

  useEffect(() => {
    ;(async () => {
      await client.waitForInitialization()
      const flags = client.allFlags()
      setFlags(flags)
    })()

    // Clean up the client on unmount
    return () => {
      client.close()
    }
  }, [])

  return (
    <LaunchDarklyContext.Provider value={{ ldClient: client, flags, setFlags }}>
      {children}
    </LaunchDarklyContext.Provider>
  )
}
