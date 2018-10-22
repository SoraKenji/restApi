const chai = require('chai');
const expect = require('chai').expect;
const should = chai.should();

const repositorio = require('../../repositorio/content');
const helper = require('../helper');
chai.use(require('chai-http'));

const app = require('../../index.js');

describe('API endpoint /users', () => {
    let userId;
    let postId;
    let commentId;
    let albumId;
    it('Should return all users', async () => {
        try {
            const user = await repositorio.getUsers();
            // expect(user);
            for (const element of user) {
                expect(element).to.contain.keys('id', 'name', 'username', 'email', 'phone', 'website');
            }
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    });

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

    it('Should save post of user', async () => {
        try {
            const data = {
                userid: userId,
                title: 'cltorres@gmail.com',
                body: '123412341234'
            };
            const post = await repositorio.savePost(data);
            chai.assert.isObject(post);
            helper.esPostObject(post);
            postId = post.id;
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    });

    it('Should save comment on user post', async () => {
        try {
            const data = {
                postid: postId,
                name: 'comment on post',
                email: 'lol@gmail.com',
                body: 'body'
            };
            const comment = await repositorio.saveComment(data);
            chai.assert.isObject(comment);
            helper.esCommentObject(comment);
            commentId = comment.id;
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    });

    it('Should save album of user', async () => {
        try {
            const data = {
                userid: userId,
                title: 'album',
            };
            const album = await repositorio.saveAlbum(data);
            chai.assert.isObject(album);
            helper.esAlbumObject(album);
            albumId = album.id;
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    });

    it('Should get user posts', async () => {
        try {
            const post = await repositorio.getUserPost(userId);
            chai.assert.isArray(post);
            for (const element of post) {
                helper.esPostObject(element);
            }
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    });

    it('Should get user albums', async () => {
        try {
            const albums = await repositorio.getUserAlbums(userId);
            chai.assert.isArray(albums);
            for (const element of albums) {
                helper.esAlbumObject(element);
            }
            // helper.esPostObject(post);
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    });

    it('Should get user TODOs', async () => {
        try {
            const todos = await repositorio.getUserTodos(userId);
            chai.assert.isArray(todos);
            for (const element of post) {
                helper.esTODOObject(todos);
            }
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    });

    it('Should update user', async () => {
        try {
            const data = {
                id: userId,
                name: 'Claudio Torres z',
                username: 'cltorre0s12345679',
                email: 'cltorres@gmail.com',
                phone: '123412341234',
                website: 'www.lol.cl'
            };
            const user = await repositorio.updateUser(data);
            chai.assert.isObject(user);
            helper.esUserObject(user);
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    });

    it('Should delete user', async () => {
        try {
            const res = await repositorio.deleteUserById(userId);
            chai.assert.isObject(res);
            if (res.rowCount < 1) {
                throw "no se ha eliminado el registro";
            }
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    });
});