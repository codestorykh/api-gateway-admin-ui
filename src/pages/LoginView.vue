<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const username = ref("");
const password = ref("");
const errorMessage = ref("");

const login = async () => {
  if (username.value === "" || password.value === "") {
    errorMessage.value = "Please enter username and password.";
    return;
  }
  try {
    await authStore.login({
      username: username.value,
      password: password.value,
    });
    router.push("/dashboard");
  } catch (error) {
    errorMessage.value = "Invalid username or password. Please try again.";
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl"></CardTitle>
        <div class="text-center mb-4">
          <CardTitle class="text-2xl">Login</CardTitle>
          <p class="text-gray-500">Please login to continue</p>
        </div>
      </CardHeader>
      <CardContent>
        <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
        <Label for="username">Username</Label>
        <Input id="username" v-model="username" type="text" />
        <Label for="password" class="mt-4">Password</Label>
        <Input id="password" v-model="password" type="password" />
      </CardContent>
      <CardFooter>
        <Button @click="login">Login</Button>
      </CardFooter>
    </Card>
  </div>
</template>
