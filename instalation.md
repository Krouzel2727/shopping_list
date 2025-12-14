# 🛒 Nákupní Seznam (Shopping List App)
Umožňuje uživatelům vytvářet seznamy, sdílet je s ostatními členy domácnosti, spravovat položky a sledovat jejich stav (vyřešeno/nevyřešeno).

Aplikace je rozdělena na **Backend (Node.js/Express)** a **Frontend (React/Vite)**.

---

## 🚀 Klíčové Funkce

* **Autentizace:** Registrace a přihlášení uživatelů (JWT Tokeny).
* **Správa seznamů:** Vytváření, mazání, editace názvu a archivace nákupních seznamů.
* **Položky:** Přidávání, mazání a odškrtávání (resolving) položek.
* **Filtrování:** Možnost zobrazit všechny položky nebo jen ty nevyřešené.
* **Správa členů:** Vlastník může přidávat členy (pomocí e-mailu) nebo je odebírat. Člen může seznam opustit.
* **Mock Mode:** Frontend umí fungovat i bez backendu (přepínač na mock data).
* **Responzivní UI:** Postaveno na React Bootstrap.

---

## 🛠️ Technologie

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Databáze:** MongoDB (Mongoose ODM)
* **Auth:** JSON Web Token (JWT), bcryptjs
* **Další:** CORS, Cookie-parser

### Frontend
* **Core:** React.js, Vite
* **Routing:** React Router Dom
* **Styling:** React Bootstrap, Bootstrap 5
* **Ikony:** React Icons

---

## ⚙️ Instalace a Spuštění

Pro spuštění projektu na lokálním stroji potřebujete **Node.js** a běžící instanci **MongoDB** (lokálně nebo cloud Atlas).

### 1. Klonování repozitáře
```bash
git clone <URL_REPOZITARE>
cd nazev-slozky

cd backend
npm install

cd config 
    vytvořte nový soubor .env.development.local s těmito parametry:

                #PORT
                PORT=5500

                #ENVIROMENT
                NODE_ENV='development'

                #DATABASE
                DB_URI="VESE_URL_DO_DB"

                #JWT AUTH
                JWT_SECRET="secret"
                JWT_EXPIRES_IN="1d"

npm run dev

Server poběží na: http://localhost:5500

cd..
cd frontend
npm install
npm run dev
Aplikace se otevře na: http://localhost:5173

Frontend obsahuje přepínač pro použití falešných (mock) dat, což umožňuje testování UI bez běžícího backendu.

Pro zapnutí/vypnutí upravte soubor frontend/src/api/client.js:
// true = Použít Mock Data
// false = Použít Reálný Backend

const USE_MOCK = false; 


Testování API (Insomnia/Postman)
V kořenovém adresáři projektu je k dispozici export pro Insomnii ( insomnie_shopping_list.json a env_5500.json). 
insomnie_shopping_list.json =>import endpointů
env_5500.json => nastavení prostředí