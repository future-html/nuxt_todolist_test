import { defineStore } from "pinia";
import { defaultData } from "~/lib/data";
import type { Board, Task } from "~/lib/data";

export const useAuth = defineStore("auth", {
	state: () => ({
		users: defaultData.users,
	}),
	actions: {
		register(name: string, email: string, password: string) {
			if (this.users.find((user) => user.email === email)) {
				return "User already exist";
			}
			this.users.push({ userId: "user-" + this.users.length + 1, name, email, password });
			const router = useRouter();
			router.push("/login");
		},
		login(email: string, password: string) {
			const findUser = this.users.find((user) => user.email === email && user.password === password);
			if (!findUser) {
				return "Register first";
			}
			const existingEmailUser = this.users.find((user) => user.email === email && user.password !== password);
			if (existingEmailUser) {
				return "User already exists";
			}
			const router = useRouter();
			router.push("/board");
		},
		logout() {},
	},
});

export const useBoard = defineStore("todolist", {
	state: () => ({
		board: defaultData.boards,
		columns: defaultData.columns,
		tasks: defaultData.tasks,
		users: defaultData.users,
	}),
	actions: {
		addBoard(boardName: string, people: string[] | [], owner: string = "user-1") {
			this.board = [
				...this.board,
				{
					boardId: Math.floor(Math.random() * 1000000000000).toString(),
					boardName,
					people,
					owner,
				},
			];
			console.log("push sucessfully");
			console.log(this.board);
		},
		deleteBoard(boardId: string) {
			this.board = this.board.filter((board) => board.boardId !== boardId);
		},
		updateBoard(boardId: string, boardName: string, people: string[] | [], owner: string = "user-1") {
			console.log(boardId, "boardid");
			console.log(this.board);
			const existBoard = (board: Board) => board.boardId === boardId;
			const findIndex = this.board.findIndex(existBoard);
			console.log(findIndex, "index");

			this.board[findIndex] = { boardId: this.board[findIndex].boardId, boardName, people, owner };
			console.log(this.board, "updare function");
		},
	},
	getters: {
		getBoardById: (state) => {
			return (boardId: string) => state.board.find((board) => board.boardId === boardId);
		}, // pass the paramters too {{ JSON.stringify(storeTodolist.getBoardId("board-1")) }}
		getBoard: (state) => {
			return state.board;
		}, //{{ JSON.stringify(storeTodolist.getBoard) }}
		getColumns: (state) => {
			return state.columns;
		},
		getPeopleInBoardId: (state) => {
			return (boardId: string) => state.board.find((board) => board.boardId === boardId)?.people;
		},
		getOwnerInBoardId: (state) => {
			return (boardId: string) => state.board.find((board) => board.boardId === boardId)?.owner;
		},
	},
});

export const useTodolist = (boardId: string) => {
	const boardStore = useBoard();
	console.log(typeof boardId, "boardid");
	console.log(boardStore, "boardstore");
	const boardById = boardStore.getBoardById(boardId);
	console.log(boardById, "todolist");

	return defineStore(`todolist-${boardId}`, {
		state: function () {
			return {
				task: defaultData.tasks,
				columns: defaultData.columns,
				board: boardById,
			};
		},
		actions: {
			addColumn(columnName: string, boardId: string) {
				const length = this.columns.filter((column) => column.boardId === boardId).length;
				const findIndex = this.columns.findIndex((column) => column.boardId === boardId);
				this.columns.splice(findIndex + length, 0, {
					columnId: "column-" + (length + 1),
					columnName,
					boardId,
					taskIds: [],
				});
			},
			addTask(formTodoList: Task, columnId: string) {
				this.task.push({
					taskId: "task-" + (this.task.length + 1),
					taskName: formTodoList.taskName,
					priority: formTodoList.priority,
					dueDate: formatDate(formTodoList.dueDate),
					assignee: formTodoList.assignee,
				});

				const findIndex = this.columns.findIndex((column) => column.columnId === columnId);
				this.columns[findIndex].taskIds = [...this.columns[findIndex].taskIds, "task-" + this.task.length];
			},
			deleteTask(taskId: string) {
				console.log(taskId);
				this.task = this.task.filter((task) => task.taskId !== taskId);
				const findIndex = this.columns.findIndex((column) => column.taskIds.includes(taskId));
				const findIndexElementOfColumns = this.columns[findIndex].taskIds.findIndex((task) => task === taskId);
				this.columns[findIndex].taskIds.splice(findIndexElementOfColumns, 1);
				console.log(this.columns[findIndex], "column");
			},
			updateTask(taskId: string, formTodoList: Task) {
				const isTaskId = (task: Task) => task.taskId === taskId;
				const findIndex = this.task.findIndex(isTaskId);

				this.task.splice(findIndex, 1, {
					taskId,
					taskName: formTodoList.taskName,
					priority: formTodoList.priority,
					dueDate: formatDate(formTodoList.dueDate),
					assignee: formTodoList.assignee,
				});
			},
		},
		getters: {
			getTasks: (state) => {
				return state.task;
			},
			getTaskById: (state) => {
				return (taskId: string) => state.task.find((task) => task.taskId === taskId);
			},
			getAllColumnsByBoardId: (state) => {
				return (boardId: string) => state.columns.filter((column) => column.boardId === boardId);
			},
		},
	});
};
export const formatDate = (dateString?: string): string => {
	if (!dateString) return "";

	// Split the ISO format date (YYYY-MM-DD)
	const [year, month, day] = dateString.split("-");

	// Get last 2 digits of year
	const shortYear = year.slice(-2);

	// Return in DD-MM-YY format
	return `${day}-${month}-${shortYear}`;
};
