var cps = require('cps-api');

module.exports = {
  initialize: function(api, next) {
    var cpsConn = new cps.Connection('tcp://cloud-us-0.clusterpoint.com:9007', 'NeverEndingBookDB',
      process.env.CPS_USERNAME, process.env.CPS_PASSWORD, 'document', 'document/id', {account: process.env.CPS_ACCOUNT});
    // cpsConn.debug = true;
    api.query = {

      // story methods
      addWord: function(userName, word, storyId, next){
        var self = this;
        redis.hget(self.usersHash, userName, function(error, data){
          if(error){
            next(error);
          }else if(data){
            next("userName already exists");
          }else{
            self.cryptPassword(password, function(error, hashedPassword){
              if(error){
                next(error);
              }else{
                var data = {
                  userName: userName,
                  hashedPassword: hashedPassword,
                  createdAt: new Date().getTime(),
                };
                redis.hset(self.usersHash, userName, JSON.stringify(data), function(error){
                  next(error);
                });
              }
            });
          }
        });
      },
      viewStoryWords: function(storyId, numWords, startingWordId, next) {

      },
      storyList: function(numStories, startingId, next) {

      },
      createStory: function(userName, firstWord,  next) {

      },

      // user methods
      viewUserWords: function(userName, numWords, startingWordId, next) {

      },
      userList: function(numUsers, startingUserName, next) {

      },
      createUser: function(userName, next) {

      }
  }
}
