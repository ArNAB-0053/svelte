<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { jwtDecode } from 'jwt-decode';
	import { onMount } from 'svelte';
	import Button from '@/components/ui/button/button.svelte';
	// import { JWT_SECRET } from '$env/static/private';
	// import jwt from 'jsonwebtoken';

	let decodedToken: string | null = $state(null);
    let isToken: boolean = false

	if (browser) {
		const token = localStorage?.getItem('token');
        if (token) {
            isToken = true
            decodedToken = jwtDecode(token);
        }
		// console.log(decodedToken?.email);
	} else {
		console.log('Not working');
	}

	type user = {
		first_name: string;
		last_name: string;
		email: string;
	};

	let user: user | null = $state(null);
	let isLoading: boolean = $state(true);

	onMount(async () => {
		try {
			const res = await fetch(`/api/user?email=${decodedToken?.email}`);
			user = await res.json();
		} catch (error) {
			console.error(error);
		} finally {
			isLoading = false;
		}
	});

    function handleLogOut() {
        // if (isToken) {
        console.log("Token removing ...")
        localStorage?.removeItem("token");
        console.log("Token removed")

        goto('/')
		// }
    }

	// console.log(token)
	// if (!token || token === null || token === '' || token === undefined) {
	// 	goto('/login');
	// }

	// const decoded = jwtDecode(token);
	// console.log(decoded)
</script>

<div class="mt-20 px-6 lg:px-8 min-h-screen italic flex items-start justify-start flex-col lora">
	{#if user}
		<span>
			First Name:
			<strong>{user.first_name}</strong>
        </span>
        <span>
			Last Name:
            <strong>{user.last_name}</strong>
        </span>
        <span>
			Email: 
            <strong>{user.email}</strong>
        </span>

        <Button onsubmit={handleLogOut} class="mt-12">
            Log out
        </Button>
	{/if}
</div>
<!-- <p>{decoded}</p> -->
