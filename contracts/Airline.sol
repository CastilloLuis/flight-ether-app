// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.7.4;
pragma experimental ABIEncoderV2;

// To Do: include mappings in customers structs

contract Airline {
  
  address public owner;

  struct Customer {
    uint loyaltyPoints;
    uint totalBoughtFlights;
  }
  struct Flight {
    string route;
    uint price;
  }

  uint etherPerLoyalty = 0.5 ether;
  Flight[] public flights;
  mapping(address => Customer) public customers;
  mapping(address => Flight[]) public customersFlight;
  mapping(address => uint) public customersTotalFlight;

  event FlightPurchased(address indexed customer, uint price, string flight);

  constructor() {
    owner = msg.sender;
    generateFlightsInitialData();
  }

  function getTotalFlights() public view returns (uint) {
    return flights.length;
  }

  function generateFlightsInitialData() public {
    flights.push(Flight('Tokyo', 4 ether));
    flights.push(Flight('Maracaibo', 5 ether));
    flights.push(Flight('Miami', 3 ether));
  }

  function buyFlight(uint flightIdx) public payable {
    Flight storage flight = flights[flightIdx];
    require(msg.value == flight.price);
    handleCustomerTransaction(msg.sender, flight);
  }

  function handleCustomerTransaction(address sender, Flight memory _flight) public {
    Customer storage customer = customers[sender];
    customer.loyaltyPoints += 5;
    customer.totalBoughtFlights += 1;
    customersFlight[msg.sender].push(_flight);
    customersTotalFlight[sender]++;
    emit FlightPurchased(sender, _flight.price, _flight.route);
  }

  function redeemLoyaltyPoints() public {
    Customer storage customer = customers[msg.sender];
    uint etherToRefund = etherPerLoyalty * customer.loyaltyPoints;
    msg.sender.transfer(etherToRefund); // refund to the user to his wallet
    customer.loyaltyPoints = 0;
  }

  function getRefundableEther() public view returns (uint) {
    return etherPerLoyalty * customers[msg.sender].loyaltyPoints;
  }

  function getAirlineBalance() public isOwner view returns (uint) {
    address airlineAddress = address(this); // contract instance
    return airlineAddress.balance;
  }

  modifier isOwner() {
    require(msg.sender == owner);
    _;
  }
  
}
