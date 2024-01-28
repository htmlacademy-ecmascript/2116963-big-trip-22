import MainPresenter from './presenter/main-presenter';
import FilterPresenter from './presenter/filter-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import { mockPoints } from './mock/points';
import { mockOffers } from './mock/offers';
import { mockDestinations } from './mock/destinations';

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
pointsModel.init(mockPoints, mockOffers, mockDestinations);
const mainPresenter = new MainPresenter({ pointsModel, filterModel });
const filterPresenter = new FilterPresenter({ pointsModel, filterModel });
mainPresenter.init();
filterPresenter.init();
