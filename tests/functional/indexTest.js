const chai = require("chai");
const chaiHttp = require("chai-http");
const { mockRequest, mockResponse } = require('mock-req-res');
const cheerio = require("cheerio");
const app = require("../../app");

chai.use(chaiHttp);
chai.should();

describe("Home", () => {
    describe("GET /", () => {
        it("Should respond with 200", (done) => {
             chai.request(app)
                 .get("/")
                 .end((err, res) => {
                     const $ = cheerio.load(res.text);
                     const header = $("h1").html();
                     header.should.equal("Goldsource Tracker");
                     done();
                  });
         });

         it("Should contain a login link if not logged in", (done) => {
            chai.request(app)
               .get("/")
               .end((err, res) => {
                    const $ = cheerio.load(res.text);
                    const navBar = $(".nav-link")[0].children[0].data;
                    navBar.should.contain("Login");
                    navBar.should.not.contain("Logout");
                    done();
               })
        });

        it("Should contain a logout link if a user is logged in", (done) => {
            const req = mockRequest({user: 'test'});
            chai.request(app)
                .get("/")
                .set("Authorization", "eyJhbGciOiJIUzI1NiIsIn")
                .end((err, res) => {
                    const $ = cheerio.load(res.text);
                    // console.log(`locals: ${res.locals}`);
                    // const navBar = $(".nav-link")[1].children[0].data;
                    // navBar.should.contain("Logout");
                    // navBar.should.not.contain("Login");
                    done();
                })
        });

        // it("Should contain a table of player counts listed as N/A if redis is not updated", (done) => {
        //     chai.request(app)
        //         .get("/")
        //         .end((err, res) => {
        //             expect(false);
        //             done();
        //         })
        // });

        // it("Should contain play and set alert buttons if a user is logged in", (done) => {
        //     chai.request(app)
        //         .get("/")
        //         .end((err, res) => {
        //             expect(false);
        //             done();
        //         })
        // });

        // it("Should contain a list of player counts if a user is logged in", (done) => {
        //     chai.request(app)
        //         .get("/")
        //         .end((err, res) => {
        //             expect(false);
        //             done();
        //         })
        // });
    });
});