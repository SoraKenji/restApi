const { apiClient } = require("./config");
const { assert } = require("chai");
const { esPersonaObject } = require("../helper");

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

  it("Conseguir todos los posts", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/posts`)
        .expect(500);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los posts & user", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/posts?fields=user`)
        .expect(500);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los posts & user & comments", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/posts?fields=user,comments`)
        .expect(500);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los posts by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/posts/${postId}`)
        .expect(500);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los posts & user by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/posts/${postId}?fields=user`)
        .expect(500);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los posts & user & comments by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/posts/${postId}?fields=user,comments`)
        .expect(500);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los comments de posts by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/posts/${postId}/comments`)
        .expect(500);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users`)
        .expect(500);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users & posts", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users?fields=posts`)
        .expect(500);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users & albums", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users?fields=albums`)
        .expect(500);

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users & todos", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users?fields=todos`)
        .expect(500);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users & posts & albums & todos", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users?fields=posts,albums,todos`)
        .expect(500);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users by Id", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users/${userId}`)
        .expect(500);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users & posts by Id", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users/${userId}?fields=posts`)
        .expect(500);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users & albums by Id", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users/${userId}?fields=albums`)
        .expect(500);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users & todos by Id", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users/${userId}?fields=todos`)
        .expect(500);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users & posts & albums & todos by Id", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users/${userId}?fields=posts,albums,todos`)
        .expect(500);
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
      esPersonaObject(body);
      userId = body.id;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Falla al conseguir user posts", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/users/${userId}/posts`)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Falla al conseguir user albums", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/users/${userId}/albums`)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Falla al conseguir user ToDos", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/users/${userId}/todos`)
        .expect(400);
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
        .post(`${apiClientBaseUri}/posts`)
        .send(data)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      esPostObject(body);
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
        .post(`${apiClientBaseUri}/posts`)
        .send(data)
        .expect(404);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Falla al guardar post 500", async () => {
    try {
      const data = {};
      const response = await apiClient
        .post(`${apiClientBaseUri}/posts`)
        .send(data)
        .expect(500);
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
        .expect(404);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Falla al guardar user 500", async () => {
    try {
      const response = await apiClient
        .post(`${apiClientBaseUri}/users`)
        .send(data)
        .expect(500);
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
      esPostObject(body);
      commentId = body.id;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Falla al guardar Comment 500", async () => {
    try {
      const data = {};
      const response = await apiClient
        .post(`${apiClientBaseUri}/comments`)
        .send(data)
        .expect(500);
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
      esAlbum(body);
      albumId = body.id;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Falla al guardar Album 500", async () => {
    try {
      const data = {};
      const response = await apiClient
        .post(`${apiClientBaseUri}/albums`)
        .send(data)
        .expect(500);
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
      esAlbum(body);
      albumId = body.id;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Falla al guardar photo 500", async () => {
    try {
      const data = {};
      const response = await apiClient
        .post(`${apiClientBaseUri}/photos`)
        .send(data)
        .expect(500);
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
      esAlbum(body);
      albumId = body.id;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Falla al guardar ToDo 500", async () => {
    try {
      const data = {};
      const response = await apiClient
        .post(`${apiClientBaseUri}/todos`)
        .send(data)
        .expect(500);
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
        completed: true
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
        .put(`${apiClientBaseUri}/users`)
        .send(data)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      esUserObject(body);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Falla al actualizar user 404", async () => {
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
        .expect(404);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Falla al actualizar user 400", async () => {
    try {
      const data = {};
      const response = await apiClient
        .put(`${apiClientBaseUri}/users`)
        .send(data)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

  it("Conseguir todos los users", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users`)
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

  it("Conseguir todos los users & posts", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users?fields=posts`)
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
        .put(`${apiClientBaseUri}/users?fields=albums`)
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
        .put(`${apiClientBaseUri}/users?fields=todos`)
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
        .put(`${apiClientBaseUri}/users?fields=posts,albums,todos`)
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

  it("Conseguir todos los users by Id", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users/${userId}`)
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

  it("Conseguir todos los users & posts by Id", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users/${userId}?fields=posts`)
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

  it("Conseguir todos los users & albums by Id", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users/${userId}?fields=albums`)
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

  it("Conseguir todos los users & todos by Id", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users/${userId}?fields=todos`)
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

  it("Conseguir todos los users & posts & albums & todos by Id", async () => {
    try {
      const response = await apiClient
        .put(`${apiClientBaseUri}/users/${userId}?fields=posts,albums,todos`)
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

  it("Conseguir user posts", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/users/${userId}/posts`)
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

  it("Conseguir user albums", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/users/${userId}/albums`)
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

  it("Conseguir user ToDos", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/users/${userId}/todos`)
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

  it("Conseguir todos los posts", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/posts`)
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
        .get(`${apiClientBaseUri}/posts?fields=user`)
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
        .get(`${apiClientBaseUri}/posts?fields=user,comments`)
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
        .get(`${apiClientBaseUri}/posts/${postId}`)
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

  it("Conseguir todos los posts & user by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/posts/${postId}?fields=user`)
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

  it("Conseguir todos los posts & user & comments by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/posts/${postId}?fields=user,comments`)
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

  it("Conseguir todos los comments de posts by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/posts/${postId}/comments`)
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
        .put(`${apiClientBaseUri}/posts`)
        .send(data)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      esPostObject(body);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });
  it("Actualizar post falla 400", async () => {
    try {
      const data = {
        id: postId,
        userid: userId,
        title: "cltorres@gmail.com",
        body: "012345s"
      };
      const response = await apiClient
        .put(`${apiClientBaseUri}/posts`)
        .send(data)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });
  it("Actualizar post falla 500", async () => {
    try {
      const data = {};
      const response = await apiClient
        .put(`${apiClientBaseUri}/posts`)
        .send(data)
        .expect(500);
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

  it("Conseguir todos los comments & post by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/comments/${commentId}?fields=post`)
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
      esCommentObject(body);
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

  it("Actualizar Comment falla 500", async () => {
    try {
      const data = {};
      const response = await apiClient
        .put(`${apiClientBaseUri}/comments/${commentId}`)
        .send(data)
        .expect(500);
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
      for (const element of body) {
        expect(element).to.contain.keys("id", "userid", "title");
      }
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
      for (const element of body) {
        expect(element).to.contain.keys("id", "userid", "title");
      }
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
      esAlbumObject(body);
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
  it("Actualizar album falla 500", async () => {
    try {
      const data = {};
      const response = await apiClient
        .put(`${apiClientBaseUri}/albums/${commentId}`)
        .send(data)
        .expect(500);
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

  it("Conseguir todos los photos & album by id", async () => {
    try {
      const response = await apiClient
        .get(`${apiClientBaseUri}/photos/${photoId}?fields=albums`)
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
      esPhotoObject(body);
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
        .expect(200);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });
  it("Actualizar photo falla 500", async () => {
    try {
      const data = {};
      const response = await apiClient
        .put(`${apiClientBaseUri}/photos/${photoId}`)
        .send(data)
        .expect(500);
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
      for (const element of body) {
        expect(element).to.contain.keys("id", "userid", "title", "completed");
      }
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
      for (const element of body) {
        expect(element).to.contain.keys("id", "userid", "title", "completed");
      }
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
        .put(`${apiClientBaseUri}/photos/${todoId}`)
        .send(data)
        .expect(200);
      const body = response.body;
      assert.isObject(body);
      esTODOObject(body);
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
        .put(`${apiClientBaseUri}/photos/${todoId}`)
        .send(data)
        .expect(400);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });
  it("Actualizar ToDo falla 500", async () => {
    try {
      const data = {};
      const response = await apiClient
        .put(`${apiClientBaseUri}/photos/${todoId}`)
        .send(data)
        .expect(500);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });
});
