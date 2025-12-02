export default function RestaurantCard({ post }) {
  return (
    <div style={{marginBottom:12}}>
      <h3>{post.title || post.restaurant_name}</h3>
      <p style={{color:'#666'}}>{post.location} • {post.category}</p>
      {post.video_url && <video src={post.video_url} controls />}
      <p>{post.text}</p>
    </div>
  )
}
