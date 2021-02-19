import 'reflect-metadata';
// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import 'jest';
import request from 'supertest';
// import { Authentication } from '../../src/middleware/authentication';
import { Helper } from '../helper';
import { Offer } from '../../src/entity/Offer';
import { User } from '../../src/entity/User';
// import { User } from '../../src/entity/User';

describe('user', () => {
    const helper = new Helper();

    beforeAll(async () => {
        await helper.init();
    })

    afterAll(async () => {
        await helper.shutdown();
    })

    it('should add offer to user', async (done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();
        request(helper.app)
            .post(`/api/user/1/offer`)
            .send({
                "title": "englishsession",
                "description": "Studyenglish",
                "duration": 12,
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end(async (err, _res) => {
                if (err) throw err;
                const offers = await helper.getRepo(Offer).find({});

                expect(offers.length).toBe(1);
                expect(offers[0].title).toBe("englishsession")
                expect(offers[0].description).toBe("Studyenglish")
                expect(offers[0].duration).toBe(12)
                done()
            })
    })

    it('should get offer from user', async (done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();
        const user = await helper.getRepo(User).findOneOrFail({ relations: ['offers'], where: { id: 1 } });
        const newOffer = new Offer()
        newOffer.title = "test"
        newOffer.description = "test offer"
        newOffer.duration = 15
        newOffer.user = user
        await helper.getRepo(Offer).save(newOffer)
        request(helper.app)
            .get(`/api/user/1/offer`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end(async (err, _res) => {
                if (err) throw err;
                const offer = await helper.getRepo(Offer).find({})

                expect(offer[0].title).toBe("test")
                expect(offer[0].description).toBe("test offer")
                expect(offer[0].duration).toBe(15)
                done()
            })
    })

    it('should be able to update offer from user', async (done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();
        const user = await helper.getRepo(User).findOneOrFail({ relations: ['offers'], where: { id: 1 } });
        const newOffer = new Offer()
        newOffer.title = "test"
        newOffer.description = "test offer"
        newOffer.duration = 15
        newOffer.user = user
        await helper.getRepo(Offer).save(newOffer)
        request(helper.app)
            .patch(`/api/user/1/offer/${newOffer.id}`)
            .send({
                "title": "updatedTitle",
                "description": "UpdatedDescription",
                "duration": 0,
                "link": "UpdatedLink"
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end(async (err, _res) => {
                if (err) throw err;
                const offer = await helper.getRepo(Offer).find({})

                expect(offer[0].title).toBe("updatedTitle")
                expect(offer[0].description).toBe("UpdatedDescription")
                expect(offer[0].duration).toBe(0)
                done()
            })
    })

    it('should be able to delete offer from user', async (done) => {
        await helper.resetDatabase();
        await helper.loadFixtures();
        const user = await helper.getRepo(User).findOneOrFail({ relations: ['offers'], where: { id: 1 } });
        const newOffer = new Offer()
        newOffer.title = "test"
        newOffer.description = "test offer"
        newOffer.duration = 15
        newOffer.user = user
        await helper.getRepo(Offer).save(newOffer)
        request(helper.app)
            .delete(`/api/user/1/offer/${newOffer.id}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end(async (err, _res) => {
                if (err) throw err;
                const offer = await helper.getRepo(Offer).find({})
                expect(offer.length).toBe(0)
                done()
            })
    })
})