<template>
  <div class="asowp-template-module">
    <template v-if="view === 'list'">
      <section class="asowp-template-toolbar-card">
        <div>
          <div class="asowp-template-heading-row">
            <h1>{{ __("Templates", "all-signs-options-pro") }}</h1>
            <span class="asowp-template-count-pill">
              {{ filteredTemplates.length }} {{ filteredTemplates.length > 1 ? __("templates", "all-signs-options-pro") : __("template", "all-signs-options-pro") }}
            </span>
          </div>
          <p>{{ __("Manage your saved template library, import JSON files and open the public template packs.", "all-signs-options-pro") }}</p>
        </div>

        <div class="asowp-template-controls">
          <select v-model="selectedCategory" class="asowp-template-input asowp-template-select">
            <option value="all">{{ __("All categories", "all-signs-options-pro") }}</option>
            <option v-for="cat in categories" :key="cat.value" :value="cat.value">
              {{ cat.name }}
            </option>
          </select>

          <label class="asowp-template-search">
            <SearchIcon />
            <input
              v-model="search"
              type="search"
              :placeholder="__('Search templates', 'all-signs-options-pro')"
              @keyup.enter="handleSearchChange"
              @input="searchInputEmpty"
            />
          </label>

          <button type="button" class="asowp-template-primary-button" @click="startCreateTemplate">
            <PlusIcon />
            {{ __("Create Template", "all-signs-options-pro") }}
          </button>
          <button type="button" class="asowp-template-primary-button" @click="openImportView">
            <DownloadIcon />
            {{ __("Import", "all-signs-options-pro") }}
          </button>
          <button type="button" class="asowp-template-primary-button" @click="openExportView">
            <UploadIcon />
            {{ __("Export", "all-signs-options-pro") }}
          </button>
          <button type="button" class="asowp-template-primary-button" @click="openLibraryView">
            <PanelTopIcon />
            {{ __("Browse our template", "all-signs-options-pro") }}
          </button>
          <button type="button" class="asowp-template-primary-button" @click="openThemeBlockModal = true">
            {{ __("Add template theme", "all-signs-options-pro") }}
          </button>
        </div>
      </section>

      <section class="asowp-template-list-card">
        <h2>{{ __("Templates List", "all-signs-options-pro") }}</h2>

        <div v-if="isFetching" class="asowp-template-empty">
          <img :src="asoLogo" alt="" />
          <h3>{{ __("Loading templates...", "all-signs-options-pro") }}</h3>
        </div>

        <div v-else-if="filteredTemplates.length === 0" class="asowp-template-empty">
          <img :src="asoLogo" alt="" />
          <h3>{{ __("No templates found", "all-signs-options-pro") }}</h3>
          <p>{{ __("There is currently no template matching this filter. You can create one, import a JSON file, or open template packs.", "all-signs-options-pro") }}</p>
          <button type="button" class="asowp-template-primary-button is-compact" @click="startCreateTemplate">
            {{ __("Create template", "all-signs-options-pro") }}
          </button>
        </div>

        <div v-else class="asowp-template-grid">
          <article v-for="tpl in filteredTemplates" :key="`${tpl.configId}-${tpl._index}`" class="asowp-template-item">
            <div class="asowp-template-preview">
              <img v-if="tpl.prevImg || tpl.realImg" :src="tpl.prevImg || tpl.realImg" :alt="tpl.name" />
              <img v-else :src="asoLogo" alt="" />
            </div>
            <div class="asowp-template-item-body">
              <div>
                <h3>{{ tpl.name || __("Untitled template", "all-signs-options-pro") }}</h3>
                <p>{{ categoryMap[tpl.categoryId] || __("Uncategorized", "all-signs-options-pro") }}</p>
              </div>
              <span>{{ currencySumbol }}{{ tpl.basePrice || 0 }}</span>
            </div>
            <div class="asowp-template-item-actions">
              <button type="button" @click="selectTemplate(tpl._index, tpl)">
                <PencilIcon />
              </button>
              <button type="button" @click="selectTemplate(tpl._index, tpl, true)">
                <Trash2Icon />
              </button>
              <button type="button" @click="goToTemplate(tpl, tpl._index)">
                <SettingsIcon />
              </button>
            </div>
          </article>
        </div>
      </section>
    </template>

    <template v-else-if="view === 'form'">
      <section class="asowp-template-form-card is-title-only">
        <h1>{{ isEdit ? __("Edit template", "all-signs-options-pro") : __("Create new template", "all-signs-options-pro") }}</h1>
      </section>

      <section class="asowp-template-form-card">
        <div class="asowp-template-form-grid">
          <label class="asowp-template-field">
            <span>{{ __("Name", "all-signs-options-pro") }}</span>
            <input v-model="template.name" type="text" />
            <small v-if="isEmptyName">{{ __("Name is required", "all-signs-options-pro") }}</small>
          </label>

          <label class="asowp-template-field">
            <span>{{ __("Select configuration", "all-signs-options-pro") }}</span>
            <select v-model="template.configId">
              <option value="0" disabled>{{ __("Search configuration", "all-signs-options-pro") }}</option>
              <option v-for="config in configurations" :key="config.value" :value="config.value">
                {{ config.name }}
              </option>
            </select>
            <small v-if="isEmptyConfig">{{ __("Configuration is required", "all-signs-options-pro") }}</small>
          </label>

          <label class="asowp-template-field">
            <span>{{ __("Upload preview image", "all-signs-options-pro") }}</span>
            <ImageUploadControl :label="__('Upload preview image', 'all-signs-options-pro')" :image="template.prevImg" @choose="selectTemplatePrevImg" />
          </label>

          <label class="asowp-template-field">
            <span>{{ __("Upload real image", "all-signs-options-pro") }}</span>
            <ImageUploadControl :label="__('Upload real image', 'all-signs-options-pro')" :image="template.realImg" @choose="selectTemplateRealImg" />
          </label>

          <label class="asowp-template-field">
            <span>{{ __("Base price", "all-signs-options-pro") }}</span>
            <input v-model.number="template.basePrice" type="number" min="0" step="0.01" />
          </label>

          <div class="asowp-template-field asowp-template-toggles">
            <ToggleRow v-model="template.enablePreviewImage" :label="__('Enable auto-update for the preview image', 'all-signs-options-pro')" />
            <ToggleRow v-model="template.enableAddToCart" :label="__('Enable add to cart', 'all-signs-options-pro')" />
          </div>

          <label class="asowp-template-field">
            <span>{{ __("Select category", "all-signs-options-pro") }}</span>
            <div class="asowp-template-inline-field">
              <select v-model="template.categoryId">
                <option value="">{{ __("Search category", "all-signs-options-pro") }}</option>
                <option v-for="cat in categories" :key="cat.value" :value="cat.value">
                  {{ cat.name }}
                </option>
              </select>
              <button type="button" class="asowp-template-primary-button is-compact" @click="openCategoryModal = true">
                {{ __("Add new", "all-signs-options-pro") }}
              </button>
            </div>
          </label>
        </div>
      </section>

      <section class="asowp-template-form-actions">
        <button type="button" class="asowp-template-secondary-button" @click="back">
          <ArrowLeftIcon />
          {{ __("Back", "all-signs-options-pro") }}
        </button>
        <button type="button" class="asowp-template-primary-button is-wide" :disabled="isLoading" @click="saveOrUpdate">
          <SaveIcon />
          {{ isLoading ? __("Saving...", "all-signs-options-pro") : __("Save", "all-signs-options-pro") }}
        </button>
      </section>
    </template>

    <template v-else-if="view === 'import'">
      <ActionHeader :title="__('Import Templates', 'all-signs-options-pro')" :description="__('Import a templates JSON file into a selected configuration and category.', 'all-signs-options-pro')" @cancel="view = 'list'" />
      <section class="asowp-template-form-card">
        <div class="asowp-template-form-grid">
          <label class="asowp-template-field">
            <span>{{ __("Upload template JSON file", "all-signs-options-pro") }}</span>
            <ImageUploadControl :label="__('Choose JSON file', 'all-signs-options-pro')" :image="''" @choose="selectJsonFile" />
            <p>{{ __("Select a .json file exported from the templates module.", "all-signs-options-pro") }}</p>
          </label>
          <label class="asowp-template-field">
            <span>{{ __("Select category", "all-signs-options-pro") }}</span>
            <div class="asowp-template-inline-field">
              <select v-model="importForm.categoryId">
                <option value="">{{ __("Search category", "all-signs-options-pro") }}</option>
                <option v-for="cat in categories" :key="cat.value" :value="cat.value">{{ cat.name }}</option>
              </select>
              <button type="button" class="asowp-template-primary-button is-compact" @click="openCategoryModal = true">{{ __("Add new", "all-signs-options-pro") }}</button>
            </div>
          </label>
          <label class="asowp-template-field">
            <span>{{ __("Select configuration", "all-signs-options-pro") }}</span>
            <select v-model="importForm.configId">
              <option value="0">{{ __("Search configuration", "all-signs-options-pro") }}</option>
              <option v-for="config in configurations" :key="config.value" :value="config.value">{{ config.name }}</option>
            </select>
          </label>
        </div>
      </section>
      <section class="asowp-template-form-card">
        <div class="asowp-template-heading-row">
          <div>
            <h2>{{ __("Available JSON files", "all-signs-options-pro") }}</h2>
            <p>{{ __("Quick access to JSON files already present in this shop library.", "all-signs-options-pro") }}</p>
          </div>
          <span class="asowp-template-count-pill">0 {{ __("file", "all-signs-options-pro") }}</span>
        </div>
        <p class="asowp-template-muted">{{ __("No JSON file is currently available in the upload library for this shop.", "all-signs-options-pro") }}</p>
      </section>
      <section class="asowp-template-form-actions">
        <button type="button" class="asowp-template-primary-button is-wide" @click="notifyUnavailable">
          {{ __("Import templates", "all-signs-options-pro") }}
        </button>
      </section>
    </template>

    <template v-else-if="view === 'export'">
      <section class="asowp-template-form-card is-title-only">
        <h1>{{ __("Export Templates", "all-signs-options-pro") }}</h1>
      </section>
      <section class="asowp-template-form-card">
        <div class="asowp-template-form-grid">
          <label class="asowp-template-field">
            <span>{{ __("Select configuration", "all-signs-options-pro") }}</span>
            <select v-model="exportForm.configId">
              <option value="0">{{ __("Search configuration", "all-signs-options-pro") }}</option>
              <option v-for="config in configurations" :key="config.value" :value="config.value">{{ config.name }}</option>
            </select>
          </label>
          <div class="asowp-template-field">
            <span>{{ __("Export all templates of selected configuration", "all-signs-options-pro") }}</span>
            <ToggleRow v-model="exportForm.allTemplates" label="" />
          </div>
          <label class="asowp-template-field asowp-template-field-wide">
            <span>{{ __("Templates", "all-signs-options-pro") }}</span>
            <select v-model="exportForm.templateId">
              <option value="">{{ __("select template", "all-signs-options-pro") }}</option>
              <option v-for="tpl in templates" :key="`${tpl.configId}-${tpl._index}`" :value="tpl._index">{{ tpl.name }}</option>
            </select>
          </label>
        </div>
      </section>
      <section class="asowp-template-form-actions">
        <button type="button" class="asowp-template-secondary-button" @click="view = 'list'">
          <ArrowLeftIcon />
          {{ __("Back", "all-signs-options-pro") }}
        </button>
        <button type="button" class="asowp-template-primary-button is-wide" @click="notifyUnavailable">
          <SaveIcon />
          {{ __("Export templates", "all-signs-options-pro") }}
        </button>
      </section>
    </template>

    <template v-else-if="view === 'library'">
      <div class="asowp-template-library-layout">
        <aside class="asowp-template-library-sidebar">
          <h2>{{ __("Categories", "all-signs-options-pro") }}</h2>
          <button type="button" class="is-active">{{ __("All", "all-signs-options-pro") }}</button>
        </aside>
        <div class="asowp-template-library-main">
          <section class="asowp-template-library-header">
            <h1>{{ __("Template Library", "all-signs-options-pro") }}</h1>
            <div>
              <button type="button" class="asowp-template-filter is-active">{{ __("All", "all-signs-options-pro") }}</button>
              <button type="button" class="asowp-template-filter">{{ __("Free", "all-signs-options-pro") }}</button>
              <button type="button" class="asowp-template-filter">{{ __("Basic", "all-signs-options-pro") }}</button>
              <button type="button" class="asowp-template-filter">{{ __("Pro", "all-signs-options-pro") }}</button>
              <button type="button" class="asowp-template-primary-button" @click="view = 'list'">{{ __("Back to Templates", "all-signs-options-pro") }}</button>
            </div>
          </section>
          <section class="asowp-template-library-empty">
            <h2>{{ __("No template packs available", "all-signs-options-pro") }}</h2>
            <p>{{ __("There are no template packs available at the moment.", "all-signs-options-pro") }}</p>
            <button type="button" class="asowp-template-primary-button" @click="view = 'list'">{{ __("Back to Templates", "all-signs-options-pro") }}</button>
          </section>
        </div>
      </div>
    </template>

    <TemplateThemeModal v-if="openThemeBlockModal" @close="openThemeBlockModal = false" />
    <CategoryModal v-if="openCategoryModal" v-model="category" :loading="isLoading" @close="closeCategoryModal" @save="saveCategory" />
    <DeleteModal v-if="openModal && isDelete" :loading="isLoading" @close="closeModal" @confirm="deleteTemplate" />
  </div>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, ref } from "vue";
