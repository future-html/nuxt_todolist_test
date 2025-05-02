<template>
	<h2>
		Signup
		<form
			@submit.prevent="handleRegister"
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
const handleRegister = () => {
	const response = authStore.register(form.email, form.password);
	console.log(response);
	if (response) {
		responseFormAuth.value = response;
	}
};
</script>
