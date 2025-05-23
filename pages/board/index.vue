<template>
	<div
		class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300"
	>
		<div class="container mx-auto px-4 py-8">
			<div class="flex justify-between items-center mb-8">
				<h1 class="text-3xl font-bold text-green-600 dark:text-green-400">Your Boards</h1>
				<button
					@click="handleLogout()"
					class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
				>
					Logout
				</button>
			</div>
			{{ JSON.stringify(boardStore.getBoardCurrentUser()) }}

			<!-- Boards List -->
			<!-- <div class="mb-8">
				<h2 class="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">Your Current Boards</h2>

				<div
					v-if="boards.length > 0"
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
				>
					<div
						v-for="board in boards"
						:key="board.id"
						class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow"
					>
						<h3 class="text-xl font-semibold mb-2">{{ board.name }}</h3>

						<div class="mb-4">
							<h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Members:</h4>
							<div
								v-if="board.members.length > 0"
								class="space-y-2"
							>
								<div
									v-for="memberId in board.members"
									:key="memberId"
									class="flex items-center space-x-2"
								>
									<div
										class="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center"
									>
										<span class="text-xs font-medium text-green-800 dark:text-green-200"> </span>
									</div>
									<div>
										<p class="text-sm">{{ getUserIdInfo(memberId)?.name }}</p>
										<p class="text-xs text-gray-500 dark:text-gray-400">
											{{ getUserIdInfo(memberId)?.email }}
										</p>
									</div>
								</div>
							</div>
							<p
								v-else
								class="text-sm text-gray-500 dark:text-gray-400"
							>
								No members yet
							</p>
						</div>

						<div class="flex space-x-2">
							<button
								class="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
							>
								Edit
							</button>
							<button
								class="px-3 py-1 text-sm bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-200 rounded transition-colors"
							>
								Delete
							</button>
						</div>
					</div>
				</div>

				<div
					v-else
					class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center"
				>
					<p class="text-gray-500 dark:text-gray-400">
						You don't have any boards yet. Create your first one below!
					</p>
				</div>
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
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});

import { useAuth, useBoard } from "~/store/useTask";

import { ref, computed } from "vue";

const authStore = useAuth();
const boardStore = useBoard();
const inputBoardRef = ref("");

// Get current user ID
// const getInfo = (key: string) => {
// 	if (process.client) {
// 		const storedBoard = localStorage.getItem(key);
// 		return storedBoard ? JSON.parse(storedBoard) : JSONtodolistData;
// 	}
// };

// getInfo function is to show the data dynamically
// ref is used in  component only

// onMounted(() => {
// 	console.log(getInfo("board"), "get current user");
// });

// if (process.client) {
// 	const storedCurrentUser = localStorage.getItem("currentUser");
// 	currentUserId.value = storedCurrentUser ? JSON.parse(storedCurrentUser) : "0";
// }

// // Get and format boards data
// const boards = computed(() => {
// 	if (!process.client) return [];

// 	const boardData = localStorage.getItem("board");
// 	const parsedData = boardData ? JSON.parse(boardData) : JSONtodolistData;

// 	if (!parsedData[currentUserId.value]) return [];

// 	return Object.entries(parsedData[currentUserId.value]).map(([id, board]: [string, any]) => ({
// 		id,
// 		name: board.boardName,
// 		members: board.members || [],
// 	}));
// });

// // Helper function to get user initials
// const getInitials = (user: User | null) => {
// 	if (!user?.name) return "?";
// 	return user.name
// 		.split(" ")
// 		.map((n) => n[0])
// 		.join("")
// 		.toUpperCase();
// };

// const getUserIdInfo = (userId: string) => {
// 	return authStore.getUserInfoById(userId);
// };

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
</script>

<style>
/* Smooth transitions for dark mode */
html {
	@apply transition-colors duration-300;
}
</style>
