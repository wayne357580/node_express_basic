const { logger } = require(`${__dirname}/models/logger`)

module.exports = (app) => {
    app.use((req, res, next) => {
        next();
    });

    app.get('/', (req, res) => {
        return res.sendFile(`${__dirname}/public/html/index.html`);
    });

    app.get('/test', (req, res) => {
        return res.status(200).json({
            'status': 'OK',
            'message': `test success`
        })
    });

    app.get('/error', (req, res) => {
        return res.status(400).json({
            'status': 'ERROR',
            'message': 'test error'
        })
    });

    app.use('/demo', require(`${__dirname}/api/demo`))
    app.use('/user', require(`${__dirname}/api/user`))

    app.route('/favicon.ico').get((req, res) => {
        return res.send("")
    });

    app.use((req, res) => {
        return res.status(404).sendFile(`${__dirname}/public/html/404.html`);
    });
}