import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'SampleController';

const sampleHealthCheck = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `Sample health check route called.`);

  res.status(200).json({
    message: 'pong'
  });
}

export default { sampleHealthCheck };
