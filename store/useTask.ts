import { defineStore } from "pinia";
import { defaultData, JSONtodolistData } from "~/lib/data";
import type { User, KanbanData, Board } from "~/lib/data";
function extractId(valueId: string): number {
	const id = valueId.split("-");
	if (id.length > 1) {
		return +id[1];
	}
	return +valueId;
}

export function getAllKeysFromObjects(arrayOfObjects: Record<string, any>[]): string[] {
	return arrayOfObjects.flatMap((obj) => Object.keys(obj));
}

const getDataLocalStorage = (key: string) => {
	if (process.client) {
		const savedData = localStorage.getItem(key);
		return savedData ? JSON.parse(savedData) : null;
	}
	return;
};

const savedData = (key: string, value: any) => {
	// type any cause problem when deploy but no affect run dev I'll do it later
	if (process.client) {
		localStorage.setItem(key, JSON.stringify(value));
	}
};

console.log(getDataLocalStorage("board"), "board response");
export function twoPointerFindIndex(array: string[], idwantTofind: string): number {
	let left = 0;
	let right = array.length - 1;

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		if (extractId(array[mid]) === extractId(idwantTofind)) {
			return mid;
		} else if (extractId(array[mid]) < extractId(idwantTofind)) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}
	return -1;
}

export const useAuth = defineStore("auth", {
	state: () => ({
		users: defaultData.users as User[],
		board: JSONtodolistData as KanbanData,
	}),
	actions: {
		register(name: string, email: string, password: string) {
			if (process.client) {
				if (this.users.find((user: User) => user.email === email)) {
					return "User already exist";
				}
				const storedUsers = localStorage.getItem("users");
				if (storedUsers) {
					this.users = JSON.parse(storedUsers);
				}
				const newUser = { userId: "user-" + (this.users.length + 1), name, email, password };
				const newListUser = this.users.push(newUser);

				console.log(newListUser, "new user");
				localStorage.setItem("users", JSON.stringify(this.users));
				console.log("user info successfully stored");
				return;
			}

			// this.users.push({ userId: "user-" + this.users.length + 1, name, email, password });
		},
		login(email: string, password: string) {
			if (!process.client) {
				return "Client side only";
			}
			const storedUsers = localStorage.getItem("users");
			if (storedUsers) {
				this.users = JSON.parse(storedUsers);
			}
			const findUser = this.users.find((user: User) => user.email === email && user.password === password);
			if (!findUser) {
				return "Register first";
			}
			const existingEmailUser = this.users.find((user: User) => user.email === email && user.password !== password);
			if (existingEmailUser) {
				return "User already exists and incorrect password";
			}
			localStorage.setItem("currentUser", JSON.stringify(findUser.userId));

			const boardStored = localStorage.getItem("board");
			if (boardStored) {
				this.board = JSON.parse(boardStored);
			}

			const listOdUsers = Object.keys(this.board);
			const findIndex = twoPointerFindIndex(listOdUsers, findUser.userId);
			if (findIndex === -1) {
				this.board[findUser.userId] = [];
			}
			localStorage.setItem("board", JSON.stringify(this.board));
		},
		logout() {
			if (!process.client) {
				return;
			}
			localStorage.removeItem("currentUser");
		},
	},
	getters: {
		getUserInfoById: (state) => (userId: string) => {
			if (process.client) {
				const storedUsers = localStorage.getItem("users");
				if (storedUsers) {
					state.users = JSON.parse(storedUsers);
				}
				const findUser = twoPointerFindIndex(Object.keys(state.users), userId);
				const name = state.users[findUser].name;
				const email = state.users[findUser].email;
				return { name, email };
			}
		},
	},
});

