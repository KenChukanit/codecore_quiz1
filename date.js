


function dateTranslate(date) {

let delta = Math.round((+new Date - date) / 1000);

let minute = 60,
    hour = minute * 60,
    day = hour * 24;

let readableDate;

if (delta < 60) {
    readableDate = 'just now';
} else if (delta < 2 * minute) {
    readableDate  = 'a minute ago.'
} else if (delta < hour) {
    readableDate = Math.floor(delta / minute) + ' minutes ago.';
} else if (Math.floor(delta / hour) == 1) {
    readableDate  = '1 hour ago.'
} else if (delta < day) {
    readableDate  = Math.floor(delta / hour) + ' hours ago.';
}else if (Math.floor(delta / day) == 1) {
    readableDate  = 'yesterday.'
} else if (delta > day) {
    readableDate  =   Math.floor(delta / day) + 'day ago';
}

return readableDate
}

module.exports = dateTranslate;


