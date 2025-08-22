# 🔑 Firebase Google Auth - Exemplo com Next.js

Este projeto foi criado apenas para testar a autenticação com **Google** utilizando **Firebase** no **Next.js**.

---

## 🚀 Tecnologias
- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)

---

## ⚙️ Configuração do Firebase

### 1. Criar projeto no Firebase
1. Acesse [Firebase Console](https://console.firebase.google.com/).
2. Clique em **Adicionar Projeto**.
3. Dê um nome ao projeto e conclua a criação (não é necessário habilitar Google Analytics para este teste).
4. Após criar o projeto, acesse a seção **Configurações do Projeto**.

### 2. Ativar Autenticação Google
1. No menu lateral, vá em **Authentication**.
2. Clique em **Método de login**.
3. Ative o **Google** como provedor.
4. Configure o e-mail de suporte e salve.

### 3. Adicionar App Web
1. No console do Firebase, vá em **Visão geral do projeto**.
2. Clique em **Adicionar app** > **Web**.
3. Registre o app (ex: `firebase-auth-test`).
4. Copie as credenciais do SDK exibidas.

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto e adicione:

```env
NEXT_PUBLIC_API_KEY=xxxx
NEXT_PUBLIC_AUTH_DOMAIN=xxxx.firebaseapp.com
NEXT_PUBLIC_PROJECT_ID=xxxx
NEXT_PUBLIC_STORAGE_BUCKET=xxxx.appspot.com
NEXT_PUBLIC_MESSAGING_SENDER_ID=xxxx
NEXT_PUBLIC_APP_ID=xxxx