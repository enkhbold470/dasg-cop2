<script>
  import CountdownTimer from "$lib/components/CountdownTimer.svelte";
  import { platformData } from "$lib/config/site";
</script>

<svelte:head>
  <title>{platformData[0].title}</title>
  <meta name="description" content={platformData[0].description} />
</svelte:head>

<section class="bg-gray-50 py-20">
  <div class="container mt-20">
    <div class="mx-auto max-w-4xl">
      <h1 class="mb-8 text-5xl font-bold text-[#8B032C]">
        {platformData[0].title}
      </h1>

      <div class="mb-12">
        <CountdownTimer />
      </div>

      <div class="space-y-12">
        <!-- Vision Section -->
        <div class="rounded-lg bg-white p-8 shadow-lg">
          <h2 class="mb-6 text-3xl font-bold text-[#8B032C]">
            {platformData[1].title}
          </h2>
          <p class="mb-6 text-lg">{platformData[1].vision}</p>
          <ul class="space-y-4 text-lg">
            {#each platformData[2].visionPoints as point}
              <li class="flex items-start">
                <span class="mr-2 text-[#8B032C]">✓</span>
                <span>{point}</span>
              </li>
            {/each}
          </ul>
        </div>

        <!-- Key Initiatives -->
        <div class="rounded-lg bg-white p-8 shadow-lg">
          <h2 class="mb-6 text-3xl font-bold text-[#8B032C]">
            {platformData[2].title}
          </h2>
          <div class="grid gap-8 md:grid-cols-2">
            <div>
              <h3 class="mb-4 text-xl font-bold">
                {platformData[2].studentSuccessTitle}
              </h3>
              <ul class="space-y-3">
                {#each platformData[2].keyInitiatives.studentSuccess as initiative}
                  <li>• {initiative}</li>
                {/each}
              </ul>
            </div>
            <div>
              <h3 class="mb-4 text-xl font-bold">
                {platformData[2].communityBuildingTitle}
              </h3>
              <ul class="space-y-3">
                {#each platformData[2].keyInitiatives.communityBuilding as initiative}
                  <li>• {initiative}</li>
                {/each}
              </ul>
            </div>
          </div>
        </div>

        <!-- Experience -->
        <div class="rounded-lg bg-white p-8 shadow-lg">
          <h2 class="mb-6 text-3xl font-bold text-[#8B032C]">
            {platformData[3].title}
          </h2>
          <p class="mb-6 text-lg">{platformData[3].experience}</p>
          <div class="grid gap-8 md:grid-cols-2">
            <div class="rounded-lg bg-gray-50 p-6">
              <h3 class="mb-4 text-xl font-bold">
                {platformData[3].technicalSkillsTitle}
              </h3>
              <p>{platformData[3].technicalSkills}</p>
            </div>
            <div class="rounded-lg bg-gray-50 p-6">
              <h3 class="mb-4 text-xl font-bold">
                {platformData[3].leadershipTitle}
              </h3>
              <p>{platformData[3].leadership}</p>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div class="rounded-lg bg-white p-8 shadow-lg">
          <h2 class="mb-6 text-3xl font-bold text-[#8B032C]">
            {platformData[4].title}
          </h2>
          <p class="mb-6 text-lg">{platformData[4].education}</p>
          <ul class="space-y-4 text-lg">
            {#each platformData[4].academicAchievements as achievement}
              <li class="flex items-start">
                <span class="mr-2 text-[#8B032C]">✓</span>
                <span>{achievement}</span>
              </li>
            {/each}
          </ul>
        </div>

        <!-- Community Involvement -->
        <div class="rounded-lg bg-white p-8 shadow-lg">
          <h2 class="mb-6 text-3xl font-bold text-[#8B032C]">
            {platformData[5].title}
          </h2>
          <p class="mb-6 text-lg">{platformData[5].communityInvolvement}</p>
          <ul class="space-y-4 text-lg">
            {#each platformData[5].communityAchievements as achievement}
              <li class="flex items-start">
                <span class="mr-2 text-[#8B032C]">✓</span>
                <span>{achievement}</span>
              </li>
            {/each}
          </ul>
        </div>

        <div class="rounded-lg bg-white p-8 shadow-lg">
          <h2 class="mb-6 text-3xl font-bold text-[#8B032C]">Read More</h2>
          <a
            href={platformData[0].readMore}
            class="mb-6 text-lg text-[#8B032C] underline"
          >
            {platformData[0].readMore}
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  section {
    scroll-margin-top: 4rem;
  }
</style>
