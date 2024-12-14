# Указываем базовый образ Node.js
FROM node:20-alpine
LABEL authors="narmatoff"

#установка зависимости openssl
RUN apk add --no-cache openssl

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
