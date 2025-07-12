import { api } from '@/lib/api';
import { SEARCH_VALUES } from '@/lib/constants';

export type Airport = {
  airport: {
    id: string;
    name: string;
  };
  city: string;
  country: string;
  country_code: string;
  image: string;
  thumbnail: string;
};

export type Airports = {
  departure: Airport[];
  arrival: Airport[];
};

export type Flight = {
  departure_airport: {
    name: string;
    id: string;
    time: string;
  };
  arrival_airport: {
    name: string;
    id: string;
    time: string;
  };
  duration: number;
  airplane: string;
  airline: string;
  airline_logo: string;
  travel_class: string;
  flight_number: string;
  extensions: any[];
  ticket_also_sold_by: any[];
  legroom: string;
  overnight: boolean;
  often_delayed_by_over_30_min: boolean;
  plane_and_crew_by: string;
};

export type Layover = {
  duration: number;
  name: string;
  id: string;
  overnight: boolean;
};

export type Flights = {
  flights: Flight[];
  layovers: Layover[];
  total_duration: number;
  carbon_emissions: {
    this_flight: number;
    typical_for_this_route: number;
    difference_percent: number;
  };
  price: number;
  type: string;
  airline_logo: string;
  extensions: any[];
  departure_token: string;
  booking_token: string;
};

export type Data = {
  airports: Airports[];
  best_flights: Flights[];
  other_flights: Flights[];
};

export const fetchNearbyAirports = async ({
  arrival,
  returnDate,
}: {
  arrival: string;
  returnDate: string;
}): Promise<Data> => {
  const query = new URLSearchParams();
  query.append('engine', 'google_flights');
  query.append('api_key', process.env.EXPO_PUBLIC_API_KEY || '');
  query.append('departure_id', SEARCH_VALUES.departure.value);
  query.append('arrival_id', arrival || SEARCH_VALUES.arrival.value);
  query.append('outbound_date', SEARCH_VALUES.today);
  query.append('return_date', returnDate || SEARCH_VALUES.oneWeekFromNow);

  return api
    .get(`/search?${query.toString()}`)
    .then((response) => response.data);
};
