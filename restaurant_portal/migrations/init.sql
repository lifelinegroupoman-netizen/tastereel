-- restaurants
create table restaurants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_user_id uuid,
  location text,
  category text,
  promo_text text,
  lat float,
  lng float,
  created_at timestamptz default now()
);

-- posts
create table posts (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references restaurants(id),
  owner_user_id uuid,
  title text,
  text text,
  video_url text,
  video_provider text,
  rating numeric,
  category text,
  location text,
  lat float,
  lng float,
  published boolean default false,
  created_at timestamptz default now()
);

-- subscriptions
create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  stripe_customer_id text,
  stripe_sub_id text,
  status text,
  current_period_end timestamptz
);

-- reviews
create table reviews (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id),
  user_id uuid,
  text text,
  rating int,
  created_at timestamptz default now()
);
