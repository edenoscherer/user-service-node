// src/migrate.ts
import { connection } from './db';
import path from 'path';
import { MigrationService } from './services/migration.service';
import { Database } from './interfaces/database';

async function migrate() {
  const db = (await connection.getConnection()) as unknown as Database;
  const migrationService = new MigrationService(db, path.join(__dirname, '../migrations'));

  try {
    await migrationService.runMigrations();
  } finally {
    db.release();
  }
}

migrate().catch(error => console.error('Migration error:', error));
