import fetch from "node-fetch";

export async function transaction(address) {
  // make an API call to the ABIs endpoint
  const response = await fetch(
    `https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=E2EY6Z5U7VY1TSXKF8X3VVTC3C3JG19N2U`
  );
  const data = await response.json();

  // print the JSON response

  let abi = data.result;
  const par = JSON.stringify(abi);
  const par2 = JSON.parse(par);
  console.log("TRANSACTION JSON", abi);
  return par2;
}
