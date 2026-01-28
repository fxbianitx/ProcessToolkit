FROM php:8.2-apache

# ===============================
# 1. Dependencias del sistema
# ===============================
RUN apt-get update && apt-get install -y \
    git curl unzip zip gnupg2 \
    libpng-dev libonig-dev libxml2-dev libzip-dev libicu-dev \
    unixodbc unixodbc-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# ===============================
# 2. Repositorio Microsoft + ODBC
# ===============================
RUN curl -fsSL https://packages.microsoft.com/keys/microsoft.asc \
    | gpg --dearmor -o /usr/share/keyrings/microsoft-prod.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/microsoft-prod.gpg] https://packages.microsoft.com/debian/12/prod bookworm main" \
    > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y msodbcsql18 mssql-tools18

# ===============================
# 3. Extensiones PHP
# ===============================
RUN docker-php-ext-install \
    mbstring bcmath intl zip gd

RUN pecl install sqlsrv pdo_sqlsrv redis \
    && docker-php-ext-enable sqlsrv pdo_sqlsrv redis

# ===============================
# 4. Apache → public
# ===============================
RUN sed -i 's|/var/www/html|/var/www/html/public|g' \
    /etc/apache2/sites-available/000-default.conf \
    /etc/apache2/apache2.conf

RUN a2enmod rewrite

# ===============================
# 5. Composer
# ===============================
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
