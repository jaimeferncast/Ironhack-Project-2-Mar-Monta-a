Listado de Endopints:

|Id|Method|Path|Description|
|---|---|---|---|
|1|Get|'/'|Home con la busqueda de lugar y donde se muestra la información del tiempo del luegar buscado.|
|2|Get|'/acceso'|Formulario de login.|
|3|Post|'/acceso'|Login de un usuario.|
|4|Get|'/registro'|Formulario de registro.|
|5|Post|'/registro'|Guarda en la DB un usuario.|
|6|Get|'/mi-perfil/favoritos'|Muestra la lista de mis lugares favoritos, y la información del tiempo del luagr seleccionado.|
|7|Post|'/mi-perfil/favoritos'|Elimina de tus favoritos el lugar con el Id asignado.|
|8|Get|'/mi-perfil/editar'|Página del formulario de edición de datos de usuario.|
|9|Post|'/mi-perfil/editar'|Guarda los cambios del perfil en la DB.|
|10|Get|'/lugares/:id'|Página de los detalles del lugar con el Id asignado, incluido el tiempo, fotos, comentarios, etc.|
|11|Post|'/lugares/:id'|Edición de los detalles del lugar con el Id asignado (agregar fotos, comentarios, etc.)|
|12|Get|'/lugares/favoritos'|Lista de lugares que los usuarios tienen de favorito.|
|13|Get|'/cerrar-sesion'|Cierra la sesión y te lleva la Home.|