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
    time_created: "2015TZ" // iso time
  },
  version: 1.0,
  run: function(api, data, next){
    api.query.addWord(data.params.userName, data.params.word, data.params.id, function(error){
      next(error);
    });
  }
}

exports.viewStoryWords = {
  name: "viewStoryWords",
  description: "I view a story's words (preferably lazily)",
  inputs: {
    id: {required: true}, // story id
    numWords: {required: false}, // the number of words to load (defaults to <= 1000)
    startingWordId: {required: false} // the wordId from which to start (defaults to 1)
  },
  authenticated: false,
  // outputs array of word objects in time_created order for that story
  outputExample: [
    {
      storyId: 53,
      word: "did",
      id: 42,
      userName: "@agilgur5",
      time_created: "2015TZ" // iso time
    }
  ],
  version: 1.0,
  run: function(api, data, next){
    api.query.viewStoryWords(data.params.id, data.params.numWords, data.params.startingWordId, function(error){
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
  // outputs an array of story objects in time_created order
  outputExample: [
    {
      id: 53,
      numWords: 350000, // current number of words in story
      time_created: "2014TZ" // iso time
    }
  ],
  version: 1.0,
  run: function(api, data, next){
    api.query.storyList(data.params.numStories, data.params.startingId, function(error){
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
  outputExample: {
    id: 53,
    numWords: 1,
    time_created: "2014TZ" // iso time
  },
  version: 1.0,
  run: function(api, data, next){
    api.query.createStory(data.params.userName, data.params.firstWord, function(error){
      next(error);
    });
  }
}

exports.viewUserWords = {
  name: "viewUserWords",
  description: "I view all of a user's words contributed to the never ending book (preferably lazily)",
  inputs: {
    userName: {required: true},
    numWords: {required: false}, // the number of words to load (defaults to <= 1000)
    startingId: {required: false} // the word id from which to start (defaults to the first wordId contributed)
  },
  authenticated: false,
  // outputs an array of word objects in time_created order
  outputExample: [
    {
      storyId: 53,
      word: "did",
      id: 42,
      userName: "@agilgur5",
      time_created: "2015TZ" // iso time
    }
  ],
  version: 1.0,
  run: function(api, data, next){
    api.query.viewUserWords(data.params.userName, data.params.numWords, data.params.startingId, function(error){
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
  // outputs an array of user objects in time_created order
  outputExample: [
    {
      userName: "@agilgur5",
      numWords: 9001, // number of words contributed to the never ending book
      time_created: "2014TZ" // iso time
    }
  ],
  version: 1.0,
  run: function(api, data, next){
    api.query.userList(data.params.numUsers, data.params.startingUserName, function(error){
      next(error);
    });
  }
}

exports.createUser =
  name: "createUser",
  description: "I create a user",
  inputs: {
    userName: {required: true}
  },
  authenticated: false,
  // outputs a user object
  outputExample: {
    userName: "@agilgur5",
    numWords: 0,
    time_created: "2014TZ" // iso time
  },
  version: 1.0,
  run: function(api, data, next){
    api.query.createUser(data.params.userName, function(error){
      next(error);
    });
  }
}