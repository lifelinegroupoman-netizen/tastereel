import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import dynamic from 'next/dynamic'
import RestaurantCard from '../components/RestaurantCard'

const MapLeaflet = dynamic(() => import('../components/MapLeaflet'), { ssr: false })

export default function Home(){
  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [sort, setSort] = useState('rating-desc')

  useEffect(()=>{ fetchPosts() }, [])
  async function fetchPosts(){
    const { data, error } = await supabase.from('posts').select('*').eq('published', true).order('created_at', { ascending: false })
    if (!error) setPosts(data)
  }

  const filtered = posts
    .filter(p => (!category || p.category === category))
    .filter(p => (!location || p.location === location))
    .filter(p => (p.title + ' ' + (p.text||'')).toLowerCase().includes(query.toLowerCase()))
    .sort((a,b) => sort==='rating-desc' ? (b.rating || 0) - (a.rating || 0) : (a.rating || 0) - (b.rating || 0))

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Explore Oman's Restaurants</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <input className="p-2 rounded border" placeholder="Search" value={query} onChange={e=>setQuery(e.target.value)} />
        <select onChange={e=>setCategory(e.target.value)} className="p-2 rounded border">
          <option value="">All Categories</option>
          <option>Indian</option>
          <option>Italian</option>
          <option>Omani</option>
          <option>Fast Food</option>
          <option>Dessert</option>
        </select>
        <select onChange={e=>setLocation(e.target.value)} className="p-2 rounded border">
          <option value="">All Locations</option>
          <option>Muscat</option>
          <option>Seeb</option>
          <option>Al Khuwair</option>
          <option>Qurum</option>
        </select>
        <select onChange={e=>setSort(e.target.value)} className="p-2 rounded border">
          <option value="rating-desc">Highest Rated</option>
          <option value="rating-asc">Lowest Rated</option>
        </select>
      </div>

      <MapLeaflet posts={filtered} />

      <div className="grid gap-4 mt-6">
        {filtered.map(p => <RestaurantCard key={p.id} post={p} />)}
      </div>
    </div>
  )
}
