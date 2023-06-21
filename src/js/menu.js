//Botón 
document.getElementById("searchButton").addEventListener("click", function() {
    var searchTerm = document.getElementById("searchInput").value;
    buscarComidasPorNombre(searchTerm);
  });
//API
  function buscarComidasPorNombre(nombre) {
    var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + nombre;
    
// para realizar una solicitud HTTP a esa URl

    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        mostrarResultados(data.meals);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function mostrarResultados(resultados) {
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
   
    if (resultados === null) {
      var mensaje = document.createElement("p");
      mensaje.textContent = "No se encontraron resultados.";
      resultsDiv.appendChild(mensaje);
      return;
    }
//var declara una variable 
//llamar cada uno de los metodos(elementos)
    resultados.forEach(function(comida) {
      var nombre = comida.strMeal;
      var imagen = comida.strMealThumb;
      var video = comida.strYoutube;
      var ingredientes = obtenerIngredientes(comida);
      var instrucciones = comida.strInstructions;

      //createElement crea un nuevo elemento HTML especificado por el nombre de etiqueta
      var comidaDiv = document.createElement("div");

      var nombreH3 = document.createElement("h3");
      nombreH3.textContent = nombre;

      var imagenImg = document.createElement("img");
      imagenImg.src = imagen;
      imagenImg.alt = nombre;

      var videoIframe = document.createElement("iframe");
      videoIframe.src = video.replace("watch?v=", "embed/");
      videoIframe.width = "560";
      videoIframe.height = "315";

      var ingredientesP = document.createElement("p");
      ingredientesP.textContent = "Ingredientes: " + ingredientes;

      var instruccionesP = document.createElement("p");
      instruccionesP.textContent = "Instrucciones: " + instrucciones;
      //appendChild se utiliza para agregar un elemento como hijo de otro elemento.
      //comida se agregará como un elemento de encabezado 
      
      comidaDiv.appendChild(nombreH3);
      comidaDiv.appendChild(imagenImg);
      comidaDiv.appendChild(videoIframe);
      comidaDiv.appendChild(ingredientesP);
      comidaDiv.appendChild(instruccionesP);

      resultsDiv.appendChild(comidaDiv);
    });
  }
//extrae los ingredientes y medidas del objeto de comida y los concatena en una cadena de texto
  function obtenerIngredientes(comida) {
    var ingredientes = [];
    for (var i = 1; i <= 20; i++) {
      var ingrediente = comida["strIngredient" + i];
      var medida = comida["strMeasure" + i];

      if (ingrediente && ingrediente.trim() !== "") {
        ingredientes.push(medida + " " + ingrediente);
      }
    }
    return ingredientes.join(", ");
  }