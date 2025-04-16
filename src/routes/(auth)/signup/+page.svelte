<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";

	export let form: ActionData;

    console.log("form", form)
</script>

<form method="POST" autocomplete="off" use:enhance>
	<input name="name" type="text" placeholder="Your Name" value={form?.data?.name ?? ""} required />
	<input name="email" type="email" placeholder="Email" value={form?.data?.email ?? ""} required />
	<input name="password" type="password" placeholder="Password" required />
	<button type="submit">Sign Up</button>
</form>
