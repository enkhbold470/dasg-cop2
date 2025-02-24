<script>
  import SocialLinks from "$lib/components/SocialLinks.svelte";
  import { contactInfo, quickLinks } from "$lib/config/site";
</script>

<footer class="bg-gray-900 py-12 text-white">
  <div class="container mx-auto px-4">
    <div class="mb-8 grid gap-8 md:grid-cols-3">
      <div>
        <h3 class="mb-4 text-xl font-bold">Contact</h3>
        <p class="mb-2">Email: {contactInfo.email}</p>
        <p>Phone: {contactInfo.phone}</p>
      </div>
      <div>
        <h3 class="mb-4 text-xl font-bold">Quick Links</h3>
        <ul class="space-y-2">
          {#each quickLinks as link}
            <li>
              <a
                href={link.href}
                class="hover:text-[#8B032C]"
                target={link.target}>{link.text}</a
              >
            </li>
          {/each}
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