import {
  ArrowLeftIcon,
  DownloadIcon,
  PanelTopIcon,
  PencilIcon,
  PlusIcon,
  SaveIcon,
  SearchIcon,
  SettingsIcon,
  Trash2Icon,
  UploadIcon,
  XIcon,
} from "lucide-vue-next";
import api from "@/admin/Api/api";
import { __ } from "@wordpress/i18n";
import toastMessage from "@/admin/utils/functions";
import router from "@/admin/router";
import asoLogo from "../../../../assets/images/im_asowp-icon.png";

const emptyTemplate = () => ({
  name: "",
  categoryId: "",
  configId: 0,
  basePrice: 0,
  prevImg: "",
  realImg: "",
  enableAddToCart: true,
  enablePreviewImage: false,
  showOnFrontend: true,
  data: {
    templateData: {},
    cartData: {},
  },
});

const view = ref("list");
const openCategoryModal = ref(false);
const openThemeBlockModal = ref(false);
const openModal = ref(false);
const category = ref("");
const template = ref(emptyTemplate());
const importForm = ref({ categoryId: "", configId: 0, file: "" });
const exportForm = ref({ configId: 0, allTemplates: false, templateId: "" });
const isEmptyName = ref(false);
const isEmptyConfig = ref(false);
const currencySumbol = asowp_data.currencySymbol;
const templates = ref([]);
const template_id = ref(null);
const categories = ref([]);
const configurations = ref([]);
const isFetching = ref(true);
const isDelete = ref(false);
const isEdit = ref(false);
const isLoading = ref(false);
const search = ref("");
const selectedCategory = ref("all");

