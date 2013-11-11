// A grouping of all require calls
require('./include/requirements');

var server = http.createServer(function(request, response)
{
    // /include/router.js
    var route = new Route(request, response);
    
    if(request.headers.cookie)
    {
        var parsedCookies = {};
        var cookieParameters = request.headers.cookie.split(';');
        for(var i = 0; i < cookieParameters.length; i++)
        {
            var cookieParameter = cookieParameters[i].split('=');
            parsedCookies[cookieParameter[0]] = cookieParameter[1];
        }
        request.headers['parsed_cookies'] = parsedCookies;
    }
    
    request.on('data', function(chunk)
    {
        if(typeof request.headers['post'] == 'undefined')
        {
            request.headers['post'] = '';
        }
        request.headers['post'] += chunk;
    });
});
server.listen(SITE_PORT, SITE_IP);

console.log(SITE_NAME + ' running on ' + SITE_ROOT);