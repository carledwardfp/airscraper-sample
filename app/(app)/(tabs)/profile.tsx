import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Text } from '@/components/ui/text';
import { useSession } from '@/contexts/SessionContext';
import { supabase } from '@/lib/supabase';

export default function ProfileScreen() {
  const signOut = () => supabase.auth.signOut();
  const { session } = useSession();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="person"
          style={styles.headerImage}
        />
      }
    >
      <Button onPress={signOut}>
        <Text>Sign Out</Text>
      </Button>
      <ThemedView>
        <Text>{JSON.stringify(session?.user, null, 2)}</Text>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
});
