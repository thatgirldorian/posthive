import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago";

TimeAgo.addDefaultLocale(en);

const timeago = new TimeAgo("en-US");

export default timeago;
