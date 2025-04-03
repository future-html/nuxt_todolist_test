// lib/localStorage.ts
type User = {
	userId: string;
	name: string;
	email: string;
	password: string;
};

type Board = {
	boardId: string;
	boardName: string;
	people: string[]; // user IDs (excluding owner)
	owner: string; // user ID
};

type Column = {
	columnId: string;
	columnName: string;
	boardId: string;
	taskIds: string[]; // ordered list of task IDs
};

type Task = {
	taskId: string;
	taskName: string;
	priority: "low" | "medium" | "high";
	status: "todo" | "In progress" | "completed";
	dueDate: string; // dd-mm-yy format
	assignee: string[]; // user IDs
};

type AppData = {
	users: User[];
	boards: Board[];
	columns: Column[];
	tasks: Task[];
};

export const defaultData: AppData = {
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
	],
	boards: [
		{
			boardId: "board-1",
			boardName: "Project Roadmap",
			people: ["user-2"],
			owner: "user-1",
		},
	],
	columns: [
		{
			columnId: "column-1",
			columnName: "To Do",
			boardId: "board-1",
			taskIds: ["task-1", "task-2"],
		},
		{
			columnId: "column-2",
			columnName: "In Progress",
			boardId: "board-1",
			taskIds: ["task-3"],
		},
		{
			columnId: "column-3",
			columnName: "Done",
			boardId: "board-1",
			taskIds: [],
		},
	],
	tasks: [
		{
			taskId: "task-1",
			taskName: "Design homepage",
			priority: "high",
			status: "todo",
			dueDate: "15-06-23",
			assignee: ["user-1"],
		},
		{
			taskId: "task-2",
			taskName: "Create API docs",
			priority: "medium",
			status: "todo",
			dueDate: "20-06-23",
			assignee: ["user-2"],
		},
		{
			taskId: "task-3",
			taskName: "Implement auth",
			priority: "high",
			status: "In progress",
			dueDate: "10-06-23",
			assignee: ["user-1", "user-2"],
		},
	],
};
