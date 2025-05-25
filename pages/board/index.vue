<template>
	<main class="min-h-screen bg-black text-white transition-colors duration-300">
		<section class="container mx-auto px-4 py-8">
			<div class="flex justify-between items-center mb-8">
				<h1 class="text-3xl font-bold text-green-600 dark:text-green-400">Your Boards</h1>
				<button
					@click="handleLogout()"
					class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
				>
					Logout
				</button>
			</div>

			<!-- Add Board Form -->
			<FormAddTaskOrEditTask
				v-if="openFormTask"
				:mode="mode"
				:openFormTask="openFormTask"
				@closeForm="handleCloseForm"
				item-for-management="board"
			/>

			<button @click="handleOpenForm">Add task</button>

			<GridWrapper>
				<div v-for="board in boardStore.getBoardCurrentUser()">
					<BoardInfo
						:key="board?.userId + board?.boards?.length"
						v-if="board"
						:boards="board?.boards"
					/>
				</div>
			</GridWrapper>
		</section>
	</main>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});
import GridWrapper from "~/components/GridWrapper/index.vue";
import { useAuth, useBoard } from "~/store/useTask";
import BoardInfo from "~/components/BoardInfo/index.vue";
import FormAddTaskOrEditTask from "~/components/FormAddTaskOrEditTask/index.vue";
import { ref } from "vue";

const authStore = useAuth();
const boardStore = useBoard();
// const inputBoardRef = ref("");

const mode = ref<"add" | "edit" | "">("");

console.log(mode.value, "mode value");
const openFormTask = ref<boolean>(false);

const handleOpenForm = () => {
	openFormTask.value = true;
	mode.value = "add";
};
// const handleAddBoard = () => {
// 	if (!inputBoardRef.value.trim()) return;

// 	const newBoardId = `board-${Date.now()}`;
// 	// boardStore.addBoard(newBoardId, inputBoardRef.value.trim(), getInfo("currentUser"));
// 	inputBoardRef.value = "";
// };

const handleCloseForm = () => {
	openFormTask.value = false;
	mode.value = "";
};

const handleLogout = () => {
	authStore.logout();
	navigateTo("/login");
};

console.log(boardStore.getBoardCurrentUser());
</script>

<style>
/* Smooth transitions for dark mode */
html {
	@apply transition-colors duration-300;
}
</style>
