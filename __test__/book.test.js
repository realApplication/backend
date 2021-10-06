'use strict';
const server = require('../server');
const supertest = require('supertest');
const request = supertest(server.app);



describe('my book routes', ()=> {


    it('handles not found request', async () => {
        const response = await request.get('/asd');
        expect(response.status).toEqual(404);
    });

        
    it('/ route works', async () => {
        const response = await request.get('/'); 
        expect(response.status).toEqual(200);
      
        expect(response.text).toEqual('hello world');
    });
    it('can get one book', async() => {
        const res = await request.get(`/book/1`);
        expect(res.status).toBe(200); 
      });
    
    it('get all books ', async () => {
        const response = await request.get('/book'); 
        expect(response.status).toEqual(200);
        expect(typeof response.body).toEqual('object'); 
    });
 

      it(' Add book and  delete book ', async() => {
            let obj1 = { title: 'yuyuiyu', author: "tesr", image: 'testt' };
         
          const response1 = await request.post('/book/').send(obj1);
          console.log("respppppppppppppppp111111111",response1.body.id);
          const response2 = await request.delete(`/book/${response1.body.id}`);
          expect(response2.status).toBe(200);
       
        });


});