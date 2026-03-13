import { getDbConnection } from '@configs/database';
import { Database } from 'sqlite';

interface User {
  id: number;
  name: string;
}

export async function createUserTable() {
  let db: Database | null = null;
  try {
    db = await getDbConnection();
    await db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
    console.log('Users table created or already exists.');
  } catch (err: any) {
    console.error('Error creating users table:', err.message);
  }
}

export async function addUser(name: string): Promise<number | null> {
  try {
    const db = await getDbConnection();
    const result = await db.run('INSERT INTO users (name) VALUES (?)', name);

    return result.lastID ?? null;
  } catch (err: any) {
    console.error('Lỗi khi thêm user:', err.message);
    return null;
  }
}

export async function getAllUsers(): Promise<User[]> {
  let db: Database | null = null;
  try {
    db = await getDbConnection();
    const users: User[] = await db.all('SELECT * FROM users');
    console.log(`Retrieved ${users.length} users.`);
    return users;
  } catch (err: any) {
    console.error('Error getting all users:', err.message);
    return [];
  }
}

export async function getUserById(id: number): Promise<User | null> {
  let db: Database | null = null;
  try {
    db = await getDbConnection();
    const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    if (!user) {
      console.log(`User with ID ${id} not found.`);
      return null;
    }
    console.log(`Retrieved user ${user.name} (ID: ${id}).`);
    return user;
  } catch (err: any) {
    console.error(`Error getting user by ID ${id}:`, err.message);
    return null;
  }
}
