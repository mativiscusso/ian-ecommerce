const { bootstrapWorker } = require('@vendure/core');
const { config } = require('./vendure-config');

bootstrapWorker(config)
.then(worker => worker.startJobQueue())
.catch(err => {
    // tslint:disable-next-line:no-console
    console.log(err);
});
