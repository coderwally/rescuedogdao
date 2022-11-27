import { useAddress, ConnectWallet } from '@thirdweb-dev/react';

const App = () => {
  const address = useAddress();
  console.log("👋 Address:", address);

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

  return (
    <div className="landing">
      <h1>🐶 wallet connected, now what!</h1>
    </div>);
}

export default App;