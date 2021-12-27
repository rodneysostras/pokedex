
<h1 align="center">
    <img src=".github/assets/img/icon-readme.png" alt="" height="60em" />
    Pokédex
</h1>
<div align="center">
    <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D" />
    <!-- <img src="https://img.shields.io/badge/%F0%9F%9A%A7%20EM%20CONTRU%C3%87%C3%83O%20-90%25-brightgreen?style=for-the-badge" /> -->
    <img src="https://shields.io/github/deployments/rodneysostras/pokedex/production?style=for-the-badge&logo=appveyor" />
    <img src="https://img.shields.io/website-up-down-green-red/https/pokedex.rodneysostras.me?style=for-the-badge"/>
    <img src="https://img.shields.io/github/repo-size/rodneysostras/pokedex?style=for-the-badge"/>
    <img src="https://img.shields.io/github/languages/count/rodneysostras/pokedex?style=for-the-badge"/>
    <img src="https://img.shields.io/github/issues/rodneysostras/pokedex?style=for-the-badge"/>
    <!-- <img src="https://img.shields.io/github/license/rodneysostras/pokedex?style=for-the-badge"/> -->
</div>

<br />

<p align="center">
    <a href="#-sobre-o-projeto">Sobre</a> •
    <a href="#-requisitos">Requisitos</a> •
    <a href="#-recursos">Recursos</a> •
    <a href="#-como-executar-o-projeto">Como executar</a> •
    <a href="#-tecnologias">Tecnologias</a> •
    <a href="#-autor">Autor</a> • 
    <a href="#-licença">Licença</a>
</p>

<br />

## 💻 Sobre o projeto

<br />

<div align="center"><img src=".github/assets/img/previewer-readme.gif" alt="previewer" height="450em"/></div>

<div align="center">
    <em>
        Uma enciclopédia virtual que registra todas as espécies diferentes de Pokémon<br />
        <b>DEMO: </b>
        <a href="https://pokedex.rodneysostras.me/">GITHUB-PAGES</a> | 
        <a href="https://pokedex-rodneysostras.vercel.app/">VERCEL</a>
    </em>
</div>

<br />

🏆 Pokédex - Uma aplicação Web em VueJS que lista pokemons com suas características.

Utilizei o framework VueJS para consumindo uma API pública com dados dos pokemons, na estilização foi usado o framework TailwindCss.

> Uma challenge realizada para testar meus conhecimentos tendo que comprir os requisitos abaixo.

## 🎯 Requisitos

- [ ] Consumir API https://pokeapi.co/docs/v2#info.
- [ ] Listagem dos Pokémon com scrol Infinito.
- [ ] Filtros para nome, id, tipo e espécie.
- [ ] Suporte aos i18n.
	- [ ] Idioma Português.
	- [ ] Idioma Inglês.
	- [ ] Idioma Espanhol.
- [ ] Card do pokémon.
	- [ ] Todos os sprites do Pokémon.
	- [ ] Seus movimentos de Ataques.
	- [ ] Visualizar às evoluções de cada Pokémon, se houver.
	- [ ] Visualizar todos os games (game_indices) que o Pokémon está presente.
- [ ] Deploy na Vercel.

<br />

<blockquote>
O app deverá ser desenvolvido utilizando:

Vue.JS;

HTML + CSS + JS + Bootstrap (opcionalmente);

API https://pokeapi.co/docs/v2#info para o backend.

O app deverá ser dotado das seguintes funcionalidades:

Listagem dos Pokémon com scroll infinito, contendo filtros para nome, id, tipo e espécie;

O app deve contar com suporte aos idiomas português, inglês e español, disponíveis na API;

Abrir um card do Pokémon na listagem;

No card:

Todos os sprites do Pokémon;

Seus movimentos de ataque;

Visualizar às evoluções de cada Pokémon, se houver;

Visualizar todos os games (game_indices) que aquele Pokémon está presente.

Você poderá usar quaisquer bibliotecas que desejar para acelerar o seu desenvolvimento.

Opcionais:

Se conseguir, escreva testes automatizados simples;

Se conseguir, implemente internacionalização;

Se conseguir, utilize VueX para gerenciamento de estado;

Se conseguir, torne a aplicação responsiva.

