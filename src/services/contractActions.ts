import { Flight } from "../shared/entities";

export async function getFlights(): Promise<Flight[]> {
  const total = await getTotalFlights();
  const idxArray = Array.apply( null, { length: total } );
  const flights = await Promise.all(idxArray.map(async (_, i) => {
    const flight = await window.contracts.airline.flights(i);
    return flight;
  }));
  return flights as Flight[];
}

export async function getTotalFlights(): Promise<number> {
  const flightsLength = await window.contracts.airline.getTotalFlights();
  return flightsLength.toNumber();
}

export async function buyFlight(flightIdx: number, from: string, value: any): Promise<void> {
  await window.contracts.airline.buyFlight(flightIdx, { from, value });
}
