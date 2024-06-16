import { readSpreadsheet } from "../utils/spreadsheetHelper.js";
import Contract from "../models/Contract.js";
import Track from "../models/Track.js";

export const importTracks = async (buffer) => {
  const data = readSpreadsheet(buffer);
  const errors = [];

  await Promise.all(
    data.slice(2).map(async (row, index) => {
      const {
        B: Title,
        C: Version,
        D: Artist,
        E: ISRC,
        F: PLine,
        G: Aliases,
        H: ContractName,
      } = row;

      try {
        let contractID = null;
        if (ContractName) {
          const contract = await Contract.findOne({
            name: ContractName.trim(),
          });
          if (!contract) {
            throw new Error(`Contract named '${ContractName}' not found`);
          }
          contractID = contract._id;
        }

        const newTrack = new Track({
          title: Title,
          version: Version,
          artist: Artist,
          isrc: ISRC,
          pLine: PLine,
          aliases: Aliases
            ? Aliases.split(";").filter((alias) => alias.trim() !== "")
            : [],
          contractID,
        });
        await newTrack.save();
      } catch (error) {
        errors.push({ line: index, error: error.message });
      }
    })
  );

  if (errors.length > 0) {
    console.error("Errors occurred during import:", errors);
  } else {
    console.log("Data imported successfully");
  }
};
