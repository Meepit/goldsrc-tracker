const chai = require("chai");
const utils = require("../../lib/utils");

chai.should();

describe("Utils", () => {
    it("Should return an empty array when obj has no keys", () => {
        utils.getNonEmptyValues({}).should.be.empty;
    });

    it("Should return an empty array when obj has no values", () => {
        utils.getNonEmptyValues({"200": "", "500": ""}).should.be.empty;
    });

    it("Should retun an array of keys when an object contains keys with values", () => {
        utils.getNonEmptyValues({"200": "50", "1": "20"}).should.have.length(2);
    });
});
