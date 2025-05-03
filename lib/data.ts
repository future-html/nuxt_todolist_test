// lib/localStorage.ts
export type User = {
	userId: string;
	name: string;
	email: string;
	password: string;
};

// export type Board = {
// 	boardId: string;
// 	boardName: string;
// 	people: string[]; // user IDs (excluding owner)
// 	owner: string; // user ID
// };

// export type Column = {
// 	columnId: string;
// 	columnName: string;
// 	boardId: string;
// 	taskIds: string[]; // ordered list of task IDs
// };

// export type Task = {
// 	taskId: string;
// 	taskName: string;
// 	priority: "low" | "medium" | "high";
// 	dueDate: string; // dd-mm-yy format
// 	assignee: string; // user IDs
// };

// type AppData = {
// 	users: User[];
// 	boards: Board[];
// 	columns: Column[];
// 	tasks: Task[];
// };

export const defaultData = {
	users: [
		{
			userId: "user-1",
			name: "John Doe",
			email: "john@example.com",
			password: "password123",
		},
		{
			userId: "user-2",
			name: "Jane Smith",
			email: "jane@example.com",
			password: "password123",
		},
		{
			userId: "user-3",
			name: "Henry Smith",
			email: "henry@yahoo.com",
			password: "password123",
		},
		{
			userId: "user-4",
			name: "Jane Siisi",
			email: "gane@examole.com",
			password: "password123",
		},
		{
			userId: "user-5",
			name: "Board User",
			email: "board@example.com",
			password: "password123",
		},
		{
			userId: "user-6",
			name: "Laura",
			email: "laura@example.com",
			password: "password123",
		},
	],
	// boards: [
	// 	{
	// 		boardId: "board-1",
	// 		boardName: "Project Roadmap",
	// 		people: ["user-2", "user-5", "user-6"],
	// 		owner: "user-1",
	// 	},
	// 	{
	// 		boardId: "board-2",
	// 		boardName: "Vue Assignment",
	// 		people: ["user-3", "user-4", "user-5"],
	// 		owner: "user-2",
	// 	},
	// 	{
	// 		boardId: "board-3",
	// 		boardName: "Personal Tasks",
	// 		people: ["user-4", "user-6"],
	// 		owner: "user-3",
	// 	},
	// 	{
	// 		boardId: "board-4",
	// 		boardName: "Code with coffee break",
	// 		people: ["user-2", "user-5", "user-6"],
	// 		owner: "user-4",
	// 	},
	// ],
	// columns: [
	// 	// Board 1 columns
	// 	{
	// 		columnId: "column-1",
	// 		columnName: "To Do",
	// 		boardId: "board-1",
	// 		taskIds: ["task-1", "task-3", "task-7"],
	// 	},
	// 	{
	// 		columnId: "column-2",
	// 		columnName: "In Progress",
	// 		boardId: "board-1",
	// 		taskIds: ["task-2", "task-8"],
	// 	},
	// 	{
	// 		columnId: "column-3",
	// 		columnName: "Done",
	// 		boardId: "board-1",
	// 		taskIds: ["task-4"],
	// 	},
	// 	// Board 2 columns
	// 	{
	// 		columnId: "column-4",
	// 		columnName: "Done",
	// 		boardId: "board-2",
	// 		taskIds: ["task-5"],
	// 	},
	// 	// Board 4 columns
	// 	{
	// 		columnId: "column-5",
	// 		columnName: "In Progress",
	// 		boardId: "board-4",
	// 		taskIds: ["task-6"],
	// 	},
	// ],
	// tasks: [
	// 	// Board 1 tasks
	// 	{
	// 		taskId: "task-1",
	// 		taskName: "Design homepage",
	// 		priority: "high",
	// 		dueDate: "15-06-23",
	// 		assignee: "user-2", // Valid: user-2 is in board-1 people
	// 	},
	// 	{
	// 		taskId: "task-2",
	// 		taskName: "Create API docs",
	// 		priority: "medium",
	// 		dueDate: "20-06-23",
	// 		assignee: "user-5", // Valid: user-5 is in board-1 people
	// 	},
	// 	{
	// 		taskId: "task-3",
	// 		taskName: "Implement authentication",
	// 		priority: "high",
	// 		dueDate: "10-07-23",
	// 		assignee: "user-1", // Valid: user-1 is board-1 owner
	// 	},
	// 	{
	// 		taskId: "task-4",
	// 		taskName: "Project planning",
	// 		priority: "medium",
	// 		dueDate: "01-06-23",
	// 		assignee: "user-6", // Valid: user-6 is in board-1 people
	// 	},
	// 	// Board 2 tasks
	// 	{
	// 		taskId: "task-5",
	// 		taskName: "Implement Vue components",
	// 		priority: "high",
	// 		dueDate: "10-06-23",
	// 		assignee: "user-3", // Valid: user-3 is in board-2 people
	// 	},
	// 	// Board 4 tasks
	// 	{
	// 		taskId: "task-6",
	// 		taskName: "Coffee break coding",
	// 		priority: "low",
	// 		dueDate: "12-06-23",
	// 		assignee: "user-4", // Valid: user-4 is board-4 owner
	// 	},
	// 	{
	// 		taskId: "task-7",
	// 		taskName: "Write unit tests",
	// 		priority: "medium",
	// 		dueDate: "25-06-23",
	// 		assignee: "user-5", // Valid: user-5 is in board-1 people
	// 	},
	// 	{
	// 		taskId: "task-8",
	// 		taskName: "Fix bugs",
	// 		priority: "low",
	// 		dueDate: "30-06-23",
	// 		assignee: "user-6", // Valid: user-6 is in board-1 people
	// 	},
	// ],
};
console.log(defaultData.users, "defaultData");

