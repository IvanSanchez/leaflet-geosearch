export default class BaseProvider {
  constructor(options = {}) {
    this.options = options;
  }

  getParamString(params) {
    return Object.keys(params).map(key =>
      `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
    ).join('&');
  }

  search({ query }) {
    // eslint-disable-next-line no-bitwise
    const protocol = ~location.protocol.indexOf('http') ? location.protocol : 'https:';
    const url = this.endpoint({ query, protocol });

    return fetch(url).then((r)=>{r.json()}).then((json)=>this.parse({data:json}));

  }
}
