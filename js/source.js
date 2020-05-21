//mengambil data dari Football-data.org
const authToken = "088c0d07289341259f2f6519c0f015bf";
const baseURL = "https://api.football-data.org/v2/";
const leagueId = 2021;
const teamsEndPoint = `${baseURL}competitions/${leagueId}/teams`;
const klasemenEndPoint = `${baseURL}competitions/${leagueId}/standings`;

const fetchAPI = url => {
    return fetch(url, {
            headers: {
                'X-Auth-Token': authToken
            }
        })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

//mengambil data pertandingan
function getTeams () {
    if("caches" in window){
        caches.match(teamsEndPoint).then(function(response){
            if(response){
                response.json().then(function(data){
                    showTeams(data);
                })
            }

            fetchAPI(teamsEndPoint)
                .then(data => {
                    showTeams(data);
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }
}

//mengambil data API klasemen
function getKlasemen() {
    if ("caches" in window) {
        caches.match(klasemenEndPoint).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    showKlasemen(data);
                })
            }

            fetchAPI(klasemenEndPoint)
                .then(data => {
                    showKlasemen(data);
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }

}

// mendapatkan data API team detail
function getTeamsById(){
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
   return new Promise((resolve, reject) =>{
        if ("caches" in window) {
            caches.match(`${baseURL}/teams/${idParam}`).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        showTeamsByID(data);
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(`${baseURL}/teams/${idParam}`)
            .then(data => {
                showTeamsByID(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })

   })
}

function getSavedTeams() {
    getAll().then(teams =>{
        showSavedTeam(teams);
    })
}

function getSavedTeamById(){
    const urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    getById(idParam).then(teams => {
        showTeamsByID(teams);
    });
}

function deleteSavedTeam(id){
    deleteById(id).then(() =>{
        getSavedTeams();
    })
}

//menampilkan data
function showTeams(data){
    let teams = data.teams;
    let listteams = document.getElementById('list-teams');
    teams.forEach(teams => {
        listteams.innerHTML += `
            <div class="col s12 m6 l3">
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light badge-home">
                        <img class="activator" src="${teams.crestUrl}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${teams.name}</span>
                        <p><a href="./teams.html?id=${teams.id}">Show More</a></p>
                    </div>
                </div>
            </div>
        `;
    });
}

function showKlasemen(data){
    let klasemen = document.querySelector('#klasemen');
    let standings = data.standings[0].table;
    let no = 1;
    standings.forEach(data => {
        klasemen.innerHTML += `
            <tr>
                <td>${no++}</td>
                <td><img src="${data.team.crestUrl}" class="badge-klasemen"></td>
                <td>${data.team.name}</td>
                <td>${data.playedGames}</td>
                <td>${data.won}</td>
                <td>${data.lost}</td>
                <td>${data.draw}</td>
                <td>${data.points}</td>
            </tr>
        `;
    });
}

function showTeamsByID(data){
    document.querySelector('#logoTeam').innerHTML = `<img src="${data.crestUrl}" alt="" class="responsive-img">`;
    document.querySelector('#nameTeam').innerHTML = `<h1 class="black-text">${data.name} <span>(${data.founded})</span></h1>`;
    let dataTeam = document.querySelector('#dataTeam');
    let dataPemain = document.querySelector('#dataPemain');
    let no = 1;

    dataTeam.innerHTML = `
                <thead>
                    <tr>
                        <th width="30">Alamat</th>
                        <th width="5">:</th>
                        <td>${data.address}</td>
                    </tr>
                    <tr>
                        <th>Website</th>
                        <td>:</td>
                        <td><a href="${data.website}" target="__blank">${data.website}</a></td>
                    </tr>
                    <tr>
                        <th>Number</th>
                        <td>:</td>
                        <td>${data.phone}</td>
                    </tr>
                    <tr>
                        <th>Tempat</th>
                        <td>:</td>
                        <td>${data.venue}</td>
                    </tr>
                </thead>
           `;

    data.squad.forEach(data => {
        dataPemain.innerHTML += `
                <tr>
                    <td>${no++}</td>
                    <td>${data.name}</td>
                    <td>${data.position}</td>
                    <td>${data.nationality}</td>
                </tr>
                `;
    });
}

function showSavedTeam(data) {
    let listTeamSaved = "";
    data.forEach(teams => {
        listTeamSaved += `
            <div div class="col s12 m6 l3">
                <div class="card">
                    <div class = "card-image badge-home">
                        <img src="${teams.crestUrl}">
                        <button id="${teams.id}" class="removeButton btn-floating halfway-fab waves-effect waves-light red">X</button>
                    </div>
                    <div class="card-content">
                        <span class="card-title">${teams.name}</span>
                        <p><a href="./teams.html?id=${teams.id}&saved=true">Show More</a></p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("list-teams-saved").innerHTML = listTeamSaved;


    let removeButtons = document.querySelectorAll(".removeButton");
    for (let button of removeButtons) {
        button.addEventListener("click", function (event) {
            let id = event.target.id;
            deleteSavedTeam(id);
        })
    }
    

}

