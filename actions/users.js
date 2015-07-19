exports.authenticate = {
  name: "authenticate",
  description: "I authenticate a user",
  inputs: {
    userName: {required: true},
    password: {required: true},
  },
  authenticated: false,
  outputExample: {},
  version: 1.0,
  run: function(api, data, next){
    api.users.authenticate(data.params.userName, data.params.password, function(error, match){
      data.response.authenticated = match;
      if(match === false && !error){
        error = new Error("unable to log in");
      }
      next(error);
    });
  }
};