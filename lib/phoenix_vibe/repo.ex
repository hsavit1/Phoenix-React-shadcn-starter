defmodule PhoenixVibe.Repo do
  use Ecto.Repo,
    otp_app: :phoenix_vibe,
    adapter: Ecto.Adapters.Postgres
end
