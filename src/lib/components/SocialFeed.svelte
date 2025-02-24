<script>
  import { onMount } from "svelte";

  import { instagramPosts, twitterPosts } from "$lib/config/site";

  onMount(() => {
    // Load Instagram embed script
    const instagram = document.createElement("script");
    instagram.src = "//www.instagram.com/embed.js";
    instagram.async = true;
    document.body.appendChild(instagram);

    // Load Twitter embed script
    const twitter = document.createElement("script");
    twitter.src = "https://platform.twitter.com/widgets.js";
    twitter.async = true;
    document.body.appendChild(twitter);

    return () => {
      document.body.removeChild(instagram);
      document.body.removeChild(twitter);
    };
  });
</script>

<div class="grid gap-8 md:grid-cols-2">
  <div>
    <h3 class="mb-6 text-2xl font-bold text-[#8B032C]">Instagram Updates</h3>
    <div class="space-y-4">
      {#each instagramPosts as post}
        <blockquote
          class="instagram-media"
          data-instgrm-permalink={post}
          data-instgrm-version="14"
          aria-label="Instagram post link"
        ></blockquote>
      {/each}
    </div>
  </div>

  <div>
    <h3 class="mb-6 text-2xl font-bold text-[#8B032C]">Twitter Updates</h3>
    <div class="space-y-4">
      {#each twitterPosts as post}
        <blockquote class="twitter-tweet" aria-label="Twitter post link">
          <a href={post} aria-label="Link to Twitter post"></a>
        </blockquote>
      {/each}
    </div>
  </div>
</div>

<div class="grid gap-8 md:grid-cols-2">
  <div>
    <h3 class="mb-6 text-2xl font-bold text-[#8B032C]">Instagram Updates</h3>
    <div class="space-y-4">
      {#each instagramPosts as post}
        <blockquote
          class="instagram-media"
          data-instgrm-permalink={post}
          data-instgrm-version="14"
        ></blockquote>
      {/each}
    </div>
  </div>

  <div>
    <h3 class="mb-6 text-2xl font-bold text-[#8B032C]">Twitter Updates</h3>
    <div class="space-y-4">
      {#each twitterPosts as post}
        <blockquote class="twitter-tweet">
          <a href={post} aria-label="Link to Twitter post"></a>
        </blockquote>
      {/each}
    </div>
  </div>
</div>

<style>
  :global(.instagram-media) {
    max-width: 100% !important;
    min-width: 100% !important;
    margin: 0 !important;
  }

  :global(.twitter-tweet) {
    margin: 0 !important;
  }
</style>
