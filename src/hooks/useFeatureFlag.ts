import { useState, useEffect } from 'react'
import { useLaunchDarkly } from '../context/LaunchDarkly/useLaunchDarkly'
import { FlagValue } from '../context/LaunchDarkly/types'

export const useFeatureFlag = (flagKey: string, defaultValue?: FlagValue) => {
  const [flagValue, setFlagValue] = useState<FlagValue>(defaultValue)
  const { ldClient, flags, setFlags } = useLaunchDarkly()

  useEffect(() => {
    const updateFlag = (newFlagValue: FlagValue) => setFlagValue(newFlagValue)

    if (flagKey in flags) {
      updateFlag(flags[flagKey])
    }

    ldClient.on('change', changes => {
      if (flagKey in changes) {
        // update current flag
        updateFlag(changes[flagKey].current)
        // Update slags in store
        setFlags({ ...flags, [flagKey]: changes[flagKey].current })
      }
    })

    ldClient.on('ready', () => {
      const initialFlagValue = ldClient.variation(flagKey, defaultValue)
      updateFlag(initialFlagValue)
    })

    return () => {
      ldClient.off('change', updateFlag)
    }
  }, [flagKey, defaultValue, ldClient, flags, setFlags])

  return flagValue
}
