import Presenter from './presenter/presenter';
import Model from './model/model';

const model = new Model();
const presenter = new Presenter({ model });
presenter.init();
