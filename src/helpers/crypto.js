const forge = require('node-forge');

export default function encriptarValor(publicKey, valorCampo){
    var publicKey = forge.pki.publicKeyFromPem(publicKey);
    var buffer = forge.util.createBuffer(valorCampo, 'utf8');
    var binaryString = buffer.getBytes();
    var encrypted = publicKey.encrypt(binaryString, 'RSA-OAEP', {});
    return forge.util.encode64(encrypted);

}

