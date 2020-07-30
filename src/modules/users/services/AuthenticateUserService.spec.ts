import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'Rolandinho BR',
      email: 'rolandinho@gmail.com',
      password: '123456',
    });

    const auth = await authenticateUser.execute({
      email: 'rolandinho@gmail.com',
      password: '123456',
    });

    expect(auth).toHaveProperty('token');
    expect(auth.user).toEqual(user);
  });

  it('should not be able to authenticate with no existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);


    expect(authenticateUser.execute({
      email: 'rolandinho@gmail.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'Rolandinho BR',
      email: 'rolandinho@gmail.com',
      password: '123456',
    });

    expect(authenticateUser.execute({
      email: 'rolandinho@gmail.com',
      password: '1234567',
    })).rejects.toBeInstanceOf(AppError);
  });
});
