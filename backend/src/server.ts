import express from 'express';
import cors from 'cors';
import { MOVIES, SAMPLE_USERS } from './data';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json()); // Set to read json posts
app.use(cors( { // Allows cross reference requests
    credentials: true,
    origin:['http://localhost:4200'] 
}));

app.get('/api/movies', (req, res) => {
    res.send(MOVIES);
});

app.post('/api/users/login', (req, res) => {
    const {email, password} = req.body; // This destructures the request into objects
    const user = SAMPLE_USERS.find(user => user.email === email && user.password === password);
    
    if (user) {
        res.send(generateTokenResponse(user)); // User found, send them a token
    } else {
        res.status(400).send('Username or password is not valid!');
    }
});

const generateTokenResponse = (user:any) => {
    const token = jwt.sign({email:user.email, isAdmin:user.isAdmin}, "ThisShouldBeAnEnvVar", {expiresIn:"30d"});
    user.token = token;
    return user;
}

const PORT = 5000;
app.listen(PORT, () => {
    console.log('Server running on http://localhost:' + PORT);
});
