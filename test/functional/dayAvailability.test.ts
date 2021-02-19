import 'reflect-metadata';
// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import 'jest';
import request from 'supertest';
import { Helper } from '../helper';
// import { DayAvailability } from '../../src/entity/DayAvailability';
import { User } from '../../src/entity/User';
import { DayAvailability } from '../../src/entity/DayAvailability';

describe('dayAvailability', () => {
    const helper = new Helper();

    beforeAll(async() => {
        await helper.init();
    })

    afterAll(async() => {
        await helper.shutdown();
    })

    it('should update the start and end times of Monday', async(done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();
        const authToken = await helper.loginUser('test@hda.de');

        request(helper.app)
        .patch(`/api/availability/update/1`)
        .send({
            "day": "MONDAY",
            "fromTimeHour": 20,
            "fromTimeMinute": 30,
            "endTimeHour": 21,
            "endTimeMinute": 30,
            "active": false
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', authToken)
        .end(async(err, _res) => {
            if(err) throw err;
            const user = await helper.getRepo(User).findOneOrFail({relations: ['availableTime'], where:{ id: 1}});

            expect(user.availableTime[0].fromTimeHour).toBe(20);
            expect(user.availableTime[0].fromTimeMinute).toBe(30);
            expect(user.availableTime[0].endTimeHour).toBe(21);
            expect(user.availableTime[0].endTimeMinute).toBe(30);
            expect(user.availableTime[0].active).toBe(false);
            done();
        })
    })

    it('should get all availability', async(done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();
        const authToken = await helper.loginUser('test@hda.de');

        request(helper.app)
        .get(`/api/availability`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', authToken)
        .end(async(err, _res) => {
            if(err) throw err;
            const Availability = await helper.getRepo(DayAvailability).find({});
            expect(Availability.length).toBe(2)
            done();
        })
    })

    it('should get Dayavailability of User', async(done) => {
        await helper.resetDatabase()
        await helper.loadFixtures()
        const authToken = await helper.loginUser('test@hda.de');

        request(helper.app)
        .get(`/api/availability/1`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', authToken)
        .end(async(err, _res) => {
            if(err) throw err;
            const user = await helper.getRepo(User).findOneOrFail({ relations: ['availableTime'], where: { id: 1 } });
            expect(user.availableTime.length).toBe(1)
            expect(user.availableTime[0].fromTimeHour).toBe(10)
            expect(user.availableTime[0].endTimeHour).toBe(18)
            expect(user.availableTime[0].fromTimeMinute).toBe(0)
            expect(user.availableTime[0].endTimeMinute).toBe(0)
            expect(user.availableTime[0].active).toBe(true)
            done();
        })
    })

    // it('should create availability', async(done) => {
    //     await helper.resetDatabase();
    //     await helper.loadFixtures();
    //     request(helper.app)
    //     .post(`/api/availability/`)
    //     .send({
    //         "day": "FRIDAY",
    //         "fromTimeHour": 20,
    //         "fromTimeMinute": 12,
    //         "endTimeHour": 21,
    //         "endTimeMinute": 30,
    //         "active": false
    //     })
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //     .end(async(err, _res) => {
    //         if(err) throw err;
    //         const avail = await helper.getRepo(DayAvailability).find({});
    //         expect(avail.length).toBe(3)

    //         expect(avail[2].fromTimeHour).toBe(20);
    //         expect(avail[2].fromTimeMinute).toBe(12);
    //         expect(avail[2].endTimeHour).toBe(21);
    //         expect(avail[2].endTimeMinute).toBe(30);
    //         expect(avail[2].active).toBe(false);
    //         done();
    //     })
    // })


 
})