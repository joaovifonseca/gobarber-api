import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

// import AppError from '@shared/errors/AppError';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        listProvidersService = new ListProvidersService(fakeUserRepository);
    });

    it('should be able to list the providers', async () => {
        const user1 = await fakeUserRepository.create({
            name: 'Rolandinho AR',
            email: 'rolandinho@ar.com',
            password: '123456',
        });

        const user2 = await fakeUserRepository.create({
            name: 'Rolandinho US',
            email: 'rolandinho@us.com',
            password: '123456',
        });

        const loggedUser = await fakeUserRepository.create({
            name: 'Rolandinho BR',
            email: 'rolandinho@br.com',
            password: '123456',
        });

        const providers = await listProvidersService.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([
            user1, user2
        ]);
    });
});
