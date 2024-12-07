<script setup lang="ts">
import { ref, computed } from "vue";

// Sample data
const routes = ref([
  {
    id: 1,
    uri: "www.example.com",
    path: "/v1/api/routes",
    method: "GET",
    description: "Get all routes",
    status: "ACTIVE",
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",
  },
  {
    id: 2,
    uri: "www.example.com",
    path: "/v1/api/routes",
    method: "POST",
    description: "Create new route",
    status: "ACTIVE",
    createdAt: "2021-10-11",
    updatedAt: "2021-10-11",
  },
]);

const itemsPerPage = 5;
const currentPage = ref(1);

const totalPages = computed(() =>
  Math.ceil(routes.value.length / itemsPerPage)
);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return routes.value.slice(start, start + itemsPerPage);
});

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

// Modal state for creating/editing
const isModalOpen = ref(false);
const isEditing = ref(false); // For edit mode
const routeToEdit = ref(null);

const newRoute = ref({
  uri: "",
  method: "",
  description: "",
  status: "ACTIVE",
  createdAt: new Date().toISOString().split("T")[0],
  updatedAt: new Date().toISOString().split("T")[0],
});

// Modal handling
const openModal = (route = null) => {
  isModalOpen.value = true;

  if (route) {
    // If there's a route, we're editing
    isEditing.value = true;
    routeToEdit.value = route;
    newRoute.value = { ...route }; // Fill form with existing route data
  } else {
    // If there's no route, we're creating a new one
    isEditing.value = false;
    newRoute.value = {
      uri: "",
      path: "",
      method: "",
      description: "",
      status: "ACTIVE",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }; // Clear form for new route
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  routeToEdit.value = null;
};

// Save route (create or update)
const saveRoute = () => {
  if (isEditing.value) {
    const index = routes.value.findIndex(
      (route) => route.id === routeToEdit.value.id
    );
    if (index !== -1) {
      routes.value[index] = { ...newRoute.value };
    }
  } else {
    routes.value.push({ ...newRoute.value, id: routes.value.length + 1 });
  }
  closeModal();
};

// Delete route modal
const isDeleteModalOpen = ref(false);
const routeToDelete = ref(null);

const openDeleteModal = (route) => {
  routeToDelete.value = route;
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  routeToDelete.value = null;
};

const handleDelete = () => {
  if (routeToDelete.value) {
    const index = routes.value.findIndex(
      (route) => route.id === routeToDelete.value.id
    );
    if (index !== -1) {
      routes.value.splice(index, 1);
    }
  }
  closeDeleteModal();
};
</script>

<template>
  <div class="overflow-x-auto p-6 bg-gray-50 min-h-screen">
    <!-- Create/Edit Route Button -->
    <div class="mt-6 flex justify-end">
      <button
        @click="openModal"
        class="px-6 py-3 bg-teal-500 text-white rounded-lg shadow-lg hover:bg-teal-600 transition-all ease-in-out"
      >
        Create New Route
      </button>
    </div>

    <table class="min-w-full table-auto border-collapse text-sm mt-8">
      <caption class="text-xl font-semibold text-center my-4">
        API Gateway Routes
      </caption>
      <thead class="bg-teal-500 text-white">
        <tr>
          <th class="px-4 py-3 text-left">ID</th>
          <th class="px-4 py-3 text-left">URI</th>
          <th class="px-4 py-3 text-left">Path</th>
          <th class="px-4 py-3 text-left">Method</th>
          <th class="px-4 py-3 text-left">Description</th>
          <th class="px-4 py-3 text-left">Status</th>
          <th class="px-4 py-3 text-left">Created At</th>
          <th class="px-4 py-3 text-left">Updated At</th>
          <th class="px-4 py-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody class="text-gray-700">
        <tr
          v-for="route in paginatedData"
          :key="route.id"
          class="border-b hover:bg-gray-200"
        >
          <td class="px-4 py-3">{{ route.id }}</td>
          <td class="px-4 py-3">{{ route.uri }}</td>
          <td class="px-4 py-3">{{ route.path }}</td>
          <td class="px-4 py-3">{{ route.method }}</td>
          <td class="px-4 py-3">{{ route.description }}</td>
          <td class="px-4 py-3">{{ route.status }}</td>
          <td class="px-4 py-3">{{ route.createdAt }}</td>
          <td class="px-4 py-3">{{ route.updatedAt }}</td>
          <td class="px-4 py-3 space-x-2">
            <button
              @click="openModal(route)"
              class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all ease-in-out"
            >
              Edit
            </button>
            <button
              @click="openDeleteModal(route)"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all ease-in-out"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="flex justify-between items-center mt-6">
      <span class="text-sm text-center flex-grow"
        >Page {{ currentPage }} of {{ totalPages }}</span
      >
      <div class="flex space-x-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="isDeleteModalOpen"
      class="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h3 class="text-lg font-semibold text-center mb-4">
          Are you sure you want to delete this route?
        </h3>
        <div class="flex justify-center space-x-4">
          <button
            @click="handleDelete"
            class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all ease-in-out"
          >
            Confirm
          </button>
          <button
            @click="closeDeleteModal"
            class="px-6 py-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-all ease-in-out"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Route Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        class="bg-white p-8 rounded-lg shadow-xl w-11/12 md:w-3/4 lg:w-1/2 animate__animated animate__fadeIn"
      >
        <h2 class="text-2xl font-semibold mb-4 text-center text-teal-600">
          {{ isEditing ? "Edit Route" : "Create New Route" }}
        </h2>

        <form @submit.prevent="saveRoute">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="uri" class="block text-sm font-medium text-gray-700"
                >URI</label
              >
              <input
                type="text"
                id="uri"
                v-model="newRoute.uri"
                class="mt-1 p-3 w-full border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>
            <div class="mb-4">
              <label for="path" class="block text-sm font-medium text-gray-700"
                >Path</label
              >
              <input
                type="text"
                id="path"
                v-model="newRoute.path"
                class="mt-1 p-3 w-full border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="method"
                class="block text-sm font-medium text-gray-700"
                >Method</label
              >
              <input
                type="text"
                id="method"
                v-model="newRoute.method"
                class="mt-1 p-3 w-full border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="description"
                class="block text-sm font-medium text-gray-700"
                >Description</label
              >
              <textarea
                id="description"
                v-model="newRoute.description"
                class="mt-1 p-3 w-full border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 transition-all"
                rows="4"
                required
              ></textarea>
            </div>
            <div class="mb-4">
              <label
                for="status"
                class="block text-sm font-medium text-gray-700"
                >Status</label
              >
              <select
                id="status"
                v-model="newRoute.status"
                class="mt-1 p-3 w-full border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 transition-all"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>
          <div class="flex justify-between items-center mt-6">
            <button
              type="submit"
              class="px-6 py-3 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition-all ease-in-out"
            >
              Save
            </button>
            <button
              type="button"
              @click="closeModal"
              class="px-6 py-3 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400 transition-all ease-in-out"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
