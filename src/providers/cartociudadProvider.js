import BaseProvider from './provider';
import wellknown from 'wellknown';
import fetchJsonp from 'fetch-jsonp';



const cachedIds = {};


export default class CartociudadProvider extends BaseProvider {
  geocode(query){
    const paramString = this.getParamString({
      q: query,
      limit: 40,
      type: 'callejero',
    });

    return fetchJsonp(`https://www.cartociudad.es/geocoder/api/geocoder/candidatesJsonp?${paramString}`)
    .then((response)=>response.json())
    .then((json)=>Promise.all(json.map((item)=>this.getFullEntity(item))));

  }

  getFullEntity(item) {
    if (cachedIds[item.id]) {
      return cachedIds[item.id];
    }
    return cachedIds[item.id] = fetchJsonp(`https://www.cartociudad.es/geocoder/api/geocoder/findJsonp?id=${item.id}&type=${item.type}`)
    .then((response)=>response.json())
    .then((json)=>{
//       json.original_address = item.address.replace(/, Madrid$/,'');
//       json.original = item;
//       return json;
      const geom = L.geoJson(wellknown.parse(json.geom));

      return {
        x: json.lng,
        y: json.lat,
        label: item.address.replace(/, Madrid$/,''),
        bounds: geom.getBounds()
      };
    });
  }


  parse({ data }) {
    return data.map(r => ({
      x: r.lon,
      y: r.lat,
      label: r.address,
      bounds: [
        [parseFloat(r.boundingbox[0]), parseFloat(r.boundingbox[2])], // s, w
        [parseFloat(r.boundingbox[1]), parseFloat(r.boundingbox[3])], // n, e
      ],
      raw: r,
    }));
  }

  search({ query, data }) {

    if (query) {
      return this.geocode(query);
    }

  }
}