const categoryMap = computed(() => {
  const map = {};
  categories.value.forEach((cat) => {
    map[cat.value] = cat.name;
  });
  return map;
});

const filteredTemplates = computed(() => {
  let list = templates.value;
  if (selectedCategory.value !== "all") {
    list = list.filter((tpl) => String(tpl.categoryId) === String(selectedCategory.value));
  }
  const term = search.value.trim().toLowerCase();
  if (term) {
    list = list.filter((tpl) => (tpl.name || "").toLowerCase().includes(term));
  }
  return list;
});

const normalizeTemplates = (result) => {
  const list = [];
  const groups = Array.isArray(result?.templates) ? result.templates : [];
  groups.forEach((group) => {
    if (!Array.isArray(group)) return;
    group.forEach((tpl, index) => {
      if (tpl && typeof tpl === "object") {
        list.push({ ...tpl, _index: index });
      }
    });
  });
  return list;
};

const normalizeCategories = (data) => {
  if (Array.isArray(data)) {
    if (data.length && Object.prototype.hasOwnProperty.call(data[0], "value")) return data;
    return data.map((item) => ({ value: item.id ?? item.value, name: item.name ?? item.label ?? String(item) }));
  }
  if (data && typeof data === "object") {
    return Object.keys(data).map((key) => ({ value: key, name: data[key] }));
  }
  return [];
};

