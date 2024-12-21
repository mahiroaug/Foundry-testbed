// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {SmartWalletV1} from "../src/SmartWalletV1.sol";

contract DeployScript is Script {
    function run() external returns (SmartWalletV1) {
        vm.startBroadcast();
        SmartWalletV1 smartWallet = new SmartWalletV1();
        vm.stopBroadcast();
        return smartWallet;
    }
}