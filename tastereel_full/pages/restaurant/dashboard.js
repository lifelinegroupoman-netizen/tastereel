import Link from 'next/link'
export default function Dashboard(){
  return (
    <div style={{maxWidth:800, margin:'40px auto', padding:20}}>
      <h1>Restaurant Dashboard (Demo)</h1>
      <p>This is a demo dashboard. Sign-in & subscriptions not configured in this demo package.</p>
      <p><Link href="/"><a>← Back</a></Link></p>
    </div>
  )
}
