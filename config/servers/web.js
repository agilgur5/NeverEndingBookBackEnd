config.servers = {
  "web" : {
    secure: false,                       // HTTP or HTTPS?
    serverOptions: {},                   // Passed to https.createServer if secure=true. Should contain SSL certificates
    port: 8080,                          // Port or Socket
    bindIP: "0.0.0.0",                   // Which IP to listen on (use 0.0.0.0 for all)
    httpHeaders : {                      // Any additional headers you want actionhero to respond with
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    },    
    urlPathForActions : "api",           // Route that actions will be served from; secondary route against this route will be treated as actions, IE: /api/?action=test == /api/test/
    urlPathForFiles : "public",          // Route that static files will be served from; path (relitive to your project root) to server static content from
    rootEndpointType : "api",            // When visiting the root URL, should visitors see "api" or "file"? Visitors can always visit /api and /public as normal
    directoryFileType : "index.html",    // The default filetype to server when a user requests a directory
    flatFileCacheDuration : 60,          // The header which will be returned for all flat file served from /public; defined in seconds
    fingerprintOptions : {               // Settings for determining the id of an http(s) requset (browser-fingerprint)
      cookieKey: "sessionID",
      toSetCookie: true,
      onlyStaticElements: false
    },
    formOptions: {                       // Options to be applied to incomming file uplaods. More options and details at https://github.com/felixge/node-formidable
      uploadDir: "/tmp",
      keepExtensions: false,
      maxFieldsSize: 1024 * 1024 * 100
    },
    metadataOptions: {                   // Options to configure metadata in responses
      serverInformation: true,
      requestorInformation: true
    },
    returnErrorCodes: false              // When true, returnErrorCodes will modify the response header for http(s) clients if connection.error is not null. You can also set connection.rawConnection.responseHttpCode to specify a code per request.
  }
}