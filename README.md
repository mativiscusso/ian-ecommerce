# IAN Ecommerce

_The development consists of a robust base of an online sales platform that can be taken as a starting point for its implementation or receive improvements._

## Comenzando 🚀

_These instructions will allow you to get a copy of the project running on your local machine for development and testing purposes._


### Requirements 📋

_To run the project you will need to have installed_

-   VS Code + extensiones -> Prettier y ESLint
-   Node v12 (or more)
-   XAMPP / Laragon

### Install 🔧

_A series of step-by-step examples that tells you what to run to have a development environment running_

_Always starting from the root of the project_

```bash
cd app && npm install
```

_and repeat_

```bash
cd api && npm install
```

## Run the enviroments ⚙️

_To start both environments, you must run the following commands_

#### Server + Admin UI | API

```bash
cd api && npm start
# or
cd api && yarn start
```

Check the links offered by the API in the command terminal.

#### Storefront | APP

```bash
cd app && npm run dev
# or
cd app && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

### Migrations

[Migrations](https://www.vendure.io/docs/developer-guide/migrations/) - Allow secure updates to the database schema.

```bash
yarn migration:generate [name]
# or
npm run migration:generate [name]
```

run pending migrations that have been generated:

```bash
yarn migration:run
# or
npm run migration:run
```

and roll back the most recently applied migration:

```bash
yarn migration:revert
# or
npm run migration:revert
```

### Project structure 📁

_Detail of the project folder structure_

```
├── api
│   └── node_modules
│   └── src
│   └── static
│   └── .gitignore
│   └── migration.js
│   └── package.json
├── app
│   └── .next
│   └── components
│   └── node_modules
│   └── pages
│   └── utils
│   └── .gitignore
│   └── jsconfig.json
│   └── package.json
├── readme.md
```

### Test ⌨️

_Cooming soon_

```
.
```

## Deploy 📦

_Cooming soon_

## Build  🛠️

-   [Vendure](https://www.vendure.io/) - Headless e-commerce framework
-   [Next JS](https://nextjs.org/) - React framework
-   [Material UI](https://material-ui.com/) - Styles library


## Autores ✒️

-   **Mati Viscusso** - _Software Developer_ - [mativiscusso](https://github.com/mativiscusso)

## License 📄

This project is under the License MIT

---

⌨️ with 💪 for [Mati Viscusso](https://github.com/mativiscusso) 🐱‍👤
