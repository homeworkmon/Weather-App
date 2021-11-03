const cityName = document.getElementById('city-display');
const caption = document.getElementById('caption');
const icon = document.querySelector('.icon');

function caseTitle(word) {
  word = word.toLowerCase();
  word = word.split(' ');
  const formatWord = [];
  word.forEach((w) => formatWord.push(w.charAt(0).toUpperCase() + w.slice(1)));
  return formatWord.join(' ');
}

function displayController(city, country, conditions, temp) {
  // update city name in display
  cityName.textContent = `${caseTitle(city)}, ${country}`;

  icon.classList.remove(icon.classList[3]);
  if (conditions <= 599) {
    caption.textContent = 'bring umbrella';
    icon.classList.add('fa-umbrella');
  } else if (conditions >= 600 && conditions <= 699) {
    caption.textContent = 'wear boots and winter jacket!';
    icon.classList.add('fa-mitten');
  } else if (conditions >= 702 && conditions <= 799) {
    caption.textContent = 'wrap up for dust/air quality';
    icon.classList.add('fa-head-side-mask');
  } else if (conditions >= 800 || conditions == 701) {
    if (temp <= 40 && temp >= 25) {
      caption.textContent = 'bring water, it\'s hot!';
      icon.classList.add('fa-tint');
    } else if (temp <= 25 && temp >= 15) {
      caption.textContent = 'beautiful T-shirt weather';
      icon.classList.add('fa-tshirt');
    } else if (temp <= 15 && temp >= 10) {
      caption.textContent = 'it\'s sweater weather!';
      icon.classList.add('fa-coffee');
    } else if (temp <= 10 && temp >= 0) {
      caption.textContent = 'bring a warm jacket!';
      icon.classList.add('fa-tree');
    } else if (temp <= 0 && temp >= -10) {
      caption.textContent = 'winter jacket time!';
      icon.classList.add('fa-icicles');
    } else {
      caption.textContent = 'gloves, hat, scarf and winter jacket necessary!';
      icon.classList.add('fa-temperature-low');
    }
  }
}

function errorDisplay() {
  cityName.textContent = 'city not found';
  icon.classList.remove(icon.classList[3]);
  icon.classList.add('fa-question-circle');
  caption.textContent = 'please try again';
}

async function loadWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=951032efd2271902d5d36265a470b326`, { mode: 'cors' });
    const currentWeather = await response.json();
    const conditions = currentWeather.weather[0].id;
    const temp = currentWeather.main.feels_like;
    const { country } = currentWeather.sys;
    displayController(city, country, conditions, temp);
  } catch (error) {
    errorDisplay();
  }
}

const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = document.getElementById('city').value;
  loadWeather(query);
  form.reset();
});
