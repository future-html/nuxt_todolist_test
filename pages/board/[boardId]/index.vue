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
</script>
