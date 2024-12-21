// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SmartWalletV1 {
    event FundsTransferred(address indexed to, uint256 amount);
    event FundsReceived(address sender, uint256 amount);

    // Function to receive funds and transfer them to a specified address
    function executeTransfer(address payable recipient, uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(address(this).balance >= amount, "Insufficient balance in contract");

        // Send funds to the specified address
        recipient.transfer(amount);
        emit FundsTransferred(recipient, amount);
    }

    // Function to receive funds to the contract
    receive() external payable {
        emit FundsReceived(msg.sender, msg.value);
    }

    // Function to check the contract's balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}