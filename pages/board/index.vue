<template>
	<div>
		<h1>Board Page</h1>

		<button @click="handleLogout()">Logout</button>
		<div>
			<div v-for="boardData in computedBoard">
				<div v-for="boardKey in computedBoardKeys">
					{{ boardData[boardKey] && boardData[boardKey].boardName }}
					<div v-for="member in boardData[boardKey].members">
						{{ getUserIdInfo(member)?.name }}
					</div>
				</div>
			</div>
		</div>

		<!-- <div class="board-form">
			<h2>Create New Board</h2>
			<label for="boardname">Board Name</label>
			<input
				v-model="formData.boardName"
				type="text"
				placeholder="Enter BoardName"
				name="boardname"
			/>
			<button @click="handleAddBoard">Add Board</button>
		</div>

		<div class="boards-list">
			<h2>Your Boards</h2>
			<div v-if="boardData && boardData.length > 0">
				<div
					v-for="(boardObj, index) in boardData"
					:key="index"
					class="board-item"
				>
					<div
						v-for="(board, boardId) in boardObj"
						:key="boardId"
					>
						<h3>{{ board.boardName }}</h3>
						<p>Members: {{ board.members.join(", ") || "None" }}</p>
						<button @click="() => handleDeleteBoard(boardId)">Delete</button>
            <button @click="() => handleUpdateBoard(boardId)">Update</button>
					</div>
				</div>
			</div>
			<div v-else>
				<p>No boards found. Create your first board!</p>
			</div>
		</div> -->
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});
import { useAuth, useBoard } from "~/store/useTask";
import { JSONtodolistData } from "~/lib/data";
import type { KanbanData, User } from "~/lib/data";
// import { twoPointerFindIndex } from "~/store/useTask";
import { getAllKeysFromObjects } from "~/store/useTask";
const authStore = useAuth();

const getDataFromLocalStorage = (key: string) => {
	if (process.client) {
		const storedCurrentUser = localStorage.getItem(key);
		return storedCurrentUser ? JSON.parse(storedCurrentUser) : null;
	}
	return null;
};
const currentUserId = ref("");
currentUserId.value = getDataFromLocalStorage("currentUser") || "unrelated string";
const boardId = ref<KanbanData>(JSONtodolistData);
boardId.value = getDataFromLocalStorage("board");

const computedBoard = boardId.value[currentUserId.value];
console.log(computedBoard, "computedBoard");
const computedBoardKeys = getAllKeysFromObjects(computedBoard);
const getUserIdInfo = (userId: string) => {
	return authStore.getUserInfoById(userId);
};
const handleLogout = () => {
	authStore.logout();
	navigateTo("/login");
};
</script>
