export function formatDate(date) {
  const tmpDate = new Date(date * 1000);
  const getNumString = num => {
    return (num < 10) ? '0' + num : num;
  };

  return [
    getNumString(tmpDate.getUTCDate()),
    getNumString(tmpDate.getUTCMonth() + 1),
    tmpDate.getUTCFullYear()
].join('.') + ' ' + [
    getNumString(tmpDate.getUTCHours()),
    getNumString(tmpDate.getUTCMinutes())
  ].join(':');
}

export function formatValue(value, scale) {
  const format = wNumb({
    mark: ',',
    thousand: ' ',
    decimals: scale
  });

  return format.to(value);
}

export  function getDateAgo(d, days) {
  const dateCopy = new Date(d);

  dateCopy.setDate(d.getDate() - days);

  return dateCopy;
}