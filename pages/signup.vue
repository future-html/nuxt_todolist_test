<template>
	<ContainerScreen>
		<div class="mx-auto my-auto h-[calc(100vh-4rem)] flex items-center justify-center">
			<form
				@submit.prevent="handleRegister"
				action=""
				class="border-2 w-[24rem] p-6 flex justify-center flex-col"
			>
				<h2 class="text-2xl font-normal text-center">Login</h2>
				<label
					for="name"
					class="mb-2"
					>Name</label
				>
				<input
					type="name"
					name="name"
					id=""
					placeholder="enter name"
					v-model="form.name"
					class="mb-4 px-3 py-2 border border-green-500"
				/>
				<label
					for="email"
					class="mb-2"
					>Email</label
				>
				<input
					type="email"
					name="email"
					id=""
					placeholder="enter email"
					v-model="form.email"
					class="mb-4 px-3 py-2 border border-green-500"
				/>
				<label
					for="password"
					class="mb-2"
					>Password</label
				>
				<input
					placeholder="enter password"
					type="password"
					name="password"
					id=""
					v-model="form.password"
					class="mb-4 px-3 py-2 border border-green-500"
				/>
				<button
					class="bg-green-600 py-2 mt-4"
					type="submit"
				>
					Submit
				</button>
				<span class="mt-4 text-center">
					Already have an account?
					<NuxtLink
						to="/login"
						class="text-green-500 hover:underline mt-4"
					>
						Sign in
					</NuxtLink>
				</span>
			</form>
		</div>
		{{ responseFormAuth }}
	</ContainerScreen>
	<!-- <h2>
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
		</form> -->
</template>

<script setup lang="ts">
definePageMeta({
	middleware: "board",
});
import { useAuth } from "~/store/useTask";
import { ContainerScreen } from "#components";
const authStore = useAuth();

const responseFormAuth = ref<string>("");

const form = reactive({ name: "", email: "", password: "" });
const handleRegister = () => {
	const response = authStore.register(form.name, form.email, form.password);
	// console.log(response);
	if (response) {
		responseFormAuth.value = response;
		return;
	}
	navigateTo("/login");
};
</script>
