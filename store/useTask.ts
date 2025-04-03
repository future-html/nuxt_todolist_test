import { defineStore } from "pinia";
import { defaultData } from "~/lib/data";

export const useTodolist = defineStore("todolist", {
	state: () => ({
		board: defaultData.boards,
		columns: defaultData.columns,
		tasks: defaultData.tasks,
		users: defaultData.users,
	}),
	actions: {
		addBoard(boardId: string, boardName: string, people: string[] | [], owner: string) {
			this.board.push({ boardId, boardName, people, owner });
			console.log("push sucessfully");
			console.log(this.board);
		},
		deleteBoard() {},
		updateBoard() {},
	},
	getters: {
		getBoardId: (state) => {
			return (boardId: string) => state.board.find((board) => board.boardId === boardId);
		}, // pass the paramters too {{ JSON.stringify(storeTodolist.getBoardId("board-1")) }}
		getBoard: (state) => {
			return state.board;
		}, //{{ JSON.stringify(storeTodolist.getBoard) }}
	},
});
