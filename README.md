# LEGOTracker

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## 📝 Resumo do Projeto
O LEGOTracker é uma aplicação web desenvolvida para auxiliar entusiastas de LEGO a gerenciar e acompanhar o progresso de suas montagens. Ele permite aos usuários visualizar uma lista de montagens, adicionar novas, e simular a exclusão de itens diretamente na interface. Futuramente, o sistema será expandido para incluir funcionalidades completas de edição e persistência de dados via API.

## 👥 Integrantes
Fabrício Zago Horvat

Andre Silva Almeida


## 🛠️ Tecnologias Utilizadas
Frontend (Angular):
- Angular CLI
- TypeScript
- CSS
- Angular Router
- HttpClientModule

Backend (Laravel)
- Laravel Framework
- PHP
- MySQL
- Composer


## 🚀 Como Rodar o Projeto
Este projeto é composto por duas partes: o frontend (Angular) e o backend (Laravel). Ambos precisam ser configurados e iniciados separadamente.

## ⚙️ Configuração e Execução do Backend (API Laravel)
Pré-requisitos:
- PHP (versão 8.2 ou superior recomendada)
- Composer
- MySQL Server (ou outro banco de dados compatível)

1. Clonar o Repositório do Backend:
```bash
git clone https://github.com/fabricio2905/LegoTracker.git
cd legotracker-api
```
2. Instalar Dependências do Composer:
```bash
composer install
```
3. Configurar o Arquivo de Ambiente (.env):
Crie uma cópia do arquivo de exemplo:
```bash
cp .env.example .env
```
4. Abra o arquivo .env recém-criado em um editor de texto.
Gere a chave da aplicação:
```bash
php artisan key:generate
```
5. Configure as credenciais do seu banco de dados MySQL:
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=legotracker_db # Crie este banco de dados no seu MySQL
DB_USERNAME=root         # Seu usuário do MySQL
DB_PASSWORD=sua_senha  
```

Importante: Crie o banco de dados legotracker_db no seu servidor MySQL.

## Rodar as Migrações do Banco de Dados:
```bash
php artisan migrate:fresh 
```


## Iniciar o Servidor Laravel:
```bash
php artisan serve
```
Mantenha este terminal aberto, pois ele executa o servidor backend.

## Iniciar o Servidor de Desenvolvimento Angular
Em outro terminal:
```bash
npm install
ng serve --open
```
Isso abrirá a aplicação no seu navegador (geralmente em http://localhost:4200)

## 🔑 Credenciais de Acesso
- Usuário: admin
- Senha: 123456


## Um pequeno exemplo de como ficou a tela de listagem com alguns cadastros:
<img width="1917" height="906" alt="image" src="https://github.com/user-attachments/assets/55b21b5b-5996-425d-9af8-dad23dcd086b" />
