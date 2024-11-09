describe("TestModifyVariable", function () {
  it("Check contract logic", async function () {
    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");

    // we then use the ContractFactory object to deploy an instance of the contract
    const contract = await ModifyVariable.deploy(10);

    // wait for contract to be deployed and validated!
    await contract.deployed();

    // Validate deployed contract and it's constructor!
    const x = await contract.x()
    console.assert(x.toNumber(), 10)

    // modify x from 10 to 1337 via this function!
    await contract.modifyToLeet();
    // getter for state variable x
    const newX = await contract.x();
    console.assert(newX.toNumber(), 1337);
  });
});
