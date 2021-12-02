const express = require('express');
const { projects } = require('./data.json');
var port = process.env.PORT || 3000;

const app = express();
app.use('/static', express.static('public'));
app.set('view engine', 'pug');

// index route
app.get('/', (req, res) => {
    res.render('index', { projects });
});

// about route
app.get('/about', (req, res) => {
    res.render('about');
});

// project route, based on id passed in url. If if is not existing, send to error handler
app.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects[projectId];
    if (project) {
        res.render('project', { project });
    } else {
        const err = new Error();
        err.status = 404;
        err.message = 'Oh no! There does not appear to be a project with this ID.';
        next(err);
    }
});

// 404 Error Handler
app.use((req, res, next) => {
    console.log('404 Handler Called');
    const err = new Error();
    err.status = 404;
    err.message = 'Oh no! The server exploded... Probably not, but we couldn\'t find the page you are looking for.';
    next(err);
});

// Global Error Handler
app.use((err, req, res, next) => {
    if (err) {
        console.log('Global error handler called', err);
    }
    if (err.status === 404) {
        res.status(404).render('not-found', { err });
    } else {
        err.message = err.message || 'Oh no! The server exploded... Probably not, but something went wrong.';
        err.status = err.status || 500;
        res.status(err.status);
        res.render('error', { err });
    }
})

// Log confirmation of app running
app.listen(port, () => {
    console.log(`The application is running on localhost:${port}`);
});
