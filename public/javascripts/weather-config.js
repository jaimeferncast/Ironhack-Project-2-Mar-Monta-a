let dataTable // refactorizar como clase

function displayWeather(data) {

    if (data.name) {
        dataTable = `<h6 class="text-center" id="place-title" name="${data.name}">Datos climatológicos de ${data.name} (10 días)`
    } else {
        dataTable = `<h6 class="text-center">Datos climatológicos en las coordenadas lat: ${data.lat}, lng: ${data.lng} (10 días)</h6>`
    }

    dataTable +=
    /* Tabla con la leyenda */ `<div class="row flex-nowrap mb-3"><div class="d-flex justify-content-end" style="width: 12%;"><table class="table table-sm" id="weather-head"><thead><tr><th class="text-center pb-3"><small>Powered by:</small><br><img src="https://stormglass.io/wp-content/uploads/2019/05/Stormglass-Blue-circled-5.svg" alt="stormglass-logo" style="width: 88%; filter: opacity(0.8);"></th></tr></thead><tbody><tr><th>Temperatura (ºC)</th></tr><tr><th>Nubosidad (%)</th></tr><tr><th>Precipit. (l/m²)</th></tr><tr><th>Espesor nieve (m)</th></tr><tr><th>Temp. agua (ºC)</th></tr><tr><th>Dirección olas</th></tr><tr><th>Ola (m)</th></tr><tr><th>Período olas (s)</th></tr><tr><th>Dirección viento</th></tr></tbody></table></div>
    
    <div class="px-0" style="width: 86%; overflow-x: scroll;"><table class="table table-sm" id="weather-body" style="table-layout: fixed;"><thead><tr>` /* Inicio de la tabla de datos de Stormglass */

    axios.post('/api', data).then(response => {

        populateAll(response.data.weather)

        dataTable += `</tr></tbody></table></div></div>`  /* Final de la tabla de datos de Stormglass */
        document.querySelector('#info-place').innerHTML = dataTable

        let addFavouriteButton
        if (data.name) {
            addFavouriteButton = `<form id="add-place-form-directly" method="PUT" action="/area-personal/mis-lugares"><button type="submit" class="btn btn-primary">Agregar a mis lugares -sin modal-</button>`
        } else {
            addFavouriteButton = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#newPlaceForm">Agregar a mis lugares</button>`
        }
        document.querySelector('#add-place-button').innerHTML = addFavouriteButton

        addFavourite(response.data.weather, data.lat, data.lng)
    })
        .catch(err => console.log(err))
}

function populateAll(data) {

    populateTableWithDates(data)
    populateTableWithTemp(data)
    populateTableWithClouds(data)
    populateTableWithRain(data)
    populateTableWithSnow(data)
    populateTableWithWaterTemp(data)
    populateTableWithWaveDirection(data)
    populateTableWithWaves(data)
    populateTableWithWavePeriod(data)
    populateTableWithWindDirection(data)
}

function populateTableWithDates(array) {
    let grey = '225'
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            if (!(i % 24)) { grey === '243' ? grey = '225' : grey = '243' }     // cambia el tono de gris al pasar al día siguiente

            const time = new Date(elm.time.slice(0, 19))
            let day = time.getDay()
            switch (day) {
                case 0: day = 'D'; break
                case 1: day = 'L'; break
                case 2: day = 'M'; break
                case 3: day = 'X'; break
                case 4: day = 'J'; break
                case 5: day = 'V'; break
                case 6: day = 'S'; break
            }
            const date = time.getDate()
            const hours = time.getHours() + 'h'

            dataTable += `<th style="background-color: rgb(${grey}, ${grey}, ${grey});">${day}<br>${date}<br>${hours}</th>`
        }
    })
}

function populateTableWithTemp(array) {
    dataTable += `</tr></thead><tbody><tr>`     // elementos de la tabla entre thead y tbody
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            let backgroundColor
            if (elm.airTemperature.sg < -20) { backgroundColor = '360' }
            else if (elm.airTemperature.sg > 50) { backgroundColor = '0' }
            else { backgroundColor = Math.round(360 - ((elm.airTemperature.sg + 20) / 70 * 360)) }  // Queremos un color entre hsl(0,100%,60%) --20ºC- y hsl(360,100%,60%) -+50ºC-
            const Temp = Math.round(elm.airTemperature.sg)
            dataTable += `<td style="background-color: hsl(${backgroundColor},100%,60%);">${Temp}</td>`
        }
    })
}

