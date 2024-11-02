// src/migrate.ts
import { connection } from './db';
import fs from 'fs';
import path from 'path';

async function runMigrations() {
  // Conecta ao banco de dados
  const db = await connection.getConnection();
  try {
    // Cria tabela de controle de migrações, se ainda não existir
    await db.execute(`
            CREATE TABLE IF NOT EXISTS migrations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                run_on DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

    // Lê e aplica migrações em ordem sequencial
    const migrationsDir = path.join(__dirname, '../migrations');
    const migrationFiles = fs.readdirSync(migrationsDir).sort();

    for (const file of migrationFiles) {
      // Verifica se a migração já foi aplicada
      const [rows] = await db.query('SELECT * FROM migrations WHERE name = ?', [file]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((rows as any[])?.length > 0) continue;

      // Lê e executa o SQL da migração
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      await db.query(sql);

      // Registra a migração como aplicada
      await db.query('INSERT INTO migrations (name) VALUES (?)', [file]);
      console.log(`Migração ${file} aplicada com sucesso.`);
    }
  } catch (err) {
    console.error('Erro ao aplicar migrações:', err);
  } finally {
    db.release();
  }
}
runMigrations().catch(err => console.error('Erro ao rodar migrações:', err));
