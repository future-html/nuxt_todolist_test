<template>
	<section class="bg-black text-white min-h-screen p-4">
		<div>
			{{ boardStore.getColumnFromBoardId(route.params.boardId as string) }}
		</div>
	</section>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});
import { useBoard } from "~/store/useTask";
const route = useRoute();
console.log("route.params.boardId", route.params.boardId);
const boardStore = useBoard();
</script>
