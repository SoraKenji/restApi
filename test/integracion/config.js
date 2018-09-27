require('dotenv').config({ path: 'env.env' });

const supertest = require('supertest');

const apiClient = supertest.agent(process.env.BLOG_URI);

exports.apiClient = apiClient;