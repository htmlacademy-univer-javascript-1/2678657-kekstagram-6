function checkLength(str, strlength) {
  return str.length <= strlength;
}


function checkPalindrome(str) {
  const strMass = str.toLowerCase().replaceAll(' ','').split('');
  const reverseStr = strMass.toReversed();
  return strMass.join('') === reverseStr.join('');
}


function extractNumber(str) {
  str = str.toString().toLowerCase().replaceAll(' ','');
  const numbers = ['0','1','2','3','4','5','6','7','8','9'];
  const strMass = str.split('');
  let newStr = '';
  for(let i = 0; i<strMass.length; i++){
    if(numbers.includes(strMass[i])){
      newStr += str[i];
    }
  }
  return parseInt(newStr, 10);
}


function extractNumberNew(str) {
  str = str.toString();
  let newStr = '';
  for (const char of str) {
    if(!isNaN(parseInt(char, 10))) {
      newStr += char;
    }
  }
  return parseInt(newStr, 10);
}

function canMeeting(startDay, endDay, startMeeting, duration) {

  function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const startDayMinutes = timeToMinutes(startDay);
  const endDayMinutes = timeToMinutes(endDay);
  const startMeetingMinutes = timeToMinutes(startMeeting);
  const endMeetingMinutes = startMeetingMinutes + duration;

  return startMeetingMinutes >= startDayMinutes && endMeetingMinutes <= endDayMinutes;
}

checkLength('2222', 5);
checkPalindrome('Лёша на полке клопа нашёл ');
extractNumber('0000fjdnfjndf2323');
extractNumberNew('fjndsfjsjdfnjnsfd342424');
canMeeting('08:00', '17:30', '14:00', 90);

