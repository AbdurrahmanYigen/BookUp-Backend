import 'reflect-metadata';
// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import 'jest';
import request from 'supertest';
import { Helper } from '../helper';
import { Booking } from '../../src/entity/Booking';
import { Offer } from '../../src/entity/Offer';
// import { Status } from '../../src/enums/status';
// import { DayAvailability } from '../../src/entity/DayAvailability';
// import { User } from '../../src/entity/User';
// import { DayAvailability } from '../../src/entity/DayAvailability';

describe('Booking', () => {
    const helper = new Helper();

    beforeAll(async () => {
        await helper.init();
    })

    afterAll(async () => {
        await helper.shutdown();
    })

    it('should get all booking', async (done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();
        request(helper.app)
            .get(`/api/booking`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end(async (err, _res) => {
                if (err) throw err;
                const booking = await helper.getRepo(Booking).find({});
                expect(booking.length).toBe(1)
                // expect(res.body.length).toBe(1);  
                // expect(res.body.data.userName).toBe("FWE-Developer");
                // expect(res.body.data.email).toBe("test@hda.de");
                done();
            })
    })

    it('should create a booking', async (done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();

        const offer = new Offer()
        offer.duration = 12
        offer.description = "Studyenglish"
        offer.title = "englishsession"

        await helper.getRepo(Offer).save(offer)
        const date = new Date('1995-12-17T03:24:00')
        request(helper.app)
            .post(`/api/booking`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                "date": date,
                "status": 1,
                "invitee": {
                    "id": 1,
                    "firstName": "test",
                    "lastName": "user",
                    "email": "test@hda.de",
                },
                "offer": {
                    "id": 1,
                    "title": "englishsession",
                    "description": "Studyenglish",
                    "duration": 12,
                    "link": "englishsession/12"
                }
            })
            .end(async (err, _res) => {
                if (err) throw err;
                const booking = await helper.getRepo(Booking).find({});
                expect(booking.length).toBe(2)
                done();
            })
    })

    it('should delete booking by id', async (done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();
        request(helper.app)
            .delete(`/api/booking/1`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end(async (err, _res) => {
                if (err) throw err;
                const booking = await helper.getRepo(Booking).find({});
                expect(booking.length).toBe(0)
                done();
            })
    })

    it('should update booking by id', async (done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();
        const date = new Date('1995-12-17T03:24:00')
        const offer = new Offer()
        offer.duration = 12
        offer.description = "Studyenglish"
        offer.title = "englishsession"
        request(helper.app)
            .patch(`/api/booking/1`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                "date": date,
                "status": 0,
            })
            .end(async (err, _res) => {
                if (err) throw err;
                const booking = await helper.getRepo(Booking).find({});
                expect(booking.length).toBe(1)
                expect(booking[0].status).toBe(0)
                done();
            })
    })






})