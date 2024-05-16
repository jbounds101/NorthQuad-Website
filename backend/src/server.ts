import express from 'express';
import cors from 'cors';
import { COMMENTS, MOVIES, SAMPLE_USERS } from './data';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json()); // Set to read json posts
app.use(cors( { // Allows cross reference requests
    credentials: true,
    origin:['http://localhost:4200'] 
}));

// Movies
app.get('/api/movies', (req, res) => {
    res.send(MOVIES);
});

app.get('/api/movies/:movieId', (req, res) => {
    const movieId = req.params.movieId;
    const movie = MOVIES.find(movie => movie.id == movieId);
    res.send(movie);
});
// ---

/// Users
app.post('/api/users/login', (req, res) => {
    const {email, password} = req.body; // This destructures the request into objects
    const user = SAMPLE_USERS.find(user => user.email === email && user.password === password);
    
    if (user) {
        res.send(generateTokenResponse(user)); // User found, send them a token
    } else {
        res.status(400).send('Username or password is not valid!');
    }
});

app.post('/api/users/register', (req, res) => {
    const {name, email, password} = req.body;
    
});

const generateTokenResponse = (user:any) => {
    const token = jwt.sign({email:user.email, isAdmin:user.isAdmin}, "ThisShouldBeAnEnvVar", {expiresIn:"30d"});
    user.token = token;
    return user;
}
// ---

// Comments
app.get('/api/comments', (req, res) => {
    res.send(COMMENTS);
});

app.get('/api/comments/movies/:movieId', (req, res) => {
    const movieId = req.params.movieId;
    const comments = COMMENTS.filter(comment => comment.movieId == movieId);
    res.send(comments);
});

app.get('/api/comments/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const comments = COMMENTS.filter(comment => comment.userId == userId);
    res.send(comments);
});
// ---

const PORT = 5000;
app.listen(PORT, () => {
    console.log('Server running on http://localhost:' + PORT);
});
