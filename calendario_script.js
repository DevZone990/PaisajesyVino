const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const calendar = document.querySelector('.calendar');
const dateDisplay = document.querySelector('.date');
const daysContainer = document.querySelector('.days');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentDate = new Date();
let reservedDates = [];

// Cargar las fechas reservadas del localStorage
const storedReservedDates = localStorage.getItem('reservedDates');
if (storedReservedDates) {
  reservedDates = JSON.parse(storedReservedDates);
}

function saveReservedDates() {
  localStorage.setItem('reservedDates', JSON.stringify(reservedDates));
}

function isDateReserved(date) {
  const dateString = date.toDateString();
  return reservedDates.includes(dateString);
}

function reserveDate(date) {
  const dateString = date.toDateString();
  if (!reservedDates.includes(dateString)) {
    reservedDates.push(dateString);
    saveReservedDates();
  }
}

function generateCalendar() {
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  dateDisplay.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  daysContainer.innerHTML = '';

  for (let i = 0; i < firstDay.getDay(); i++) {
    const emptyDay = document.createElement('div');
    emptyDay.classList.add('day');
    daysContainer.appendChild(emptyDay);
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const day = document.createElement('div');
    day.classList.add('day');
    day.textContent = i;

    const currentDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);

    if (isDateReserved(currentDateObj)) {
      day.classList.add('reserved');
      day.classList.add('disabled');
    } else {
      day.addEventListener('click', () => {
        reserveDate(currentDateObj);
        day.classList.add('reserved');
        day.classList.add('disabled');
        day.removeEventListener('click');
        alert(`Reservaste el día ${i} de ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`);
      });
    }

    daysContainer.appendChild(day);
  }
}

prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar();
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar();
});

generateCalendar();
