<script lang="ts">
	import { onMount } from 'svelte';

	let isScrolled = false;
	let isMenuOpen = false;
	const scrollThreshold = 20;

	const menuItems = [
		{ href: '/', text: 'Home' },
		{ href: '/#about', text: 'About' },
		{ href: '/#goals', text: 'Goals' },
		{ href: '/platform', text: 'Platform' },
		{ href: '/#contact', text: 'Contact' }
	];

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > scrollThreshold;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<nav
	class="fixed z-50 w-full transition-all duration-300 {isScrolled
		? 'bg-white shadow-lg'
		: 'bg-transparent'}"
>
	<div class="bg-[#8B032C] py-1 text-center text-white">
		<p class="text-sm">Text INKY to (408) 647-4314 for campaign updates!</p>
	</div>
	<div class="container mx-auto px-4">
		<div class="flex h-20 items-center justify-between">
			<a href="/" class="text-2xl font-bold {isScrolled ? 'text-[#8B032C]' : 'text-[#8B032C]'}">
				Inky Ganbold
			</a>

			<!-- Mobile menu button -->
			<button
				class="md:hidden {isScrolled ? 'text-[#8B032C]' : 'text-[#8B032C]'}"
				on:click={() => (isMenuOpen = !isMenuOpen)}
				aria-label="Toggle menu"
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if isMenuOpen}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					{:else}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					{/if}
				</svg>
			</button>

			<!-- Desktop menu -->
			<div class="hidden space-x-8 font-bold md:flex">
				{#each menuItems as { href, text }}
					<a
						{href}
						class="transition-colors hover:text-[#8B032C] {isScrolled
							? 'text-gray-800'
							: 'text-[#ff0000]'}"
					>
						{text}
					</a>
				{/each}
			</div>
		</div>

		<!-- Mobile menu -->
		{#if isMenuOpen}
			<div class="absolute right-0 left-0 mx-4 mt-2 rounded-lg bg-white p-4 shadow-lg md:hidden">
				<div class="flex flex-col space-y-4">
					{#each menuItems as { href, text }}
						<a {href} class="text-gray-800 transition-colors hover:text-[#8B032C]">
							{text}
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</nav>

<style>
	nav {
		backdrop-filter: blur(5px);
	}
</style>
