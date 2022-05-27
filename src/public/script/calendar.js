const dateList = document.querySelector(".dates");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const currentMonthYear = document.querySelector(".current-month-year");

let date = new Date();
const TOTAL_DAYS_VISIBLE = 42;
const MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

function createCalendar(date) {
  const prev = getLastDate(date.getFullYear(), date.getMonth(), true);
  const curr = getLastDate(date.getFullYear(), date.getMonth() + 1);
  const next = TOTAL_DAYS_VISIBLE - (prev.days + curr);

  dateList.innerHTML = "";

  for (let i = prev.date - prev.days + 1; i <= prev.date; i++) {
    dateList.innerHTML += `
      <li class="date">${i}</li>
    `;
  }

  for (let i = 1; i <= curr; i++) {
    if (date.getDate() === i) {
      dateList.innerHTML += `
        <li class="date current today">${i}</li>
      `;
    } else {
      dateList.innerHTML += `
        <li class="date current">${i}</li>
      `;
    }
  }

  for (let i = 1; i <= next; i++) {
    dateList.innerHTML += `
      <li class="date">${i}</li>
    `;
  }

  currentMonthYear.innerText = `${
    MONTHS[date.getMonth()]
  }, ${date.getFullYear()}`;
}

function prevMonth() {
  date = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());

  createCalendar(date);
}

function nextMonth() {
  date = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());

  createCalendar(date);
}

function getLastDate(year, month, withDay = false) {
  if (withDay) {
    return {
      date: new Date(year, month, 0).getDate(),
      days: new Date(year, month, 0).getDay(),
    };
  }

  return new Date(year, month, 0).getDate();
}

document.addEventListener("DOMContentLoaded", () => createCalendar(date));
