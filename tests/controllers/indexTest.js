const chai = require("chai");
const chaiHttp = require("chai-http");
const cheerio = require("cheerio");
const app = require("../../app");

chai.use(chaiHttp);
chai.should();

describe("Home", () => {
    describe("GET /", () => {
        it("Should have the correct title", (done) => {
             chai.request(app)
                 .get("/")
                 .end((err, res) => {
                     res.should.have.status(200);
                     const $ = cheerio.load(res.text);
                     const header = $("h1").html();
                     header.should.equal("Goldsource Tracker");
                     done();
                  });
         });
    });
});