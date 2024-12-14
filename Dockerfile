# Dockerfile
FROM ruby:3.2

# Define environment variables for Docker
ENV RAILS_ENV=development \
    NODE_ENV=development

# Install system dependencies
RUN apt-get update -qq && apt-get install -y \
    build-essential \
    libpq-dev \
    nodejs \
    yarn \
    postgresql-client \
    vim

# Set working directory in container
WORKDIR /app

# Install bundler
RUN gem install bundler

# Copy Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install gems
RUN bundle install

# Copy application code to container
COPY . ./

# Precompile assets for production (optional)
RUN bundle exec rails assets:precompile

# Expose port for Rails server
EXPOSE 3000

# Start Rails server
CMD ["bin/rails", "server", "-b", "0.0.0.0"]
