const express = require('express');
const { projects } = require('./data.json');

const app = express();
app.use('/static', express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    const projectId = req.params.id;
    const project = projects[projectId];
    if (project) {
        res.render('project', { project });
    }
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});