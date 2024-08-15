function submitBid() {
    const bidAmount = document.getElementById('bidAmount').value;
    if (bidAmount) {
        alert(`Bid of ${bidAmount} submitted!`);
        document.getElementById('highestBidInfo').innerHTML = `<p>Highest Bid: ${bidAmount}</p>`;
    } else {
        alert('Please enter a valid bid amount.');
    }
}
