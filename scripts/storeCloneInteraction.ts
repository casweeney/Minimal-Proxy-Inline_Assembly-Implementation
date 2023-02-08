import { ethers } from "hardhat";

async function main() {
    const STOREADDRESS = "0xcc574bb5b25207E284fCaE5b3D70f50F167B951F";
    const Store = await ethers.getContractFactory("Store");
    // const store = Store.attach(STOREADDRESS);

    const store = await ethers.getContractAt("IStore", STOREADDRESS);

    const storeValue = await store.value();
    console.log("Store value before setting value:", storeValue);

    const storeTx = await store.setValue("My Third value");
    const storeTxReceipt = await storeTx.wait();
    console.log("Store transaction receipt: ", storeTxReceipt);

    const storeValue1 = await store.value();
    console.log("Store value after setting value:", storeValue1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
