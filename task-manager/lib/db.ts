import fs from 'fs';
import path from 'path';
import type { Database } from './types';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

export function readDb(): Database {
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw) as Database;
}

export function writeDb(db: Database): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

export function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
