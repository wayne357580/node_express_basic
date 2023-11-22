const { logger } = require(`${__dirname}/models/logger`)

module.exports = (app) => {
    app.use((req, res, next) => {
        req.requestTime = Date.now();
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

    app.get('/fileManager', (req, res) => {
        return res.sendFile(`${__dirname}/public/html/fileManager.html`);
    });

    app.use('/demo', require(`${__dirname}/api/demo`))
    app.use('/hello', require(`${__dirname}/api/hello`))
    app.use('/file', require(`${__dirname}/api/file`))

    app.route('/favicon.ico').get((req, res) => {
        return res.send("")
    });

    // Handle 404 error
    app.use((req, res) => {
        return res.status(404).sendFile(`${__dirname}/public/html/404.html`);
    });
    // Handle error
    app.use((err, req, res, next) => {
        logger.error(new Error(err.stack).stack)
        return res.status(500).send('Server error');
    });
}