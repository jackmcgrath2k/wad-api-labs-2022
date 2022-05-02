import express from 'express';
import { movies, movieReviews, movieDetails } from './moviesData';
import uniqid from 'uniqid';
import asyncHandler from 'express-async-handler';

const router = express.Router(); 
router.get('/', (req, res) => {
    res.json(movies);
});

// Get movie details
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (movieDetails.id == id) {
        res.status(200).json(movieDetails);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

// Get movie reviews
router.get('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);
    // find reviews in list
    if (movieReviews.id == id) {
        res.status(200).json(movieReviews);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

  // register
  router.post('/', asyncHandler(async (req, res) => {
    if (req.query.action === 'register') {  //if action is 'register' then save to DB
        await User(req.body).save()
        res.status(201).json({
            code: 201,
            msg: 'Successful created new user.',
        });
    }
    else {  //Must be authenticating the!!! Query the DB and check if there's a match
        const user = await User.findOne(req.body);
        if (!user) {
            return res.status(401).json({ code: 401, msg: 'Authentication failed' })
        } else {
            return res.status(200).json({ code: 200, msg: "Authentication Successful", token: 'TEMPORARY_TOKEN' })
        }
    }
}));
export default router;