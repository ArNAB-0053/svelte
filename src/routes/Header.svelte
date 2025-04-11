<script>
	import { Button } from "@/components/ui/button";

</script>
<header class="fixed inset-x-0 top-0 z-50 bg-background/60 backdrop-blur-md border-b border-border">
	<div class="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<!-- Logo -->
		<a href="/" class="text-lg font-bold tracking-tight text-foreground">
			AnimeVerse
		</a>

		<!-- Desktop Nav -->
		<nav class="hidden md:flex items-center gap-6 text-sm">
			<a
				href="#"
				class="text-muted-foreground transition hover:text-foreground"
			>
				Upcoming
			</a>
			<a
				href="#"
				class="text-muted-foreground transition hover:text-foreground"
			>
				Popular
			</a>
			<a
				href="#"
				class="text-muted-foreground transition hover:text-foreground"
			>
				Genres
			</a>
		</nav>

		<!-- Auth Buttons -->
		<div class="hidden sm:flex gap-3">
			<Button>
				Login
			</Button>
		</div>

		<!-- Mobile Menu Button -->
		<div class="md:hidden">
			<Button
				aria-label="Toggle Menu"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
					viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round"
						d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</Button>
		</div>
	</div>
</header>
