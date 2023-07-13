// import React, { useEffect, useState } from "react";
// import { getTimelinePosts } from "../../actions/PostsAction";
// import Post from "../Post/Post";
// import { useSelector, useDispatch } from "react-redux";
// import "./Posts.css";
// import { useParams } from "react-router-dom";
// import { deletePost} from "../../api/PostsRequests";

// const Posts = () => {
//   const params = useParams()
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.authReducer.authData);
//   let { posts, loading } = useSelector((state) => state.postReducer);
//   const [updatePage, setUpdatePage] = useState(false)

//   useEffect(() => {
//     dispatch(getTimelinePosts(user._id));
//   }, [updatePage, posts.length]);

//   const handleDeletePost = async (id) => {
//     try {
//       await deletePost(id,user._id);
//       // Remove the deleted post from the state
//       setUpdatePage(prev => !prev)
//       posts = posts.filter((post) => post._id !== id);

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if(params.id && params.id != user._id && !(user.following.includes(params.id))) return <p className="follow_user">Please follow to see posts</p>

//   if(!posts) return 'No Posts';
//   if(params.id) posts = posts.filter((post)=> post.userId===params.id)
//   return (
//     <div className="Posts">
//       {loading
//         ? "Fetching posts...."
//         : posts.map((post, id) => {
//             return <Post data={post} key={id} onDelete={handleDeletePost}/>;
//           })}
//     </div>
//   );
// };

// export default Posts;


import React, { useEffect, useState } from "react";
import { getTimelinePosts } from "../../actions/PostsAction";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import "./Posts.css";
import { useParams } from "react-router-dom";
import { deletePost } from "../../api/PostsRequests";
import ReactLoading from "react-loading";

const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts, loading } = useSelector((state) => state.postReducer);
  const [updatePage, setUpdatePage] = useState(false);

  useEffect(() => {
    const id = params?.id ? params?.id : user._id
    dispatch(getTimelinePosts(id));
  }, [updatePage, dispatch, user._id, params.id]);

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id, user._id);
      // Remove the deleted post from the state
      const filteredPosts = posts.filter((post) => post._id !== id);
      setUpdatePage((prev) => !prev);
      dispatch({ type: "SET_POSTS", payload: filteredPosts });
    } catch (error) {
      console.error(error);
    }
  };

  if (!(posts?.length)) return <p className="follow_user">No posts have been made yet!</p>;

  if (params.id && params.id !== user._id && !user.following.includes(params.id))
    return <p className="follow_user">Please follow to see posts</p>;


  const filteredPosts = params.id ? posts.filter((post) => post.userId === params.id) : posts;

  return (
    <div className="Posts">
      {loading
        ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <ReactLoading type={"bars"} color="#fff" />
        </div>

        : filteredPosts.map((post) => (
          <Post data={post} key={post._id} onDelete={handleDeletePost} />
        ))}
    </div>
  );
};

export default Posts;
