FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY . /usr/share/nginx/html/
RUN mv /usr/share/nginx/html/start.html /usr/share/nginx/html/index.html
EXPOSE 80
