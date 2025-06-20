defmodule PhoenixVibe.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      PhoenixVibeWeb.Telemetry,
      PhoenixVibe.Repo,
      {DNSCluster, query: Application.get_env(:phoenix_vibe, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: PhoenixVibe.PubSub},
      # Start the Presence system
      PhoenixVibeWeb.Presence,
      # Start the Finch HTTP client for sending emails
      {Finch, name: PhoenixVibe.Finch},
      # Start a worker by calling: PhoenixVibe.Worker.start_link(arg)
      # {PhoenixVibe.Worker, arg},
      # Start to serve requests, typically the last entry
      PhoenixVibeWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: PhoenixVibe.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    PhoenixVibeWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
