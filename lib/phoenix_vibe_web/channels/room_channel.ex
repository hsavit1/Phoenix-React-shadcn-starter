defmodule PhoenixVibeWeb.RoomChannel do
  use PhoenixVibeWeb, :channel

  @impl true
  def join("room:lobby", payload, socket) do
    if authorized?(payload) do
      # Track user presence
      send(self(), :after_join)
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  @impl true
  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  @impl true
  def handle_info(:after_join, socket) do
    # Track presence when user joins
    {:ok, _} = PhoenixVibeWeb.Presence.track(socket, socket.assigns.user_id, %{
      online_at: inspect(System.system_time(:second)),
      username: socket.assigns.username
    })

    # Send current presence list to the user
    push(socket, "presence_state", PhoenixVibeWeb.Presence.list(socket))
    {:noreply, socket}
  end

  # Handle real-time counter updates
  @impl true
  def handle_in("counter_update", %{"count" => count}, socket) do
    broadcast(socket, "counter_update", %{count: count, user: socket.assigns.username})
    {:noreply, socket}
  end

  # Handle chat messages
  @impl true
  def handle_in("new_message", %{"message" => message}, socket) do
    broadcast(socket, "new_message", %{
      message: message,
      user: socket.assigns.username,
      timestamp: System.system_time(:second)
    })
    {:noreply, socket}
  end

  # Handle typing indicators
  @impl true
  def handle_in("typing_start", _payload, socket) do
    broadcast_from(socket, "typing_start", %{user: socket.assigns.username})
    {:noreply, socket}
  end

  @impl true
  def handle_in("typing_stop", _payload, socket) do
    broadcast_from(socket, "typing_stop", %{user: socket.assigns.username})
    {:noreply, socket}
  end

  # Handle user reactions
  @impl true
  def handle_in("reaction", %{"type" => type}, socket) do
    broadcast(socket, "reaction", %{
      type: type,
      user: socket.assigns.username,
      timestamp: System.system_time(:second)
    })
    {:noreply, socket}
  end

  # Add authorization logic here
  defp authorized?(_payload) do
    true
  end
end
