async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const LostSouls = await ethers.getContractFactory("LostSouls");
  console.log('meow')
  const lostSouls = await LostSouls.deploy("");
  console.log('woof')
  await lostSouls.deployed()
    
  console.log("lostSouls address:", lostSouls.address);


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });