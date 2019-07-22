(function() {
  'use strict';

  let data = [

    {
      date: 1563646464,
      temperature: {
        night: -1,
        day: 20,
      },
      cloudiness: 'облачно',
      snow: true,
      rain: true,
    },

    {
      date: 1563732864,
      temperature: {
        night: -4,
        day: 15,
      },
      cloudiness: 'облачно',
      snow: true,
      rain: false,
    },

    {
      date: 1563819264,
      temperature: {
        night: -2,
        day: 26,
      },
      cloudiness: 'облачно',
      snow: true,
      rain: false,
    },

    {
      date: 1563905664,
      temperature: {
        night: -2,
        day: 24,
      },
      cloudiness: 'облачно',
      snow: false,
      rain: false,
    },
    {
      date: 1563992064,
      temperature: {
        night: 18,
        day: 26,
      },
      cloudiness: 'облачно',
      snow: true,
      rain: true,
    },
    {
      date: 1564078464,
      temperature: {
        night: 21,
        day: 24,
      },
      cloudiness: 'ясно',
      snow: false,
      rain: false,
    },
    {
      date: 1564164864,
      temperature: {
        night: 19,
        day: 29,
      },
      cloudiness: 'облачно',
      snow: true,
      rain: true,
    },
    {
      date: 1564251264,
      temperature: {
        night: 21,
        day: 27,
      },
      cloudiness: 'облачно',
      snow: false,
      rain: true,
    },
  
  ];

  let currentCard = 0;

  // Функция для получения даты из timestamp
  function fGetDate(timestamp) {
    let date = new Date(timestamp * 1000);

    // Месяц
    const monthList = []
    monthList[0] = "Января";
    monthList[1] = "Февраля";
    monthList[2] = "Марта";
    monthList[3] = "Апреля";
    monthList[4] = "Мая";
    monthList[5] = "Июня";
    monthList[6] = "Июля";
    monthList[7] = "Августа";
    monthList[8] = "Сентября";
    monthList[9] = "Октября";
    monthList[10] = "Ноября";
    monthList[11] = "Декабря";
    let month = monthList[date.getMonth()];

    // День
    const weekday = [];
    weekday[0] = "Воскресенье";
    weekday[1] = "Понедельник";
    weekday[2] = "Вторник";
    weekday[3] = "Среда";
    weekday[4] = "Четверг";
    weekday[5] = "Пятница";
    weekday[6] = "Суббота";
    let day = weekday[date.getDay()];

    return {
      weekday: day,
      month: month,
      day: date.getDate()
    };
  }

  const wrappedElement = document.querySelector('.weather-wrap');

  // Итерируем
  data.map((el, index) => {

    let todayDate = fGetDate(Math.floor(Date.now() / 1000));

    // данные для карточек
    let current = data[index];
    let item = document.createElement('div');
    item.classList.add('weather-item');
    item.classList.add('swiper-slide');
    let curDate = fGetDate(current.date);
    let icon = '';
    let atmosphere = '';
    let temperatureDay = '';
    let temperatureNight = '';

    if (current.snow && current.rain) { // Если снег и дождь
      icon = `<i class="icon wi wi-night-snow-thunderstorm"></i>`;
      atmosphere = 'дождь со снегом';
    } else if (current.snow && !current.rain) { // Если снег
      icon = `<i class="icon wi wi-snow"></i>`;
      atmosphere = 'снег';
    } else if (!current.snow && current.rain) { // Если дождь
      icon = `<i class="icon wi wi-rain"></i>`;
      atmosphere = 'дождь';
    } else {
      if (current.cloudiness === 'облачно') { // Если нету дождя и снега
        icon = `<i class="icon wi wi-cloudy"></i>`;
        atmosphere = 'без осадков';
      } else { // Иначе солнечно
        icon = `<i class="icon wi wi-day-sunny"></i>`;
        atmosphere = 'без осадков';
      }
    }

    if (current.temperature.day > 0) { // если температура больше нуля, добавляем + к градусам
      temperatureDay = `+${current.temperature.day}`;
    } else {
      temperatureDay = `${current.temperature.day}`;
    }

    if (current.temperature.night > 0) {
      temperatureNight = `+${current.temperature.night}`;
    } else {
      temperatureNight = `${current.temperature.night}`;
    }

    if (todayDate.day === curDate.day && todayDate.month === curDate.month) {
      curDate.weekday = 'Сегодня';
      currentCard = index;
    }

    // В цикле формируем карточки с погодой
    item.innerHTML = `
            <div class="weekday">${curDate.weekday}</div>
            <div class="date">${curDate.day}  ${curDate.month}</div>
            <div class="icon-wrap">${icon}</div>
            <div class="weather-status">
                <div class="day">днем: ${temperatureDay} <sup>&deg;</sup> </div>
                <div class="night">ночью: ${temperatureNight} <sup>&deg;</sup> </div>
            </div>
            <div class="other">${current.cloudiness},</div>
            <div class="atmosphere">${atmosphere}</div>
            `;

    // вставляем их в елемент
    wrappedElement.appendChild(item);

  });

  let slider = new Swiper('.swiper-container', {
    speed: 400,
    spaceBetween: 0,
    slidesPerView: 3,
    initialSlide: currentCard,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Title
  let titleWidget = document.querySelector('.today'),
      todayDate = fGetDate(Math.floor(Date.now() / 1000));
  titleWidget.innerHTML = `Самара, ${todayDate.day} ${todayDate.month}, ${todayDate.weekday}`;

})();