exports.addWord = {
  name: "addWord",
  description: "I add a word to a story",
  inputs: {
    userName: {required: true},
    word: {required: true},
    id: {required: true} // story id
  },
  authenticated: true,
  // outputs the word object
  outputExample: {
    storyId: 53,
    word: "did",
    id: 42,
    userName: "@agilgur5",
    datetime: "2015TZ" // iso time
  },
  version: 1.0,
  run: function(api, data, next){
    api.db.addWord(data.params.userName, data.params.word, data.params.id, function(error){
      next(error);
    });
  }
}

exports.viewStory = {
  name: "viewStory",
  description: "I view a story (preferably lazily)",
  inputs: {
    id: {required: true}, // story id
    numWords: {required: false}, // the number of words to load (defaults to <= 1000)
    startingWordId: {required: false} // the wordId from which to start (defaults to 1)
  },
  authenticated: false,
  // outputs array of word objects in datetime order for that story
  outputExample: [
    {
      storyId: 53,
      word: "did",
      id: 42,
      userName: "@agilgur5",
      datetime: "2015TZ" // iso time
    }
  ],
  version: 1.0,
  run: function(api, data, next){
    api.db.viewStory(data.params.id, data.params.numWords, data.params.startingWordId, function(error){
      next(error);
    });
  }
}

exports.storyList = {
  name: "storyList",
  description: "I list all the stories (preferably lazily)",
  inputs: {
    numStories: {required: false}, // the number of stories to load (defaults to <= 1000)
    startingId: {required: false} // the story id from which to start (defaults to 1)
  },
  authenticated: false,
  // outputs an array of story objects in datetime order
  outputExample: [
    {
      id: 53,
      numWords: 350000, // current number of words in story
      datetime: "2014TZ" // iso time
    }
  ],
  version: 1.0,
  run: function(api, data, next){
    api.db.storyList(data.params.numStories, data.params.startingId, function(error){
      next(error);
    });
  }
}

exports.viewUser = {
  name: "viewUser",
  description: "I view a user and all his words contributed (preferably lazily)",
  inputs: {
    userName: {required: true},
    numWords: {required: false}, // the number of words to load (defaults to <= 1000)
    startingId: {required: false} // the word id from which to start (defaults to the first wordId contributed)
  },
  authenticated: false,
  // outputs an array of word objects in datetime order
  outputExample: [
    {
      storyId: 53,
      word: "did",
      id: 42,
      userName: "@agilgur5",
      datetime: "2015TZ" // iso time
    }
  ],
  version: 1.0,
  run: function(api, data, next){
    api.db.viewUser(data.params.userName, data.params.numWords, data.params.startingId, function(error){
      next(error);
    });
  }
}

exports.userList = {
  name: "userList",
  description: "I view the list of users who have contributed to the never ending book (preferably lazily)",
  inputs: {
    numUsers: {required: false}, // the number of users to load (defaults to <= 1000)
    startingUserName: {required: false} // the userName from which to start (defaults to the first userName who contributed)
  },
  authenticated: false,
  // outputs an array of word objects in datetime order
  outputExample: [
    {
      userName: "@agilgur5"
    }
  ],
  version: 1.0,
  run: function(api, data, next){
    api.db.userList(data.params.numUsers, data.params.startingUserName, function(error){
      next(error);
    });
  }
}

// not exposed as a route publicly (yet)
exports.createStory =
  name: "createStory",
  description: "I create a story",
  inputs: {
    userName: {required: true},
    firstWord: {required: true}
  },
  authenticated: true,
  // outputs a story object
  outputExample: [
    {
      id: 53,
      numWords: 1,
      datetime: "2014TZ" // iso time
    }
  ],
  version: 1.0,
  run: function(api, data, next){
    api.db.createStory(data.params.userName, data.params.firstWord, function(error){
      next(error);
    });
  }
}