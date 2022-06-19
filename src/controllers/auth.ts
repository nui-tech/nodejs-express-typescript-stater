import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import jwt from 'jsonwebtoken';

interface AuthPayload {
  user: string | jwt.JwtPayload;
}
interface AuthPayloadRequest extends Request {
  user?: string | jwt.JwtPayload;
}

const NAMESPACE = 'AuthController';

const storeRefreshTokens:string[] = [];

// login return JWt token
const login = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `login route called.`);

  const username = req.body.username;

  // TODO: authenticate user here before return token

  const payload:AuthPayload = { user: username };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });

  //TODO: store refreshToken in DB
  // For now, we store refreshToken in memory for easy demo
  storeRefreshTokens.push(refreshToken);
  console.log(storeRefreshTokens);
  

  res.status(200).json({
    accessToken,
    refreshToken,
    payload
  });
}

// logout controller
const logout = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `Auth route called.`);



  res.status(200).json({
    message: 'logout'
  });
}


/**
 * Middleware function to check if token is valid
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {*} 
 */
const authenticateToken = (req: AuthPayloadRequest, res: Response, next: NextFunction) =>{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log(user);
    req.user = user;
    next();
  });
}


export default { login, logout, authenticateToken };