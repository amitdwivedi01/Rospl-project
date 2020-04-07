const list_item = document.getElementById("list-item");
const cases = document.getElementById("cases");
const cases_global = document.getElementById("cases-global");
const singleCountry = document.getElementById("singleCountry");
const search = document.getElementById("search");
const india = document.getElementById("india");
const last_updated_time = document.getElementById("time");
const tbody = document.getElementById("tbody");
fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php", {
  method: "GET",
  headers: {
    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
    "x-rapidapi-key": "678afc3fabmshc0937d1b8c0b77cp17e8c7jsn2e631e9b2e7c",
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.affected_countries.forEach((item) => {
      list_item.innerHTML += `
            <li class="list-group-item col-md-3 my-2">${item}</li>
            `;
    });
  })
  .catch((err) => {
    console.log(err);
  });

fetch(
  "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
  {
    method: "GET",
    headers: {
      "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
      "x-rapidapi-key": "678afc3fabmshc0937d1b8c0b77cp17e8c7jsn2e631e9b2e7c",
    },
  }
)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    data.countries_stat.forEach((item) => {
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
  .catch((err) => {
    console.log(err);
  });

fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
  method: "GET",
  headers: {
    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
    "x-rapidapi-key": "678afc3fabmshc0937d1b8c0b77cp17e8c7jsn2e631e9b2e7c",
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    cases_global.innerHTML = `
      <div class="col-md-6 col-lg-6 col-xl-4">
        <div class="card mt-3" style="width: 22rem;">
            <div class="card-body">
                <h5 class="card-title text-center">World</h5>
                <p class="card-text">cases: ${data.total_cases}</p>
                <p class="card-text text-danger">deaths: ${data.total_deaths}</p>
                <p class="card-text text-success">total recovered: ${data.total_recovered}</p>
                <p class="card-text text-danger">new deaths: ${data.new_deaths}</p>
                <p class="card-text">new cases: ${data.new_cases}</p>
               
            </div>
        </div>
      </div>
         `;
  })
  .catch((err) => {
    console.log(err);
  });

const enterCode = (e) => {
  fetch(
    `https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=${search.value}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "678afc3fabmshc0937d1b8c0b77cp17e8c7jsn2e631e9b2e7c",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      data.latest_stat_by_country.map((item) => {
        singleCountry.innerHTML = `
                    <div class="card mt-5" id="countryCard" style="width: 22rem;">
                        <div class="card-body text-left">
                            <h5 class="card-title text-center" id="countryName">${item.country_name}</h5>
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
    .catch((err) => {
      console.log(err);
    });
};

fetch("https://api.covid19india.org/data.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    console.log(typeof data);

    last_updated_time.innerHTML = `<p>Last Updated on : ${data.statewise[0].lastupdatedtime}</p>`;
    india.innerHTML += `
    <div class="card m-3 confirmed">
      <div class="card-body">
        <h5>Confirmed</h5>
        <p class="card-text">${data.statewise[0].confirmed} [+${data.statewise[0].deltaconfirmed}]</p>
      </div>
    </div>
    `;
    india.innerHTML += `
    <div class="card m-3  c-active">
      <div class="card-body">
        <h5>Active</h5>
        <p>${data.statewise[0].active}</p>
      </div>
    </div>
    
    
  `;
    india.innerHTML += `
    <div class="card m-3  recovered">
      <div class="card-body">
        <h5>Recovered</h5>
        <p>${data.statewise[0].recovered} [+${data.statewise[0].deltarecovered}]</p>
      </div>
    </div>
    
    
 
  `;
    india.innerHTML += `
    <div class="card m-3  deaths">
      <div class="card-body">
        <h5>Deaths</h5>
        <p>${data.statewise[0].deaths} [+${data.statewise[0].deltadeaths}]</p>
      </div>
    </div>
    `;
    let i = 0;
    data.statewise.forEach((item, e) => {
      tbody.innerHTML += `
      <tr>
        <td>${i++}</td>
        <td>${item.state}</td>
        <td><span class="ml-2">${
          item.confirmed
        }</span>&nbsp;&nbsp;<span id="delta-con${i}" class="delta-con" style="color: #fc1c20;">&uarr;${
        item.deltaconfirmed
      }</span></td>
        <td>${item.active}</td>
        <td><span class="ml-2">${
          item.recovered
        }</span>&nbsp;&nbsp;<span id="delta-rev${i}" class="delta-rev" style="color: #07ff66b0;">&uarr;${
        item.deltarecovered
      }</span></td>
        <td><span class="ml-2">${
          item.deaths
        }</span>&nbsp;&nbsp;<span id="delta-dea${i}" class="delta-dea" style="color: #808080af;">&uarr;${
        item.deltadeaths
      }</span></td>
      </tr>
    `;
      let delta_con = parseInt(
        document.getElementById(`delta-con${i}`).textContent.slice(1)
      );
      let delta_rev = parseInt(
        document.getElementById(`delta-rev${i}`).textContent.slice(1)
      );
      let delta_dea = parseInt(
        document.getElementById(`delta-dea${i}`).textContent.slice(1)
      );
      if (delta_con == 0) {
        document.getElementById(`delta-con${i}`).style.display = "none";
      }
      if (delta_rev == 0) {
        document.getElementById(`delta-rev${i}`).style.display = "none";
      }
      if (delta_dea == 0) {
        document.getElementById(`delta-dea${i}`).style.display = "none";
      }
    });

    tbody.innerHTML += `
    <tr>
      <td></td>
      <td>${data.statewise[0].state}</td>
      <td>${data.statewise[0].confirmed}</td>
      <td>${data.statewise[0].active}</td>
      <td>${data.statewise[0].recovered}</td>
      <td>${data.statewise[0].deaths}</td>
    </tr>
    `;
  })
  .catch((err) => {
    console.log(err);
  });
