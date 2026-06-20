<template>
  <div class="ascwo-lightings-page">
    <template v-if="!isEditorOpen">
      <section class="ascwo-lighting-card ascwo-lighting-header">
        <div>
          <h2>{{ __("Lighting", "all-signs-customizer-for-woocommerce-pro") }}</h2>
          <p>{{ __("Manage the global glow colors library used by simple and advanced material options.", "all-signs-customizer-for-woocommerce-pro") }}</p>
        </div>
        <button type="button" class="ascwo-primary-button" @click="openNewLighting">
          <PlusIcon />
          {{ __("Add new lighting", "all-signs-customizer-for-woocommerce-pro") }}
        </button>
      </section>

      <section class="ascwo-lighting-card ascwo-lighting-list-card">
        <h3>{{ __("Lighting List", "all-signs-customizer-for-woocommerce-pro") }}</h3>

        <div v-if="isFetching" class="ascwo-lighting-empty">
          <Loader2Icon class="ascwo-loader" />
        </div>

        <div v-else-if="lightings.items.length === 0" class="ascwo-lighting-empty">
          <SearchIcon class="ascwo-empty-icon" />
          <strong>{{ __("No lightings found", "all-signs-customizer-for-woocommerce-pro") }}</strong>
          <span>{{ __("Try changing the filters or search term", "all-signs-customizer-for-woocommerce-pro") }}</span>
        </div>

        <table v-else class="ascwo-lighting-table">
          <thead>
            <tr>
              <th>{{ __("Label", "all-signs-customizer-for-woocommerce-pro") }}</th>
              <th>{{ __("Color", "all-signs-customizer-for-woocommerce-pro") }}</th>
              <th>{{ __("Default", "all-signs-customizer-for-woocommerce-pro") }}</th>
              <th>{{ __("Additional price", "all-signs-customizer-for-woocommerce-pro") }}</th>
              <th>{{ __("Actions", "all-signs-customizer-for-woocommerce-pro") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in lightings.items" :key="item.id || index">
              <td class="ascwo-row-strong">{{ item.label }}</td>
              <td>
                <div class="ascwo-color-chip-row">
                  <span class="ascwo-color-chip" :style="{ backgroundColor: normalizeHex(item.hexCode) }"></span>
                  <span>{{ normalizeHex(item.hexCode) }}</span>
                </div>
              </td>
              <td>
                <div class="ascwo-default-control">
                  <span>{{ __("No", "all-signs-customizer-for-woocommerce-pro") }}</span>
                  <button
                    type="button"
                    :disabled="isSaving"
                    :class="['ascwo-toggle', item.isDefault ? 'is-active' : '', activeAction === `default-${item.id || index}` ? 'is-loading' : '']"
                    @click="selectDefault(item.id || index)"
                  >
                    <i></i>
                  </button>
                  <span>{{ __("Yes", "all-signs-customizer-for-woocommerce-pro") }}</span>
                </div>
              </td>
              <td>{{ formatPrice(item.additionalPrice) }}</td>
              <td>
                <div class="ascwo-row-actions">
                  <button type="button" class="ascwo-outline-button" @click="openEditLighting(item.id || index, item)">
                    <Edit2Icon />
                    {{ __("Edit", "all-signs-customizer-for-woocommerce-pro") }}
                  </button>
                  <button type="button" class="ascwo-link-danger" :disabled="isSaving" @click="deleteLighting(item.id || index)">
                    <Loader2Icon v-if="activeAction === `delete-${item.id || index}`" class="ascwo-button-loader" />
                    <Trash2Icon v-else />
                    {{ activeAction === `delete-${item.id || index}` ? __("Deleting...", "all-signs-customizer-for-woocommerce-pro") : __("Delete", "all-signs-customizer-for-woocommerce-pro") }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </template>

    <template v-else>
      <section class="ascwo-lighting-card ascwo-lighting-editor">
        <h3>{{ isEdit ? __("Edit lighting", "all-signs-customizer-for-woocommerce-pro") : __("Add lighting", "all-signs-customizer-for-woocommerce-pro") }}</h3>

        <div class="ascwo-editor-grid">
          <label>
            <span>{{ __("Label", "all-signs-customizer-for-woocommerce-pro") }}</span>
            <input v-model.trim="lighting.label" type="text" autocomplete="off" />
          </label>

          <label>
            <span>{{ __("Additional price", "all-signs-customizer-for-woocommerce-pro") }}</span>
            <input v-model.number="lighting.additionalPrice" type="number" min="0" step="0.01" />
          </label>
        </div>

        <label class="ascwo-color-field">
          <span>{{ __("Color", "all-signs-customizer-for-woocommerce-pro") }}</span>
          <div class="ascwo-color-input-row">
            <input v-model="lighting.hexCode" type="color" />
            <input v-model.trim="lighting.hexCode" type="text" autocomplete="off" />
          </div>
        </label>

        <div class="ascwo-editor-actions">
          <button type="button" class="ascwo-secondary-button" :disabled="isSaving" @click="closeEditor">
            {{ __("Cancel", "all-signs-customizer-for-woocommerce-pro") }}
          </button>
          <button type="button" class="ascwo-primary-button" :disabled="isSaving || !lighting.label" @click="saveLighting">
            <Loader2Icon v-if="isSaving" class="ascwo-button-loader" />
            {{ isSaving ? __("Saving...", "all-signs-customizer-for-woocommerce-pro") : __("Save lighting", "all-signs-customizer-for-woocommerce-pro") }}
          </button>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import api from "@/admin/Api/api";
import toastMessage from "@/admin/utils/functions";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Edit2Icon, Loader2Icon, PlusIcon, SearchIcon, Trash2Icon } from "lucide-vue-next";
import { __ } from "@wordpress/i18n";

const route = useRoute();
const configID = ref(route.params.configId);
const isFetching = ref(true);
const isEditorOpen = ref(false);
const isEdit = ref(false);
const isSaving = ref(false);
const activeAction = ref("");
const lightingId = ref(null);

const defaultLightings = () => ({
  label: "Lighting",
  description: "",
  items: [],
});

const defaultLighting = () => ({
  id: "",
  label: "",
  hexCode: "#ffcf5a",
  isDefault: false,
  additionalPrice: 0,
});

const lightings = ref(defaultLightings());
const lighting = ref(defaultLighting());

const normalizeHex = (value) => {
  const hex = String(value || "").trim();
  if (/^#[0-9a-f]{6}$/i.test(hex)) return hex.toLowerCase();
  if (/^[0-9a-f]{6}$/i.test(hex)) return `#${hex.toLowerCase()}`;
  return "#ffcf5a";
};

const normalizeItem = (item, index = 0) => {
  const source = item && typeof item === "object" ? item : {};
  return {
    ...defaultLighting(),
    ...source,
    id: source.id || `lighting-${index + 1}`,
    label: String(source.label || source.name || "").trim(),
    hexCode: normalizeHex(source.hexCode || source.color),
    isDefault: !!source.isDefault,
    additionalPrice: Number(source.additionalPrice || 0),
  };
};

const normalizeLightings = (raw) => {
  const source = raw?.items ? raw : raw?.lightings?.items ? raw.lightings : defaultLightings();
  return {
    ...defaultLightings(),
    ...source,
    items: Array.isArray(source.items) ? source.items.map(normalizeItem) : [],
  };
};

const fetchLightings = async () => {
  isFetching.value = true;
  try {
    const res = await api.getRequiredOptionLightings(configID.value);
    lightings.value = normalizeLightings(res);
  } finally {
    isFetching.value = false;
  }
};

const openNewLighting = () => {
  isEditorOpen.value = true;
  isEdit.value = false;
  lightingId.value = null;
  lighting.value = defaultLighting();
};

const openEditLighting = (id, item) => {
  isEditorOpen.value = true;
  isEdit.value = true;
  lightingId.value = id;
  lighting.value = normalizeItem(JSON.parse(JSON.stringify(item)), 0);
};

const closeEditor = () => {
  isEditorOpen.value = false;
  isEdit.value = false;
  lightingId.value = null;
  lighting.value = defaultLighting();
};

const saveLighting = async () => {
  if (isSaving.value || !lighting.value.label) return;
  isSaving.value = true;
  activeAction.value = "save";
  try {
    const payload = normalizeItem(lighting.value, 0);
    const res = isEdit.value
      ? await api.updateRequiredOptionLightingItem(configID.value, lightingId.value, payload)
      : await api.addRequiredOptionLightingItem(configID.value, payload);
    if (res?.success) {
      toastMessage(res.message);
      closeEditor();
      await fetchLightings();
    } else {
      toastMessage(res?.message || __("Unable to save lighting", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isSaving.value = false;
    activeAction.value = "";
  }
};

const selectDefault = async (itemId) => {
  if (isSaving.value) return;
  isSaving.value = true;
  activeAction.value = `default-${itemId}`;
  try {
    const res = await api.setRequiredOptionDefault(configID.value, "lightings", itemId);
    if (res?.success) {
      toastMessage(res.message || __("Default lighting updated", "all-signs-customizer-for-woocommerce-pro"));
      await fetchLightings();
    } else {
      toastMessage(res?.message || __("Unable to update default lighting", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isSaving.value = false;
    activeAction.value = "";
  }
};

const deleteLighting = async (itemId) => {
  if (isSaving.value) return;
  isSaving.value = true;
  activeAction.value = `delete-${itemId}`;
  try {
    const res = await api.deleteRequiredOptionLightingItem(configID.value, itemId);
    if (res?.success) {
      toastMessage(res.message);
      await fetchLightings();
    } else {
      toastMessage(res?.message || __("Unable to delete lighting", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isSaving.value = false;
    activeAction.value = "";
  }
};

const formatPrice = (value) => {
  const numeric = Number(value || 0);
  return Number.isInteger(numeric) ? String(numeric) : numeric.toFixed(2);
};

onMounted(fetchLightings);
</script>

<style scoped>
.ascwo-lightings-page {
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: #303030;
}

.ascwo-lighting-card {
  background: #fff;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.06);
}

.ascwo-lighting-header {
  min-height: 74px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.ascwo-lighting-header h2,
.ascwo-lighting-list-card h3,
.ascwo-lighting-editor h3 {
  margin: 0;
  color: #303030;
  font-weight: 800;
}

.ascwo-lighting-header h2 {
  font-size: 15px;
  line-height: 20px;
}

.ascwo-lighting-header p {
  margin: 2px 0 0;
  color: #616161;
  font-size: 12px;
  line-height: 16px;
}

.ascwo-lighting-list-card {
  padding: 18px 20px;
}

.ascwo-lighting-list-card h3,
.ascwo-lighting-editor h3 {
  font-size: 13px;
  line-height: 18px;
  margin-bottom: 12px;
}

.ascwo-lighting-empty {
  min-height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #616161;
  text-align: center;
}

.ascwo-lighting-empty strong {
  color: #303030;
  font-size: 16px;
  line-height: 22px;
  font-weight: 800;
}

.ascwo-lighting-empty span {
  font-size: 13px;
  line-height: 18px;
}

.ascwo-empty-icon {
  width: 64px;
  height: 64px;
  color: #8c9196;
  stroke-width: 1.8;
}

.ascwo-lighting-table {
  width: 100%;
  border-collapse: collapse;
}

.ascwo-lighting-table thead {
  background: #f3f3f3;
}

.ascwo-lighting-table th,
.ascwo-lighting-table td {
  padding: 10px 12px;
  text-align: left;
  vertical-align: middle;
  font-size: 12px;
  line-height: 18px;
}

.ascwo-lighting-table th {
  color: #616161;
  font-weight: 700;
}

.ascwo-lighting-table tbody tr {
  border-bottom: 1px solid #e5e7eb;
}

.ascwo-lighting-table tbody tr:last-child {
  border-bottom: 0;
}

.ascwo-row-strong {
  font-weight: 800;
}

.ascwo-color-chip-row,
.ascwo-default-control,
.ascwo-row-actions {
  display: inline-flex;
  align-items: center;
}

.ascwo-color-chip-row {
  gap: 10px;
}

.ascwo-color-chip {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 1px solid #c9cccf;
  display: inline-block;
}

.ascwo-default-control {
  gap: 8px;
  color: #616161;
}

.ascwo-row-actions {
  gap: 14px;
}

.ascwo-toggle {
  width: 38px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: #d9dee8;
  position: relative;
  cursor: pointer;
}

.ascwo-toggle i {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #fff;
  position: absolute;
  top: 2px;
  left: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
  transition: transform 120ms ease;
}

.ascwo-toggle.is-active {
  background: #007a72;
}

.ascwo-toggle.is-active i {
  transform: translateX(16px);
}

.ascwo-lighting-editor {
  padding: 28px 34px 24px;
}

.ascwo-editor-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.ascwo-lighting-editor label {
  display: block;
}

.ascwo-lighting-editor label > span {
  display: block;
  margin-bottom: 6px;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
}

.ascwo-lighting-editor input[type="text"],
.ascwo-lighting-editor input[type="number"] {
  box-sizing: border-box;
  width: 100%;
  height: 38px;
  padding: 0 12px;
  border: 1px solid #8c9196;
  border-radius: 8px;
  background: #fff;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  box-shadow: none;
}

.ascwo-lighting-editor input:focus {
  outline: 2px solid #005bd3;
  outline-offset: 1px;
  border-color: #8c9196;
}

.ascwo-color-field {
  width: min(320px, 100%);
  margin-top: 20px;
}

.ascwo-color-input-row {
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: 10px;
  align-items: center;
}

.ascwo-color-input-row input[type="color"] {
  width: 48px;
  height: 38px;
  padding: 4px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
}

.ascwo-editor-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 18px;
}

.ascwo-primary-button,
.ascwo-secondary-button,
.ascwo-outline-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 30px;
  padding: 6px 12px;
  border-radius: 7px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 800;
  cursor: pointer;
}

.ascwo-primary-button {
  border: 0;
  background: #007a72;
  color: #fff;
}

.ascwo-primary-button:hover {
  background: #00645f;
  color: #fff;
}

.ascwo-primary-button:disabled {
  background: #d8d8d8;
  color: #fff;
  cursor: not-allowed;
}

.ascwo-secondary-button,
.ascwo-outline-button {
  border: 1px solid #c9cccf;
  background: #fff;
  color: #303030;
}

.ascwo-secondary-button:hover,
.ascwo-outline-button:hover {
  background: #f6f6f7;
  color: #303030;
}

.ascwo-link-danger {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 0;
  background: transparent;
  color: #8e1f0b;
  font-size: 12px;
  line-height: 16px;
  font-weight: 800;
  cursor: pointer;
}

.ascwo-link-danger:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.ascwo-primary-button svg,
.ascwo-outline-button svg,
.ascwo-link-danger svg {
  width: 14px;
  height: 14px;
}

.ascwo-loader,
.ascwo-button-loader {
  animation: ascwo-spin 0.8s linear infinite;
}

.ascwo-loader {
  width: 28px;
  height: 28px;
  color: #007a72;
}

.ascwo-button-loader {
  width: 14px;
  height: 14px;
}

@keyframes ascwo-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 900px) {
  .ascwo-lighting-header,
  .ascwo-editor-grid {
    grid-template-columns: 1fr;
  }

  .ascwo-lighting-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
