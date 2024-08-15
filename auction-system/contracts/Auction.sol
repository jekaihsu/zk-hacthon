// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Auction {
    struct Bid {
        address bidder;
        uint256 amount;
    }

    Bid[] public bids;
    address public highestBidder;
    uint256 public highestBid;
    bool public auctionEnded;
    bytes public zkProof;

    function submitBid(uint256 amount) external {
        require(!auctionEnded, "Auction already ended.");
        bids.push(Bid(msg.sender, amount));
    }

    function calculateHighestBid(bytes memory proof) external {
        require(!auctionEnded, "Auction already ended.");
        
        // zkSNARK 驗證邏輯應該添加在這裡
        // 為簡化起見，這個例子不直接實現zk邏輯
        
        // 確定最高出價
        for (uint i = 0; i < bids.length; i++) {
            if (bids[i].amount > highestBid) {
                highestBid = bids[i].amount;
                highestBidder = bids[i].bidder;
            }
        }
        zkProof = proof; // 分配zk證明

        auctionEnded = true;
    }

    function finalizeAuction() external view returns (address winner, uint256 highest, bytes memory proof) {
        require(auctionEnded, "Auction is not yet ended.");
        return (highestBidder, highestBid, zkProof);
    }

    function getNonWinningBids() external view returns (uint256[] memory) {
        require(auctionEnded, "Auction is not yet ended.");
        uint256[] memory nonWinningBids = new uint256[](bids.length - 1);
        uint256 index = 0;

        for (uint i = 0; i < bids.length; i++) {
            if (bids[i].bidder != highestBidder) {
                nonWinningBids[index] = bids[i].amount;
                index++;
            }
        }
        return nonWinningBids;
    }
}
