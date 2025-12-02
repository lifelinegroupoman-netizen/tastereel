import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import RestaurantCard from '../components/RestaurantCard'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    // Try to fetch published posts from Supabase if keys present
    async function load(){
      try {
        const { data } = await supabase.from('posts').select('*').eq('published', true).order('created_at', {ascending:false})
        if (data) setPosts(data)
      } catch(e){
        // Supabase not configured - ignore
      }
    }
    load()
  }, [])

  return (
    <div className="container">
      <h1>TasteReel</h1>
      <p className="card">Short video reviews and promotions for restaurants in Oman. Restaurants can subscribe and upload videos.</p>

      <div className="card">
        <h2>Explore Videos</h2>
        <div>
          {posts.length === 0 && <p>No posts found (or Supabase not configured). You can add static posts later.</p>}
          {posts.map(p => <RestaurantCard key={p.id} post={p} />)}
        </div>
      </div>

      <div className="card">
        <h2>Restaurant Dashboard</h2>
        <p><Link href="/restaurant/dashboard"><a className="button">Go to Dashboard (demo)</a></Link></p>
      </div>

    </div>
  )
}
