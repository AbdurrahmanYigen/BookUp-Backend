import 'reflect-metadata';
// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import 'jest';
import request from 'supertest';
import { Authentication } from '../../src/middleware/authentication';
import { Helper } from '../helper';

describe('login', () => {
  const helper = new Helper();

  beforeAll(async () => {
    await helper.init();
  });

  afterAll(async () => {
    await helper.shutdown();
  });

  it('should be able to create a new user', async (done) => {
    request(helper.app)
      .post('/api/user/register')
      .send({
        email: 'fwe@dev.de',
        userName: 'Daniel',
        password: '123456',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.email).toBe('fwe@dev.de');
        expect(res.body.data.userName).toBe('Daniel');
        done();
      });
  });

  it('should be able to login', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    request(helper.app)
      .post('/api/user/token')
      .send({
        email: 'test@hda.de',
        password: '123456',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end(async (err, res) => {
        if (err) throw err;
        const tokenData = (await Authentication.verifyToken(res.body.data)) as any;
        expect(tokenData).not.toBeNull();
        expect(tokenData.email).toBe('test@hda.de');
        expect(tokenData.name).toBe('FWE-Developer');
        expect(tokenData.password).not.toBeDefined();
        expect(tokenData.iat).toBeDefined();
        expect(tokenData.exp).toBeDefined();
        done();
      });
  });
});
