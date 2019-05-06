const chai = require("chai");
const chaiHttp = require("chai-http");
const { mockRequest, mockResponse } = require("mock-req-res");
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
               });
        });
    });
});
