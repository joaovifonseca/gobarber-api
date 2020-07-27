import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUserRepository);

    const user = await createUser.execute({
      name: 'Rolandinho BR',
      email: 'rolandinho@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user using one email already registered', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUserRepository);

    await createUser.execute({
      name: 'Rolandinho BR',
      email: 'rolandinho@gmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Rolandinho BR',
        email: 'rolandinho@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
