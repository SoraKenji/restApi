const router = require('express').Router();
const personaRepositorio = require('../repositorio/content');

router.post('', async (req, res, next) => {
    try {  
        const { body } = req;
        const persona = await personaRepositorio.save(body);
        res.status(201).send(persona);
    } catch (err) {
        res.send(500).send(err);
    }
  });

router.get('/:id', async (req, res, next) => {
    try {  
        const { params : { id } } = req;
        const persona = await personaRepositorio.getById(id);
        if (!persona) {
            res.status(404).send();
            return
        }
        res.status(200).send(persona);
    } catch (err) {
        res.send(500).send(err);
    }
  });

  module.exports = router;
