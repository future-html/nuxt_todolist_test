import { defineStore } from "pinia";
import { defaultData, JSONtodolistData } from "~/lib/data";
import type { User, KanbanData } from "~/lib/data";
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

const savedData = (key: string, value: any) => {
	// type any cause problem when deploy but no affect run dev I'll do it later
	if (process.client) {
		localStorage.setItem(key, JSON.stringify(value));
	}
};

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
		loadInitialData() {
			if (process.client) {
				const storedUsers = localStorage.getItem("users");
				if (storedUsers) {
					this.users = JSON.parse(storedUsers);
				}

				const storedBoard = localStorage.getItem("board");
				if (storedBoard) {
					this.board = JSON.parse(storedBoard);
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
		getAllUserId: (state) => () => {
			if (process.client) {
				return state.users.map((user: User) => user.userId);
			}
		}, // return array of userId
	},
});

export const useBoard = defineStore("board", {
	state: () => ({
		board: JSONtodolistData as KanbanData,
	}),
	actions: {
		loadBoardInitialData() {
			if (process.client) {
				const storedBoard = localStorage.getItem("board");
				const currentUser = localStorage.getItem("currentUser");
				// if no currentuser then add and set storage
				const parsedBoard = JSON.parse(storedBoard!) ?? JSONtodolistData;
				this.board = parsedBoard;
				// if not found then add and update the user;
			}
		},
		addBoard(boardId: string, boardName: string, owner: string) {
			// const authStore = useAuth(); can use hook to the other hook like react,ts
			if (process.client) {
				const savedData = localStorage.getItem("board");
				this.board = JSON.parse(savedData ?? JSON.stringify(JSONtodolistData));

				// 	this.board[owner].push({ [boardId]: { boardName, members: [], columns: [] } });

				localStorage.setItem("board", JSON.stringify(this.board));
				// changes of reactivity
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
		getBoardCurrentUser: (state) => () => {
			if (process.client) {
				const currentUser = localStorage.getItem("currentUser");
				console.log(currentUser, "current user");
				if (!currentUser) {
					return null;
				}

				const owner = state.board.find((board) => board.userId === currentUser); // board of owner only

				const memberBoard = state.board.filter((board) => {
					return (
						board.boards &&
						board.boards!.filter((inforBoard) => {
							return inforBoard.members.includes(currentUser);
						})
					);
				}); // board of member

				if (!owner && memberBoard.length === 0) {
					return null; // if no board found for current user
				} else if (!owner && memberBoard.length > 0) {
					return memberBoard; // if no owner board but have member board
				} else if (owner && memberBoard.length === 0) {
					return [owner]; // if have owner board but no member board
				}

				return [...[owner], ...memberBoard]; // combine both owner and member boards
				// [{ boardId: "board-1", boardName: "Project Roadmap", members: ["user-2", "user-5", "user-6"] }] ==> result should be

				/* 

				const owner = [{boardId:, ....}] ==> key = owner
				const member = loop that member include currentUserId 
				loop the user id list ==> get all list of user from useAuth; 
				
				*/
				//const owner = state.board[currentUser] ?? [];
				// if no
			}

			return null;
		},
		getColumnFromBoardId: (state) => (boardId: string) => {
			if (process.client) {
				const currentUser = localStorage.getItem("currentUser");
				console.log(currentUser, "current user");
				if (!currentUser) {
					return null;
				}

				const owner = state.board.find((board) => board.userId === currentUser);
				// board of owner only

				// extend to find

				const ownerColumns = owner?.boards?.find((board) => board.boardId === boardId)?.columns || [];

				const memberBoard = state.board.filter((board) => {
					return (
						board.boards &&
						board.boards!.filter((inforBoard) => {
							return inforBoard.members.includes(currentUser);
						})
					);
				}); // board of member

				const memberColumns = memberBoard.flatMap((board) => {
					return board.boards?.find((b) => b.boardId === boardId)?.columns || [];
				}); // get columns from member boards

				if (!owner && memberColumns.length === 0) {
					return null; // if no columns found for current user
				} else if (!owner && memberColumns.length > 0) {
					return memberColumns; // if no owner columns but have member columns
				} else if (owner && memberColumns.length === 0) {
					return ownerColumns; // if have owner columns but no member columns
				}
				return [...ownerColumns, ...memberColumns]; // combine both owner and member columns
			}
		},
	},
});

/*


try to tell the type don't think in mind try to grasp the information u understand as least as possible.
crud operation then optimization
*/