const fetchTemplates = async (searchTerm = "") => {
  const query = searchTerm ? `?s=${encodeURIComponent(searchTerm)}` : "";
  try {
    const result = await api.getAllTemplates(query);
    templates.value = normalizeTemplates(result);
    configurations.value = Array.isArray(result?.configurations) ? result.configurations : [];
    categories.value = normalizeCategories(result?.categories);
  } catch (error) {
    toastMessage(__("Unable to load templates.", "all-signs-options-pro"), "error");
  }
};

const handleSearchChange = async () => {
  isFetching.value = true;
  try {
    await fetchTemplates(search.value.trim());
  } finally {
    isFetching.value = false;
  }
};

const searchInputEmpty = async () => {
  if (search.value.trim() === "") {
    isFetching.value = true;
    try {
      await fetchTemplates();
    } finally {
      isFetching.value = false;
    }
  }
};

const startCreateTemplate = () => {
  isEdit.value = false;
  template_id.value = null;
  template.value = emptyTemplate();
  view.value = "form";
};

const openImportView = () => {
  importForm.value = { categoryId: categories.value[0]?.value || "", configId: configurations.value[0]?.value || 0, file: "" };
  view.value = "import";
};

const openExportView = () => {
  exportForm.value = { configId: configurations.value[0]?.value || 0, allTemplates: false, templateId: "" };
  view.value = "export";
};

const openLibraryView = () => {
  view.value = "library";
};

const notifyUnavailable = () => {
  toastMessage(__("This action is not connected to a WordPress endpoint yet.", "all-signs-options-pro"), "warning");
};

const goToTemplate = (templateData, key) => {
  router.push("/configs/template/" + templateData.configId + "/" + key).then(() => {
    window.location.reload();
  });
};

onMounted(async () => {
  isFetching.value = true;
  try {
    await fetchTemplates();
  } finally {
    isFetching.value = false;
  }
});

const selectTemplatePrevImg = (e) => {
  e?.preventDefault?.();
  const uploader = wp
    .media({
      title: __("Select Template Preview Image", "all-signs-options-pro"),
      button: { text: __("Select Image", "all-signs-options-pro") },
      multiple: false,
    })
    .on("select", () => {
      const attachment = uploader.state().get("selection").first().toJSON();
      if (attachment.type === "image") template.value.prevImg = attachment.url;
    })
    .open();
};

