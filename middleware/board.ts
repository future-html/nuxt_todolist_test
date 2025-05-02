export default defineNuxtRouteMiddleware(async (to) => {
	if (process.client) {
		const currentUser = localStorage.getItem("currentUser");
		if (currentUser) {
			return navigateTo("/board");
		}
	}
	return;
});
