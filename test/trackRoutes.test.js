import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";

const chai = chaiModule.use(chaiHttp);
const { expect } = chai;

describe("Track API Error Handling", function () {
  describe("POST /api/tracks", function () {});
});
