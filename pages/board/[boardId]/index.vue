<template>
	<section class="bg-black text-white min-h-screen p-4">
		Column:
		<button
			@click="handleOpenFormToAdd"
			class="px-3 py-2 rounded-md cursor-pointer bg-green-600"
		>
			Add Column
		</button>
		<GridWrapper>
			<div
				v-for="eachColumn in boardStore.getColumnByBoardId(boardId)"
				:key="eachColumn.columnId"
				class="mb-4"
			>
				<ColumnInfo
					:columnName="eachColumn.columnName"
					:columnId="eachColumn.columnId"
					:tasks="boardStore.getTaskByByColumnId(boardId, eachColumn.columnId)"
				/>
			</div>
		</GridWrapper>

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

console.log(boardStore.getColumnByBoardId("board-1"));

// edit board
// 1. should open and set to edit mode and props should be pass in the form
// 2. should find the value to replace
</script>
