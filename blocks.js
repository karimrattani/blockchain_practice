const crypto = require('crypto-js');
const express = require('express');

class block {
  constructor(index, timeStamp, data, previousHash) {
    this.index = index;
    this.timeStamp = timeStamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }
  calculateHash() {
    return crypto.SHA256(this.index + this.previousHash + this.timeStamp + JSON.stringify(this.data)).toString();
  }
}

class blockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }
  createGenesisBlock() {
    return new block(0, "13/01/18", "testing stuff", "0");
  }
  isChainValid() {
    for (let i = 0; i < this.chain.length; i ++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== previousBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}

let hashCoin =  new blockChain();

hashCoin.addBlock(new block(1, "1/18/18", { amount : 10, event : "test" }));
hashCoin.addBlock(new block(2, "1/19/18", { amount : 4 }));

console.log(JSON.stringify(hashCoin, null, 4));
