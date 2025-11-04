# Estudo de Caso: Listagem de Produtos (Web + Mobile)

Este repositório contém um projeto exemplo dividido em duas partes:

- web/: Aplicação React com Vite
- mobile/: Aplicação React Native com Expo

Objetivo: listar produtos, navegar para a página de detalhes e consumir uma API REST externa.

API de produtos utilizada:
- Documentação: https://proweb.leoproti.com.br/swagger-ui/index.html

Como usar

1. Web

- Entrar na pasta `web/`
- Instalar dependências: `npm install`
- Rodar em modo de desenvolvimento: `npm run dev`

2. Mobile

- Entrar na pasta `mobile/`
- Instalar dependências: `npm install`
- Rodar com Expo: `npx expo start` ou `npm run start`

Rotas implementadas (web)

- `/` - lista de produtos
- `/produto/:id` - detalhes do produto

Rotas implementadas (mobile)

- Tela inicial com botões para navegar à lista de produtos
- Tela de detalhes exibindo informações do produto

Deploy

- Para deploy web, recomendamos usar o Vercel. Aponte para a pasta `web/` no setup do Vercel.

Créditos

- Autor:Adail-dev
- Bibliotecas: React, Vite, React Router, Axios, Expo, React Navigation
