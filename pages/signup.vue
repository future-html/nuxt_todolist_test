<template>
	<h2>
		Signup
		<form
			@submit.prevent="handleRegister"
			action=""
		>
			<input
				type="text"
				name=""
				id=""
				placeholder="enter name"
				v-model="form.name"
			/>
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
		{{ responseFormAuth }}
	</h2>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: "board",
});
import { useAuth } from "~/store/useTask";

const authStore = useAuth();

const responseFormAuth = ref<string>("");

const form = reactive({ name: "", email: "", password: "" });
const handleRegister = () => {
	const response = authStore.register(form.name, form.email, form.password);
	console.log(response);
	if (response) {
		responseFormAuth.value = response;
		return;
	}
	navigateTo("/login");
};
</script>
