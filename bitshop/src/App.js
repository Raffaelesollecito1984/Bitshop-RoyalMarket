import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

function EthereumSender() {
  const [privateKey, setPrivateKey] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const INFURA_RINKEBY_URL =
    "https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID"; // Replace with your Infura project ID

  const sendEther = async () => {
    try {
      // Validate inputs
      if (!privateKey || !recipientAddress || !amount) {
        throw new Error("Please fill in all fields.");
      }

      // Replace the following code with steps to connect to a blockchain node (not Infura or similar services)
      // 1. Create a new provider instance using the appropriate provider library for your chosen blockchain node.
      // 2. Example (replace with your actual provider setup):
      // const provider = new ethers.providers.JsonRpcProvider('YOUR_NODE_URL');

      const signer = new ethers.Wallet(privateKey, provider);

      const tx = {
        from: signer.address,
        to: recipientAddress,
        value: ethers.utils.parseEther(amount), // Convert amount to wei
        gasLimit: 21000, // Gas limit (adjust as needed)
      };

      const transaction = await signer.sendTransaction(tx);
      setTransactionHash(transaction.hash);
      console.log("Transaction hash:", transaction.hash);
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error sending transaction:", error);
    }
  };

  return (
    <div>
      <h2>Ethereum Sender (Rinkeby Testnet)</h2>
      <label>
        Private Key:
        <input
          type="text"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
        />
      </label>
      <label>
        Recipient Address:
        <input
          type="text"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
        />
      </label>
      <label>
        Amount (ETH):
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <button onClick={sendEther}>Send Ether</button>
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
      {errorMessage && <p style={{ color: "red" }}>Error: {errorMessage}</p>}
    </div>
  );
}

export default EthereumSender;
