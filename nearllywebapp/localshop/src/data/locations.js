let popularLocations = [
  { id: 1, name: "Kattupakkam", slug: "kattupakkam" },
  { id: 2, name: "Iyyappanthangal", slug: "iyyappanthangal" },
];
let defaultLocation = popularLocations[0];
let allLocations = ["All Locations", ...popularLocations.map((l) => l.name)];

export { popularLocations, defaultLocation, allLocations };
export default popularLocations;