Quanto a infra-estrutura, a sua aplicação deve estar publicada no Vercel (https://vercel.com/) e seu código deve estar acessível em sua conta do Github. Não iremos considerar a entrega de uma aplicação que não esteja publicada e de um código que não esteja no Github, de modo que possamos avaliar a evolução do seu código, ou seja, não aceitaremos a entrega funcionando apenas em Localhost. 

Caso não esteja habituado com o Vercel, você pode recorrer a seguinte documentação: https://vercel.com/guides/deploying-vuejs-to-vercel .
</blockquote>

## 📦 Recursos

- [ ] Responsivo.
- [ ] Dark theme.
- [ ] Página de erro '404 - not found'.
- [ ] Vuex - Gerenciador de estado
- [ ] Testes automatizados
- [ ] Github Page - SPA routing.
- [ ] SEO

## 🚀 Como executar o projeto

```bash
# Clone este repositório
$ git clone git@github.com:rodneysostras/pokedex.git
# Acesse a pasta do projeto no seu terminal/cmd
$ cd pokedex
# Instale as dependências
$ npm install
# Execute a aplicação em modo de desenvolvimento
$ npm run serve
# A aplicação será aberta na porta:8080 - acesse http://localhost:8080
```
> Na pasta `.devcontainer` possui as configurações para subir o container docker do ambiente de desenvolvimento deste projeto \
> Fique a vontade para usar o docker-composer ou a extensão do vscode `Remote Development` que e o recomendado \
> Após o start do container realize o comando no container `npm install` depois `npm run serve`

## 🛠 Tecnologias

-   **[Vue](https://vuejs.org/)** • Framework Javascript open source utilizado para criar aplicações SPA.
-   **[Vuex](https://vuex.vuejs.org/)** • Biblioteca de gerenciamento de estado para aplicativos VueJS.
-   **[Axios](https://github.com/axios/axios)** • Cliente HTTP leve semelhante à API Fetch nativa do JavaScript.
-   **[Tailwindcss](https://tailwindcss.com/)** • Framework CSS com conceito utility classes para criação de componentes.
-   **[Eslint](https://github.com/eslint/eslint)** • Ferramenta que analisa o código permite identificar erros quanto ao padrão de escrita que definimos.
-   **[Prettier](https://github.com/prettier/prettier)** • Ferramenta que analisa o código com finalidade de "forçar" um padrão de código.
-   **[@vue/cli](https://cli.vuejs.org/)** • Ferramenta de linha de comando feita pela comunidade do Vue.
-   **[Vercel](https://vercel.com/)** • Plataforma voltada para a hospedagem de aplicações.

> Veja o arquivo  [package.json](https://github.com/rodneysostras/pokedex/blob/main/package.json)

## 🦸 Autor
<table align="left">
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://github.com/rodneysostras.png" width="150px;" alt="Foto do Rodney Sostras no GitHub"/><br>
        <sub>
          <b>Rodney Sostras</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
<p>
    &nbsp;&nbsp;
    <a href="https://github.com/rodneysostras">
        <img src="https://img.shields.io/badge/rodneysostras-000000?style=for-the-badge&logo=GitHub&logoColor=FFF" />
    </a>
</p>
<p>
    &nbsp;&nbsp;
    <a href="https://linkedin.com/in/rodney-sostras" alt="Linkedin do Rodney Sostras">
        <img src="https://img.shields.io/badge/-rodney--sostras-0077B5?style=for-the-badge&logo=Linkedin&logoColor=FFF"/>
    </a>
</p>
<p>&nbsp;&nbsp;
    <a href="mailto:contact@rodneysostras.me" alt="Email do Rodney Sostras">
        <img src="https://img.shields.io/badge/-contact@rodneysostras.me-D14836?style=for-the-badge&logo=Gmail&logoColor=FFF" />
    </a>
</p>
<p>&nbsp;&nbsp;
    <a href="https://rodneysostras.me/" alt="Web Site do Rodney Sostras">
        <img src="https://img.shields.io/badge/%F0%9F%8C%8E%20RODNEYSOSTRAS.ME%20-191919?style=for-the-badge" />
    </a>
</p>

<br />

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Feito com ❤️ por Rodney Sostras 👋🏽 [Entre em contato!](https://www.linkedin.com/in/rodney-sostras/)
        
<br />
        
<div align="right"><a href="#">Voltar ao topo ⬆</a></div>
