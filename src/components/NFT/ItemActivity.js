import { CgArrowsExchangeV } from "react-icons/cg";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useState, useEffect } from "react";
import dummyEvents from "../../../static/dummyEvents.js";
import EventItem from "./itemActivity/EventItem";
import EventItemNewList from "./itemActivity/EventitemNewList.js";
import EventItemNewauc from "./itemActivity/EventitemNewauc.js";
import EventItemAllc from "./itemActivity/EventItemAllc.js";
import EventitemBuylisting from "./itemActivity/EventitemBuylisting.js";
import EventitemBuyauction from "./itemActivity/EventitemBuyauction.js";

import {
  useContractEvents,
  useContract,
  useAddress,
} from "@thirdweb-dev/react";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../../static/addresses";
import { transaction } from "../../../static/Transaction.js";

const style = {
  wrapper: `w-full mt-8 border border-[#151b22] rounded-xl bg-[#303339] overflow-hidden`,
  title: `bg-[#262b2f] px-6 py-4 flex items-center`,
  titleLeft: `flex-1 flex items-center text-xl font-bold`,
  titleIcon: `text-3xl mr-2`,
  titleRight: `text-xl`,
  filter: `flex items-center border border-[#151b22] mx-4 my-6 px-3 py-4 rounded-xl bg-[#363840]`,
  filterTitle: `flex-1`,
  tableHeader: `flex w-full bg-[#262b2f] border-y border-[#151b22] mt-8 px-4 py-1`,
  eventItem: `flex px-4`,
  ethLogo: `h-5 mr-2`,
  accent: `text-[#2081e2]`,
};

const ItemActivity = () => {
  const address = useAddress();

  const [Transactions, setTransactions] = useState();
  const [sort, setSort] = useState("desc");

  //GET ALL TRANSACTIONS THROUGH THE API:

  useEffect(() => {
    if (!address) return;
    (async () => {
      {
        // make an API call to the ABIs endpoint
        const response = await fetch(
          `https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=50&sort=${sort}&apikey=E2EY6Z5U7VY1TSXKF8X3VVTC3C3JG19N2U`
        );
        const data = await response.json();

        // print the JSON response

        let abi = data.result;
        const par = JSON.stringify(abi);
        const par2 = JSON.parse(par);
        console.log("TRANSACTION JSON", par2);
        setTransactions(par2);
      }
    })();
  }, [address, sort]);

  const { contract: collection } = useContract(NFT_COLLECTION_ADDRESS);

  const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS);

  // You can get a specific event
  const { data: events } = useContractEvents(collection, "Transfer");

  // All events
  const { data: allEvents } = useContractEvents(collection);

  // You can get a specific event
  const { data: event2 } = useContractEvents(marketplace, "NewListing");

  // All events
  const { data: allEvents2 } = useContractEvents(marketplace);

  // By default, you set up a listener for all events, but you can disable it
  const { data: eventWithoutListener } = useContractEvents(
    collection,
    "Transfer",
    { subscribe: false }
  );

  console.log("TRANSACTIONS HERE ", Transactions);

  const [toggle, setToggle] = useState(false);
  const [toggleFilter, setFilter] = useState(false);
  const [Transfer, setTransfer] = useState(false);
  const [Mintto, setMintto] = useState(false);
  const [NewListing, setNewListing] = useState(false);
  const [Auction, setAuction] = useState(false);
  const [Allevents, setAllevents] = useState(true);
  const [Buyauction, setBuyauction] = useState(false);
  const [BuyListing, setBuyLisitng] = useState(false);

  console.log(
    "The New button toggle mode is ",
    Mintto,
    Transfer,
    NewListing,
    Auction,
    Allevents,
    Buyauction,
    BuyListing
  );

  return (
    <div className={style.wrapper}>
      <div className={style.title} onClick={() => setToggle(!toggle)}>
        <div className={style.titleLeft}>
          <span className={style.titleIcon}>
            <CgArrowsExchangeV />
          </span>
          Item Activity
        </div>
        <div className={style.titleRight}>
          {toggle ? <AiOutlineUp /> : <AiOutlineDown />}
        </div>
      </div>
      {toggle && (
        <div className={style.activityTable}>
          <div className={style.filter}>
            <div
              className={style.filterTitle}
              onClick={() => setFilter(!toggleFilter)}
            >
              Filter
            </div>
            <div className={style.filterIcon}>
              {toggleFilter ? <AiOutlineUp /> : <AiOutlineDown />}
            </div>
          </div>
          {toggleFilter && (
            <div className="flex ml-5">
              <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                  onClick={() => setAllevents(!Allevents)}
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                >
                  All Events
                </button>
                <button
                  onClick={() => setNewListing(!NewListing)}
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                >
                  NewListing
                </button>
                <button
                  onClick={() => setAuction(!Auction)}
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                >
                  NewAuctions
                </button>
                <button
                  onClick={() => setTransfer(!Transfer)}
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                >
                  Transfer
                </button>
                <button
                  onClick={() => setMintto(!Mintto)}
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                >
                  TokenMinted
                </button>
                <button
                  onClick={() => setBuyauction(!Buyauction)}
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                >
                  BuyAuction
                </button>
                <button
                  onClick={() => setBuyLisitng(!BuyListing)}
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                >
                  BuyFromListing
                </button>
                <div className=" ml-[36rem]">
                  <button
                    onClick={() => setSort("asc")}
                    type="button"
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                  >
                    Asc
                  </button>
                  <button
                    onClick={() => setSort("desc")}
                    type="button"
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                  >
                    Desc
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className={style.tableHeader}>
            <div className={`${style.tableHeaderElement} flex-[3]`}>Event</div>
            <div className={`${style.tableHeaderElement} flex-[2]`}>Price</div>
            <div className={`${style.tableHeaderElement} flex-[3]`}>From</div>
            <div className={`${style.tableHeaderElement} flex-[3]`}>To</div>
            <div className={`${style.tableHeaderElement} flex-[2]`}>Date</div>
          </div>
          {Transfer || Mintto
            ? Transactions.map((event) => {
                return <EventItem event={event} eventcode={"0x0075a317"} />;
              })
            : NewListing
            ? Transactions.map((event) => {
                return (
                  <EventItemNewList event={event} eventcode={"0x746415b5"} />
                );
              })
            : Auction
            ? Transactions.map((event) => {
                return (
                  <EventItemNewauc event={event} eventcode={"0x16654d40"} />
                );
              })
            : BuyListing
            ? Transactions.map((event) => {
                return (
                  <EventItemNewauc event={event} eventcode={"0x9979c009"} />
                );
              })
            : Buyauction
            ? Transactions.map((event) => {
                return (
                  <EventItemNewauc event={event} eventcode={"0x0858e5ad"} />
                );
              })
            : allEvents &&
              Transactions.map((event) => {
                return <EventItemAllc event={event} eventcode={"0x"} />;
              })}
        </div>
      )}
    </div>
  );
};

export default ItemActivity;
