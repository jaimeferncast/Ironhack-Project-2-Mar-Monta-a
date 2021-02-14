class APIHandler {
  constructor(baseUrl) {
    this.app = axios.create({
      baseURL: baseUrl
    })
  }
  getWeather(lat, lng, params) {
    this.app.get(`point?lat=${lat}&lng=${lng}&params=${params}`)

  }
}