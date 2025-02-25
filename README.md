# Agile Deck 🃏

Agile Deck é uma aplicação de **Planning Poker** colaborativo, onde equipes podem criar salas, votar em estimativas e revelar os votos simultaneamente.

## Tecnologias Utilizadas

- **Ruby on Rails 8** (Turbo com Hotwire e Stimulus)
- **PostgreSQL** (Banco de dados)
- **Stimulus.js** (Gerenciamento da interface)
- **Importmap** (Para gestão de dependências frontend)
- **Tailwind CSS** (Estilização)
- **WebSockets (ActionCable)** (Para atualização em tempo real)
- **Docker** (Ambiente de desenvolvimento conteinerizado)

## Funcionalidades

- **Criação de salas** de votação em tempo real.
- **Usuários podem votar** e ver o status dos votos.
- **Indicação visual** de quem já votou.
- **Revelação dos votos** para todos os participantes após uma contagem regressiva.
- **Efeito de confetes** ao revelar os votos.
- **Botão para iniciar um novo round**, sem precisar atualizar a página.

## Demo
![Demo](https://github.com/ViniciusLisboa07/agile-deck/blob/main/2025-02-2423-25-22-ezgif.com-video-to-gif-converter.gif)

## Instalação e Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/agile-deck.git
   cd agile-deck
   ```

2. Instale as dependências:
   ```bash
   bundle install
   bin/rails importmap:install # Caso precise configurar o Importmap
   ```

3. Configure o banco de dados:
   ```bash
   bin/rails db:create db:migrate db:seed
   ```

4. Inicie o servidor:
   ```bash
   bin/dev
   ```

5. Abra no navegador:
   ```
   http://localhost:3000
   ```

## Uso

1. Acesse a página inicial e crie uma nova sala.
2. Compartilhe o link da sala com os participantes.
3. Cada participante seleciona um cartão para votar.
4. Quando todos tiverem votado, clique em "Revelar Votos".
5. Após a revelação, inicie um novo round para recomeçar a votação.


## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o repositório.
2. Crie uma branch:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça suas alterações e commit:
   ```bash
   git commit -m "Minha contribuição"
   ```
4. Envie sua branch:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request no GitHub.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

