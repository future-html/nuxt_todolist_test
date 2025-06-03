<template>
	<ContainerScreen>
		<div class="flex justify-between items-center mb-8">
			<h1 class="text-3xl font-bold text-green-600 dark:text-green-400">Your Boards</h1>
			<div>
				<button
					class="text-white mr-2 rounded-md px-2 py-2 border"
					@click="handleOpenFormToAdd"
				>
					Click to Add Board
				</button>
				<button
					@click="handleLogout()"
					class="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
				>
					Logout
				</button>
			</div>
		</div>

		<!-- Add Board Form -->

		<FormAddTaskOrEditTask
			v-if="openFormTask"
			:mode="mode"
			:openFormTask="openFormTask"
			@closeForm="handleCloseForm"
			item-for-management="board"
		/>
		Note: You can invite member by click edit button on that board.

		<GridWrapper>
			<div v-for="board in boardStore.getBoardByUserId()">
				<BoardInfo
					:key="board?.owner + board?.boardId"
					v-if="board"
					:board="board"
					:owner="board?.owner"
				/>
			</div>
		</GridWrapper>
	</ContainerScreen>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});

onMounted(() => {
	boardStore.loadFromLocalStorage();
});
import GridWrapper from "~/components/GridWrapper/index.vue";
import { useAuth, useBoard } from "~/store/useTask";
import BoardInfo from "~/components/BoardInfo/index.vue";
import FormAddTaskOrEditTask from "~/components/FormAddTaskOrEditTask/index.vue";
import ContainerScreen from "~/components/ContainerScreen/index.vue";
import { ref } from "vue";

const authStore = useAuth();
const boardStore = useBoard();
// const inputBoardRef = ref("");

const mode = ref<"add" | "edit" | "">("");

// console.log(mode.value, "mode value");
const openFormTask = ref<boolean>(false);

const handleOpenFormToAdd = () => {
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

// console.log(boardStore.getBoardByUserId());
// // console.log(boardStore.getColumns(), "getcolumns");

// // console.log(boardStore.getTasks(), "getTasks");
// // console.log(boardStore.getBoardCurrentUser());
// comment something
// comment something
// if can duplicate filter can be great option rather than splice
</script>

<style>
/* Smooth transitions for dark mode */
html {
	@apply transition-colors duration-300;
}
</style>