export const useBoard = defineStore("board", {
	state: () => ({
		board: JSONtodolistData as KanbanData,
	}),
	actions: {
		addBoard(boardId: string, boardName: string, owner: string) {
			// const authStore = useAuth(); can use hook to the other hook like react,ts
			if (process.client) {
				const savedData = localStorage.getItem("board");
				this.board = JSON.parse(savedData ?? JSON.stringify(JSONtodolistData));
				console.log(this.board, "board latest");
			}
		},
		deleteBoard() {},
		updateBoard() {},
		addColumn() {},
		deleteColumn() {},
		updateColumn() {},
		addTask() {},
		deleteTask() {},
		updateTask() {},
		inviteMember() {},
		removeMember() {},
		replaceTask() {},
	},
	getters: {
		getAllUsersId: (state) => () => {
			if (process.client) {
				const storedBoard = localStorage.getItem("board");
				if (storedBoard) {
					state.board = JSON.parse(storedBoard);
				}
				return Object.keys(state.board);
			}
		},

		getNumberOfBoards: (state) => () => {
			if (process.client) {
				const storedBoard = localStorage.getItem("board");
				if (storedBoard) {
					state.board = JSON.parse(storedBoard);
				}
			}
		},

		getBoard(): [string[], { [boardId: string]: Board }[]] | undefined {
			if (process.client) {
				const currentUser = localStorage.getItem("currentUser");
				if (currentUser) {
					const boardStored = localStorage.getItem("board");
					if (boardStored) {
						this.board = JSON.parse(boardStored);
					}
					return [getAllKeysFromObjects(this.board[currentUser]), this.board[currentUser]];
				}
			}
		},
		getColumn:
			(state) =>
			(boardId: string): Board | undefined => {
				if (process.client) {
					const currentUser = localStorage.getItem("currentUser");
					if (currentUser) {
						const boardStored = localStorage.getItem("board");
						if (boardStored) {
							state.board = JSON.parse(boardStored);
						}
						const listOfKeyBoardId = getAllKeysFromObjects(state.board[currentUser]);
						const findIndex = twoPointerFindIndex(listOfKeyBoardId, boardId);
						return state.board[currentUser][findIndex][listOfKeyBoardId[findIndex]];
					}
				}
			},
	},
});

/*
get board / add board / delete board
get current user 
get allboards 
display with v-for and 
*/

// export const useBoard = defineStore("todolist", {
// 	state: () => ({
// 		board: defaultData.boards,
// 		columns: defaultData.columns,
// 		tasks: defaultData.tasks,
// 		users: defaultData.users,
// 	}),
// 	actions: {
// 		addBoard(boardName: string, people: string[] | [], owner: string = "user-1") {
// 			this.board = [
// 				...this.board,
// 				{
// 					boardId: Math.floor(Math.random() * 1000000000000).toString(),
// 					boardName,
// 					people,
// 					owner,
// 				},
// 			];
// 			console.log("push sucessfully");
// 			console.log(this.board);
// 		},
// 		deleteBoard(boardId: string) {
// 			this.board = this.board.filter((board) => board.boardId !== boardId);
// 		},
// 		updateBoard(boardId: string, boardName: string, people: string[] | [], owner: string = "user-1") {
// 			console.log(boardId, "boardid");
// 			console.log(this.board);
// 			const existBoard = (board: Board) => board.boardId === boardId;
// 			const findIndex = this.board.findIndex(existBoard);
// 			console.log(findIndex, "index");

// 			this.board[findIndex] = { boardId: this.board[findIndex].boardId, boardName, people, owner };
// 			console.log(this.board, "updare function");
// 		},
// 	},
// 	getters: {
// 		getBoardById: (state) => {
// 			return (boardId: string) => state.board.find((board) => board.boardId === boardId);
// 		}, // pass the paramters too {{ JSON.stringify(storeTodolist.getBoardId("board-1")) }}
// 		getBoard: (state) => {
// 			return state.board;
// 		}, //{{ JSON.stringify(storeTodolist.getBoard) }}
// 		getColumns: (state) => {
// 			return state.columns;
// 		},
// 		getPeopleInBoardId: (state) => {
// 			return (boardId: string) => state.board.find((board) => board.boardId === boardId)?.people;
// 		},
// 		getOwnerInBoardId: (state) => {
// 			return (boardId: string) => state.board.find((board) => board.boardId === boardId)?.owner;
// 		},
// 	},
// });

