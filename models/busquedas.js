const fs = require('fs');

const axios = require('axios');

class Busquedas{

  historial = [];
  dbPath = './db/database.json';

  constructor(){
    //TODO: leer DB si existe
    this.leerDB();
  }

  get historialCapitalizado(){
    //capitalizar -> cada palabra en mayuscula
    return this.historial.map( lugar => {
      let palabras = lugar.split(' ');
      palabras = palabras.map( palabra => palabra[0].toUpperCase() + palabra.substring(1));
      return palabras.join(' ');
    })
  }

  get paramsMapbox(){
    return {
        'access_token': process.env.MAPBOX_KEY,
        // 'country': 'ar',
        'limit': 5,
        'language': 'es'
    }
  }

  async ciudad ( lugar = ''){
    
    try {
      //peticion http
      const intance = axios.create({
        baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
        params:this.paramsMapbox
      });

      const resp = await intance.get();
      return resp.data.features.map( lugar => ({ // poner ({}) indica que voy a retornoar un objeto
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));



    } catch (error) {
      return []; //si surge algún err, retorno el array vacio como si no se econtró nada
      
    }
    
  }

  get paramsOpenWeather(){
    return {
      'appid': process.env.OPENWEATHER_KEY,
      'units': 'metric',
      'lang': 'es'
    }
  }

  async climaLugar ( lat, lon ){
    try {
      //instance axios.create()
      const intance = axios.create({
        baseURL:`https://api.openweathermap.org/data/2.5/weather`,
        params: {...this.paramsOpenWeather, lat, lon}
      });

      const resp = await intance.get();
      //con la respuesta estraer la data => resp.data
      const { weather, main } = resp.data;
      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  agregarHistorial ( lugar = ''){
    //TODO: Prevenir duplicados
    if ( this.historial.includes( lugar.toLocaleLowerCase() ) ){
      return;
    }
    //Para mantener un historial de solo 6 lugares
    this.historial = this.historial.splice(0,5);

    this.historial.unshift( lugar.toLocaleLowerCase() );

    //grabar en db
    this.guardarDB();
  }

  guardarDB(){
    const payload = {
      historial: this.historial
    };

    fs.writeFileSync (this.dbPath, JSON.stringify( payload ));
  }

  leerDB(){
    //Debe existir...
    if ( !fs.existsSync( this.dbPath )) return;

    const info = fs.readFileSync( this.dbPath, {encoding: 'utf-8'} );
    //como info regresa como string lo parseo a JSON
    const data = JSON.parse( info );

    this.historial = data.historial;
  }

}

module.exports = Busquedas;