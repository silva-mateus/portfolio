# Usar Nginx Alpine (leve e seguro)
FROM nginx:alpine

# Copiar arquivos do portfólio para o Nginx
COPY . /usr/share/nginx/html

# Copiar configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta 80
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Nginx já roda automaticamente como CMD