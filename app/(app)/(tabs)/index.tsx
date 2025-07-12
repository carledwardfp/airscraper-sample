import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';

import { FlightCard } from '@/components/FlightCard';
import { Select } from '@/components/Select';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { SEARCH_VALUES } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import { fetchNearbyAirports, Flights } from '@/services/fetchers';

const HEADER_HEIGHT = 250;

type Option = { value: string; label: string };

const airports: Option[] = [
  SEARCH_VALUES.arrival,
  { label: 'Bangkok (BKK)', value: 'BKK' },
  { label: 'Hong Kong (HKG)', value: 'HKG' },
];

export default function HomeScreen() {
  const [arrival, setArrival] = useState<Option>(SEARCH_VALUES.arrival);
  const [openedReturnDate, setOpenedReturnDate] = useState<boolean>(false);
  const [returnDate, setReturnDate] = useState(
    new Date(SEARCH_VALUES.oneWeekFromNow)
  );

  const tabBarHeight = useBottomTabBarHeight();

  const handleOpenDateModal = () => setOpenedReturnDate(true);

  const { data, isLoading } = useQuery({
    queryKey: ['nearby-airports', arrival.value, formatDate(returnDate)],
    queryFn: () =>
      fetchNearbyAirports({
        arrival: arrival.value,
        returnDate: formatDate(returnDate),
      }),
    enabled: !!arrival,
  });

  const bestFlights = data?.best_flights;
  const otherFlights = data?.other_flights;

  const sections = useMemo(() => {
    let sections: (string | Flights)[] = [];

    if (bestFlights?.length) {
      sections.push('Best departing flights');
      sections.push(...bestFlights);
    }

    if (otherFlights?.length) {
      sections.push('Other departing flights');
      sections.push(...otherFlights);
    }

    return sections;
  }, [bestFlights, otherFlights]);

  const renderItem: ListRenderItem<Flights | string> = ({ item, index }) => {
    return (
      <ThemedView style={styles.item}>
        {typeof item === 'string' ? (
          <Text style={styles.title}>{item}</Text>
        ) : (
          <FlightCard data={item} />
        )}
      </ThemedView>
    );
  };

  const keyExtractor = (_: Flights | string, index: number) => index.toString();

  const getItemType = (item: Flights | string) =>
    typeof item === 'string' ? 'sectionHeader' : 'row';

  return (
    <FlashList<Flights | string>
      data={sections}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemType={getItemType}
      estimatedItemSize={202}
      bounces={false}
      contentContainerStyle={{ paddingBottom: tabBarHeight }}
      ListHeaderComponent={
        <ThemedView style={styles.headerContainer}>
          <ThemedView style={styles.header}>
            <IconSymbol
              size={310}
              color="#808080"
              name="airplane"
              style={styles.headerImage}
            />
          </ThemedView>
          <ThemedView style={styles.headerContent}>
            <ThemedView style={styles.inputs}>
              <Select
                className="flex-1"
                placeholder="Where from?"
                data={[SEARCH_VALUES.departure]}
                value={SEARCH_VALUES.departure}
              />
              <IconSymbol size={20} color="#808080" name="airplane.departure" />
              <Select
                className="flex-1"
                placeholder="Where to?"
                data={airports as any}
                value={arrival}
                onValueChange={(arrival) => setArrival(arrival as Option)}
              />
            </ThemedView>
            <ThemedView style={styles.inputs}>
              <Input
                className="flex-1"
                placeholder="Departure"
                value={SEARCH_VALUES.today}
                readOnly
              />
              <IconSymbol size={20} color="#808080" name="timer" />
              <Input
                className="flex-1"
                placeholder="Return"
                value={formatDate(returnDate)}
                readOnly
                onPress={handleOpenDateModal}
              />
            </ThemedView>
          </ThemedView>
          {isLoading && <ActivityIndicator />}
          <DatePicker
            modal
            open={openedReturnDate}
            mode="date"
            date={returnDate}
            minimumDate={new Date(SEARCH_VALUES.today)}
            onConfirm={(date: Date) => {
              setOpenedReturnDate(false);
              setReturnDate(date);
            }}
            onCancel={() => {
              setOpenedReturnDate(false);
            }}
          />
        </ThemedView>
      }
    />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  inputs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerContainer: {},
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
    backgroundColor: '#D0D0D0',
  },
  headerContent: {
    padding: 16,
    gap: 8,
  },
  item: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
