<template lang="">
	<section
		class="absolute overflow-scroll bg-black top-0 left-1/2 transform -translate-x-1/2 h-screen w-screen inset-0"
	>
		<div class="relative">
			<form
				@submit.prevent="handleSubmit(mode, itemForManagement)"
				class="w-[24rem] h-[100vh] overflow-auto absolute bg-black rounded-lg shadow-lg"
			>
				<h2 class="sr-only">Add / Edit Board / Column / Task ==> mode</h2>
				<!-- // label for input to fill the form and add function prevent submit to the form element <br />// id must not be in
		input.... <br />
		// board ==> id (generated), name, members <br />
		// column ==> id (genarated), name, // task ==> id(generated), name, priority, dueDate, assignee (use member in
		that board to select value) -->
				<h2 class="text-3xl font-light mb-3">
					{{ mode.charAt(0).toUpperCase() + mode.slice(1) }} {{ itemForManagement }} form
				</h2>
				<div class="w-full flex flex-col gap-3">
					<label
						class="text-xl"
						for="boardName"
						>{{ itemForManagement }}Name</label
					>
					<input
						type="text"
						id="boardName"
						placeholder="Enter Name"
						v-model="name"
						class="border border-green-500 px-2 py-1.5"
					/>
				</div>

				<div
					v-if="itemForManagement === 'board' && mode === 'edit'"
					class="mt-2 select-none flex flex-col"
				>
					<h2 class="text-xl">Invite member (for board only)</h2>

					<div
						class=""
						v-if="listUserThatCanInvite.length > 0"
						v-for="userId in listUserThatCanInvite"
					>
						<div
							@click="handleChangeMemberIncludeOrnot(userId)"
							:class="
								boardMember.includes(userId) // pass this argument
									? 'text-green-600 mt-2 text-lg font-normal border border-green-600 p-2 '
									: 'text-white mt-2 text-lg font-normal border border-white p-2 '
							"
						>
							{{ userId }}
						</div>
					</div>
				</div>
				<div
					class="mt-2"
					v-if="itemForManagement === 'task'"
				>
					<h2 class="text-xl">--taskPriority</h2>

					<select
						v-model="priority"
						class="w-full mt-2 px-4 py-2 bg-black border border-white"
					>
						<option
							value=""
							disabled
							selected
						>
							Select Priority
						</option>
						<option value="low">Low</option>
						<option value="medium">Medium</option>
						<option value="high">High</option>
					</select>
				</div>
				<div
					class="mt-4"
					v-if="itemForManagement === 'task'"
				>
					<h2 class="text-xl pb-2">Due date</h2>
					<input
						type="date"
						v-model="dueDate"
						class="w-full px-4 py-2 bg-black border border-white"
					/>
				</div>
				<div
					class="mt-4"
					v-if="itemForManagement === 'task'"
				>
					<h2 class="text-xl pb-2">Assignee</h2>
					<select
						v-model="assignee"
						class="outline-none w-full border-green-500 border px-2 py-1.5"
					>
						<option
							v-for="member in boardStore.getMemberWhoCanBeAssigneeFromBoardId(boardId)"
							:value="member"
						>
							{{ member }}
						</option>
					</select>
				</div>
				<div
					class="mt-4"
					v-if="itemForManagement === 'task' && mode === 'edit'"
				>
					<h2>Change task position</h2>
					<div v-for="column in ListOfAllColumnId">
						<div
							:class="
								newColumnId === column.columnId
									? 'mt-2 text-green-500 border-green-500 border px-2 py-1.5'
									: 'mt-2 text-white border border-white px-2 py-1.5'
							"
							@click="newColumnId = column.columnId"
						>
							{{ column.columnName }}
						</div>
					</div>
					<div>
						<input
							type="number"
							min="0"
							:max="taskBasedOnColumnIdLength"
							v-model.number="positionToChange"
						/>
					</div>
				</div>
				<div>
					<h2>
						Change position max position can be from 1 to
						{{ newColumnId }}
						{{ boardStore.getTaskByByColumnId(newColumnId)?.length + 1 }}
					</h2>
				</div>

				<button
					type="submit"
					class="bg-green-600 mt-4 px-3 py-2 rounded-sm"
				>
					{{ mode === "add" ? "Add" : "Edit" }} {{ itemForManagement }}
				</button>
				<button
					type="button"
					@click="emit('closeForm')"
					class="border-green-600 ml-2 border px-2 py-1.5 rounded-sm"
				>
					Cancel
				</button>
			</form>
		</div>
	</section>
</template>
<script setup lang="ts">
// const mode = ref("add");
import { useBoard } from "~/store/useTask";
import type { Column } from "~/lib/data";
// const itemForManagement = ref < "board" | "column"| "task">("board");  // use this variable to store in pinia
const name = ref<string>(""); // use this variable to store in pinia value are work but there is also defineModel
// const member = ref<string>(""); // use this variable to store in pinia
const priority = ref<"low" | "medium" | "high">("low"); //
const dueDate = ref<string>(""); //
const assignee = ref<string>(""); //
const boardStore = useBoard();
const boardMember = ref<string[]>([]);
// const tags = ref<string[]>([]);
const listUserThatCanInvite = ref<string[]>([]);
// console.log(name.value);

