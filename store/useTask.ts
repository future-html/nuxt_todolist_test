import { defineStore } from "pinia";
import { defaultData, normalizedData } from "~/lib/data";
import type { User } from "~/lib/data";
function saveData(key: string, value: string) {
	if (process.client) {
		localStorage.setItem(key, value);
	}
}

export const useAuth = defineStore("auth", {
	state: () => ({
		users: defaultData.users as User[],
	}),
	actions: {
		loadInitialData() {
			if (process.client) {
				const storedUsers = localStorage.getItem("users");
				if (storedUsers) {
					this.users = JSON.parse(storedUsers);
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
		getAllUser: (state) => () => {
			return state.users.map((user) => user.userId);
		},
	},
});

export const useBoard = defineStore("board", {
	state: () => ({
		boards: normalizedData.boards,
		columns: normalizedData.columns,
		tasks: normalizedData.tasks,
	}),

	actions: {
		addBoard(boardName: string, boardMember: string[]) {
			// console.log(boardName, boardMember);
			if (process.client) {
				const storeCurrentUser = localStorage.getItem("currentUser");
				const currentUser = storeCurrentUser ? JSON.parse(storeCurrentUser) : "";
				const newAddedBoards = [
					...this.boards,
					{
						boardId: `board-${Math.floor(Math.random() * 2000000000)}`,
						boardName: boardName,
						members: boardMember,
						owner: currentUser,
						columnIds: [],
					},
				];
				this.boards = newAddedBoards;
				saveData("board", JSON.stringify(this.boards));
			}
		},
		deleteBoard(boardId: string) {
			if (process.client) {
				const originalDeleteBoard = [...this.boards];
				const originalDeleteColumn = [...this.columns];
				const originalDeleteTask = [...this.tasks];
				const boardStore = useBoard();
				const columnGetByBoardId = boardStore.getColumnByBoardId(boardId); // [{columnId, columnName,....}]
				if (!columnGetByBoardId) {
					return;
				}
				const taskIds: string[][] = [];
				columnGetByBoardId?.forEach((column) => {
					taskIds.push([...column.taskIds]);
				});
				const taskIdsFlatted: string[] = taskIds.flat();
				console.log(taskIdsFlatted); // ['task-?', ....]

				// delete cascase board ==> column ==> task
				this.boards = originalDeleteBoard.filter((board) => board.boardId !== boardId);
				this.columns = originalDeleteColumn.filter((column) => !columnGetByBoardId.includes(column));
				this.tasks = originalDeleteTask.filter((task) => !taskIdsFlatted.includes(task.taskId));
				saveData("board", JSON.stringify(this.boards));
				saveData("column", JSON.stringify(this.columns));
				saveData("task", JSON.stringify(this.tasks));
			}
			console.log(boardId, "boardId");
		},
		editBoard(boardId: string, boardName: string, members: string[]) {
			console.log(boardId, boardName, members);
			const findIndexBoardWhereToUpdate = this.boards.findIndex((board) => board.boardId === boardId);
			const originalBoard = [...this.boards];
			originalBoard.splice(findIndexBoardWhereToUpdate, 1, {
				...originalBoard[findIndexBoardWhereToUpdate],
				boardId,
				boardName,
				members,
			});
			this.boards = originalBoard;
			saveData("board", JSON.stringify(this.boards));
		},
		addColumn(boardId: string, columnName: string) {
			console.log(this.columns.length);

			const columnId = `column-${Math.floor(Math.random() * 200000000000)}`;
			const originalBoard = [...this.boards];
			const findIndexBoardFromOriginalBoard = originalBoard.findIndex((board) => board.boardId === boardId);
			console.log(this.boards[findIndexBoardFromOriginalBoard].columnIds);
			const copyFindBoardAndUpdateColumnIds = {
				...originalBoard[findIndexBoardFromOriginalBoard],
				columnIds: [...originalBoard[findIndexBoardFromOriginalBoard].columnIds, columnId],
			};

			originalBoard.splice(findIndexBoardFromOriginalBoard, 1, copyFindBoardAndUpdateColumnIds);
			console.log(originalBoard[findIndexBoardFromOriginalBoard]);
			this.boards = originalBoard;
			console.log(this.boards[findIndexBoardFromOriginalBoard].columnIds);

			const toPushColumn = [...this.columns, { columnId, columnName, taskIds: [] }];

			this.columns = toPushColumn;
			console.log(this.columns);
			saveData("board", JSON.stringify(this.boards));
			saveData("column", JSON.stringify(this.columns));
		},
		deleteColumn(columnId: string) {
			const originalColumn = [...this.columns];
			const originalTask = [...this.tasks];
			const findIndexColumnForTaskIds = originalColumn.findIndex((column) => column.columnId === columnId);

			const filteredTaskFromOriginalTask = originalTask.filter((task) =>
				originalColumn[findIndexColumnForTaskIds].taskIds?.includes(task.taskId)
			);
			originalColumn.splice(findIndexColumnForTaskIds, 1);
			this.columns = originalColumn;
			this.tasks = filteredTaskFromOriginalTask;
			saveData("column", JSON.stringify(this.columns));
			saveData("task", JSON.stringify(this.tasks));
		},
		updateColumn(columnId: string, columnName: string) {
			const originalColumn = [...this.columns];
			const findIndexWhereToUpdateColumn = originalColumn.findIndex((column) => column.columnId === columnId);
			originalColumn.splice(findIndexWhereToUpdateColumn, 1, {
				...originalColumn[findIndexWhereToUpdateColumn],
				columnName,
			});
			this.columns = originalColumn;
			saveData("column", JSON.stringify(this.columns));
		},
		addTask(
			taskName: string,
			columnId: string,
			priority: "low" | "medium" | "high",
			dueDate: string,
			assignee: string
		) {
			const originalColumn = [...this.columns];
			const findIndexColumn = originalColumn.findIndex((column) => column.columnId === columnId);
			const taskId = `task-${Math.floor(Math.random() * 200000000000000)}`;
			const originalTask = [...this.tasks];
			originalColumn.splice(findIndexColumn, 1, {
				...originalColumn[findIndexColumn],
				taskIds: [...originalColumn[findIndexColumn].taskIds, taskId],
			});
			originalTask.push({ taskId, taskName, priority, dueDate, assignee, tags: [] });
			this.columns = originalColumn;
			this.tasks = originalTask;
			saveData("column", JSON.stringify(this.columns));
			saveData("task", JSON.stringify(this.tasks));
		},
		deleteTask(columnId: string, taskId: string) {},
		editTask() {},
		// inviteUser() {}, // if remove user then set state by spread operator
		// removeUser() {},
		changePositionTask(columnId: string, columnIdNewToReorder: string, taskId: string, position: number) {},
	},
	getters: {
		getBoardByUserId: (state) => () => {
			if (process.client) {
				const currentUser = localStorage.getItem("currentUser");
				const storedCurrentUserId = currentUser ? JSON.parse(currentUser) : "";
				const storedBoard = localStorage.getItem("board");
				state.boards = storedBoard ? JSON.parse(storedBoard) : normalizedData.boards;
				const filteredStordBoardByCurrentUser = state.boards.filter(
					(board) => board.owner === storedCurrentUserId || board.members?.includes(storedCurrentUserId)
				);
				return filteredStordBoardByCurrentUser;
			}
		},
		getColumnByBoardId: (state) => (boardId: string) => {
			if (process.client) {
				// maybe use computed in vue js cause this useBoard hook rendered every time
				const boardStore = localStorage.getItem("board");
				const userId = localStorage.getItem("currentUser");
				const currentUser = userId ? JSON.parse(userId) : "";
				state.boards = boardStore ? JSON.parse(boardStore) : normalizedData.boards;
				const columnIds = state.boards.find((board) => board.boardId === boardId)?.columnIds!;

				const columnStore = localStorage.getItem("column");
				state.columns = columnStore ? JSON.parse(columnStore) : normalizedData.columns;
				console.log(state.columns, "column");
				return state.columns.filter((column) => columnIds.length > 0 && columnIds?.includes(column.columnId));
			}

			// const getColumnIdsByBoardId = filteredStordBoardByCurrentUser?.filter((board) => board.boardId === boardId)
			// 	.map((board) => board.columnIds);
			// if (!getColumnIdsByBoardId) {
			// 	return;
			// }
			// const flatColumnIds = getColumnIdsByBoardId?.flat() ?? [];
			// const filteredColumnsInfoByColumnId = state.columns.filter((column) =>
			// 	flatColumnIds.includes(column.columnId)
			// );
			// return filteredColumnsInfoByColumnId;
		},

		getTaskByByColumnId: (state) => (columnId: string) => {
			if (process.client) {
				const boardStore = localStorage.getItem("board");
				const taskStore = localStorage.getItem("task");
				const columnStore = localStorage.getItem("column");
				state.boards = boardStore ? JSON.parse(boardStore) : normalizedData.boards;
				state.columns = columnStore ? JSON.parse(columnStore) : normalizedData.columns;
				state.tasks = taskStore ? JSON.parse(taskStore) : normalizedData.tasks;
				console.log(state.tasks, "tasks");
				const filteredColumnIdForTaskId = state.columns.find((column) => column.columnId === columnId)?.taskIds;

				console.log(filteredColumnIdForTaskId, "columnTaskIds");

				return state.tasks.filter((task) => {
					return filteredColumnIdForTaskId?.length! > 0 && filteredColumnIdForTaskId?.includes(task.taskId);
				});
			}
			// const boardStore = useBoard();
			// const filteredColumnsInfoByColumnId = boardStore.getColumnByBoardId(boardId);
			// const selectedColumnByColumnId = filteredColumnsInfoByColumnId?.filter(
			// 	(column) => column.columnId === columnId
			// );
			// const getTaskIdsByColumnId = selectedColumnByColumnId![0].taskIds;
			// if (!getTaskIdsByColumnId) {
			// 	return;
			// }
			// return state.tasks.filter((task) => getTaskIdsByColumnId.includes(task.taskId));
			// return state.tasks.find((task) => task.)
		},

		getEditFormByBoardOrColumnOrTaskId: (state) => (boardId?: string, columnId?: string, taskId?: string) => {
			return boardId
				? state.boards.find((board) => board.boardId === boardId)
				: columnId
				? state.columns.find((column) => column.columnId === columnId)
				: state.tasks.find((task) => task.taskId === taskId);
		},
		getMemberWhoCanBeAssigneeFromBoardId: (state) => (boardId: string) => {
			// return member
			if (process.client) {
				return [...state.boards.find((board) => board.boardId === boardId)?.members!];
			}
		},
		getInvitePeopleToJoinBoard: (state) => (boardId: string) => {
			if (process.client) {
				const board = state.boards.find((b) => b.boardId === boardId);
				const authStore = useAuth();
				const allUserInfo = authStore.getAllUser();
				return allUserInfo.filter((userId) => !board?.members?.includes(userId) && userId !== board?.owner);
			}
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
