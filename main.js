const darkText = document.getElementById("dark-text");

darkText.addEventListener("click", () => {
  if (darkText.innerText === "Dark Mode") {
    darkText.innerText = "Light Mode";
  } else {
    darkText.innerText = "Dark Mode";
  }
});

function toggleDarkMode() {
  const htmlElement = document.documentElement;
  htmlElement.classList.toggle("dark");
}

async function fetchData() {
  try {
    const response = await fetch("/data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonData = await response.json();

    const flagsContainer = document.getElementById("flags-container");
    const regionFilter = document.getElementById("region-filter");
    const searchFilter = document.getElementById("search-filter");

    flagsContainer.innerHTML = "";

    const modalDiv = document.getElementById("modal");

    jsonData.forEach((country) => {
      const name = country.name;
      const population = formatNumber(country.population);
      const region = country.region;
      const capital = country.capital;
      const flag = country.flag;

      let borders = "";
      if (country.borders) {
        borders = country.borders;
      }

      let currencies = "";
      if (country.currencies) {
        currencies = Object.values(country.currencies)
          .map((currency) => currency.name)
          .join(", ");
      }

      const languages = country.languages.map((l) => l.name).join(", ");

      // Check filters
      const matchesSearch =
        !searchFilter.value ||
        name.toLowerCase().includes(searchFilter.value.toLowerCase());
      const matchesRegion =
        !regionFilter.value || regionFilter.value === region;

      if (matchesSearch && matchesRegion) {
        const countryDiv = document.createElement("div");
        countryDiv.classList.add(
          "flex",
          "flex-col",
          "shadow-lg",
          "rounded-lg",
          "cursor-pointer"
        );
        countryDiv.innerHTML = `
          <img class="rounded-t-lg col-auto h-52 object-cover" src="${flag}" alt="${name}" />
          <div class="p-5 col-auto dark:bg-dark-dark-blue-elements dark:text-light-white-text-elements">
            <h1 class="font-bold">${name}</h1>
            <div>
              <div class="flex gap-2">
                <h1>Population:</h1>
                <h2>${population}</h2>
              </div>
              <div class="flex gap-2">
                <h1>Region:</h1>
                <h2>${region}</h2>
              </div>
              <div class="flex gap-2">
                <h1>Capital:</h1>
                <h2>${capital}</h2>
              </div>
            </div>
          </div>`;

        flagsContainer.appendChild(countryDiv);

        countryDiv.addEventListener("click", () => {
          openCountryModal(country, jsonData);
        });
      }
    });
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

function openCountryModal(country, jsonData) {
  const modalDiv = document.getElementById("modal");

  const {
    name,
    flag,
    population,
    region,
    capital,
    currencies,
    languages,
    borders,
  } = country;

  const modalContent = `
    <div>
      <img class="rounded-t-lg col-auto object-contain w-full" src="${flag}" alt="${name}" />
      <div class="p-5 col-auto dark:bg-dark-dark-blue-elements dark:text-light-white-text-elements flex flex-col ">
        <h1 class="font-bold text-4xl">${name}</h1>
        <div class="flex gap-2 mt-5">
          <h1 class="font-bold">Population:</h1>
          <h2>${formatNumber(population)}</h2>
        </div>
        <div class="flex gap-2">
          <h1 class="font-bold">Region:</h1>
          <h2>${region}</h2>
        </div>
        <div class="flex gap-2">
          <h1 class="font-bold">Capital:</h1>
          <h2>${capital}</h2>
        </div>
        <div class="flex gap-2">
          <h1 class="font-bold">Currencies:</h1>
          <h2>${currencies.map((currency) => currency.name).join(", ")}</h2>
        </div>
        <div class="flex gap-2">
          <h1 class="font-bold">Languages:</h1>
          <h2>${languages.map((language) => language.name).join(", ")}</h2>
        </div>
        <div class="flex flex-col flex-wrap gap-2 mt-2" id="border-buttons">
          <h1 class="font-bold">Border Countries:</h1>
          <div class="flex flex-wrap gap-3 md:w-[55em]">
            ${
              borders && borders.length > 0
                ? borders
                    .map(
                      (border) =>
                        `<button class="border border-gray-300 rounded-lg px-4 py-2">${border}</button>`
                    )
                    .join("")
                : "<p>No border countries found.</p>"
            }
          </div>
        </div>
        <button id="go-back" class="font-bold dark:bg-light-white-text-elements dark:text-dark-very-dark-blue-text mt-5 shadow-xl rounded-lg align-middle p-2 bg-dark-dark-blue-elements text-light-very-light-gray-background">Go Back</button>
      </div>
    </div>`;

  modalDiv.innerHTML = modalContent;
  modalDiv.showModal();

  // Agregar event listener al botón "Go Back"
  document.getElementById("go-back").addEventListener("click", () => {
    modalDiv.close();
  });

  // Agregar event listeners a los botones de frontera
  const borderButtons = modalDiv.querySelectorAll("#border-buttons button");
  borderButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const borderCountryCode = button.innerText;
      const borderCountry = jsonData.find(
        (country) => country.alpha3Code === borderCountryCode
      );
      if (borderCountry) {
        openCountryModal(borderCountry, jsonData);
      }
    });
  });
}

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Event listeners para los filtros
document.getElementById("search-filter").addEventListener("input", fetchData);
document.getElementById("region-filter").addEventListener("change", fetchData);

// Inicializar la carga inicial de datos
fetchData();
