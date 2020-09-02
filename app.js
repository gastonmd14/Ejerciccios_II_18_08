const http = require('http');
const fs = require('fs');

const movies = require('./movies');
const faqs = require('./faqs');
const theaters = require('./theaters');

let totalDePeliculas = movies.length;
let listadoDePeliculas = [];

function casa() {
    for (let dato1 in movies) {
        movies.sort(function (a, b) {
            if (a.title > b.title) {
              return 1;
            }
            if (a.title < b.title) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
    listadoDePeliculas.push('<br/></br>' + dato1 + '. ' + movies[dato1].title);
    }    
}
casa();

let tituloResena = [];
function enCartelera () {
  for (let dato2 in movies) {
    tituloResena.push('<br/></br>' + dato2 + '. ' + movies[dato2].title + '<br/></br>' + movies[dato2].overview);
  }
}
enCartelera();                

var contar = 0;
var voteRate = 0;
let tituloRatingResena = [];
function masVotadas() {
  for (let i in movies) {
    if(movies[i].vote_average >= 7) {
      contar += movies[i].vote_average;
      voteRate++;
      tituloRatingResena.push('<br/></br>' + i + '. ' + movies[i].title + '<br/></br>' + 'Rating: ' +movies[i].vote_average + '<br/></br>' + movies[i].overview);
    };
  };
  return Math.round(contar);
};
masVotadas();

let salas = [];
let sumasalas = 0;
function sucursales() {
  for (let i in theaters) {
    sumasalas += theaters[i].total_rooms;
    salas.push('<br/></br>' + theaters[i].name + '<br/></br>' + 'Direcion: ' +theaters[i].address + '<br/></br>' + theaters[i].description);
  };
};
sucursales();

let sumafqas = 0;
let listadofqas = [];
function preguntasFrequentes() {
  for (let i in faqs) {
    if(faqs[i].faq_title) {
      sumafqas++;
    }
    listadofqas.push('<br/></br>' + faqs[i].faq_title + '<br/></br>' + faqs[i].faq_answer);
  };
};
preguntasFrequentes();

// Servidor
http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	
	// Route System
	switch (req.url) {
		// Home
		case '/': 
            res.end(`
                        ​Bienvenidos a DH Movies el mejor sitio para encontrar las mejores 
                        películas, incluso mucho mejor que Netflix, Cuevana y PopCorn​.
                        </br>
                        </br>
                        Total de películas en cartelera​: ​${totalDePeliculas}
                        </br>
                        </br>
                        Listados de películas ${listadoDePeliculas}
                        </br>
                        </br>
                        ​Recordá que podés visitar las secciones:
                        <br/></br><a href="http://localhost:3030/en-cartelera">en-cartelera</a>
                        <br/></br><a href="http://localhost:3030/mas-votadas">mas-votadas</a>
                        <br/></br><a href="http://localhost:3030/sucursales">sucursales</a>
                        <br/></br><a href="http://localhost:3030/contacto">contacto</a>
                        <br/></br><a href="http://localhost:3030/preguntas-frecuentes">preguntas-frecuentes</a>
                `);
			break;
		// En cartelera
		case '/en-cartelera':
            res.end( ` 
                    ​En Cartelera
                    <br/></br>
                    Total de películas​: ​${totalDePeliculas}
                    <br/></br>
                    Listados de películas 
                    ​${tituloResena}
                `);
			break;
		case '/mas-votadas':
            res.end(`
                        Más Votadas
                        <br/></br>
                        Total de películas​: ${voteRate}
                        <br/></br>
                        Rating promedio: ${contar}
                        <br/></br>
                        Listados de películas: ${tituloRatingResena}
                    `);
			break;
		case '/sucursales':
            res.end(`
                        ​Nuestras Salas.
                        <br/></br>
                        Total de salas​: ​${sumasalas}
                        <br/></br>
                        Listados de salas ​            
                        ${salas}
            `);
			break;
		case '/contacto':
            res.end(`
                        ​Contáctanos.
                        <br/></br>
                        ​¿Tenés algo para contarnos? 
                        <br/></br>
                        Nos encanta escuchar a nuestros
                        clientes. Si deseas contactarnos podés escribirnos al siguiente email:
                        dhmovies@digitalhouse.com o en las redes sociales. 
                        <br/></br>
                        Envianos tu consulta, sugerencia o reclamo y será respondido a la brevedad posible. 
                        <br/></br>
                        Recordá que también podes consultar la sección de Preguntas Frecuentes para obtener respuestas inmediatas a los problemas más comunes.
            `);
			break;
		case '/preguntas-frecuentes':
            res.end(`
                        ​Preguntas Frecuentes.
                        <br/></br>
                        Total de preguntas​: ​${sumafqas}
                        <br/></br>
                        Listados de preguntas
                        ${listadofqas}
            `);
			break;
		default:
			res.end('404 not found')
	}
}).listen(3030, 'localhost', () => console.log('Server running in 3030 port'));