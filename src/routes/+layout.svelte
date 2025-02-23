<script>
  import "../app.css";
  import Nav from "$lib/components/Nav.svelte";
  import SocialLinks from "$lib/components/SocialLinks.svelte";
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

<footer class="bg-gray-900 py-12 text-white">
  <div class="container mx-auto px-4">
    <div class="mb-8 grid gap-8 md:grid-cols-3">
      <div>
        <h3 class="mb-4 text-xl font-bold">Contact</h3>
        <p class="mb-2">Email: ganboldinky@student.deanza.edu</p>
        <p>Phone: (408) 647-4314</p>
      </div>
      <div>
        <h3 class="mb-4 text-xl font-bold">Quick Links</h3>
        <ul class="space-y-2">
          <li><a href="/platform" class="hover:text-[#8B032C]">Platform</a></li>
          <li>
            <a
              href="https://enk.icu/blog"
              target="_blank"
              class="hover:text-[#8B032C]">Blog</a
            >
          </li>
          <li>
            <a href="/privacy" class="hover:text-[#8B032C]">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms" class="hover:text-[#8B032C]">Terms & Conditions</a>
          </li>
          <li>
            <a href="/poster" class="hover:text-[#8B032C]">Campaign Poster</a>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="mb-4 text-xl font-bold">Follow Me</h3>
        <SocialLinks />
      </div>
    </div>

    <div class="border-t border-gray-800 pt-8 text-center text-sm">
      <p class="mb-4">
        &copy; {new Date().getFullYear()} Inky Ganbold for DASG Chair of Programs.
        All rights reserved.
      </p>
      <p class="text-gray-400">
        Paid for by DASG Campaign Fund. Not authorized by any candidate or
        candidate's committee.
      </p>
    </div>
  </div>
</footer>

<style>
  main {
    min-height: 100vh;
  }
</style>