// export const useTodolist = (boardId: string) => {
// 	const boardStore = useBoard();
// 	console.log(typeof boardId, "boardid");
// 	console.log(boardStore, "boardstore");
// 	const boardById = boardStore.getBoardById(boardId);
// 	console.log(boardById, "todolist");

// 	return defineStore(`todolist-${boardId}`, {
// 		state: function () {
// 			return {
// 				task: defaultData.tasks,
// 				columns: defaultData.columns,
// 				board: boardById,
// 			};
// 		},
// 		actions: {
// 			addColumn(columnName: string, boardId: string) {
// 				const length = this.columns.filter((column) => column.boardId === boardId).length;
// 				const findIndex = this.columns.findIndex((column) => column.boardId === boardId);
// 				this.columns.splice(findIndex + length, 0, {
// 					columnId: "column-" + (length + 1),
// 					columnName,
// 					boardId,
// 					taskIds: [],
// 				});
// 			},
// 			addTask(formTodoList: Task, columnId: string) {
// 				this.task.push({
// 					taskId: "task-" + (this.task.length + 1),
// 					taskName: formTodoList.taskName,
// 					priority: formTodoList.priority,
// 					dueDate: formatDate(formTodoList.dueDate),
// 					assignee: formTodoList.assignee,
// 				});

// 				const findIndex = this.columns.findIndex((column) => column.columnId === columnId);
// 				this.columns[findIndex].taskIds = [...this.columns[findIndex].taskIds, "task-" + this.task.length];
// 			},
// 			deleteTask(taskId: string) {
// 				console.log(taskId);
// 				this.task = this.task.filter((task) => task.taskId !== taskId);
// 				const findIndex = this.columns.findIndex((column) => column.taskIds.includes(taskId));
// 				const findIndexElementOfColumns = this.columns[findIndex].taskIds.findIndex((task) => task === taskId);
// 				this.columns[findIndex].taskIds.splice(findIndexElementOfColumns, 1);
// 				console.log(this.columns[findIndex], "column");
// 			},
// 			updateTask(taskId: string, formTodoList: Task) {
// 				const isTaskId = (task: Task) => task.taskId === taskId;
// 				const findIndex = this.task.findIndex(isTaskId);

// 				this.task.splice(findIndex, 1, {
// 					taskId,
// 					taskName: formTodoList.taskName,
// 					priority: formTodoList.priority,
// 					dueDate: formatDate(formTodoList.dueDate),
// 					assignee: formTodoList.assignee,
// 				});
// 			},
// 		},
// 		getters: {
// 			getTasks: (state) => {
// 				return state.task;
// 			},
// 			getTaskById: (state) => {
// 				return (taskId: string) => state.task.find((task) => task.taskId === taskId);
// 			},
// 			getAllColumnsByBoardId: (state) => {
// 				return (boardId: string) => state.columns.filter((column) => column.boardId === boardId);
// 			},
// 		},
// 	});
// };
// export const formatDate = (dateString?: string): string => {
// 	if (!dateString) return "";

// 	// Split the ISO format date (YYYY-MM-DD)
// 	const [year, month, day] = dateString.split("-");

// 	// Get last 2 digits of year
// 	const shortYear = year.slice(-2);

// 	// Return in DD-MM-YY format
// 	return `${day}-${month}-${shortYear}`;
// };

