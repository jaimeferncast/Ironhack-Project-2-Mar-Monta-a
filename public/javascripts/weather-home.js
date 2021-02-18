function displayWeather(data) {

    dataTable = data.name ?
        `<h6 class="text-center" id="place-title" name="${data.name}">Datos climatológicos de ${data.name} (10 días)</h6>`
        : `<h6 class="text-center">Datos climatológicos en las coordenadas lat: ${data.lat}, lng: ${data.lng} (10 días)</h6>`

    dataTable +=
    /* Tabla con la leyenda */ `<div class="row flex-nowrap mb-3"><div class="d-flex justify-content-end" style="width: 12%;"><table class="table table-sm weather-head"><thead><tr><th class="text-center pb-3"><small>Powered by:</small><br><img src="https://stormglass.io/wp-content/uploads/2019/05/Stormglass-Blue-circled-5.svg" alt="stormglass-logo" style="width: 88%; filter: opacity(0.8);"></th></tr></thead><tbody><tr><th>Temperatura (ºC)</th></tr><tr><th>Nubosidad (%)</th></tr><tr><th>Precipit. (l/m²)</th></tr><tr><th>Espesor nieve (m)</th></tr><tr><th>Temp. agua (ºC)</th></tr><tr><th>Dirección olas</th></tr><tr><th>Ola (m)</th></tr><tr><th>Período olas (s)</th></tr><tr><th>Dirección viento</th></tr><tr><th>Vel. viento (km/h)</th></tr><tr><th>Ráfagas (km/h)</th></tr></tbody></table></div>
    
    <div class="px-0" style="width: 86%; overflow-x: scroll;"><table class="table table-sm weather-body" style="table-layout: fixed;"><thead><tr>` /* Inicio de la tabla de datos de Stormglass */

    axios.post('/api', data).then(response => {

        populateAll(response.data.weather)

        dataTable += `</tr></tbody></table></div></div>`  /* Final de la tabla de datos de Stormglass */
        document.querySelector('#info-place').innerHTML = dataTable

        let addFavouriteButton = data.name ?    /* Botón para agregar el lugar a "mis lugares" */
            `<form id="add-place-form-directly" method="PUT" action="/area-personal/mis-lugares"><button type="submit" class="btn btn-info">Agregar a mis lugares</button>`
            : `<button type="button" class="btn btn-info" data-toggle="modal" data-target="#newPlaceForm">Agregar a mis lugares</button>`
        document.querySelector('#add-place-button').innerHTML = addFavouriteButton

        addFavourite(response.data.weather, data.lat, data.lng)
    })
        .catch(err => console.log(err))
}

function addFavourite(weather, lat, lng) {

    if (document.getElementById('add-place-form-directly')) {

        document.getElementById('add-place-form-directly').addEventListener('submit', function (event) {

            event.preventDefault()

            const name = document.querySelector('#place-title').getAttribute('name')
            const place = {
                name,
                weather,
                coordinates: { lat, lng }
            }

            axios.put(`/api`, place)
                .then(() => window.location.replace("/area-personal/mis-lugares"))
                .catch(err => console.log(err))
        })
    } else {

        document.getElementById('add-place-form').addEventListener('submit', function (event) {

            event.preventDefault()

            const name = document.querySelector('#add-place-form .form-group input[name="name"]').value
            const place = {
                name,
                weather,
                coordinates: { lat, lng }
            }

            axios.put(`/api`, place)
                .then(() => window.location.replace("/area-personal/mis-lugares"))
                .catch(err => console.log(err))
        })
    }
}