const selectTemplateRealImg = (e) => {
  e?.preventDefault?.();
  const uploader = wp
    .media({
      title: __("Select Template Usage Image", "all-signs-options-pro"),
      button: { text: __("Select Image", "all-signs-options-pro") },
      multiple: false,
    })
    .on("select", () => {
      const attachment = uploader.state().get("selection").first().toJSON();
      if (attachment.type === "image") template.value.realImg = attachment.url;
    })
    .open();
};

const selectJsonFile = (e) => {
  e?.preventDefault?.();
  const uploader = wp
    .media({
      title: __("Select JSON file", "all-signs-options-pro"),
      button: { text: __("Select JSON file", "all-signs-options-pro") },
      multiple: false,
    })
    .on("select", () => {
      const attachment = uploader.state().get("selection").first().toJSON();
      importForm.value.file = attachment.url;
    })
    .open();
};

const saveCategory = async () => {
  if (!category.value.trim()) return;
  isLoading.value = true;
  try {
    const save = await api.createCategory(category.value);
    if (save.success) {
      categories.value = normalizeCategories(save.categories);
      template.value.categoryId = save.key;
      importForm.value.categoryId = save.key;
      category.value = "";
      closeCategoryModal();
      toastMessage(save.message);
      return;
    }
    toastMessage(save.message, "error");
    closeCategoryModal();
  } catch (error) {
    toastMessage(__("Unable to create category.", "all-signs-options-pro"), "error");
  } finally {
    isLoading.value = false;
  }
};

const saveTemplate = async () => {
  isEmptyName.value = false;
  isEmptyConfig.value = false;
  if (template.value.configId == 0) {
    isEmptyConfig.value = true;
    return;
  }
  if (template.value.name.trim() === "") {
    isEmptyName.value = true;
    return;
  }

  isLoading.value = true;
  try {
    const result = await api.createTemplate(template.value);
    if (result.success) {
      await fetchTemplates();
      view.value = "list";
      toastMessage(result.message);
      template.value = emptyTemplate();
      return;
    }
    toastMessage(result.message, "error");
  } catch (error) {
    toastMessage(__("Unable to create template.", "all-signs-options-pro"), "error");
  } finally {
    isLoading.value = false;
  }
};

const selectTemplate = (key, temp, del = false) => {
  template_id.value = key;
  template.value = { ...emptyTemplate(), ...temp };
  delete template.value._index;
  isEmptyName.value = false;
  isEmptyConfig.value = false;
  if (del) {
    isDelete.value = true;
    openModal.value = true;
    return;
  }
  isEdit.value = true;
  view.value = "form";
};

const updateTemplate = async () => {
  isEmptyName.value = false;
  isEmptyConfig.value = false;
  if (template.value.configId == 0) {
    isEmptyConfig.value = true;
    return;
  }
  if (template.value.name.trim() === "") {
    isEmptyName.value = true;
    return;
  }

  isLoading.value = true;
  try {
    const result = await api.updateTemplate(template_id.value, template.value);
    if (result.success) {
      await fetchTemplates();
      view.value = "list";
      isEdit.value = false;
      template_id.value = null;
      toastMessage(result.message, result.success === true ? undefined : "warning");
      template.value = emptyTemplate();
      return;
    }
    toastMessage(result.message, "error");
  } catch (error) {
    toastMessage(__("Unable to update template.", "all-signs-options-pro"), "error");
  } finally {
    isLoading.value = false;
  }
};

const saveOrUpdate = () => {
  if (isEdit.value) updateTemplate();
  else saveTemplate();
};

const deleteTemplate = async () => {
  isLoading.value = true;
  try {
    const result = await api.deleteTemplate(template.value.configId, template_id.value);
    if (result.success) {
      await fetchTemplates();
      closeModal();
      toastMessage(result.message, result.success === true ? undefined : "warning");
      return;
    }
    closeModal();
    toastMessage(result.message, "error");
  } catch (error) {
    closeModal();
    toastMessage(__("Unable to delete template.", "all-signs-options-pro"), "error");
  } finally {
    isLoading.value = false;
  }
};

const back = () => {
  view.value = "list";
  isLoading.value = false;
  isDelete.value = false;
  template_id.value = null;
  isEdit.value = false;
  template.value = emptyTemplate();
  category.value = "";
  isEmptyName.value = false;
  isEmptyConfig.value = false;
};

const closeCategoryModal = () => {
  openCategoryModal.value = false;
  category.value = "";
};

const closeModal = () => {
  openModal.value = false;
  template.value = emptyTemplate();
  isDelete.value = false;
  template_id.value = null;
};

