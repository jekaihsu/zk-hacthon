

const Auction = artifacts.require("Auction");

contract("Auction", (accounts) => {
  it("應該讓用戶提交投標", async () => {
    const auctionInstance = await Auction.deployed();
    
    // 用戶提交投標
    await auctionInstance.submitBid(100, { from: accounts[0] });

    // 獲取投標數量
    const bid = await auctionInstance.bids(0);
    
    // 斷言
    assert.equal(bid.amount, 100, "投標金額應該是 100");
  });

  it("應該計算最高出價", async () => {
    const auctionInstance = await Auction.deployed();

    // 提交一些投標
    await auctionInstance.submitBid(150, { from: accounts[1] });
    await auctionInstance.submitBid(200, { from: accounts[2] });

    // 假設計算出最高出價
    await auctionInstance.calculateHighestBid("0x0", { from: accounts[0] });

    // 獲取最高出價
    const highestBid = await auctionInstance.highestBid();
    const highestBidder = await auctionInstance.highestBidder();

    // 斷言
    assert.equal(highestBid, 200, "最高出價應該是 200");
    assert.equal(highestBidder, accounts[2], "得標者應該是 accounts[2]");
  });
});
