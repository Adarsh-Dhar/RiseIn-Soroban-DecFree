import { isConnected } from "@stellar/freighter-api";
import { requestAccess } from "@stellar/freighter-api";
import { getNetwork } from "@stellar/freighter-api";
import { signTransaction } from "@stellar/freighter-api";




export const ConnectWallet = async () => {
    if (await isConnected()) {
        console.log("User has Freighter installed!");
      } else {
        console.log("User needs to install and connect Freighter extension.");
      }

try {
  const publicKey = await requestAccess();
  console.log("User's public key:", publicKey);
} catch (error) {
  console.error("Error requesting access:", error);
}


try {
  const network = await getNetwork();
  console.log("User's network configuration:", network);
} catch (error) {
  console.error("Error getting network:", error);
}


const xdr = "YOUR_TRANSACTION_XDR_STRING";
const network = "PUBLIC"; // or "TESTNET"
const signWith = "USER_PUBLIC_KEY"; // obtained from requestAccess

try {
  const signedXdr = await signTransaction(xdr, { network, accountToSign: signWith });
  console.log("Signed transaction XDR:", signedXdr);
} catch (error) {
  console.error("Error signing transaction:", error);
}
}

