<template>
  <div class="asowp-manage-fonts asowp-bg-[#f1f1f1] asowp-min-h-screen asowp-p-4 asowp-space-y-3">
    <section class="asowp-card">
      <div class="asowp-card-inner asowp-flex asowp-items-center asowp-justify-between asowp-gap-4">
        <h1 class="asowp-text-[14px] asowp-leading-5 asowp-font-[900] asowp-text-[#303030] asowp-m-0">
          {{ __("Manage Fonts", "all-signs-options-pro") }}
        </h1>
        <button type="button" @click="backToFonts" class="asowp-secondary-button">
          <ArrowLeftIcon class="asowp-w-4 asowp-h-4" />
          {{ __("Back to fonts", "all-signs-options-pro") }}
        </button>
      </div>
    </section>

    <section class="asowp-card">
      <div class="asowp-card-inner asowp-flex asowp-items-center asowp-justify-between asowp-gap-4 asowp-min-h-[78px]">
        <div>
          <h2 class="asowp-text-[20px] asowp-leading-6 asowp-font-[900] asowp-text-[#303030] asowp-m-0">
            {{ __("Fonts", "all-signs-options-pro") }}
          </h2>
          <p class="asowp-text-[13px] asowp-leading-5 asowp-text-[#616161] asowp-m-0">
            {{ __("Manage the fonts available to configurations.", "all-signs-options-pro") }}
          </p>
        </div>
        <button type="button" @click="goToCreateFont" class="asowp-primary-button">
          <PlusIcon class="asowp-w-4 asowp-h-4" />
          {{ __("Add new font", "all-signs-options-pro") }}
        </button>
      </div>
    </section>

    <section class="asowp-card">
      <div class="asowp-card-inner">
        <div v-if="isFetching" class="asowp-py-14 asowp-flex asowp-items-center asowp-justify-center">
          <Loader2Icon class="asowp-w-7 asowp-h-7 asowp-text-[#007a72] asowp-animate-spin" />
        </div>

        <div v-else-if="fontRows.length === 0" class="asowp-py-14 asowp-text-center">
          <SearchIcon class="asowp-w-16 asowp-h-16 asowp-text-[#8c9196] asowp-mx-auto asowp-mb-3" />
          <h3 class="asowp-text-[18px] asowp-leading-6 asowp-font-[900] asowp-text-[#303030] asowp-m-0">
            {{ __("No Fonts found", "all-signs-options-pro") }}
          </h3>
          <p class="asowp-text-[13px] asowp-leading-5 asowp-text-[#616161] asowp-mt-2 asowp-mb-0">
            {{ __("Try changing the filters or search term", "all-signs-options-pro") }}
          </p>
        </div>

        <table v-else class="asowp-w-full asowp-border-collapse">
          <thead class="asowp-bg-[#f3f3f3]">
            <tr>
              <th class="asowp-py-2.5 asowp-px-3 asowp-text-left asowp-text-[12px] asowp-font-bold asowp-text-[#616161]">
                {{ __("Label", "all-signs-options-pro") }}
              </th>
              <th class="asowp-py-2.5 asowp-px-3 asowp-text-left asowp-text-[12px] asowp-font-bold asowp-text-[#616161]">
                {{ __("Actions", "all-signs-options-pro") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="font in fontRows"
              :key="font.id"
              class="asowp-border-b asowp-border-solid asowp-border-[#e5e5e5] last:asowp-border-b-0"
            >
              <td class="asowp-py-3 asowp-px-3 asowp-text-[13px] asowp-leading-5 asowp-font-[900] asowp-text-[#303030]">
                {{ font.label }}
              </td>
              <td class="asowp-py-3 asowp-px-3">
                <div class="asowp-flex asowp-items-center asowp-gap-2">
                  <button type="button" @click="goToEditFont(font)" class="asowp-outline-button">
                    {{ __("Edit", "all-signs-options-pro") }}
                  </button>
                  <button type="button" @click="selectDeleteFont(font)" class="asowp-danger-button">
                    {{ __("Delete", "all-signs-options-pro") }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div v-if="showFontModal" class="asowp-fixed asowp-inset-0 asowp-z-[20000] asowp-flex asowp-items-center asowp-justify-center">
      <div class="asowp-absolute asowp-inset-0 asowp-bg-black/45" @click="closeFontModal"></div>
      <div class="asowp-modal">
        <div class="asowp-modal-header">
          <h3 class="asowp-text-[14px] asowp-font-[900] asowp-text-[#303030] asowp-m-0">
            {{ isEdit ? __("Edit font", "all-signs-options-pro") : __("Add new font", "all-signs-options-pro") }}
          </h3>
          <button type="button" @click="closeFontModal" class="asowp-close-button">
            <XIcon class="asowp-w-5 asowp-h-5" />
          </button>
        </div>
        <div class="asowp-p-5 asowp-space-y-3">
          <label class="asowp-block">
            <span class="asowp-form-label">{{ __("Label", "all-signs-options-pro") }}</span>
            <input v-model="fontForm.label" class="asowp-form-input" autocomplete="off" />
          </label>
          <label class="asowp-block">
            <span class="asowp-form-label">{{ __("Upload font file", "all-signs-options-pro") }}</span>
            <div class="asowp-file-input">
              <button type="button" @click.prevent="selectFontFile" class="asowp-file-button">
                {{ __("Upload font file", "all-signs-options-pro") }}
              </button>
              <input v-model="fontForm.url" autocomplete="off" />
            </div>
            <span class="asowp-help-text">{{ __(".ttf or .otf font file.", "all-signs-options-pro") }}</span>
          </label>
        </div>
        <div class="asowp-modal-footer">
          <button type="button" @click="closeFontModal" class="asowp-secondary-action">
            {{ __("Cancel", "all-signs-options-pro") }}
          </button>
          <button type="button" @click="saveFont" :disabled="isLoading || !fontForm.label.trim()" class="asowp-primary-button">
            {{ isLoading ? __("Saving...", "all-signs-options-pro") : __("Save font", "all-signs-options-pro") }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="deleteFont.id !== null" class="asowp-fixed asowp-inset-0 asowp-z-[20000] asowp-flex asowp-items-center asowp-justify-center">
      <div class="asowp-absolute asowp-inset-0 asowp-bg-black/45" @click="closeDeleteModal"></div>
      <div class="asowp-delete-modal">
        <h3 class="asowp-text-[16px] asowp-font-[900] asowp-text-[#303030] asowp-mt-0 asowp-mb-2">
          {{ __("Delete font?", "all-signs-options-pro") }}
        </h3>
        <p class="asowp-text-[13px] asowp-leading-5 asowp-text-[#616161] asowp-mt-0 asowp-mb-5">
          {{ sprintf(__('Are you sure you want to delete "%s"?', "all-signs-options-pro"), deleteFont.label) }}
        </p>
        <div class="asowp-flex asowp-justify-end asowp-gap-2">
          <button type="button" @click="closeDeleteModal" class="asowp-secondary-action">
            {{ __("Cancel", "all-signs-options-pro") }}
          </button>
          <button type="button" @click="deleteSelectedFont" :disabled="isLoading" class="asowp-danger-action">
            {{ isLoading ? __("Deleting...", "all-signs-options-pro") : __("Delete", "all-signs-options-pro") }}
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
      toastMessage(__("This font already exists", "all-signs-options-pro"), "warning");
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
      toastMessage(result?.message || __("Unable to save this font", "all-signs-options-pro"), "warning");
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
      toastMessage(result?.message || __("Unable to delete this font", "all-signs-options-pro"), "warning");
    }
  } finally {
    isLoading.value = false;
  }
};

const selectFontFile = () => {
  if (!window.wp?.media) return;
  const uploader = window.wp.media({
    title: __("Select Font File", "all-signs-options-pro"),
    button: { text: __("Select font", "all-signs-options-pro") },
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
.asowp-card {
  background: #fff;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
}

.asowp-card-inner {
  padding: 18px 20px;
}

.asowp-primary-button,
.asowp-secondary-button,
.asowp-outline-button,
.asowp-danger-button,
.asowp-secondary-action,
.asowp-danger-action {
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

.asowp-primary-button {
  border: 0;
  background: #007a72;
  color: #fff;
}

.asowp-primary-button:hover {
  background: #00645f;
  color: #fff;
}

.asowp-primary-button:disabled,
.asowp-danger-action:disabled {
  background: #d8d8d8;
  color: #fff;
  cursor: not-allowed;
}

.asowp-secondary-button,
.asowp-outline-button,
.asowp-secondary-action {
  border: 1px solid #c9cccf;
  background: #fff;
  color: #303030;
}

.asowp-secondary-button:hover,
.asowp-outline-button:hover,
.asowp-secondary-action:hover {
  background: #f6f6f7;
  color: #303030;
}

.asowp-danger-button {
  border: 1px solid #c9cccf;
  background: #fff;
  color: #8e1f0b;
}

.asowp-danger-button:hover {
  background: #f6f6f7;
  color: #8e1f0b;
}

.asowp-danger-action {
  border: 0;
  background: #8e1f0b;
  color: #fff;
}

.asowp-modal {
  position: relative;
  width: min(560px, 92vw);
  overflow: hidden;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.2);
}

.asowp-delete-modal {
  position: relative;
  width: min(420px, 92vw);
  border-radius: 12px;
  background: #fff;
  padding: 20px;
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.2);
}

.asowp-modal-header,
.asowp-modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 18px;
  border-bottom: 1px solid #e1e3e5;
}

.asowp-modal-footer {
  justify-content: flex-end;
  border-top: 1px solid #e1e3e5;
  border-bottom: 0;
}

.asowp-close-button {
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

.asowp-form-label {
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  line-height: 16px;
  color: #303030;
}

.asowp-form-input {
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

.asowp-file-input {
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

.asowp-file-input input {
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

.asowp-file-button {
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

.asowp-help-text {
  display: block;
  margin-top: 3px;
  color: #616161;
  font-size: 12px;
  line-height: 16px;
}
</style>
