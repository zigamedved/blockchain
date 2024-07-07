function verifyProof(proof, node, root, concat) {
  let hash = ""
  if(proof[0].left){
    hash= concat(proof[0].data, node)
  }else{
    hash= concat(node, proof[0].data)
  }

  for(let i = 1; i<proof.length; i++){
    if(proof[i].left){
      hash = concat(proof[i].data, hash)
    }else{    
      hash = concat(hash, proof[i].data)
    }
  }
  return root === hash
}

module.exports = verifyProof;