const oldColumnId = ref<string>("");
const positionToChange = ref<number>(0);
const newColumnId = ref<string>("");
const ListOfAllColumnId = ref<Column[]>([]);

const router = useRoute();
const boardId = router.params.boardId;
const props = defineProps({
	mode: {
		type: String,
		default: "add", // "add" | "edit"
	},
	itemForManagement: {
		type: String,
		default: "board", // "board" | "column" | "task"
	},
	openFormTask: {
		type: Boolean,
		default: false,
	},
	// pass boardId, columnId, taskId,
	// pass id end....
	id: {
		type: String,
	},
	column: {
		type: String,
	},
});

if (props.mode === "edit" && props.itemForManagement === "board") {
	// console.log(props.id, "id for board");
	listUserThatCanInvite.value = [
		...(boardStore.getInvitePeopleToJoinBoard(props.id as string) || []),
		...(boardStore.getMemberWhoCanBeAssigneeFromBoardId(props.id as string) || []),
	];
}

// console.log(props.id, "props id to edit form");
// console.log(props.itemForManagement === "column");
const editInfo =
	props.itemForManagement === "board"
		? boardStore.getEditFormByBoardOrColumnOrTaskId(props.id)
		: props.itemForManagement === "column"
		? boardStore.getEditFormByBoardOrColumnOrTaskId(undefined, props.id)
		: boardStore.getEditFormByBoardOrColumnOrTaskId(undefined, undefined, props.id);
if (props.mode === "edit" && editInfo) {
	if (props.itemForManagement === "board" && "boardName" in editInfo && "members" in editInfo) {
		name.value = editInfo.boardName;
		boardMember.value = editInfo.members;
	} else if (props.itemForManagement === "column" && "columnName" in editInfo) {
		name.value = editInfo.columnName;
	} else if (props.itemForManagement === "task" && "taskName" in editInfo) {
		name.value = editInfo.taskName;
		if ("priority" in editInfo) priority.value = editInfo.priority;
		if ("dueDate" in editInfo) dueDate.value = editInfo.dueDate;
		// if ("tags" in editInfo) tags.value = editInfo.tags;
		if ("assignee" in editInfo) assignee.value = editInfo.assignee;
	}
}
if (props.mode === "edit" && props.itemForManagement === "task") {
	oldColumnId.value = props.column as string; // store old column id
	ListOfAllColumnId.value = boardStore.getColumnByBoardId(boardId as string) || [];
	// // console.log(ListOfAllColumnId.value, "list of all column id");
}
const handleChangeMemberIncludeOrnot = (userId: string) => {
	if (boardMember.value.includes(userId)) {
		// const findIndex = boardMember.value.findIndex((elementId) => elementId === userId); // return ['user-1', 'user-2' ,......]
		// // console.log(findIndex, "findIndex");
		const originalBoardMemberInvite = [...boardMember.value];
		// // console.log(originalBoardMemberInvite, "original array");

		boardMember.value = originalBoardMemberInvite.filter((elementId) => elementId !== userId);
		// // console.log(boardMember.value, "boardmemeber value");
	} else if (!boardMember.value.includes(userId)) {
		const originalArrayBoardMember = [...boardMember.value];
		originalArrayBoardMember.push(userId);
		boardMember.value = originalArrayBoardMember;
		// // console.log(boardMember.value, "board member");
	}
};

// boardMember.includes('user-1') ? boardMember.remove('user-1') : boardMember.push('user-1')

const handleSubmit = (mode: string, itemForManagement: string) => {
	// handle the form submission logic here

	if (mode === "add") {
		if (itemForManagement === "board") {
			boardStore.addBoard(name.value, boardMember.value);
		} else if (itemForManagement === "column") {
			boardStore.addColumn(boardId as string, name.value);
		} else if (itemForManagement === "task") {
			boardStore.addTask(name.value, props.column as string, priority.value, dueDate.value, assignee.value);
		}
		emit("closeForm");
	} else if (mode === "edit") {
		if (itemForManagement === "board") {
			boardStore.editBoard(props.id as string, name.value, boardMember.value);
		} else if (itemForManagement === "column") {
			boardStore.updateColumn(props.id as string, name.value);
		} else if (itemForManagement === "task") {
			boardStore.editTask(
				props.id as string,
				name.value,
				priority.value,
				dueDate.value,
				assignee.value,
				oldColumnId.value,
				newColumnId.value,
				positionToChange.value
			);
		}
		emit("closeForm");
	}
	// You can use the values of name, member, priority, dueDate, and assignee here
};

const emit = defineEmits(["closeForm"]);
</script>
