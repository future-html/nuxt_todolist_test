// lib/localStorage.ts
export type User = {
	userId: string;
	name: string;
	email: string;
	password: string;
};

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
};
console.log(defaultData.users, "defaultData");
// Normalized Data Structure
// Normalized Data Structure with Arrays
export interface NormalizedKanbanData {
	boards: Board[];
	columns: Column[];
	tasks: Task[];
}

export interface Board {
	boardId: string;
	boardName: string;
	owner: string; // userId of the owner
	members: string[]; // array of userIds
	columnIds: string[]; // ordered array of columnIds
	createdAt?: string;
	updatedAt?: string;
}

export interface Column {
	columnId: string;
	columnName: string;
	// reference to parent board
	taskIds: string[]; // ordered array of taskIds
	position?: number; // for column ordering
}

export interface Task {
	taskId: string;
	taskName: string;
	// reference to parent column
	priority: "low" | "medium" | "high";
	dueDate: string;
	assignee: string; // userId
	tags: string[];
	description?: string;
	createdAt?: string;
	updatedAt?: string;
}

// Complete normalized data from your JSON
export const normalizedData: NormalizedKanbanData = {
	boards: [
		{
			boardId: "board-1",
			boardName: "Website Redesign",
			owner: "user-1",
			members: ["user-2", "user-5"],
			columnIds: ["column-1", "column-2"],
		},
		{
			boardId: "board-2",
			boardName: "Mobile App",
			owner: "user-1",
			members: ["user-3"],
			columnIds: ["column-3"],
		},
		{
			boardId: "board-3",
			boardName: "Marketing Q3",
			owner: "user-2",
			members: ["user-1", "user-4"],
			columnIds: ["column-4"],
		},
		{
			boardId: "board-4",
			boardName: "Product Launch",
			owner: "user-2",
			members: ["user-3", "user-5"],
			columnIds: ["column-5"],
		},
		{
			boardId: "board-5",
			boardName: "Content Calendar",
			owner: "user-3",
			members: ["user-2"],
			columnIds: ["column-6"],
		},
		{
			boardId: "board-6",
			boardName: "Design Projects",
			owner: "user-4",
			members: ["user-1", "user-2"],
			columnIds: ["column-7", "column-8"],
		},
		{
			boardId: "board-7",
			boardName: "UX Research",
			owner: "user-4",
			members: ["user-3"],
			columnIds: ["column-9"],
		},
		{
			boardId: "board-8",
			boardName: "Design System",
			owner: "user-4",
			members: ["user-1", "user-5"],
			columnIds: ["column-10"],
		},
	],

	columns: [
		{
			columnId: "column-1",
			columnName: "Backlog",

			taskIds: ["task-1"],
		},
		{
			columnId: "column-2",
			columnName: "In Progress",

			taskIds: ["task-2"],
		},
		{
			columnId: "column-3",
			columnName: "Sprint Backlog",

			taskIds: ["task-3"],
		},
		{
			columnId: "column-4",
			columnName: "Campaigns",

			taskIds: ["task-4"],
		},
		{
			columnId: "column-5",
			columnName: "Timeline",

			taskIds: ["task-5"],
		},
		{
			columnId: "column-6",
			columnName: "Drafts",

			taskIds: ["task-6"],
		},
		{
			columnId: "column-7",
			columnName: "Requests",

			taskIds: ["task-7"],
		},
		{
			columnId: "column-8",
			columnName: "Completed",

			taskIds: ["task-8"],
		},
		{
			columnId: "column-9",
			columnName: "Findings",

			taskIds: ["task-9"],
		},
		{
			columnId: "column-10",
			columnName: "Components",

			taskIds: ["task-10"],
		},
	],

	tasks: [
		{
			taskId: "task-1",
			taskName: "UI Wireframes",

			priority: "high",
			dueDate: "2023-08-15",
			assignee: "user-1",
			tags: ["design", "ux"],
		},
		{
			taskId: "task-2",
			taskName: "Homepage Development",

			priority: "high",
			dueDate: "2023-08-18",
			assignee: "user-5",
			tags: ["frontend"],
		},
		{
			taskId: "task-3",
			taskName: "User Authentication",

			priority: "high",
			dueDate: "2023-08-20",
			assignee: "user-1",
			tags: ["security"],
		},
		{
			taskId: "task-4",
			taskName: "Social Media Strategy",

			priority: "medium",
			dueDate: "2023-07-30",
			assignee: "user-2",
			tags: ["content"],
		},
		{
			taskId: "task-5",
			taskName: "Press Release",

			priority: "high",
			dueDate: "2023-08-10",
			assignee: "user-4",
			tags: ["public-relations"],
		},
		{
			taskId: "task-6",
			taskName: "React Tutorial",

			priority: "low",
			dueDate: "2023-08-05",
			assignee: "user-3",
			tags: ["technical-writing"],
		},
		{
			taskId: "task-7",
			taskName: "Logo Redesign",

			priority: "high",
			dueDate: "2023-08-01",
			assignee: "user-4",
			tags: ["branding"],
		},
		{
			taskId: "task-8",
			taskName: "Business Cards",

			priority: "medium",
			dueDate: "2023-07-25",
			assignee: "user-4",
			tags: ["print"],
		},
		{
			taskId: "task-9",
			taskName: "User Interviews",

			priority: "medium",
			dueDate: "2023-08-12",
			assignee: "user-4",
			tags: ["research"],
		},
		{
			taskId: "task-10",
			taskName: "Button Styles",

			priority: "low",
			dueDate: "2023-08-22",
			assignee: "user-4",
			tags: ["ui-components"],
		},
	],
};
