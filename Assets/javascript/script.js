var searchBtn = $('#searchBtn');
var searchHistEl = $('#searchHist');
var clearHistEl = $('#clearHist');

var history = JSON.parse(localStorage.getItem('storedSearchArray'));
searchBtn.on('click', saveData);
clearHistEl.on('click', clearHist);

function saveData() {
    var cityEntered = $('#searchCity').val();
    checkForecast(cityEntered);
    history.push(cityEntered);
    localStorage.setItem('storedSearchArray', JSON.stringify(history));
    renderSaved();
};

function renderSaved() {
    searchHistEl.text('');
    for (var i = 0; i < history.length; i++)
    $('<button class="form-control" type="button">').text(history[i]).attr("onclick", "pullHistory('" + history[i] + "')").appendTo(searchHistEl)
};


function checkForecast(city) {
    var goecodeAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=&appid=276c0656662a6a59a909e990f466781c'
    fetch(goecodeAPI).then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var lati = data[0].lat
        var lon = data[0].lon
        var weatherAPI = 'api.openweathermap.org/data/2.5/forecast?lat=' + lati + '&lon=' + lon + '&appid=276c0656662a6a59a909e990f466781c'
        fetch(weatherAPI).then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var date = new Date(data.dt * 1000);
            $('#newCity').text(data.name);
            $('#newDate').text(date);
            $('#newIcon').attr('src', 'http://openweathermap.org/img/w' +data.weather[0].icon + 'png').attr('alt', data.weather[0].description);
            $('#newTemp').text('-->Temp:' + data.main.temp);
            $('#newWind').text('-->Wind Speed:' + data.wind.speed + 'mph');
            $('#newHumid').text('-->' + data.main.humidity + '% Humidity');
        })
        var fiveDayUrl = 'api.openweathermap.org/data/2.5/forecast?lat=' + lati + '&lon=' + lon + '&appid=276c0656662a6a59a909e990f466781c&units=imperial'
        fetch(fiveDayUrl).then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var day1date = new Date(data.list[4].dt_txt)
            $('#day1date').text(day1date.toUTCString());
            $('#day1icon').attr('src', 'http://openweathermap.org/img/w' +data.list[4].weather[0].icon + 'png').attr('alt', data.list[8].weather[0].description);
            $('#day1Temp').text(data.list[4].main.temp);
            $('#day1Wind').text(data.list[4].wind.speed + 'mph');
            $('#dat1Humid').text(data.list[4].main.humidity + '% Humidity');

            var day2date = new Date(data.list[12].dt_txt)
            $('#day2date').text(day2date.toUTCString());
            $('#day2icon').attr('src', 'http://openweathermap.org/img/w' +data.list[12].weather[0].icon + 'png').attr('alt', data.list[16].weather[0].description);
            $('#day2Temp').text(data.list[12].main.temp);
            $('#day2Wind').text(data.list[12].wind.speed + 'mph');
            $('#dat2Humid').text(data.list[12].main.humidity + '% Humidity');

            var day3date = new Date(data.list[20].dt_txt)
            $('#day3date').text(day3date.toUTCString());
            $('#day3icon').attr('src', 'http://openweathermap.org/img/w' +data.list[20].weather[0].icon + 'png').attr('alt', data.list[24].weather[0].description);
            $('#day3Temp').text(data.list[20].main.temp);
            $('#day3Wind').text(data.list[20].wind.speed + 'mph');
            $('#dat3Humid').text(data.list[20].main.humidity + '% Humidity');

            var day4date = new Date(data.list[28].dt_txt)
            $('#day4date').text(day4date.toUTCString());
            $('#day4icon').attr('src', 'http://openweathermap.org/img/w' +data.list[4].weather[0].icon + 'png').attr('alt', data.list[32].weather[0].description);
            $('#day4Temp').text(data.list[28].main.temp);
            $('#day4Wind').text(data.list[28].wind.speed + 'mph');
            $('#dat4Humid').text(data.list[28].main.humidity + '% Humidity');

            var day5date = new Date(data.list[36].dt_txt)
            $('#day5date').text(day5date.toUTCString());
            $('#day5icon').attr('src', 'http://openweathermap.org/img/w' +data.list[4].weather[0].icon + 'png').attr('alt', data.list[39].weather[0].description);
            $('#day5Temp').text(data.list[36].main.temp);
            $('#day5Wind').text(data.list[36].wind.speed + 'mph');
            $('#dat5Humid').text(data.list[36].main.humidity + '% Humidity');
        })
    })
};


function pullHistory(fromHistory) {
    checkForecast(fromHistory);
}

function clearHist() {
    localStorage.clear();
    history = [];
    renderSaved();
}

renderSaved();