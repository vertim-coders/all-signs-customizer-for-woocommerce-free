<template>
  <div class="ascwo-designs-page ascwo-space-y-3">
    <section class="ascwo-designs-header ascwo-ui-card">
      <div>
        <h2 class="ascwo-designs-title">{{ __('Design Collections', 'all-signs-customizer-for-woocommerce-pro') }}</h2>
        <p class="ascwo-designs-subtitle">
          {{ __('Create reusable design collections (tabs) and manage the designs (models) they contain.', 'all-signs-customizer-for-woocommerce-pro') }}
        </p>
      </div>
      <button type="button" @click="openNewCollection" class="ascwo-primary-button" :disabled="isLoading">
        <span class="ascwo-button-icon">+</span>
        {{ __('Add design collection', 'all-signs-customizer-for-woocommerce-pro') }}
      </button>
    </section>

    <section v-if="showCollectionForm" class="ascwo-designs-card ascwo-ui-card">
      <div class="ascwo-designs-card-header">
        <div>
          <h3>{{ collectionFormMode === 'edit' ? __('Edit design collection', 'all-signs-customizer-for-woocommerce-pro') : __('Add design collection', 'all-signs-customizer-for-woocommerce-pro') }}</h3>
          <p>{{ __('Define the collection details and how it appears in the customer configurator.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
        </div>
        <button type="button" @click="closeCollectionForm" class="ascwo-secondary-button">
          {{ __('Cancel', 'all-signs-customizer-for-woocommerce-pro') }}
        </button>
      </div>

      <div class="ascwo-designs-form-grid">
        <label class="ascwo-block">
          <span class="ascwo-form-label ascwo-label-with-count">
            <span>{{ __('Label', 'all-signs-customizer-for-woocommerce-pro') }}</span>
            <span>{{ editingCollection.label.length }} / 30</span>
          </span>
          <input v-model.trim="editingCollection.label" class="ascwo-form-input" maxlength="30" />
        </label>
        <label class="ascwo-block">
          <span class="ascwo-form-label">{{ __('Preview image', 'all-signs-customizer-for-woocommerce-pro') }}</span>
          <div class="ascwo-media-input">
            <button type="button" @click="selectCollectionImage" class="ascwo-primary-button ascwo-media-button">
              {{ __('Upload image', 'all-signs-customizer-for-woocommerce-pro') }}
            </button>
            <input :value="editingCollection.icon" readonly class="ascwo-form-input ascwo-media-field" />
          </div>
          <span class="ascwo-help-text">{{ __('Recommended: 512x512px (1:1)', 'all-signs-customizer-for-woocommerce-pro') }}</span>
        </label>
        <label class="ascwo-block ascwo-grid-span-2">
          <span class="ascwo-form-label ascwo-label-with-count">
            <span>{{ __('Description', 'all-signs-customizer-for-woocommerce-pro') }}</span>
            <span>{{ editingCollection.description.length }} / 100</span>
          </span>
          <textarea v-model.trim="editingCollection.description" class="ascwo-form-textarea" maxlength="100"></textarea>
        </label>
      </div>

      <div class="ascwo-inline-toggles">
        <label class="ascwo-toggle-row">
          <span>{{ __('Default collection', 'all-signs-customizer-for-woocommerce-pro') }}</span>
          <button type="button" @click="editingCollection.isDefault = !editingCollection.isDefault" :class="['ascwo-toggle', editingCollection.isDefault ? 'is-active' : '']">
            <span></span>
          </button>
        </label>
        <label class="ascwo-toggle-row">
          <span>{{ __('Visible', 'all-signs-customizer-for-woocommerce-pro') }}</span>
          <button type="button" @click="editingCollection.isVisible = !editingCollection.isVisible" :class="['ascwo-toggle', editingCollection.isVisible ? 'is-active' : '']">
            <span></span>
          </button>
        </label>
      </div>

      <div class="ascwo-designs-actions">
        <button type="button" @click="saveCollection" :disabled="isLoading || !canSaveCollection" class="ascwo-primary-button">
          {{ isLoading ? __('Saving...', 'all-signs-customizer-for-woocommerce-pro') : (collectionFormMode === 'edit' ? __('Update collection', 'all-signs-customizer-for-woocommerce-pro') : __('Save collection', 'all-signs-customizer-for-woocommerce-pro')) }}
        </button>
      </div>
    </section>

    <section class="ascwo-designs-card ascwo-ui-card">
      <div class="ascwo-table-wrap">
        <table class="ascwo-designs-table">
          <thead>
            <tr>
              <th>{{ __('Move', 'all-signs-customizer-for-woocommerce-pro') }}</th>
              <th>{{ __('Design Collection', 'all-signs-customizer-for-woocommerce-pro') }}</th>
              <th>{{ __('Designs (Models)', 'all-signs-customizer-for-woocommerce-pro') }}</th>
              <th>{{ __('Default Collection', 'all-signs-customizer-for-woocommerce-pro') }}</th>
              <th>{{ __('Visible', 'all-signs-customizer-for-woocommerce-pro') }}</th>
              <th>{{ __('Actions', 'all-signs-customizer-for-woocommerce-pro') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isFetching">
              <td colspan="6" class="ascwo-empty-cell">{{ __('Loading collections...', 'all-signs-customizer-for-woocommerce-pro') }}</td>
            </tr>
            <tr v-else-if="collections.length === 0">
              <td colspan="6" class="ascwo-empty-cell">{{ __('No design collections yet.', 'all-signs-customizer-for-woocommerce-pro') }}</td>
            </tr>
            <tr
              v-for="(collection, index) in collections"
              :key="collection.id || index"
              class="ascwo-clickable-row"
              @dragover.prevent
              @drop="dropCollection($event, index)"
              @click="goToCollection(collection.id || index)"
            >
              <td>
                <div v-if="false" class="ascwo-move-buttons ascwo-shopify-drag-wrap" @click.stop>
                  <button type="button" @click="moveCollection(index, -1)" :disabled="index === 0 || isLoading" class="ascwo-icon-button" aria-label="Move up">↑</button>
                  <button type="button" @click="moveCollection(index, 1)" :disabled="index === collections.length - 1 || isLoading" class="ascwo-icon-button" aria-label="Move down">↓</button>
                </div>
                <button
                  type="button"
                  class="ascwo-reorder-handle"
                  draggable="true"
                  :disabled="collections.length <= 1 || isLoading"
                  :aria-label="__('Reorder design collection', 'all-signs-customizer-for-woocommerce-pro')"
                  @click.stop
                  @dragstart.stop="startCollectionDrag($event, index)"
                  @dragend="endCollectionDrag"
                >
                  <span v-for="dot in 6" :key="dot"></span>
                </button>
              </td>
              <td>
                <div class="ascwo-collection-cell">
                  <strong>{{ collection.label || fallbackCollectionLabel(index) }}</strong>
                  <p>{{ collection.description || __('No description.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                </div>
              </td>
              <td class="ascwo-count-cell">
                {{ Array.isArray(collection.options) ? collection.options.length : 0 }}
              </td>
              <td>
                <div class="ascwo-toggle-cell">
                  <span>{{ __('No', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                  <button type="button" @click.stop="setDefaultCollection(collection.id || index)" :class="['ascwo-toggle', collection.isDefault ? 'is-active' : '']">
                    <span></span>
                  </button>
                  <span>{{ __('Yes', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                </div>
              </td>
              <td>
                <div class="ascwo-toggle-cell">
                  <span>{{ __('No', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                  <button type="button" @click.stop="toggleVisibility(collection.id || index)" :class="['ascwo-toggle', collection.isVisible !== false ? 'is-active' : '']">
                    <span></span>
                  </button>
                  <span>{{ __('Yes', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                </div>
              </td>
              <td>
                <div class="ascwo-row-actions">
                  <button type="button" @click.stop="goToCollection(collection.id || index)" class="ascwo-secondary-button ascwo-small-button">
                    {{ __('Edit', 'all-signs-customizer-for-woocommerce-pro') }}
                  </button>
                  <button type="button" @click.stop="deleteCollection(collection.id || index)" class="ascwo-danger-button ascwo-small-button">
                    {{ __('Delete', 'all-signs-customizer-for-woocommerce-pro') }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="ascwo-designs-card ascwo-ui-card">
      <div class="ascwo-designs-card-header ascwo-design-settings-header">
        <div>
          <h3>{{ __('Design Settings', 'all-signs-customizer-for-woocommerce-pro') }}</h3>
          <p>{{ __('Configure how the Designs tab will appear and behave in the customer configurator.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
        </div>
      </div>

      <div class="ascwo-designs-form-grid">
        <label class="ascwo-block">
          <span class="ascwo-form-label ascwo-label-with-count">
            <span>{{ __('Label (Tab label)', 'all-signs-customizer-for-woocommerce-pro') }}</span>
            <span>{{ sectionForm.label.length }} / 30</span>
          </span>
          <input v-model.trim="sectionForm.label" class="ascwo-form-input" maxlength="30" />
          <span class="ascwo-help-text">{{ __('Name shown as the tab label on the configurator.', 'all-signs-customizer-for-woocommerce-pro') }}</span>
        </label>
        <label class="ascwo-block">
          <span class="ascwo-form-label ascwo-label-with-count">
            <span>{{ __('Description (Optional)', 'all-signs-customizer-for-woocommerce-pro') }}</span>
            <span>{{ sectionForm.description.length }} / 100</span>
          </span>
          <textarea v-model.trim="sectionForm.description" class="ascwo-form-textarea" maxlength="100"></textarea>
          <span class="ascwo-help-text">{{ __('Short description shown under the tab label or as helper text.', 'all-signs-customizer-for-woocommerce-pro') }}</span>
        </label>
        <label class="ascwo-block">
          <span class="ascwo-form-label">{{ __('Tab icon (Optional)', 'all-signs-customizer-for-woocommerce-pro') }}</span>
          <div class="ascwo-media-input">
            <button type="button" @click="selectTabIcon" class="ascwo-primary-button ascwo-media-button">
              {{ __('Upload icon', 'all-signs-customizer-for-woocommerce-pro') }}
            </button>
            <input :value="sectionForm.settings.tabIcon" readonly class="ascwo-form-input ascwo-media-field" />
          </div>
          <span class="ascwo-help-text">{{ __('Recommended: 512x512px (1:1)', 'all-signs-customizer-for-woocommerce-pro') }}</span>
        </label>
        <label class="ascwo-block">
          <span class="ascwo-form-label">{{ __('Display collection if only one design', 'all-signs-customizer-for-woocommerce-pro') }}</span>
          <select v-model="showTabWhenSingleItemValue" class="ascwo-form-input">
            <option value="yes">{{ __('Yes', 'all-signs-customizer-for-woocommerce-pro') }}</option>
            <option value="no">{{ __('No', 'all-signs-customizer-for-woocommerce-pro') }}</option>
          </select>
        </label>
        <label class="ascwo-block ascwo-grid-span-2">
          <span class="ascwo-form-label ascwo-label-with-count">
            <span>{{ __('Empty state message (Optional)', 'all-signs-customizer-for-woocommerce-pro') }}</span>
            <span>{{ sectionForm.settings.emptyStateMessage.length }} / 100</span>
          </span>
          <input v-model.trim="sectionForm.settings.emptyStateMessage" class="ascwo-form-input" maxlength="100" />
        </label>
      </div>

      <div class="ascwo-designs-actions">
        <button type="button" @click="saveSectionSettings" :disabled="isLoading" class="ascwo-primary-button">
          {{ isLoading ? __('Saving...', 'all-signs-customizer-for-woocommerce-pro') : __('Save settings', 'all-signs-customizer-for-woocommerce-pro') }}
        </button>
      </div>

      <div class="ascwo-info-box">
        <span class="ascwo-info-icon" aria-hidden="true">i</span>
        <strong>{{ __('These settings control the Designs tab shown to customers.', 'all-signs-customizer-for-woocommerce-pro') }}</strong>
        <span>{{ __('The label, description, icon, visibility rule and empty state message are applied directly in the customer configurator.', 'all-signs-customizer-for-woocommerce-pro') }}</span>
      </div>
    </section>
  </div>
</template>

<script setup>
/* global wp */
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { __ } from '@wordpress/i18n';
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';

const route = useRoute();
const router = useRouter();

const configId = computed(() => route.params.configId);
const isFetching = ref(false);
const isLoading = ref(false);
const showCollectionForm = ref(false);
const collectionFormMode = ref('create');
const editingCollectionIndex = ref(null);
const draggingCollectionIndex = ref(null);

const emptySection = () => ({
  label: 'Components',
  description: 'Choose your design',
  settings: {
    label: 'Components',
    description: 'Choose your design',
    tabIcon: '',
    behavior: 'show-options-directly',
    showTabWhenSingleItem: true,
    emptyStateMessage: 'No designs available.',
  },
  items: [],
});

const emptyCollection = () => ({
  id: '',
  label: '',
  title: '',
  name: '',
  description: '',
  icon: '',
  isDefault: false,
  isVisible: true,
  options: [],
});

const sectionState = ref(emptySection());
const sectionForm = ref(emptySection());
const editingCollection = ref(emptyCollection());

const collections = computed(() => Array.isArray(sectionState.value.items) ? sectionState.value.items : []);

const showTabWhenSingleItemValue = computed({
  get: () => sectionForm.value.settings.showTabWhenSingleItem === false ? 'no' : 'yes',
  set: (value) => {
    sectionForm.value.settings.showTabWhenSingleItem = value !== 'no';
  },
});

const canSaveCollection = computed(() => editingCollection.value.label.trim().length > 0);

const fallbackCollectionLabel = (index) => `Collection ${index + 1}`;

const normalizeCollection = (item = {}, index = 0) => {
  const label = String(item.label || item.title || item.name || fallbackCollectionLabel(index));
  return {
    ...emptyCollection(),
    ...item,
    id: String(item.id || `component-${index + 1}`),
    label,
    title: String(item.title || label),
    name: String(item.name || label),
    description: String(item.description || ''),
    icon: String(item.icon || ''),
    isDefault: Boolean(item.isDefault),
    isVisible: item.isVisible !== false,
    options: Array.isArray(item.options) ? item.options : [],
  };
};

const normalizeSection = (raw = {}) => {
  const base = emptySection();
  const label = String(raw.label || raw.settings?.label || base.label);
  const description = String(raw.description || raw.settings?.description || base.description);

  return {
    label,
    description,
    settings: {
      ...base.settings,
      ...(raw.settings || {}),
      label,
      description,
      showTabWhenSingleItem: raw.settings?.showTabWhenSingleItem === false ? false : true,
      emptyStateMessage: String(raw.settings?.emptyStateMessage || base.settings.emptyStateMessage),
      tabIcon: String(raw.settings?.tabIcon || ''),
    },
    items: Array.isArray(raw.items) ? raw.items.map((item, index) => normalizeCollection(item, index)) : [],
  };
};

const syncSectionForm = () => {
  sectionForm.value = JSON.parse(JSON.stringify({
    label: sectionState.value.label,
    description: sectionState.value.description,
    settings: sectionState.value.settings,
  }));
};

const fetchComponents = async () => {
  isFetching.value = true;
  try {
    const result = await api.getRequiredOptionComponents(configId.value);
    sectionState.value = normalizeSection(result || {});
    syncSectionForm();
  } catch (error) {
    toastMessage(__('Unable to load designs.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
  } finally {
    isFetching.value = false;
  }
};

const persistSection = async (nextSection, successMessage) => {
  isLoading.value = true;
  try {
    const payload = normalizeSection(nextSection);
    const result = await api.updateRequiredOptionComponents(configId.value, payload);
    if (result?.success === false) {
      toastMessage(result.message || __('Unable to save changes.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
      return false;
    }

    const stored = result?.data?.components ? normalizeSection(result.data.components) : payload;
    sectionState.value = stored;
    syncSectionForm();
    toastMessage(result?.message || successMessage || __('Saved.', 'all-signs-customizer-for-woocommerce-pro'));
    return true;
  } catch (error) {
    toastMessage(__('Unable to save changes.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
    return false;
  } finally {
    isLoading.value = false;
  }
};

const openNewCollection = () => {
  collectionFormMode.value = 'create';
  editingCollectionIndex.value = null;
  editingCollection.value = emptyCollection();
  showCollectionForm.value = true;
};

const closeCollectionForm = () => {
  showCollectionForm.value = false;
  editingCollectionIndex.value = null;
  editingCollection.value = emptyCollection();
};

const saveCollection = async () => {
  if (!canSaveCollection.value) return;

  const nextItems = collections.value.map((item) => ({ ...item }));
  const nextCollection = normalizeCollection({
    ...editingCollection.value,
    label: editingCollection.value.label,
    title: editingCollection.value.label,
    name: editingCollection.value.label,
  }, editingCollectionIndex.value ?? nextItems.length);

  if (nextCollection.isDefault) {
    nextItems.forEach((item) => { item.isDefault = false; });
  }

  if (collectionFormMode.value === 'edit' && editingCollectionIndex.value !== null) {
    nextItems.splice(editingCollectionIndex.value, 1, nextCollection);
  } else {
    if (nextItems.length === 0) {
      nextCollection.isDefault = true;
    }
    nextItems.push(nextCollection);
  }

  const saved = await persistSection({
    ...sectionState.value,
    items: nextItems,
  }, __('Design collection saved.', 'all-signs-customizer-for-woocommerce-pro'));

  if (saved) {
    closeCollectionForm();
  }
};

const setDefaultCollection = async (itemId) => {
  const index = collections.value.findIndex((item, itemIndex) => String(item.id || `component-${itemIndex + 1}`) === String(itemId));
  if (index < 0) return;
  const nextItems = collections.value.map((item, itemIndex) => ({
    ...item,
    isDefault: itemIndex === index,
  }));

  await persistSection({
    ...sectionState.value,
    items: nextItems,
  }, __('Default collection updated.', 'all-signs-customizer-for-woocommerce-pro'));
};

const toggleVisibility = async (itemId) => {
  const index = collections.value.findIndex((item, itemIndex) => String(item.id || `component-${itemIndex + 1}`) === String(itemId));
  if (index < 0) return;
  const nextItems = collections.value.map((item, itemIndex) => itemIndex === index
    ? { ...item, isVisible: item.isVisible === false }
    : { ...item });

  await persistSection({
    ...sectionState.value,
    items: nextItems,
  }, __('Collection visibility updated.', 'all-signs-customizer-for-woocommerce-pro'));
};

const moveCollection = async (index, direction) => {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= collections.value.length) return;
  const nextItems = collections.value.map((item) => ({ ...item }));
  const moved = nextItems[index];
  nextItems.splice(index, 1);
  nextItems.splice(targetIndex, 0, moved);

  await persistSection({
    ...sectionState.value,
    items: nextItems,
  }, __('Collection order updated.', 'all-signs-customizer-for-woocommerce-pro'));
};

const reorderCollection = async (fromIndex, toIndex) => {
  if (fromIndex === null || fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= collections.value.length || toIndex >= collections.value.length) return;
  const nextItems = collections.value.map((item) => ({ ...item }));
  const [moved] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, moved);

  await persistSection({
    ...sectionState.value,
    items: nextItems,
  }, __('Collection order updated.', 'all-signs-customizer-for-woocommerce-pro'));
};

const startCollectionDrag = (event, index) => {
  draggingCollectionIndex.value = index;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', String(index));
};

const dropCollection = async (event, targetIndex) => {
  event.preventDefault();
  const transferValue = event.dataTransfer.getData('text/plain');
  const fromIndex = draggingCollectionIndex.value !== null
    ? draggingCollectionIndex.value
    : Number(transferValue);
  draggingCollectionIndex.value = null;
  if (!Number.isInteger(fromIndex)) return;
  await reorderCollection(fromIndex, targetIndex);
};

const endCollectionDrag = () => {
  draggingCollectionIndex.value = null;
};

const deleteCollection = async (itemId) => {
  if (!window.confirm(__('Delete this design collection?', 'all-signs-customizer-for-woocommerce-pro'))) {
    return;
  }

  const index = collections.value.findIndex((item, itemIndex) => String(item.id || `component-${itemIndex + 1}`) === String(itemId));
  if (index < 0) return;
  const nextItems = collections.value.map((item) => ({ ...item }));
  nextItems.splice(index, 1);

  await persistSection({
    ...sectionState.value,
    items: nextItems,
  }, __('Design collection deleted.', 'all-signs-customizer-for-woocommerce-pro'));
};

const goToCollection = (itemId) => {
  router.push({
    name: 'required-component-options',
    params: {
      configId: configId.value,
      componentId: String(itemId),
    },
  });
};

const saveSectionSettings = async () => {
  await persistSection({
    ...sectionState.value,
    label: sectionForm.value.label,
    description: sectionForm.value.description,
    settings: {
      ...sectionForm.value.settings,
      label: sectionForm.value.label,
      description: sectionForm.value.description,
    },
  }, __('Design settings saved.', 'all-signs-customizer-for-woocommerce-pro'));
};

const openMediaFrame = (title, buttonText, callback) => {
  const uploader = wp.media({
    title,
    button: { text: buttonText },
    multiple: false,
  });

  uploader.on('select', () => {
    const selection = uploader.state().get('selection');
    selection.map((attachment) => {
      const media = attachment.toJSON();
      if (media.type === 'image') {
        callback(media.url);
      }
    });
  });

  uploader.open();
};

const selectCollectionImage = () => {
  openMediaFrame(
    __('Select collection image', 'all-signs-customizer-for-woocommerce-pro'),
    __('Use image', 'all-signs-customizer-for-woocommerce-pro'),
    (url) => { editingCollection.value.icon = url; }
  );
};

const selectTabIcon = () => {
  openMediaFrame(
    __('Select tab icon', 'all-signs-customizer-for-woocommerce-pro'),
    __('Use icon', 'all-signs-customizer-for-woocommerce-pro'),
    (url) => { sectionForm.value.settings.tabIcon = url; }
  );
};

onMounted(fetchComponents);
</script>

<style scoped>
.ascwo-designs-page {
  padding-top: 12px;
}

.ascwo-designs-header,
.ascwo-designs-card {
  padding: 16px 20px;
}

.ascwo-designs-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.ascwo-designs-title {
  margin: 0;
  color: #303030;
  font-size: 16px;
  line-height: 24px;
  font-weight: 800;
}

.ascwo-designs-subtitle,
.ascwo-designs-card-header p,
.ascwo-help-text,
.ascwo-info-box > span:not(.ascwo-info-icon),
.ascwo-collection-cell p {
  margin: 0;
  color: #616161;
  font-size: 12px;
  line-height: 16px;
}

.ascwo-designs-card-header,
.ascwo-design-settings-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.ascwo-designs-card-header h3 {
  margin: 0 0 4px;
  color: #303030;
  font-size: 16px;
  line-height: 22px;
  font-weight: 800;
}

.ascwo-designs-form-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  padding: 16px;
}

.ascwo-grid-span-2 {
  grid-column: span 2;
}

.ascwo-form-label {
  display: block;
  margin-bottom: 4px;
  color: #303030;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
}

.ascwo-label-with-count {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.ascwo-label-with-count span:last-child {
  color: #616161;
  font-weight: 600;
}

.ascwo-form-input,
.ascwo-form-textarea {
  width: 100%;
  border: 1px solid #c9cccf;
  border-radius: 7px;
  padding: 6px 10px;
  font-size: 13px;
  line-height: 20px;
  color: #303030;
  background: #fff;
  box-sizing: border-box;
}

.ascwo-form-textarea {
  min-height: 72px;
  resize: vertical;
}

.ascwo-media-input {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0;
  align-items: center;
  border: 1px solid #111827;
  border-radius: 7px;
  padding: 4px;
}

.ascwo-media-button {
  white-space: nowrap;
}

.ascwo-media-field {
  min-width: 0;
  border-color: transparent;
  box-shadow: none;
}

.ascwo-inline-toggles,
.ascwo-designs-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 16px;
}

.ascwo-toggle-row,
.ascwo-toggle-cell {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #616161;
  font-size: 12px;
}

.ascwo-table-wrap {
  overflow-x: auto;
}

.ascwo-designs-table {
  width: 100%;
  border-collapse: collapse;
}

.ascwo-designs-table thead tr {
  background: #f6f6f7;
}

.ascwo-designs-table th,
.ascwo-designs-table td {
  padding: 10px 12px;
  border-bottom: 1px solid #eceff2;
  text-align: left;
  vertical-align: middle;
  font-size: 13px;
}

.ascwo-designs-table th {
  color: #6b7280;
  font-weight: 700;
}

.ascwo-clickable-row {
  cursor: pointer;
}

.ascwo-clickable-row:hover {
  background: #f8fafc;
}

.ascwo-empty-cell {
  padding: 36px 12px;
  text-align: center;
  color: #616161;
}

.ascwo-collection-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ascwo-collection-cell strong {
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 800;
}

.ascwo-count-cell {
  color: #303030;
  font-size: 13px;
  font-weight: 700;
}

.ascwo-row-actions,
.ascwo-move-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.ascwo-icon-button,
.ascwo-secondary-button,
.ascwo-primary-button,
.ascwo-danger-button {
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

.ascwo-small-button {
  min-height: 28px;
  padding: 5px 10px;
}

.ascwo-icon-button,
.ascwo-secondary-button {
  border: 1px solid #c9cccf;
  background: #fff;
  color: #303030;
}

.ascwo-primary-button {
  border: 0;
  background: #007a72;
  color: #fff;
}

.ascwo-danger-button {
  border: 0;
  background: transparent;
  color: #a52817;
}

.ascwo-shopify-drag-wrap {
  width: 34px;
  height: 34px;
  position: relative;
}

.ascwo-shopify-drag-wrap .ascwo-icon-button {
  width: 34px;
  height: 34px;
  min-height: 34px;
  border-radius: 999px;
  padding: 0;
  color: transparent;
  background: #f8f9fb;
}

.ascwo-shopify-drag-wrap .ascwo-icon-button:first-child::before {
  content: "";
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #6b7280;
  box-shadow:
    0 7px 0 #6b7280,
    0 14px 0 #6b7280,
    7px 0 0 #6b7280,
    7px 7px 0 #6b7280,
    7px 14px 0 #6b7280;
  transform: translate(-4px, -7px);
}

.ascwo-shopify-drag-wrap .ascwo-icon-button + .ascwo-icon-button {
  display: none;
}

.ascwo-reorder-handle {
  width: 34px;
  height: 34px;
  display: inline-grid;
  grid-template-columns: repeat(2, 4px);
  grid-auto-rows: 4px;
  place-content: center;
  gap: 4px 5px;
  border: 1px solid #d0d5dd;
  border-radius: 999px;
  background: #f8f9fb;
  padding: 0;
  color: #667085;
  cursor: grab;
  vertical-align: middle;
}

.ascwo-reorder-handle span {
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: currentColor;
}

.ascwo-reorder-handle:active {
  cursor: grabbing;
}

.ascwo-reorder-handle:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.ascwo-primary-button:disabled,
.ascwo-secondary-button:disabled,
.ascwo-icon-button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.ascwo-button-icon {
  font-size: 14px;
  line-height: 1;
}

.ascwo-toggle {
  position: relative;
  width: 34px;
  height: 20px;
  border: 0;
  border-radius: 999px;
  background: #d9dee8;
  cursor: pointer;
  transition: background 0.2s ease;
}

.ascwo-toggle span {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
  transition: transform 0.2s ease;
}

.ascwo-toggle.is-active {
  background: #007a72;
}

.ascwo-toggle.is-active span {
  transform: translateX(14px);
}

.ascwo-info-box {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 4px 12px;
  margin-top: 16px;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  background: #eff6ff;
  padding: 12px 14px;
}

.ascwo-info-box strong {
  color: #1e3a5f;
  font-size: 12px;
  line-height: 16px;
  font-weight: 800;
}

.ascwo-info-box > span:not(.ascwo-info-icon) {
  grid-column: 2;
}

.ascwo-info-icon {
  grid-row: 1 / span 2;
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
  border: 1.5px solid #0094d8;
  border-radius: 999px;
  color: #0094d8;
  font-size: 11px;
  line-height: 1;
  font-weight: 800;
  font-style: normal;
}

@media (max-width: 900px) {
  .ascwo-designs-header,
  .ascwo-designs-card-header {
    flex-direction: column;
    align-items: stretch;
  }

  .ascwo-designs-form-grid {
    grid-template-columns: 1fr;
  }

  .ascwo-grid-span-2 {
    grid-column: auto;
  }

  .ascwo-media-input {
    grid-template-columns: 1fr;
  }
}
</style>
