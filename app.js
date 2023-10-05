let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

//evento al boton siguiente
btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
	}
});

//evento al boton anterior
btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
});

//crear una funcion asincrona, esto te permite usar el await
const cargarPeliculas = async() => {
    //try si es correcta la comunicacion con la API-servidor
	try {
        //crear una variable respuesta, que es el resultado a la peticion fetch (url)
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);
	
		console.log(respuesta);

		// Comprobar si la respuesta es correcta
		if(respuesta.status === 200){
            //guardar en datos, la respuesta en formato json
			const datos = await respuesta.json();
			
			let peliculas = '';
			datos.results.forEach(pelicula => {
				peliculas += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
				`;
			});

			document.getElementById('contenedor').innerHTML = peliculas;
        //si, respuesta en incorrecta
		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');

        //si, respuesta en incorrecta
		} else if(respuesta.status === 404){
			console.log('La pelicula que buscas no existe');
        
        //sino es ninguno de esos estados
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

    //catch, si da un error la conexion
	} catch(error){
		console.log(error);
	}

}

cargarPeliculas();