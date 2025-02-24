<script>
  import { onMount } from "svelte";

  let isOpen = false;
  let messages = [];
  let userInput = "";
  let isLoading = false;
  let chatContainer;

  // Scroll to bottom of chat when new messages arrive
  $: if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  async function sendMessage() {
    if (!userInput.trim() || isLoading) return;

    const userMessage = userInput.trim();
    messages = [...messages, { role: "user", content: userMessage }];
    userInput = "";
    isLoading = true;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      messages = [...messages, { role: "assistant", content: data.message }];
    } catch (error) {
      console.error("Error:", error);
      messages = [
        ...messages,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ];
    } finally {
      isLoading = false;
      // Ensure scroll to bottom after loading new message
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }
</script>

<div class="fixed bottom-4 right-4 z-50">
  {#if !isOpen}
    <button
      on:click={() => (isOpen = true)}
      class="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110"
    >
      ask about Inky
    </button>
  {:else}
    <div class="bg-white rounded-lg shadow-xl w-96 h-[500px] flex flex-col">
      <!-- Header -->
      <div
        class="p-4 bg-blue-500 text-white rounded-t-lg flex justify-between items-center"
      >
        <h3 class="font-semibold">DASG Campaign Assistant</h3>
        <button
          on:click={() => (isOpen = false)}
          class="text-white hover:text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Chat Messages -->
      <div
        bind:this={chatContainer}
        class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        {#if messages.length === 0}
          <div class="text-center text-gray-500 mt-4">
            <p>👋 Hi! I'm Inky's AI campaign assistant.</p>
            <p class="mt-2">
              Ask me anything about the campaign or anything about Inky!
            </p>
          </div>
        {/if}

        {#each messages as message}
          <div
            class={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              class={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 shadow-sm"
              }`}
            >
              {message.content}
            </div>
          </div>
        {/each}

        {#if isLoading}
          <div class="flex justify-start">
            <div class="bg-white rounded-lg p-3 text-gray-800 shadow-sm">
              <div class="flex space-x-2">
                <div
                  class="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                ></div>
                <div
                  class="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style="animation-delay: 0.2s"
                ></div>
                <div
                  class="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style="animation-delay: 0.4s"
                ></div>
              </div>
            </div>
          </div>
        {/if}
      </div>

      <!-- Input Area -->
      <div class="p-4 bg-white border-t">
        <div class="flex space-x-2">
          <textarea
            bind:value={userInput}
            on:keypress={handleKeyPress}
            placeholder="Type your message..."
            class="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="1"
          ></textarea>
          <button
            on:click={sendMessage}
            disabled={isLoading || !userInput.trim()}
            class="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Add any custom styles here */
</style>
