<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { electionDate } from "$lib/config/site";
  // Set election date (you'll need to update this)
  // const electionDate = new Date('2025-03-07T00:00:00'); // Update with actual election date

  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let interval: ReturnType<typeof setInterval> | null = null;

  function updateCountdown() {
    const now = new Date();
    const difference = electionDate.getTime() - now.getTime();

    days = Math.floor(difference / (1000 * 60 * 60 * 24));
    hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((difference % (1000 * 60)) / 1000);
  }

  onMount(() => {
    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

<div class="rounded-lg bg-white/90 p-6 text-center shadow-lg backdrop-blur-sm">
  <h3 class="mb-4 text-2xl font-bold text-[#8B032C]">
    Vote for ballot #36 Inky Ganbold for DASG Chair of Programs before
    {electionDate.toLocaleDateString()}
  </h3>
  <div class="grid grid-cols-4 gap-4">
    <div class="rounded-lg bg-[#8B032C] p-3 text-white">
      <div class="text-3xl font-bold">{days}</div>
      <div class="text-sm">Days</div>
    </div>
    <div class="rounded-lg bg-[#8B032C] p-3 text-white">
      <div class="text-3xl font-bold">{hours}</div>
      <div class="text-sm">Hours</div>
    </div>
    <div class="rounded-lg bg-[#8B032C] p-3 text-white">
      <div class="text-3xl font-bold">{minutes}</div>
      <div class="text-sm">Minutes</div>
    </div>
    <div class="rounded-lg bg-[#8B032C] p-3 text-white">
      <div class="text-3xl font-bold">{seconds}</div>
      <div class="text-sm">Seconds</div>
    </div>
  </div>
</div>
