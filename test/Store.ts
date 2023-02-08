import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Store", function () {
  
  async function deployStoreAndStoreFactory() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Store = await ethers.getContractFactory("Store");
    const store = await Store.deploy();

    const StoreFactory = await ethers.getContractFactory("StoreFactory");
    const storeFactory = await StoreFactory.deploy(store.address);

    return { store, storeFactory, owner, otherAccount };
  }

  describe("Store Factory Test", function () {
    it("Should check owner address", async function () {
      const { store, storeFactory, owner } = await loadFixture(deployStoreAndStoreFactory);

      expect(await storeFactory.owner()).to.equal(owner.address);
    });

    it("Should set the right store address", async function () {
      const { store, storeFactory, owner } = await loadFixture(deployStoreAndStoreFactory);

      expect(await storeFactory.implementation()).to.equal(store.address);
    });
  });
});
