export type { UserRegister } from './auth.schemas.ts'
export { verifyJWTToken } from './auth.utils.ts'
import authRouter from './auth.routes.ts'
export default authRouter

