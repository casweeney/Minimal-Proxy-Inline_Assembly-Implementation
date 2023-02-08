import { ethers } from "hardhat";

async function main() {
  const Store = await ethers.getContractFactory("Store");
  const store = await Store.deploy();
  await store.deployed();
  console.log(`Store contract deployed to ${store.address}`);

  const MinimalProxy = await ethers.getContractFactory("MinimalProxy");
  const minimalProx = await MinimalProxy.deploy();

  const cloneTx = await minimalProx.clone(store.address);
  const cloneTxReceipt = await cloneTx.wait();

  console.log("Transaction Receipt: ", cloneTxReceipt);

  const clonedAddress = await minimalProx.getCloneAddress(1);
  console.log("cloned address: ", clonedAddress);

  const currentIndex = await minimalProx.getCurrentIndex();
  console.log("Current index: ", currentIndex);

  const checkIsCloned = await minimalProx.isClone(clonedAddress, store.address);
  console.log("Is cloned? ", checkIsCloned);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
