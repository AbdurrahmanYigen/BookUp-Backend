import 'reflect-metadata';
// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import 'jest';
import request from 'supertest';
// import { Authentication } from '../../src/middleware/authentication';
import { Helper } from '../helper';
import { EventType } from '../../src/entity/EventType';
// import { User } from '../../src/entity/User';

describe('user', () => {
    const helper = new Helper();

    beforeAll(async() => {
        await helper.init();
    })

    afterAll(async() => {
        await helper.shutdown();
    })

    it('should add eventType to user' , async(done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();
        request(helper.app)
        .post(`/api/user/1/eventType`)
        .send({
            "title":"englishsession",
            "description":"Studyenglish",
            "duration": 12 ,
            "link":"englishsession/12"
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end(async(err , _res) => {
            if(err) throw err;
            const evente = await helper.getRepo(EventType).find({});

            expect(evente.length).toBe(1);
            expect(evente[0].title).toBe("englishsession")
            expect(evente[0].description).toBe("Studyenglish")
            expect(evente[0].duration).toBe(12)
            expect(evente[0].link).toBe("englishsession/12")
            done()
        })
    } )
})