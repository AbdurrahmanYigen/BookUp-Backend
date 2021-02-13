import 'reflect-metadata';
// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import 'jest';
import request from 'supertest';
import { Helper } from '../helper';
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

    it('should get all users', async (done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();
        request(helper.app)
          .get('/api/user/')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (err) throw err;
            expect(res.body.data.length).toBeGreaterThan(1);
            done();
        });
    });

    it('should get a specific user' , async(done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();
        request(helper.app)
        .get(`/api/user/1`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end(async(err , res) => {
            if(err) throw err;
//            expect(res.body.length).toBe(1);  todo: herausfinden wie man die Länge bekommt, weil es so undefined ist
            expect(res.body.data.userName).toBe("FWE-Developer");
            expect(res.body.data.email).toBe("test@hda.de");
            done();
        })
    } )

    it('should update the username and email of a specific user' , async(done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();
        request(helper.app)
        .patch(`/api/user/1`)
        .send({
            "userName": "changed",
            "email": "changed@email.test"
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end(async(err , _res) => {
            if(err) throw err;
            const user = await helper.getRepo(User).findOneOrFail(1);

            expect(user.userName).toBe("changed");
            expect(user.email).toBe("changed@email.test");
            done();
        })
    } )
    
    // it('should create a eventType for a User via Route' , async(done) => {
    //     await helper.resetDatabase();
    //     await helper.loadFixtures();
    //     request(helper.app)
    //     .post('/1/eventType')
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //     .send({
    //         "title": "Test-Event",
    //         "description": "This is a test description for a test event",
    //         "duration": 15,
    //         "link": "lorem/ipsum/dolor/sit/amet"
    //     })
    //     .end(async(err , _res) => {
    //         console.log("RESPONSE: ", _res);
    //         if(err) throw err;
    //         const user = await helper.getRepo(User).findOneOrFail({relations: ['eventTypes'], where: {id: 1}});

    //         console.log("USER:", user);
    //         expect(user.eventTypes.length).toBe(1);
    //         expect(user.eventTypes[0].title).toBe("Test-Event");
    //         expect(user.eventTypes[0].description).toBe("This is a test description for a test event");
    //         expect(user.eventTypes[0].duration).toBe(15);
    //         expect(user.eventTypes[0].link).toBe("lorem/ipsum/dolor/sit/amet");
    //         done();
    //     })
    // } )
})