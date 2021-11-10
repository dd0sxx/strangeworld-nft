const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LostSouls", function () {

  let lostSouls, alice, bob

  beforeEach(async () => {
    [a, b] = await ethers.getSigners()
    alice = a
    bob = b
    const LostSouls = await ethers.getContractFactory("LostSouls");
    lostSouls = await LostSouls.deploy("");
    await lostSouls.deployed();
  })

  it("Should compile and deploy", async function () {
    expect(await lostSouls).to.not.equal(undefined || null);
  });

  it("Mint and only to the owner", async function () {
    expect(await lostSouls.totalSupply()).to.deep.equal(0);
    await lostSouls.mintWithSafeMint(3)
    expect(await lostSouls.totalSupply()).to.deep.equal(3);
    expect(lostSouls.connect(bob).mintWithSafeMint(3)).to.be.revertedWith("")
  });
});
