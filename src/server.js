import express from 'express';
import 'dotenv/config';
import { dbConnection } from './database/db.js';
import { router as gameRoutes } from './entities/games/games.routes.js';


const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.json())
app.get('/healthy', (req, res) => {
    res.json({
        success: true,
        message: "Server is healthy!"
    });
});

//app.post('/games', createGame)
app.use('/games', gameRoutes)// Este será el prefijo, la routa será /games

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