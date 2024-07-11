1. ```git init```
2. ```npm init -y```
3. Crear .gitignore y añadir:
```
/node_modules
.env
```

Recordar que PRIMERO se deben añadir los archivos al gitignore Y LUEGO crearlos
4. ``` npm i express ```
5. Crear carpeta src y dentro crear archivo server.js
6. En el server.js agregar:
```
import express from 'express';

const app = express()

const PORT = process.env.PORT || 4000

app.use(express.json()) //Para convertir en json el texto plano del req.body

app.listen (PORT, () => {

    console.log(`Server is running on port ${PORT}`);
}
)
```
Si se sintaxis de ECMA scipt (import), hay que agregar al package json, arriba de los scripts;
```"type": "module",```

7. En package json crear scripts:

```
"start": "node ./dist/server.js",
"dev": "nodemon ./src/server.js",
```

8. Ejecutar: npm start

9. Instalar nodemon: npm install --save-dev nodemon

10. Ejecutar: npm run dev

11. npm i dotenv

12. En el server.js:
```
import 'dotenv/config';
```

13. Crear .env y .env.example en la carpeta src

14. En el .env:
```
PORT=4000
```

15. Todo lo que se vaya agregando al .env se deberá agregar al .env.example pero poniendo valores de ejemplo

16. Configurar el servidor server.js

17. Crear la DB, en este caso con Mongo DB utilizando Docker. En el terminal, ejecutar el siguiente comando:
```docker run -d -p 27017:27017 --name mongo -v mongo_data:/data/db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root mongo:latest```

18. Con Mongo se debe utilizar Mongo Compass (en vez de Workbench que es para MySQL). Descargarlo.

19. En este caso, vamos a trabajar con Mongoos (TypeORM es para MySQL), para instalarlo:
```npm i mongoose```

20. Para crear la conexión hay que crear dentro de SRC una carpeta "databse" y dentro un archivo "db.js"

21. Dentro de db.js importar mongoose:
```
import mongoose from 'mongoose';
```

22. En db.js:

```
const MONGO_URI = `mongodb://root:1234@127.0.0.1:27017/test?authSource=admin`;
// mongodb://usuario:contraseña@host:puerto/test?authSource=admin

export const dbConnection = () => {
    console.log('Start connection');
   return mongoose.connect(
    MONGO_URI,
    {}
)
}
```
23. En server.js, debajo del "healthy":
```
dbConnection()
    .then(() => {
        console.log('Database connection established!');
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error establishing connection with the database:', error);
    });
```
RECORDAR: Borrar el app.listen ya que está incluido dentro del "then". De no hacerlo, dará ERROR.

24. Agregar al .env: 
```MONGO_URI=`mongodb://root:1234@127.0.0.1:27017/test?authSource=admin```
Recordar que no debe haber espacios ni punto y coma.
25. Cambiar el db.js:
```
export const dbConnection = () => {
    console.log('Start connection');
   return mongoose.connect(
    process.env.MONGO_URI,
    {}
)
}
```
26. En MongoDB Compass poner la uri y conectar.
27. En Mongo no existen las migraciones. Crear los modelos. Dentro de SRC crear carpeta "entities".
Mongo lo que permite es que en cada una de las propiedades, como son objetos bson, sea un array de muchas cosas.
En este caso, me permite que cada juego tenga una propiedadad que sea "comments", que será un array de objetos, por ejemplo reseñas.
28. Dentro de "entities" crear el primer módulo grande que será "games" (carpeta).
29. Dentro de la carpeta "games" creamos un archivo: "game.model.js" Allí:
```import { Schema, model } from "mongoose";

const GameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Game = model("Game", GameSchema);
export default Game;```

30. Agregar al server: 
app.post('/games', createGame)
31. Crear un nuevo fichero controlador en la carpeta entities/games:
"games.controller.js". Crear el modelo dentro (ver archivo)
32. Dentro de la carpeta "games" crear un archivo "games.routes.js" y dentro:
```
import { Router } from 'express';

const router = Router()


export { router }
```
33. Luego en server: 
import { router as gameRoutes } from './entities/games/games.routes.js'; // el "as" indica la manera en que se llamará en el fichero server.
se reemplaza 
´´´
app.post('/games', createGame)
´´´
por:
´´´
app.use('/games', gameRoutes) // todas las rutas tendrán el prefijo /api, en este caso
´´´

34. Se crea un enroutador: a la altura de server.js, crear un ficher "router.js" y allí:
´´´
import { Router } from 'express';

const router = Router()

export { router }
´´´
35. Para cada entidad se repetirán los pasos, se creará una carpeta para cada una y dentro se harán el modelo, las rutas y el controlador.

36. La ruta está conformada por server+router+entityroute: ejemplo:
/api/v1/users/register

37. Recordar encriptar la contraseña, y que para esto es necesario instalar bcrypt:
npm install bcrypt
38. Para que funcione en Thunder Client hay que reiniciar el servidor (en terminal, control+c)



NOTAS: 
- Para el naming, las Clases empiezan con mayúscula y las funciones en minúscula.
- Solo puede haber un export defautl por archivo.