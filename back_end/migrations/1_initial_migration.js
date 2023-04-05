// const SimpleStorage = artifacts.require('SimpleStorage.sol');

// module.exports = function(deployer){
//     deployer.deploy(SimpleStorage);
// }

const Register = artifacts.require('../contracts/Register.sol');

module.exports = function(deployer){
    deployer.deploy(Register);
}
 