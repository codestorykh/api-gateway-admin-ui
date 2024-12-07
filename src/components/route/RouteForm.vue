<template>
  <form @submit.prevent="handleSubmit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- URI Input -->
      <div>
        <label for="uri" class="block text-sm font-medium">URI</label>
        <input
          type="text"
          id="uri"
          v-model="localFormData.uri"
          class="mt-1 p-2 w-full border rounded"
          required
        />
      </div>

      <!-- Path Input -->
      <div>
        <label for="path" class="block text-sm font-medium">Path</label>
        <input
          type="text"
          id="path"
          v-model="localFormData.path"
          class="mt-1 p-2 w-full border rounded"
          required
        />
      </div>

      <!-- Method Input -->
      <div>
        <label for="method" class="block text-sm font-medium">Method</label>
        <input
          type="text"
          id="method"
          v-model="localFormData.method"
          class="mt-1 p-2 w-full border rounded"
          required
        />
      </div>

      <!-- Description Input -->
      <div>
        <label for="description" class="block text-sm font-medium"
          >Description</label
        >
        <textarea
          id="description"
          v-model="localFormData.description"
          class="mt-1 p-2 w-full border rounded"
        ></textarea>
      </div>

      <!-- Status Input -->
      <div>
        <label for="status" class="block text-sm font-medium">Status</label>
        <select
          id="status"
          v-model="localFormData.status"
          class="mt-1 p-2 w-full border rounded"
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex justify-end mt-4">
      <button
        type="button"
        @click="cancel"
        class="px-4 py-2 bg-gray-500 text-white rounded-md mr-2 hover:bg-orange-500 transition-colors"
      >
        Cancel
      </button>
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md">
        Save
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { defineProps, defineEmits } from "vue";

// Props and Emits
defineProps({
  formData: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["submit", "cancel"]);

// Local Copy of Form Data
const localFormData = ref({ ...formData });

// Watch for Prop Changes
watch(
  () => formData,
  (newData) => {
    Object.assign(localFormData.value, newData);
  }
);

function handleSubmit() {
  emit("submit", localFormData.value);
}

function cancel() {
  emit("cancel");
}
</script>

<style scoped>
form {
  width: 100%;
}

label {
  font-weight: bold;
}

input,
textarea,
select {
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 14px;
}

button {
  cursor: pointer;
}

button:hover {
  background-color: #3182ce;
}

button:disabled {
  opacity: 0.6;
}
</style>
