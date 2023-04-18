import { useState, useEffect } from 'react';
import LDClient from 'launchdarkly-js-client-sdk';

export const useFeatureFlag = (flagKey: string, defaultValue?: boolean| string) => {
  const [flagValue, setFlagValue] = useState<any>(defaultValue);

  useEffect(() => {
    const ldClient = LDClient.initialize(process.env.REACT_APP_LAUNCH_DARKLY_CLIENT_ID as string, {
      "kind": "user",
      "key": "user-key-123abc",
      "name": "Sandy Smith",
      "email": "sandy@example.com"
    },
    { /* options */ });

    const updateFlag = (newFlagValue: boolean) => {
      setFlagValue(newFlagValue);
    };

    ldClient.on('change', (changes: any) => {
      if (flagKey in changes) {
        updateFlag(changes[flagKey].current);
      }
    });

    ldClient.on('ready', () => {
      const initialFlagValue = ldClient.variation(flagKey, defaultValue);
      updateFlag(initialFlagValue);
    });

    return () => {
      ldClient.close();
    };
  }, [flagKey, defaultValue]);

  return flagValue;
};
