<script>
  import "../app.css";
  import Nav from "$lib/components/Nav.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import ChatBot from "$lib/components/ChatBot.svelte";
  //   import { injectAnalytics } from "@vercel/analytics/sveltekit";

  // Call injectAnalytics to set up analytics tracking
  //   injectAnalytics();
</script>

<!-- Add Open Graph meta tags -->
<svelte:head>
  <!-- HTML Meta Tags -->
  <title>DASG Chair of Programs | De Anza College</title>
  <meta
    name="description"
    content="Vote Inky Ganbold for DASG Chair of Programs - Building a better future for De Anza College students"
  />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content="https://cop.enk.icu" />
  <meta property="og:type" content="website" />
  <meta
    property="og:title"
    content="DASG Chair of Programs | De Anza College"
  />
  <meta
    property="og:description"
    content="Vote Inky Ganbold for DASG Chair of Programs - Building a better future for De Anza College students"
  />
  <meta
    property="og:image"
    content="https://raw.githubusercontent.com/enkhbold470/enkhbold470/refs/heads/main/clean.jpg"
  />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="cop.enk.icu" />
  <meta property="twitter:url" content="https://cop.enk.icu" />
  <meta
    name="twitter:title"
    content="DASG Chair of Programs | De Anza College"
  />
  <meta
    name="twitter:description"
    content="Vote Inky Ganbold for DASG Chair of Programs - Building a better future for De Anza College students"
  />
  <meta
    name="twitter:image"
    content="https://raw.githubusercontent.com/enkhbold470/enkhbold470/refs/heads/main/clean.jpg"
  />

  <!-- Meta Tags Generated via https://www.opengraph.xyz -->
</svelte:head>

<Nav />
<!-- Start of Selection -->
<main>
  <slot />
</main>
<!-- End of Selection -->

<Footer />

<ChatBot />

<style>
  main {
    min-height: 100vh;
  }
</style>
