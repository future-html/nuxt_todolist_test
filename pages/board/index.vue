<template>
	<h2>Board Task</h2>
	<p>Complete Task</p>
	<section action="">
		<label for="">BoardName</label>
		<input
			v-model="inputRef"
			type="text"
			placeholder="Enter Board Name"
		/>
		<!-- <ul v-if="storedIsEditing">
			<li v-for="member in storedInvitePeople">{{ member }}</li>
		</ul> -->
		<button @click="handleSubmit">{{ storedIsEditing ? "Update" : "Add" }} Board</button>
		<ul
			role="list"
			class="grid grid-cols-4 w-[60rem]"
			v-for="board in storeTodolist.getBoard"
		>
			<NuxtLink
				v-key="board.boardId"
				:to="{ name: 'board-boardId', params: { boardId: board.boardId } }"
			>
				<h2>boardName: {{ board.boardName }} id: {{ board.boardId }}</h2>
				<span>owner: {{ board.owner }}</span>
				<div v-for="member in board.people">
					<span v-key="member">{{ member }}</span>
				</div>
			</NuxtLink>
			<button @click="handleDeleteBoard(board.boardId)">Delete This board</button>
			<button @click="prepareUpdateForm(board.boardId)">Edit</button>
		</ul>
	</section>
</template>

<script setup>
import { useBoard } from "~/store/useTask";
import { allPeople } from "~/lib/data";
import { useStorage } from "~/service/useStorage";
const storeTodolist = useBoard();

const inputRef = ref("");
const mode = ref("add");
const storedIsEditing = ref(false);
const storedTemporaryBoardId = ref("");
// const storedOwnerId = ref("");
const storedInvitePeople = ref([]);

const handleSubmit = () => {
	if (mode.value === "add") {
		const currentUser = computed(() => {
			return "user-1";
		});
		storeTodolist.addBoard(inputRef.value, [], currentUser);
		inputRef.value = ""; //  mode "add form"
	} else if (mode.value === "edit") {
		storeTodolist.updateBoard(storedTemporaryBoardId.value, inputRef.value, []);
		inputRef.value = ""; // mode "edit form"
		mode.value = "add"; // reset to add mode
		storedIsEditing.value = false;
	}
};

const handleDeleteBoard = (boardId) => {
	storeTodolist.deleteBoard(boardId);
};

const prepareUpdateForm = (boardId) => {
	mode.value = "edit";
	const boardDataGetById = storeTodolist.getBoardById(boardId);
	console.log(boardDataGetById);
	storedTemporaryBoardId.value = boardDataGetById.boardId;
	inputRef.value = boardDataGetById.boardName;
	storedInvitePeople.value = allPeople.filter((member) => {
		return !boardDataGetById.people.includes(member);
	});
	storedIsEditing.value = true;
};
/*
when update form the state is edit form not submit form 
but when update form state is edit form but submit form 
when push the form state is add form not submit form 
but when push the form state is add form but submit form



mode = "edit", submit form = false
click edit 

mode = "add"
click add button



const handleUpdateForm = (boardId, owner) => {
	if (!storedIsEditing.value) {
		storedIsEditing.value = !isEditing;
		const data = storeTodolist.getBoardById(boardId, owner);
		storedInvitePeople.value = allPeople.filter((member) => {
			return !data.people.includes(member);
		});

		inputRef.value = data.boardName;
		storedOwnerId.value = data.owner;
		storedTemporaryBoardId.value = data.boardId;
		console.log(storedTemporaryBoardId.value, "temporary boardid");
	} else {
		console.log("click updated");
		storeTodolist.updateBoard(storedTemporaryBoardId.value, inputRef, []);
	}
};
*/

// definePageMeta({
// 	middleware: "redirect",
// });
// const [board, setBoard] = useStorage("board", "local");
// setBoard(storeTodolist.getBoard);
// console.log(setBoard);
</script>
