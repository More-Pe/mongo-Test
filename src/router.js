import { Router } from 'express';
import { router as gameRoutes} from './entities/games/games.routes.js'; //NUNCA olvidar poner.js
import { router as userRoutes } from './entities/users/users.routes.js'

const router = Router()

router.use('/games', gameRoutes)
router.use('/users', userRoutes)

export { router }