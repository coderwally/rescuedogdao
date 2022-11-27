import { useAddress, ConnectWallet, useContract, useNFTBalance, Web3Button } from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';

const App = () => {
  const address = useAddress();

  const editionDropAddress = "0x2E7acDD428f4ff041aEe739179552769390Ff387"
  const { contract: editionDrop } = useContract(editionDropAddress, "edition-drop");
  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0")

  const hasClaimedNFT = useMemo(() => {
    return nftBalance && nftBalance.gt(0)
  }, [nftBalance])

  //Wallet not connected
  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to Rescue Dog DAO</h1>
        <div className="btn-hero">
          <ConnectWallet />
        </div>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>🐶 DAO Member Page</h1>
        <p>Congratulations on being a member</p>
      </div>
    );
  };

  return (
<div className="mint-nft">
      <h1>Rescue Dog DAO<br />Membership NFT 🐶</h1>
      <div className="btn-hero">
        <Web3Button 
          contractAddress={editionDropAddress}
          action={contract => {
            contract.erc1155.claim(0, 1)
          }}
          onSuccess={() => {
            console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
          }}
          onError={error => {
            console.error("Failed to mint NFT", error);
          }}
        >
          Mint your NFT<br/>(0.0001 $Goerli-ETH)
        </Web3Button>
      </div>
    </div>    
    );
}

export default App;