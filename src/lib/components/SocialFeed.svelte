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

<div class="social-gallery">
  <h3 class="mb-6 text-2xl font-bold text-[#8B032C]">Instagram Updates</h3>
  <div class="instagram-grid">
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

<style>
  .social-gallery {
    overflow: hidden;
    position: relative;
  }

  .instagram-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(300px, 1fr)
    ); /* Responsive columns */
    gap: 20px;
  }

  :global(.instagram-media) {
    max-width: 100% !important;
    min-width: 100% !important;
    margin: 0 !important;
    display: block; /* Ensure block display for proper width */
  }
</style>
