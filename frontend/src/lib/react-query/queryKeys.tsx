export enum QUERY_KEYS {
  // AUTH KEYS
  CREATE_USER_ACCOUNT = "createUserAccount",

  // USER KEYS
  GET_CURRENT_USER = "getCurrentUser",
  GET_USERS = "getUsers",
  GET_USER_BY_ID = "getUserById",

  // POST KEYS
  GET_Blogs = "getBlogs",
  GET_INFINITE_POSTS = "getInfinitePosts",
  GET_RECENT_POSTS = "getRecentPosts",
  GET_Blog_BY_ID = "getBlogById",
  GET_USER_POSTS = "getUserPosts",
  GET_FILE_PREVIEW = "getFilePreview",

  DELETE_Blog_By_Id = 'deleteBlogById',
  PUT_Blog_By_Id = 'updateBlogById',
  POST_Blog = 'createBlog',


  //  SEARCH KEYS
  SEARCH_POSTS = "getSearchPosts",
}