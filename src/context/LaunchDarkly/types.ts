import { Dispatch, SetStateAction } from 'react'
import { LDClient } from 'launchdarkly-js-client-sdk'

export type FlagValue = boolean | string | number | undefined

export type Flag = {
  key: string
  value: FlagValue
}

// Define the LaunchDarkly context
export type LaunchDarklyContextType = {
  ldClient: LDClient
  flags: {}
  setFlags: Dispatch<SetStateAction<{}>>
}
