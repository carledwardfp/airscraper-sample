import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { Flights } from '@/services/fetchers';
import { ThemedView } from './ThemedView';
import { Text } from './ui/text';

const formatTime = (datetime: string) => datetime.slice(-5);

interface FlightCardProps {
  data: Flights;
}

export function FlightCard({ data }: FlightCardProps) {
  const flight = data.flights[0];
  const {
    departure_airport,
    arrival_airport,
    airline,
    airline_logo,
    duration,
  } = flight;

  const emissionsDiff = data.carbon_emissions.difference_percent;
  const emissionText =
    emissionsDiff < 0
      ? `${emissionsDiff}% emissions`
      : emissionsDiff > 0
      ? `+${emissionsDiff}% emissions`
      : 'Avg emissions';

  const isEcoFriendly = emissionsDiff < 0;

  return (
    <ThemedView
      style={styles.container}
      lightColor="#ffffff"
      darkColor="#1a1a1a"
    >
      <ThemedView style={styles.card}>
        <ThemedView style={styles.row}>
          <Text style={styles.time}>{formatTime(departure_airport.time)}</Text>
          <Text style={styles.arrow}>→</Text>
          <Text style={styles.time}>{formatTime(arrival_airport.time)}</Text>
        </ThemedView>

        <Text style={styles.airportCode}>
          {departure_airport.id} → {arrival_airport.id}
        </Text>

        <Text style={styles.duration}>
          Non-stop · {formatMinutes(duration)}
        </Text>

        <ThemedView style={styles.airlineRow}>
          <Image
            source={{ uri: airline_logo }}
            style={styles.logo}
            contentFit="contain"
          />
          <Text style={styles.airline}>{airline}</Text>
          <Text style={[styles.emissions, isEcoFriendly && styles.greenTag]}>
            {emissionText}
          </Text>
        </ThemedView>

        <Text style={styles.price}>
          {data.price ? (
            <Text style={styles.priceColor}>
              ${data.price.toLocaleString()} <Text>round trip</Text>
            </Text>
          ) : (
            'No price'
          )}
        </Text>
      </ThemedView>
      {isEcoFriendly && (
        <ThemedView
          style={styles.ecoBox}
          darkColor="#1e372b"
          lightColor="#e0f4e8"
        >
          <Text style={styles.ecoText}>
            Avoids as much CO₂e as {formatTreesAbsorbed(emissionsDiff)} trees
            absorb in a day
          </Text>
        </ThemedView>
      )}
    </ThemedView>
  );
}

// Helpers
const formatMinutes = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h} hrs ${m} min`;
};

const formatTreesAbsorbed = (diff: number) => {
  // Rough estimate: 1% = ~121.75 trees (based on 20% → 2,435 trees)
  return Math.abs(Math.round(diff * 121.75));
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  card: {
    padding: 16,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  arrow: {
    color: '#999',
    marginHorizontal: 6,
  },
  airportCode: {
    color: '#555',
    marginTop: 2,
    fontWeight: '400',
  },
  duration: {
    color: '#666',
    marginTop: 4,
    fontSize: 12,
  },
  airlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  airline: {
    color: '#222',
    fontWeight: '500',
    fontSize: 14,
    marginRight: 8,
  },
  emissions: {
    fontSize: 12,
    color: '#555',
    backgroundColor: '#eee',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  greenTag: {
    color: '#0a8f39',
    backgroundColor: '#e3f5ea',
  },
  redTag: {
    color: '#b33131',
    backgroundColor: '#fdecec',
  },
  ecoBox: {
    padding: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    margin: -1,
    borderColor: '#c4e4ce',
    borderWidth: 1,
  },
  ecoText: {
    color: '#2b7a4b',
    fontSize: 13,
    lineHeight: 18,
  },
  ecoTextBold: {
    fontWeight: '700',
    color: '#2b7a4b',
  },
  price: {
    marginTop: 12,
    fontWeight: 'bold',
  },
  priceColor: {
    fontWeight: 'bold',
    color: '#137c30',
    fontSize: 18,
  },
});
