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
    await lostSouls.mint(3)
    expect(await lostSouls.totalSupply()).to.deep.equal(3);
    expect(await lostSouls.balanceOf(alice.address)).to.deep.equal(3);
    expect(lostSouls.connect(bob).mint(3)).to.be.revertedWith("")
  });

  it("should be 1 indexed", async function () {
    await lostSouls.mint(3)
    expect(await lostSouls.ownerOf(1)).to.deep.equal(alice.address)
    expect(await lostSouls.ownerOf(2)).to.deep.equal(alice.address)
    expect(await lostSouls.ownerOf(3)).to.deep.equal(alice.address)
    expect(lostSouls.ownerOf(0)).to.be.revertedWith("")
    expect(lostSouls.ownerOf(4)).to.be.revertedWith("")
  })

  //testing gas

  it("mint 1", async function () {
    await lostSouls.mint(1)
  })
  it("mint 2", async function () {
    await lostSouls.mint(2)
  })
  it("mint 3", async function () {
    await lostSouls.mint(3)
  })
  it("mint 10", async function () {
    await lostSouls.mint(10)
  })
  it("change base URI", async function () {
    await lostSouls.setBaseURI("ipfs://QmUy8CSeFru4dvU1ckaCJ6fkbVXayxEvjQzifW6zqUbBxT/")
  })

});
