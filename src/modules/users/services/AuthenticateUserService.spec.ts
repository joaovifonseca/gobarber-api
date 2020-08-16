import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUserRepository.create({
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
    await expect(authenticateUser.execute({
      email: 'rolandinho@gmail.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Rolandinho BR',
      email: 'rolandinho@gmail.com',
      password: '123456',
    });

    await expect(authenticateUser.execute({
      email: 'rolandinho@gmail.com',
      password: '1234567',
    })).rejects.toBeInstanceOf(AppError);
  });
});
