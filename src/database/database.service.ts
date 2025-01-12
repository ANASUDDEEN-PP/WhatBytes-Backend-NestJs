import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name); // Use the Logger service

  constructor(@InjectConnection() private readonly connection: Connection) {}

  /**
   * Check if the database connection is alive
   * @returns {Promise<boolean>} Returns true if the connection is successful, false otherwise
   */
  async checkConnection(): Promise<boolean> {
    try {
      // Run a simple query to check the database connection
      await this.connection.query('SELECT 1');
      return true;
    } catch (error) {
      // Log the error using the Logger service
      this.logger.error('Database connection failed', error.stack);
      return false;
    }
  }
}
