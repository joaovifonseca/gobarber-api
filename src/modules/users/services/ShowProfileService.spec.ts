import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import ShowProfileService from './ShowProfileService';

import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        showProfileService = new ShowProfileService(fakeUserRepository);
    });

    it('should be able to show the profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'Rolandinho BR',
            email: 'rolandinho@gmail.com',
            password: '123456',
        });

        const profile = await showProfileService.execute({
            user_id: user.id,
        });

        expect(profile.name).toBe('Rolandinho BR');
        expect(profile.email).toBe('rolandinho@gmail.com');
    });

    it('should not be able to show the profile from non-existing user', async () => {
        expect(
            showProfileService.execute({
                user_id: 'non-existing-user-id',
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
