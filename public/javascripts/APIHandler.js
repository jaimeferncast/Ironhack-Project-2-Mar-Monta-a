class APIHandler {
    constructor(baseUrl) {
      this.app = axios.create({
        baseURL: baseUrl
      })
    }
    getWeather(lat, lng, params){
        this.app.get(`point?lat=${lat}&lng=${lng}&params=${params}`)

    } 

  }
  //point?lat=43.57683&lng=-6.04049&params=windDirection,windSpeed