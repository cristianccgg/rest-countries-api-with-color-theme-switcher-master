async function fetchData() {
  const response = await fetch("/data.json");
  const jsonData = await response.json();

  const flagsContainer = document.getElementById("flags-container");
  const regionFilter = document.getElementById("region-filter");
  const searchFilter = document.getElementById("search-filter");

  flagsContainer.innerHTML = "";

  jsonData.forEach((country) => {
    const name = country.name;
    const population = formatNumber(country.population);
    const region = country.region;
    const capital = country.capital;
    const flag = country.flag;

    const countryDiv = document.createElement("div");
    countryDiv.classList.add("flex", "flex-col", "shadow-lg", "rounded-lg");
    countryDiv.innerHTML = `
        <img class="rounded-t-lg" src="${flag}" alt="${name}" />
        <div class="p-5">
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
  });
}

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

fetchData();
