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
			:id="taskId"
			:column="columnIdInColumnComponent"
		/>

		<div
			v-if="tasks && tasks.length > 0"
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
				@click="handleOpenFormToEdit(task.taskId)"
				class="bg-green-600 px-3 py-2 rounded-sm"
			>
				Edit
			</button>
			<button
				@click="handleDeleteTask(task.taskId)"
				class="border-green-600 border px-2 py-1.5 rounded-sm"
			>
				Delete
			</button>
		</div>
	</section>
</template>

<script setup lang="ts">
import FormAddTaskOrEditTask from "~/components/FormAddTaskOrEditTask/index.vue";
import type { Task } from "~/lib/data";
import { useBoard } from "~/store/useTask";
const mode = ref<"add" | "edit" | "">("");
const taskId = ref<string>("");
const columnIdInColumnComponent = ref<string>("");
const boardStore = useBoard();
const props = defineProps({
	columnName: String,
	columnId: {
		type: String,
		required: true,
	},
	tasks: {
		type: Array<Task>,
	},
});

const openFormTask = ref<boolean>(false);

const handleOpenFormToAdd = () => {
	openFormTask.value = true;
	mode.value = "add";
	columnIdInColumnComponent.value = props.columnId;
};

const handleOpenFormToEdit = (id: string) => {
	openFormTask.value = true;
	mode.value = "edit";
	taskId.value = id;
	columnIdInColumnComponent.value = props.columnId;
};

const handleDeleteTask = (taskId: string) => {
	boardStore.deleteTask(props.columnId, taskId);
};

const handleCloseForm = () => {
	openFormTask.value = false;
	mode.value = "";
	columnIdInColumnComponent.value = "";
};
</script>
