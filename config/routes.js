exports.default = { 
  routes: function(api){
    return {
      
      get: [
        { path: "/users", action: "userList" },
        { path: "/user/:userName", action: "viewUser" },
        { path: "/stories", action: "storyList" }, 
        { path: "/story/:storyId", action: "viewStory" },  
      ],

      post: [
        { path: "/authenticate/twitter", action: "twitterAuth" }, 
        { path: "/stories/:storyId", action: "addWord" }  
      ]
      
    };
  }
};