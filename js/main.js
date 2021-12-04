
let getStandings = document.getElementById("getStandings")
let userInput = document.getElementById("userInput")

const sendData = () => {
    axios
        .post(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
        .then(response => {
            console.log(response);
        });
};


// make a loop 
// const getStandings = async (season, round) => {
//     result = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
//     const response = await fetch (result)
//     const data = await response.json 
//     const driverStandings = await data.MRData.StandingsTable.StandingsList[0].DriverStandings
//     for (racer of driverStandings) {
//         position.innerHTML = racer.Driver.position 
//         name.innerHTML = racer.Driver.familyName
//         nationality.innerHTML = racer.Driver.nationality
//         sponsor.innerHTML = racer.Constructors[0].name
//         points.innerHTML = racer.points
//     }
// }

getStandings.addEventListener('submit', function (event) {
    event.preventDefault();
    let seasonValue = document.getElementById("season").value;
    let roundValue = document.getElementById('round').value;
    fetch('https://ergast.com/api/f1/${season}/${round}/driverStandings.json')
        .then((res) => res.json())
        .catch(() => displayError())
    .then((data) => {
        console.log(data.MRData.StandingsTable.StandingsList[0].DriverStandings)
        populateRacers(data.MRData.StandingsTable.StandingsList[0].DriverStandings)
    })
})

function populateRacers(racers) {
    request.innerHTML = '';
    standingsTableBody.innerHTML = ''

    for (const racer of racers) {
        let newInfo = document.createElement('tr');
        newInfo.innerHTML = `
        <td scope="row">${racer.position}</td>
        <td scope="row">${racer.Driver.givenName} ${racer.Driver.familyName}</td>
        <td scope="row">${racer.Driver.nationality}</td>
        <td scope="row">${racer.Constructors[0].name}</td>
        <td scope="row">${racer.points}</td>`

        standingsTableBody.append(newInfo)
    }
}

function displayError() {
    standingsTableBody.innerHTML = ''
    request.innerText = "We were unable to complete your request. Please ensure you have selected a valid year and season and try again."
}