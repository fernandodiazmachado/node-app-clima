require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


console.clear();

const main = async ()=>{
  let opt = '';
  const busquedas = new Busquedas();

  do {
    opt = await inquirerMenu();

    switch(opt){
      case 1:
        //mostrar mensaje para que escriba
        const termino = await leerInput('Ciudad: ');
        
        //buscar los lugares
        const lugares = await busquedas.ciudad( termino );
        
        //seleccionar el lugar
        const id = await listarLugares( lugares );

        //si selecciono 0 (salir), salgo del flujo
        if ( id === '0' ) continue;

        
        const lugarSelec = lugares.find( l => l.id === id );

        //Guardar en DB
        busquedas.agregarHistorial( lugarSelec.nombre );

        //datos del clima
        const clima = await busquedas.climaLugar( lugarSelec.lat , lugarSelec.lng);
        //mostrar resultados
        console.clear();
        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad:', lugarSelec.nombre.green);
        console.log('Lat:', lugarSelec.lat);
        console.log('Lng:', lugarSelec.lng);
        console.log('Temperatura:', clima.temp);
        console.log('Min:', clima.min);
        console.log('Max:', clima.max);
        console.log('Como está el clima:', clima.desc.green);
        break;
      case 2:
        busquedas.historialCapitalizado.forEach ( (lugar,i) => {
          const idx = `${i+1}.`.green;
          console.log(`${idx} ${lugar}`);
        });
        break;
    }

    if (opt !==0 ) await pausa();

  } while (opt !== 0);
  
}

main();