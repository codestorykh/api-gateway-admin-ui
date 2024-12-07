<script setup lang="ts">
import { RouterLink } from "vue-router";
import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "../ui/card";
</script>

<template>
  <div class="hidden border-r bg-muted/40 md:block">
    <div class="flex flex-col h-full max-h-screen gap-2">
      <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <RouterLink to="/" class="flex items-center gap-2 font-semibold">
          <Package2 class="w-6 h-6" />
          <span class="">Admin</span>
        </RouterLink>
        <Button variant="outline" size="icon" class="w-8 h-8 ml-auto">
          <Bell class="w-4 h-4" />
          <span class="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <div class="flex-1">
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
          <RouterLink
            to="/dashboard"
            exact-active-class="flex items-center gap-3 px-3 py-2 transition-all rounded-lg bg-muted text-primary hover:text-primary"
            class="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
          >
            <Home class="w-4 h-4" />
            Dashboard
          </RouterLink>
          <RouterLink
            to="/api-gateway"
            exact-active-class="flex items-center gap-3 px-3 py-2 transition-all rounded-lg bg-muted text-primary hover:text-primary"
            class="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
          >
            <Package class="w-4 h-4" />
            API Gateway
          </RouterLink>

          <a
            href="#"
            class="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
          >
            <Users class="w-4 h-4" />
            User
          </a>
          <a
            href="#"
            class="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
          >
            <LineChart class="w-4 h-4" />
            Analytics
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>
