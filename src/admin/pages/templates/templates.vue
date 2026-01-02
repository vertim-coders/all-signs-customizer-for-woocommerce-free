<template>
  <div class="asowp-pt-5">
    <div v-if="!isNewTemplate">
      <div
        class="asowp-sticky asowp-top-[80px] asowp-z-[999] asowp-rounded-xl asowp-bg-[#fff] asowp-border asowp-border-solid asowp-border-[#e6e6e6]"
      >
        <div class="asowp-px-4 asowp-flex">
          <div class="asowp-font-bold asowp-py-5 asowp-w-[50%]">
            {{ __("Templates list", "all-signs-options-pro") }}
          </div>
          <div
            class="asowp-flex asowp-justify-end asowp-items-center asowp-space-x-2 asowp-w-[50%]"
          >
            <form
              class="asowp-flex asowp-items-center asowp-h-[35px]"
              @submit="handleSearchChange"
            >
              <label for="simple-search" class="asowp-sr-only">{{
                __("Search", "all-signs-options-pro")
              }}</label>
              <div class="asowp-relative asowp-w-full">
                <input
                  type="search"
                  v-model="search"
                  @input="searchInputEmpty"
                  id="asowp-search"
                  class="..."
                  :placeholder="__('Search template...', 'all-signs-options-pro')"
                />
              </div>
              <button type="submit" class="...">
                <span class="asowp-sr-only">{{ __("Search", "all-signs-options-pro") }}</span>
              </button>
            </form>
            <button class="..." @click="isNewTemplate = true">
              {{ __("Add new template", "all-signs-options-pro") }}
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="templates.length > 0"
        class="asowp-grid asowp-grid-cols-4 asowp-gap-4 asowp-pt-5"
      >
        <div v-for="template in templates" :key="template.id" class="...">
          <div class="asowp-p-4">
            <div class="asowp-font-bold asowp-truncate">
              {{ template.name }}
            </div>
            <div class="asowp-flex asowp-justify-between asowp-mt-4">
              <button class="..." @click="editTemplate(template)">
                {{ __("Edit", "all-signs-options-pro") }}
              </button>
              <button class="..." @click="confirmDelete(template.id)">
                {{ __("Delete", "all-signs-options-pro") }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="!isLoading" class="asowp-text-center asowp-py-20 ...">
        {{ __("No templates found.", "all-signs-options-pro") }}
      </div>
    </div>

    <div v-else class="...">
      <div class="asowp-flex asowp-items-center asowp-mb-6">
        <button @click="back" class="..."></button>
        <h2 class="asowp-text-xl asowp-font-bold">
          {{ isEdit ? __("Edit Template", "all-signs-options-pro") : __("Add New Template", "all-signs-options-pro") }}
        </h2>
      </div>

      <div class="asowp-grid asowp-grid-cols-2 asowp-gap-6">
        <div class="asowp-space-y-4">
          <div>
            <label class="asowp-block asowp-mb-2 asowp-font-medium">{{
              __("Template Name", "all-signs-options-pro")
            }}</label>
            <input
              v-model="template.name"
              type="text"
              class="..."
              :placeholder="__('Enter template name', 'all-signs-options-pro')"
            />
            <p v-if="isEmptyName" class="asowp-text-red-500 asowp-text-sm">
              {{ __("Name is required", "all-signs-options-pro") }}
            </p>
          </div>

          <div>
            <label class="asowp-block asowp-mb-2 asowp-font-medium">{{
              __("Select Configuration", "all-signs-options-pro")
            }}</label>
            <select v-model="template.configId" class="...">
              <option value="0" disabled>
                {{ __("Choose a configuration", "all-signs-options-pro") }}
              </option>
              <option
                v-for="config in configs"
                :key="config.id"
                :value="config.id"
              >
                {{ config.name }}
              </option>
            </select>
            <p v-if="isEmptyConfig" class="asowp-text-red-500 asowp-text-sm">
              {{ __("Configuration is required", "all-signs-options-pro") }}
            </p>
          </div>
        </div>
      </div>

      <div class="asowp-mt-8 asowp-flex asowp-justify-end asowp-space-x-3">
        <button @click="back" class="...">{{ __("Cancel", "all-signs-options-pro") }}</button>
        <button @click="saveTemplate" class="...">
          {{ isLoading ? __("Saving...", "all-signs-options-pro") : __("Save Template", "all-signs-options-pro") }}
        </button>
      </div>
    </div>

    <div v-if="isDelete" class="...">
      <div class="asowp-bg-white asowp-p-6 asowp-rounded-xl ...">
        <h3 class="asowp-text-lg asowp-font-bold asowp-mb-4">
          {{ __("Are you sure?", "all-signs-options-pro") }}
        </h3>
        <p class="asowp-mb-6">
          {{
            __("Do you really want to delete this template? This action cannot be undone.", "all-signs-options-pro")
          }}
        </p>
        <div class="asowp-flex asowp-justify-end asowp-space-x-3">
          <button @click="isDelete = false" class="...">
            {{ __("No, Cancel", "all-signs-options-pro") }}
          </button>
          <button @click="deleteTemplate" class="...">
            {{ __("Yes, Delete", "all-signs-options-pro") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/admin/Api/api";
import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
// Ton helper personnalisé
import toastMessage from "@/admin/utils/functions";
import Multiselect from "@vueform/multiselect";
import router from "@/admin/router";
const isNewTemplate = ref(false);
const openCategoryModal = ref(false);
const openModal = ref(false);
const category = ref("");
const template = ref({
  name: "",
  categoryId: "",
  configId: 0,
  basePrice: 0,
  prevImg: "",
  realImg: "",
  enableAddToCart: true,
  enablePreviewImage: false,
  data: {
    templateData: {},
    cartData: {},
  },
});
const isEmptyName = ref(false);
const isEmptyConfig = ref(false);
const currencySumbol = asowp_data.currencySymbol;
const templates = ref([]);
const template_id = ref(null);
const categories = ref({});
const configurations = ref([]);
const isFetching = ref(true);
const isDelete = ref(false);
const isEdit = ref(false);
const isLoading = ref(false);

const fetchTemplates = async () => {
  const result = await api.getAllTemplates();
  let tab = [];
  console.log(result.templates);
  for (let index = 0; index < result.templates.length; index++) {
    const element = result.templates[index];
    console.log(element);
    for (let i = 0; i < element.length; i++) {
      const el = {
        index: i,
        data: element[i],
      };
      tab.push(el);
    }
  }
  templates.value = tab;
  configurations.value = result.configurations;
  if (result.categories.length != 0) {
    categories.value = result.categories;
  }
};

const goToTemplate = (template, key) => {
  router.push("/configs/template/" + template.configId + "/" + key).then(() => {
    window.location.reload();
  });
};

onMounted(async () => {
  isFetching.value = true;
  await fetchTemplates();
  isFetching.value = false;
});

const selectTemplatePrevImg = async (e) => {
  e.preventDefault();
  var uploader = wp
    .media({
      title: __("Select Template Preview Image", "all-signs-options-pro"),
      button: {
        text: __("Select Image", "all-signs-options-pro"),
      },
      multiple: false,
    })
    .on("select", function () {
      var selection = uploader.state().get("selection");
      selection.map(function (attachment) {
        attachment = attachment.toJSON();
        if (attachment.type == "image") {
          template.value.prevImg = attachment.url;
        }
      });
    })
    .open();
};

const selectTemplateRealImg = async (e) => {
  e.preventDefault();
  var uploader = wp
    .media({
      title: __("Select Template Usage Image", "all-signs-options-pro"),
      button: {
        text: __("Select Image", "all-signs-options-pro"),
      },
      multiple: false,
    })
    .on("select", function () {
      var selection = uploader.state().get("selection");
      selection.map(function (attachment) {
        attachment = attachment.toJSON();
        if (attachment.type == "image") {
          template.value.realImg = attachment.url;
        }
      });
    })
    .open();
};

const saveCategory = async () => {
  isLoading.value = true;
  const save = await api.createCategory(category.value);
  if (save.success) {
    categories.value = save.categories;
    template.value.categoryId = save.key;
    category.value = "";
    isLoading.value = false;
    closeCategoryModal();
    toastMessage(save.message);
  } else {
    isLoading.value = false;
    toastMessage(save.message, "error");
    closeCategoryModal();
    category.value = "";
  }
};

const saveTemplate = async () => {
  if (template.value.name.trim() !== "" && template.value.configId != 0) {
    isLoading.value = true;
    const result = await api.createTemplate(template.value);
    if (result.success) {
      await fetchTemplates();
      isLoading.value = false;
      isNewTemplate.value = false;
      toastMessage(result.message);
      template.value = {
        name: "",
        categoryId: "",
        configId: 0,
        basePrice: 0,
        prevImg: "",
        realImg: "",
        enableAddToCart: false,
        enablePreviewImage: false,
        data: {
          templateData: {},
          cartData: {},
        },
      };
    } else {
      isLoading.value = false;
      isNewTemplate.value = false;
      toastMessage(result.message);
      template.value = {
        name: "",
        categoryId: "",
        configId: 0,
        basePrice: 0,
        prevImg: "",
        realImg: "",
        enableAddToCart: false,
        enablePreviewImage: false,
        data: {
          templateData: {},
          cartData: {},
        },
      };
    }
  } else if (template.value.configId == 0) {
    isEmptyConfig.value = true;
  } else if (template.value.name.trim() == "") {
    isEmptyName.value = true;
  }
};

const selectTemplate = async (key, temp, del = false) => {
  if (del) {
    isDelete.value = true;
    openModal.value = true;
  } else {
    isEdit.value = true;
    isNewTemplate.value = true;
  }
  template_id.value = key;
  template.value = temp;
};

const updateTemplate = async () => {
  if (template.value.name.trim() !== "" && template.value.configId != 0) {
    isLoading.value = true;
    const result = await api.updateTemplate(template_id.value, template.value);
    if (result.success) {
      await fetchTemplates();
      isLoading.value = false;
      isNewTemplate.value = false;
      isEdit.value = false;
      template_id.value = null;
      if (result.success == true) {
        toastMessage(result.message);
      } else {
        toastMessage(result.message, "warning");
      }
      template.value = {
        name: "",
        categoryId: "",
        configId: 0,
        basePrice: 0,
        prevImg: "",
        realImg: "",
        enableAddToCart: false,
        enablePreviewImage: false,
        data: {
          templateData: {},
          cartData: {},
        },
      };
    } else {
      isLoading.value = false;
      isNewTemplate.value = false;
      isEdit.value = false;
      template_id.value = null;
      toastMessage(result.message, "error");
      template.value = {
        name: "",
        categoryId: "",
        configId: 0,
        basePrice: 0,
        prevImg: "",
        realImg: "",
        enableAddToCart: false,
        enablePreviewImage: false,
        data: {
          templateData: {},
          cartData: {},
        },
      };
    }
  } else if (template.value.configId == 0) {
    isEmptyConfig.value = true;
  } else if (template.value.name.trim() == "") {
    isEmptyName.value = true;
  }
};

const deleteTemplate = async () => {
  isLoading.value = true;
  const result = await api.deleteTemplate(
    template.value.configId,
    template_id.value
  );
  console.log(result);
  if (result.success) {
    await fetchTemplates();
    isLoading.value = false;
    isDelete.value = false;
    template_id.value = null;
    openModal.value = false;
    if (result.success == true) {
      toastMessage(result.message);
    } else {
      toastMessage(result.message, "warning");
    }
    template.value = {
      name: "",
      categoryId: "",
      configId: 0,
      basePrice: 0,
      prevImg: "",
      realImg: "",
      enableAddToCart: false,
      enablePreviewImage: false,
      data: {
        templateData: {},
        cartData: {},
      },
    };
  } else {
    isLoading.value = false;
    isDelete.value = false;
    template_id.value = null;
    openModal.value = false;
    toastMessage(result.message, "error");
    template.value = {
      name: "",
      categoryId: "",
      configId: 0,
      basePrice: 0,
      realImg: "",
      prevImg: "",
      enableAddToCart: false,
      enablePreviewImage: false,
      data: {
        templateData: {},
        cartData: {},
      },
    };
  }
};

const back = () => {
  isNewTemplate.value = false;
  isLoading.value = false;
  isDelete.value = false;
  template_id.value = null;
  isEdit.value = false;
  template.value = {
    name: "",
    categoryId: "",
    configId: 0,
    basePrice: 0,
    prevImg: "",
    realImg: "",
    enableAddToCart: false,
    enablePreviewImage: false,
    data: {
      templateData: {},
      cartData: {},
    },
  };
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
  template.value = {
    name: "",
    categoryId: "",
    configId: 0,
    basePrice: 0,
    prevImg: "",
    realImg: "",
    enableAddToCart: false,
    enablePreviewImage: false,
    data: {
      templateData: {},
      cartData: {},
    },
  };
  isDelete.value = false;
};
</script>
