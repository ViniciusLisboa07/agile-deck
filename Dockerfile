# Dockerfile
FROM ruby:3.2

# Define environment variables para Docker
ENV RAILS_ENV=development \
    NODE_ENV=development

# Instalar dependências de sistema
RUN apt-get update -qq && apt-get install -y \
    build-essential \
    libpq-dev \
    nodejs \
    curl \
    postgresql-client \
    vim

# Instalar Yarn e npm
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn

# Definir o diretório de trabalho no container
WORKDIR /app

# Instalar bundler
RUN gem install bundler

# Copiar Gemfile e Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Instalar gems
RUN bundle install

# Copiar código da aplicação para o container
COPY . ./

# Precompilar assets para produção (opcional)
# RUN bundle exec rails assets:precompile

# Expor a porta para o servidor Rails
EXPOSE 3000

# Iniciar o servidor Rails
CMD ["bin/rails", "server", "-b", "0.0.0.0"]
