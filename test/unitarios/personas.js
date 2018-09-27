const { assert } = require('chai');
const personaRepositorio = require('../../repositorio/personas');

describe('Repositorio Persona', () => {
    let personaId;
    it('Debe guardar una persona', async () => {
      const data = { nombre : "Jonathan", apellidos : "Muñoz Mendoza", edad : 30 };
      try {
        const persona = await personaRepositorio.save(data);
        assert.isObject(persona);
        esPersonaObject(persona);
        personaId = persona.id;  
        return Promise.resolve();        
      } catch (err) {
        return Promise.reject(err);
      }
    });

    it('Debe obtener una persona por ID', async () => {
        try {
          const persona = await personaRepositorio.getById(personaId);
          assert.isObject(persona);
          esPersonaObject(persona);
          return Promise.resolve();        
        } catch (err) {
          return Promise.reject(err);
        }
      });
});
