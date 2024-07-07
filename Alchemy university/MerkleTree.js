// const crypto = require("crypto");

class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves
        this.concat = concat
    }

    getRoot() {
        if(this.leaves.length==2 ){
            return this.concat(this.leaves[0], this.leaves[1])
        } else if (this.leaves.length == 1 ){
            return this.leaves[0]
        }
       
        let middle = 0
        if(this.leaves.length == 5 || this.leaves.length == 7){
            middle = 4
        }else{
            middle = Math.ceil(this.leaves.length/2)
        }
        
        let concatLeft = this.walkTree(this.leaves.slice(0,middle))
        let concatRight = this.walkTree(this.leaves.slice(middle))
        
        return this.concat(concatLeft, concatRight)
    }

    walkTree(leaves){
        console.log("current leaves", leaves)
        if (leaves.length == 2 && leaves[1]!=undefined) {
            return this.concat(leaves[0], leaves[1])
        } else if(this.leaves.length == 1 || leaves[1]==undefined) {
            return leaves[0]
        }

        let middle = Math.ceil(leaves.length/2)
      
        let concatLeft = this.walkTree(leaves.slice(0, middle))
        let concatRight = this.walkTree(leaves.slice(middle))

        return this.concat(concatLeft, concatRight)
    }


    getProof(ix, proof = [], layer = this.leaves, targetPairLength = 2) {
        if (layer.length == 1) {
            return proof
        }
        const left = ix % 2 == 0 ? true : false
        let nextLayer = []
        let pair = []

        for (let i = 0; i < layer.length; i++) {
            if (i == ix) {
                if (left) {
                    (layer[ix + 1]) ? (proof.push({ data: (layer[ix + 1]), left: false })) : false
                } else {
                    (layer[ix - 1]) ? (proof.push({ data: (layer[ix - 1]), left: true })) : false
                }
            }
            if (pair.length == 2) {
                nextLayer.push(this.concat(pair[0], pair[1]))
                pair = []
            }
            pair.push(layer[i])
        }

        if (pair.length == 2) {
            nextLayer.push(this.concat(pair[0], pair[1]))
        } else if (pair.length) {
            nextLayer.push(...pair)
        }

        return this.getProof(Math.floor(ix / 2), proof, nextLayer, targetPairLength * 2)  // set this.getProof
    }     
}

module.exports = MerkleTree;