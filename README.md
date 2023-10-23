## [Демо](http://ylous.keenetic.link:4000)
### Стэк
+ Next.JS v13 - Фуллстэк фреймворк
+ Axios - Клиент для работы с HTTP запросами
+ BCrypt - Библиотека, для безопасного хранения паролей
+ MongoDB - Клиент для баз данных MongoDB
+ Next Auth - Фреймворк для аутентификации
+ React hook form - Библиотека для валидации ввода в формах
+ React icons - Библиотека, предоставляющая различные иконки

## Скриншоты
![](https://cdn.discordapp.com/attachments/1097213225482866710/1166055240638926901/image.png)
![](https://cdn.discordapp.com/attachments/1097213225482866710/1166055456872083506/image.png)
![](https://cdn.discordapp.com/attachments/1097213225482866710/1166055507098882139/image.png)
![](https://cdn.discordapp.com/attachments/1097213225482866710/1166055952215191692/image.png)

## Запуск проекта
### Локальный запуск
+ `git clone https://github.com/khokhden/giga-chat`
+ `cd giga-chat`
+ `npm i`
+ Создайте файл `.env` и введите информацию для работы сайта
```
MONGO=mongodb://admin:password@localhost/
DATABASE=gigachat
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=cc7e0d44fd473002f1c42167459111141ec6389c7353f8033f4d9a95f2f596f2
WEATHER_KEY=4613aff403msh4dbff29c7199483p119335jsn7e36718a78238
```
#### Локально
+ `npm run dev`
#### Продакшн
+ `npm run build`
+ `npm run start`
### Docker
> [!NOTE]
> Для быстрого запуска в 1 клик есть файл ./rebuild.sh, который перезапускает проект изолированно в Docker

> [!WARNING]
> Запуск через Docker устанавливает порт 4000 по умолчанию!
> 
+ `docker build -t some-image-name .`
+ `docker run -d -p 4000:4000 --name some-container-name some-image-name`

## План развития
- [x] Получение только нужных сообщений в рантайме
- [ ] Нативный скролл в чате, для полной поддержки на мобильных устройствах
- [ ] Получение истории чата