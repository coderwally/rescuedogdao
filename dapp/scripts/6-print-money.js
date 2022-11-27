import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    const token = await sdk.getContract("0x5605548Ee1c2daFdfd41b5457808C92B2BCC3e85", "token");
    const amount = 1_000_000;
    // Interact with your deployed ERC-20 contract and mint the tokens!
    await token.mint(amount);
    const totalSupply = await token.totalSupply();

    // Print out how many of our token's are out there now!
    console.log("✅ There now is", totalSupply.displayValue, "$RDOG in circulation");
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();