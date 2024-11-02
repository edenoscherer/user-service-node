import fs from 'fs';
import path from 'path';
import { Database } from '../interfaces/database';
import { Migration } from '../entities/migration';

export class MigrationService {
  private readonly db: Database;
  private readonly migrationsDir: string;

  constructor(db: Database, migrationsDir: string) {
    this.db = db;
    this.migrationsDir = migrationsDir;
  }

  private async initializeMigrationsTable(): Promise<void> {
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        run_on DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  private getMigrationFiles(): string[] {
    return fs.readdirSync(this.migrationsDir).sort();
  }

  private async isMigrationApplied(filename: string): Promise<boolean> {
    const [rows] = await this.db.query<Migration[]>('SELECT * FROM migrations WHERE name = ?', [
      filename
    ]);
    return rows?.length > 0;
  }

  private async applyMigration(filename: string): Promise<void> {
    const sql = fs.readFileSync(path.join(this.migrationsDir, filename), 'utf8');
    await this.db.query(sql);
    await this.db.query('INSERT INTO migrations (name) VALUES (?)', [filename]);
  }

  async runMigrations(): Promise<void> {
    await this.db.beginTransaction();
    try {
      await this.initializeMigrationsTable();
      const files = this.getMigrationFiles();

      for (const file of files) {
        if (await this.isMigrationApplied(file)) continue;

        await this.applyMigration(file);
        console.log(`Migration ${file} successfully applied.`);
      }

      await this.db.commit();
    } catch (error: unknown) {
      await this.db.rollback();
      throw new Error(`Migration failed: ${(error as Error).message}`);
    }
  }
}
