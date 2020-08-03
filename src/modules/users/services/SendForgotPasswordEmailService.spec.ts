import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

import AppError from '@shared/errors/AppError';

describe('SendForgotPasswordEmailService', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUserRepository);

    await fakeUserRepository.create({
        name: 'Rolandinho BR',
        email: 'rolandinho@gmail.com',
        password: '123456',
      });


    await sendForgotPasswordEmail.execute({
      email: 'rolandinho@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
