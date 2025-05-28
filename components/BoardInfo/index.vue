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
			:key="board.boardId"
			class="mb-4"
		>
			{{ owner }}'s Board:
			<NuxtLink
				class="border px-2 py-2 block"
				:to="{ name: 'board-boardId', params: { boardId: board.boardId } }"
			>
				-- boardName: {{ board.boardName }} -- boardId: {{ board.boardId }} -- members:
				{{ board.members.join(", ") }}
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
				@click="handleDeleteBoard()"
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
import { useBoard } from "~/store/useTask";
defineProps({
	board: Object, // type Board
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

const boardStore = useBoard();

const handleDeleteBoard = () => {
	// Implement the logic to delete the board
	boardStore.deleteItem();

	console.log("Delete board logic goes here");
};
</script>
