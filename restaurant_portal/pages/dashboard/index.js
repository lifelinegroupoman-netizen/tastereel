import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Dashboard({ supabaseSession }){
  const [posts, setPosts] = useState([])
  useEffect(()=>{ if (supabaseSession) load() }, [supabaseSession])
  async function load(){
    const userId = supabaseSession?.user?.id
    const { data } = await supabase.from('posts').select('*').eq('owner_user_id', userId).order('created_at', { ascending: false })
    setPosts(data || [])
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Your Dashboard</h1>
      <p className="text-sm text-gray-500">Manage posts, promotions, subscription, and analytics.</p>
      <div className="mt-4 grid gap-3">
        {posts.map(p => (
          <div key={p.id} className="p-3 border rounded">{p.title}</div>
        ))}
      </div>
    </div>
  )
}
