import { UserRoutes } from '../../../src/routes/user.routes';

describe('UserRoutes', () => {
  let userRoutes: UserRoutes;

  beforeEach(() => {
    userRoutes = new UserRoutes();
  });

  it('should have router property as private', () => {
    const descriptor = Object.getOwnPropertyDescriptor(UserRoutes.prototype, 'router');
    expect(descriptor).toBeUndefined();
  });

  it('should maintain router instance throughout lifecycle', () => {
    const router1 = Reflect.get(userRoutes, 'router');
    const router2 = Reflect.get(userRoutes, 'router');
    expect(router1).toBe(router2);
  });
});
