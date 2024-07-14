/**
 * on utilise le router d'express pour définir 4 routes
 * on exprime ici un CRUD
 * pour déclarer une route dans epress: app.verbeHttp(route, fonction)
 * ici on use le router pour appeler le verbe Http
 * router.get('/:id', service.getById)
 * le callback sera pourni par un service qu'on va déclarer
 * recourir à des services permet de structurer le projet et séparer les logiques
 * on pourra se resservir de ces memes services pour d'autres entités que users
 */

var express = require('express');
var router = express.Router();
/* GET users listing. */
const service = require('../service/users');

/*Importe le middleware*/
const private = require('../middlewares/private')

//la route pour lire les infos d'un user
router.get('/:id', private.checkJWT ,service.getById);

//La route pour ajouter un user
router.put('/add', service.add);

//la route pour modifier un user
router.patch('/:id', private.checkJWT , service.update);

//la route pour supprimer un user
router.delete('/:id', private.checkJWT , service.delete);

//ajout de la route /authentificate
router.post('/authenticate', service.authenticate);

module.exports = router;
