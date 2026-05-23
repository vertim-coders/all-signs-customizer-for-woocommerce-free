<template>
  <div class="asowp-global-border asowp-space-y-3">
    <template v-if="!isNewBorder">
      <section class="asowp-card">
        <div class="asowp-card-inner">
          <h2 class="asowp-page-title">{{ __("Borders", "all-signs-options-pro") }}</h2>
          <p class="asowp-subtitle">{{ __("Manage the borders available globally across configurations.", "all-signs-options-pro") }}</p>
        </div>
      </section>

      <section class="asowp-card">
        <div class="asowp-card-inner">
          <h3 class="asowp-section-title">{{ __("Borders List", "all-signs-options-pro") }}</h3>

          <table class="asowp-border-table asowp-w-full asowp-border-collapse">
            <thead class="asowp-bg-[#f3f3f3]">
              <tr>
                <th>{{ __("Border", "all-signs-options-pro") }}</th>
                <th>{{ __("Preview", "all-signs-options-pro") }}</th>
                <th>{{ __("Actions", "all-signs-options-pro") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isFetching">
                <td colspan="3" class="asowp-text-center asowp-py-10">
                  <Loader2Icon class="asowp-w-7 asowp-h-7 asowp-text-[#007a72] asowp-animate-spin asowp-mx-auto" />
                </td>
              </tr>
              <tr v-else-if="borders.length === 0">
                <td colspan="3" class="asowp-empty">
                  <SearchIcon class="asowp-w-14 asowp-h-14 asowp-text-[#8c9196]" />
                  <strong>{{ __("No borders found", "all-signs-options-pro") }}</strong>
                  <span>{{ __("Create borders to use them inside configurations.", "all-signs-options-pro") }}</span>
                </td>
              </tr>
              <tr v-for="(item, key) in borders" :key="key">
                <td class="asowp-row-strong">{{ item.name }}</td>
                <td>
                  <div class="asowp-preview-box">
                    <img v-if="item.icon" :src="item.icon" :alt="item.name" />
                    <SquareIcon v-else class="asowp-w-7 asowp-h-7 asowp-text-[#111827]" />
                  </div>
                </td>
                <td>
                  <button type="button" @click="selectBorder(key, item)" class="asowp-outline-button">
                    <Edit2Icon class="asowp-w-3.5 asowp-h-3.5" />
                    {{ __("Edit", "all-signs-options-pro") }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>

    <section v-else class="asowp-card">
      <div class="asowp-card-inner asowp-flex asowp-justify-end">
        <button type="button" @click="back" class="asowp-secondary-button">{{ __("Back to borders", "all-signs-options-pro") }}</button>
      </div>

      <div class="asowp-card-inner asowp-form-body">
        <h3 class="asowp-section-title">{{ __("Edit Border", "all-signs-options-pro") }}</h3>

        <div class="asowp-grid asowp-grid-cols-1 lg:asowp-grid-cols-2 asowp-gap-4">
          <label class="asowp-block">
            <span class="asowp-form-label">{{ __("Name", "all-signs-options-pro") }}</span>
            <input v-model.trim="border.name" class="asowp-form-input" autocomplete="off" />
          </label>
          <label class="asowp-block">
            <span class="asowp-form-label">{{ __("Value", "all-signs-options-pro") }}</span>
            <input v-model.trim="border.value" class="asowp-form-input" autocomplete="off" />
          </label>
        </div>

        <label class="asowp-block asowp-mt-3">
          <span class="asowp-form-label">{{ __("Upload icon", "all-signs-options-pro") }}</span>
          <div class="asowp-file-input">
            <button type="button" @click.prevent="selectBorderIcon" class="asowp-file-button">{{ __("Upload Icon", "all-signs-options-pro") }}</button>
            <input v-model="border.icon" autocomplete="off" />
            <div class="asowp-upload-preview">
              <img v-if="border.icon" :src="border.icon" :alt="border.name" />
            </div>
          </div>
        </label>
      </div>

      <div class="asowp-form-footer">
        <button type="button" @click="back" class="asowp-secondary-button">{{ __("Cancel", "all-signs-options-pro") }}</button>
        <button type="button" @click="updateBorder" :disabled="isLoading || !border.name.trim()" class="asowp-primary-button">
          {{ isLoading ? __("Saving...", "all-signs-options-pro") : __("Save border", "all-signs-options-pro") }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "@/admin/Api/api";
import toastMessage from "@/admin/utils/functions";
import { Edit2Icon, Loader2Icon, SearchIcon, SquareIcon } from "lucide-vue-next";
import { __ } from "@wordpress/i18n";

const isFetching = ref(false);
const isLoading = ref(false);
const isNewBorder = ref(false);
const borderId = ref(null);
const borders = ref([]);
const border = ref(emptyBorder());

function emptyBorder() {
  return { name: "", value: "", icon: "" };
}

const fetchBorders = async () => {
  isFetching.value = true;
  try {
    const result = await api.getGlobalBorders();
    borders.value = result?.message ? [] : result;
  } finally {
    isFetching.value = false;
  }
};

const selectBorder = (id, item) => {
  borderId.value = id;
  border.value = JSON.parse(JSON.stringify({ ...emptyBorder(), ...item }));
  isNewBorder.value = true;
};

const updateBorder = async () => {
  if (isLoading.value || !border.value.name.trim()) return;
  isLoading.value = true;
  try {
    const result = await api.updateBorderInGlobalBorders(borderId.value, border.value);
    if (result?.success) {
      toastMessage(result.message);
      await fetchBorders();
      back();
    } else {
      toastMessage(result?.message || __("Unable to save border", "all-signs-options-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const selectBorderIcon = () => {
  if (!window.wp?.media) return;
  const uploader = window.wp.media({
    title: __("Select Border icon", "all-signs-options-pro"),
    button: { text: __("Select Icon", "all-signs-options-pro") },
    multiple: false,
  });
  uploader.on("select", () => {
    const attachment = uploader.state().get("selection").first()?.toJSON();
    if (attachment?.type === "image" && attachment.url) {
      border.value.icon = attachment.url;
    }
  });
  uploader.open();
};

const back = () => {
  isNewBorder.value = false;
  borderId.value = null;
  border.value = emptyBorder();
};

onMounted(fetchBorders);
</script>

<style scoped>
.asowp-card {
  background: #fff;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
}

.asowp-card-inner {
  padding: 18px 20px;
}

.asowp-page-title {
  margin: 0;
  color: #303030;
  font-size: 20px;
  line-height: 26px;
  font-weight: 900;
}

.asowp-section-title {
  margin: 0 0 12px;
  color: #303030;
  font-size: 14px;
  line-height: 20px;
  font-weight: 900;
}

.asowp-subtitle {
  display: block;
  margin: 0;
  color: #616161;
  font-size: 12px;
  line-height: 16px;
}

.asowp-border-table,
.asowp-border-table thead,
.asowp-border-table tbody,
.asowp-border-table tr,
.asowp-border-table th,
.asowp-border-table td {
  border-left: 0 !important;
  border-right: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
}

.asowp-border-table {
  border: 0 !important;
}

.asowp-border-table th {
  padding: 9px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #616161;
  font-size: 11px;
  line-height: 16px;
  font-weight: 700;
  text-align: left;
}

.asowp-border-table td {
  padding: 8px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #303030;
  font-size: 12px;
  line-height: 18px;
  text-align: left;
}

.asowp-border-table tbody tr {
  border-bottom: 1px solid #e5e7eb !important;
}

.asowp-border-table tbody tr:last-child {
  border-bottom: 0 !important;
}

.asowp-row-strong {
  font-weight: 900;
}

.asowp-preview-box {
  width: 56px;
  height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #f7f8fa;
  border: 1px solid #d8dee6;
  border-radius: 8px;
}

.asowp-preview-box img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.asowp-empty {
  height: 210px;
  text-align: center !important;
  color: #616161 !important;
}

.asowp-empty strong,
.asowp-empty span {
  display: block;
}

.asowp-empty strong {
  margin-top: 12px;
  color: #303030;
  font-size: 18px;
  font-weight: 900;
}

.asowp-empty span {
  margin-top: 8px;
  font-size: 13px;
}

.asowp-form-body {
  padding-top: 0;
}

.asowp-form-label {
  display: block;
  margin: 0 0 6px;
  color: #303030;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
}

.asowp-form-input {
  width: 100%;
  min-height: 40px;
  padding: 8px 12px;
  border: 1px solid #8c9196 !important;
  border-radius: 7px !important;
  background: #fff;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  box-shadow: none !important;
}

.asowp-form-input:focus {
  border-color: #005bd3 !important;
  box-shadow: 0 0 0 1px #005bd3 !important;
  outline: 0;
}

.asowp-file-input {
  display: grid;
  grid-template-columns: auto 1fr 42px;
  align-items: center;
  min-height: 40px;
  border: 1px solid #8c9196;
  border-radius: 7px;
  overflow: hidden;
}

.asowp-file-input input {
  height: 100%;
  border: 0 !important;
  box-shadow: none !important;
  font-size: 12px;
}

.asowp-file-button {
  height: 32px;
  margin-left: 4px;
  padding: 0 12px;
  border: 0;
  border-radius: 6px;
  background: #007a72;
  color: #fff !important;
  font-size: 12px;
  font-weight: 900;
  cursor: pointer;
}

.asowp-upload-preview {
  width: 38px;
  height: 36px;
  margin-right: 2px;
  border-left: 1px solid #e5e7eb;
  background: #fff;
}

.asowp-upload-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.asowp-form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 14px 20px 18px;
  border-top: 1px solid #e5e7eb;
}

.asowp-primary-button,
.asowp-secondary-button,
.asowp-outline-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 32px;
  padding: 6px 12px;
  border-radius: 7px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 900;
  text-decoration: none !important;
  cursor: pointer;
}

.asowp-primary-button {
  border: 1px solid #005e56;
  background: #007a72;
  color: #fff !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.asowp-primary-button:hover {
  background: #006e67;
  color: #fff !important;
}

.asowp-primary-button:disabled {
  border-color: #d4d4d4;
  background: #d4d4d4;
  color: #fff !important;
  cursor: not-allowed;
}

.asowp-secondary-button,
.asowp-outline-button {
  border: 1px solid #c9cccf;
  background: #fff;
  color: #303030 !important;
}

.asowp-secondary-button:hover,
.asowp-outline-button:hover {
  background: #f6f6f7;
  color: #303030 !important;
}
</style>
