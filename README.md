# node-app-clima

## Contenido
1. [Descripcion de la aplicacion](#descripcion-de-la-aplicacion)
2. [Capturas de pantalla](#capturas-de-pantalla)

### Descripcion de la aplicacion
Es una aplicacion de consola realizada con NodeJS.
En la misma se realizan consultas a dos API: [Mapbox](https://mapbox.com/) y [OpenWeatherMap](https://openweathermap.org/api).

Las consultas a los endpoint se realizaron con: [Axios](https://www.npmjs.com/package/axios).

Utilizo Mapbox para obtener el lugar buscado, con sus coordenadas de latitud y longitud y OpenWeatherMap para obtener la temperatura del lugar, por medio de sus coordenadas.

Ambas API necesitan Token de autorización para utilizar el programa.
Los Token se cargan en el arcivo .env (renombrar el archivo example.env).

#### En la misma se puede
1. Buscar una ciudad para consultar su temperatura.
2. Consultar el hirtorial de las consultas.


### Capturas de pantalla
#### Menu
![menu.JPG](./img/menu.JPG)
#### Buscar Ciudad
![menu.JPG](./img/buscar_ciudad.JPG)
#### Información de la ciudad
![menu.JPG](./img/informacion_ciudad.JPG)
#### Historial
![menu.JPG](./img/historial.JPG)
