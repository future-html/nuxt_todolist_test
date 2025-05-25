<template lang="">
	<section>
		<div
			v-for="eachBoard in boards"
			:key="eachBoard.boardId"
			class="mb-4"
		>
			<NuxtLink :to="{ name: 'board-boardId', params: { boardId: eachBoard.boardId } }">
				-- boardName: {{ eachBoard.boardName }} -- boardId: {{ eachBoard.boardId }} -- members:
				{{ eachBoard.members.join(", ") }}
			</NuxtLink>
			<button
				type=""
				@click=""
			>
				Edit
			</button>
			<button
				type=""
				@click=""
			>
				Delete
			</button>
		</div>
	</section>
</template>
<script setup lang="ts">
// import type { Board } from "~/lib/data";
// import BoardCard from "~/components/BoardCard/index.vue";
defineProps({
	boards: Object, // type Board
});
</script>
