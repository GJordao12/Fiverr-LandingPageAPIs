// ############# MAP JSON FILE ###############

const turma_result_map = document.getElementById('turma_result_map');

fetch('./database/elementosTurma.json')
    .then((res) => res.json())
    .then((data) => {
        turma_result_map.innerHTML =
            '<div class="section-card">' +
            data.map((data) => {
                return `<div class="card-turma" key=${data.id}> 
            <img src=${data.image} /> 
            <h4>${data.nome}</h4> 
            <h4>Nº ${data.numero}</h4> 
            <h4>${data.curso}</h4>
            <p>${data.desc}</p> 
          </div>`;
            })
            .join('') +
            '</div>';
    });

// ############# EXTERNAL API'S ###############

// ######  Movies API   ########

const apiUrl =
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI =
    'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// #  Loop and Render   #

showMovies(apiUrl);

function showMovies(url) {
    fetch(url)
        .then((res) => res.json())
        .then(function(data) {
            data.results.forEach((element) => {
                const el = document.createElement('div');
                const image = document.createElement('img');
                const text = document.createElement('h2');

                text.innerHTML = `${element.title}`;
                image.src = IMGPATH + element.poster_path;
                el.appendChild(image);
                el.appendChild(text);
                main.appendChild(el);
            });
        });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    main.innerHTML = '';

    const searchTerm = search.value;

    if (searchTerm) {
        showMovies(SEARCHAPI + searchTerm);
        search.value = '';
    }
});

// ######  Food API   ########

const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

get_meal_btn.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((res) => res.json())
        .then((res) => {
            createMeal(res.meals[0]);
        });
});

const createMeal = (meal) => {
        const ingredients = [];
        // Get all ingredients from the object. Up to 20
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients.push(
                        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // Stop if no more ingredients
      break;
    }
  }

  const newInnerHTML = `
		<div>
			<div>
				<img src="${meal.strMealThumb}" alt="Imagem Comida">
				${
          meal.strCategory
            ? `<p><strong>Categoria:</strong> ${meal.strCategory}</p>`
            : ''
        }
				${meal.strArea ? `<p><strong>Origem:</strong> ${meal.strArea}</p>` : ''}
				${
          meal.strTags
            ? `<p><strong>Tags:</strong> ${meal.strTags
                .split(',')
                .join(', ')}</p>`
            : ''
        }
				<h5>Ingredientes:</h5>
				<ul>
					${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>
			<div>
				<h4>${meal.strMeal}</h4>
				<p>${meal.strInstructions}</p>
			</div>
		</div>
		${
      meal.strYoutube
        ? `
		<div>
			<h5>Receita em Video</h5>
			<div>
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>`
        : ''
    }
	`;

  meal_container.innerHTML = newInnerHTML;
};

// ######  Header   ########
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);
navLink.forEach(n => n.addEventListener("click", closeMenu));

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}
