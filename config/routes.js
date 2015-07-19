exports.default = { 
  routes: function(api){
    return {
      
      get: [
        { path: "/users", action: "usersList" },
        { path: "/stories", action: "storyList" }, 
        { path: "/stories/:storyId", action: "viewStory" },  
        { path: "/user/:userName", action: "viewUser" } 
      ],

      post: [
        { path: "/authenticate/twitter", action: "twitterAuth" }, 
        { path: "/stories/:storyId", action: "addWord" }  
      ]
      
    };
  }
};