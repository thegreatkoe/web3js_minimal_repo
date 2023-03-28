// SPDX-License-Identifier: MIT

pragma solidity =0.4.25;

contract TestContract {
    address target_contract;

    function TestContract(address _targetContract) public payable {
        target_contract = _targetContract;
    }

    function() external payable {
        revert();
    }
}
