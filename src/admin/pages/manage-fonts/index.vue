<template>
  <div class="ascwo-manage-fonts ascwo-bg-[#f1f1f1] ascwo-min-h-screen ascwo-p-4 ascwo-space-y-3">
    <section class="ascwo-card">
      <div class="ascwo-card-inner ascwo-flex ascwo-items-center ascwo-justify-between ascwo-gap-4">
        <h1 class="ascwo-text-[14px] ascwo-leading-5 ascwo-font-[900] ascwo-text-[#303030] ascwo-m-0">
          {{ __("Manage Fonts", "all-signs-customizer-for-woocommerce-pro") }}
        </h1>
        <button type="button" @click="backToFonts" class="ascwo-secondary-button">
          <ArrowLeftIcon class="ascwo-w-4 ascwo-h-4" />
          {{ __("Back to fonts", "all-signs-customizer-for-woocommerce-pro") }}
        </button>
      </div>
    </section>

    <section class="ascwo-card">
      <div class="ascwo-card-inner ascwo-flex ascwo-items-center ascwo-justify-between ascwo-gap-4 ascwo-min-h-[78px]">
        <div>
          <h2 class="ascwo-text-[20px] ascwo-leading-6 ascwo-font-[900] ascwo-text-[#303030] ascwo-m-0">
            {{ __("Fonts", "all-signs-customizer-for-woocommerce-pro") }}
          </h2>
          <p class="ascwo-text-[13px] ascwo-leading-5 ascwo-text-[#616161] ascwo-m-0">
            {{ __("Manage the fonts available to configurations.", "all-signs-customizer-for-woocommerce-pro") }}
          </p>
        </div>
        <button type="button" @click="goToCreateFont" class="ascwo-primary-button">
          <PlusIcon class="ascwo-w-4 ascwo-h-4" />
          {{ __("Add new font", "all-signs-customizer-for-woocommerce-pro") }}
        </button>
      </div>
    </section>

    <section class="ascwo-card">
      <div class="ascwo-card-inner">
        <div v-if="isFetching" class="ascwo-py-14 ascwo-flex ascwo-items-center ascwo-justify-center">
          <Loader2Icon class="ascwo-w-7 ascwo-h-7 ascwo-text-[#007a72] ascwo-animate-spin" />
        </div>

        <div v-else-if="fontRows.length === 0" class="ascwo-py-14 ascwo-text-center">
          <SearchIcon class="ascwo-w-16 ascwo-h-16 ascwo-text-[#8c9196] ascwo-mx-auto ascwo-mb-3" />
          <h3 class="ascwo-text-[18px] ascwo-leading-6 ascwo-font-[900] ascwo-text-[#303030] ascwo-m-0">
            {{ __("No Fonts found", "all-signs-customizer-for-woocommerce-pro") }}
          </h3>
          <p class="ascwo-text-[13px] ascwo-leading-5 ascwo-text-[#616161] ascwo-mt-2 ascwo-mb-0">
            {{ __("Try changing the filters or search term", "all-signs-customizer-for-woocommerce-pro") }}
          </p>
        </div>

        <table v-else class="ascwo-w-full ascwo-border-collapse">
          <thead class="ascwo-bg-[#f3f3f3]">
            <tr>
              <th class="ascwo-py-2.5 ascwo-px-3 ascwo-text-left ascwo-text-[12px] ascwo-font-bold ascwo-text-[#616161]">
                {{ __("Label", "all-signs-customizer-for-woocommerce-pro") }}
              </th>
              <th class="ascwo-py-2.5 ascwo-px-3 ascwo-text-left ascwo-text-[12px] ascwo-font-bold ascwo-text-[#616161]">
                {{ __("Actions", "all-signs-customizer-for-woocommerce-pro") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="font in fontRows"
              :key="font.id"
              class="ascwo-border-b ascwo-border-solid ascwo-border-[#e5e5e5] last:ascwo-border-b-0"
            >
              <td class="ascwo-py-3 ascwo-px-3 ascwo-text-[13px] ascwo-leading-5 ascwo-font-[900] ascwo-text-[#303030]">
                {{ font.label }}
              </td>
              <td class="ascwo-py-3 ascwo-px-3">
                <div class="ascwo-flex ascwo-items-center ascwo-gap-2">
                  <button type="button" @click="goToEditFont(font)" class="ascwo-outline-button">
                    {{ __("Edit", "all-signs-customizer-for-woocommerce-pro") }}
                  </button>
                  <button type="button" @click="selectDeleteFont(font)" class="ascwo-danger-button">
                    {{ __("Delete", "all-signs-customizer-for-woocommerce-pro") }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div v-if="showFontModal" class="ascwo-fixed ascwo-inset-0 ascwo-z-[20000] ascwo-flex ascwo-items-center ascwo-justify-center">
      <div class="ascwo-absolute ascwo-inset-0 ascwo-bg-black/45" @click="closeFontModal"></div>
      <div class="ascwo-modal">
        <div class="ascwo-modal-header">
          <h3 class="ascwo-text-[14px] ascwo-font-[900] ascwo-text-[#303030] ascwo-m-0">
            {{ isEdit ? __("Edit font", "all-signs-customizer-for-woocommerce-pro") : __("Add new font", "all-signs-customizer-for-woocommerce-pro") }}
          </h3>
          <button type="button" @click="closeFontModal" class="ascwo-close-button">
            <XIcon class="ascwo-w-5 ascwo-h-5" />
          </button>
        </div>
        <div class="ascwo-p-5 ascwo-space-y-3">
          <label class="ascwo-block">
            <span class="ascwo-form-label">{{ __("Label", "all-signs-customizer-for-woocommerce-pro") }}</span>
            <input v-model="fontForm.label" class="ascwo-form-input" autocomplete="off" />
          </label>
          <label class="ascwo-block">
            <span class="ascwo-form-label">{{ __("Upload font file", "all-signs-customizer-for-woocommerce-pro") }}</span>
            <div class="ascwo-file-input">
              <button type="button" @click.prevent="selectFontFile" class="ascwo-file-button">
                {{ __("Upload font file", "all-signs-customizer-for-woocommerce-pro") }}
              </button>
              <input v-model="fontForm.url" autocomplete="off" />
            </div>
            <span class="ascwo-help-text">{{ __(".ttf or .otf font file.", "all-signs-customizer-for-woocommerce-pro") }}</span>
          </label>
        </div>
        <div class="ascwo-modal-footer">
          <button type="button" @click="closeFontModal" class="ascwo-secondary-action">
            {{ __("Cancel", "all-signs-customizer-for-woocommerce-pro") }}
          </button>
          <button type="button" @click="saveFont" :disabled="isLoading || !fontForm.label.trim()" class="ascwo-primary-button">
            {{ isLoading ? __("Saving...", "all-signs-customizer-for-woocommerce-pro") : __("Save font", "all-signs-customizer-for-woocommerce-pro") }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="deleteFont.id !== null" class="ascwo-fixed ascwo-inset-0 ascwo-z-[20000] ascwo-flex ascwo-items-center ascwo-justify-center">
      <div class="ascwo-absolute ascwo-inset-0 ascwo-bg-black/45" @click="closeDeleteModal"></div>
      <div class="ascwo-delete-modal">
        <h3 class="ascwo-text-[16px] ascwo-font-[900] ascwo-text-[#303030] ascwo-mt-0 ascwo-mb-2">
          {{ __("Delete font?", "all-signs-customizer-for-woocommerce-pro") }}
        </h3>
        <p class="ascwo-text-[13px] ascwo-leading-5 ascwo-text-[#616161] ascwo-mt-0 ascwo-mb-5">
          {{ sprintf(__('Are you sure you want to delete "%s"?', "all-signs-customizer-for-woocommerce-pro"), deleteFont.label) }}
        </p>
        <div class="ascwo-flex ascwo-justify-end ascwo-gap-2">
          <button type="button" @click="closeDeleteModal" class="ascwo-secondary-action">
            {{ __("Cancel", "all-signs-customizer-for-woocommerce-pro") }}
          </button>
          <button type="button" @click="deleteSelectedFont" :disabled="isLoading" class="ascwo-danger-action">
            {{ isLoading ? __("Deleting...", "all-signs-customizer-for-woocommerce-pro") : __("Delete", "all-signs-customizer-for-woocommerce-pro") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/admin/Api/api";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import toastMessage from "@/admin/utils/functions";
import { ArrowLeftIcon, Loader2Icon, PlusIcon, SearchIcon, XIcon } from "lucide-vue-next";
import { __, sprintf } from "@wordpress/i18n";

const route = useRoute();
const router = useRouter();
const fonts = ref([]);
const isFetching = ref(false);
const isLoading = ref(false);
const isEdit = ref(false);
const showFontModal = ref(false);
const editingFontId = ref(null);
const deleteFont = ref({ id: null, label: "" });
const fontForm = ref({ label: "", url: "", previewImg: "", isGoogleFont: false });

const normalizeFont = (font, index) => ({
  ...font,
  id: index,
  label: String(font?.label || font?.name || `Font ${index + 1}`),
  url: String(font?.url || ""),
  previewImg: String(font?.previewImg || font?.preview || ""),
  isGoogleFont: Boolean(font?.isGoogleFont),
});

const fontRows = computed(() => {
  const seen = new Set();
  return fonts.value
    .map(normalizeFont)
    .filter((font) => {
      const key = String(font.url || font.label).trim().toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
});

const isFontEditRoute = () => route.name === "manage-font-edit";

const syncFontRouteState = () => {
  if (!isFontEditRoute()) {
    if (showFontModal.value) closeFontModal(false);
    return;
  }

  const fontId = route.query.id;
  if (fontId === undefined || fontId === null || fontId === "") {
    openCreateModal();
    return;
  }

  const font = fontRows.value.find((row) => Number(row.id) === Number(fontId));
  if (font) {
    openEditModal(font);
  }
};

const fetchFonts = async () => {
  isFetching.value = true;
  try {
    const result = await api.getManagefonts();
    fonts.value = Array.isArray(result) ? result : [];
    syncFontRouteState();
  } finally {
    isFetching.value = false;
  }
};

const goToCreateFont = () => {
  router.push({ name: "manage-font-edit" });
};

const goToEditFont = (font) => {
  router.push({ name: "manage-font-edit", query: { id: font.id } });
};

const openCreateModal = () => {
  isEdit.value = false;
  editingFontId.value = null;
  fontForm.value = { label: "", url: "", previewImg: "", isGoogleFont: false };
  showFontModal.value = true;
};

const openEditModal = (font) => {
  isEdit.value = true;
  editingFontId.value = font.id;
  fontForm.value = {
    label: font.label,
    url: font.url,
    previewImg: font.previewImg,
    isGoogleFont: font.isGoogleFont,
  };
  showFontModal.value = true;
};

const closeFontModal = (navigateBack = true) => {
  showFontModal.value = false;
  isEdit.value = false;
  editingFontId.value = null;
  if (navigateBack && isFontEditRoute()) {
    router.push("/manage-font");
  }
};

const saveFont = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  try {
    const payload = {
      label: fontForm.value.label.trim(),
      url: fontForm.value.url.trim(),
      previewImg: fontForm.value.previewImg.trim(),
      isGoogleFont: Boolean(fontForm.value.isGoogleFont),
    };
    const duplicate = fontRows.value.find((font) => {
      if (isEdit.value && Number(font.id) === Number(editingFontId.value)) return false;
      return String(font.url || font.label).trim().toLowerCase() === String(payload.url || payload.label).trim().toLowerCase();
    });
    if (duplicate) {
      toastMessage(__("This font already exists", "all-signs-customizer-for-woocommerce-pro"), "warning");
      return;
    }

    const result = isEdit.value
      ? await api.updateManagefont(editingFontId.value, payload)
      : await api.addManagefont({ many: false, font: payload });
    if (result?.success) {
      toastMessage(result.message);
      closeFontModal();
      await fetchFonts();
    } else {
      toastMessage(result?.message || __("Unable to save this font", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const selectDeleteFont = (font) => {
  deleteFont.value = { id: font.id, label: font.label };
};

const closeDeleteModal = () => {
  deleteFont.value = { id: null, label: "" };
};

const deleteSelectedFont = async () => {
  if (deleteFont.value.id === null || isLoading.value) return;
  isLoading.value = true;
  try {
    const result = await api.deleteManagefont(deleteFont.value.id);
    if (result?.success) {
      toastMessage(result.message);
      closeDeleteModal();
      await fetchFonts();
    } else {
      toastMessage(result?.message || __("Unable to delete this font", "all-signs-customizer-for-woocommerce-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const selectFontFile = () => {
  if (!window.wp?.media) return;
  const uploader = window.wp.media({
    title: __("Select Font File", "all-signs-customizer-for-woocommerce-pro"),
    button: { text: __("Select font", "all-signs-customizer-for-woocommerce-pro") },
    multiple: false,
  });

  uploader.on("select", () => {
    const attachment = uploader.state().get("selection").first()?.toJSON();
    if (!attachment?.url) return;
    fontForm.value.url = attachment.url;
    if (!fontForm.value.label.trim()) {
      fontForm.value.label = String(attachment.title || attachment.filename || "")
        .replace(/\.(ttf|otf|woff2?|eot)$/i, "")
        .trim();
    }
  });

  uploader.open();
};

const backToFonts = () => {
  const returnTo = typeof route.query.returnTo === "string" ? route.query.returnTo : "";
  if (returnTo) {
    router.push(returnTo);
    return;
  }
  router.push("/manage-font");
};

watch(
  () => [route.name, route.query.id],
  () => syncFontRouteState()
);

onMounted(fetchFonts);
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

.ascwo-primary-button,
.ascwo-secondary-button,
.ascwo-outline-button,
.ascwo-danger-button,
.ascwo-secondary-action,
.ascwo-danger-action {
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
  text-decoration: none;
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

.ascwo-primary-button:disabled,
.ascwo-danger-action:disabled {
  background: #d8d8d8;
  color: #fff;
  cursor: not-allowed;
}

.ascwo-secondary-button,
.ascwo-outline-button,
.ascwo-secondary-action {
  border: 1px solid #c9cccf;
  background: #fff;
  color: #303030;
}

.ascwo-secondary-button:hover,
.ascwo-outline-button:hover,
.ascwo-secondary-action:hover {
  background: #f6f6f7;
  color: #303030;
}

.ascwo-danger-button {
  border: 1px solid #c9cccf;
  background: #fff;
  color: #8e1f0b;
}

.ascwo-danger-button:hover {
  background: #f6f6f7;
  color: #8e1f0b;
}

.ascwo-danger-action {
  border: 0;
  background: #8e1f0b;
  color: #fff;
}

.ascwo-modal {
  position: relative;
  width: min(560px, 92vw);
  overflow: hidden;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.2);
}

.ascwo-delete-modal {
  position: relative;
  width: min(420px, 92vw);
  border-radius: 12px;
  background: #fff;
  padding: 20px;
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.2);
}

.ascwo-modal-header,
.ascwo-modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 18px;
  border-bottom: 1px solid #e1e3e5;
}

.ascwo-modal-footer {
  justify-content: flex-end;
  border-top: 1px solid #e1e3e5;
  border-bottom: 0;
}

.ascwo-close-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 0;
  background: transparent;
  color: #8c9196;
  cursor: pointer;
}

.ascwo-form-label {
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  line-height: 16px;
  color: #303030;
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

.ascwo-file-input {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 44px;
  border: 1px solid #8c9196;
  border-radius: 7px;
  display: flex;
  align-items: center;
  background: #fff;
  overflow: hidden;
}

.ascwo-file-input input {
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  height: 100%;
  border: 0;
  padding: 6px 10px;
  box-shadow: none;
  font-size: 13px;
  background: transparent;
}

.ascwo-file-button {
  margin-left: 5px;
  min-height: 32px;
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

.ascwo-help-text {
  display: block;
  margin-top: 3px;
  color: #616161;
  font-size: 12px;
  line-height: 16px;
}
</style>
