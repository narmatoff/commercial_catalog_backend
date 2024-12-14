# Указываем базовый образ Node.js
FROM node:20-alpine
# Установить зависимости
RUN apt-get update && apt-get install -y \
    openssl \
    && rm -rf /var/lib/apt/lists/* \

LABEL authors="narmatoff"

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /catalog-bot

# Копируем файл package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем все остальные файлы и папки в рабочую директорию контейнера
COPY . .

# Сборка приложения
RUN npm run build

# Указываем команду по умолчанию для запуска приложения
CMD ["npm", "run", "start:prod"]

# Открываем порт, на котором будет работать приложение
EXPOSE 3001
