<script>
  import { onMount } from "svelte";

  let isVisible = false;

  onMount(() => {
    isVisible = true;
  });
</script>

<svelte:head>
  <title>Inky Ganbold for DASG Leadership | De Anza College</title>
  <meta
    name="description"
    content="Vote Inky Ganbold for DASG Leadership - Building a better future for De Anza College students"
  />
</svelte:head>

<!-- Hero Section -->
<section
  class="relative flex h-screen items-center justify-start bg-cover bg-center text-white"
  style="background-image: url('https://raw.githubusercontent.com/enkhbold470/enkhbold470/refs/heads/main/clean.jpg');"
>
  <!-- <div class="absolute inset-0 backdrop-blur-[0px] backdrop-filter"></div> -->
  <div class="relative z-10 container text-left">
    <h1
      class="mb-6 text-5xl font-bold md:text-7xl {isVisible
        ? 'opacity-100'
        : 'opacity-0'} transition-opacity duration-1000"
      style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);"
    >
      Leadership for Change
    </h1>
    <p
      class="mb-8 max-w-2xl text-xl md:text-2xl {isVisible
        ? 'opacity-100'
        : 'opacity-0'} transition-opacity delay-300 duration-1000"
      style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);"
    >
      Vote Inky Ganbold for DASG Chair of Programs
    </p>
    <div
      class="flex space-x-4 {isVisible
        ? 'opacity-100'
        : 'opacity-0'} transition-opacity delay-500 duration-1000"
    >
      <a
        href="#about"
        class="btn-secondary bg-white text-[#8B032C] hover:bg-gray-100"
        >Learn More</a
      >
      <a
        href="#contact"
        class="btn-primary border-2 bg-transparent hover:bg-white hover:text-[#8B032C]"
        >Get Involved</a
      >
    </div>
  </div>
</section>

<!-- About Section -->
<section id="about" class="bg-white py-20">
  <div class="container">
    <div class="grid items-center gap-12 md:grid-cols-2">
      <div>
        <h2 class="mb-6 text-4xl font-bold text-[#8B032C]">About Me</h2>
        <p class="mb-6 text-lg">
          Hello! I'm Inky Ganbold, a Computer Science and Engineering student
          from Ulaanbaatar, Mongolia. As a full-time student of the De Anza
          college since Spring 2023, I bring unique perspectives and experiences
          to serve our diverse student body.
        </p>
        <ul class="space-y-4">
          <li class="flex items-center">
            <span class="mr-2 text-[#8B032C]">✓</span>
            Experience from 22 hackathons at top universities
          </li>
          <li class="flex items-center">
            <span class="mr-2 text-[#8B032C]">✓</span>
            Passionate about technology and innovation
          </li>
          <li class="flex items-center">
            <span class="mr-2 text-[#8B032C]">✓</span>
            Committed to building a stronger De Anza community
          </li>
        </ul>
      </div>
      <div class="rounded-lg bg-gray-100 p-8">
        <h3 class="mb-4 text-2xl font-bold text-[#8B032C]">My Vision</h3>
        <p class="mb-6">
          I see tremendous potential to bring innovative opportunities to De
          Anza College. My goal is to enhance our college experience and better
          prepare students for their future endeavors.
        </p>
        <div class="space-y-4">
          <div class="rounded-lg bg-white p-4 shadow">
            <h4 class="font-bold">Build Friendships</h4>
            <p>Creating a more connected campus community</p>
          </div>
          <div class="rounded-lg bg-white p-4 shadow">
            <h4 class="font-bold">Enhance Events</h4>
            <p>Organizing engaging activities and networking opportunities</p>
          </div>
          <div class="rounded-lg bg-white p-4 shadow">
            <h4 class="font-bold">Develop Skills</h4>
            <p>Implementing programs for personal and professional growth</p>
          </div>
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
      <div class="rounded-lg bg-white p-6 shadow-lg">
        <h3 class="mb-4 text-xl font-bold">Leadership Development</h3>
        <p>
          Fostering leadership skills through hands-on experience and mentorship
          opportunities.
        </p>
      </div>
      <div class="rounded-lg bg-white p-6 shadow-lg">
        <h3 class="mb-4 text-xl font-bold">Student Success</h3>
        <p>
          Creating resources and programs to help students achieve their
          academic and career goals.
        </p>
      </div>
      <div class="rounded-lg bg-white p-6 shadow-lg">
        <h3 class="mb-4 text-xl font-bold">Campus Unity</h3>
        <p>
          Building a more inclusive and connected campus community through
          events and initiatives.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Additional Image Placeholder Section -->
<section class="bg-gray-100 py-20">
  <div class="container text-center">
    <h2 class="mb-8 text-4xl font-bold text-[#8B032C]">
      More About My Campaign
    </h2>
    <div class="grid gap-8 md:grid-cols-2">
      <div class="rounded-lg bg-white p-6 shadow-lg">
        <img
          src="https://raw.githubusercontent.com/enkhbold470/enkhbold470/refs/heads/main/harvard.JPG"
          alt="Campaign initiatives and events"
          class="mb-4 h-48 w-full rounded-lg object-cover"
        />
        <p>Details about the campaign initiatives and events.</p>
      </div>
      <div class="rounded-lg bg-white p-6 shadow-lg">
        <img
          src="https://raw.githubusercontent.com/enkhbold470/enkhbold470/refs/heads/main/dubai.JPG"
          alt="Campaign involvement opportunities"
          class="mb-4 h-48 w-full rounded-lg object-cover"
        />
        <p>Information on how to get involved and support the campaign.</p>
      </div>
    </div>
  </div>
</section>

<!-- Contact Section -->
<section id="contact" class="bg-[#8B032C] py-20 text-white">
  <div class="container text-center">
    <h2 class="mb-8 text-4xl font-bold">Get Involved</h2>
    <p class="mb-8 text-xl">
      Join our campaign and help make a difference at De Anza College
    </p>
    <div class="mx-auto max-w-md rounded-lg bg-white p-8 text-gray-900">
      <p class="mb-4">
        <strong>Email:</strong>
        <a href="mailto:ganboldinky@student.deanza.edu" class="text-[#8B032C]"
          >ganboldinky@student.deanza.edu</a
        >
      </p>
      <p>
        <strong>Phone:</strong>
        <a href="tel:4086474314" class="text-[#8B032C]">(408) 647-4314</a>
      </p>
    </div>
  </div>
</section>

<style>
  section {
    scroll-margin-top: 4rem;
  }
</style>
