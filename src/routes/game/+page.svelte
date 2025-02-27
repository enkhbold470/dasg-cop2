<script>
  import { onMount } from "svelte";

  let gameActive = false;
  let gameStarted = false;
  let gameResult = null;
  let startTime;
  let timerDisplay = "";
  let instruction = "Click 'Start Game' to begin";
  let countdownTimer;
  let buttonColor = "red";
  let showButton = false;
  let resultHistory = [];
  let averageTime = 0;
  let gameAudio;

  // Fortune cookie phrases for encouragement
  const fortuneCookies = [
    "You're on fire today, keep it up!",
    "Wow, your reaction time is amazing!",
    "You're a click legend!",
    "You're a natural at this!",
    "You're a click legend!",
    "You're a click legend!",
    "You're a click legend!",
    "You're a master at this game",
  ];

  // Start the game when the user clicks the start button
  function startGame() {
    if (!gameAudio) {
      gameAudio = new Audio("/mingle_squid_game.mp3");
      gameAudio.loop = true; // Loop the audio
      gameAudio.play();
    }

    gameStarted = true;
    gameResult = null;
    instruction = "Wait for GREEN...";
    buttonColor = "red";
    showButton = true;

    // Random delay between 2-6 seconds before turning green
    const randomDelay = Math.floor(Math.random() * 4000) + 2000;

    countdownTimer = setTimeout(() => {
      if (gameStarted) {
        buttonColor = "green";
        instruction = "CLICK NOW!";
        startTime = new Date().getTime();
        gameActive = true;
      }
    }, randomDelay);
  }

  // Handle user click on the game button
  function handleClick() {
    if (!gameActive && gameStarted) {
      clearTimeout(countdownTimer);
      gameStarted = false;
      gameResult = {
        success: false,
        message: "Too early! You clicked on RED!",
      };
      showButton = false;
    } else if (gameActive) {
      const endTime = new Date().getTime();
      const reactionTime = endTime - startTime;

      gameActive = false;
      gameStarted = false;

      const randomFortune =
        fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)];

      gameResult = {
        success: true,
        time: reactionTime,
        message: `Great job! Your reaction time: ${reactionTime} ms. ${randomFortune}`,
      };

      // Save result to history
      resultHistory = [...resultHistory, reactionTime];

      // Calculate average
      const sum = resultHistory.reduce((acc, time) => acc + time, 0);
      averageTime = Math.round(sum / resultHistory.length);

      showButton = false;
    }
  }

  // Reset game state
  function resetGame() {
    gameActive = false;
    gameStarted = false;
    gameResult = null;
    instruction = "Click 'Start Game' to begin";
    showButton = false;
    if (countdownTimer) clearTimeout(countdownTimer);
  }

  // Clear history
  function clearHistory() {
    resultHistory = [];
    averageTime = 0;
  }

  // Clean up timers when component is destroyed
  onMount(() => {
    return () => {
      if (countdownTimer) clearTimeout(countdownTimer);
      if (gameAudio) {
        gameAudio.pause();
        gameAudio.currentTime = 0;
      }
    };
  });
</script>

<svelte:head>
  <title>Reaction Test Game</title>
</svelte:head>

<div class="container">
  <h1>Reaction Test Challenge</h1>

  <div class="game-description">
    <p>Test your reflexes with this simple game:</p>
    <ol>
      <li>Click "Start Game" to begin</li>
      <li>Wait for the RED button to turn GREEN</li>
      <li>When it turns GREEN, click as fast as you can!</li>
      <li>If you click too early (while RED), you lose</li>
    </ol>
  </div>

  <div class="game-area">
    <h2>{instruction}</h2>

    {#if showButton}
      <button
        class="game-button"
        style="background-color: {buttonColor};"
        on:click={handleClick}
      >
        {buttonColor === "red" ? "WAIT" : "CLICK!"}
      </button>
    {/if}

    {#if gameResult}
      <div class="result {gameResult.success ? 'success' : 'failure'}">
        <h3>{gameResult.message}</h3>
        {#if gameResult.success}
          <p>Want to try again and beat your time?</p>
        {:else}
          <p>Don't click until GREEN appears!</p>
        {/if}
      </div>
    {/if}

    <div class="controls">
      {#if !gameStarted}
        <button class="control-button" on:click={startGame}>Start Game</button>
      {:else}
        <button class="control-button" on:click={resetGame}>Cancel</button>
      {/if}
    </div>
  </div>

  {#if resultHistory.length > 0}
    <div class="stats">
      <h3>Your Results</h3>
      <p><strong>Average reaction time:</strong> {averageTime} ms</p>
      <p><strong>Number of attempts:</strong> {resultHistory.length}</p>
      <p><strong>Best time:</strong> {Math.min(...resultHistory)} ms</p>

      <div class="history">
        <h4>History:</h4>
        <ul>
          {#each resultHistory as time, i}
            <li>Attempt {i + 1}: {time} ms</li>
          {/each}
        </ul>
        <button class="control-button small" on:click={clearHistory}
          >Clear History</button
        >
      </div>
    </div>
  {/if}
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: "Arial", sans-serif;
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
  }

  .game-description {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 30px;
  }

  .game-description ol {
    margin-left: 20px;
  }

  .game-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  }

  .game-button {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    border: none;
    color: white;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.1s;
    margin: 20px 0;
  }

  .result {
    text-align: center;
    padding: 15px;
    border-radius: 8px;
    margin: 20px 0;
    width: 100%;
  }

  .success {
    background-color: #d4edda;
    color: #155724;
  }

  .failure {
    background-color: #f8d7da;
    color: #721c24;
  }

  .controls {
    margin: 20px 0;
  }

  .control-button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
  }

  .control-button.small {
    font-size: 14px;
    padding: 5px 10px;
  }

  .stats {
    background-color: #e9ecef;
    padding: 15px;
    border-radius: 8px;
  }

  .history {
    margin-top: 15px;
    max-height: 200px;
    overflow-y: auto;
  }

  .history ul {
    list-style-type: none;
    padding-left: 0;
  }

  .history li {
    padding: 5px 0;
    border-bottom: 1px solid #ccc;
  }
</style>
