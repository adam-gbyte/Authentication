<script>
    import { verify } from '$lib/services/authService';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { get } from 'svelte/store';
    
    let token = '';
    
    onMount(() => {
        token = get(page).params.token;
        verifyEmail(token);
    });
    
    async function verifyEmail(token) {
        try {
        const response = verify(token);
    
        if (response.ok) {
            // Redirect to login page after successful verification
            goto('/login');
        } else {
            console.error('Email verification failed');
        }
        } catch (error) {
        console.error('Error during email verification:', error);
        }
    }
</script>

<p class="">Verifying your email...</p>