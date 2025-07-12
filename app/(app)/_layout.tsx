import { Stack } from 'expo-router';

import { useSession } from '@/contexts/SessionContext';

export default function AppLayout() {
  const { session } = useSession();

  return (
    <Stack>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="auth" options={{ title: 'Authentication' }} />
      </Stack.Protected>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
}
