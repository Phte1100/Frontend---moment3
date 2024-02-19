"use strict";

window.onload = init;

function init() {
    const searchBtn = document.getElementById("searchBtn");
    searchBtn.addEventListener("click", async function () { 
        let search = document.getElementById("search").value; 
        await getData(search); 
    });
}

async function getData(search) {
    const url = "https://nominatim.openstreetmap.org/search?addressdetails=1&q=" + encodeURIComponent(search) + "&format=jsonv2&limit=1";

    try {
        const response = await fetch(url);
        const data = await response.json();
        writeToMap(data); 
    } catch (error) {
        console.error(error);
        document.getElementById("error").innerHTML = "<p>Något gick fel!</p>";
    }
}

// uppdatera kartans 'src'-attribut med nya koordinater från API-svaret
function writeToMap(coordinates) {
    let lat = coordinates[0].lat;
    let lon = coordinates[0].lon;
    let boxLat1 = coordinates[0].boundingbox[0];
    let boxLat2 = coordinates[0].boundingbox[1];
    let boxLon1 = coordinates[0].boundingbox[2];
    let boxLon2 = coordinates[0].boundingbox[3];

    // Uppdaterar <iframe>-elementet med den nya URL:en som innehåller de extraherade koordinaterna
    document.getElementById("outputmap").src = ("https://www.openstreetmap.org/export/embed.html?bbox=" + boxLon1 + "%2C" + boxLat1 + "%2C" + boxLon2 + "%2C" + boxLat2 + "&layer=mapnik&marker=" + lat + "%2C" + lon);
}