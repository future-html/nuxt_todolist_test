<template>
	<h2>
		Login
		<form
			@submit.prevent="handleSubmit"
			action=""
		>
			<input
				type="email"
				name=""
				id=""
				placeholder="enter email"
				v-model="form.email"
			/>
			<input
				placeholder="enter password"
				type="password"
				name=""
				id=""
				v-model="form.password"
			/>
			<button type="submit">Submit</button>
		</form>
		{{ formResponse }}
	</h2>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: "board",
});
import { useAuth } from "~/store/useTask";

const authStore = useAuth();

const formResponse = ref<string | undefined>("");

const form = reactive({ email: "", password: "" });
const handleSubmit = () => {
	const errorResponse = authStore.login(form.email, form.password);
	formResponse.value = errorResponse;
	if (formResponse.value) {
		return;
	}
	navigateTo("/board");
};
</script>