/*
[{"userId":"user-1","name":"John Doe","email":"john@example.com","password":"password123"},{"userId":"user-2","name":"Jane Smith","email":"jane@example.com","password":"password123"},{"userId":"user-3","name":"Henry Smith","email":"henry@yahoo.com","password":"password123"},{"userId":"user-4","name":"Jane Siisi","email":"gane@examole.com","password":"password123"},{"userId":"user-5","name":"Board User","email":"board@example.com","password":"password123"},{"userId":"user-6","name":"Laura","email":"laura@example.com","password":"password123"},{"userId":"user-7","name":"future","email":"future@example.com","password":"123456"}]
{"user-1":[{"board-1":{"boardName":"Project Roadmap","members":["user-2","user-5","user-6"],"columns":[{"column-1":{"columnName":"To Do","tasks":[{"task-1":{"taskName":"Design homepage","priority":"high","dueDate":"15-06-23","assignee":"user-2"}},{"task-3":{"taskName":"Implement authentication","priority":"high","dueDate":"10-07-23","assignee":"user-1"}},{"task-7":{"taskName":"Write unit tests","priority":"medium","dueDate":"25-06-23","assignee":"user-5"}}]}},{"column-2":{"columnName":"In Progress","tasks":[{"task-2":{"taskName":"Create API docs","priority":"medium","dueDate":"20-06-23","assignee":"user-5"}},{"task-8":{"taskName":"Fix bugs","priority":"low","dueDate":"30-06-23","assignee":"user-6"}}]}},{"column-3":{"columnName":"Done","tasks":[{"task-4":{"taskName":"Project planning","priority":"medium","dueDate":"01-06-23","assignee":"user-6"}}]}}]}}],"user-2":[{"board-2":{"boardName":"Vue Assignment","members":["user-3","user-4","user-5"],"columns":[{"column-4":{"columnName":"Done","tasks":[{"task-5":{"taskName":"Implement Vue components","priority":"high","dueDate":"10-06-23","assignee":"user-3"}}]}}]}}],"user-3":[{"board-3":{"boardName":"Personal Tasks","members":["user-4","user-6"],"columns":[]}}],"user-4":[{"board-4":{"boardName":"Code with coffee break","members":["user-2","user-5","user-6"],"columns":[{"column-5":{"columnName":"In Progress","tasks":[{"task-6":{"taskName":"Coffee break coding","priority":"low","dueDate":"12-06-23","assignee":"user-4"}}]}}]}}],"user-5":[],"user-6":[],"user-7":[{"board-10":{"boardName":"future","members":[],"columns":[]}},{"board-10":{"boardName":"future","members":[],"columns":[]}},{"board-10":{"boardName":"answer","members":[],"columns":[]}}]}
{"user-1":[{"board-1":{"boardName":"Project Roadmap","members":["user-2","user-5","user-6"],"columns":[{"column-1":{"columnName":"To Do","tasks":[{"task-1":{"taskName":"Design homepage","priority":"high","dueDate":"15-06-23","assignee":"user-2"}},{"task-3":{"taskName":"Implement authentication","priority":"high","dueDate":"10-07-23","assignee":"user-1"}},{"task-7":{"taskName":"Write unit tests","priority":"medium","dueDate":"25-06-23","assignee":"user-5"}}]}},{"column-2":{"columnName":"In Progress","tasks":[{"task-2":{"taskName":"Create API docs","priority":"medium","dueDate":"20-06-23","assignee":"user-5"}},{"task-8":{"taskName":"Fix bugs","priority":"low","dueDate":"30-06-23","assignee":"user-6"}}]}},{"column-3":{"columnName":"Done","tasks":[{"task-4":{"taskName":"Project planning","priority":"medium","dueDate":"01-06-23","assignee":"user-6"}}]}}]}}],"user-2":[{"board-2":{"boardName":"Vue Assignment","members":["user-3","user-4","user-5"],"columns":[{"column-4":{"columnName":"Done","tasks":[{"task-5":{"taskName":"Implement Vue components","priority":"high","dueDate":"10-06-23","assignee":"user-3"}}]}}]}}],"user-3":[{"board-3":{"boardName":"Personal Tasks","members":["user-4","user-6"],"columns":[]}}],"user-4":[{"board-4":{"boardName":"Code with coffee break","members":["user-2","user-5","user-6"],"columns":[{"column-5":{"columnName":"In Progress","tasks":[{"task-6":{"taskName":"Coffee break coding","priority":"low","dueDate":"12-06-23","assignee":"user-4"}}]}}]}}],"user-5":[],"user-6":[],"user-7":[{"board-10":{"boardName":"future","members":[],"columns":[]}},{"board-10":{"boardName":"future","members":[],"columns":[]}},{"board-10":{"boardName":"answer","members":[],"columns":[]}},{"board-10":{"boardName":"aqnswer","members":[],"columns":[]}},{"board-10":{"boardName":"soosos","members":[],"columns":[]}},{"board-10":{"boardName":"fiitirir","members":[],"columns":[]}},{"board-1746246160749":{"boardName":"firrier","members":[],"columns":[]}},{"board-1746246165382":{"boardName":"firriers[[[s[s[s","members":[],"columns":[]}}]}


{"user-1":[{"board-1":{"boardName":"Project Roadmap","members":["user-2","user-5","user-6"],"columns":[{"column-1":{"columnName":"To Do","tasks":[{"task-1":{"taskName":"Design homepage","priority":"high","dueDate":"15-06-23","assignee":"user-2"}},{"task-3":{"taskName":"Implement authentication","priority":"high","dueDate":"10-07-23","assignee":"user-1"}},{"task-7":{"taskName":"Write unit tests","priority":"medium","dueDate":"25-06-23","assignee":"user-5"}}]}},{"column-2":{"columnName":"In Progress","tasks":[{"task-2":{"taskName":"Create API docs","priority":"medium","dueDate":"20-06-23","assignee":"user-5"}},{"task-8":{"taskName":"Fix bugs","priority":"low","dueDate":"30-06-23","assignee":"user-6"}}]}},{"column-3":{"columnName":"Done","tasks":[{"task-4":{"taskName":"Project planning","priority":"medium","dueDate":"01-06-23","assignee":"user-6"}}]}}]}}],"user-2":[{"board-2":{"boardName":"Vue Assignment","members":["user-3","user-4","user-5"],"columns":[{"column-4":{"columnName":"Done","tasks":[{"task-5":{"taskName":"Implement Vue components","priority":"high","dueDate":"10-06-23","assignee":"user-3"}}]}}]}},{"board-1746246498226":{"boardName":"future","members":[],"columns":[]}},{"board-1746247031560":{"boardName":"pappappa","members":[],"columns":[]}},{"board-1746247050266":{"boardName":"","members":[],"columns":[]}},{"board-1746247055202":{"boardName":"pszpppappap","members":[],"columns":[]}}],"user-3":[{"board-3":{"boardName":"Personal Tasks","members":["user-4","user-6"],"columns":[]}}],"user-4":[{"board-4":{"boardName":"Code with coffee break","members":["user-2","user-5","user-6"],"columns":[{"column-5":{"columnName":"In Progress","tasks":[{"task-6":{"taskName":"Coffee break coding","priority":"low","dueDate":"12-06-23","assignee":"user-4"}}]}}]}}],"user-5":[],"user-6":[],"user-7":[{"board-10":{"boardName":"future","members":[],"columns":[]}},{"board-10":{"boardName":"future","members":[],"columns":[]}},{"board-10":{"boardName":"answer","members":[],"columns":[]}},{"board-10":{"boardName":"aqnswer","members":[],"columns":[]}},{"board-10":{"boardName":"soosos","members":[],"columns":[]}},{"board-10":{"boardName":"fiitirir","members":[],"columns":[]}},{"board-1746246160749":{"boardName":"firrier","members":[],"columns":[]}},{"board-1746246165382":{"boardName":"firriers[[[s[s[s","members":[],"columns":[]}},{"board-1746246459525":{"boardName":"pspspspps","members":[],"columns":[]}}]}

*/
