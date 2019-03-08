var request = require('request');

const geo=(address, callback) => {
    GeoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic3RvdXJhMTUiLCJhIjoiY2pzd2F4MTRuMGZxNjQ1bjJqZm90NXMyOSJ9._3t-0pR2Wv87YWtvVjyF1Q`;
    request({ url: GeoURL, json: true }, (err, res, body) => {
        if (err) {
            console.log('unable to connect to server');
            callback('error',null)
        }
        else if (body.features.length === 0) {
            console.log('try a different address');
            callback('error',null)
        }
        else {
            //console.log(res.statusCode);
            //console.log(body.features[0].place_name)
           // console.log(`coordinates: ${body.features[0].geometry.coordinates[0]} lat , ${body.features[0].geometry.coordinates[1]} : long `);
            callback(null,{long:body.features[0].geometry.coordinates[0],lat:body.features[0].geometry.coordinates[1],place_name:body.features[0].place_name});
        }
        
    })
}

module.exports=geo;

