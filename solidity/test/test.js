describe("HelloWorld", function () {
    async function deployHelloWorld() {
      const HelloWorld = await ethers.getContractFactory("HelloWorld");
      const helloWorld = await HelloWorld.deployed();
  
      return { helloWorld };
    }
    deployHelloWorld();
  });