const chai = require('chai');
const repositorio = require('../../repositorio/content');
const helper = require('../helper');

describe('', () => {
  let userId;
  it('Debe guardar un usuario', async () => {
    const data = {
      name: 'Claudio Torres Aviles',
      username: 'cltorre0s12345679',
      email: 'cltorres@gmail.com',
      phone: '123412341234',
      website: 'www.lol.cl'
    };
    try {
      const user = await repositorio.saveUser(data);
      chai.assert.isObject(user);
      helper.esUserObject(user);
      userId = user.id;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it('Debe conseguir todos los usuarios', async () => {
    try {
      const user = await repositorio.getUsers();
      chai.should
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it('Debe conseguir un usuario ingresado anteriormente', async () => {
    try {
      const user = await repositorio.getUsersById(userId);
      chai.assert.isObject(user);
      helper.esUserObject(user);
      userId = user.id;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });
});
