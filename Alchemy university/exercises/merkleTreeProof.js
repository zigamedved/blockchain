function concatLetters(left, right) {
    return `Hash(${left} + ${right})`;
}

function getProof(ix, proof = [], layer = this.leaves, targetPairLength=2){
        if (layer.length == 1){
            return proof
        }
        const left = ix%2==0 ? true:false
        let nextLayer = []
        let pair = []

        for(let i = 0; i < layer.length; i++){
            if(i==ix){
                if(left){
                    (layer[ix + 1]) ? (proof.push({ data:  (layer[ix + 1]),left:false})): false
                }else{
                    (layer[ix - 1]) ? ( proof.push({ data:  (layer[ix - 1]),left:true})): false
                }
            }
            if(pair.length==2){
                nextLayer.push(concatLetters(pair[0],pair[1]))
                pair=[]
            }
            pair.push(layer[i])
        }

        if(pair.length==2){
                nextLayer.push(concatLetters(pair[0],pair[1]))
        }else if(pair.length){
            nextLayer.push(...pair)
        }

        return getProof(Math.floor(ix/2), proof, nextLayer, targetPairLength*2)
}    

console.log(getProof(0, [], ['A', 'B', 'C', 'D', 'E']))