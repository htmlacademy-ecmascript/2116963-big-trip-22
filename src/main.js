import Presenter from './presenter/main-presenter';
import Model from './model/model';
import { mockPoints } from './mock/points';
import { mockOffers } from './mock/offers';
import { mockDestinations } from './mock/destinations';

const model = new Model();
model.init(mockPoints, mockOffers, mockDestinations);
const presenter = new Presenter({ model });
presenter.init();
