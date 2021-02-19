import 'reflect-metadata';
// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import 'jest';
import request from 'supertest';
// import { Authentication } from '../../src/middleware/authentication';
import { Helper } from '../helper';
import { EventType } from '../../src/entity/EventType';
import { User } from '../../src/entity/User';
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
        const authToken = await helper.loginUser('test@hda.de');
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
        .set('Authorization', authToken)
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

    it('should get event from user', async(done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();
        const authToken = await helper.loginUser('test@hda.de');
        const user = await helper.getRepo(User).findOneOrFail({relations: ['eventTypes'], where:{ id: 1}});
        const newevent = new EventType()
        newevent.title = "test"
        newevent.description = "test event"
        newevent.duration = 15
        newevent.link = "testlink"
        newevent.user = user
        await helper.getRepo(EventType).save(newevent)
        request(helper.app)
        .get(`/api/user/1/eventTypes`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', authToken)
        .end(async(err , _res) => {
            if(err) throw err;
            const event = await helper.getRepo(EventType).find({})

            expect(event[0].title).toBe("test")
            expect(event[0].description).toBe("test event")
            expect(event[0].duration).toBe(15)
            expect(event[0].link).toBe("testlink")
            done()
        })
    })

    it('should be able to update event from user', async(done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();
        const authToken = await helper.loginUser('test@hda.de');
        const user = await helper.getRepo(User).findOneOrFail({relations: ['eventTypes'], where:{ id: 1}});
        const newevent = new EventType()
        newevent.title = "test"
        newevent.description = "test event"
        newevent.duration = 15
        newevent.link = "testlink"
        newevent.user = user
        await helper.getRepo(EventType).save(newevent)
        request(helper.app)
        .patch(`/api/user/1/eventType/${newevent.id}`)
        .send({
            "title":"updatedTitle",
            "description":"UpdatedDescription",
            "duration": 0 ,
            "link":"UpdatedLink"
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', authToken)
        .end(async(err , _res) => {
            if(err) throw err;
            const event = await helper.getRepo(EventType).find({})

            expect(event[0].title).toBe("updatedTitle")
            expect(event[0].description).toBe("UpdatedDescription")
            expect(event[0].duration).toBe(0)
            expect(event[0].link).toBe("UpdatedLink")
            done()
        })
    })

    it('should be able to delete event from user', async(done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();
        const authToken = await helper.loginUser('test@hda.de');
        const user = await helper.getRepo(User).findOneOrFail({relations: ['eventTypes'], where:{ id: 1}});
        const newevent = new EventType()
        newevent.title = "test"
        newevent.description = "test event"
        newevent.duration = 15
        newevent.link = "testlink"
        newevent.user = user
        await helper.getRepo(EventType).save(newevent)
        request(helper.app)
        .delete(`/api/user/1/eventType/${newevent.id}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', authToken)
        .end(async(err , _res) => {
            if(err) throw err;
            const event = await helper.getRepo(EventType).find({})
            expect(event.length).toBe(0)
            done()
        })
    })
})