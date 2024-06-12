import React, { useState } from "react";
import Web3 from "web3";

const InstantSend = ({ toAddress, amount, onSent }) => {
  const [sending, setSending] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);

  const infuraProjectId = "9c8f60ff327044e2ac13e78e0dd354f8"; // Replace with your ID

  const sendEther = async () => {
    setSending(true);

    try {
      const provider = new Web3.providers.HttpProvider(
        `https://mainnet.infura.io/v3/${infuraProjectId}`,
      );
      const web3 = new Web3(provider);

      // Assuming you have a connected wallet (replace with your logic)
      const fromAddress = "YOUR_WALLET_ADDRESS"; // Replace with your address
      const privateKey = "YOUR_WALLET_PRIVATE_ KEY"; // Replace with your private key (**WARNING: Keep this secure!**)

      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = 21000; // Adjust gas limit as needed

      const tx = {
        from: fromAddress,
        to: toAddress,
        value: web3.utils.toWei(amount.toString(), "ether"),
        gasPrice,
        gasLimit,
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const txHash = await web3.eth.sendTransaction(signedTx);

      setTransactionHash(txHash);
      onSent(txHash); // Call a callback function to notify about success
    } catch (error) {
      console.error("Error sending transaction:", error);
      // Handle errors appropriately, e.g., display an error message to the user
    } finally {
      setSending(false);
    }
  };

  return (
    <button disabled={sending} onClick={sendEther}>
      {sending ? "Sending..." : "Send Ether"}
    </button>
  );
};

export default InstantSend;
