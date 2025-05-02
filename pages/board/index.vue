<template>
	Board page

	<button @click="handleLogout()">Logout</button>
</template>
<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});

import { useAuth } from "~/store/useTask";
const authStore = useAuth();
const handleLogout = () => {
	authStore.logout();
	navigateTo("/login");
};
</script>
