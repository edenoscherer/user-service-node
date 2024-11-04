export interface DeleteUserRepository {
  deleteUser(id: number, deletedBy: number | null): Promise<boolean>;
}
