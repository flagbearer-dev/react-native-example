# Feature flags in React Native with Flagbearer

A small Expo app with one feature flag from
[Flagbearer](https://flagbearer.dev). The cart screen shows the current
checkout until you turn on the `new-checkout` flag. Then it switches to a
one-step checkout, with no new build and no restart.

## Run it

1. [Sign up for Flagbearer](https://flagbearer.dev). The free plan covers this
   example.
2. Create an application, then a flag with the key `new-checkout`.
3. Copy the client key for your development environment. It starts with `fbc_`.
4. Add the key and start the app:

   ```sh
   cp .env.example .env.local   # then paste your client key into .env.local
   npm install
   npm run ios                  # or: npm run android
   ```

   This opens the app in Expo Go on a simulator. To use your phone, run
   `npm start` and scan the QR code.

5. You'll see the three-step checkout.
6. Turn `new-checkout` on for everyone in the Flagbearer dashboard. The screen
   switches to the one-step checkout.

## How it works

- [`flags.ts`](flags.ts) creates one Flagbearer client for the whole app and
  has two small hooks: `useFlag` reads a flag, and `useFlagsLoaded` says
  whether the user's flags have arrived.
- [`checkout.tsx`](checkout.tsx) checks the flag once, where the old and new
  checkout part ways:

  ```tsx
  const loaded = useFlagsLoaded();
  const newCheckout = useFlag("new-checkout", false);

  if (!loaded) return <Text>Loading checkout…</Text>;
  return newCheckout ? <OneStepCheckout /> : <ClassicCheckout />;
  ```

  The default is `false`, so the app keeps today's checkout if the flag doesn't
  exist or can't load.

## Let your coding agent do it

Flagbearer has an [MCP server](https://docs.flagbearer.dev/sdks/mcp), so an
agent like Claude Code can create the flag, turn it on and write the check:

```sh
claude mcp add --transport http flagbearer https://mcp.flagbearer.dev
```

Then ask it to "put the new checkout behind a flag".

## Next steps

- [React Native guide](https://docs.flagbearer.dev/sdks/react-native):
  signed-in users and keeping flags between launches.
- [Writing flag code](https://docs.flagbearer.dev/sdks/flag-code): rules for
  flags that are safe to ship and quick to remove.

## License

MIT
