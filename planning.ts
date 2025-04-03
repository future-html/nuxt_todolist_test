// mock data and I want to store in localStorage only and what the data like it should be stored in localStorage
// - users {userId (make sure it's unique) it should be in format like user-number(make sure this number / id unique) something like that, name, email, password}[]
// - boards {boardName, boardId (make sure it's unique) it should be in format like board-number(make sure this number / id unique) something like that, people:[userId (not include owner)], owner:userId}[];
// - columns {boardId (make sure it's unique it should be in format like board-number(make sure this number / id unique) something like that), : {columnId, columnName}[]}[];
// - tasks {columnId (make sure it's unique it should be in format like column-number(make sure this number / id unique) something like that),: [list of taskId]}; // use splice to replace the old place to new column id but it should setstate in column when drag and drop the task to the other column and the other position
// - task {taskId (make sure it's unique), taskName: string, priority:'low'|'medium'|'high', status : 'todo'|'In progress'| 'completed', dueDate: 'dd-mm-yy', assignee:[userId (selected from people key in boards table and then display the username in jsx element)] } // optimization by when selected the board it will filter and taskId to display by two pointer or binary sort it's up to you.

// code web app nuxtjs (vue framework) and the data should be stored in hash map and I will tell the process down here.
// 1. when register web app will post data in users in register page
// 2. when sign in retrieve the data in users and get the response in sign in page
// 3. when sign in completed, it will show the user's board in board page (which mean user's info should stored in useContext for convenient) and include the board they are invited which mean if people are listed by userid so it should display board but it should write the owner (can be only one person) by find the userid and display name
// 4. when owner (and only owner can invite) invited other user so it push userid in boards table and key is people
// 5. when add column, columnId and columnName should be added in columns table
// 6. when add task, it should add tasks information including taskName, taskId, priority, status, dueDate. also add taskId in tasks whose key is columnId. and when add

// what topic vue should I learn before doing nuxt project I already setup nuxt with pinia already I am beginner of vue framework but I experience in react
// https://javascript.plainenglish.io/10-useful-custom-hooks-with-vue-js-37f0fd42ce0d
