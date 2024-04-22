// inspired by @simplyexplained on YT
const SHA256 = require('crypto-js/sha256')

class Block{
  constructor(index, timestamp, data, previousHash = ""){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = ""
  }

  calculateHash(){
    return SHA256(
      this.index +
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.data)).toString();
  }    
}

class Blockchain{
  constructor(){
    this.chain = [this.createGenesisBlock()]
  }

  createGenesisBlock(){
    return new Block(0, "01/01/2017", "Genesis block", "0")
  }

  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid(){
    for(let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i-1]

      if(currentBlock.hash !== currentBlock.calculateHash()){
        return false
      }

      if(currentBlock.previousHash !== previousBlock.hash){
        return false
      }
    }

    return true
  }
}

let aero = new Blockchain();
aero.addBlock(new Block(1,"10/10/2017", { amount: 1 }))
aero.addBlock(new Block(2,"10/11/2017", { amount: 5 }))

console.log(JSON.stringify(aero, null, 4))
console.log("Is chain valid? ",aero.isChainValid())

aero.chain[1].data = { amount: 100 } // tempering!
aero.chain[1].hash = aero.chain[1].calculateHash() 
console.log("Is chain valid? ",aero.isChainValid()) // not valid