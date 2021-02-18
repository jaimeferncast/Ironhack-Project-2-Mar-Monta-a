let map
let stormGlass
let marker

const params = 'airTemperature,cloudCover,precipitation,snowDepth,waterTemperature,waveDirection,waveHeight,wavePeriod,windDirection,windSpeed,gust'

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

        stormGlass = { lat, lng, params }

        const latNum = +stormGlass.lat
        const lngNum = +stormGlass.lng
        centerMap(latNum, lngNum)
        displayWeather(stormGlass)     
    })

    findlocation(params)
}

function getUserPosition(map) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                centerMap(center.lat, center.lng)
            },
            error => window.alert('No se ha podido obtener tu hubicación')
        )
    } else { window.alert('No dispones de geolocalización') }
}

function findlocation(params) {

    document.getElementById('find-location').addEventListener('submit', function (event) {

        event.preventDefault()

        const location = document.querySelector('#find-location .input-group input[name="location"]').value

        axios.get(`/api/${location}`)
            .then(response => {
                stormGlass = {
                    name: response.data.formatted_address,
                    lat: response.data.geometry.location.lat,
                    lng: response.data.geometry.location.lng,
                    params
                }
                const lat = +stormGlass.lat
                const lng = +stormGlass.lng
                centerMap(lat, lng)
                displayWeather(stormGlass)
            })
            .catch(err => console.log(err))
    })
}

function centerMap(lat, lng) {
   marker && marker.setMap(null)
    
    const center = {
        lat, lng
    }
    
    map.setZoom(13)
    map.setCenter(center)   
    marker = new google.maps.Marker({ position: center, map, icon: 'images/iconStorm.png', opacity: 0.8})
    
}

