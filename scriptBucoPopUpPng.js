{/* <script>
  document.addEventListener('DOMContentLoaded', function() { // Ожидает загрузки DOM перед выполнением кода
      const pngBannerSrc = 'https://i.postimg.cc/cCBmrxt2/Pngtree-black-friday-sale-in-red-5581992.png'; // URL изображения баннера
      
      const bannerDiv = document.createElement('div'); // Создает контейнер <div> для баннера
      bannerDiv.id = 'discount-banner'; // Устанавливает ID контейнера для использования в CSS
      
      const imgElement = document.createElement('img'); // Создает элемент <img> для изображения
      imgElement.src = pngBannerSrc; // Устанавливает источник изображения
      imgElement.alt = 'Скидка на Чёрную Пятницу'; // Альтернативный текст для изображения
      imgElement.style.width = '100%'; // Устанавливает ширину изображения по ширине контейнера
      imgElement.style.height = 'auto'; // Высота подстраивается пропорционально ширине
      
      bannerDiv.appendChild(imgElement); // Вставляет изображение в контейнер <div>
      
      // Стили для позиционирования в правом верхнем углу
      bannerDiv.style.position = 'fixed'; // Фиксирует контейнер относительно окна
      bannerDiv.style.zIndex = '1000'; // Устанавливает приоритет отображения поверх других элементов
      bannerDiv.style.width = '300px'; // Фиксированная ширина контейнера
      bannerDiv.style.maxHeight = '100vh'; // Ограничивает высоту баннера высотой окна
      bannerDiv.style.overflow = 'hidden'; // Скрывает часть контента, если она превышает размеры контейнера
      bannerDiv.style.right = '20px'; // Располагает контейнер в правом углу с отступом 20px
      bannerDiv.style.top = '20px'; // Располагает контейнер в верхнем углу с отступом 20px
      
      document.body.appendChild(bannerDiv); // Добавляет баннер в конец <body>
  });
</script>

<style>
  #discount-banner {
    box-shadow: none; /* Отключает тень вокруг баннера */
    border-radius: 0; /* Убирает скругление углов */
    background-color: transparent; /* Устанавливает прозрачный фон */
    padding: 0; /* Убирает внутренние отступы */
  }

  @media (max-width: 768px) { /* Стили для планшетов и небольших экранов */
    #discount-banner {
      width: 250px; /* Уменьшает ширину баннера */
      max-height: calc(100vh - 20px); /* Ограничивает высоту экрана с учетом отступов */
      right: 10px; /* Уменьшает правый отступ */
      top: 10px; /* Уменьшает верхний отступ */
    }
    #discount-banner img {
      width: 100%; /* Подгоняет изображение по ширине контейнера */
      height: auto; /* Сохраняет пропорции */
    }
  }

  @media (max-width: 480px) { /* Стили для мобильных устройств */
    #discount-banner {
      width: 200px; /* Ещё больше уменьшает ширину баннера */
      max-height: calc(100vh - 10px); /* Устанавливает максимально допустимую высоту с учетом отступов */
      right: 10px; /* Правый отступ для маленьких экранов */
      top: 10px; /* Верхний отступ для маленьких экранов */
    }
    #discount-banner img {
      width: 100%; /* Изображение подстраивается под ширину контейнера */
      height: auto; /* Сохраняет пропорции изображения */
    }
  }
</style> */}









<script>
  document.addEventListener('DOMContentLoaded', function() {
      const pngBannerSrc = 'https://i.postimg.cc/d3YvmBHp/image-2024-11-27-19-19-09.png';
      
      const bannerDiv = document.createElement('div');
      bannerDiv.id = 'discount-banner';
      
      const imgElement = document.createElement('img');
      imgElement.src = pngBannerSrc; 
      imgElement.alt = 'Скидка на Чёрную Пятницу'; 
      imgElement.style.width = '100%'; 
      imgElement.style.height = 'auto'; 
      
      bannerDiv.appendChild(imgElement);
      
 
      bannerDiv.style.position = 'fixed';
      bannerDiv.style.zIndex = '1000';
      bannerDiv.style.width = '200px';
      bannerDiv.style.maxHeight = '100vh'; 
      bannerDiv.style.overflow = 'hidden'; 
      bannerDiv.style.right = '20px'; 
      bannerDiv.style.top = '1px'; 
      
      document.body.appendChild(bannerDiv);
  });
</script>

<style>
  #discount-banner {
    box-shadow: none; 
    border-radius: 0;  
    background-color: transparent; 
    padding: 0;
  }


  @media (max-width: 1024px) {
    #discount-banner {
      display: none;
    }
  }


  @media (max-width: 768px) {
    #discount-banner {
      display: none;
    }
  }


  @media (max-width: 480px) {
    #discount-banner {
      display: none;
    }
  }
</style>








// Чтобы работало с мобилкой,
//  но ломает добавление товаров на мобильных устройствах из-за всплывания корзины с правой стороны
<script>
  document.addEventListener('DOMContentLoaded', function() {
      const pngBannerSrc = 'https://i.postimg.cc/d3YvmBHp/image-2024-11-27-19-19-09.png';
      
      const bannerDiv = document.createElement('div');
      bannerDiv.id = 'discount-banner';
      
      const imgElement = document.createElement('img');
      imgElement.src = pngBannerSrc; 
      imgElement.alt = 'Скидка на Чёрную Пятницу'; 
      imgElement.style.width = '100%'; 
      imgElement.style.height = 'auto'; 
      
      bannerDiv.appendChild(imgElement);
      
 
      bannerDiv.style.position = 'fixed';
      bannerDiv.style.zIndex = '1000';
      bannerDiv.style.width = '150px';
      bannerDiv.style.maxHeight = '100vh'; 
      bannerDiv.style.overflow = 'hidden'; 
      bannerDiv.style.right = '15px'; 
      bannerDiv.style.top = '110px'; 
      
      document.body.appendChild(bannerDiv);
  });
</script>

<style>
  #discount-banner {
    box-shadow: none; 
    border-radius: 0;  
    background-color: transparent; 
    padding: 0;
  }

  @media (max-width: 768px) {
    #discount-banner {
      width: 100vw; /* Уменьшаем ширину баннера в 2 раза */
      height: 100vh; /* Увеличиваем высоту, чтобы изображение было видно */
      max-height: calc(100vh - 20px); 
      right: 15px; 
      top: 120px; /* Опускаем баннер ниже */
    }
    #discount-banner img {
      width: 100%;
      height: 100%; /* Обеспечиваем, чтобы изображение подстраивалось по высоте */
    }
  }

  @media (max-width: 480px) {
    #discount-banner {
      width: 100vw; /* Уменьшаем ширину баннера в 2 раза */
      height: 100vh; /* Увеличиваем высоту для мобильных устройств */
      max-height: calc(100vh - 10px);
      right: 15px; 
      top: 120px; /* Опускаем баннер еще ниже */
    }
    #discount-banner img {
      width: 100%;
      height: 100%; /* Обеспечиваем, чтобы изображение подстраивалось по высоте */
    }
  }
</style>