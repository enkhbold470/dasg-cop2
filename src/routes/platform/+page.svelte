<script>
	import CountdownTimer from '$lib/components/CountdownTimer.svelte';
</script>

<svelte:head>
	<title>Platform | Inky Ganbold for DASG Chair of Programs</title>
	<meta
		name="description"
		content="Learn about Inky Ganbold's platform and vision for De Anza College's DASG leadership."
	/>
</svelte:head>

<!-- <div class="bg-[#8B032C] text-white py-4 text-center">
  <p class="text-lg">Text INKY to (408) 647-4314 for campaign updates!</p>
</div> -->

<section class="bg-gray-50 py-20">
	<div class="container mt-20">
		<div class="mx-auto max-w-4xl">
			<h1 class="mb-8 text-5xl font-bold text-[#8B032C]">My Platform</h1>

			<div class="mb-12">
				<CountdownTimer />
			</div>

			<div class="space-y-12">
				<!-- Vision Section -->
				<div class="rounded-lg bg-white p-8 shadow-lg">
					<h2 class="mb-6 text-3xl font-bold text-[#8B032C]">Vision for De Anza</h2>
					<p class="mb-6 text-lg">
						As your DASG Chair of Programs, I am committed to enhancing the student experience at De
						Anza College through innovative programs and initiatives that foster growth, community,
						and success.
					</p>
					<ul class="space-y-4 text-lg">
						<li class="flex items-start">
							<span class="mr-2 text-[#8B032C]">✓</span>
							<span
								>Create more opportunities for student engagement and leadership development</span
							>
						</li>
						<li class="flex items-start">
							<span class="mr-2 text-[#8B032C]">✓</span>
							<span>Organize hackathons and tech events to promote innovation</span>
						</li>
						<li class="flex items-start">
							<span class="mr-2 text-[#8B032C]">✓</span>
							<span>Build stronger connections between students and industry professionals</span>
						</li>
					</ul>
				</div>

				<!-- Key Initiatives -->
				<div class="rounded-lg bg-white p-8 shadow-lg">
					<h2 class="mb-6 text-3xl font-bold text-[#8B032C]">Key Initiatives</h2>
					<div class="grid gap-8 md:grid-cols-2">
						<div>
							<h3 class="mb-4 text-xl font-bold">Student Success Programs</h3>
							<ul class="space-y-3">
								<li>• Mentorship opportunities</li>
								<li>• Career development workshops</li>
								<li>• Leadership training sessions</li>
							</ul>
						</div>
						<div>
							<h3 class="mb-4 text-xl font-bold">Community Building</h3>
							<ul class="space-y-3">
								<li>• Cross-cultural events</li>
								<li>• Student organization collaborations</li>
								<li>• Campus-wide networking events</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Experience -->
				<div class="rounded-lg bg-white p-8 shadow-lg">
					<h2 class="mb-6 text-3xl font-bold text-[#8B032C]">My Experience</h2>
					<p class="mb-6 text-lg">
						With experience from 22 hackathons at top universities across the US, I bring a unique
						perspective on how to create engaging and meaningful programs for our student body.
					</p>
					<div class="grid gap-8 md:grid-cols-2">
						<div class="rounded-lg bg-gray-50 p-6">
							<h3 class="mb-4 text-xl font-bold">Technical Skills</h3>
							<p>
								Computer Science & Engineering background with hands-on experience in organizing
								tech events and workshops.
							</p>
						</div>
						<div class="rounded-lg bg-gray-50 p-6">
							<h3 class="mb-4 text-xl font-bold">Leadership</h3>
							<p>
								Proven track record of bringing innovative ideas and organizing successful student
								programs.
							</p>
						</div>
					</div>
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
