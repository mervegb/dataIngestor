import * as chai from "chai";
import sinon from "sinon";
import Contract from "../models/Contract.js";
import Track from "../models/Track.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { importTracks } from "../scripts/importData.js";

const { expect } = chai;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("importTracks", function () {
  let mockFindOne, mockSave, consoleErrorStub;

  const filePath = path.join(__dirname, "", "Track Import Test.csv");
  const buffer = fs.readFileSync(filePath);

  beforeEach(() => {
    mockFindOne = sinon.stub(Contract, "findOne");
    mockSave = sinon.stub(Track.prototype, "save");
    consoleErrorStub = sinon.stub(console, "error");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should save tracks when all data is correct", async () => {
    mockFindOne.resolves({ _id: new mongoose.Types.ObjectId() });
    mockSave.resolves();

    await importTracks(buffer);
    expect(mockSave.callCount).to.equal(5);
  });

  it("logs error message for tracks with no associated contracts", async () => {
    mockFindOne.onCall(0).resolves({ _id: new mongoose.Types.ObjectId() });
    mockFindOne.onCall(1).resolves(null);
    mockFindOne.onCall(2).resolves({ _id: new mongoose.Types.ObjectId() });
    mockFindOne.onCall(3).resolves(null);
    mockFindOne.onCall(4).resolves({ _id: new mongoose.Types.ObjectId() });

    mockSave.resolves();

    await importTracks(buffer);

    expect(mockSave.callCount).to.equal(3);

    sinon.assert.calledOnce(consoleErrorStub);
    const errorArgs = consoleErrorStub.getCall(0).args;
    expect(errorArgs[0]).to.equal("Errors occurred during import:");
    expect(errorArgs[1]).to.be.an("array").that.is.not.empty;
    expect(errorArgs[1][0]).to.deep.include({
      line: 1,
      error: "Contract named 'Contract 2' not found",
    });
    expect(errorArgs[1][1]).to.deep.include({
      line: 4,
      error: "Contract named 'Contract 5' not found",
    });
  });
});
