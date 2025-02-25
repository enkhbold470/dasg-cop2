<script>
  import { onMount } from "svelte";
  import { MessageCircle, X, Send } from "lucide-svelte";
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
  let firstTime = true; // Track if it's the first time the chat is opened

  // Suggested questions
  let suggestedQuestions = [
    "What are Inky's key initiatives?",
    "Tell me about Inky's experience.",
    "How can I vote for Inky?",
  ];

  // Configure marked options
  marked.setOptions({
    breaks: true, // Enable line breaks
    gfm: true, // Enable GitHub Flavored Markdown
  });

  // Scroll to bottom of chat when new messages arrive
  $: if (chatContainer && messages.length) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  async function sendMessage(question = null) {
    let userMessage = question || userInput.trim();

    if (!userMessage || isLoading) return;

    messages = [...messages, { role: "user", content: userMessage }];
    userInput = "";
    isLoading = true;
    currentLoadingStep = 0;
    firstTime = false; // It's no longer the first time after sending a message

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

      // Parse the message as Markdown
      messages = [
        ...messages,
        {
          role: "assistant",
          content: data.message,
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

<div class="chat-container">
  {#if !isOpen}
    <button
      aria-label="Open chat"
      on:click={() => (isOpen = true)}
      class="chat-button"
    >
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span>Ask about Inky</span>
        <MessageCircle class="icon" />
      </div>
    </button>
  {:else}
    <div class="chat-window">
      <div class="chat-header">
        <h3 style="font-weight: 600;">DASG Campaign Assistant</h3>
        <button
          on:click={() => (isOpen = false)}
          aria-label="Close"
          class="close-button"
        >
          <X class="icon" />
        </button>
      </div>

      <div bind:this={chatContainer} class="chat-messages">
        {#if messages.length === 0}
          <div style="text-align: center; color: #6b7280; margin-top: 1rem;">
            <p>👋 Hi! I'm Inky's AI campaign assistant.</p>
            <p style="margin-top: 0.5rem;">
              Ask me anything about the campaign or anything about Inky!
            </p>

            {#if firstTime}
              <div
                style="margin-top: 1rem; display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem;"
              >
                {#each suggestedQuestions as question}
                  <button
                    on:click={() => sendMessage(question)}
                    class="suggested-question"
                  >
                    {question}
                  </button>
                {/each}
              </div>
            {/if}
          </div>
        {/if}

        {#each messages as message}
          <div class={`message ${message.role === "user" ? "user" : ""}`}>
            <div class="message-content prose">
              {#if message.isMarkdown}
                {@html marked.parse(message.content)}
              {:else}
                {message.content}
              {/if}
            </div>
          </div>
        {/each}

        {#if isLoading}
          <div class="message">
            <div class="message-content">
              <div class="loading-dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <span style="color: #6b7280;">
                  {loadingSteps[currentLoadingStep]}
                </span>
              </div>
            </div>
          </div>
        {/if}
      </div>

      <div class="input-area">
        <div class="input-container">
          <textarea
            bind:value={userInput}
            on:keypress={handleKeyPress}
            placeholder="Type your message..."
            class="input-field"
            rows="1"
          ></textarea>
          <button
            on:click={sendMessage}
            disabled={isLoading || !userInput.trim()}
            class="send-button"
          >
            {#if isLoading}
              <span
                style="display: inline-block; animation: spin 1s linear infinite;"
              >
                <Send class="icon" />
              </span>
            {:else}
              <Send class="icon" />
            {/if}
          </button>
        </div>
        <div class="disclaimer">
          <p>
            Disclaimer: Responses may not always be accurate. Please
            double-check any information. For questions, contact <a
              href="mailto:inky@enk.icu">inky@enk.icu</a
            >. We do not store any of your chat, information. Check out our
            <a href="/terms-privacy">terms & privacy</a>.
          </p>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Base styles */
  .chat-button {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 50;
    background-color: #3b82f6;
    color: white;
    padding: 1rem;
    border-radius: 9999px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
    transform: scale(1);
  }

  .chat-button:hover {
    background-color: #2563eb;
    transform: scale(1.1);
  }

  .chat-window {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 50;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 800px;
    min-height: 400px;
    max-height: 600px;
    display: flex;
    flex-direction: column;
  }

  .chat-header {
    padding: 1rem;
    background-color: #3b82f6;
    color: white;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    background-color: #f9fafb;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .message {
    display: flex;
    max-width: 80%;
  }

  .message.user {
    justify-content: flex-end;
    margin-left: auto;
  }

  .message-content {
    padding: 0.75rem;
    border-radius: 0.5rem;
  }

  .message.user .message-content {
    background-color: #3b82f6;
    color: white;
  }

  .message:not(.user) .message-content {
    background-color: white;
    color: #1f2937;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .input-area {
    padding: 1rem;
    background-color: white;
    border-top: 1px solid #e5e7eb;
  }

  .input-container {
    display: flex;
    gap: 0.5rem;
  }

  .input-field {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    resize: none;
  }

  .input-field:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }

  .send-button {
    background-color: #3b82f6;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: background-color 0.2s;
  }

  .send-button:hover:not(:disabled) {
    background-color: #2563eb;
  }

  .send-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .disclaimer {
    margin-top: 0.5rem;
    font-size: 10px;
    color: #6b7280;
  }

  .disclaimer a {
    color: #3b82f6;
    text-decoration: underline;
  }

  /* Markdown content styling */
  .prose {
    max-width: none;
  }

  .prose :global(h1) {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0.5rem 0 1rem;
  }

  .prose :global(h2) {
    font-size: 1.125rem;
    font-weight: bold;
    margin: 0.5rem 0 0.75rem;
  }

  .prose :global(h3) {
    font-size: 1rem;
    font-weight: bold;
    margin: 0.5rem 0;
  }

  .prose :global(p) {
    margin-bottom: 0.5rem;
  }

  .prose :global(ul) {
    list-style-type: disc;
    padding-left: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .prose :global(ol) {
    list-style-type: decimal;
    padding-left: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .prose :global(li) {
    margin-bottom: 0.25rem;
  }

  .prose :global(blockquote) {
    border-left: 4px solid #d1d5db;
    padding-left: 1rem;
    font-style: italic;
    margin: 0.5rem 0;
  }

  .prose :global(a) {
    color: #3b82f6;
    text-decoration: underline;
  }

  .prose :global(a:hover) {
    color: #2563eb;
  }

  .prose :global(strong) {
    font-weight: bold;
  }

  /* Loading animation */
  .loading-dots {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .dot {
    width: 0.5rem;
    height: 0.5rem;
    background-color: #60a5fa;
    border-radius: 50%;
    animation: bounce 0.6s infinite;
  }

  .dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-0.25rem);
    }
  }

  /* Suggested questions */
  .suggested-question {
    background-color: #dbeafe;
    color: #3b82f6;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    transition: background-color 0.2s;
  }

  .suggested-question:hover {
    background-color: #bfdbfe;
  }

  @media (min-width: 768px) {
    .chat-window {
      width: 80%;
      height: 80%;
    }
  }
</style>
