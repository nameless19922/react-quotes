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

export function getDateAgo(d, days) {
  const dateCopy = new Date(d);

  dateCopy.setDate(d.getDate() - days);

  return dateCopy;
}

export function getPeriod(period) {
  let date = new Date(),
      dateTo = Date.now(),
      dateFrom = null,
      dateAgo = null,
      resolution = 5;

  switch (period) {
    case '1d':
      dateAgo = getDateAgo(date, 1);
      dateFrom = Date.UTC(dateAgo.getUTCFullYear(), dateAgo.getUTCMonth(), dateAgo.getUTCDate(), 0, 0)
      break;

    case '1m':
      dateAgo = getDateAgo(date, 30);
      dateFrom = Date.UTC(dateAgo.getUTCFullYear(), dateAgo.getUTCMonth(), dateAgo.getUTCDate(), 0, 0)
      resolution = 60;
      break;

    case '3m':
      dateAgo = getDateAgo(date, 90);
      dateFrom = Date.UTC(dateAgo.getUTCFullYear(), dateAgo.getUTCMonth(), dateAgo.getUTCDate(), 0, 0)
      resolution = 60;
      break;

    case '1y':
      dateAgo = getDateAgo(date, 365);
      dateFrom = Date.UTC(dateAgo.getUTCFullYear(), dateAgo.getUTCMonth(), dateAgo.getUTCDate(), 0, 0)
      resolution = 60;
      break;

    case '5y':
      dateAgo = getDateAgo(date, 1825);
      dateFrom = Date.UTC(dateAgo.getUTCFullYear(), dateAgo.getUTCMonth(), dateAgo.getUTCDate(), 0, 0)
      resolution = 'W';
      break;

    case 'max':
      dateFrom = Date.UTC(2008, 1, 1, 0, 0)
      resolution = 'W';
      break;
  }

  return {
    dateTo,
    dateFrom,
    resolution
  }
}