import express from 'express';
import cors from 'cors';
import { dataComments, dataMovies, dataUsers, findHighestId } from './data';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json()); // Set to read json posts
app.use(cors( { // Allows cross reference requests
    credentials: true,
    origin:['http://localhost:4200'] 
}));

let highestUserId:number = findHighestId(dataUsers);
let highestCommentId:number = findHighestId(dataComments);

// Movies
app.get('/api/movies', (req, res) => {
    res.send(dataMovies);
});

app.get('/api/movies/:movieId', (req, res) => {
    const movieId = req.params.movieId;
    const movie = dataMovies.find(movie => movie.id == movieId);
    res.send(movie);
});
// ---

/// Users
app.post('/api/users/login', (req, res) => {
    const {email, password} = req.body; // This destructures the request into objects
    const user = dataUsers.find(user => user.email === email && user.password === password);
    
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
function findCommentById(id:string) {
    return dataComments.find(comment => comment.id === id);
}

app.get('/api/comments', (req, res) => {
    res.send(dataComments);
});

app.get('/api/comments/movies/:movieId', (req, res) => {
    const movieId = req.params.movieId;
    const comments = dataComments.filter(comment => comment.movieId == movieId);
    res.send(comments);
});

app.get('/api/comments/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const comments = dataComments.filter(comment => comment.userId == userId);
    res.send(comments);
});

app.post('/api/comments', (req, res) => {
    // Here would be a good place to validate the request with the userToken
    const {body, userName, userId, movieId} = req.body;
    highestCommentId++;
    const newComment = {
        id: highestCommentId.toString(),
        body: body,
        userName: userName,
        userId: userId,
        movieId: movieId
    };
    dataComments.push(newComment);
    res.status(201).send(newComment);
});

app.patch('/api/comments/:commentId', (req, res) => {
    // Again, this should be checked with some sort of verification
    const id = req.params.commentId;
    const {body} = req.body;
    let comment = findCommentById(id);
    if (comment) {
        comment.body = body;
        res.send(comment);
    } else {
        res.status(400).json({ error: 'Comment cannot be found!'});
    }
});

app.delete('/api/comments/:commentId', (req, res) => {
    // Again, this should be checked with some sort of verification
    const id = req.params.commentId;
    let comment = findCommentById(id);
    if (comment) {
        const index = dataComments.findIndex(comment => comment.id === id);
        dataComments.splice(index, 1);
        res.status(200).json({ message: 'Comment deleted successfully!' });
    } else {
        res.status(400).json({ error: 'Comment cannot be found!' });
    }
});

// ---

const PORT = 5000;
app.listen(PORT, () => {
    console.log('Server running on http://localhost:' + PORT);
});

