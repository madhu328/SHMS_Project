# SHMS deployment guide

This repository contains `frontend` (React/Vite) and `backend` (Node/Express).

## 1. MongoDB Atlas
Create a MongoDB Atlas cluster and a database user. Configure network access to allow the hosted API to connect. Copy the application connection URI, including your database name (`SHMS`). Keep credentials private.

## 2. Render backend
Connect this GitHub repository to Render as a **Web Service**.
- Root directory: `backend`
- Runtime: Node
- Build command: `npm ci`
- Start command: `npm start`
- Environment variables: `MONGODB_URL` (Atlas URI), `JWT_SECRET` (strong random secret), `FRONTEND_URL` (Vercel website origin, later). `PORT` is set by Render automatically.
Deploy, then copy the HTTPS `onrender.com` service URL. Visiting `/` should respond `Welcome to SHMS backend!`. The service must also establish a database connection successfully.

## 3. Vercel frontend
Import the same GitHub repository to Vercel.
- Root directory: `frontend`
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL` = backend Render HTTPS origin, with no trailing slash.
Deploy, then copy the generated `vercel.app` HTTPS URL.

## 4. Connect both sides
On Render, set `FRONTEND_URL` to the exact deployed Vercel origin (`https://...vercel.app`) with no trailing slash, then redeploy/restart the backend. Ensure Vercel deploy runs with the backend URL configured.

## 5. Test
Verify signup/login, authenticated routes, patient registration, appointments, admin pages and browser console. Be cautious using real patient data in an academic/demo deployment; validate authorization and data security before production use.

## Local development
Frontend can use `VITE_API_URL=http://localhost:3000`; backend environment values are shown in `backend/.env.example`. Do not commit `.env` files or credentials.
