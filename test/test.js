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
    expect(await lostSouls.balanceOf(alice.address)).to.deep.equal(3);
    expect(lostSouls.connect(bob).mintWithSafeMint(3)).to.be.revertedWith("")
  });

  it("should be 1 indexed", async function () {
    await lostSouls.mintWithSafeMint(3)
    expect(await lostSouls.ownerOf(1)).to.deep.equal(alice.address)
    expect(await lostSouls.ownerOf(2)).to.deep.equal(alice.address)
    expect(await lostSouls.ownerOf(3)).to.deep.equal(alice.address)
    expect(lostSouls.ownerOf(0)).to.be.revertedWith("")
    expect(lostSouls.ownerOf(4)).to.be.revertedWith("")
  })

  it("mint with safe mint", async function () {
    await lostSouls.mintWithSafeMint(3)
  })

  it("mint with reg mint", async function () {
    await lostSouls.mintWithRegularMint(3)
  })

  it("mint without loop", async function () {
    await lostSouls.mintWithoutLoop()
    await lostSouls.mintWithoutLoop()
    await lostSouls.mintWithoutLoop()
  })


});
