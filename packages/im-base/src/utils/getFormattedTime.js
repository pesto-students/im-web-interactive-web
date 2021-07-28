const getFormattedTime = (seconds) => {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = padzero(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${padzero(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
};

const padzero = (string) => {
  return ("0" + string).slice(-2);
};

export default getFormattedTime;
