let map
let stormGlass

function initMap() {

    map = new google.maps.Map(
        document.querySelector('#map'),
        { zoom: 6, center: { lat: 40.41675, lng: -3.70350 }, draggableCursor: 'crosshair', styles: mapStyles.MarMont }
    )
    getUserPosition(map)

    map.addListener('click', (mapMouseEvent) => {

        const clickedPosition = JSON.stringify(mapMouseEvent.latLng)

        const slice = clickedPosition.slice(7, -1)
        const split = slice.split(',')

        const lat = split[0]
        const lng = split[1].slice(6)

        const params = 'airTemperature,cloudCover,precipitation,snowDepth,waterTemperature,waveDirection,waveHeight,wavePeriod,windDirection,windSpeed,gust'

        stormGlass = { lat, lng, params }

        displayWeather(stormGlass)
    })
}


function getUserPosition(map) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position)
                const center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                map.setCenter(center)
                new google.maps.Marker({ position: center, map, icon:'images/iconStorm.png'})
                

            },
            error => window.alert('Nose ha podido obtener tu hubicación')
        )
    } else {
        window.alert('No dispones de geolocalización')
    }

}



