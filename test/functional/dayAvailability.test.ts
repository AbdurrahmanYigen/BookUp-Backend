import 'reflect-metadata';
// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import 'jest';
import request from 'supertest';
import { Helper } from '../helper';
// import { DayAvailability } from '../../src/entity/DayAvailability';
import { User } from '../../src/entity/User';

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
 
})