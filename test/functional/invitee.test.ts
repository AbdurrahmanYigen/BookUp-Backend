import 'reflect-metadata';
// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import 'jest';
import request from 'supertest';
import { Helper } from '../helper';
import { Invitee } from '../../src/entity/Invitee';

describe('Invitee test', () => {
    const helper = new Helper();

    beforeAll(async() => {
        await helper.init();
    })

    afterAll(async() => {
        await helper.shutdown();
    })

    it('should create an Invitee', async(done) =>{
        await helper.resetDatabase();
        await helper.loadFixtures();
        request(helper.app)
        .post('/api/invitee')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({
            "firstname" : "test2",
            "lastname" : "user2",
            "email": "testinvitee@gmail.com"
        })
        .end(async(err , _res) => {
            if(err) throw err;
            const invitee = await helper.getRepo(Invitee).find({});
            expect(invitee.length).toBe(2);
            expect(invitee[1].firstName).toBe("test2");
            expect(invitee[1].lastName).toBe("user2");
            expect(invitee[1].email).toBe("testinvitee@gmail.com");
            done();
        })
    })

    it('should get all Invitees', async(done) =>{
        await helper.resetDatabase();
        await helper.loadFixtures();
        request(helper.app)
        .get('/api/invitee')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end(async(err , _res) => {
            if(err) throw err;
            const invitee = await helper.getRepo(Invitee).find({});
            expect(invitee.length).toBe(1);
            expect(invitee[0].firstName).toBe("test");
            expect(invitee[0].lastName).toBe("user");
            expect(invitee[0].email).toBe("test@hda.de");
            done();
        })
    })

    it('should delete an Invitee by id', async(done) =>{
        await helper.resetDatabase();
        await helper.loadFixtures();
        request(helper.app)
        .delete('/api/invitee/1')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end(async(err , _res) => {
            if(err) throw err;
            const invitee = await helper.getRepo(Invitee).find({});
            expect(invitee.length).toBe(0);
            done();
        })
    })
})