// Validation function to check data integrity
// export function validateData(data: AppData): boolean {
// 	const validations = data.tasks.map((task) => {
// 		// Find the column containing this task
// 		const column = data.columns.find((col) => col.taskIds.includes(task.taskId));
// 		if (!column) return false;

// 		// Find the board this column belongs to
// 		const board = data.boards.find((b) => b.boardId === column.boardId);
// 		if (!board) return false;

// 		// Check if assignee is either owner or in people array
// 		const isValidAssignee = task.assignee === board.owner || board.people.includes(task.assignee);

// 		return isValidAssignee;
// 	});

// 	return validations.every((valid) => valid);
// }

// Check if current data is valid
//console.log("Data validation:", validateData(defaultData)); // Should be true

interface Task {
	taskName: string;
	priority: "low" | "medium" | "high";
	dueDate: string; // DD-MM-YY format
	assignee: string; // user ID
}

interface Column {
	columnName: string;
	tasks: Array<{
		[taskId: string]: Task;
	}>;
}

export interface Board {
	boardName: string;
	members: string[]; // array of user IDs
	columns: Array<{
		[columnId: string]: Column;
	}>;
}

export interface UserBoards {
	[boardId: string]: Board;
}

// interface UserData {
// 	[userId: string]: UserBoards[];
// }

// Complete type for your entire data structure
export interface KanbanData {
	[userId: string]: Array<{
		[boardId: string]: Board;
	}>;
}
export const allPeople = defaultData.users.map((user) => user.userId);
export const JSONtodolistData: KanbanData = {
	"user-1": [
		{
			"board-1": {
				boardName: "Project Roadmap",
				members: ["user-2", "user-5", "user-6"],
				columns: [
					{
						"column-1": {
							columnName: "To Do",
							tasks: [
								{
									"task-1": {
										taskName: "Design homepage",
										priority: "high",
										dueDate: "15-06-23",
										assignee: "user-2",
									},
								},
								{
									"task-3": {
										taskName: "Implement authentication",
										priority: "high",
										dueDate: "10-07-23",
										assignee: "user-1",
									},
								},
								{
									"task-7": {
										taskName: "Write unit tests",
										priority: "medium",
										dueDate: "25-06-23",
										assignee: "user-5",
									},
								},
							],
						},
					},
					{
						"column-2": {
							columnName: "In Progress",
							tasks: [
								{
									"task-2": {
										taskName: "Create API docs",
										priority: "medium",
										dueDate: "20-06-23",
										assignee: "user-5",
									},
								},
								{
									"task-8": {
										taskName: "Fix bugs",
										priority: "low",
										dueDate: "30-06-23",
										assignee: "user-6",
									},
								},
							],
						},
					},
					{
						"column-3": {
							columnName: "Done",
							tasks: [
								{
									"task-4": {
										taskName: "Project planning",
										priority: "medium",
										dueDate: "01-06-23",
										assignee: "user-6",
									},
								},
							],
						},
					},
				],
			},
		},
	],
	"user-2": [
		{
			"board-2": {
				boardName: "Vue Assignment",
				members: ["user-3", "user-4", "user-5"],
				columns: [
					{
						"column-4": {
							columnName: "Done",
							tasks: [
								{
									"task-5": {
										taskName: "Implement Vue components",
										priority: "high",
										dueDate: "10-06-23",
										assignee: "user-3",
									},
								},
							],
						},
					},
				],
			},
		},
	],
	"user-3": [
		{
			"board-3": {
				boardName: "Personal Tasks",
				members: ["user-4", "user-6"],
				columns: [],
			},
		},
	],
	"user-4": [
		{
			"board-4": {
				boardName: "Code with coffee break",
				members: ["user-2", "user-5", "user-6"],
				columns: [
					{
						"column-5": {
							columnName: "In Progress",
							tasks: [
								{
									"task-6": {
										taskName: "Coffee break coding",
										priority: "low",
										dueDate: "12-06-23",
										assignee: "user-4",
									},
								},
							],
						},
					},
				],
			},
		},
	],
	"user-5": [],
	"user-6": [],
};
