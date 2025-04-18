<script lang="ts">
	import { Button } from '@/components/ui/button';
	import { auth } from '@/stores/auth';
</script>

<header class="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/60 backdrop-blur-md">
	<div class="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
		<a
			href="/"
			class="oswald flex items-center justify-start text-lg font-bold tracking-tight text-foreground"
		>
			<h1 class="lora text-3xl italic">Im</h1>
			<p class="oswald text-2xl">Galaxy</p>
			<span class="ml-1 h-3 w-3 translate-y-1.5 rounded-full bg-white"></span>
		</a>

		<nav class="lora hidden items-center gap-6 text-sm italic md:flex">
			<a href="/new" class="text-muted-foreground transition hover:text-foreground"> New </a>
			<a href="/popular" class="text-muted-foreground transition hover:text-foreground">
				Popular
			</a>
			<a href="/categories" class="text-muted-foreground transition hover:text-foreground">
				Categories
			</a>
		</nav>

		<div class="flex items-center justify-end gap-x-2">
			<a href="/add-image" class="lora hidden gap-3 italic sm:flex">
				<Button
					variant="outline"
					class="rounded-md border-primary/30 bg-transparent text-primary/80 hover:bg-primary/30"
					>Add Image</Button
				>
			</a>

			{#if $auth.token && $auth.isLoggedIn}
				<a href="/profile" class="lora hidden gap-3 italic sm:flex">
					<Button>Profile</Button>
				</a>
				
			{:else}
				<a href="/login" class="lora hidden gap-3 italic sm:flex">
					<Button>Login</Button>
				</a>
			{/if}
		</div>

		<div class="md:hidden">
			<Button aria-label="Toggle Menu">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</Button>
		</div>
	</div>
</header>
