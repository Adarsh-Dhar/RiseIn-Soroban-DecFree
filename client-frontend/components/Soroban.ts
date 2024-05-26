import 'dotenv/config';
import {
    Contract, SorobanRpc,
    TransactionBuilder,
    Networks,
    BASE_FEE,
    nativeToScVal, Address
} from "@stellar/stellar-sdk";
import { userSignTransaction } from './Freighter';
import { getPublicKey } from '@stellar/freighter-api';


let rpcUrl = "https://soroban-testnet.stellar.org";
let contractAddress = 'CCRCMRE3W2ETOG7HEFNFHA24DJEJKSRSJ5UX5II3YDXF3FCYTJJXHM4Z';

const stringToSymbol = (value : any) => {
    return nativeToScVal(value, { type: "symbol" })
}

const accountToScVal = (account : any) => new Address(account).toScVal();


let params = {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET
}

async function contractInt(caller : any, functName : any, values : any) {
    const provider = new SorobanRpc.Server(rpcUrl, { allowHttp: true });
    const contract = new Contract(contractAddress);
    const sourceAccount = await provider.getAccount(caller);
    let buildTx;
    if (values == null) {
        buildTx = new TransactionBuilder(sourceAccount, params)
        .addOperation(contract.call(functName))
        .setTimeout(30).build();
    }
    else {
        buildTx = new TransactionBuilder(sourceAccount, params)
        .addOperation(contract.call(functName, ...values))
        .setTimeout(30).build();
    }
    let _buildTx = await provider.prepareTransaction(buildTx);
    let prepareTx = _buildTx.toXDR();
    let signedTx = await userSignTransaction(prepareTx, "TESTNET", caller);
    let tx = TransactionBuilder.fromXDR(signedTx, Networks.TESTNET);
    try {
        let sendTx = await provider.sendTransaction(tx).catch(function (err) {
            return err;
        });
        if (sendTx.errorResult) {
            throw new Error("Unable to submit transaction");
        }
        if (sendTx.status === "PENDING") {
            let txResponse = await provider.getTransaction(sendTx.hash);
            while (txResponse.status === "NOT_FOUND") {
                txResponse = await provider.getTransaction(sendTx.hash);
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
            if (txResponse.status === "SUCCESS") {
                let result = txResponse.returnValue;
                return result;
            }
        }
    } catch (err) {
        return err;
    }
}

async function fetchPoll() {
    let caller = await getPublicKey();
    let result = await contractInt(caller, 'view_poll', null);
    //@ts-ignore
    let no = (result._value[0]._attributes.val._value).toString();
    //@ts-ignore

    let total = (result._value[1]._attributes.val._value).toString();
    //@ts-ignore

    let yes = (result._value[2]._attributes.val._value).toString()
    return [no, total, yes]
}

async function fetchVoter() {
    let caller = await getPublicKey();
    let voter = accountToScVal(caller);
    let result = await contractInt(caller, 'view_voter', [voter]);
    //@ts-ignore

    let selected = (result._value[0]._attributes.val._value).toString();
    //@ts-ignore

    let time = (result._value[1]._attributes.val._value).toString();
    //@ts-ignore

    let votes = (result._value[2]._attributes.val._value).toString();

    return [selected, time, votes]
}

async function vote(value : any) {
    let caller = await getPublicKey();
    let selected = stringToSymbol(value);
    let voter = accountToScVal(caller);
    let values = [voter, selected];
    let result = await contractInt(caller, 'record_votes', values);
    return result;
}




export { fetchPoll, fetchVoter, vote };