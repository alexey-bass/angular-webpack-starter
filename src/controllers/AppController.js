import config from 'config.json';

export default class AppController {

    constructor() {
        this.title = 'Angular Webpack Minimal Starter';
        this.info = angular.version;
        this.version = config.version;

        this.run();
    }

    run() {
        console.log('hello');
    }
}
