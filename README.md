<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <p className='body' style={{ textAlign: "justify" }} >
        Landing-Page e Formulário de inscrição da Maratona de Programação - 2023
        </p>
       
  <h2>Desenvolvedores:</h2>
  <ul>
    <li>David Emmanoel Lopes Rocha (Back-end/Front-end), Responsável pelo formulário - <a href="https://www.instagram.com/davidemmannoel/">@davidemmannoel</a></li>
    <li>Elison Martins de Melo (Front-end), Responsável pela Landing-Page - <a href="https://www.instagram.com/elison_mrtns/">@elison_mrtns
    

</a></li>
  </ul>
  <h2>Tecnologias utilizadas</h2>
  <ul>
    <li>Node.js</li>
    <li>Docker</li>
    <li>React</li>
    <li>Prisma</li>
    <li>JavaScript</li>
    <li>Express</li>
    <li>Axios</li>
    <li>PostgreSQL</li>
  </ul>
  
  <h2>Como usar</h2>
  <p>Para roda a plataforma localmente na sua máquina, você precisará clonar o repositório e instalar as dependências:</p>
  <pre><code>git clone https://github.com/seu-usuario/powerup.git
npm install
  </code></pre>
  
  <p>Em seguida, você precisará configurar as variáveis de ambiente:</p>
  <pre><code>cp .env.example .env
  </code></pre>
  
  <p>Edite o arquivo <code>.env</code> para fornecer as informações necessárias, como as credenciais do banco de dados.</p>
  <p>Para rodar a aplicação, você precisará ter o Docker e o Docker Compose instalados em sua máquina.</p>
<ol>
  <li>Navegue até a pasta raiz do projeto</li>
  <li>Execute o seguinte comando no terminal: <code>docker-compose up -d</code></li>
  <li>Aguarde alguns minutos até que os containers sejam iniciados</li>
</ol>
  
  <p>Por fim, execute o comando para iniciar o servidor no back-end:</p>
  <pre><code>npm run dev
  </code></pre>
  <p>Execute para rodar o front-end:</p>
  <pre><code>npm run dev
  </code></pre>
  
  <p>A aplicação estará disponível em <a href="http://localhost:3000">http://localhost:5173</a>.</p>
  
  <h2>Licença</h2>
  <p>Este projeto está licenciado sob a <a href="LICENSE">Licença MIT</a>.</p>
</body>
</html>

