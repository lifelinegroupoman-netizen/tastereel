export default function RestaurantCard({ post }){
  return (
    <div className="p-4 border rounded-2xl">
      <h3 className="font-semibold">{post.title || post.restaurant_name}</h3>
      <p className="text-sm text-gray-500">{post.location} • {post.category}</p>
      {post.video_url && (
        <video src={post.video_url} controls className="mt-3 rounded-xl w-full" />
      )}
      <p className="mt-2">{post.text}</p>
      <p className="mt-2 font-bold">⭐ {post.rating || '—'}</p>
    </div>
  )
}
