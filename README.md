# IAN Ecommerce

_El desarrollo consiste en una base robusta de una plataforma para venta online que se puede tomar como punto de partida para su implementacion o recibir mejoras_

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

Mira **Deployment** para conocer como desplegar el proyecto.

### Pre-requisitos 📋

_Para correr el proyecto necesitaras tener instalado_

-   Node v12 (minimo)
-   XAMPP / Laragon

### Instalación 🔧

_Una serie de ejemplos paso a paso que te dice lo que debes ejecutar para tener un entorno de desarrollo ejecutandose_

_Siempre partiendo desde la raiz del proyecto_

```bash
cd app && npm install
```

_Y repite_

```bash
cd api && npm install
```

## Ejecutando los entornos ⚙️

_Para poner en marcha ambos ambientes, debes correr los siquientes comandos_

#### Server + Admin UI | API

```bash
cd api && npm start
# or
cd api && yarn start
```

Chequear los enlaces que ofrece la API en la terminal de comandos.

#### Storefront | APP

```bash
cd app && npm run dev
# or
cd app && yarn dev
```

Abrir [http://localhost:3000](http://localhost:3000) con el navegador para acceder al sitio.

---

### Migraciones

[Migrations](https://www.vendure.io/docs/developer-guide/migrations/) - Permitir actualizaciones seguras del esquema de la base de datos.

```bash
yarn migration:generate [name]
# or
npm run migration:generate [name]
```

ejecutar las migraciones pendientes que se hayan generado:

```bash
yarn migration:run
# or
npm run migration:run
```

y revertir la migración aplicada más recientemente:

```bash
yarn migration:revert
# or
npm run migration:revert
```

### Estructura del proyecto 📁

_Detalle de la estructura de carpetas del proyecto_

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

_Pendiente_

```
.
```

## Despliegue 📦

_Pendiente_

## Construido con 🛠️

-   [Vendure](https://www.vendure.io/) - Headless e-commerce framework
-   [Next JS](https://nextjs.org/) - React framework
-   [Material UI](https://material-ui.com/) - Libreria de estilos

## Versionado 📌

Usamos [SemVer](http://semver.org/) para el versionado.

## Autores ✒️

-   **Mati Viscusso** - _Software Developer_ - [mativiscusso](https://github.com/mativiscusso)

## Licencia 📄

Este proyecto está bajo la Licencia MIT

---

⌨️ con 💪 por [Mati Viscusso](https://github.com/mativiscusso) 🐱‍👤
