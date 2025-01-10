# שלב הבנייה
FROM node:16 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# שלב ההפצה
FROM nginx:alpine

# העתקת קובץ ההגדרות של nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# העתקת קבצי הבנייה
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]