import { useEffect, useSyncExternalStore } from "react";

import { init, type FlagKey } from "@flagbearer/react-native";

const clientKey = process.env.EXPO_PUBLIC_FLAGBEARER_CLIENT_KEY;
if (!clientKey) {
  throw new Error(
    "Set EXPO_PUBLIC_FLAGBEARER_CLIENT_KEY in .env.local. See README.md.",
  );
}

// One client for the whole app. Client keys are public, so this is safe in
// app code.
export const flags = init({ clientKey });

export function useFlag(key: FlagKey, defaultValue: boolean) {
  const enabled = useSyncExternalStore(
    flags.subscribe,
    () => flags.getSnapshot()[key] ?? defaultValue,
  );

  useEffect(() => {
    flags.isEnabled(key, defaultValue);
  }, [key, defaultValue, enabled]);

  return enabled;
}

// False until the current user's flags have loaded.
export function useFlagsLoaded() {
  return useSyncExternalStore(
    flags.subscribe,
    () => flags.getStatus() !== "loading",
  );
}
