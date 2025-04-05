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

	<ul
		class=""
		v-for="column in todolistStore.getAllColumnsByBoardId(boardId)"
	>
		<li class="flex">
			<h2>{{ column.columnName }}</h2>
			<div
				v-for="taskId in column.taskIds"
				class="todo"
			>
				<h3>{{ todolistStore.getTaskById(taskId)?.taskName }}</h3>
				<h2>{{ todolistStore.getTaskById(taskId)?.priority }}</h2>
				<p>{{ todolistStore.getTaskById(taskId)?.dueDate }}</p>
				<p>{{ todolistStore.getTaskById(taskId)?.assignee }}</p>
				<button @click="handleDeleteTask(taskId)">Delete Task</button>
				<button @click="handleEditTask(taskId, column.columnId)">Edit Task</button>
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
				<button
					@click="
						mode === 'edit'
							? handleUpdateTask(taskIdForUpdateForm, column.columnId)
							: handleAddTask(formTodoList, columnId)
					"
				>
					{{ mode === "edit" ? "Update Task" : "Add Task" }}
				</button>
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
				{{ mode === "edit" ? "Update Task" : "Add Task" }}
			</button>
		</li>
	</ul>
</template>

<script setup>
import { useBoard, useTodolist, formatDate } from "~/store/useTask";
import { ref } from "vue";
const columnName = ref("");

const taskIdForUpdateForm = ref("");

const showForm = ref(false);
const columnId = ref("");
const mode = ref("add");

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
const handleAddTask = () => {
	todolistStore.addTask(formTodoList, columnId.value);

	showForm.value = false;
	columnId.value = "";
	formTodoList.taskName = "";
	formTodoList.priority = "";
	formTodoList.dueDate = "";
	formTodoList.assignee = "";
};

const handleDeleteTask = (taskId) => {
	todolistStore.deleteTask(taskId);
};

const handleEditTask = (taskId, columnid) => {
	const task = todolistStore.getTaskById(taskId);
	formTodoList.taskName = task.taskName;
	formTodoList.priority = task.priority;
	formTodoList.dueDate = task.dueDate;
	formTodoList.assignee = task.assignee;
	columnId.value = columnid;
	showForm.value = true;
	mode.value = "edit";
	taskIdForUpdateForm.value = taskId;
};

const handleUpdateTask = (taskId) => {
	todolistStore.updateTask(taskId, formTodoList);
	showForm.value = false;
	columnId.value = "";
	formTodoList.taskName = "";
	formTodoList.priority = "";
	formTodoList.dueDate = "";
	formTodoList.assignee = "";
	mode.value = "add";
};
</script>
