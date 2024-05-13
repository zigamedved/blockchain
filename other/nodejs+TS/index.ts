import * as crypto from "crypto"

class Transaction{
  constructor(
    public amount: number,
    public payer: string,
    public payee: string

  ){}

  toString(){
    return JSON.stringify(this)
  }
}

class Block{
  constructor(
    public prevHash: string,
    public transaction: Transaction,
    public ts = Date.now()
  ){}

  get hash(){
    const hash = crypto.createHash("SHA256")
    hash.update(this.toString()).end()
    return hash.digest("hex")
  }

  toString(){
    return JSON.stringify(this)
  }
}

class Chain{
  public static instance = new Chain();

  chain: Block[];

  constructor(){
    this.chain = [new Block("", new Transaction(100, "genesis", "satoshi"))]
  }

  get lastBlock(){
    return this.chain[this.chain.length-1];
  }

  addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer){
    const verify = crypto.createVerify("SHA256");
    verify.update(transaction.toString());

    const isValid = verify.verify(senderPublicKey, signature)
    
    if (isValid){ // TODO, add mining (proof of work, to prevent double spending)
      const newBlock = new Block(this.lastBlock.hash, transaction);
      this.chain.push(newBlock);
    }
  }

}

class Wallet{
  public publicKey: string;
  public privateKey: string;


  constructor(){
    const keyPair = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type:"spki", format:"pem" },
      privateKeyEncoding: { type:"pkcs8", format:"pem" },
    });

    this.publicKey = keyPair.publicKey
    this.privateKey = keyPair.privateKey
  }

  sendMoney(amount: number, payeePublicKey: string){
    const transaction = new Transaction(amount, this.publicKey, payeePublicKey)
    
    const sign = crypto.createSign("SHA256");
    sign.update(transaction.toString()).end();

    const signature = sign.sign(this.privateKey)
    Chain.instance.addBlock(transaction, this.publicKey, signature)
  }
}