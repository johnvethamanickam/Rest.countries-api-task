//Fetch Api from restcountries:-

//----------------------------------------------------------------

//async function to fetch api data from restcountries:-
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

var x = 0;
var y = 1;
async function fetchApi() {
  //return promise object in readable stream
  // to handle this await is used.
  try {
    let res = await fetch("https://restcountries.com/v3.1/all");
    //after converting in Json Format it returns again Promise object
    //to handle this await is used.
    let JsonFormat = await res.json();
    //----------------------------------------------------------------

    //for loop to print data:-
    for (var i = 0; i < JsonFormat.length; i++) {
      var CountryName = JsonFormat[i].name.common;
      var countrycapital = JsonFormat[i].capital[x];
      var countryflagimage = JsonFormat[i].flags.png;
      var countryregion = JsonFormat[i].region;
      var countrycode = JsonFormat[i].cca3;
      var latitude = JsonFormat[i].latlng[x];
      var longitude = JsonFormat[i].latlng[y];
      //console.log(latitude, longitude)

      if (latitude == undefined || longitude == undefined) {
        throw new Error(`invalid:unable to read the data`);
      }
      //-------------------------------------------------------------
      //appending innerHTML:-
      div_row.innerHTML += `

      <div class="col-lg-4">
      <div class="card-group">
      <div class="card" class="card border-dark mb-3" style="width: 18rem;">
      <div class="card-header card-title">${CountryName}</div>
      <img src="${countryflagimage}" id="flag-img" class="card-img-top" alt="CountryName:,${CountryName}" />
      <div class="card-body">
        <h5 class="card-title content">CAPITAL : ${countrycapital}</h5>
        <h5 class="card-title content">REGION : ${countryregion}</h5>
        <h5 class="card-title content">CODE : ${countrycode}</h5>
        <button type="button" id="temp-btn" class="btn btn-primary" onclick=openWeather(${latitude},${longitude})>Click for weather</button>
     
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      
      `;
    }
  } catch (error) {
    //catch-block:-
    console.log(error.message);
  }
}
//----------------------------------------------------------------
//openweather api function:-

async function openWeather(latitude, longitude) {
  try {
    var res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b9d07e8d66a7c9c78d47685619746207`
    );
    var result = await res.json();
    var ans = result.main.temp;
    var ans2 = document.getElementById("footer");
    ans2.innerHTML = alert(`COUNTRY-TEMPERATURE: ${ans}`);
    ans2.innerHTML = "";
  } catch (error) {
    console.log(error.message);
  }

  //----------------------------------------------------------------
}

fetchApi();

//-------------------------------------------------------------------
//appending elements:-

//main-div
var div_container = document.createElement("div");
div_container.setAttribute("class", "container");

//Heading-div
var div_head = document.createElement("div");
div_head.setAttribute("class", "heading");
div_head.innerHTML = "COUNTRIES - DATA";

//card-row
var div_row = document.createElement("div");
div_row.setAttribute("class", "row");

//body-append
document.body.append(div_container);
div_container.append(div_row);

//------------------------------------------------------------------
