import { ethers, upgrades } from "hardhat";

async function main() {
  const implV1 = await ethers.getContractFactory("ImplementationV1");
  const implV2 = await ethers.getContractFactory("ImplementationV2");
  const implV3 = await ethers.getContractFactory("ImplementationV3");

  // Deploy Implementation V1 and proxy

  let proxy = await upgrades.deployProxy(implV1);
  await proxy.waitForDeployment();

  const contract = await ethers.getContractAt(
    "ImplementationV2",
    await proxy.getAddress()
  );

  let tx = await contract.setNumber(1);
  await tx.wait();

  tx = await contract.setNumber(42);
  await tx.wait();
  console.log(tx.hash);

  console.log(`
    contract name : ${await contract.getName()}
    msg.sender    : ${await contract.getSender()}
    storage value : ${await contract.getNumber()}
`);

  // Upgrade proxy
  proxy = await upgrades.upgradeProxy(proxy, implV2);
  await proxy.waitForDeployment();

  console.log(`
    contract name : ${await contract.getName()}
    msg.sender    : ${await contract.getSender()}
    storage value : ${await contract.getNumber()}
  `);

  // deploy beacon and beacon proxy
  const beacon = await upgrades.deployBeacon(implV3);
  await beacon.waitForDeployment();

  const beaconProxy = await upgrades.deployBeaconProxy(beacon, implV3);

  // Migrate to beacon

  tx = await contract.migrateToBeacon(
    await beacon.getAddress(),
    await beaconProxy.getAddress()
  );

  await tx.wait();

  console.log(`
    contract name : ${await contract.getName()}
    msg.sender    : ${await contract.getSender()}
    storage value : ${await contract.getNumber()}
  `);

  tx = await contract.setNumber(43);
  await tx.wait();
  console.log(tx.hash);

  console.log(`
  contract name : ${await contract.getName()}
  msg.sender    : ${await contract.getSender()}
  storage value : ${await contract.getNumber()}
`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
