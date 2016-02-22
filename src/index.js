import vendors     from './vendors.module.js';
import styles      from './assets/styles.less';
import controllers from './controllers/controllers.module.js';

//import { routes } from 'config/routes';

angular.module('app', [
    vendors.name,
    controllers.name
])
    //.config(routes)
;

angular.bootstrap(document, ['app']);
