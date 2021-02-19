const placesNamesArray = document.querySelectorAll('.user-place-weather')
const placeName = []

placesNamesArray.forEach(elm => placeName.push(elm.getAttribute('id')))

axios.post('/api/user-places', { placeName })
    .then(response => {

        response.data.places.forEach(elm => {

            dataTable = '<table class="table table-sm weather-body user-place-weather" style="table-layout: fixed;"><thead><tr>'
            populateAll(elm.weather)
            dataTable += '</tr></tbody></table>'
            document.getElementById(elm.name).innerHTML = dataTable
            dataTable = ''
        })
    })
    .catch(err => console.log(err))