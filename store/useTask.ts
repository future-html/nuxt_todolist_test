import { defineStore } from "pinia";
import { defaultData, normalizedData } from "~/lib/data";
import type { Board, Column, NormalizedKanbanData, User } from "~/lib/data";

export const useAuth = defineStore("auth", {
	state: () => ({
		users: defaultData.users as User[],
		boards: normalizedData.boards,
		columns: normalizedData.columns,
		tasks: normalizedData.tasks,
	}),
	actions: {
		loadInitialData() {
			if (process.client) {
				const storedUsers = localStorage.getItem("users");
				if (storedUsers) {
					this.users = JSON.parse(storedUsers);
				}

				const storedBoard = localStorage.getItem("board");
				if (storedBoard) {
					this.boards = JSON.parse(storedBoard);
				} else if (!storedBoard) {
					this.boards = normalizedData.boards; // if no board then set to default
					localStorage.setItem("board", JSON.stringify(this.boards));
				}
				const storedColumn = localStorage.getItem("column");
				if (storedColumn) {
					this.columns = JSON.parse(storedColumn);
				} else if (!storedColumn) {
					this.columns = normalizedData.columns; // if no column then set to default
					localStorage.setItem("column", JSON.stringify(this.columns));
				}
				const storedTasks = localStorage.getItem("tasks");
				if (storedTasks) {
					this.tasks = JSON.parse(storedTasks);
				} else if (!storedTasks) {
					this.tasks = normalizedData.tasks; // if no tasks then set to default
					localStorage.setItem("tasks", JSON.stringify(this.tasks));
				}
			}
		}, // todo initial load from localStorage
		register(name: string, email: string, password: string) {
			this.loadInitialData();
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
				return; // register if there is no problem so route to
			}

			// this.users.push({ userId: "user-" + this.users.length + 1, name, email, password });
		},
		login(email: string, password: string) {
			this.loadInitialData();
			if (!process.client) {
				return "Client side only";
			}
			const storedUsers = localStorage.getItem("users");
			if (storedUsers) {
				this.users = JSON.parse(storedUsers);
			} // get user from localStorage
			const findUser = this.users.find((user: User) => user.email === email && user.password === password);
			if (!findUser) {
				return "Register first";
			} // findUser
			const existingEmailUser = this.users.find((user: User) => user.email === email && user.password !== password);
			if (existingEmailUser) {
				return "User already exists and incorrect password";
			} // if password mismatch then return error
			localStorage.setItem("currentUser", JSON.stringify(findUser.userId));

			const storedBoard = localStorage.getItem("board");
			if (storedBoard) {
				this.boards = JSON.parse(storedBoard);
			} else if (!storedBoard) {
				this.boards = normalizedData.boards; // if no board then set to default
				localStorage.setItem("board", JSON.stringify(this.boards));
			}
			const storedColumn = localStorage.getItem("column");
			if (storedColumn) {
				this.columns = JSON.parse(storedColumn);
			} else if (!storedColumn) {
				this.columns = normalizedData.columns; // if no column then set to default
				localStorage.setItem("column", JSON.stringify(this.columns));
			}
			const storedTasks = localStorage.getItem("tasks");
			if (storedTasks) {
				this.tasks = JSON.parse(storedTasks);
			} else if (!storedTasks) {
				this.tasks = normalizedData.tasks; // if no tasks then set to default
				localStorage.setItem("tasks", JSON.stringify(this.tasks));
			}
			// if user are not exist in board // create the board update in useBoard cause this hook can get variable

			// [{"user-7": []}]
			// then load in useBoard
		},
		logout() {
			if (!process.client) {
				return;
			}
			localStorage.removeItem("currentUser"); // just remove current user
		},
	},
	getters: {
		getUserInfoById: (state) => (userId: string) => {
			if (process.client) {
				const storedUsers = localStorage.getItem("users");
				if (storedUsers) {
					state.users = JSON.parse(storedUsers);
				}

				// const name = state.users[findUser].name;
				// const email = state.users[findUser].email;
				// return { name, email };
			}
		},
		getAllUserId: (state) => () => {
			return state.users.map((user: User) => user.userId);
		}, // return array of userId
	},
});

