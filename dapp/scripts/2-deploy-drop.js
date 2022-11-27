import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const imageFullPath = path.join(__dirname, '/images', 'dogs.jpg');
console.log(`Full image path: ${imageFullPath}`);

(async () => {
  try {
    
    const editionDropAddress = await sdk.deployer.deployEditionDrop({
      name: "Rescue Dog DAO",
      description: "A DAO for supporting rescue dogs and shelters.",
      image: readFileSync(imageFullPath),
      primary_sale_recipient: AddressZero,
    });

    const editionDrop = await sdk.getContract(editionDropAddress, "edition-drop");

    const metadata = await editionDrop.metadata.get();

    console.log(
      "✅ Successfully deployed editionDrop contract, address:",
      editionDropAddress,
    );
    console.log("✅ editionDrop metadata:", metadata);
  } catch (error) {
    console.log("failed to deploy editionDrop contract", error);
  }
})();