import { BsFillCartFill, BsFillCalendarEventFill } from "react-icons/bs";
import Image from "next/image";
import eth from "../../../assets/eth.png";
import { shortenAddress } from "../../../../static/shorten";
import moment from "moment";

const style = {
  eventItem: `flex px-4 py-5 font-medium`,
  event: `flex items-center`,
  eventIcon: `mr-2 text-xl`,
  eventName: `text-lg font-semibold`,
  eventPrice: `flex items-center`,
  eventPriceValue: `text-lg`,
  ethLogo: `h-5 mr-2`,
  accent: `text-[#2081e2]`,
};

const EventItem = ({ event, eventcode }) => {
  const time = event?.timeStamp;
  const date = new Date(1683197894 * 1000);
  /* console.log(
    "TIME IS",
    moment(1683197894 * 1000)
      .startOf("H")
      .fromNow(),
    timenow,
    moment()
      .startOf(1683197894 * 1000)
      .fromNow()
  );*/
  return (
    <>
      {eventcode === event.methodId && (
        <div className={style.eventItem}>
          <>
            <div className={`${style.event} flex-[2]`}>
              <div className={style.eventIcon}>
                <BsFillCalendarEventFill />
              </div>
              <div className={style.eventName}>MintTo</div>
            </div>
            <div className={`${style.eventPrice} flex-[2]`}>
              <img
                src="https://cryptologos.cc/logos/polygon-matic-logo.png"
                alt="matic"
                className={style.ethLogo}
              />
              <div className={style.eventPriceValue}>{event.value}</div>
            </div>
            <div className={`${style.accent} flex-[3]`}>
              {shortenAddress(event.from)}
            </div>
            <div className={`${style.accent} flex-[3]`}>
              {shortenAddress(event.to)}
            </div>
            <div className={`${style.accent} flex-[2]`}>
              {moment(event.timeStamp * 1000)
                .startOf("S")
                .fromNow()}
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default EventItem;
