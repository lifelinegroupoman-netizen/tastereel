import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import RestaurantCard from '../../components/RestaurantCard'

export default function RestaurantProfile(){
  const router = useRouter()
  const { id } = router.query
  const [restaurant, setRestaurant] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(()=>{ if (id) load() }, [id])
  async function load(){
    const { data: r } = await supabase.from('restaurants').select('*').eq('id', id).single()
    setRestaurant(r)
    const { data: p } = await supabase.from('posts').select('*').eq('restaurant_id', id).eq('published', true)
    setPosts(p || [])
  }

  if (!restaurant) return <div className="p-4">Loading...</div>
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">{restaurant.name}</h1>
      <p className="text-sm text-gray-500">{restaurant.location} • {restaurant.category}</p>
      <p className="mt-2 bg-yellow-100 p-3 rounded">{restaurant.promo_text}</p>

      <div className="mt-6 grid gap-4">
        {posts.map(post => <RestaurantCard key={post.id} post={post} />)}
      </div>
    </div>
  )
}
