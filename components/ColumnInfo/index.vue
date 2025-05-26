<template>
	<section>
		-- columnName: {{ columnName }} -- columnId: {{ columnId }}
		<button
			class="bg-green-600 px-3 py-2 rounded-md"
			@click="handleOpenFormToAdd"
		>
			Add Task
		</button>
		<FormAddTaskOrEditTask
			v-if="openFormTask"
			:mode="mode"
			:openFormTask="openFormTask"
			@closeForm="handleCloseForm"
			item-for-management="task"
		/>
		<div
			v-if="tasks.length > 0"
			v-for="task in tasks"
			:key="task.taskId"
			class="mb-2 border mt-2"
		>
			--taskName {{ task.taskName }} -- taskId: {{ task.taskId }} --taskPriority: {{ task.priority }} --due date:
			{{ task.dueDate }} --assigned to: {{ task.assignee || "Unassigned" }}
			<div v-for="tag in task.tags">
				<div v-if="tag.length">--tag: {{ tag }}</div>
			</div>
			<button
				@click="handleOpenFormToEdit"
				class="bg-green-600 px-3 py-2 rounded-sm"
			>
				Edit
			</button>
			<button class="border-green-600 border px-2 py-1.5 rounded-sm">Delete</button>
		</div>
	</section>
</template>

<script setup lang="ts">
import FormAddTaskOrEditTask from "~/components/FormAddTaskOrEditTask/index.vue";
import type { Task } from "~/lib/data";
const mode = ref<"add" | "edit" | "">("");
defineProps({
	columnName: String,
	columnId: String,
	tasks: {
		type: Array<Task>,
		default: () => [],
	},
});

const openFormTask = ref<boolean>(false);

const handleOpenFormToAdd = () => {
	openFormTask.value = true;
	mode.value = "add";
};

const handleOpenFormToEdit = () => {
	openFormTask.value = true;
	mode.value = "edit";
};

const handleCloseForm = () => {
	openFormTask.value = false;
	mode.value = "";
};
</script>
