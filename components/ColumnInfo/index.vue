<template>
	<section>
		-- columnName: {{ columnName }} -- columnId: {{ columnId }}
		<div
			v-if="tasks.length > 0"
			v-for="task in tasks"
			:key="task.taskId"
			class="mb-2"
		>
			--taskName {{ task.taskName }} -- taskId: {{ task.taskId }} --taskPriority: {{ task.priority }} --due date:
			{{ task.dueDate }} --assigned to: {{ task.assignee || "Unassigned" }}
			<div v-for="tag in task.tags">
				<div v-if="tag.length">--tag: {{ tag }}</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import type { Task } from "~/lib/data";
defineProps({
	columnName: String,
	columnId: String,
	tasks: {
		type: Array<Task>,
		default: () => [],
	},
});
</script>
