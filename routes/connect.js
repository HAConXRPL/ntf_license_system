const { XummSdk } = require("xumm-sdk");
const { TxData } = require("xrpl-txdata");
const Sdk = new XummSdk(
  "e0394628-5fc2-4349-9de3-dc3d93e359fa",
  "4aeb7f57-a34b-4d69-b094-1c676a5ec4e5"
);

const ROOTWALLET = "r3GWPm7QkWFL8uAWQtLEMBgg76nf5wtxu9";
//
var xrpl = require("xrpl");
const internal = require("stream");
const { _private } = require("xrpl/dist/npm/Wallet/fundWallet");
var ipfs = "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf4dfuylqabf3oclgtqy55fbzdi";
var TokenID =
  "000800006A8A2613F2BF314E3EF874601857C86039FD92D716E5DA9C00000001";
var OfferIndex =
  "302CAB5293696D1A794688BB6650564362CDD87B71D91BB8F802B36B0FFC3E68";
var Secret = "ssxnXf2jh46bZDkf8nkqinUGdfFq9";

const Verify = new TxData();
//
async function nextWallet(client, nfts, arr) {
  for (var i = 0; i < nfts.result.account_nfts.length; i++) {
    if (nfts.result.account_nfts[i].Flags === 0) {
      var uri = xrpl.convertHexToString(nfts.result.account_nfts[i].URI);
      var idx = uri.indexOf("CHILD:");
      if (idx < 0) continue;
      var acc = uri.substring(idx + 6);
      //
      nfts = await client.request({
        method: "account_nfts",
        account: acc,
      });
      //
      arr.push(nfts.result.account);
      //
      return nfts;
    }
  }
}

async function lookup(rootAccount, arr) {
  const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233");
  await client.connect();
  //
  console.log("Connected to Sandbox (lookup)");
  //
  arr.push(rootAccount);
  //
  var nfts = await client.request({
    method: "account_nfts",
    account: rootAccount,
  });
  //
  while (nfts.result.account_nfts.length > 0) {
    nfts = await nextWallet(client, nfts, arr);
    if (!nfts) break;
  }
  //
  await client.disconnect();
}

var lsview = function (req, res, next) {
  var arr = [];
  //
  const main = async () => {
    await lookup(ROOTWALLET, arr);
    //
    var context = {
      data: arr,
    };
    //
    req.app.render("lsview", context, function (err, html) {
      if (err) {
        console.error("뷰 렌더링 중 에러 발생 : " + err.stack);
        console.log("에러발생.");
        res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
        res.write("<h1>뷰 렌더링 중 에러 발생</h1>");
        res.write("<br><p>" + err.stack + "</p>");
        res.end();
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
      res.end(html);
    });
  };
  //
  main();
};

module.exports.lsview = lsview;
