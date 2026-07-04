<template>
  <div class="ascwo-global-fixing ascwo-space-y-3">
    <template v-if="!isNewFixingMethod">
      <section class="ascwo-card">
        <div class="ascwo-card-inner ascwo-flex ascwo-items-center ascwo-justify-between ascwo-gap-4">
          <div>
            <h2 class="ascwo-page-title">{{ __("Fixing Methods", "all-signs-customizer-for-woocommerce") }}</h2>
            <p class="ascwo-subtitle">{{ __("Manage the fixing methods available globally across configurations.", "all-signs-customizer-for-woocommerce") }}</p>
          </div>
        </div>
      </section>

      <section class="ascwo-card">
        <div class="ascwo-card-inner">
          <h3 class="ascwo-section-title">{{ __("Fixing Methods List", "all-signs-customizer-for-woocommerce") }}</h3>
          <table class="ascwo-fixing-table ascwo-w-full ascwo-border-collapse">
            <thead class="ascwo-bg-[#f3f3f3]">
              <tr>
                <th>{{ __("Fixing method", "all-signs-customizer-for-woocommerce") }}</th>
                <th>{{ __("Description", "all-signs-customizer-for-woocommerce") }}</th>
                <th>{{ __("Preview", "all-signs-customizer-for-woocommerce") }}</th>
                <th>{{ __("Actions", "all-signs-customizer-for-woocommerce") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isFetching">
                <td colspan="4" class="ascwo-text-center ascwo-py-10">
                  <Loader2Icon class="ascwo-w-7 ascwo-h-7 ascwo-text-[#007a72] ascwo-animate-spin ascwo-mx-auto" />
                </td>
              </tr>
              <tr v-else-if="fixingMethods.length === 0">
                <td colspan="4" class="ascwo-empty">
                  <SearchIcon class="ascwo-w-14 ascwo-h-14 ascwo-text-[#8c9196]" />
                  <strong>{{ __("No fixing methods found", "all-signs-customizer-for-woocommerce") }}</strong>
                  <span>{{ __("Create a fixing method to use it inside configurations.", "all-signs-customizer-for-woocommerce") }}</span>
                </td>
              </tr>
              <tr v-for="(method, key) in fixingMethods" :key="method.id || method.type || key">
                <td class="ascwo-row-strong">{{ method.name }}</td>
                <td>{{ method.description || "-" }}</td>
                <td>
                  <div class="ascwo-preview-box">
                    <img v-if="method.icon" :src="method.icon" :alt="method.name" />
                    <BanIcon v-else-if="isNoneMethod(method)" class="ascwo-w-9 ascwo-h-9 ascwo-text-[#111827]" />
                    <WrenchIcon v-else class="ascwo-w-6 ascwo-h-6 ascwo-text-[#616161]" />
                  </div>
                </td>
                <td>
                  <div class="ascwo-flex ascwo-items-center ascwo-gap-3">
                    <button type="button" @click="selectFixingMethod(method.id || method.type || key, method)" class="ascwo-outline-button">
                      <Edit2Icon class="ascwo-w-3.5 ascwo-h-3.5" />
                      {{ __("Edit", "all-signs-customizer-for-woocommerce") }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>

    <section v-else class="ascwo-card">
      <div class="ascwo-card-inner ascwo-flex ascwo-justify-end">
        <button type="button" @click="back" class="ascwo-secondary-button">{{ __("Back to fixing methods", "all-signs-customizer-for-woocommerce") }}</button>
      </div>
      <div class="ascwo-card-inner ascwo-form-body">
        <h3 class="ascwo-section-title">{{ isEdit ? __("Edit Fixing Method", "all-signs-customizer-for-woocommerce") : __("Add new Fixing Method", "all-signs-customizer-for-woocommerce") }}</h3>
        <div class="ascwo-grid ascwo-grid-cols-1 lg:ascwo-grid-cols-2 ascwo-gap-4">
          <label class="ascwo-block">
            <span class="ascwo-form-label">{{ __("Label", "all-signs-customizer-for-woocommerce") }}</span>
            <input v-model.trim="fixingMethod.name" class="ascwo-form-input" autocomplete="off" />
          </label>
          <label class="ascwo-block">
            <span class="ascwo-form-label">{{ __("Description", "all-signs-customizer-for-woocommerce") }}</span>
            <input v-model.trim="fixingMethod.description" class="ascwo-form-input" autocomplete="off" />
          </label>
        </div>

        <label class="ascwo-block ascwo-mt-3">
          <span class="ascwo-form-label">{{ __("Upload icon", "all-signs-customizer-for-woocommerce") }}</span>
          <div class="ascwo-file-input">
            <button type="button" @click.prevent="selectFixingMethodIcon" class="ascwo-file-button">{{ __("Upload Icon", "all-signs-customizer-for-woocommerce") }}</button>
            <input v-model="fixingMethod.icon" autocomplete="off" />
            <div class="ascwo-upload-preview">
              <img v-if="fixingMethod.icon" :src="fixingMethod.icon" :alt="fixingMethod.name" />
            </div>
          </div>
        </label>
      </div>
      <div class="ascwo-form-footer">
        <button type="button" @click="back" class="ascwo-secondary-button">{{ __("Cancel", "all-signs-customizer-for-woocommerce") }}</button>
        <button type="button" @click="updateFixingMethod" :disabled="isLoading || !fixingMethod.name.trim()" class="ascwo-primary-button">
          {{ isLoading ? __("Saving...", "all-signs-customizer-for-woocommerce") : __("Save fixing method", "all-signs-customizer-for-woocommerce") }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "@/admin/Api/api";
import toastMessage from "@/admin/utils/functions";
import { BanIcon, Edit2Icon, Loader2Icon, SearchIcon, WrenchIcon } from "lucide-vue-next";
import { __ } from "@wordpress/i18n";

const isFetching = ref(false);
const isLoading = ref(false);
const isEdit = ref(false);
const fixingMethodId = ref("");
const fixingMethods = ref([]);
const fixingMethod = ref({ name: "", description: "", icon: "", popImg: "", type: "" });

const fetchFixingMethods = async () => {
  isFetching.value = true;
  try {
    const result = await api.getGlobalFixingMethods();
    fixingMethods.value = result?.message ? [] : result;
  } finally {
    isFetching.value = false;
  }
};

const isNewFixingMethod = ref(false);

const selectFixingMethod = (id, method) => {
  fixingMethodId.value = String(id || "");
  fixingMethod.value = JSON.parse(JSON.stringify({ id: "", name: "", description: "", icon: "", popImg: "", type: "", ...method }));
  isEdit.value = true;
  isNewFixingMethod.value = true;
};

const isNoneMethod = (method) => String(method?.name || "").trim().toLowerCase() === "none";

const updateFixingMethod = async () => {
  if (isLoading.value || !fixingMethod.value.name.trim()) return;
  isLoading.value = true;
  try {
    const result = await api.updateFixingMethodInGlobalFixingMethods(fixingMethodId.value, fixingMethod.value);
    if (result?.success) {
      toastMessage(result.message);
      await fetchFixingMethods();
      back();
    } else {
      toastMessage(result?.message || __("Unable to save fixing method", "all-signs-customizer-for-woocommerce"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const selectFixingMethodIcon = () => {
  if (!window.wp?.media) return;
  const uploader = window.wp.media({
    title: __("Select Fixing Method icon", "all-signs-customizer-for-woocommerce"),
    button: { text: __("Select Icon", "all-signs-customizer-for-woocommerce") },
    multiple: false,
  });
  uploader.on("select", () => {
    const attachment = uploader.state().get("selection").first()?.toJSON();
    if (attachment?.type === "image" && attachment.url) {
      fixingMethod.value.icon = attachment.url;
    }
  });
  uploader.open();
};

const back = () => {
  isNewFixingMethod.value = false;
  fixingMethodId.value = "";
  fixingMethod.value = { id: "", name: "", description: "", icon: "", popImg: "", type: "" };
};

onMounted(fetchFixingMethods);
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

.ascwo-title,
.ascwo-section-title {
  margin: 0;
  color: #303030;
  font-size: 14px;
  line-height: 20px;
  font-weight: 900;
}

.ascwo-page-title {
  margin: 0;
  color: #303030;
  font-size: 20px;
  line-height: 26px;
  font-weight: 900;
}

.ascwo-subtitle {
  display: block;
  margin: 0;
  color: #616161;
  font-size: 12px;
  line-height: 16px;
}

.ascwo-fixing-table,
.ascwo-fixing-table thead,
.ascwo-fixing-table tbody,
.ascwo-fixing-table tr,
.ascwo-fixing-table th,
.ascwo-fixing-table td {
  border-left: 0 !important;
  border-right: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
}

.ascwo-fixing-table {
  border: 0 !important;
}

.ascwo-fixing-table th {
  padding: 9px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #616161;
  font-size: 11px;
  line-height: 16px;
  font-weight: 700;
  text-align: left;
}

.ascwo-fixing-table td {
  padding: 8px 12px;
  border-top: 0 !important;
  border-bottom: 0 !important;
  color: #303030;
  font-size: 12px;
  line-height: 18px;
  text-align: left;
}

.ascwo-fixing-table tbody tr {
  border-bottom: 1px solid #e5e7eb !important;
}

.ascwo-fixing-table tbody tr:last-child {
  border-bottom: 0 !important;
}

.ascwo-preview-box {
  width: 54px;
  height: 54px;
  overflow: hidden;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ascwo-preview-box img,
.ascwo-upload-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.ascwo-row-strong {
  font-weight: 900;
}

.ascwo-empty {
  height: 220px;
  text-align: center !important;
  color: #616161;
}

.ascwo-empty strong,
.ascwo-empty span {
  display: block;
  margin-top: 8px;
}

.ascwo-form-body {
  padding-top: 6px;
}

.ascwo-form-label {
  display: block;
  margin-bottom: 4px;
  color: #303030;
  font-size: 12px;
  line-height: 16px;
}

.ascwo-form-input {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 38px;
  padding: 6px 10px;
  border: 1px solid #8c9196;
  border-radius: 7px;
  background: #fff;
  color: #303030;
  font-size: 13px;
  line-height: 20px;
  box-shadow: none;
}

.ascwo-form-input:focus {
  outline: 2px solid #005bd3;
  outline-offset: 1px;
  border-color: #8c9196;
  box-shadow: none;
}

.ascwo-file-input {
  box-sizing: border-box;
  width: 100%;
  height: 38px;
  border: 1px solid #8c9196;
  border-radius: 7px;
  display: flex;
  align-items: center;
  background: #fff;
  overflow: hidden;
}

.ascwo-file-input input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

.ascwo-file-button {
  margin-left: 5px;
  min-height: 30px;
  padding: 6px 12px;
  border: 0;
  border-radius: 6px;
  background: #007a72;
  color: #fff;
  font-size: 12px;
  line-height: 16px;
  font-weight: 800;
  cursor: pointer;
}

.ascwo-upload-preview {
  width: 38px;
  height: 32px;
  margin-right: 4px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
  overflow: hidden;
}

.ascwo-form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 20px;
  border-top: 1px solid #e5e7eb;
}

.ascwo-primary-button,
.ascwo-secondary-button,
.ascwo-outline-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 30px;
  padding: 6px 11px;
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
</style>
