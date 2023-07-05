import countries from "../mocks/countries";

export function fetchCountries() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(countries);
    }, 500);
  });
}
