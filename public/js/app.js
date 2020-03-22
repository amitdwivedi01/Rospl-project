const list_item = document.getElementById("list-item");
const cases = document.getElementById("cases");
const singleCountry = document.getElementById("singleCountry");
const search = document.getElementById("search");

const country = event => {
  let x = event.keyCode;
  if (x == 13) {
    event.preventDefault();
    enterCode();
  }
};

fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php", {
  method: "GET",
  headers: {
    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
    "x-rapidapi-key": "678afc3fabmshc0937d1b8c0b77cp17e8c7jsn2e631e9b2e7c"
  }
})
  .then(res => res.json())
  .then(data => {
    console.log(data);
    data.affected_countries.forEach(item => {
      list_item.innerHTML += `
            <li class="list-group-item col-md-3 my-2">${item}</li>
            `;
    });
  })
  .catch(err => {
    console.log(err);
  });

fetch(
  "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
  {
    method: "GET",
    headers: {
      "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
      "x-rapidapi-key": "678afc3fabmshc0937d1b8c0b77cp17e8c7jsn2e631e9b2e7c"
    }
  }
)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    data.countries_stat.forEach(item => {
      cases.innerHTML += `
        <div class="col-md-6 col-lg-6 col-xl-4">
            <div class="card mt-3" style="width: 22rem;">
                <div class="card-body">
                    <h5 class="card-title text-center">${item.country_name}</h5>
                    <p class="card-text">cases: ${item.cases}</p>
                    <p class="card-text text-danger">deaths: ${item.deaths}</p>
                    <p class="card-text text-success">total recovered: ${item.total_recovered}</p>
                    <p class="card-text text-danger">new deaths: ${item.new_deaths}</p>
                    <p class="card-text">new cases: ${item.new_cases}</p>
                    <p class="card-text text-danger">serious critical: ${item.serious_critical}</p>
                    <p class="card-text">active cases: ${item.active_cases}</p>
                </div>
            </div>
        </div>
        `;
    });
  })
  .catch(err => {
    console.log(err);
  });

const enterCode = () => {
  fetch(
    `https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=${search.value}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "678afc3fabmshc0937d1b8c0b77cp17e8c7jsn2e631e9b2e7c"
      }
    }
  )
    .then(res => res.json())
    .then(data => {
      console.log(data);
      data.latest_stat_by_country.forEach(item => {
        singleCountry.innerHTML += `
                    <div class="card mt-5" style="width: 22rem;">
                        <div class="card-body text-left">
                            <h5 class="card-title text-center">${item.country_name}</h5>
                            <p class="card-text">cases: ${item.total_cases}</p>
                            <p class="card-text text-danger">deaths: ${item.total_deaths}</p>
                            <p class="card-text text-success">total recovered: ${item.total_recovered}</p>
                            <p class="card-text text-danger">recent deaths: ${item.new_deaths}</p>
                            <p class="card-text">recent cases: ${item.new_cases}</p>
                            <p class="card-text text-danger">serious critical: ${item.serious_critical}</p>
                            <p class="card-text">active cases: ${item.active_cases}</p>
                        </div>
                    </div>
                `;
      });
    })
    .catch(err => {
      console.log(err);
    });
};
