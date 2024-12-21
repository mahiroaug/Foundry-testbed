// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {MahiroToken} from "../src/MahiroToken.sol";

contract DeployScript is Script {
    function run() external returns (MahiroToken) {
        uint256 initialSupply = 1000000 * 10 ** 18;
        vm.startBroadcast();
        MahiroToken mahiroToken = new MahiroToken(initialSupply);
        vm.stopBroadcast();
        return mahiroToken;
    }
}

