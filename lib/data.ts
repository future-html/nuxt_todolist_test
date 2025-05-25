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

// Complete type for your entire data structure
export interface Task {
	taskId: string;
	taskName: string;
	priority: "low" | "medium" | "high";
	dueDate: string; // Consider using Date type if you'll parse it
	assignee: string;
	tags?: string[]; // Optional tags for tasks
}

interface Column {
	columnId: string;
	columnName: string;
	tasks?: Task[];
}

export interface Board {
	boardId: string;
	boardName: string;
	members: string[];
	columns?: Column[];
}

interface UserData {
	userId: string;
	boards: Board[];
}

export type KanbanData = UserData[];
export const allPeople = defaultData.users.map((user) => user.userId);
export const JSONtodolistData: KanbanData = [
	{
		userId: "user-1",

		boards: [
			{
				boardId: "board-1",
				boardName: "Website Redesign",
				members: ["user-2", "user-5"],
				columns: [
					{
						columnId: "column-1",
						columnName: "Backlog",
						tasks: [
							{
								taskId: "task-1",
								taskName: "UI Wireframes",
								priority: "high",
								dueDate: "2023-08-15",
								assignee: "user-1",
								tags: ["design", "ux"],
							},
						],
					},
					{
						columnId: "column-2",
						columnName: "In Progress",
						tasks: [
							{
								taskId: "task-2",
								taskName: "Homepage Development",
								priority: "high",
								dueDate: "2023-08-18",
								assignee: "user-5",
								tags: ["frontend"],
							},
						],
					},
				],
			},
			{
				boardId: "board-2",
				boardName: "Mobile App",
				members: ["user-3"],
				columns: [
					{
						columnId: "column-3",
						columnName: "Sprint Backlog",
						tasks: [
							{
								taskId: "task-3",
								taskName: "User Authentication",
								priority: "high",
								dueDate: "2023-08-20",
								assignee: "user-1",
								tags: ["security"],
							},
						],
					},
				],
			},
		],
	},
	{
		userId: "user-2",

		boards: [
			{
				boardId: "board-3",
				boardName: "Marketing Q3",
				members: ["user-1", "user-4"],
				columns: [
					{
						columnId: "column-4",
						columnName: "Campaigns",
						tasks: [
							{
								taskId: "task-4",
								taskName: "Social Media Strategy",
								priority: "medium",
								dueDate: "2023-07-30",
								assignee: "user-2",
								tags: ["content"],
							},
						],
					},
				],
			},
			{
				boardId: "board-4",
				boardName: "Product Launch",
				members: ["user-3", "user-5"],
				columns: [
					{
						columnId: "column-5",
						columnName: "Timeline",
						tasks: [
							{
								taskId: "task-5",
								taskName: "Press Release",
								priority: "high",
								dueDate: "2023-08-10",
								assignee: "user-4",
								tags: ["public-relations"],
							},
						],
					},
				],
			},
		],
	},
	{
		userId: "user-3",

		boards: [
			{
				boardId: "board-5",
				boardName: "Content Calendar",
				members: ["user-2"],
				columns: [
					{
						columnId: "column-6",
						columnName: "Drafts",
						tasks: [
							{
								taskId: "task-6",
								taskName: "React Tutorial",
								priority: "low",
								dueDate: "2023-08-05",
								assignee: "user-3",
								tags: ["technical-writing"],
							},
						],
					},
				],
			},
		],
	},
	{
		userId: "user-4",

		boards: [
			{
				boardId: "board-6",
				boardName: "Design Projects",
				members: ["user-1", "user-2"],
				columns: [
					{
						columnId: "column-7",
						columnName: "Requests",
						tasks: [
							{
								taskId: "task-7",
								taskName: "Logo Redesign",
								priority: "high",
								dueDate: "2023-08-01",
								assignee: "user-4",
								tags: ["branding"],
							},
						],
					},
					{
						columnId: "column-8",
						columnName: "Completed",
						tasks: [
							{
								taskId: "task-8",
								taskName: "Business Cards",
								priority: "medium",
								dueDate: "2023-07-25",
								assignee: "user-4",
								tags: ["print"],
							},
						],
					},
				],
			},
			{
				boardId: "board-7",
				boardName: "UX Research",
				members: ["user-3"],
				columns: [
					{
						columnId: "column-9",
						columnName: "Findings",
						tasks: [
							{
								taskId: "task-9",
								taskName: "User Interviews",
								priority: "medium",
								dueDate: "2023-08-12",
								assignee: "user-4",
								tags: ["research"],
							},
						],
					},
				],
			},
			{
				boardId: "board-8",
				boardName: "Design System",
				members: ["user-1", "user-5"],
				columns: [
					{
						columnId: "column-10",
						columnName: "Components",
						tasks: [
							{
								taskId: "task-10",
								taskName: "Button Styles",
								priority: "low",
								dueDate: "2023-08-22",
								assignee: "user-4",
								tags: ["ui-components"],
							},
						],
					},
				],
			},
		],
	},
];
