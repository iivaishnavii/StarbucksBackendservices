var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();
chai.use(chaiHttp);
var assert = require('assert');
var expect = chai.expect;
let rooturl = 'http://localhost:3001';

describe('Mocha Test Harness:', () => {
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
})


describe('User/Authentication', () => {
    //addtagline
    const emailPrefix = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    const newPin      = '0987'

    it("Create User - User should be able to register", (done) => {

        //sample data
        var data={
            "email": `${emailPrefix}@testing.com`,
            "pin" : `1234`,
            "phone" : '4150000000'
          }
        chai.request(rooturl)
        .post('/user')
        .send(data)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
        done();
        });
    })

    it("Authenticate User - User should be able to login", (done) => {
        //sample data
        var data={
            "email" : `${emailPrefix}@testing.com`,
            "pin"   : `1234`,
          }
        chai.request(rooturl)
        .post('/user/authenticate')
        .send(data)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
            done();
        });
    })


    it("De-Authenticate User - User should be able to logout", (done) => {
        //sample data
        var data={
            "email" : `${emailPrefix}@testing.com`,
          }
        chai.request(rooturl)
        .post('/user/logout')
        .send(data)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
            done();
        });
    })

    it("Change Pin - User should be able to change pin and login", (done) => {
        //sample data
        var data={
            "email"   : `${emailPrefix}@testing.com`,
            "pin"     : `1234`,
            "newPin"  : newPin
        }
        chai.request(rooturl)
        .post('/user/pin')
        .send(data)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
            done();
        });
    })

})
