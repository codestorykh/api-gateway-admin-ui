<template>
  <div>
    <!-- Create New Route Button -->
    <button
      @click="openModal"
      class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
    >
      Create New Route
    </button>

    <!-- Modal for Create and Edit -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <RouteForm
          :formData="formRoute"
          @submit="handleSubmit"
          @cancel="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RouteForm from "./RouteForm.vue";

// State
const isModalOpen = ref(false);
const formRoute = ref({
  uri: "",
  path: "",
  method: "",
  description: "",
  status: "ACTIVE",
});

// Methods
function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

function handleSubmit(route) {
  console.log("New Route Submitted:", route);
  closeModal();
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
}
</style>
