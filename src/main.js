import MainPresenter from './presenter/main-presenter';
import FilterPresenter from './presenter/filter-presenter';
import InfoPresenter from './presenter/info-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import PointsApiService from './points-api-service';

const AUTHORIZATION = 'Basic QWxleFY6MTIzNDU=';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const pointsModel = new PointsModel({ pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION) });
const filterModel = new FilterModel();
pointsModel.init();
const mainPresenter = new MainPresenter({ pointsModel, filterModel });
const filterPresenter = new FilterPresenter({ pointsModel, filterModel });
new InfoPresenter({ pointsModel });
mainPresenter.init();
filterPresenter.init();
