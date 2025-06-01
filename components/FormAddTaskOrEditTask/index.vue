<template lang="">
	<section class="absolute overflow-hidden bg-black inset-0 h-full w-full">
		<div class="relative">
			<form
				@submit.prevent="handleSubmit(mode, itemForManagement)"
				class="w-[24rem] absolute top-0 left-1/2 transform translate-y-1/2 -translate-x-1/2 bg-black p-6 rounded-lg shadow-lg"
			>
				<h2 class="sr-only">Add / Edit Board / Column / Task ==> mode</h2>
				<!-- // label for input to fill the form and add function prevent submit to the form element <br />// id must not be in
		input.... <br />
		// board ==> id (generated), name, members <br />
		// column ==> id (genarated), name, // task ==> id(generated), name, priority, dueDate, assignee (use member in
		that board to select value) -->
				<h2 class="text-3xl font-light mb-3">{{ mode }} {{ itemForManagement }} form</h2>
				<div class="w-full flex flex-col gap-3">
					<label
						class="text-xl"
						for="boardName"
						>BoardName</label
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
					v-if="itemForManagement === 'board'"
					class="mt-2"
				>
					<h2 class="text-xl">Invite member (for board only)</h2>
					<div
						@click="handleChangeMemberIncludeOrnot('user-1')"
						:class="
							boardMember.includes('user-1') // pass this argument
								? 'text-green-600 mt-2 text-lg font-normal border border-green-600 p-2 inline-block'
								: 'text-black mt-2 text-lg font-normal border border-white p-2 inline-block'
						"
					>
						user-1
					</div>
					<div
						@click="handleChangeMemberIncludeOrnot('user-2')"
						:class="
							boardMember.includes('user-2')
								? 'text-green-600 mt-2 text-lg font-normal border border-green-600 p-2 inline-block'
								: 'text-black mt-2 text-lg font-normal border border-white p-2 inline-block'
						"
					>
						user-2
					</div>
					<div
						@click="handleChangeMemberIncludeOrnot('user-3')"
						:class="
							boardMember.includes('user-3')
								? 'text-green-600 mt-2 text-lg font-normal border border-green-600 p-2 inline-block'
								: 'text-black mt-2 text-lg font-normal border border-white p-2 inline-block'
						"
					>
						user-3
					</div>
				</div>
				<div
					class="mt-2"
					v-if="itemForManagement === 'task'"
				>
					<h2 class="text-x">--taskPriority select</h2>

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
				<div v-if="itemForManagement === 'task'">
					Due date
					<input
						type="date"
						v-model="dueDate"
						class="w-full px-4 py-2 bg-black border border-white"
					/>
				</div>
				<div v-if="itemForManagement === 'task'">
					assignee select
					<select
						v-model="assignee"
						class="w-full mt-2 px-4 py-2 bg-black border border-white"
					>
						<option
							value=""
							disabled
							selected
						>
							Select Member
						</option>
						<!-- Assuming you have a list of members to select from -->
						<!-- <option
						v-for="memberOption in members"
						:key="memberOption"
						:value="memberOption"
					>
						{{ memberOption }}
					</option> -->
					</select>
					<div>tag option display tag tect input (optionmal)</div>
				</div>
				<button
					type="submit"
					class="bg-green-600 px-3 py-2 rounded-sm"
				>
					Add / Edit {{ itemForManagement }}
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
// const itemForManagement = ref < "board" | "column"| "task">("board");  // use this variable to store in pinia
const name = ref<string>(""); // use this variable to store in pinia value are work but there is also defineModel
const member = ref<string>(""); // use this variable to store in pinia
const priority = ref<"low" | "medium" | "high" | "">(""); //
const dueDate = ref<Date>(new Date()); //
const assignee = ref<string>(""); //
const boardStore = useBoard();
const boardMember = ref<string[]>([]);

console.log(name.value);
defineProps({
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
});

const handleChangeMemberIncludeOrnot = (userId: string) => {
	if (boardMember.value.includes(userId)) {
		// const findIndex = boardMember.value.findIndex((elementId) => elementId === userId); // return ['user-1', 'user-2' ,......]
		// console.log(findIndex, "findIndex");
		const originalBoardMemberInvite = [...boardMember.value];
		// console.log(originalBoardMemberInvite, "original array");

		boardMember.value = originalBoardMemberInvite.filter((elementId) => elementId !== userId);
		// console.log(boardMember.value, "boardmemeber value");
	} else if (!boardMember.value.includes(userId)) {
		const originalArrayBoardMember = [...boardMember.value];
		originalArrayBoardMember.push(userId);
		boardMember.value = originalArrayBoardMember;
		// console.log(boardMember.value, "board member");
	}
};

// boardMember.includes('user-1') ? boardMember.remove('user-1') : boardMember.push('user-1')

const handleSubmit = (mode: string, itemForManagement: string) => {
	// handle the form submission logic here

	if (mode === "add") {
		emit("closeForm");
	} else if (mode === "edit") {
		emit("closeForm");
	} else if (mode === "delete") {
	}

	// You can use the values of name, member, priority, dueDate, and assignee here
};

const emit = defineEmits(["closeForm"]);
</script>
