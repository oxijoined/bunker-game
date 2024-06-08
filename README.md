### Обзор

Bunker Game — это интерактивная игра, которая сочетает голосовые подсказки и управление освещением для создания погружающего опыта. Приложение построено с использованием Chakra UI для фронтенда и Next.js для бэкенд-API. Оно интегрируется с платформой Yandex IoT для управления умными лампами, обеспечивая динамические световые эффекты в зависимости от состояния игры.

### Особенности

- **Голосовые подсказки**: Воспроизведение голосовых подсказок для каждого элемента игры.
- **Динамическое освещение**: Управление умными лампами для создания визуальных эффектов, усиливающих игровой опыт.
- **Таймер**: Встроенный таймер для игровых событий.
- **Выбор цвета**: Позволяет пользователям выбирать настраиваемые цвета освещения.
- **Адаптивный дизайн**: Построено с использованием Chakra UI для создания согласованного и адаптивного интерфейса.


### Протестированные устройства

Работоспособность проекта была проверена с следующими устройствами:

- [Лампочки Yandex (Yeelight): Полностью совместимы и работают без проблем. ](https://market.yandex.ru/product--umnaia-lampochka-yandex-e27-yndx-00018/1779441366?skuId=729256003&sku=729256003&uniqueId=860533)
- [Лампы Kojima: Поддерживаются и работают корректно.](https://www.ozon.ru/product/umnaya-svetodiodnaya-lampochka-rgb-e27-s-wi-fi-yandeks-alisoy-google-home-marusey-smart-bulb-15w-1220353323/)
- [Светодиодная лента Kojima: Поддерживается и работает корректно.](https://www.ozon.ru/product/umnaya-svetodiodnaya-lenta-rgb-s-yandeks-alisoy-marusey-google-home-wi-fi-smart-led-lightstrip-265833506/)
  
Не поддерживаются:

- Панели Yeelight Smart Light Panels: В текущей версии не работают, так как не принимают цвет в формате HSV. Это легко можно исправить, добавив поддержку формата цвета, который они принимают.

### Установка

1. Клонируйте репозиторий:
```
git clone https://github.com/oxijoined/bunker-game.git
cd bunker-game
```

2. Установите зависимости:

```
npm install
```

3. Настройте Yandex IoT:

Создайте файл config.json в корневом каталоге со следующим содержимым:
Либо воспользуйтесь config.json.example

```
{
  "YANDEX_OAUTH": "your_yandex_oauth_token",
  "YANDEX_LAMP_IDS": [
    "lamp_id_1",
    "lamp_id_2",
    ...
  ]
}
```

4. Запустите сервер

```
npm run dev
```

##### Откройте http://localhost:3000 в вашем браузере, чтобы увидеть результат.


### Сценарии использования

1. **Запуск игры**:
    - Выберите элемент игры из списка.
    - Начнется воспроизведение голосовой подсказки, и свет изменит цвет для создания атмосферы.

2. **Управление голосовыми подсказками**:
    - Используйте элементы управления для паузы, возобновления и пропуска голосовых подсказок.

3. **Управление освещением**:
    - Включайте и выключайте свет, изменяйте цвет с помощью цветовой палитры.

4. **Таймер**:
    - Используйте таймер для отслеживания времени в игре. Таймер можно приостановить, возобновить и сбросить.




# Вклад в проект
Вы можете форкнуть репозиторий и отправить pull запросы. Для значительных изменений сначала откройте issue для обсуждения предлагаемых изменений.

# Статус проекта

Этот проект находится на ранней стадии разработки. Он содержит множество ошибок и недоработок.

### Приложения не является официальным, создано исключительно в личных целях


- Все права на игру принадлежат издательству "Экономикус"