export const useBoard = defineStore("board", {
	state: () => ({
		boards: normalizedData.boards,
		columns: normalizedData.columns,
		tasks: normalizedData.tasks,
	}),
	actions: {
		loadInitialBoardData() {
			if (process.client) {
				const savedBoard = localStorage.getItem("board");

				// const savedColumns = localStorage.getItem("column");
				// const savedTask = localStorage.getItem("task");
				this.boards = savedBoard ? JSON.parse(savedBoard) : normalizedData.boards;
				// this.columns = savedColumns ? JSON.parse(savedColumns) : normalizedData.columns;
				// this.tasks = savedTask ? JSON.parse(savedTask) : normalizedData.tasks;
			}
		},
		addItem(boardName: string, members: string[]) {
			this.loadInitialBoardData();
			if (process.client) {
				const itemForManageMent = "board";
				const userId = localStorage.getItem("currentUser") || "";
				const parsedUserId = JSON.parse(userId);

				const originalBoard = [...this.boards];
				originalBoard.push({
					boardId: `board-${Math.floor(Math.random() * 20000000000000)}`, // generated by math.random
					boardName: boardName,
					owner: parsedUserId,
					members: members,
					columnIds: [], // unknown, boardName
				});
				this.boards = originalBoard;
				localStorage.setItem("board", JSON.stringify(originalBoard));
			}
		},
		deleteItem() {
			const boardId = "board-6"; // pass the arguments
			this.loadInitialBoardData();
			if (process.client) {
				const itemForManageMent = "board";

				const originalBoard = [...this.boards];
				const indexToDelete = originalBoard.findIndex((board) => board.boardId === boardId);
				console.log(indexToDelete);

				originalBoard.splice(indexToDelete, 1);
				console.log(originalBoard, "originalBoard");

				this.boards = originalBoard;
				localStorage.setItem("board", JSON.stringify(this.boards));
			}
		},
		updateItem() {
			const boardId = "board-6";
			this.loadInitialBoardData();
			if (process.client) {
				const itemForManageMent = "board";
			}
		}, // want to do ????
	},
	getters: {
		getBoards: (state) => () => {
			if (!process.client) {
				return;
			}
			const userId = localStorage.getItem("currentUser")!;
			const parseUserId = JSON.parse(userId);

			const savedBoards = localStorage.getItem("board");
			const getDataFromLocalStorage: NormalizedKanbanData["boards"] = savedBoards
				? JSON.parse(savedBoards)
				: normalizedData.boards;
			state.boards = getDataFromLocalStorage;
			console.log(getDataFromLocalStorage, "from localStorage");
			const owner = state.boards.filter((board) => board.owner === parseUserId);
			const members = state.boards.filter((board) => board.members.includes(parseUserId));
			console.log(owner, "owner");
			console.log(members, "members");
			return [...owner, ...members];
		},
		getColumns: (state) => (boardId: string) => {
			// const boardId = "board-1"; // Nuxtlink params
			const boardSelectedClickNextPage = state.boards.find((board) => board.boardId === boardId) as Board;
			const columnIds = boardSelectedClickNextPage["columnIds"];
			// console.log(columnIds); // ['column-1', 'column-2']
			const columnsInfoSelected = state.columns.filter((column) => columnIds.includes(column.columnId));
			return columnsInfoSelected; // return array of column object
			// state.columns.filter((column) => );
		},
		getTasks: (state) => (columnId: string) => {
			// const columnId = "column-1";
			const selectedColumn = state.columns.find((column) => column.columnId === columnId) as Column;
			const taskIds = selectedColumn["taskIds"];
			const taskInfoSelected = state.tasks.filter((task) => taskIds.includes(task.taskId));
			return taskInfoSelected; // return array of task object
		},
		getEditBoardInitialInfo: (state) => (boardId: string) => {
			return state.boards.find((board) => board.boardId === boardId);
		},
	},
});
//
/*


try to tell the type don't think in mind try to grasp the information u understand as least as possible.
crud operation then optimization
[{"userId":"user-1","boards":[{"boardId":"board-1","boardName":"Website Redesign","members":["user-2","user-5"],"columns":[{"columnId":"column-1","columnName":"Backlog","tasks":[{"taskId":"task-1","taskName":"UI Wireframes","priority":"high","dueDate":"2023-08-15","assignee":"user-1","tags":["design","ux"]}]},{"columnId":"column-2","columnName":"In Progress","tasks":[{"taskId":"task-2","taskName":"Homepage Development","priority":"high","dueDate":"2023-08-18","assignee":"user-5","tags":["frontend"]}]}]},{"boardId":"board-2","boardName":"Mobile App","members":["user-3"],"columns":[{"columnId":"column-3","columnName":"Sprint Backlog","tasks":[{"taskId":"task-3","taskName":"User Authentication","priority":"high","dueDate":"2023-08-20","assignee":"user-1","tags":["security"]}]}]},{"boardId":"board-12345","boardName":"something","members":[]},{"boardId":"board-12345","boardName":"something","members":[]},{"boardId":"board-12345","boardName":"something","members":[]}]},{"userId":"user-2","boards":[{"boardId":"board-3","boardName":"Marketing Q3","members":["user-1","user-4"],"columns":[{"columnId":"column-4","columnName":"Campaigns","tasks":[{"taskId":"task-4","taskName":"Social Media Strategy","priority":"medium","dueDate":"2023-07-30","assignee":"user-2","tags":["content"]}]}]},{"boardId":"board-4","boardName":"Product Launch","members":["user-3","user-5"],"columns":[{"columnId":"column-5","columnName":"Timeline","tasks":[{"taskId":"task-5","taskName":"Press Release","priority":"high","dueDate":"2023-08-10","assignee":"user-4","tags":["public-relations"]}]}]}]},{"userId":"user-3","boards":[{"boardId":"board-5","boardName":"Content Calendar","members":["user-2"],"columns":[{"columnId":"column-6","columnName":"Drafts","tasks":[{"taskId":"task-6","taskName":"React Tutorial","priority":"low","dueDate":"2023-08-05","assignee":"user-3","tags":["technical-writing"]}]}]}]},{"userId":"user-4","boards":[{"boardId":"board-6","boardName":"Design Projects","members":["user-1","user-2"],"columns":[{"columnId":"column-7","columnName":"Requests","tasks":[{"taskId":"task-7","taskName":"Logo Redesign","priority":"high","dueDate":"2023-08-01","assignee":"user-4","tags":["branding"]}]},{"columnId":"column-8","columnName":"Completed","tasks":[{"taskId":"task-8","taskName":"Business Cards","priority":"medium","dueDate":"2023-07-25","assignee":"user-4","tags":["print"]}]}]},{"boardId":"board-7","boardName":"UX Research","members":["user-3"],"columns":[{"columnId":"column-9","columnName":"Findings","tasks":[{"taskId":"task-9","taskName":"User Interviews","priority":"medium","dueDate":"2023-08-12","assignee":"user-4","tags":["research"]}]}]},{"boardId":"board-8","boardName":"Design System","members":["user-1","user-5"],"columns":[{"columnId":"column-10","columnName":"Components","tasks":[{"taskId":"task-10","taskName":"Button Styles","priority":"low","dueDate":"2023-08-22","assignee":"user-4","tags":["ui-components"]}]}]}]}]

[{"userId":"user-1","boards":[{"boardId":"board-1","boardName":"Website Redesign","members":["user-2","user-5"],"columns":[{"columnId":"column-1","columnName":"Backlog","tasks":[{"taskId":"task-1","taskName":"UI Wireframes","priority":"high","dueDate":"2023-08-15","assignee":"user-1","tags":["design","ux"]}]},{"columnId":"column-2","columnName":"In Progress","tasks":[{"taskId":"task-2","taskName":"Homepage Development","priority":"high","dueDate":"2023-08-18","assignee":"user-5","tags":["frontend"]}]}]},{"boardId":"board-2","boardName":"Mobile App","members":["user-3"],"columns":[{"columnId":"column-3","columnName":"Sprint Backlog","tasks":[{"taskId":"task-3","taskName":"User Authentication","priority":"high","dueDate":"2023-08-20","assignee":"user-1","tags":["security"]}]}]}]},{"userId":"user-2","boards":[{"boardId":"board-3","boardName":"Marketing Q3","members":["user-1","user-4"],"columns":[{"columnId":"column-4","columnName":"Campaigns","tasks":[{"taskId":"task-4","taskName":"Social Media Strategy","priority":"medium","dueDate":"2023-07-30","assignee":"user-2","tags":["content"]}]}]},{"boardId":"board-4","boardName":"Product Launch","members":["user-3","user-5"],"columns":[{"columnId":"column-5","columnName":"Timeline","tasks":[{"taskId":"task-5","taskName":"Press Release","priority":"high","dueDate":"2023-08-10","assignee":"user-4","tags":["public-relations"]}]}]}]},{"userId":"user-3","boards":[{"boardId":"board-5","boardName":"Content Calendar","members":["user-2"],"columns":[{"columnId":"column-6","columnName":"Drafts","tasks":[{"taskId":"task-6","taskName":"React Tutorial","priority":"low","dueDate":"2023-08-05","assignee":"user-3","tags":["technical-writing"]}]}]}]},{"userId":"user-4","boards":[{"boardId":"board-6","boardName":"Design Projects","members":["user-1","user-2"],"columns":[{"columnId":"column-7","columnName":"Requests","tasks":[{"taskId":"task-7","taskName":"Logo Redesign","priority":"high","dueDate":"2023-08-01","assignee":"user-4","tags":["branding"]}]},{"columnId":"column-8","columnName":"Completed","tasks":[{"taskId":"task-8","taskName":"Business Cards","priority":"medium","dueDate":"2023-07-25","assignee":"user-4","tags":["print"]}]}]},{"boardId":"board-7","boardName":"UX Research","members":["user-3"],"columns":[{"columnId":"column-9","columnName":"Findings","tasks":[{"taskId":"task-9","taskName":"User Interviews","priority":"medium","dueDate":"2023-08-12","assignee":"user-4","tags":["research"]}]}]},{"boardId":"board-8","boardName":"Design System","members":["user-1","user-5"],"columns":[{"columnId":"column-10","columnName":"Components","tasks":[{"taskId":"task-10","taskName":"Button Styles","priority":"low","dueDate":"2023-08-22","assignee":"user-4","tags":["ui-components"]}]}]}]}]

*/
