const getFormattedTime = (seconds) => {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = padzero(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${padzero(mm)}:${ss}`;
  }
  return `00:${mm}:${ss}`;
};

const padzero = (string) => {
  return ("0" + string).slice(-2);
};

const countSeconds = (str) => {
  const [hh = "0", mm = "0", ss = "0"] = (str || "0:0:0").split(":");
  const hour = parseInt(hh, 10) || 0;
  const minute = parseInt(mm, 10) || 0;
  const second = parseInt(ss, 10) || 0;
  return hour * 3600 + minute * 60 + second;
};

export { getFormattedTime, countSeconds };
