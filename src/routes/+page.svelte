<script>
  import { onMount } from "svelte";
  import { pageData, electionDate } from "$lib/config/site";
  let isVisible = false;

  onMount(() => {
    isVisible = true;
  });
</script>

<svelte:head>
  <title>{pageData.title}</title>
  <meta name="description" content={pageData.description} />
</svelte:head>

<!-- Hero Section -->
<section
  class="relative flex h-screen items-center justify-start bg-cover bg-center text-white"
  style="background-image: {pageData.hero.backgroundImage};"
>
  <div class="relative z-10 container text-left">
    <h1
      class="mb-6 text-5xl font-bold md:text-7xl {isVisible
        ? 'opacity-100'
        : 'opacity-0'} transition-opacity duration-1000"
      style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);"
    >
      {pageData.hero.heading}
    </h1>
    <p
      class="mb-8 max-w-2xl text-xl md:text-2xl {isVisible
        ? 'opacity-100'
        : 'opacity-0'} transition-opacity delay-300 duration-1000"
      style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);"
    >
      {pageData.hero.subheading}
    </p>
    <div
      class="flex space-x-4 {isVisible
        ? 'opacity-100'
        : 'opacity-0'} transition-opacity delay-500 duration-1000"
    >
      {#each pageData.hero.buttons as button}
        <a href={button.href} class={button.class}>{button.text}</a>
      {/each}
    </div>
  </div>
</section>

<!-- About Section -->
<section id="about" class="bg-white py-20">
  <div class="container">
    <div class="grid items-center gap-12 md:grid-cols-2">
      <div>
        <h2 class="mb-6 text-4xl font-bold text-[#8B032C]">
          {pageData.about.title}
        </h2>
        <p class="mb-6 text-lg">{pageData.about.content}</p>
        <ul class="space-y-4">
          {#each pageData.about.achievements as achievement}
            <li class="flex items-center">
              <span class="mr-2 text-[#8B032C]">✓</span>
              {achievement}
            </li>
          {/each}
        </ul>
      </div>
      <div class="rounded-lg bg-gray-100 p-8">
        <h3 class="mb-4 text-2xl font-bold text-[#8B032C]">
          {pageData.about.vision.title}
        </h3>
        <p class="mb-6">{pageData.about.vision.content}</p>
        <div class="space-y-4">
          {#each pageData.about.vision.initiatives as initiative}
            <div class="rounded-lg bg-white p-4 shadow">
              <h4 class="font-bold">{initiative.title}</h4>
              <p>{initiative.description}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Goals Section -->
<section id="goals" class="bg-gray-50 py-20">
  <div class="container">
    <h2 class="mb-12 text-center text-4xl font-bold text-[#8B032C]">
      Campaign Goals
    </h2>
    <div class="grid gap-8 md:grid-cols-3">
      {#each pageData.goals as goal}
        <div class="rounded-lg bg-white p-6 shadow-lg">
          <h3 class="mb-4 text-xl font-bold">{goal.title}</h3>
          <p>{goal.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Additional Image Placeholder Section -->
<section class="bg-gray-100 py-20">
  <div class="container text-center">
    <h2 class="mb-8 text-4xl font-bold text-[#8B032C]">
      {pageData.additionalInfo.title}
    </h2>
    <div class="grid gap-8 md:grid-cols-2">
      {#each pageData.additionalInfo.images as image}
        <div class="rounded-lg bg-white p-6 shadow-lg">
          <img
            src={image.src}
            alt={image.alt}
            class="mb-4 h-48 w-full rounded-lg object-cover"
          />
          <p>{image.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Contact Section -->
<section id="contact" class="bg-[#8B032C] py-20 text-white">
  <div class="container text-center">
    <h2 class="mb-8 text-4xl font-bold">{pageData.contact.title}</h2>
    <p class="mb-8 text-xl">{pageData.contact.description}</p>
    <div class="mx-auto max-w-md rounded-lg bg-white p-8 text-gray-900">
      <p class="mb-10 font-bold underline">
        <a
          href="https://deanza.edu/studentvote/"
          target="_blank"
          class="text-[#8B032C] underline"
          >CLICK HERE TO VOTE FOR BALLOT #36 Inky Ganbold for DASG Chair of
          Programs before {electionDate.toLocaleDateString()}</a
        >
      </p>
      <p class="mb-4">
        <strong>Email:</strong>
        <a href="mailto:{pageData.contact.email}" class="text-[#8B032C]"
          >{pageData.contact.email}</a
        >
      </p>
      <p>
        <strong>Phone:</strong>
        <a href="tel:4086474314" class="text-[#8B032C]"
          >{pageData.contact.phone}</a
        >
      </p>
    </div>
  </div>
</section>

<style>
  section {
    scroll-margin-top: 4rem;
  }
</style>
