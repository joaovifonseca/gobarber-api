import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvaiabilityController from '../controllers/ProviderDayAvaiabilityController';
import ProviderMonthAvaiabilityController from '../controllers/ProviderMonthAvaiabilityController';


const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayAvaiabilityController = new ProviderDayAvaiabilityController();
const providerMonthAvaiabilityController = new ProviderMonthAvaiabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get('/:provider_id/month-availability', celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required(),
    }
}), providerMonthAvaiabilityController.index);

providersRouter.get('/:provider_id/day-availability', celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required(),
    }
}), providerDayAvaiabilityController.index);


export default providersRouter;
