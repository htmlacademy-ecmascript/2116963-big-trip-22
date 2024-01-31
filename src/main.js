import MainPresenter from './presenter/main-presenter';
import FilterPresenter from './presenter/filter-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
// import { mockPoints } from './mock/points';
// import { mockOffers } from './mock/offers';
// import { mockDestinations } from './mock/destinations';
import PointsApiService from './points-api-service';

const AUTHORIZATION = 'Basic YWxleC5ydTkzMTFAZ21haWwuY29tOg==';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

// const newButtonContainer = document.querySelector('.trip-main');
// const newButtonComponent = null;

const pointsModel = new PointsModel({ pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION) });
const filterModel = new FilterModel();
pointsModel.init();
const mainPresenter = new MainPresenter({ pointsModel, filterModel });
// const filterPresenter = new FilterPresenter({ pointsModel, filterModel });
mainPresenter.init();
// filterPresenter.init();
