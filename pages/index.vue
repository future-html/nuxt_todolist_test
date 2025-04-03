<template>
	<h2>Board Task</h2>
	<p>Complete Task</p>
	<form
		@submit.prevent="handleSubmit"
		action=""
	>
		<label for="">BoardName</label>
		<input
			v-model="inputRef"
			type="text"
			placeholder="Enter Board Name"
		/>
		<button type="submit">Submit</button>
		{{ JSON.stringify(storeTodolist.getBoard) }}
	</form>
</template>

<script setup>
import { useTodolist } from "~/store/useTask";
const storeTodolist = useTodolist();

const inputRef = ref("");
const handleSubmit = () => {
	storeTodolist.addBoard("board-1", inputRef.value, [], "user-1");
};
</script>