function populateTableWithClouds(array) {
    dataTable += `</tr><tr>`     // elementos de la tabla entre rows de datos
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            const backgroundColor = Math.round(255 - (elm.cloudCover.sg / 100 * 130))     // Queremos un gris entre rgb(90,90,90) -100% de nubes- y rgb (255, 255, 255) -0% de nubes-
            if (elm.cloudCover.sg > 1) { cloudCover = Math.round(elm.cloudCover.sg) }     // cloudCover en blanco si es igual a 0
            else { cloudCover = '' }
            dataTable += `<td style="background-color: rgb(${backgroundColor}, ${backgroundColor}, ${backgroundColor});">${cloudCover}</td>`
        }
    })
}

function populateTableWithRain(array) {
    dataTable += `</tr><tr>`     // elementos de la tabla entre rows de datos
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            if (elm.precipitation.sg >= 0.1) { precipitation = elm.precipitation.sg.toFixed(1) }
            else { precipitation = ' ' }
            dataTable += `<td>${precipitation}</td>`
        }
    })
}

function populateTableWithSnow(array) {     // devuelve undefined a veces - arreglar!
    dataTable += `</tr><tr>`     // elementos de la tabla entre rows de datos
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            let snowDepth
            if (elm.snowDepth) {
                if (elm.snowDepth.sg > 0) { snowDepth = elm.snowDepth.sg.toFixed(1) }
            } else { snowDepth = ' ' }
            dataTable += `<td>${snowDepth}</td>`
        }
    })
}

function populateTableWithWaterTemp(array) {
    dataTable += `</tr><tr>`     // elementos de la tabla entre rows de datos
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            let backgroundColor = Math.round(360 - ((elm.waterTemperature.sg) + 30 / 60 * 360))
            const Temp = Math.round(elm.waterTemperature.sg)
            dataTable += `<td style="background-color: hsl(${backgroundColor},100%,80%);">${Temp}</td>`
        }
    })
}

function populateTableWithWaveDirection(array) {
    dataTable += `</tr><tr>`     // elementos de la tabla entre rows de datos
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            let waveDirection
            if (elm.waveDirection) {
                waveDirection = Math.round(elm.waveDirection.sg)
                dataTable += `<td><img src="https://upload.wikimedia.org/wikipedia/en/f/f1/Down_Arrow_Icon.png" alt="arrow" style="width: 22px; height: 17px; transform: rotate( ${waveDirection}deg ); image-rendering: -webkit-optimize-contrast; filter: invert(1) saturate(100) hue-rotate(520deg);"></td>`
            } else { dataTable += `<td> </td>` }
        }
    })
}

function populateTableWithWaves(array) {
    dataTable += `</tr><tr>`     // elementos de la tabla entre rows de datos
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            let waveHeight
            elm.waveHeight ? waveHeight = elm.waveHeight.sg.toFixed(1) : waveHeight = ' '
            dataTable += `<td>${waveHeight}</td>`
        }
    })
}

function populateTableWithWavePeriod(array) {
    dataTable += `</tr><tr>`     // elementos de la tabla entre rows de datos
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            let wavePeriod
            elm.wavePeriod ? wavePeriod = Math.round(elm.wavePeriod.sg) : wavePeriod = ' '
            dataTable += `<td>${wavePeriod}</td>`
        }
    })
}

function populateTableWithWindDirection(array) {
    dataTable += `</tr><tr>`     // elementos de la tabla entre rows de datos
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            let windDirection
            if (elm.windDirection) {
                windDirection = Math.round(elm.windDirection.sg)
                dataTable += `<td><img src="https://upload.wikimedia.org/wikipedia/en/f/f1/Down_Arrow_Icon.png" alt="arrow" style="width: 22px; height: 17px; transform: rotate( ${windDirection}deg ); image-rendering: -webkit-optimize-contrast; filter: invert(1) saturate(100) hue-rotate(400deg);"></td>`
            }   // para todos los "wave" parametros solo existen datos a 7 días vista y sólo en puntos costeros
        }
    })
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