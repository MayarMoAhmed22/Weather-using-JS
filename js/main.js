async function searchCountry() {
  let input = document
    .getElementById("searchCountry")
    .value.trim()
    .toLowerCase();
  let result = document.getElementById("input-search");

  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=2e6c751ca183486c91093254252706&q=${input}&days=3`
    );
    const data = await res.json();

    if (data.error) {
      result.innerHTML = `<p style="color:red">${data.error.message}</p>`;
      return;
    }

    const location = data.location;
    const current = data.current;
    const forecast = data.forecast.forecastday;

    // Create day labels dynamically
    const dayLabels = forecast.map((dayObj) => {
      const dateObj = new Date(dayObj.date);
      return {
        weekday: dateObj.toLocaleDateString("en-US", { weekday: "long" }),
        fullDate: dateObj.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        }),
      };
    });

    result.innerHTML = `
      <table class="w-100 mt-4">
        <thead>
          <tr>
            <th class="d-flex justify-content-between th-1 ">
              <div>${dayLabels[0].weekday}</div>
              <div style="font-weight: normal">${dayLabels[0].fullDate}</div>
            </th>
            <th class="th-2 ">${dayLabels[1]?.weekday ?? ""}</th>
            <th class="th-3 col-12">${dayLabels[2]?.weekday ?? ""}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <!-- Day 1 (current) -->
            <td class="pos">
              <div class="custom1">${location.name}</div>
              <div class="d-flex">
                <div class="h1 heading-coun">${current.temp_c}°C</div>
                <img src="https:${current.condition.icon}" alt="" width="90" />
              </div>
              <p class="custom">${current.condition.text}</p>
              <footer class="blockquote-footer d-flex align-items-end">
                <div class="d-flex align-items-center justify-content-center px-2">
                  <i class="fa-solid fa-umbrella fa-xl p-2"></i>
                  <span>${current.precip_mm} mm</span>
                </div>
                <div class="d-flex align-items-center justify-content-center px-2">
                  <i class="fa-solid fa-wind fa-xl p-2"></i>
                  <span>${current.wind_kph} km/h</span>
                </div>
                <div class="d-flex align-items-center justify-content-center px-2">
                  <i class="fa-solid fa-compass fa-xl p-2"></i>
                  <span>${current.wind_dir}</span>
                </div>
              </footer>
            </td>

            <!-- Day 2 Forecast -->
            <td class="back2">
              <img src="https:${
                forecast[1]?.day.condition.icon ?? ""
              }" alt="" width="90" />
              <div class="h3 heading-coun2">${
                forecast[1]?.day.avgtemp_c ?? "--"
              }°C</div>
              <span class="cel-deg">${
                forecast[1]?.day.mintemp_c ?? "--"
              }°</span>
              <p class="custom3">${forecast[1]?.day.condition.text ?? "N/A"}</p>
            </td>

            <!-- Day 3 Forecast -->
            <td>
              <img src="https:${
                forecast[2]?.day.condition.icon ?? ""
              }" alt="" width="90" />
              <div class="h3 heading-coun2">${
                forecast[2]?.day.avgtemp_c ?? "--"
              }°C</div>
              <span class="cel-deg">${
                forecast[2]?.day.mintemp_c ?? "--"
              }°</span>
              <p class="custom3">${forecast[2]?.day.condition.text ?? "N/A"}</p>
            </td>
          </tr>
        </tbody>
      </table>`;
  } catch (error) {
    console.log("Fetch error:", error);
    result.innerHTML = `<p style="color:red">Something went wrong. Please try again.</p>`;
  }
}

document.getElementById("addCountry").addEventListener("click", function (event) {
  event.preventDefault(); 
  searchCountry();      
});
