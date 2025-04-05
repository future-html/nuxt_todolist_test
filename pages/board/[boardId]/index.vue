<template>
	<div>{{ boardId }}</div>
	<h2>{{ boardGetById.owner }}</h2>
	<section>
		<label for="column">Column Name</label>
		<input
			type="text"
			name="column"
			placeholder="Enter Column name"
			v-model="columnName"
		/>
		<button @click.stop="handleAddColumn(columnName, boardId)">Add column</button>
	</section>

	<ul v-for="column in todolistStore.getAllColumnsByBoardId(boardId)">
		<li>
			<h2>{{ column.columnName }}</h2>
			<div
				v-for="taskId in column.taskIds"
				class="todo"
			>
				<h3>{{ todolistStore.getTaskById(taskId)?.taskName }}</h3>
				<!-- <span>Task name</span>
				<span>Priority</span>
				<span>Due date</span>
				<span>
					<p>Assignee</p>
					<ul>
						<li>member 1</li>
					</ul>
				</span> -->
			</div>

			<section v-if="showForm && columnId === column.columnId">
				<input
					type="text"
					placeholder="Enter Task Name"
					v-model="formTodoList.taskName"
				/>
				<select
					name=""
					id=""
					@change="handleChangeStatus"
					v-model="formTodoList.status"
				>
					<option
						value=""
						disabled
					>
						Select an option
					</option>
					<option v-for="column in todolistStore.getAllColumnsByBoardId(boardId)">{{ column.columnName }}</option>
				</select>
				<input
					type="date"
					v-model="formTodoList.dueDate"
					@change="console.log(formTodoList.dueDate)"
				/>
				<select
					name=""
					id=""
					@change="console.log(formTodoList.priority)"
					v-model="formTodoList.priority"
				>
					<option
						value=""
						disabled
					>
						Select a priority
					</option>
					<option value="Low">Low</option>
					<option value="Medium">Medium</option>
					<option value="High">High</option>
				</select>
				<select
					name=""
					id=""
					@change="console.log(formTodoList.assignee)"
					v-model="formTodoList.assignee"
				>
					<option
						value=""
						disabled
					>
						Please select assignee
					</option>
					<option>{{ boardStore.getOwnerInBoardId(boardId) }}</option>
					<option v-for="member in boardStore.getPeopleInBoardId(boardId)">{{ member }}</option>
				</select>

				<button @click="handleAddTodo">Add todo</button>
			</section>
			<button
				v-else
				@click="
					() => {
						showForm = true;
						columnId = column.columnId;
					}
				"
			>
				Add Task
			</button>
		</li>
	</ul>
</template>

<script setup>
import { useBoard, useTodolist } from "~/store/useTask";
import { ref } from "vue";
const columnName = ref("");

const showForm = ref(false);
const columnId = ref("");

const formTodoList = reactive({
	taskName: "",
	status: "",
	priority: "",
	dueDate: "",
	assignee: "",
});

const handleChangeStatus = () => {
	console.log(formTodoList.status, "status");
};

const router = useRoute();
const { boardId } = router.params;
console.log(boardId);

const boardStore = useBoard();
const boardGetById = boardStore.getBoardById(boardId);
console.log(boardGetById);

const todolistStore = useTodolist(boardId)();
console.log(todolistStore.getAllColumnsByBoardId(boardId), "all cilumns");
// console.log(todolistStore.getAllColumnsByBoardId(boardId), "all cilumns");
const handleAddColumn = (column, boardId) => {
	todolistStore.addColumn(column, boardId);
	columnName.value = "";
};
const handleAddTodo = () => {
	todolistStore.addTask(formTodoList, columnId.value, boardId);
	console.log(formTodoList);
	showForm.value = false;
	columnId.value = "";
};
</script>
