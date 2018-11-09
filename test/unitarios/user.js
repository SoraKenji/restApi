const chai = require("chai");
const expect = require("chai").expect;
const should = chai.should();

const repositorio = require("../../repositorio/content");
const helper = require("../helper");
chai.use(require("chai-http"));

const app = require("../../index.js");

describe("API endpoint /users", () => {
  let userId;
  let postId;
  let commentId;
  let todoId;
  let photoId;
  let albumId;

  let addressId;
  let companyId;
  it("Should return all users", async () => {
    try {
      const user = await repositorio.getUsers();
      // expect(user);
      for (const element of user) {
        expect(element).to.contain.keys(
          "id",
          "name",
          "username",
          "email",
          "phone",
          "website"
        );
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Debe guardar un usuario", async () => {
    const data = {
      name: "Claudio Torres Aviles",
      username: "cltorre0s12345679",
      email: "cltorres@gmail.com",
      phone: "123412341234",
      website: "www.lol.cl"
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

  it("Debe conseguir un usuario ingresado anteriormente", async () => {
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

  it("Debe conseguir un usuario ingresado anteriormente", async () => {
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

  it("Should save post of user", async () => {
    try {
      const data = {
        userid: userId,
        title: "cltorres@gmail.com",
        body: "123412341234"
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

  it("Should update post of user", async () => {
    try {
      const data = {
        id: postId,
        userid: userId,
        title: "cltorres@gmail.comz",
        body: "123412341234z"
      };
      const post = await repositorio.updatePost(data);
      chai.assert.isObject(post);
      helper.esPostObject(post);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should save comment on user post", async () => {
    try {
      const data = {
        postid: postId,
        name: "comment on post",
        email: "lol@gmail.com",
        body: "body"
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

  it("Should update comment on user post", async () => {
    try {
      const data = {
        id: commentId,
        postid: postId,
        name: "comment on postz",
        email: "lol@gmail.comz",
        body: "bodyz"
      };
      const comment = await repositorio.updateComment(data);
      chai.assert.isObject(comment);
      helper.esCommentObject(comment);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should save album of user", async () => {
    try {
      const data = {
        userid: userId,
        title: "album"
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

  it("Should update album of user", async () => {
    try {
      const data = {
        id: albumId,
        userid: userId,
        title: "albumz"
      };
      const album = await repositorio.updateAlbum(data);
      chai.assert.isObject(album);
      helper.esAlbumObject(album);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get user posts", async () => {
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

  it("Should get user albums", async () => {
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

  it("Should get user TODOs", async () => {
    try {
      const todos = await repositorio.getUserTodos(userId);
      chai.assert.isArray(todos);
      for (const element of todos) {
        helper.esTODOObject(todos);
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should update user", async () => {
    try {
      const data = {
        id: userId,
        name: "Claudio Torres z",
        username: "cltorre0s12345679",
        email: "cltorres@gmail.com",
        phone: "123412341234",
        website: "www.lol.cl"
      };
      const user = await repositorio.updateUser(data);
      chai.assert.isObject(user);
      helper.esUserObject(user);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get all posts", async () => {
    try {
      const posts = await repositorio.getPosts();
      for (const element of posts) {
        expect(element).to.contain.keys("id", "userid", "title", "body");
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get user of posts", async () => {
    try {
      const users = await repositorio.getPostsUser(postId);
      for (const element of users) {
        expect(element).to.contain.keys(
          "id",
          "name",
          "username",
          "email",
          "phone",
          "website"
        );
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get all ToDos", async () => {
    try {
      const todos = await repositorio.getTodos();
      for (const element of todos) {
        expect(element).to.contain.keys("id", "userid", "title", "completed");
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get photos of album", async () => {
    try {
      const photosAlbum = await repositorio.getAlbumsPhotos(albumId);
      for (const element of photosAlbum) {
        expect(element).to.contain.keys(
          "id",
          "albumid",
          "title",
          "url",
          "thumbnailurl"
        );
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get all photos", async () => {
    try {
      const photos = await repositorio.getPhotos();
      for (const element of photos) {
        expect(element).to.contain.keys(
          "id",
          "albumid",
          "title",
          "url",
          "thumbnailurl"
        );
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should save ToDo of User", async () => {
    try {
      const data = {
        userid: userId,
        title: "title",
        completed: true
      };
      const todo = await repositorio.saveTODO(data);
      chai.assert.isObject(todo);
      helper.esTODOObject(todo);
      todoId = todo.id;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should update ToDo of User", async () => {
    try {
      const data = {
        id: todoId,
        userid: userId,
        title: "titlel",
        completed: true
      };
      const todo = await repositorio.updateTODO(data);
      chai.assert.isObject(todo);
      helper.esTODOObject(todo);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get ToDos of User", async () => {
    try {
      const todo = await repositorio.getTodosUser(userId);
      chai.assert.isObject(todo);
      helper.esTODOObject(todo);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get all albums", async () => {
    try {
      const albums = await repositorio.getAlbums();
      for (const element of albums) {
        expect(element).to.contain.keys("id", "userid", "title");
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get album by id", async () => {
    try {
      const album = await repositorio.getAlbumById(albumId);
      chai.assert.isObject(album);
      helper.esAlbumObject(album);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should save photo", async () => {
    try {
      const data = {
        albumid: albumId,
        title: "photo",
        url: "url1",
        thumbnailurl: "thumburl1"
      };
      const photo = await repositorio.savePhoto(data);
      chai.assert.isObject(photo);
      helper.esPhotoObject(photo);
      photoId = photo.id;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should save photo", async () => {
    try {
      const data = {
        id: photoId,
        albumid: albumId,
        title: "photoz",
        url: "url1z",
        thumbnailurl: "thumburl1z"
      };
      const photo = await repositorio.updatePhoto(data);
      chai.assert.isObject(photo);
      helper.esPhotoObject(photo);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get photos by id", async () => {
    try {
      const photo = await repositorio.getPhotosById(photoId);
      chai.assert.isObject(photo);
      helper.esPhotoObject(photo);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get photos of albums by photoId", async () => {
    try {
      const photos = await repositorio.getPhotosAlbums(photoId);
      for (const element of photos) {
        expect(element).to.contain.keys("id", "albumid", "title");
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get comment by id", async () => {
    try {
      const comment = await repositorio.getCommentDataById(commentId);
      chai.assert.isObject(comment);
      helper.esCommentObject(comment);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get all comments", async () => {
    try {
      const comments = await repositorio.getComments();
      for (const element of comments) {
        expect(element).to.contain.keys(
          "id",
          "postid",
          "name",
          "email",
          "body"
        );
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get post by comment id", async () => {
    try {
      const comments = await repositorio.getCommentPost(commentId);
      for (const element of comments) {
        expect(element).to.contain.keys("id", "userid", "title", "body");
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get post by id", async () => {
    try {
      const post = await repositorio.getPostDataById(postId);
      chai.assert.isObject(post);
      helper.esPostObject(post);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get posts comment by post id", async () => {
    try {
      const comments = await repositorio.getPostsComments(postId);
      for (const element of comments) {
        expect(element).to.contain.keys("id", "userid", "title", "body");
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get addresses", async () => {
    try {
      const addresses = await repositorio.getAddresses();
      for (const element of addresses) {
        addressId = element.id;
        expect(element).to.contain.keys(
          "id",
          "userid",
          "street",
          "suite",
          "city",
          "zipcode",
          "lat",
          "lng"
        );
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get companies", async () => {
    try {
      const companies = await repositorio.getCompanies();
      for (const element of companies) {
        companyId = element.id;
        expect(element).to.contain.keys(
          "id",
          "userid",
          "name",
          "catchphrase",
          "bs"
        );
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get addresses by id", async () => {
    try {
      const addresses = await repositorio.getAddressesById(addressId);
      chai.assert.isObject(addresses);
      helper.esAddressObject(addresses);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get companies by id", async () => {
    try {
      const companies = await repositorio.getCompaniesById(companyId);
      chai.assert.isObject(companies);
      helper.esCompanyObject(companies);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get todo by id", async () => {
    try {
      const todo = await repositorio.getTodosById(todoId);
      chai.assert.isObject(todo);
      helper.esTODOObject(todo);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Should get user by id", async () => {
    try {
      const user = await repositorio.getUserDataById(userId);
      chai.assert.isObject(user);
      helper.esUserObject(user);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  /*it('Should delete user', async () => {
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
    });*/
});
