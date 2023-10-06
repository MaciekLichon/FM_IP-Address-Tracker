// --------- MAP ---------

const initialCoords = {
    lat: 43.7316,
    lng: 7.4150
};
let map = L.map('map').setView([initialCoords.lat, initialCoords.lng], 18);

const myIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [46, 56],
    iconAnchor: [23, 56],
});
const marker = L.marker([initialCoords.lat, initialCoords.lng], {icon: myIcon});
marker.addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const updateMap = (lat, lng) => {
    map.setView([lat, lng], 13);
    marker.setLatLng([lat, lng]);
};

// --------- SCRIPT ---------

const form = document.querySelector('.hero__form');
const input = document.querySelector('.hero__form-input');
const values = document.querySelectorAll('.hero__data-value');

const results = {
    ip: '',
    location: '',
    timezone: '',
    isp: '',
    lat: '',
    lng: ''
};

const requestIPData = (ip) => {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_r7CWfvVLeP8bUyWLj7mQH9Xk0wVSn&ipAddress=${ip}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            results.ip = ip;
            results.location = `${data.location.region}, ${data.location.city}`;
            results.timezone = `UTC ${data.location.timezone}`;
            results.isp = data.isp;
            results.lat = data.location.lat;
            results.lng = data.location.lng;

            for (const result in results) {
                if (result !== 'lat' && result !== 'lng') {
                    const valueDOM = (Array.from(values)).find(item => item.getAttribute('data-item') === result);
                    valueDOM.innerHTML = results[result];
                    // console.log(valueDOM);
                }
            }

            updateMap(results.lat, results.lng);
        })
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const ip = input.value;
    requestIPData(ip);
});

