<template lang="">
	<section>
		<FormAddTaskOrEditTask
			v-if="openFormTask"
			:mode="mode"
			:openFormTask="openFormTask"
			@closeForm="handleCloseForm"
			item-for-management="board"
		/>
		<div
			v-for="eachBoard in boards"
			:key="eachBoard.boardId"
			class="mb-4"
		>
			{{ owner }}'s Board:
			<NuxtLink
				class="border px-2 py-2 block"
				:to="{ name: 'board-boardId', params: { boardId: eachBoard.boardId } }"
			>
				-- boardName: {{ eachBoard.boardName }} -- boardId: {{ eachBoard.boardId }} -- members:
				{{ eachBoard.members.join(", ") }}
			</NuxtLink>

			<button
				type="submit"
				@click="handleOpenFormToEdit"
				class="bg-green-600 px-3 py-2 rounded-sm"
			>
				Edit
			</button>
			<button
				type="button"
				@click=""
				class="border-green-600 border px-2 py-1.5 rounded-sm"
			>
				Delete
			</button>
		</div>
	</section>
</template>
<script setup lang="ts">
// import type { Board } from "~/lib/data";
// import BoardCard from "~/components/BoardCard/index.vue";
import FormAddTaskOrEditTask from "~/components/FormAddTaskOrEditTask/index.vue";
defineProps({
	boards: Object, // type Board
	owner: String, // type string
});

const mode = ref<"add" | "edit" | "">("");
const openFormTask = ref<boolean>(false);
const handleOpenFormToEdit = () => {
	openFormTask.value = true;
	mode.value = "edit";
};

const handleCloseForm = () => {
	openFormTask.value = false;
	mode.value = "";
};
</script>
