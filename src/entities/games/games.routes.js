import { Router } from 'express';
import { createGame, deleteGameById } from './games.controller.js';
import { getAllGames } from './games.controller.js';

const router = Router()

router.post('/', createGame) 
router.get('/', getAllGames)
router.delete('/:id', deleteGameById)

export { router }