<template>
  <div class="ascwo-global-border ascwo-space-y-3">
    <template v-if="!isNewBorder">
      <section class="ascwo-card">
        <div class="ascwo-card-inner">
          <h2 class="ascwo-page-title">{{ __("Borders", "all-signs-customizer-for-woocommerce") }}</h2>
          <p class="ascwo-subtitle">{{ __("Manage the borders available globally across configurations.", "all-signs-customizer-for-woocommerce") }}</p>
        </div>
      </section>

      <section class="ascwo-card">
        <div class="ascwo-card-inner">
          <h3 class="ascwo-section-title">{{ __("Borders List", "all-signs-customizer-for-woocommerce") }}</h3>

          <table class="ascwo-border-table ascwo-w-full ascwo-border-collapse">
            <thead class="ascwo-bg-[#f3f3f3]">
              <tr>
                <th>{{ __("Border", "all-signs-customizer-for-woocommerce") }}</th>
                <th>{{ __("Preview", "all-signs-customizer-for-woocommerce") }}</th>
                <th>{{ __("Actions", "all-signs-customizer-for-woocommerce") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isFetching">
                <td colspan="3" class="ascwo-text-center ascwo-py-10">
                  <Loader2Icon class="ascwo-w-7 ascwo-h-7 ascwo-text-[#007a72] ascwo-animate-spin ascwo-mx-auto" />
                </td>
              </tr>
              <tr v-else-if="borders.length === 0">
                <td colspan="3" class="ascwo-empty">
                  <SearchIcon class="ascwo-w-14 ascwo-h-14 ascwo-text-[#8c9196]" />
                  <strong>{{ __("No borders found", "all-signs-customizer-for-woocommerce") }}</strong>
                  <span>{{ __("Create borders to use them inside configurations.", "all-signs-customizer-for-woocommerce") }}</span>
                </td>
              </tr>
              <tr v-for="(item, key) in borders" :key="item.id || item.value || key">
                <td class="ascwo-row-strong">{{ item.name }}</td>
                <td>
                  <div class="ascwo-preview-box">
                    <img v-if="item.icon" :src="item.icon" :alt="item.name" />
                    <SquareIcon v-else class="ascwo-w-7 ascwo-h-7 ascwo-text-[#111827]" />
                  </div>
                </td>
                <td>
                  <button type="button" @click="selectBorder(item.id || item.value || key, item)" class="ascwo-outline-button">
                    <Edit2Icon class="ascwo-w-3.5 ascwo-h-3.5" />
                    {{ __("Edit", "all-signs-customizer-for-woocommerce") }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>

    <section v-else class="ascwo-card">
      <div class="ascwo-card-inner ascwo-flex ascwo-justify-end">
        <button type="button" @click="back" class="ascwo-secondary-button">{{ __("Back to borders", "all-signs-customizer-for-woocommerce") }}</button>
      </div>

      <div class="ascwo-card-inner ascwo-form-body">
        <h3 class="ascwo-section-title">{{ __("Edit Border", "all-signs-customizer-for-woocommerce") }}</h3>

        <div class="ascwo-grid ascwo-grid-cols-1 lg:ascwo-grid-cols-2 ascwo-gap-4">
          <label class="ascwo-block">
            <span class="ascwo-form-label">{{ __("Name", "all-signs-customizer-for-woocommerce") }}</span>
            <input v-model.trim="border.name" class="ascwo-form-input" autocomplete="off" />
          </label>
          <label class="ascwo-block">
            <span class="ascwo-form-label">{{ __("Value", "all-signs-customizer-for-woocommerce") }}</span>
            <input v-model.trim="border.value" class="ascwo-form-input" autocomplete="off" />
          </label>
        </div>

        <label class="ascwo-block ascwo-mt-3">
          <span class="ascwo-form-label">{{ __("Upload icon", "all-signs-customizer-for-woocommerce") }}</span>
          <div class="ascwo-file-input">
            <button type="button" @click.prevent="selectBorderIcon" class="ascwo-file-button">{{ __("Upload Icon", "all-signs-customizer-for-woocommerce") }}</button>
            <input v-model="border.icon" autocomplete="off" />
            <div class="ascwo-upload-preview">
              <img v-if="border.icon" :src="border.icon" :alt="border.name" />
            </div>
          </div>
        </label>
      </div>

      <div class="ascwo-form-footer">
        <button type="button" @click="back" class="ascwo-secondary-button">{{ __("Cancel", "all-signs-customizer-for-woocommerce") }}</button>
        <button type="button" @click="updateBorder" :disabled="isLoading || !border.name.trim()" class="ascwo-primary-button">
          {{ isLoading ? __("Saving...", "all-signs-customizer-for-woocommerce") : __("Save border", "all-signs-customizer-for-woocommerce") }}
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
const borderId = ref("");
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
  borderId.value = String(id || "");
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
      toastMessage(result?.message || __("Unable to save border", "all-signs-customizer-for-woocommerce"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const selectBorderIcon = () => {
  if (!window.wp?.media) return;
  const uploader = window.wp.media({
    title: __("Select Border icon", "all-signs-customizer-for-woocommerce"),
    button: { text: __("Select Icon", "all-signs-customizer-for-woocommerce") },
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
  borderId.value = "";
  border.value = emptyBorder();
};

onMounted(fetchBorders);
</script>

<style scoped>
.ascwo-card {
  background: #fff;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
}

.ascwo-card-inner {
  padding: 18px 20px;
}

.ascwo-page-title {
  margin: 0;
  color: #303030;
  font-size: 20px;
  line-height: 26px;
  font-weight: 900;
}

.ascwo-section-title {
  margin: 0 0 12px;
  color: #303030;
  font-size: 14px;
  line-height: 20px;
  font-weight: 900;
}

.ascwo-subtitle {
  display: block;
  margin: 0;
  color: #616161;
  font-size: 12px;
  line-height: 16px;
}

.ascwo-border-table,
.ascwo-border-table thead,
.ascwo-border-table tbody,
.ascwo-border-table tr,
.ascwo-border-table th,
.ascwo-border-table td {
  border-left: 0 !important;
  border-right: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
}

.ascwo-border-table {
  border: 0 !important;
}

.ascwo-border-table th {
  padding: 9px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #616161;
  font-size: 11px;
  line-height: 16px;
  font-weight: 700;
  text-align: left;
}

.ascwo-border-table td {
  padding: 8px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #303030;
  font-size: 12px;
  line-height: 18px;
  text-align: left;
}

.ascwo-border-table tbody tr {
  border-bottom: 1px solid #e5e7eb !important;
}

.ascwo-border-table tbody tr:last-child {
  border-bottom: 0 !important;
}

.ascwo-row-strong {
  font-weight: 900;
}

.ascwo-preview-box {
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

.ascwo-preview-box img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.ascwo-empty {
  height: 210px;
  text-align: center !important;
  color: #616161 !important;
}

.ascwo-empty strong,
.ascwo-empty span {
  display: block;
}

.ascwo-empty strong {
  margin-top: 12px;
  color: #303030;
  font-size: 18px;
  font-weight: 900;
}

.ascwo-empty span {
  margin-top: 8px;
  font-size: 13px;
}

.ascwo-form-body {
  padding-top: 0;
}

.ascwo-form-label {
  display: block;
  margin: 0 0 6px;
  color: #303030;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
}

.ascwo-form-input {
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

.ascwo-form-input:focus {
  border-color: #005bd3 !important;
  box-shadow: 0 0 0 1px #005bd3 !important;
  outline: 0;
}

.ascwo-file-input {
  display: grid;
  grid-template-columns: auto 1fr 42px;
  align-items: center;
  min-height: 40px;
  border: 1px solid #8c9196;
  border-radius: 7px;
  overflow: hidden;
}

.ascwo-file-input input {
  height: 100%;
  border: 0 !important;
  box-shadow: none !important;
  font-size: 12px;
}

.ascwo-file-button {
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

.ascwo-upload-preview {
  width: 38px;
  height: 36px;
  margin-right: 2px;
  border-left: 1px solid #e5e7eb;
  background: #fff;
}

.ascwo-upload-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.ascwo-form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 14px 20px 18px;
  border-top: 1px solid #e5e7eb;
}

.ascwo-primary-button,
.ascwo-secondary-button,
.ascwo-outline-button {
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

.ascwo-primary-button {
  border: 1px solid #005e56;
  background: #007a72;
  color: #fff !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.ascwo-primary-button:hover {
  background: #006e67;
  color: #fff !important;
}

.ascwo-primary-button:disabled {
  border-color: #d4d4d4;
  background: #d4d4d4;
  color: #fff !important;
  cursor: not-allowed;
}

.ascwo-secondary-button,
.ascwo-outline-button {
  border: 1px solid #c9cccf;
  background: #fff;
  color: #303030 !important;
}

.ascwo-secondary-button:hover,
.ascwo-outline-button:hover {
  background: #f6f6f7;
  color: #303030 !important;
}
</style>
