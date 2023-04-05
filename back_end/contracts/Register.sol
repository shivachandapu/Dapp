// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Register{
       
    struct User {
        address user_address;
        string name;
        string password;
    }

    mapping(address => User) private users;

    event AddUser(address user_address);

    // function to register a user in the chain
    function register (address _user_address,string memory _name, string memory _password) public returns(bool){
        // If the address already exists in the users then return true
        if (users[_user_address].user_address == _user_address){
            return true;
        }
        // If not then add the address to users
        users[_user_address] = User(_user_address,_name,_password);
        emit AddUser(_user_address);
        return false;
    }

    // function to get the details of a user given an address
    function getUser(address _user_address) public view returns (address, string memory, string memory) {
        // If the address doesn't exists
        if (users[_user_address].user_address != _user_address){
            return (address(0),"0","0");
        }

        User memory user = users[_user_address];
        return (user.user_address, user.name, user.password);
    }

    // function to login
    function login(address _user_address, string memory _password) public view returns(bool log){
        if(users[_user_address].user_address == _user_address){
            string memory pwd = users[_user_address].password;
            if (bytes(_password).length != bytes(pwd).length){
                return false;
            }
            return keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(pwd));
        }
    }
}