
var map = L.map('map').setView([51.505, -0.09], 13);

const markers = []; // {lat,lng,id}   ( can be transphormed to class if needed)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
    
map.on('click',(event)=>{
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    let marker = new L.marker([lat, lng],{draggable: true});
    marker.id = markers.length +1;
    console.log(lat);
    markers.push({lat,lng,id:marker.id});
    marker.on("drag", function(e) {
        let marker = e.target;
        let position = marker.getLatLng();
        markers[e.target.id-1].lat = position.lat;
        markers[e.target.id-1].lng = position.lng;
        modifyTable(position.lat,position.lng,e.target.id);
        }); 
    addToTable(lat,lng);
    marker.addTo(map);
});

function addToTable(lat,lng) {
    const tableBody = document.createElement('tbody');
    tableBody.setAttribute('id',`tb_${+markers.length}`);
    const tableRow =`<tr><th scope="row">${markers.length}</th><td>${lat}</td><td>${lng}</td></tr>`;
    tableBody.innerHTML = tableRow;
    document.getElementById('table').appendChild(tableBody);
}
function modifyTable(lat,lng,index) {
    const tableBody = document.getElementById(`tb_${index}`);
    const tableRow =`<tr><th scope="row">${markers.length}</th><td>${lat}</td><td>${lng}</td></tr>`;
    tableBody.innerHTML = tableRow;
}