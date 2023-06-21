setTimeout(() => {
    const get_meal_btn = document.getElementById("btn-aleatorio");
    const container_meals_div = document.getElementById("container_meals");
    const nombre_comida_label = document.getElementById("nombre_comida");
    const imagen = document.getElementById("imagenComida");
    const descripcion1 = document.getElementById("descripcion");
    const ingredientes = [];
    const ingredientes_contenedor = document.getElementById("ingredientes_contenedor")
    const video = document.getElementById("video");
    

    get_meal_btn.addEventListener("click",() =>{
        //ingredientes_contenedor.innerHTML = '';
        
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(res => {
            createMeal(res.meals[0]);
        })
        .catch(e => {
            console.warn(e);
        });
    });
    
    function createMeal(meal){
        nombre_comida_label.innerHTML = meal.strMeal;
        //categoria_comida_label.innerHTML = meal.strCategory;
        imagen.src = (meal.strMealThumb);
        imagen.height = 400;
        imagen.width = 400;
        descripcion1.innerHTML = meal.strInstructions;

        while (ingredientes.firstChild) {
            ingredientes.removeChild(ingredientes.firstChild);
          }

        ingredientes_contenedor.innerHTML = '<h5>Ingredients:</h5>';

        for(let i=1; i<20; i++){
            if(meal[`strIngredient${i}`]){
                ingredientes.push(
                    `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
                );
            } else{
                break;
            }
        }
         ingredientes.forEach(ingredientes => { 
              const li = document.createElement('li');
              li.textContent = ingredientes;
              ingredientes_contenedor.appendChild(li);
            
           });
        
        video.src = `https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}`;

    }

    

  }, "1000");
