import getCurrentUser from "./actions/getCurrentUser";
import getPosts from "./actions/getPosts";
import Form from "./components/Form";
import Header from "./components/Header";
import PostFeed from "./components/posts/PostFeed";



export default async function Home() {
  const currentUser = await getCurrentUser();
  const posts = await getPosts()


  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening?" currentUser={currentUser} />
      <PostFeed posts={posts} currentUser={currentUser} />
    </>
  )
}
