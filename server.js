import express from 'express';
const app = express();

app.use((req, rest, next) => {
    console.log('app.use');
    next();
});

app.use('/store', (req, res, next) => {
    console.log('Hej, jestem pośrednikiem między żądaniem a odpowiedzią!')
    console.log('app.use || /store');
    next();
});

app.use(express.static('assets'));

app.get('/', (req, res) => {
    res.sendFile('/index.html');
});

app.get('/userform', (req, res) => {
    const response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    res.json(response);
});

app.get('/store', (req, res) => {
    console.log('Jestem pośrednikiem przy żądaniu do /store');
    res.send('/store');
});

const server = app.listen(3333, 'localhost', () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Przykładowa aplikacja nasłuchuje na http://${host}:${port}`);
})