const ToggleRow = defineComponent({
  props: {
    modelValue: { type: Boolean, default: false },
    label: { type: String, default: "" },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    return () =>
      h("label", { class: "asowp-template-toggle-row" }, [
        props.label ? h("span", props.label) : null,
        h("button", {
          type: "button",
          class: ["asowp-template-toggle", { "is-on": props.modelValue }],
          onClick: () => emit("update:modelValue", !props.modelValue),
        }, [h("span")]),
      ]);
  },
});

const ImageUploadControl = defineComponent({
  props: {
    label: { type: String, required: true },
    image: { type: String, default: "" },
  },
  emits: ["choose"],
  setup(props, { emit }) {
    return () =>
      h("div", { class: "asowp-template-upload-control" }, [
        h("button", { type: "button", onClick: (event) => emit("choose", event) }, props.label),
        h("span", { class: "asowp-template-upload-preview" }, props.image ? [h("img", { src: props.image, alt: "" })] : []),
      ]);
  },
});

const ActionHeader = defineComponent({
  props: {
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  emits: ["cancel"],
  setup(props, { emit }) {
    return () =>
      h("section", { class: "asowp-template-form-card asowp-template-action-header" }, [
        h("div", [h("h1", props.title), props.description ? h("p", props.description) : null]),
        h("button", { type: "button", onClick: () => emit("cancel") }, __("Cancel", "all-signs-options-pro")),
      ]);
  },
});

const TemplateThemeModal = defineComponent({
  emits: ["close"],
  setup(_, { emit }) {
    return () =>
      h("div", { class: "asowp-template-modal-layer" }, [
        h("div", { class: "asowp-template-modal-backdrop", onClick: () => emit("close") }),
        h("div", { class: "asowp-template-modal is-medium" }, [
          h("header", [h("h2", "Templates List Block"), h("button", { type: "button", onClick: () => emit("close") }, [h(XIcon)])]),
          h("div", { class: "asowp-template-modal-body" }, [
            h("p", "This will open the theme editor and add the Templates List block to the product template. You can then place it and save."),
            h("button", { type: "button", class: "asowp-template-primary-button is-full", onClick: () => emit("close") }, "Embed Now"),
          ]),
          h("footer", [h("button", { type: "button", class: "asowp-template-secondary-button", onClick: () => emit("close") }, "cancel")]),
        ]),
      ]);
  },
});

const CategoryModal = defineComponent({
  props: {
    modelValue: { type: String, default: "" },
    loading: { type: Boolean, default: false },
  },
  emits: ["update:modelValue", "close", "save"],
  setup(props, { emit }) {
    return () =>
      h("div", { class: "asowp-template-modal-layer" }, [
        h("div", { class: "asowp-template-modal-backdrop", onClick: () => emit("close") }),
        h("div", { class: "asowp-template-modal" }, [
          h("header", [h("h2", "Create new category"), h("button", { type: "button", onClick: () => emit("close") }, [h(XIcon)])]),
          h("div", { class: "asowp-template-modal-body" }, [
            h("label", { class: "asowp-template-field" }, [
              h("span", "Name"),
              h("input", { value: props.modelValue, onInput: (event) => emit("update:modelValue", event.target.value) }),
            ]),
          ]),
          h("footer", [
            h("button", { type: "button", class: "asowp-template-secondary-button", onClick: () => emit("close") }, "cancel"),
            h("button", { type: "button", class: "asowp-template-primary-button", disabled: props.loading, onClick: () => emit("save") }, props.loading ? "Creating..." : "Create"),
          ]),
        ]),
      ]);
  },
});

const DeleteModal = defineComponent({
  props: {
    loading: { type: Boolean, default: false },
  },
  emits: ["close", "confirm"],
  setup(props, { emit }) {
    return () =>
      h("div", { class: "asowp-template-modal-layer" }, [
        h("div", { class: "asowp-template-modal-backdrop", onClick: () => emit("close") }),
        h("div", { class: "asowp-template-modal" }, [
          h("header", [h("h2", "Delete template?"), h("button", { type: "button", onClick: () => emit("close") }, [h(XIcon)])]),
          h("div", { class: "asowp-template-modal-body" }, [h("p", "This action cannot be undone.")]),
          h("footer", [
            h("button", { type: "button", class: "asowp-template-secondary-button", onClick: () => emit("close") }, "Cancel"),
            h("button", { type: "button", class: "asowp-template-danger-button", disabled: props.loading, onClick: () => emit("confirm") }, props.loading ? "Deleting..." : "Delete"),
          ]),
        ]),
      ]);
  },
});
</script>

<style>
.asowp-template-module,
.asowp-template-module * {
  box-sizing: border-box;
}

.asowp-template-module {
  display: grid;
  gap: 16px;
}

.asowp-template-toolbar-card,
.asowp-template-list-card,
.asowp-template-form-card,
.asowp-template-form-actions,
.asowp-template-library-sidebar,
.asowp-template-library-header,
.asowp-template-library-empty {
  background: #ffffff;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
}

.asowp-template-toolbar-card,
.asowp-template-form-card {
  padding: 24px 28px;
}

.asowp-template-list-card {
  min-height: 520px;
  padding: 24px 28px;
}

.asowp-template-heading-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.asowp-template-toolbar-card h1,
.asowp-template-list-card h2,
.asowp-template-form-card h1,
.asowp-template-form-card h2,
.asowp-template-library-header h1 {
  margin: 0;
  color: #202223;
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
}

.asowp-template-list-card h2,
.asowp-template-form-card h2 {
  font-size: 14px;
  line-height: 20px;
}

.asowp-template-toolbar-card p,
.asowp-template-form-card p,
.asowp-template-library-empty p,
.asowp-template-muted {
  margin: 4px 0 0;
  color: #616161;
  font-size: 13px;
  line-height: 19px;
}

.asowp-template-count-pill {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  height: 18px;
  padding: 0 8px;
  color: #0b4f8a;
  background: #d9ebff;
  border-radius: 9px;
  font-size: 11px;
  font-weight: 500;
  line-height: 16px;
}

.asowp-template-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
}

