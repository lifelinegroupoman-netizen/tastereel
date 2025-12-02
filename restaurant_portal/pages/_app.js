import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null)

  useEffect(() => {
    let mounted = true
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setSession(data.session)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  return <Component {...pageProps} supabaseSession={session} />
}

export default MyApp
