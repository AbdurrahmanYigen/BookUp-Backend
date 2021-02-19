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
        const authToken = await helper.loginUser('test@hda.de');
        
        request(helper.app)
          .get('/api/user/')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Authorization', authToken)
          .end((err, res) => {
            if (err) throw err;
            expect(res.body.data.length).toBeGreaterThan(1);
            done();
        });
    });

    it('should get a specific user' , async(done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();
        const authToken = await helper.loginUser('test@hda.de');

        request(helper.app)
        .get(`/api/user/1`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', authToken)
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
        const authToken = await helper.loginUser('test@hda.de');

        request(helper.app)
        .patch(`/api/user/1`)
        .send({
            "userName": "changed",
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', authToken)

        .end(async(err , _res) => {
            if(err) throw err;
            const user = await helper.getRepo(User).findOneOrFail(1);

            expect(user.userName).toBe("changed");
            done();
        })
    } )
    
    it('should delete the user with a specific id' , async(done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();
        const authToken = await helper.loginUser('test@hda.de');
        request(helper.app)
        .delete(`/api/user/1`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', authToken)

        .end(async(err , _res) => {
            if(err) throw err;
            const user = await helper.getRepo(User).find({});
            expect(user.length).toBe(1)
            done();
        })
    } )

})