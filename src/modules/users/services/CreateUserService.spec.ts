import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider, fakeCacheProvider);
  })
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Rolandinho BR',
      email: 'rolandinho@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user using one email already registered', async () => {
    await createUser.execute({
      name: 'Rolandinho BR',
      email: 'rolandinho@gmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Rolandinho BR',
        email: 'rolandinho@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
