import app from './app';
import { env } from './config/env';
import { connectDatabase } from './config/prisma';

const startServer = async (): Promise<void> => {
  // Establish database connections
  await connectDatabase();

  const server = app.listen(env.PORT, () => {
    console.info(
      `🚀 FinSight AI Server booted on port ${env.PORT} in ${env.NODE_ENV} environment.`,
    );
  });

  const shutdown = () => {
    console.info('SIGTERM/SIGINT received. Closing HTTP server connections...');
    server.close(() => {
      console.info('HTTP server closed successfully.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

void startServer();
