let map
let stormGlass

function initMap() {

    map = new google.maps.Map(
        document.querySelector('#map'),
        { zoom: 7, center: { lat: 40.392499, lng: -3.698214 }, styles: mapStyles.MarMont }
    )

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


function myDirection(){

}



//function getMyPosition(){}