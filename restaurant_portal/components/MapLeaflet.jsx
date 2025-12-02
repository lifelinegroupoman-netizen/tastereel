import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function MapLeaflet({ posts }){
  return (
    <div className="h-64 w-full rounded-xl overflow-hidden">
      <MapContainer center={[23.5859,58.4059]} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {posts.map(p => p.lat && (
          <Marker key={p.id} position={[p.lat, p.lng]}>
            <Popup>{p.title || p.restaurant_name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
