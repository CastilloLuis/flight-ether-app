import Web3 from 'web3';

export function getWeb3(): Promise<any> {
  return new Promise((res, rej) => {
    window.addEventListener('load', () => {
      let web3 = window.web3;
      if (web3) {
        web3 = new Web3(web3.currentProvider);
        res(web3);
      } else {
        rej('Web3 is not defined');
      }
    });
  })
}
