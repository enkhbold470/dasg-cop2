<script>
  import { onMount } from "svelte";
  import { Sparkles, X, Send } from "lucide-svelte";
  import { marked } from "marked";

  let isOpen = false;
  let messages = [];
  let userInput = "";
  let isLoading = false;
  let chatContainer;
  let loadingSteps = [
    "Thinking...",
    "Checking my memory...",
    "Critical thinking...",
    "Analyzing...",
    "Reasoning...",
    "Generating response...",
    "Almost done...",
    "Right there...",
    "Just a moment...",
    "Hold on tight...",
  ];
  let currentLoadingStep = 0;

  // Configure marked options
  marked.setOptions({
    breaks: true, // Enable line breaks
    gfm: true, // Enable GitHub Flavored Markdown
  });

  // Scroll to bottom of chat when new messages arrive
  $: if (chatContainer && messages.length) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  async function sendMessage() {
    if (!userInput.trim() || isLoading) return;

    const userMessage = userInput.trim();
    messages = [...messages, { role: "user", content: userMessage }];
    userInput = "";
    isLoading = true;
    currentLoadingStep = 0;

    // Ensure scroll to bottom when AI is thinking
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Simulate loading steps
    const loadingInterval = setInterval(() => {
      currentLoadingStep = (currentLoadingStep + 1) % loadingSteps.length;
    }, 1000);

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

      // Parse the message as Markdown using Tailwind CSS Typography
      const parsedMessage = marked(data.message);
      messages = [
        ...messages,
        {
          role: "assistant",
          content: parsedMessage,
          isMarkdown: true,
        },
      ];
    } catch (error) {
      console.error("Error:", error);
      messages = [
        ...messages,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          isMarkdown: false,
        },
      ];
    } finally {
      clearInterval(loadingInterval);
      isLoading = false;
      currentLoadingStep = 0;
      // Ensure scroll to bottom after loading new message
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
      // Additional scroll to bottom after response is displayed
      setTimeout(() => {
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 0);
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
      aria-label="Open chat"
      on:click={() => (isOpen = true)}
      class="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110"
    >
      <!-- ask about Inky -->
      <div class="flex items-center gap-2">
        <Sparkles class="h-6 w-6" />
      </div>
    </button>
  {:else}
    <div
      class="bg-white rounded-lg shadow-xl w-full max-w-[800px] min-h-[600px] max-h-[700px] flex flex-col md:w-[80%] md:h-[80%]"
    >
      <!-- Header -->
      <div
        class="p-4 bg-blue-500 text-white rounded-t-lg flex justify-between items-center"
      >
        <h3 class="font-semibold">DASG Campaign Assistant</h3>
        <button
          on:click={() => (isOpen = false)}
          aria-label="Close"
          class="text-white hover:text-gray-200"
        >
          <X class="h-6 w-6" />
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
              } prose`}
            >
              {#if message.isMarkdown}
                {@html message.content}
              {:else}
                {message.content}
              {/if}
            </div>
          </div>
        {/each}

        {#if isLoading}
          <div class="flex justify-start">
            <div class="bg-white rounded-lg p-3 text-gray-800 shadow-sm">
              <div class="flex space-x-2 items-center">
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
                <div class="text-gray-500">
                  {loadingSteps[currentLoadingStep]}
                </div>
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
            {#if isLoading}
              <span class="animate-spin">
                <Send class="h-6 w-6" />
              </span>
            {:else}
              <Send class="h-6 w-6" />
            {/if}
          </button>
        </div>
        <div class="mt-2 text-[10px] text-gray-500">
          <p>
            Disclaimer: Responses may not always be accurate. Please
            double-check any information. For questions, contact <a
              href="mailto:inky@enk.icu"
              class="text-blue-500">inky@enk.icu</a
            >. We do not store any of your chat, information, or cookies. Check
            out our
            <a href="/terms-privacy" class="text-blue-500">terms & privacy</a>.
          </p>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Markdown content styling */
  :global(.prose) {
    @apply max-w-none;
  }
  @media (max-width: 768px) {
    .chat-container {
      width: 100%;
      height: 100%;
    }
  }
</style>
