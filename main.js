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

    // Clear the container before displaying new data
    flagsContainer.innerHTML = "";

    console.log("Region filter value:", regionFilter.value);
    console.log("Search filter value:", searchFilter.value);

    jsonData.forEach((country) => {
      const name = country.name;
      const population = formatNumber(country.population);
      const region = country.region;
      const capital = country.capital;
      const flag = country.flag;

      // Check filters
      const matchesSearch =
        !searchFilter.value ||
        name.toLowerCase().includes(searchFilter.value.toLowerCase());
      const matchesRegion =
        !regionFilter.value || regionFilter.value === region;

      if (matchesSearch && matchesRegion) {
        const countryDiv = document.createElement("div");
        countryDiv.classList.add("flex", "flex-col", "shadow-lg", "rounded-lg");
        countryDiv.innerHTML = `
          <img class="rounded-t-lg col-auto h-52 object-cover" src="${flag}" alt="${name}" />
          <div class="p-5 col-auto dark:bg-dark-dark-blue-elements dark:text-light-white-text-elements">
            <h1 class="font-bold">${name}</h1>
            <div >
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
      }
    });
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Add event listeners to update the displayed data when filters change
document.getElementById("search-filter").addEventListener("input", fetchData);
document.getElementById("region-filter").addEventListener("change", fetchData);

// Initial fetch of data
fetchData();
