export interface Database {
  query<T>(sql: string, params?: unknown[]): Promise<[T]>;
  execute(sql: string): Promise<void>;
  beginTransaction(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  release(): Promise<void>;
}
