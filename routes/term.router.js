var express = require('express');
var termRouter = express.Router();
const termController = require('../controllers/term.controller')


termRouter.get('/', termController.getTerms);
termRouter.post('/store', termController.postTerm);
termRouter.post('/update', termController.updateTerm);
termRouter.get('/details/:id', termController.getSingleTerm);
termRouter.get('/delete/:id', termController.deleteTerm);

module.exports = termRouter;
