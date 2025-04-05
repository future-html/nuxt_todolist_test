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
		{{ responseFormAuth }}
	</h2>
</template>

<script setup>
import { useAuth } from "~/store/useTask";

const authStore = useAuth();

const responseFormAuth = ref("");

const form = reactive({ email: "", password: "" });
const handleSubmit = () => {
	const response = authStore.login(form.email, form.password);
	responseFormAuth.value = response;
	console.log(response, "response");
};
</script>
