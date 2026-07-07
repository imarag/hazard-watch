export type { UserRegister } from './auth.schemas.js'
export { verifyJWTToken } from './auth.utils.js'
import authRouter from './auth.routes.js'
export default authRouter

