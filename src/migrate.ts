// src/migrate.ts
import { connection, Database } from './services/db';
import path from 'path';
import { MigrationService } from './services/migration.service';

export async function migrate() {
  const db = (await connection.getConnection()) as unknown as Database;
  const migrationService = new MigrationService(db, path.join(__dirname, '../migrations'));

  try {
    await migrationService.runMigrations();
  } finally {
    db.release();
  }
}
