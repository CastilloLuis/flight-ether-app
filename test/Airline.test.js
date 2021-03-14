const Airline = artifacts.require('Airline');
let instance;

beforeEach(async () => {
  instance = await Airline.new();
})

contract('Airline', accounts => {
  it('should have available flights', async () => {
    const total = await instance.getTotalFlights();
    assert(total > 0);
  })

  it('should allow customers to buy a flight with a payable ether value', async() => {
    const flight = await instance.flights(1);
    const flightName = flight[0];
    const flightPrice = flight[1];
    const payload = { from: accounts[0], value: flightPrice };
    await instance.buyFlight(1, payload); // buying mcbo flight from acct[0] with the correct flight price
    const customerFlight = await instance.customersFlight(accounts[0], 0); // get customer flight by index (accounts[x], idx) from accounts sender[0]
    const totalCustomerFlights = await instance.customersTotalFlight(accounts[0]);
    assert(customerFlight[0], flightName);
    assert(customerFlight[1], flightPrice);
    assert(totalCustomerFlights == 1);
  })

  it('should not allow customer to buy a flight under price', async () => {
    const flight = await instance.flights(1);
    const price = flight[1] - 5000;
    try {
      await instance.buyFlight(1, {from: accounts[0], value: price});
    } catch (e) {
      return;
    }
    assert.fail();
  })

  it("should get the real contract's balance", async () => {
    const flight = await instance.flights(0);
    const price = flight[1];

    const flight2 = await instance.flights(1);
    const price2 = flight2[1];

    await instance.buyFlight(0, {from: accounts[0], value: price});
    await instance.buyFlight(1, {from: accounts[0], value: price2});

    const airlineBalance = await instance.getAirlineBalance();
    // take into consideration: https://ethereum.stackexchange.com/a/67094
    assert.equal(airlineBalance, parseInt(price) + parseInt(price2));
  })

  it("should allow customers to redeem loyalty points into ether", async () => {
    const flight = await instance.flights(0);
    const price = flight[1];
    await instance.buyFlight(0, {from: accounts[0], value: price});

    const balance = await web3.eth.getBalance(accounts[0]);
    await instance.redeemLoyaltyPoints({from: accounts[0]});
    const finalBalance = await web3.eth.getBalance(accounts[0]);

    const customer = await instance.customers(accounts[0]);
    const customerLoyaltyPoints = customer.loyaltyPoints;

    assert(finalBalance > balance);
    assert(customerLoyaltyPoints, 0);

  })
})
