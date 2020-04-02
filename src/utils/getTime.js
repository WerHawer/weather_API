const getTime = date => {
  const pad = value => value.padStart(2, "0");
  const H = pad(String(new Date(date).getHours()));
  const M = pad(String(new Date(date).getHours()));

  return `${H}:${M}`;
};

export default getTime;
