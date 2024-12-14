# Указываем базовый образ Node.js
FROM node:20-alpine
LABEL authors="narmatoff"

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /catalog-bot

# Копируем файл package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем все остальные файлы и папки в рабочую директорию контейнера
COPY . .

RUN apk add --no-cache openssl1.1-compat
# Сборка приложения
RUN npm run build

# Указываем команду по умолчанию для запуска приложения
CMD ["npm", "run", "start:prod"]

# Открываем порт, на котором будет работать приложение
EXPOSE 3001
