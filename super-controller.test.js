'use strict';
// const superController = require('./controller/super.controller');
const {app} = require('./server');
const supertest = require('supertest');
const request = supertest(app);

describe('supervisor tests', ()=> {


// ----------------------- test fot sign up new supervisor -------------------
    it('signup for supervisor', async () => {
        let obj = {
            userName: "mmmmm",
            email: "mm@mmm.com",
            password: "1234"
        }
        const response = await request.post('/v1/signup').send(obj);
        expect(response.status).toEqual(201);
    });

    // ----------------------- test fot sign in supervisor -----------------------
    it('signin for supervisor ', async () => {
        const response = await request.post('/v1/signin').set('Authorization', `Basic bW1AbW1tLmNvbToxMjM0`);
        expect(response.status).toEqual(200);
        // console.log('responseeeboddyy',response.body);
    expect(response.body.supervisor.userName).toBe('mmmmm');
    });


    // ----------------------- test for create room ------------------------------
    it('test for creat room ', async () => {
    
        const reqBody={
            "classroom":"class11"       
    }
        const response = await request.post('/v1/data').send(reqBody);
        expect(response.status).toEqual(200);
    });


// ----------------------- test for show all rooms ------------------------------
    it('test for get all rooms ', async () => {
        const response = await request.get('/v1/data');
        expect(response.status).toEqual(200);
    });


    // ----------------------- test for show specific room according to its id ------------------------------
    it('test for get specific room', async () => {
        const response = await request.get('/v1/data/1');
        expect(response.status).toEqual(200);
    });

      // ----------------------- test for delete specific room according to its id ----------------------------
      it('test for delete specific room', async () => {
        const response = await request.delete('/v1/data/2');
        expect(response.status).toEqual(200);
    });
});
