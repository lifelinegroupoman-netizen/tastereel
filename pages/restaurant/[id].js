import { useRouter } from 'next/router'
export default function RestaurantProfile(){
  const router = useRouter()
  const { id } = router.query
  return (
    <div style={{maxWidth:800, margin:'40px auto', padding:20}}>
      <h1>Restaurant {id}</h1>
      <p>Profile page (static demo).</p>
    </div>
  )
}