.asowp-template-input,
.asowp-template-search,
.asowp-template-field input,
.asowp-template-field select {
  height: 36px;
  color: #202223;
  background: #ffffff;
  border: 1px solid #8c9196;
  border-radius: 6px;
  font-size: 13px;
  line-height: 18px;
  outline: none;
  box-shadow: none;
}

.asowp-template-select {
  min-width: 220px;
  padding: 0 12px;
}

.asowp-template-search {
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  width: 240px;
  padding: 0 10px;
}

.asowp-template-search svg {
  width: 15px;
  height: 15px;
  color: #6d7175;
}

.asowp-template-search input {
  width: 100%;
  height: 32px;
  padding: 0;
  border: 0;
  outline: none;
  box-shadow: none;
  font-size: 13px;
}

.asowp-template-primary-button,
.asowp-template-secondary-button,
.asowp-template-danger-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 36px;
  padding: 7px 13px;
  border-radius: 6px;
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  box-shadow: none;
}

.asowp-template-primary-button svg,
.asowp-template-secondary-button svg {
  width: 16px;
  height: 16px;
}

.asowp-template-primary-button {
  color: #ffffff;
  background: #007a6f;
  border: 1px solid #006e52;
}

.asowp-template-primary-button:hover,
.asowp-template-primary-button:focus,
.asowp-template-primary-button:active {
  color: #ffffff;
  background: #006e52;
  border-color: #005c45;
  box-shadow: none;
}

.asowp-template-primary-button.is-compact {
  min-height: 30px;
  padding: 5px 10px;
  font-size: 12px;
}

.asowp-template-primary-button.is-wide {
  min-width: 150px;
}

.asowp-template-primary-button.is-full {
  width: 100%;
}

.asowp-template-secondary-button {
  color: #202223;
  background: #ffffff;
  border: 1px solid #8c9196;
}

.asowp-template-secondary-button:hover,
.asowp-template-secondary-button:focus,
.asowp-template-secondary-button:active {
  color: #202223;
  background: #ffffff;
  border-color: #6d7175;
  box-shadow: none;
}

.asowp-template-danger-button {
  color: #ffffff;
  background: #8e1f0b;
  border: 1px solid #7a1a09;
}

.asowp-template-empty {
  min-height: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.asowp-template-empty img {
  width: min(440px, 58vw);
  max-height: 280px;
  object-fit: contain;
  margin-bottom: 12px;
}

.asowp-template-empty h3 {
  margin: 0;
  color: #202223;
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
}

.asowp-template-empty p {
  max-width: 420px;
  margin: 4px 0 16px;
  color: #616161;
  font-size: 12px;
  line-height: 17px;
}

.asowp-template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 18px;
}

.asowp-template-item {
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
}

.asowp-template-preview {
  aspect-ratio: 4 / 3;
  background: #f6f6f7;
  border-bottom: 1px solid #e5e7eb;
}

.asowp-template-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.asowp-template-item-body {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 12px;
}

.asowp-template-item-body h3 {
  margin: 0;
  color: #202223;
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
}

.asowp-template-item-body p {
  margin: 2px 0 0;
  color: #616161;
  font-size: 12px;
  line-height: 16px;
}

.asowp-template-item-body span {
  flex-shrink: 0;
  align-self: start;
  padding: 2px 8px;
  color: #8e1f0b;
  background: #fff1f0;
  border-radius: 999px;
  font-size: 11px;
}

