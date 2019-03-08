
var request = require('request');

// make http request
const forecast=(coord,callback)=>{
if(coord===null)
{
    coord={};
}
            const URL = `https://api.darksky.net/forecast/1810645bffa8065025c7f0c1e62b3328/${coord.lat},${coord.long}?units=si&lang=en`; //HTTP URL
            request({ url: URL, json: true }, (err, res, body) => {
                if (err) {
                    console.log(err);
                }
                else if(body.code===400)
                {
                    callback('error',{summary:'unable to find location'});
                }
                else {
                    console.log(res.statusCode);
                    console.log(body.daily.summary);
                    callback(null,{summary:body.daily.summary,currently:body.currently});
                    console.log(`it is currently ${body.currently.temperature} degress. there is ${body.currently.precipProbability} change of rain`);
                }
            })
        }
module.exports=forecast;