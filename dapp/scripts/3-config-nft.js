import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";
import path from 'path';

(async () => {
    const imageFullPath = path.join(path.resolve(''), '/scripts/images', 'dogtreats.jpg');
  try {
    const editionDrop = await sdk.getContract("0x2E7acDD428f4ff041aEe739179552769390Ff387", "edition-drop");
    await editionDrop.createBatch([
      {
        name: "Rescue Dog DAO Membership",
        description: "NFT for access to a DAO for supporting rescue dogs and shelters.",
        image: readFileSync(imageFullPath),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();