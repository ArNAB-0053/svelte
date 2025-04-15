<script>
	import { Button } from '@/components/ui/button';
</script>

<header class="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/60 backdrop-blur-md">
	<div class="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<!-- Logo -->
		<a href="/" class="oswald text-lg font-bold tracking-tight text-foreground flex items-center justify-start"> 
			<h1 class="text-3xl lora italic ">Im</h1>
			<p class="text-2xl oswald">Galaxy</p>
			<span class="ml-1 translate-y-1.5 h-3 w-3 bg-white rounded-full"></span>
		</a>

		<!-- Desktop Nav -->
		<nav class="lora hidden items-center gap-6 text-sm italic md:flex">
			<a href="/new" class="text-muted-foreground transition hover:text-foreground"> New </a>
			<a href="/popular" class="text-muted-foreground transition hover:text-foreground"> Popular </a>
			<a href="/categories" class="text-muted-foreground transition hover:text-foreground">
				Categories
			</a>
		</nav>

		<!-- Auth Buttons -->
		<div class="lora hidden gap-3 italic sm:flex">
			<Button>Login</Button>
		</div>

		<!-- Mobile Menu Button -->
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
