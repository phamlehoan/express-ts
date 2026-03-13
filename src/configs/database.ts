import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database | null = null;

export async function getDbConnection(): Promise<Database> {
  if (db === null) {
    try {
      db = await open({
        filename: './database.db',
        driver: sqlite3.Database
      });
      console.log('Connected to the SQLite database.');
    } catch (error) {
      console.error('Error connecting to the database:', error);
      throw error;
    }
  }
  return db;
}

export async function closeDbConnection() {
  if (db !== null) {
    try {
      await db.close();
      db = null;
      console.log('Database connection closed.');
    } catch (error) {
      console.error('Error closing the database connection:', error);
    }
  }
}

process.on('exit', closeDbConnection);
process.on('SIGINT', closeDbConnection);
process.on('SIGTERM', closeDbConnection);