.asowp-template-item-actions {
  display: flex;
  gap: 6px;
  padding: 0 12px 12px;
}

.asowp-template-item-actions button {
  width: 30px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #5c5f62;
  background: #ffffff;
  border: 1px solid #dfe3e8;
  border-radius: 6px;
  cursor: pointer;
}

.asowp-template-item-actions svg {
  width: 14px;
  height: 14px;
}

.asowp-template-form-card.is-title-only {
  min-height: 72px;
  display: flex;
  align-items: center;
}

.asowp-template-form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px 30px;
}

.asowp-template-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #202223;
  font-size: 13px;
  line-height: 18px;
}

.asowp-template-field input,
.asowp-template-field select {
  width: 100%;
  padding: 0 12px;
}

.asowp-template-field small {
  color: #bf0711;
}

.asowp-template-field-wide {
  grid-column: 1 / -1;
}

.asowp-template-inline-field {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 6px;
  align-items: center;
}

.asowp-template-upload-control {
  display: grid;
  grid-template-columns: auto 42px;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  min-height: 44px;
  padding: 4px;
  background: #ffffff;
  border: 1px solid #202223;
  border-radius: 5px;
}

.asowp-template-upload-control button {
  min-height: 34px;
  width: auto;
  max-width: 240px;
  padding: 6px 14px;
  color: #ffffff;
  background: #007a6f;
  border: 1px solid #006e52;
  border-radius: 6px;
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
  cursor: pointer;
}

.asowp-template-upload-preview {
  width: 38px;
  height: 38px;
  justify-self: end;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #dfe3e8;
  border-radius: 7px;
}

.asowp-template-upload-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.asowp-template-toggles {
  justify-content: center;
  gap: 16px;
}

.asowp-template-toggle-row {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #202223;
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
}

.asowp-template-toggle {
  position: relative;
  width: 34px;
  height: 18px;
  padding: 0;
  background: #d2d8e5;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
}

.asowp-template-toggle span {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  background: #ffffff;
  border-radius: 999px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  transition: transform 160ms ease;
}

.asowp-template-toggle.is-on {
  background: #008060;
}

.asowp-template-toggle.is-on span {
  transform: translateX(16px);
}

.asowp-template-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 18px;
  padding: 14px 28px;
  border-radius: 0;
}

.asowp-template-action-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.asowp-template-action-header button {
  min-height: 28px;
  padding: 4px 12px;
  color: #202223;
  background: #ffffff;
  border: 1px solid #c9cccf;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
}

.asowp-template-library-layout {
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr);
  gap: 30px;
}

.asowp-template-library-sidebar {
  min-height: 400px;
  padding: 38px;
}

.asowp-template-library-sidebar h2 {
  margin: 0 0 18px;
  font-size: 15px;
}

.asowp-template-library-sidebar button,
.asowp-template-filter {
  min-height: 36px;
  padding: 8px 16px;
  color: #202223;
  background: #ffffff;
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}

.asowp-template-library-sidebar button.is-active,
.asowp-template-filter.is-active {
  color: #0b3b8c;
  background: #edf4ff;
}

.asowp-template-library-main {
  display: grid;
  gap: 20px;
}

.asowp-template-library-header {
  min-height: 82px;
  padding: 18px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.asowp-template-library-header > div {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.asowp-template-library-empty {
  min-height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.asowp-template-library-empty h2 {
  margin: 0;
  font-size: 20px;
}

.asowp-template-modal-layer {
  position: fixed;
  inset: 0;
  z-index: 20000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.asowp-template-modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
}

.asowp-template-modal {
  position: relative;
  width: min(480px, calc(100vw - 32px));
  overflow: hidden;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 20px 44px rgba(0, 0, 0, 0.24);
}

.asowp-template-modal.is-medium {
  width: min(520px, calc(100vw - 32px));
}

.asowp-template-modal header,
.asowp-template-modal footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 22px;
  border-bottom: 1px solid #dfe3e8;
}

.asowp-template-modal footer {
  justify-content: flex-end;
  border-top: 1px solid #dfe3e8;
  border-bottom: 0;
}

.asowp-template-modal h2 {
  margin: 0;
  color: #202223;
  font-size: 18px;
  line-height: 24px;
}

.asowp-template-modal header button {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #8c9196;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.asowp-template-modal header svg {
  width: 20px;
  height: 20px;
}

.asowp-template-modal-body {
  display: grid;
  gap: 18px;
  padding: 22px;
}

.asowp-template-modal-body p {
  margin: 0;
  color: #616161;
  font-size: 15px;
  line-height: 22px;
}

@media (max-width: 1100px) {
  .asowp-template-form-grid,
  .asowp-template-library-layout {
    grid-template-columns: 1fr;
  }

  .asowp-template-library-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
