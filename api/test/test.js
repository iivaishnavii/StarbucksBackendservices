var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();
chai.use(chaiHttp);
var assert = require('assert');
var expect = chai.expect;
let rooturl = 'http://localhost:3001';

describe('Quora Mocha Test Harness:', () => {
    //addtagline
    it("Test Case 1 - User should be able to place order", (done) => { 

        //sample data
        var data={
            
                "email":"sample@sample.com",
               "cardno": "111111111",
               "qty": "5",
               "item": "coffee",
               "milk":"yes"
           
          }
        chai.request(rooturl)
        .post('/orders')
        .send(data)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
        done();
        });
    })


    it("Test Case 2 - User doesnt exist placing order", (done) => { 

        //sample data
        var data={
            
                "email":"sample@samp.com",
               "cardno": "111111111",
               "qty": "5",
               "item": "coffee",
               "milk":"yes"
           
          }
        chai.request(rooturl)
        .post('/orders')
        .send(data)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(400);
            res.body.should.be.equal('User not found');
        done();
        });
    })

    it("Test Case 3 - CArd doesnt exist placing order", (done) => { 

        //sample data
        var data={
            
                "email":"sample@sample.com",
               "cardno": "1111111",
               "qty": "5",
               "item": "coffee",
               "milk":"yes"
           
          }
        chai.request(rooturl)
        .post('/orders')
        .send(data)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(400);
            res.body.should.be.equal('Card not found!Use other card to place order');
        done();
        });
    })
})