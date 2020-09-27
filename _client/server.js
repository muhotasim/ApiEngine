import express from 'express';

const app = express();

const port = 3000;

app.listen(port, () => { console.log(`App is listening on port ${port}`) });
app.use(express.static(__dirname + '/dist'));
app.get('/', (req, res) => {
    res.send(' Hello World :) ');
 });
 