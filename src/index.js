import { fetchCountries } from "./services/countries";
import "./styles.css";
import debounce from "./utils/debounce";

const getFilteredCountries = (value) => {
  let trimmedValue = value.trim().toLowerCase();
  if (trimmedValue) {
    fetchCountries().then((countries) => {
      let filteredCountries = countries.filter((country) => {
        return country.toLowerCase().includes(trimmedValue);
      });
      const output = `<ul class="result-list">${filteredCountries
        .map((country) => {
          return `<li>${country}</li>`;
        })
        .join("")}</ul>`;
      document.getElementById("results").innerHTML = output;
    });
  } else {
    document.getElementById("results").innerHTML = "";
  }
};

const debouncedGetCountries = debounce(getFilteredCountries, 200);
document
  .getElementById("searchCountries")
  .addEventListener("input", function (event) {
    debouncedGetCountries(event.target.value);
  });

const listElement = document.getElementById("results");

document
  .getElementById("searchCountries")
  .addEventListener("focus", function () {
    listElement.classList.add("show");
  });

document.body.addEventListener("click", function () {
  listElement.classList.remove("show");
});

document
  .getElementById("searchContainer")
  .addEventListener("click", function (e) {
    e.stopPropagation();
  });
