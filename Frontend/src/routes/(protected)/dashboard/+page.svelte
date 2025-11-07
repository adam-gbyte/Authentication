<script>
	export let data;
	const user = data.user;
</script>

<p>Dashboard</p>
<h1>Selamat datang, {user.id}</h1>

{#if user.roles.includes('admin')}
	<a href="/dashboard/admin" class="btn">Admin</a>
{/if}
