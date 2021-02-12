Listado de Endopints:

|Id|Method|Path|Description|
|---|---|---|---|
|1|Get|'/'|Home con la busqueda de lugar y donde se muestra la información del tiempo del luegar buscado.|
|2|Get|'/acceso'|Formulario de login.|
|3|Post|'/acceso'|Login de un usuario.|
|4|Get|'/registro'|Formulario de registro.|
|5|Post|'/registro'|Guarda en la DB un usuario.|
|6|Get|'/mis-favoritos'|Muestra la lista de mis lugares favoritos, y la información del tiempo del luagr seleccionado.|
|7|Post|'/mis-favoritos/:id'|Elimina de tus favoritos el lugar con el Id asignado.|
|8|Get|'/lugar/:id'|Página de los detalles del lugar con el Id asignado, incluido el tiempo, fotos, comentarios, etc.|
|9|Post|'/lugar/:id'|Edición de los detalles del lugar con el Id asignado (agregar fotos, comentarios, etc.)|
|10|Get|'/lugares'|Lista de lugares que los usuarios tienen de favorito|