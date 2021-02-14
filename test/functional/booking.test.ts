import 'reflect-metadata';
// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import 'jest';
import request from 'supertest';
import { Helper } from '../helper';
import { Booking } from '../../src/entity/Booking';
import { EventType } from '../../src/entity/EventType';
// import { Status } from '../../src/enums/status';
// import { DayAvailability } from '../../src/entity/DayAvailability';
// import { User } from '../../src/entity/User';
// import { DayAvailability } from '../../src/entity/DayAvailability';

describe('Booking', () => {
    const helper = new Helper();

    beforeAll(async() => {
        await helper.init();
    })

    afterAll(async() => {
        await helper.shutdown();
    })

    it('should get all booking', async(done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();
        request(helper.app)
        .get(`/api/booking`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end(async(err , _res) => {
            if(err) throw err;
            const booking = await helper.getRepo(Booking).find({});
            expect(booking.length).toBe(1)
            // expect(res.body.length).toBe(1);  
            // expect(res.body.data.userName).toBe("FWE-Developer");
            // expect(res.body.data.email).toBe("test@hda.de");
            done();
        })
    })

    it ('should create a booking' , async(done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();

        const eventType = new EventType()
        eventType.link = "englishsession/12"
        eventType.duration = 12
        eventType.description = "Studyenglish"
        eventType.title = "englishsession"

        await helper.getRepo(EventType).save(eventType)
        const date = new Date('1995-12-17T03:24:00')
        request(helper.app)
        .post(`/api/booking`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({
            "date" : date,
            "status" : 1,
            "invitee" : {
                "id": 1,
                "firstName": "test",
                "lastName": "user",
                "email": "test@hda.de",
            },
            "eventType": {
                "id" : 1,
                "title":"englishsession",
                "description":"Studyenglish",
                "duration": 12 ,
                "link":"englishsession/12"
            }
        })
        .end(async(err , _res) => {
            if(err) throw err;
            const booking = await helper.getRepo(Booking).find({});
            expect(booking.length).toBe(2)
            done();
        })
    })



 
})