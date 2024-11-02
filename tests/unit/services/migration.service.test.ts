/* eslint-disable @typescript-eslint/no-explicit-any */
import { Database } from '../../../src/services/db';
import { MigrationService } from '../../../src/services/migration.service';

describe('MigrationService', () => {
  let migrationService: MigrationService;
  let mockDb: Database;

  beforeEach(() => {
    mockDb = {
      beginTransaction: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
      query: jest.fn(),
      execute: jest.fn(),
      release: jest.fn()
    };
    migrationService = new MigrationService(mockDb, '../../../migrations');
  });

  describe('runMigrations', () => {
    beforeEach(() => {
      jest.spyOn(migrationService as any, 'initializeMigrationsTable').mockResolvedValue(undefined);
      jest
        .spyOn(migrationService as any, 'getMigrationFiles')
        .mockReturnValue(['migration1.sql', 'migration2.sql']);
      jest.spyOn(migrationService as any, 'isMigrationApplied').mockResolvedValue(false);
      jest.spyOn(migrationService as any, 'applyMigration').mockResolvedValue(undefined);
      jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    it('should successfully run all migrations', async () => {
      await migrationService.runMigrations();

      expect(mockDb.beginTransaction).toHaveBeenCalled();
      expect(migrationService['initializeMigrationsTable']).toHaveBeenCalled();
      expect(migrationService['getMigrationFiles']).toHaveBeenCalled();
      expect(migrationService['applyMigration']).toHaveBeenCalledTimes(2);
      expect(mockDb.commit).toHaveBeenCalled();
      expect(mockDb.rollback).not.toHaveBeenCalled();
    });

    it('should skip already applied migrations', async () => {
      jest.spyOn(migrationService as any, 'isMigrationApplied').mockResolvedValueOnce(true);

      await migrationService.runMigrations();

      expect(migrationService['applyMigration']).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledTimes(1);
    });

    it('should rollback and throw error when migration fails', async () => {
      const error = new Error('Migration error');
      jest.spyOn(migrationService as any, 'applyMigration').mockRejectedValueOnce(error);

      await expect(migrationService.runMigrations()).rejects.toThrow(
        'Migration failed: Migration error'
      );

      expect(mockDb.rollback).toHaveBeenCalled();
      expect(mockDb.commit).not.toHaveBeenCalled();
    });

    it('should handle empty migration files list', async () => {
      jest.spyOn(migrationService as any, 'getMigrationFiles').mockReturnValue([]);

      await migrationService.runMigrations();

      expect(migrationService['applyMigration']).not.toHaveBeenCalled();
      expect(mockDb.commit).toHaveBeenCalled();
    });
  });
});
