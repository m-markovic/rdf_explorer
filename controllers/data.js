const config  = require('config');
const request = require('request')

exports.data_show = function(req, res) {
    namespace = req.url.split("/")[2];
    //obtain the params according the namespace
    endPointKey = 'endpoints.' + namespace + '.endpointQuery'
    graphKey = 'endpoints.' + namespace + '.graph'
    baseKey = 'endpoints.' + namespace + '.base'
    serverKey  = 'server.url'

    queryEndpoint = config.get(endPointKey)
    graph = config.has(graphKey);
    baseURI = config.get(baseKey)
    serverURL = config.get(serverKey)

    //preparing the uri
    path = req.originalUrl.replace("data/", "")
    url = baseURI + path;

    resFormat = req.accepts(['text/turtle', 'application/ld+json', 'application/rdf+xml', 'application/n-triples'])
    var q = 'DESCRIBE <' + url + '>';
    console.log(q)
        request.post(
            queryEndpoint, 
            { 
                form: {format: resFormat, query: q}
            },
            function (err, rcode, body) {
                res.type(resFormat);
                res.send(body);
            }
        );
};