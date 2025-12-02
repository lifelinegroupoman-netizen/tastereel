import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Admin(){
  const [unpublished, setUnpublished] = useState([])

  useEffect(()=>{ load() }, [])
  async function load(){
    const { data } = await supabase.from('posts').select('*').eq('published', false).order('created_at', { ascending: false })
    setUnpublished(data || [])
  }

  async function publish(id){
    await supabase.from('posts').update({ published: true }).eq('id', id)
    load()
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Admin - Review Queue</h1>
      <div className="mt-4 grid gap-3">
        {unpublished.map(p => (
          <div key={p.id} className="p-3 border rounded">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-gray-500">{p.location} • {p.category}</p>
              </div>
              <button onClick={() => publish(p.id)} className="bg-blue-600 text-white px-3 py-1 rounded">Publish</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
