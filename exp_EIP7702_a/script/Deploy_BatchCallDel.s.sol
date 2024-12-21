// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {BatchCallDelegation} from "../src/BatchCallDelegation.sol";

contract DeployScript is Script {
    function run() external returns (BatchCallDelegation) {
        vm.startBroadcast();
        BatchCallDelegation batchCall = new BatchCallDelegation();
        vm.stopBroadcast();
        return batchCall;
    }
}