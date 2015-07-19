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

        // consts
        var wordId = 1;
        var time_created = new Date.now();
        
        // create story
        var wordDoc = {id: wordId, word: word, storyId: storyId, userName: userName, time_created: time_created};
        cpsConn.sendRequest(new cps.InsertRequest(storyDoc), function (err, resp) {
          if (err) {
            console.error(err); // log error
            next(err);
          }
          console.log('New story created: ' + resp[0].id)
        });
        
      },
      viewStoryWords: function(storyId, numWords, startingWordId, next) {

      },
      storyList: function(numStories, startingId, next) {

      },
      createStory: function(userName, firstWord,  next) {
        var self = this;

        // consts
        var storyId = 1;
        var time_created = new Date.now();
        
        // create story
        var storyDoc = {id: storyId, userName: userName, numWords: 0, time_created: time_created};
        cpsConn.sendRequest(new cps.InsertRequest(storyDoc), function (err, resp) {
          if (err) {
            console.error(err); // log error
            next(err);
          }
          console.log('New story created: ' + resp[0].id)
        });

        // create initial word
        self.addWord(userName, firstWord, storyId)
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
