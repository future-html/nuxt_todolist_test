<template lang="">
	<form @submit.prevent="handleAddBoard">
		<h2>Add / Edit Board / Column / Task ==> mode</h2>
		<!-- // label for input to fill the form and add function prevent submit to the form element <br />// id must not be in
		input.... <br />
		// board ==> id (generated), name, members <br />
		// column ==> id (genarated), name, // task ==> id(generated), name, priority, dueDate, assignee (use member in
		that board to select value) -->
		<h2>This is {{ mode }} {{ itemForManagement }} form</h2>
		<label for="boardName">BoardName</label>
		<input
			type="text"
			id="boardName"
			placeholder="Enter Name"
			v-model="name"
			required
			class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-colors"
		/>
		<div>
			Invite member (for board only) <br />
			- list of userId exept for currentUser and selected User <br />
			- means all - selected
		</div>
		<div>
			--taskPriority select
			<select
				v-model="priority"
				class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-colors"
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
		<div>
			Due date
			<input
				type="date"
				v-model="dueDate"
				class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-colors"
			/>
		</div>
		<div>
			assignee select
			<select
				v-model="assignee"
				class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-colors"
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
			<select>
				<option>tag option</option>
			</select>
		</div>
		<button type="submit">Add / Edit Board</button>
		<button
			type="button"
			@click="emit('closeForm')"
		>
			Cancel
		</button>
	</form>
</template>
<script setup lang="ts">
// const mode = ref("add");
// const itemForManagement = ref < "board" | "column"| "task">("board");  // use this variable to store in pinia
const name = ref<string>(""); // use this variable to store in pinia value are work but there is also defineModel
const member = ref<string>(""); // use this variable to store in pinia
const priority = ref<"low" | "medium" | "high" | "">(""); //
const dueDate = ref<Date>(new Date()); //
const assignee = ref<string>(""); //

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

const emit = defineEmits(["closeForm"]);
// should pass the props from parent component !!!!!
</script>
