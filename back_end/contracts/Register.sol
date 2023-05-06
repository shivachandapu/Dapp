// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Register{

    // Stores the details of the friend
    struct friend {
        address pubkey;
        string name;
    }

    // Stores the Details about the user       
    struct user {
        address user_address;
        string name;
        string password;
    }

    // Stores the single chat message info
    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }
     
    // Stores the Item's information
    struct Item {
        string name;
        string info;
        string cid;
    }
    // Collection of users registered into the app
    mapping(address => user) private userList;

    // Collection of all the friends that a user have
    mapping(address => friend[]) friendsList;

    // Collection of messages communicated in a channel
    mapping(bytes32 => message[]) allMessages; // key is Hash(user_1,user_2)

    // mapping CID's of different items to address
    mapping(address => Item[]) private items;

    // function to register a user in the blockchain
    function register (address _user_address,string memory _name, string memory _password) public returns(bool){
        require(msg.sender == msg.sender);
        // If the address already exists in the userList then return true
        if (userList[_user_address].user_address == _user_address){
            return true;
        }
        // if doesn't exists
        user storage usr = userList[_user_address];
        usr.user_address = _user_address;
        usr.name = _name;
        usr.password = _password;

        userList[usr.user_address] = usr;
        return false;
    }

    // function to get the details of a user given an address
    function getUser(address _user_address) public view returns (address, string memory, string memory) {
        // If the address doesn't exists
        if (userList[_user_address].user_address != _user_address){
            return (address(0),"0","0");
        }

        user memory _user = userList[_user_address];
        return (_user.user_address, _user.name, _user.password);
    }

    // function to login
    function login(address _user_address, string memory _password) public view returns(bool log){
        if(userList[_user_address].user_address == _user_address){
            string memory pwd = userList[_user_address].password;
            if (bytes(_password).length != bytes(pwd).length){
                return false;
            }
            return keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(pwd));
        } else{
            return false;
        }
    }

    // Returns the default name provided by an user
    function getUsername(address pubkey) external view returns(string memory) {
        return userList[pubkey].name;
    }

    // function to update the friendList
    function _addFriend(address user_1, address user_2, string memory name) internal {
        friend memory newFriend = friend(user_2, name);
        friendsList[user_1].push(newFriend);
    }

    // Adds new user as a friend
    function addFriend(address friend_add, string calldata name) external {        
        // add the friend address to your friend's list and vice-versa
        _addFriend(msg.sender, friend_add, name);
        _addFriend(friend_add, msg.sender, userList[msg.sender].name);
    }   

    // function to return the list of all the friends of the sender
    function getMyFriendList() public view returns(friend[] memory){
        return friendsList[msg.sender];
    }

    // function to create a unique code for a messaging channel
    // returns hash value in the type bytes32
    function _getChanelCode(address add_1, address add_2) internal pure returns(bytes32){
        if (add_1 < add_2)
            return keccak256(abi.encodePacked(add_1,add_2));
        else
            return keccak256(abi.encodePacked(add_2,add_1));
    }

    // Send a message to a friend
    function sendMessage(address friend_add, string calldata _msg) public {
        bytes32 channelCode = _getChanelCode(msg.sender, friend_add);
        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessages[channelCode].push(newMsg);
    }

    // function to read the messages from a channel
    function readMessages(address friend_add) public view returns(message[] memory){
        bytes32 channelCode = _getChanelCode(msg.sender, friend_add);
        return allMessages[channelCode];
    }
    
    // function to show all the items
    function showItems() public view returns(Item[] memory){
        return items[msg.sender];
    }

    // function to store the ipfs CID's with respect to each user
    function AddItem(string memory _name, string memory _info, string memory _cid) public {
        Item memory newItem = Item(_name,_info,_cid); 
        items[msg.sender].push(newItem);
    }

    // function to find the index of the cid to delete
    function findIndex(address usr, Item memory itm) private view returns (int) {
        for (int i=0; i<int(items[usr].length); i++) {
            if (keccak256(bytes(items[usr][uint(i)].cid)) == keccak256(bytes(itm.cid))) {
                return i;
            }
        }
        return -1;
    } 

    // function to send the CID to other user
    function SendItem(address buyer, Item memory itm) public {
        items[buyer].push(itm);
        int index  = findIndex(msg.sender, itm);
        
        require(index >= 0, "CID not found.");
        delete items[msg.sender][uint(index)];
        
        if (index < int(items[msg.sender].length) - 1) {
            items[msg.sender][uint(index)] = items[msg.sender][uint(items[msg.sender].length - 1)];
        }
        items[msg.sender].pop();
    }
}