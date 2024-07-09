1. git init
2. npm init -y
3. Crear .gitignore y añadir /node_modules
4. npm i express
5. Crear carpeta src y dentro crear archivo server.js
6. En el server.js agregar:
````
const express = require('express')

const app = express()

const PORT = process.env.PORT || 4000

app.listen (PORT, () => {

    console.log(`Server running ${PORT}`);
}
)
```
¡No se utiliza sintaxis de ECMA scipt (import)! Se utiliza sintaxis de common js (require).

7. En package json crear scripts:

´´´
"start": "node ./src/server.js",
"dev": "nodemon ./src/server.js"
 ´´´

8. Ejecutar: npm start

9. Instalar nodemon: npm install --save-dev nodemon

10. Ejecutar: npm run dev
