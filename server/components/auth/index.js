import Authroute from './authRoute';
import { authenticateToken } from './authMiddleware';

export const authRoute = Authroute;
export const authToken = authenticateToken;
