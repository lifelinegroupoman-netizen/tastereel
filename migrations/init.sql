-- Supabase schema for TasteReel (minimal)
create table if not exists restaurants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text,
  category text,
  owner_user_id uuid,
  promo_text text,
  created_at timestamptz default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references restaurants(id),
  title text,
  text text,
  video_url text,
  category text,
  location text,
  rating numeric,
  published boolean default false,
  created_at timestamptz default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  stripe_customer_id text,
  stripe_sub_id text,
  status text,
  current_period_end timestamptz
);
