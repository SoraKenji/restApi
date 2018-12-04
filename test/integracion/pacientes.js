const { apiClient } = require("./config");
const { assert } = require("chai");
const helper = require("../helper");
const expect = require("chai").expect;

const apiClientBaseUri = "/v1/content";

describe("Pacientes API", () => {
  let userId;
  let postId;
  let commentId;
  let todoId;
  let photoId;
  let albumId;
  let addressId;
  let companyId;

  ////////////////////////

  it("Conseguir todos los posts falla 404", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/posts`)
        .expect(404);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los posts & user falla 404", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/posts?fields=user`)
        .expect(404);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los posts & user & comments falla 404", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/posts?fields=user,comments`)
        .expect(404);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los posts by id falla 404", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/posts/${postId}`)
        .expect(404);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los posts & user by id falla 404", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/posts/${postId}?fields=user`)
        .expect(404);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los posts & user & comments by id falla 404", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/posts/${postId}?fields=user,comments`)
        .expect(404);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los comments de posts by id falla 404", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/posts/${postId}/comments`)
        .expect(404);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users falla 404", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users`)
        .expect(404);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users & posts falla 404", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users?fields=posts`)
        .expect(404);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users & albums falla 404", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users?fields=albums`)
        .expect(404);

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users & todos falla 404", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users?fields=todos`)
        .expect(404);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users & posts & albums & todos falla 404", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users?fields=posts,albums,todos`)
        .expect(404);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users by Id falla 400", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users/${userId}`)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users & posts by Id falla 400", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users/${userId}?fields=posts`)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users & albums by Id falla 400", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users/${userId}?fields=albums`)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users & todos by Id falla 400", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users/${userId}?fields=todos`)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users & posts & albums & todos by Id falla 400", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users/${userId}?fields=posts,albums,todos`)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  ///////////////////////

  it("Guardar user", async () => {
    try {
      const data = {
        name: "Claudio Torres z",
        username: "cltorre0s12345679",
        email: "cltorres@gmail.com",
        phone: "123412341234",
        website: "www.lol.cl"
      };
      const response = await apiClient
        .post(`${apiClientBaseUri}/users`)
        .send(data)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      helper.esUserObject(body);
      userId = body.id;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Guardar post", async () => {
    try {
      const data = {
        userid: userId,
        title: "cltorres@gmail.com",
        body: "012345678901234567890123456789012345678901234567890123456789"
      };
      const response = await apiClient
        .post(`${apiClientBaseUri}/post`)
        .send(data)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      helper.esPostObject(body);
      postId = body.id;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Falla al guardar post 400", async () => {
    try {
      const data = {
        userid: userId,
        title: "cltorres@gmail.com",
        body: "01234567"
      };
      const response = await apiClient
        .post(`${apiClientBaseUri}/post`)
        .send(data)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Falla al guardar user 400", async () => {
    try {
      const data = {
        name: "Cla",
        username: "cltorre0s12345679",
        email: "cltorres@gmail.com",
        phone: "123412341234",
        website: "www.lol.cl"
      };
      const response = await apiClient
        .post(`${apiClientBaseUri}/users`)
        .send(data)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Guardar Comment", async () => {
    try {
      const data = {
        postid: postId,
        name: "comment on postz",
        email: "lol@gmail.com",
        body: "012345678901234567890123456789012345678901234567890123456789"
      };
      const response = await apiClient
        .post(`${apiClientBaseUri}/comments`)
        .send(data)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      helper.esCommentObject(body);
      commentId = body.id;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Falla al guardar Comment 400", async () => {
    try {
      const data = {
        postid: postId,
        name: "comment on postz",
        email: "lol@gmail.com",
        body: "01234567"
      };
      const response = await apiClient
        .post(`${apiClientBaseUri}/comments`)
        .send(data)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Guardar Album", async () => {
    try {
      const data = {
        userid: userId,
        title: "album title 02123"
      };
      const response = await apiClient
        .post(`${apiClientBaseUri}/albums`)
        .send(data)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      helper.esAlbumObject(body);
      albumId = body.id;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Falla al guardar Album 400", async () => {
    try {
      const data = {
        userid: userId,
        title: "album"
      };
      const response = await apiClient
        .post(`${apiClientBaseUri}/albums`)
        .send(data)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Guardar photo", async () => {
    try {
      const data = {
        albumid: albumId,
        title: "photo album 10203",
        url: "https://lugar.com/url1.png",
        thumbnailurl: "https://thumburl1.png"
      };
      const response = await apiClient
        .post(`${apiClientBaseUri}/photos`)
        .send(data)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      helper.esPhotoObject(body);
      photoId = body.id;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Falla al guardar photo 400", async () => {
    try {
      const data = {
        albumid: albumId,
        title: "photo",
        url: "https://lugar.com/url1.png",
        thumbnailurl: "https://thumburl1.png"
      };
      const response = await apiClient
        .post(`${apiClientBaseUri}/photos`)
        .send(data)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Guardar ToDo", async () => {
    try {
      const data = {
        userid: userId,
        title: "title todos 104e034",
        completed: true
      };
      const response = await apiClient
        .post(`${apiClientBaseUri}/todos`)
        .send(data)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      helper.esTODOObject(body);
      todoId = body.id;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Falla al guardar ToDo 400", async () => {
    try {
      const data = {
        userid: userId,
        title: "ti",
        completed: 'perro'
      };
      const response = await apiClient
        .post(`${apiClientBaseUri}/todos`)
        .send(data)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Actualizar user", async () => {
    try {
      const data = {
        id: userId,
        name: "Claudio Torreslol",
        username: "cltorre0s12345679c",
        email: "cltorres@gmail.com",
        phone: "123412341234",
        website: "www.lol.cl"
      };
      const response = await apiClient
        .put(`${apiClientBaseUri}/users/${userId}`)
        .send(data)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      helper.esUserObject(body);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Falla al actualizar user 400", async () => {
    try {
      const data = {
        id: userId,
        name: "Claudio Torreslol",
        username: "cltorre0s12345679c",
        email: "cltorres@gmail.cjk",
        phone: "123412341234",
        website: "www.lol.cl"
      };
      const response = await apiClient
        .post(`${apiClientBaseUri}/users`)
        .send(data)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Falla al actualizar user 404", async () => {
    try {
      const data = {};
      const response = await apiClient
        .put(`${apiClientBaseUri}/users`)
        .send(data)
        .expect(404);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/users`)
        .expect(200);
      for (const element of response.body) {
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

  it("Conseguir todos los users & posts", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/users?fields=posts`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
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

  it("Conseguir todos los users & albums", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/users?fields=albums`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
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

  it("Conseguir todos los users & todos", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/users?fields=todos`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
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

  it("Conseguir todos los users & posts & albums & todos", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/users?fields=posts,albums,todos`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
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

  it("Guardar address", async () => {
    try {
      const data = {
        userid: userId,
        street: "calle ejemplo 0123",
        suite: "suite ejemplo 0123",
        city: "concepcionbuena onda",
        zipcode: "4030000",
        lat: 12,
        lng: 13
      };
      const response = await apiClient
        .post(`${apiClientBaseUri}/address`)
        .send(data)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      helper.esAddressObject(body);
      addressId = body.id;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todas las addresses", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/address`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
        assert.isObject(element);
        helper.esAddressObject(element);
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir address", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/address/${addressId}`)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      helper.esAddressObject(body);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Actualizar address", async () => {
    try {
      const data = {
        userid: userId,
        street: "calle ejemplo 0123",
        suite: "suite ejemplo 0123",
        city: "concepcionbuena ondawaztho",
        zipcode: "4030000",
        lat: 12,
        lng: 13
      };
      const response = await apiClient
        .put(`${apiClientBaseUri}/address/${addressId}`)
        .send(data)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      helper.esAddressObject(body);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Guardar company", async () => {
    try {
      const data = {
        userid: userId,
        name: "calle ejemplo 0123",
        catchphrase: "suite ejemplo 0123",
        bs: "concepcionbuena onda",
      };
      const response = await apiClient
        .post(`${apiClientBaseUri}/company`)
        .send(data)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      helper.esCompanyObject(body);
      companyId = body.id;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todas las compañias", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/company`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
        assert.isObject(element);
        helper.esCompanyObject(element);
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir company", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/company/${companyId}`)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      helper.esCompanyObject(body);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir user by Id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/users/${userId}`)
        .expect(200);
      const body = response.body;
      expect(body).to.contain.keys(
        "id",
        "name",
        "username",
        "email",
        "phone",
        "website"
      );
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users & posts by Id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/users/${userId}?fields=posts`)
        .expect(200);
      const body = response.body;
      expect(body).to.contain.keys(
        "id",
        "name",
        "username",
        "email",
        "phone",
        "website"
      );
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users & albums by Id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/users/${userId}?fields=albums`)
        .expect(200);
      const body = response.body;
      expect(body).to.contain.keys(
        "id",
        "name",
        "username",
        "email",
        "phone",
        "website"
      );
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users & todos by Id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/users/${userId}?fields=todos`)
        .expect(200);
      const body = response.body;
      expect(body).to.contain.keys(
        "id",
        "name",
        "username",
        "email",
        "phone",
        "website"
      );
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users & posts & albums & todos by Id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/users/${userId}?fields=posts,albums,todos`)
        .expect(200);
      const body = response.body;
      expect(body).to.contain.keys(
        "id",
        "name",
        "username",
        "email",
        "phone",
        "website"
      );
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir user posts", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/users/${userId}/posts`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
        expect(element).to.contain.keys("id", "userid", "title", "body");
      }
      // expect(body).to.contain.keys("id", "userid", "title", "body");
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir user albums", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/users/${userId}/albums`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
        expect(element).to.contain.keys(
          "id",
          "title",
          "userid",
        );
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir user ToDos", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/users/${userId}/todos`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
        expect(element).to.contain.keys("id", "userid", "title", "completed");
      }
      // expect(body).to.contain.keys("id", "userid", "title", "completed");
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los posts", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/post`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
        expect(element).to.contain.keys("id", "userid", "title", "body");
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los posts & user", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/post?fields=user`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
        expect(element).to.contain.keys("id", "userid", "title", "body");
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los posts & user & comments", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/post?fields=user,comments`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
        expect(element).to.contain.keys("id", "userid", "title", "body");
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los posts by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/post/${postId}`)
        .expect(200);
      const body = response.body;
      expect(body).to.contain.keys("id", "userid", "title", "body");
      /*for (const element of body) {
        expect(element).to.contain.keys("id", "userid", "title", "body");
      }*/
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los posts & user by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/post/${postId}?fields=user`)
        .expect(200);
      const body = response.body;
      expect(body).to.contain.keys("id", "userid", "title", "body");
      /*for (const element of body) {
        expect(element).to.contain.keys("id", "userid", "title", "body");
      }*/
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los posts & user & comments by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/post/${postId}?fields=user,comments`)
        .expect(200);
      const body = response.body;
      expect(body).to.contain.keys("id", "userid", "title", "body");
      /*for (const element of body) {
        expect(element).to.contain.keys("id", "userid", "title", "body");
      }*/
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los comments de posts by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/post/${postId}/comments`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
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
  it("Actualizar post", async () => {
    try {
      const data = {
        id: postId,
        userid: userId,
        title: "cltorres@gmail.com",
        body:
          "012345678901234567890123456789012345678901234567890123456789sdfsdfds"
      };
      const response = await apiClient
        .put(`${apiClientBaseUri}/post/${postId}`)
        .send(data)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      helper.esPostObject(body);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Actualizar post falla 404", async () => {
    try {
      const data = {
        id: postId,
        userid: userId,
        title: "cltorres@gmail.com",
        body: "012345s"
      };
      const response = await apiClient
        .put(`${apiClientBaseUri}/post`)
        .send(data)
        .expect(404);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los comments", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/comments`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
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

  it("Conseguir todos los comments & post", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/comments?fields=post`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
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

  it("Conseguir todos los comments by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/comments/${commentId}`)
        .expect(200);
      const body = response.body;
      expect(body).to.contain.keys(
        "id",
        "postid",
        "name",
        "email",
        "body"
      );
      /*for (const element of body) {
       
      }*/
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los comments & post by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/comments/${commentId}?fields=post`)
        .expect(200);
      const body = response.body;
      expect(body).to.contain.keys(
        "id",
        "postid",
        "name",
        "email",
        "body"
      );
      /*for (const element of body) {
        expect(element).to.contain.keys(
          "id",
          "postid",
          "name",
          "email",
          "body"
        );
      }*/
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Actualizar Comment", async () => {
    try {
      const data = {
        id: commentId,
        postid: postId,
        name: "comment on postz",
        email: "lol@gmail.com",
        body: "012345678901234567890123456789012345678901234567890123456789"
      };
      const response = await apiClient
        .put(`${apiClientBaseUri}/comments/${commentId}`)
        .send(data)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      helper.esCommentObject(body);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Actualizar Comment falla 400", async () => {
    try {
      const data = {
        id: commentId,
        postid: postId,
        name: "comment on postz",
        email: "lol@gmail.com",
        body: "012345678"
      };
      const response = await apiClient
        .put(`${apiClientBaseUri}/comments/${commentId}`)
        .send(data)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los albums", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/albums`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
        expect(element).to.contain.keys("id", "userid", "title");
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los albums & photos", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/albums?fields=photos`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
        expect(element).to.contain.keys("id", "userid", "title");
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los albums by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/albums/${albumId}`)
        .expect(200);
      const body = response.body;
      expect(body).to.contain.keys("id", "userid", "title");
      /*for (const body of body) {
        expect(element).to.contain.keys("id", "userid", "title");
      }*/
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los albums & photos by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/albums/${albumId}?fields=photos`)
        .expect(200);
      const body = response.body;
      expect(body).to.contain.keys("id", "userid", "title");
      /*for (const element of body) {
        expect(element).to.contain.keys("id", "userid", "title");
      }*/
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Actualizar album", async () => {
    try {
      const data = {
        id: albumId,
        userid: userId,
        title: "album title 02123xcxcx"
      };
      const response = await apiClient
        .put(`${apiClientBaseUri}/albums/${commentId}`)
        .send(data)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      helper.esAlbumObject(body);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });
  it("Actualizar album falla 400", async () => {
    try {
      const data = {
        id: albumId,
        userid: userId,
        title: "al"
      };
      const response = await apiClient
        .put(`${apiClientBaseUri}/albums/${commentId}`)
        .send(data)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos las fotos de un album", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/albums/${albumId}/photos`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
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

  it("Conseguir todos los photos", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/photos`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
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

  it("Conseguir todos los photos & album", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/photos?fields=albums`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
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

  it("Conseguir todos los photos by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/photos/${photoId}`)
        .expect(200);
      const body = response.body;
      expect(body).to.contain.keys(
        "id",
        "albumid",
        "title",
        "url",
        "thumbnailurl"
      );
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los photos & album by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/photos/${photoId}?fields=albums`)
        .expect(200);
      const body = response.body;
      expect(body).to.contain.keys(
        "id",
        "albumid",
        "title",
        "url",
        "thumbnailurl"
      );
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Actualizar photo", async () => {
    try {
      const data = {
        id: photoId,
        albumid: albumId,
        title: "photo album 10203",
        url: "https://lugar.com/url1.png",
        thumbnailurl: "https://thumburl1.png"
      };
      const response = await apiClient
        .put(`${apiClientBaseUri}/photos/${photoId}`)
        .send(data)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      helper.esPhotoObject(body);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });
  it("Actualizar photo falla 400", async () => {
    try {
      const data = {
        id: photoId,
        albumid: albumId,
        title: "pho3",
        url: "ugar.com/url1.png",
        thumbnailurl: "https://thumburl1.png"
      };
      const response = await apiClient
        .put(`${apiClientBaseUri}/photos/${photoId}`)
        .send(data)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los ToDos", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/todos`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
        expect(element).to.contain.keys("id", "userid", "title", "completed");
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los ToDos & user", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/todos?fields=user`)
        .expect(200);
      const body = response.body;
      for (const element of body) {
        expect(element).to.contain.keys("id", "userid", "title", "completed");
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los ToDos by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/todos/${todoId}`)
        .expect(200);
      const body = response.body;
      expect(body).to.contain.keys("id", "userid", "title", "completed");
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los ToDos & user by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/todos/${todoId}?fields=user`)
        .expect(200);
      const body = response.body;
      expect(body).to.contain.keys("id", "userid", "title", "completed");
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Actualizar ToDo", async () => {
    try {
      const data = {
        id: todoId,
        userid: userId,
        title: "title todos 104e034sdsds",
        completed: true
      };
      const response = await apiClient
        .put(`${apiClientBaseUri}/todos/${todoId}`)
        .send(data)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      helper.esTODOObject(body);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });
  it("Actualizar ToDo falla 400", async () => {
    try {
      const data = {
        id: todoId,
        userid: userId,
        title: "ti",
        completed: true
      };
      const response = await apiClient
        .put(`${apiClientBaseUri}/todos/${todoId}`)
        .send(data)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Actualizar ToDo falla 404", async () => {
    try {
      const data = {
        id: todoId,
        userid: userId,
        title: "ti",
        completed: true
      };
      const response = await apiClient
        .put(`${apiClientBaseUri}/todo/${todoId}`)
        .send(data)
        .expect(404);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });
});
