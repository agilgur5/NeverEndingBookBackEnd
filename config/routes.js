exports.default = { 
  routes: function(api){
    return {
      
      get: [
        { path: "/users", action: "userList" },
        { path: "/user/:userName", action: "viewUserWords" },
        { path: "/stories", action: "storyList" }, 
        { path: "/story/:storyId", action: "viewStoryWords" },  
      ],

      post: [
        { path: "/authenticate/twitter", action: "twitterAuth" }, 
        { path: "/story/:storyId", action: "addWord" },
        { path: "/createStory", action: "createStory"},
        { path: "/createUser", action: "createUser"},
      ]
      
    };
  }
};