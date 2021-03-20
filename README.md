<h1 align="center">Welcome to MarMont</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> App dedicated to adventurers and athletes, where anyone can fetch detailed weather (including wave and snow conditions) for any coordinates in the globe, save as favourite, browse other users' favourite spots and leave comments about their experiences.

Built using <code>Express.js</code> and <code>Node.js</code>, the app connects with <code>Stormglass</code> and <code>Google Maps</code> APIs though <code>Axios</code>. User, places and comments DBs stored in <code>MongoDB Atlas</code> and templating made with <code>Handlebars</code>.

App can be accessed in the link below👇

&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [MarMont](https://marmontapp.herokuapp.com/)

<br/>

## Endpoints Table

|Id|Method|Path|Description|
|---|---|---|---|
|1|Get|'/'|Index page displaying a map that allows the user to search for a place, by either using the input or clicking in the map, that then displays its detailed weather|
|2|Get|'/contacto'|Contact form.|
|3|Post|'/contacto'|Sends contact form.|
|4|Get|'/acceso'|User login form.|
|5|Post|'/acceso'|Logs in user.|
|6|Get|'/registro'|Signup form.|
|7|Post|'/registro'|Saves registered user in the DB.|
|8|Get|'/area-personal/mis-lugares'|List of my favourite spots.|
|9|Get|'/area-personal/editar'|User info edit form.|
|10|Post|'/area-personal/editar'|Save user info in the DB.|
|11|Get|'/area-personal/agregar-lugar/:_id'|Save place to user favourites by Id.|
|12|Post|'/area-personal/eliminar-lugar/:_id'|Delete place from user favourites by Id.|
|13|Get|'/lugares-comunes'|List of places added to favourites by registered users of the app.|
|14|Get|'/lugares-comunes/:name'|Place page displaying detailed weather and comments.|
|15|Get|'/lugares-comunes/:id/nuevo-comentario'|Add new comment in the place page.|
|16|Post|'/api'|By clicking the map, coordinates are sent to Stormglass to fetch the weather data, and then weather table is displayed.|
|17|Put|'/api'|Save searched place to user favourites.|
|18|Post|'/api/user-places'|Display detailed weather from the selected place from users' favourites list.|
|19|Get|'/api/:location'|Same as endpoint #16 but place is searched by input.|
|20|Get|'/cerrar-sesion'|Session logout and redirect to the index page.|

<br/>
<hr>
<br/>

## Authors

<br/>

👤 **Alejandro Caballero**

* Github: [@Atreyu777](https://github.com/Atreyu777)
* LinkedIn: [@alejandro-caballero](https://linkedin.com/in/alejandro-caballero-15946a1ba)

👤 **Jaime Fernández-Castaño**

* Github: [@jaimeferncast](https://github.com/jaimeferncast)
* LinkedIn: [@jaimeferncast](https://linkedin.com/in/jaimeferncast)