<template>
	<main
		class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300"
	>
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
			<!-- {{ JSON.stringify(boardStore.getBoardCurrentUser()) }} -->

			<!-- Board List -->
			<!-- <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<div
					class="border-2 p-2"
					v-if="boardStore.getBoardCurrentUser()?.length"
					v-for="board in boardStore.getBoardCurrentUser()"
				>
					Owner: {{ board?.userId }}
					<div
						v-if="board?.boards"
						v-for="boardInfos in board?.boards"
					>
						{{ boardInfos?.boardName }}
						<div v-for="boardMember in boardInfos.members">member: {{ boardMember }}</div>
					</div>
				</div>
				<div v-else>No Board found</div>
			</div> -->

			<!-- Add Board Form -->
			<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
				<h2 class="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">Create New Board</h2>
				<form
					@submit.prevent="handleAddBoard()"
					class="space-y-4"
				>
					<div>
						<label
							for="boardname"
							class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
							>Board Name</label
						>
						<input
							type="text"
							id="boardname"
							placeholder="Enter Board Name"
							v-model="inputBoardRef"
							required
							class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-colors"
						/>
					</div>
					<button
						type="submit"
						class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
					>
						Add Board
					</button>
				</form>
			</div>

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
import { ref } from "vue";

const authStore = useAuth();
const boardStore = useBoard();
const inputBoardRef = ref("");

const handleAddBoard = () => {
	if (!inputBoardRef.value.trim()) return;

	const newBoardId = `board-${Date.now()}`;
	// boardStore.addBoard(newBoardId, inputBoardRef.value.trim(), getInfo("currentUser"));
	inputBoardRef.value = "";
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
