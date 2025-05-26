<template>
	<section class="bg-black text-white min-h-screen p-4">
		<GridWrapper>
			<div
				v-for="eachColumn in boardStore.getColumnFromBoardId(boardId)"
				:key="eachColumn.columnId"
				class="mb-4"
			>
				<ColumnInfo
					:columnName="eachColumn.columnName"
					:columnId="eachColumn.columnId"
					:tasks="eachColumn.tasks"
				/>
			</div>
		</GridWrapper>
		<button @click="handleOpenFormToAdd">Add Column</button>
		<FormAddTaskOrEditTask
			v-if="openFormTask"
			:mode="mode"
			:openFormTask="openFormTask"
			@closeForm="handleCloseForm"
			item-for-management="column"
		/>
	</section>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});
import { useBoard } from "~/store/useTask";
import ColumnInfo from "~/components/ColumnInfo/index.vue";
import GridWrapper from "~/components/GridWrapper/index.vue";
const route = useRoute();
const boardId = route.params.boardId as string;
console.log("route.params.boardId", route.params.boardId);
const boardStore = useBoard();

const mode = ref<"add" | "edit" | "">("");
const openFormTask = ref<boolean>(false);
const handleOpenFormToAdd = () => {
	openFormTask.value = true;
	mode.value = "add";
};
const handleCloseForm = () => {
	openFormTask.value = false;
	mode.value = "";
};

// edit board
// 1. should open and set to edit mode and props should be pass in the form
// 2. should find the value to replace
</script>
