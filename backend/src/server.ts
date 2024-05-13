import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors( { // Allows cross reference requests
    credentials: true,
    origin:['http://localhost:4200'] 
}));

app.get('/api/movies', (req, res) => {
    res.send('movies api sent');
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log('Webserver running on http://localhost:' + PORT);
});
