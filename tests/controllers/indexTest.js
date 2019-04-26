const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../app");

chai.use(chaiHttp);
chai.should();

describe("Home", () => {
    describe("GET /", () => {
        it("Should respond with 200", (done) => {
             chai.request(app)
                 .get("/")
                 .end((err, res) => {
                     res.should.have.status(200);
                     done();
                  });
         });
    });
});
