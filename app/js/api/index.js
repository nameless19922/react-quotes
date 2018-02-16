export default {
  getQuoteInfo(classCode, securCode) {
    return axios.get(`https://api.bcs.ru/quotesgroups/v2?classcode=${classCode}&securcode=${securCode}`);
  },

  getQuoteHistory(securCode, resolution, dateFrom, dateTo) {
    return axios.get(`https://api.bcs.ru/udfdatafeed/v1/history?symbol=${securCode}&resolution=${resolution}&from=${(dateFrom / 1000).toFixed(0)}&to=${(dateTo / 1000).toFixed(0)}`)
  },

  getLeaders(type, number) {
    return axios.get(`https://api.bcs.ru/quotesgroups/v1?list_filter=leaders${type}&list_limit=${number}&mode=real`);
  }
}