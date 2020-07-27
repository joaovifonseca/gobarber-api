import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const id = '21321321321';

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: id,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toMatch(id);
  });

  // it('should not be able to create two appointments on the same date', () => {
  //   expect(1 + 2).toBe(3);
  // });
});
