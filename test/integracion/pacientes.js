const { apiClient } = require('./config');
const { assert } = require('chai');
const { esPersonaObject } = require('../helper');

const apiClientBaseUri = '/v1/pacientes';

describe('Pacientes API', () => {
    let pacienteId;
    it('Guardar paciente', async () => {
      try {
        const data = { nombre : "Jonathan", apellidos : "Muñoz Mendoza", edad : 31 };
        const response = await apiClient
                          .post(`${apiClientBaseUri}`)
                          .send(data)
                          .expect(201);
        const body = response.body;
        assert.isObject(body);
        esPersonaObject(body)
        pacienteId = body.id;
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    });

    it('Obtener paciente por ID', async () => {
      try {
        const response = await apiClient
                          .get(`${apiClientBaseUri}/${pacienteId}`)
                          .expect(200);
        const body = response.body;
        assert.isObject(body);
        esPersonaObject(body)
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    });

    it('No debe obtener paciente por ID que no existente', async () => {
      try {
        const response = await apiClient
                          .get(`${apiClientBaseUri}/1000`)
                          .expect(404);
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    });
});