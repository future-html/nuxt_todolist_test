<template>
	<ContainerScreen>
		<div class="mx-auto my-auto h-[calc(100vh-4rem)] flex items-center justify-center">
			<form
				@submit.prevent="handleSubmit"
				action=""
				class="border-2 w-[24rem] p-6 flex justify-center flex-col"
			>
				<h2 class="text-2xl font-normal text-center">Login</h2>
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
					Don't have an account?
					<NuxtLink
						to="/signup"
						class="text-green-500 hover:underline mt-4"
					>
						Sign up
					</NuxtLink>
				</span>
			</form>
		</div>

		{{ formResponse }}
	</ContainerScreen>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: "board",
});
import { useAuth } from "~/store/useTask";
import { ContainerScreen } from "#components";
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
