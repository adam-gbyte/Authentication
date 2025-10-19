<script>
	import { goto } from '$app/navigation';
</script>

<div class="flex h-screen flex-col items-center justify-center text-center">
	<h1 class="mb-4 text-4xl font-bold text-red-600">403 - Akses Ditolak</h1>
	<p class="text-lg text-gray-600">Kamu tidak memiliki izin untuk melihat halaman ini.</p>
	<button
		on:click={() => goto('/')}
		class="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
	>
		Kembali ke Beranda
	</button>
</div>
