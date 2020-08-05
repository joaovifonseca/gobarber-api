import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Rolandinho BR',
      email: 'rolandinho@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Rolandinho UK',
      email: 'rolandinho@uk.com',
    });

    expect(updatedUser.name).toBe('Rolandinho UK');
    expect(updatedUser.email).toBe('rolandinho@uk.com');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    expect(
      updateProfileService.execute({
        user_id: 'non-existing-user-id',
        name: 'Rolandinho UK',
        email: 'rolandinho@uk.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUserRepository.create({
      name: 'Rolandinho BR',
      email: 'rolandinho@gmail.com',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 'Test',
      email: 'rolandinho2@gmail.com',
      password: '123456',
    });

    await expect(updateProfileService.execute({
      user_id: user.id,
      email: 'rolandinho@gmail.com',
      name: 'Rolandinho BR',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Rolandinho BR',
      email: 'rolandinho@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Rolandinho UK',
      email: 'rolandinho@uk.com',
      old_password: '123456',
      password: '123123'
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Rolandinho BR',
      email: 'rolandinho@gmail.com',
      password: '123456',
    });

    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'Rolandinho UK',
      email: 'rolandinho@uk.com',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Rolandinho BR',
      email: 'rolandinho@gmail.com',
      password: '123456',
    });

    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'Rolandinho UK',
      email: 'rolandinho@uk.com',
      old_password: '123487',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError);
  });
});
