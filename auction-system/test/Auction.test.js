


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract("Auction", (accounts) => {
  it("should allow bids to be submitted", async () => {
    const auctionInstance = await Auction.deployed();

    // 提交三個投標
    await auctionInstance.submitBid(100, { from: accounts[0] });
    await auctionInstance.submitBid(200, { from: accounts[1] });
    await auctionInstance.submitBid(150, { from: accounts[2] });

    const bids = await auctionInstance.bids.call();
    assert.equal(bids.length, 3, "There should be three bids");
  });

  it("should calculate the highest bid correctly", async () => {
    const auctionInstance = await Auction.deployed();

    // 模擬 zkProof (這裡只是測試，沒有實際zk proof)
    const fakeProof = "0x123";

    // 計算最高出價
    await auctionInstance.calculateHighestBid(fakeProof, { from: accounts[0] });

    const highestBid = await auctionInstance.highestBid.call();
    const highestBidder = await auctionInstance.highestBidder.call();

    assert.equal(highestBid.toNumber(), 200, "The highest bid should be 200");
    assert.equal(highestBidder, accounts[1], "The highest bidder should be accounts[1]");
  });

  it("should finalize the auction and return correct results", async () => {
    const auctionInstance = await Auction.deployed();

    const result = await auctionInstance.finalizeAuction.call();

    assert.equal(result[0], accounts[1], "Winner should be accounts[1]");
    assert.equal(result[1].toNumber(), 200, "Highest bid should be 200");
  });

  it("should return non-winning bids", async () => {
    const auctionInstance = await Auction.deployed();

    const nonWinningBids = await auctionInstance.getNonWinningBids.call();
    assert.equal(nonWinningBids.length, 2, "There should be two non-winning bids");
    assert.equal(nonWinningBids[0].toNumber(), 100, "First non-winning bid should be 100");
    assert.equal(nonWinningBids[1].toNumber(), 150, "Second non-winning bid should be 150");
  });
});
