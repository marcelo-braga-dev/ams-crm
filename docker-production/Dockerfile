# Usar uma imagem base PHP com extensões necessárias
FROM php:8.3-fpm

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip pdo pdo_mysql

# Definir o diretório de trabalho
WORKDIR /var/www

# Copiar apenas os arquivos de composer primeiro
COPY composer.json composer.lock ./

# Instalar dependências do composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    composer install --no-dev --optimize-autoloader

# Copiar o restante do código-fonte
COPY . .

# Configurar permissões
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Expor a porta do PHP-FPM
EXPOSE 9000

# Comando padrão
CMD ["php-fpm"]
