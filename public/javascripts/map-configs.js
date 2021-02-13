let map


function initMap() {

    map = new google.maps.Map(
        document.querySelector('#map'),
        { zoom: 10, center: { lat: 40.392499, lng: -3.698214 } }
    )

    map.addListener('click', (mapMouseEvent) => {
        const clickedPosition = JSON.stringify(mapMouseEvent.latLng)
        const slice = clickedPosition.slice(7, -1)
        const split = slice.split(',')
        const lat = split[0]
        const lng = split[1].slice(6)
        stormGlassParamas = { lat, lng, params: 'windDirection,windSpeed' }

        axios.get('',{
            baseUrl: 'https://api.stormglass.io/v2/weather/point',
            params: {
                'lat': stormGlassParamas.lat,
                'lng': stormGlassParamas.lng,
                'params': stormGlassParamas.params
            },
            headers: {'Authorization': 'APIKEY'}
        })
            .then(response => {
                console.log(response.json())

            })
        




    })


    // getDirections()
}


function getDirections() {

    axios
        .get('/api/coffee-list')
        .then(response => pinPlace(response.data))
        .catch(err => console.log(err))
}


function pinPlace(place) {

    place.forEach(elm => {
        const position = { lat: elm.location.coordinates[0], lng: elm.location.coordinates[1] }
        new google.maps.Marker({ position, title: elm.title, map })
    })
}