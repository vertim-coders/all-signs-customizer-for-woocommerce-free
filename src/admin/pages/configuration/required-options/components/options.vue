<template>
  <div class="ascwo-design-flow ascwo-space-y-3">
    <template v-if="!isDesignDetail">
      <section class="ascwo-ui-card ascwo-page-header">
        <div>
          <h2>{{ __('Edit design collection', 'all-signs-customizer-for-woocommerce-pro') }}</h2>
          <p>{{ __('Define the collection details and manage the designs (models) it contains.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
          <button type="button" @click="goBackToComponents" class="ascwo-secondary-button ascwo-back-button">
            <span class="ascwo-button-glyph">←</span>
            {{ __('Back to design collections', 'all-signs-customizer-for-woocommerce-pro') }}
          </button>
        </div>
      </section>

      <section class="ascwo-ui-card ascwo-page-card">
        <h3>{{ __('Collection information', 'all-signs-customizer-for-woocommerce-pro') }}</h3>
        <div class="ascwo-collection-grid">
          <div class="ascwo-field-stack">
            <label class="ascwo-block">
              <span class="ascwo-form-label ascwo-label-with-count">
                <span>{{ __('Label', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                <span>{{ componentForm.label.length }} / 30</span>
              </span>
              <input v-model.trim="componentForm.label" class="ascwo-form-input" maxlength="30" />
            </label>
            <label class="ascwo-block">
              <span class="ascwo-form-label ascwo-label-with-count">
                <span>{{ __('Description', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                <span>{{ componentForm.description.length }} / 100</span>
              </span>
              <textarea v-model.trim="componentForm.description" class="ascwo-form-textarea" maxlength="100"></textarea>
            </label>
          </div>

          <label class="ascwo-block">
            <span class="ascwo-form-label">{{ __('Preview image (Optional)', 'all-signs-customizer-for-woocommerce-pro') }}</span>
            <div class="ascwo-media-input">
              <button type="button" @click="selectCollectionImage" class="ascwo-primary-button ascwo-media-button">
                {{ __('Upload image', 'all-signs-customizer-for-woocommerce-pro') }}
              </button>
              <input :value="componentForm.icon" readonly class="ascwo-form-input ascwo-media-field" />
            </div>
            <span class="ascwo-help-text">{{ __('Recommended: 512x512px (1:1)', 'all-signs-customizer-for-woocommerce-pro') }}</span>
          </label>
        </div>
      </section>

      <section class="ascwo-ui-card ascwo-page-card ascwo-designs-section">
        <div class="ascwo-section-header">
          <div>
            <h3>{{ __('Designs in this collection', 'all-signs-customizer-for-woocommerce-pro') }}</h3>
            <p>{{ __('Add and manage the designs (models) that will be available in this collection.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
          </div>
          <button type="button" @click="addDesign" class="ascwo-primary-button" :disabled="isLoading">
            <span class="ascwo-button-glyph">+</span>
            {{ __('Add design', 'all-signs-customizer-for-woocommerce-pro') }}
          </button>
        </div>

        <div class="ascwo-table-wrap">
          <table class="ascwo-designs-table">
            <thead>
              <tr>
                <th>{{ __('Move', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                <th>{{ __('Design', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                <th>{{ __('Components', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                <th>{{ __('Preview', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                <th>{{ __('Default', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                <th>{{ __('Actions', 'all-signs-customizer-for-woocommerce-pro') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isFetching">
                <td colspan="6" class="ascwo-empty-cell">{{ __('Loading designs...', 'all-signs-customizer-for-woocommerce-pro') }}</td>
              </tr>
              <tr v-else-if="designs.length === 0">
                <td colspan="6" class="ascwo-empty-cell">{{ __('No designs in this collection yet.', 'all-signs-customizer-for-woocommerce-pro') }}</td>
              </tr>
              <tr
                v-for="(design, index) in designs"
                :key="design.id || index"
                :class="['ascwo-clickable-row', design.isDefault ? 'is-highlighted' : '']"
                @dragover.prevent
                @drop="dropDesign($event, index)"
                @click="goToDesign(design.id || index)"
              >
                <td>
                  <button
                    type="button"
                    :disabled="designs.length <= 1 || isLoading"
                    class="ascwo-drag-button"
                    draggable="true"
                    :aria-label="__('Reorder design', 'all-signs-customizer-for-woocommerce-pro')"
                    @click.stop
                    @dragstart.stop="startDesignDrag($event, index)"
                    @dragend="endDesignDrag"
                  >
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                  </button>
                </td>
                <td>
                  <div class="ascwo-design-cell">
                    <strong>{{ design.label || fallbackDesignLabel(index) }}</strong>
                    <p v-if="design.description">{{ design.description }}</p>
                    <p>{{ summarizeDesign(design) }}</p>
                  </div>
                </td>
                <td>
                  <div class="ascwo-component-badges">
                    <span v-for="module in visibleModules(design)" :key="module.key" class="ascwo-module-badge" :title="module.label">
                      {{ module.icon }}
                    </span>
                    <span v-if="hiddenModuleCount(design) > 0" class="ascwo-module-badge">+{{ hiddenModuleCount(design) }}</span>
                  </div>
                </td>
                <td>
                  <div class="ascwo-preview-box">
                    <img v-if="design.image" :src="design.image" :alt="design.label" />
                  </div>
                </td>
                <td>
                  <div class="ascwo-toggle-cell">
                    <span>{{ __('No', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                    <button type="button" @click.stop="setDefaultDesign(design.id || index)" :class="['ascwo-toggle', design.isDefault ? 'is-active' : '']">
                      <span></span>
                    </button>
                    <span>{{ __('Yes', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                  </div>
                </td>
                <td>
                  <div class="ascwo-row-actions" @click.stop>
                    <button type="button" @click="openMiniConfigurator(index)" class="ascwo-secondary-button ascwo-small-button">
                      <span class="ascwo-button-glyph">⚙</span>
                      {{ __('Configure', 'all-signs-customizer-for-woocommerce-pro') }}
                    </button>
                    <button type="button" @click="deleteDesign(index)" class="ascwo-danger-button ascwo-small-button">
                      {{ __('Delete', 'all-signs-customizer-for-woocommerce-pro') }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="ascwo-info-box">
          <span class="ascwo-info-icon" aria-hidden="true">i</span>
          <strong>{{ __('After adding components to a design, click Configure to open the mini configurator.', 'all-signs-customizer-for-woocommerce-pro') }}</strong>
          <span>{{ __('This will help you position and adjust elements, and also serves as the live preview.', 'all-signs-customizer-for-woocommerce-pro') }}</span>
        </div>
      </section>

      <div class="ascwo-sticky-actions">
        <button type="button" @click="saveCollectionInfo" :disabled="isLoading || !componentForm.label.trim()" class="ascwo-primary-button">
          {{ isLoading ? __('Saving...', 'all-signs-customizer-for-woocommerce-pro') : __('Update collection', 'all-signs-customizer-for-woocommerce-pro') }}
        </button>
      </div>

      <section v-if="configuredDesign" class="ascwo-ui-card ascwo-page-card ascwo-mini-configurator-card">
        <div class="ascwo-mini-configurator-header">
          <div>
            <h3>{{ configuredDesign.label || __('Configure design', 'all-signs-customizer-for-woocommerce-pro') }}</h3>
            <p>{{ __('Preview and tune the design without leaving the collection workspace.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
          </div>
          <button type="button" class="ascwo-secondary-button" @click="closeMiniConfigurator">
            {{ __('Close configurator', 'all-signs-customizer-for-woocommerce-pro') }}
          </button>
        </div>

        <div class="ascwo-mini-preview-frame">
          <div class="ascwo-mini-preview-stage">
            <div
              v-if="configuredPreview.defaultColor"
              class="ascwo-mini-preview-glow"
              :style="{ background: configuredPreview.defaultColor.hex }"
            ></div>
            <div
              class="ascwo-mini-preview-plate"
              :style="{
                borderRadius: configuredPreview.plateRadius,
                background: configuredPreview.plateBackground,
                borderColor: configuredPreview.accentColor,
                color: configuredPreview.textColor,
              }"
            >
              <template v-if="configuredPreview.fixingCount > 0">
                <span class="ascwo-mini-preview-fixing is-left"></span>
                <span class="ascwo-mini-preview-fixing is-right"></span>
              </template>

              <img
                v-for="zone in configuredPreview.imageZones"
                :key="zone.id"
                class="ascwo-mini-preview-image-zone"
                :src="zone.image"
                alt=""
                :style="{
                  left: zone.x + '%',
                  top: zone.y + '%',
                  width: zone.width + 'px',
                  height: zone.height + 'px',
                  objectFit: zone.fitMode,
                }"
              />

              <div
                v-for="zone in configuredPreview.textZones"
                :key="zone.id"
                class="ascwo-mini-preview-text-zone"
                :style="{
                  left: zone.x + '%',
                  top: zone.y + '%',
                  textAlign: zone.textAlign,
                  fontSize: zone.fontSize + 'px',
                  fontWeight: zone.bold ? 700 : 500,
                  fontStyle: zone.italic ? 'italic' : 'normal',
                  fontFamily: zone.defaultFont || 'inherit',
                  color: zone.color,
                }"
              >
                {{ zone.value || zone.label }}
              </div>

              <div class="ascwo-mini-preview-content">
                <div class="ascwo-mini-preview-logo">
                  <img v-if="configuredPreview.heroImage && configuredPreview.imageZones.length === 0" :src="configuredPreview.heroImage" alt="" />
                  <span v-else>{{ configuredPreview.glyph }}</span>
                </div>

                <div v-if="configuredPreview.textZones.length === 0" class="ascwo-mini-preview-copy">
                  <strong>{{ configuredPreview.title }}</strong>
                  <span>{{ configuredPreview.subtitle }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <template v-else>
      <section class="ascwo-ui-card ascwo-page-header ascwo-design-detail-header">
        <div>
          <h2>{{ __('Edit design', 'all-signs-customizer-for-woocommerce-pro') }}</h2>
          <p>{{ __('Create and configure this design (model) for your collection.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
          <p class="ascwo-breadcrumb-line">
            {{ __('Design collection:', 'all-signs-customizer-for-woocommerce-pro') }}
            <strong>{{ componentForm.label || __('Untitled collection', 'all-signs-customizer-for-woocommerce-pro') }}</strong>
            <span>•</span>
            {{ __('Design:', 'all-signs-customizer-for-woocommerce-pro') }}
            <strong>{{ designForm.label || fallbackDesignLabel(activeDesignIndex) }}</strong>
          </p>
        </div>
        <div class="ascwo-detail-actions">
          <button type="button" @click="goBackToCollection" class="ascwo-secondary-button">
            <span class="ascwo-button-glyph">←</span>
            {{ __('Back to designs', 'all-signs-customizer-for-woocommerce-pro') }}
          </button>
          <div>
            <button type="button" @click="configureCurrentDesign" class="ascwo-primary-button">
              <span class="ascwo-button-glyph">⚙</span>
              {{ __('Configure design', 'all-signs-customizer-for-woocommerce-pro') }}
            </button>
            <p>{{ __('Open mini configurator', 'all-signs-customizer-for-woocommerce-pro') }}</p>
          </div>
        </div>
      </section>

      <section class="ascwo-design-editor-shell">
        <aside class="ascwo-design-tabs">
          <button
            v-for="module in modules"
            :key="module.key"
            type="button"
            :class="['ascwo-design-tab', activeModule === module.key ? 'is-active' : '']"
            @click="setActiveModule(module.key)"
          >
            <span class="ascwo-tab-icon">{{ module.icon }}</span>
            <span>
              <strong>{{ module.label }}</strong>
              <small>{{ module.description }}</small>
            </span>
          </button>
        </aside>

        <div class="ascwo-design-editor-body">
          <template v-if="activeModule === 'overview'">
            <div class="ascwo-editor-heading">
              <h3>{{ __('Design details', 'all-signs-customizer-for-woocommerce-pro') }}</h3>
              <p>{{ __('Define the basic information for this design.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
            </div>

            <div class="ascwo-overview-grid">
              <div class="ascwo-field-stack">
                <label class="ascwo-block">
                  <span class="ascwo-form-label ascwo-label-with-count">
                    <span>{{ __('Design name (Label)', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                    <span>{{ designForm.label.length }}/30</span>
                  </span>
                  <input v-model.trim="designForm.label" class="ascwo-form-input" maxlength="30" />
                  <span class="ascwo-help-text">{{ __('Name shown to customers in the Designs tab.', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                </label>

                <label class="ascwo-block ascwo-upload-panel">
                  <span class="ascwo-form-label">{{ __('Design preview image', 'all-signs-customizer-for-woocommerce-pro') }} <em>{{ __('(Optional)', 'all-signs-customizer-for-woocommerce-pro') }}</em></span>
                  <span class="ascwo-help-text">{{ __('Image shown to customers in the Designs tab.', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                  <div class="ascwo-upload-box">
                    <div class="ascwo-media-input">
                      <button type="button" @click="selectDesignImage" class="ascwo-primary-button ascwo-media-button">
                        {{ __('Upload image', 'all-signs-customizer-for-woocommerce-pro') }}
                      </button>
                      <input :value="designForm.image" readonly class="ascwo-form-input ascwo-media-field" />
                    </div>
                    <span class="ascwo-help-text">{{ __('Recommended: 512x512px (1:1)', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                  </div>
                </label>

                <label class="ascwo-block">
                  <span class="ascwo-form-label">{{ __('Additional price', 'all-signs-customizer-for-woocommerce-pro') }} <em>{{ __('(Optional)', 'all-signs-customizer-for-woocommerce-pro') }}</em></span>
                  <span class="ascwo-help-text">{{ __('Extra price added when this design is selected.', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                  <div class="ascwo-price-input">
                    <input v-model.number="designForm.additionalPrice" type="number" class="ascwo-form-input" />
                    <span>{{ currencySymbol }}</span>
                  </div>
                </label>
              </div>

              <div class="ascwo-field-stack">
                <label class="ascwo-block">
                  <span class="ascwo-form-label ascwo-label-with-count">
                    <span>{{ __('Description (Optional)', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                    <span>{{ designForm.description.length }}/100</span>
                  </span>
                  <textarea v-model.trim="designForm.description" class="ascwo-form-textarea ascwo-large-textarea" maxlength="100"></textarea>
                  <span class="ascwo-help-text">{{ __('Short description shown under the design name.', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                </label>

                <div class="ascwo-preview-panel">
                  <h4>{{ __('Preview', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                  <div class="ascwo-preview-stage">
                    <img v-if="designForm.image" :src="designForm.image" :alt="designForm.label" />
                    <div v-else class="ascwo-sign-preview">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="ascwo-save-row">
              <button type="button" @click="saveDesign" :disabled="isLoading || !designForm.label.trim()" class="ascwo-primary-button">
                {{ isLoading ? __('Saving...', 'all-signs-customizer-for-woocommerce-pro') : __('Save design', 'all-signs-customizer-for-woocommerce-pro') }}
              </button>
            </div>
          </template>

          <template v-else>
            <div class="ascwo-editor-heading">
              <h3>{{ activeModuleData.label }}</h3>
              <p>{{ activeModuleData.description }}</p>
            </div>

            <template v-if="activeModule === 'size'">
              <section class="ascwo-module-card">
                <div v-if="editorMode !== 'size'" class="ascwo-module-card-header">
                  <div>
                    <h4>{{ __('Sizes available for this design', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                    <p>{{ __('Select the sizes customers can choose for this design. Set the default size in the table below.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                  </div>
                  <button type="button" class="ascwo-primary-button" @click="openPicker('size')">{{ __('Add size', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                </div>
                <div v-if="editorMode === 'size'" class="ascwo-config-card">
                  <h4>{{ __('Add size', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                  <div class="ascwo-segmented">
                    <button type="button" :class="{ 'is-active': subMode === 'existing' }" @click="subMode = 'existing'">{{ __('Choose existing', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                    <button type="button" :class="{ 'is-active': subMode === 'create' }" @click="subMode = 'create'">{{ __('Create new', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                  </div>
                  <template v-if="subMode === 'existing'">
                    <p class="ascwo-muted">{{ __('Choose one or more existing sizes. The default size for this design is set in the table below.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    <div class="ascwo-option-list">
                      <label v-for="size in availableSizeOptions" :key="size.id" class="ascwo-check-row">
                        <input type="checkbox" :checked="draftIds.includes(size.id)" @change="toggleDraftId(size.id, $event.target.checked)" />
                        <span>{{ size.label }}</span>
                      </label>
                      <p v-if="availableSizeOptions.length === 0" class="ascwo-muted ascwo-picker-empty">{{ __('All existing sizes are already linked to this design.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    </div>
                    <p v-if="draftIds.length" class="ascwo-muted ascwo-mt-2">{{ draftIds.length }} {{ draftIds.length > 1 ? __('sizes selected', 'all-signs-customizer-for-woocommerce-pro') : __('size selected', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                  </template>
                  <div v-else class="ascwo-field-stack ascwo-mt-2">
                    <label>
                      <span class="ascwo-form-label">{{ __('Label', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                      <input v-model.trim="sizeDraft.label" class="ascwo-form-input" />
                    </label>
                    <div class="ascwo-two-col">
                      <label>
                        <span class="ascwo-form-label">{{ __('Width', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                        <input v-model.number="sizeDraft.width" type="number" class="ascwo-form-input" />
                      </label>
                      <label>
                        <span class="ascwo-form-label">{{ __('Height', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                        <input v-model.number="sizeDraft.height" type="number" class="ascwo-form-input" />
                      </label>
                    </div>
                    <div class="ascwo-two-col">
                      <label>
                        <span class="ascwo-form-label">{{ __('Number of text lines', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                        <input v-model.number="sizeDraft.numberOfLines" type="number" class="ascwo-form-input" />
                      </label>
                      <label>
                        <span class="ascwo-form-label">{{ __('Max text chars', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                        <input v-model.number="sizeDraft.maxTextChar" type="number" class="ascwo-form-input" />
                      </label>
                    </div>
                  </div>
                  <div class="ascwo-form-actions">
                    <button type="button" class="ascwo-secondary-button" @click="closeEditor">{{ __('Cancel', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                    <button
                      type="button"
                      class="ascwo-primary-button"
                      :disabled="isSizeCreating || (subMode === 'existing' ? draftIds.length === 0 : !sizeDraft.label.trim())"
                      @click="subMode === 'existing' ? addSelectedSizes() : createAndAddSize()"
                    >
                      <span v-if="isSizeCreating" class="ascwo-button-loader"></span>
                      <span v-else>{{ subMode === 'existing' ? __('Add sizes', 'all-signs-customizer-for-woocommerce-pro') : __('Create size', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                    </button>
                  </div>
                </div>
                <div v-if="editorMode !== 'size'" class="ascwo-table-card ascwo-size-table-card">
                  <table class="ascwo-designs-table">
                    <thead><tr><th>{{ __('Size', 'all-signs-customizer-for-woocommerce-pro') }}</th><th>{{ __('Actions', 'all-signs-customizer-for-woocommerce-pro') }}</th><th></th></tr></thead>
                    <tbody>
                      <tr v-for="item in selectedSizeRows" :key="item.id">
                        <td>{{ item.label }}</td>
                        <td><button type="button" :class="['ascwo-toggle', item.isDefault ? 'is-active' : '']" @click="setDefaultNested('sizes', item.id)"><span></span></button></td>
                        <td><button type="button" class="ascwo-danger-button" @click="removeNestedItem('sizes', item.id)">{{ __('Remove', 'all-signs-customizer-for-woocommerce-pro') }}</button></td>
                      </tr>
                      <tr v-if="selectedSizeRows.length === 0"><td colspan="3" class="ascwo-empty-cell">{{ __('No sizes are available for this design yet.', 'all-signs-customizer-for-woocommerce-pro') }}</td></tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="editorMode !== 'size'" class="ascwo-save-row">
                  <button
                    type="button"
                    class="ascwo-primary-button"
                    :disabled="savingModule === 'Size'"
                    @click="saveDesignModule('Size')"
                  >
                    <span v-if="savingModule === 'Size'" class="ascwo-button-loader"></span>
                    <span v-else>{{ __('Save Size', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                  </button>
                </div>
              </section>
            </template>

            <template v-else-if="activeModule === 'shape'">
              <section class="ascwo-module-card">
                <div class="ascwo-module-card-header">
                  <div>
                    <h4>{{ __('Shape available for this design', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                    <p>{{ __('Choose existing shapes already available in this config, add a new managed shape, or add one custom shape just for this design.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                  </div>
                  <button type="button" class="ascwo-primary-button" @click="openPicker('shape')">{{ __('Add shape', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                </div>
                <div v-if="editorMode === 'shape'" class="ascwo-config-card">
                  <h4>{{ __('Configure shape', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                  <div class="ascwo-segmented">
                    <button type="button" :class="{ 'is-active': subMode === 'existing' }" @click="setShapeSubMode('existing')">{{ __('Choose existing', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                    <button type="button" :class="{ 'is-active': subMode === 'create' }" @click="setShapeSubMode('create')">{{ __('Add new', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                    <button type="button" :class="{ 'is-active': subMode === 'custom' }" @click="setShapeSubMode('custom')">{{ __('Add custom', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                  </div>
                  <div v-if="subMode === 'existing'" class="ascwo-option-list">
                    <p class="ascwo-muted">{{ __('Choose one shape already available in required options.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    <label v-for="shape in shapeOptions" :key="shape.id" class="ascwo-check-row ascwo-preview-check-row">
                      <input type="checkbox" :checked="draftIds.includes(shape.id)" @change="selectSingleDraftId(shape.id, $event.target.checked)" />
                      <span class="ascwo-mini-preview" v-html="shapePreview(shape)"></span>
                      <span><strong>{{ shape.label }}</strong><small>{{ shape.description || shape.shapeKey || '' }}</small></span>
                    </label>
                    <p v-if="shapeOptions.length === 0" class="ascwo-muted">{{ __('No existing shapes are available.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    <p v-if="draftIds.length" class="ascwo-muted ascwo-mt-2">{{ draftIds.length }} {{ __('shape selected', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                  </div>
                  <div v-else-if="subMode === 'create'" class="ascwo-field-stack">
                    <label>
                      <span class="ascwo-form-label">{{ __('Shape', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                      <select v-model="customDraft.shapeId" class="ascwo-form-input" @change="syncManagedShapeDraft">
                        <option v-for="shape in managedShapeChoices" :key="shape.value" :value="shape.value">{{ shape.label }}</option>
                      </select>
                    </label>
                    <div v-if="selectedManagedShape" class="ascwo-preview-choice">
                      <span class="ascwo-mini-preview" v-html="shapePreview(selectedManagedShape)"></span>
                      <span><strong>{{ selectedManagedShape.label }}</strong><small>{{ selectedManagedShape.description || selectedManagedShape.shapeKey || '' }}</small></span>
                    </div>
                    <label><span class="ascwo-form-label">{{ __('Additional price', 'all-signs-customizer-for-woocommerce-pro') }}</span><input v-model.number="customDraft.additionalPrice" type="number" class="ascwo-form-input" /></label>
                  </div>
                  <div v-else class="ascwo-field-stack">
                    <label><span class="ascwo-form-label">{{ __('Custom shape label', 'all-signs-customizer-for-woocommerce-pro') }}</span><input v-model.trim="customDraft.label" class="ascwo-form-input" /></label>
                    <label><span class="ascwo-form-label">{{ __('SVG file', 'all-signs-customizer-for-woocommerce-pro') }}</span><div class="ascwo-media-input"><button type="button" class="ascwo-primary-button" @click="selectDraftFile('url')">{{ __('SVG', 'all-signs-customizer-for-woocommerce-pro') }}</button><input :value="customDraft.url" readonly class="ascwo-form-input ascwo-media-field" /></div></label>
                    <p class="ascwo-muted">{{ __('Provide the SVG used only for this design when the shape is not part of the managed shapes list.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    <label><span class="ascwo-form-label">{{ __('Additional price', 'all-signs-customizer-for-woocommerce-pro') }}</span><input v-model.number="customDraft.additionalPrice" type="number" class="ascwo-form-input" /></label>
                  </div>
                  <div class="ascwo-form-actions">
                    <button type="button" class="ascwo-secondary-button" @click="closeEditor">{{ __('Cancel', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                    <button
                      type="button"
                      class="ascwo-primary-button"
                      :disabled="isShapeSaving || !canSaveShapeEditor"
                      @click="saveShapeEditor"
                    >
                      <span v-if="isShapeSaving" class="ascwo-button-loader"></span>
                      <span v-else>{{ subMode === 'create' ? __('Create shape', 'all-signs-customizer-for-woocommerce-pro') : __('Save shape', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                    </button>
                  </div>
                </div>
                <div v-if="editorMode !== 'shape'" class="ascwo-table-card ascwo-shape-table-card">
                  <table class="ascwo-designs-table">
                    <thead><tr><th></th><th>{{ __('Shape', 'all-signs-customizer-for-woocommerce-pro') }}</th><th>{{ __('Preview', 'all-signs-customizer-for-woocommerce-pro') }}</th><th>{{ __('Actions', 'all-signs-customizer-for-woocommerce-pro') }}</th></tr></thead>
                    <tbody>
                      <tr v-for="item in shapeRows" :key="item.id" @dragover.prevent @drop="dropNestedItem($event, 'shapes', item.id)">
                        <td>
                          <button type="button" class="ascwo-reorder-handle" draggable="true" :aria-label="__('Reorder shape', 'all-signs-customizer-for-woocommerce-pro')" @dragstart="startNestedDrag($event, 'shapes', item.id)" @dragend="endDrag">
                            <span v-for="dot in 6" :key="dot"></span>
                          </button>
                        </td>
                        <td>{{ item.label }}</td>
                        <td><span class="ascwo-mini-preview" v-html="shapePreview(item)"></span></td>
                        <td>
                          <div class="ascwo-row-actions">
                            <button type="button" class="ascwo-secondary-button" @click="editShape(item.id)">{{ __('Edit', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                            <button type="button" class="ascwo-danger-button" @click="removeNestedItem('shapes', item.id)">{{ __('Remove', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="shapeRows.length === 0"><td colspan="4" class="ascwo-empty-cell">{{ __('No shapes are available for this design yet.', 'all-signs-customizer-for-woocommerce-pro') }}</td></tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="editorMode !== 'shape'" class="ascwo-save-row">
                  <button
                    type="button"
                    class="ascwo-primary-button"
                    :disabled="savingModule === 'Shape'"
                    @click="saveDesignModule('Shape')"
                  >
                    <span v-if="savingModule === 'Shape'" class="ascwo-button-loader"></span>
                    <span v-else>{{ __('Save Shape', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                  </button>
                </div>
              </section>
            </template>

            <template v-else-if="activeModule === 'background'">
              <section class="ascwo-module-card">
                <div class="ascwo-toggle-card ascwo-background-toggle-card">
                  <div><h4>{{ __('Background colors', 'all-signs-customizer-for-woocommerce-pro') }}</h4><p>{{ __('Enable or disable the background color set for this design.', 'all-signs-customizer-for-woocommerce-pro') }}</p></div>
                  <button type="button" :class="['ascwo-toggle', designForm.backgrounds.enabled ? 'is-active' : '']" @click="toggleSectionEnabled('backgrounds')"><span></span></button>
                </div>
                <template v-if="editorMode !== 'background'">
                  <div class="ascwo-background-section-heading">
                    <h4>{{ __('Background colors linked to this design', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                    <p>{{ __('Select the colors available for this design. The default color is defined only for this design in the table below.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    <button type="button" class="ascwo-primary-button" :disabled="!designForm.backgrounds.enabled" @click="openPicker('background')">{{ __('Add color', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                  </div>
                  <div class="ascwo-table-card ascwo-background-table-card">
                    <table class="ascwo-designs-table">
                      <colgroup>
                        <col class="ascwo-background-color-col" />
                        <col class="ascwo-background-default-col" />
                        <col class="ascwo-background-remove-col" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>{{ __('Color', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                          <th>{{ __('Actions', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in designForm.backgrounds.items" :key="item.id">
                          <td><span class="ascwo-color-dot" :style="{ background: colorHex(item.id) }"></span>{{ colorLabel(item.id) }}</td>
                          <td><button type="button" :class="['ascwo-toggle', item.isDefault ? 'is-active' : '']" @click="setDefaultNested('backgrounds', item.id)"><span></span></button></td>
                          <td><button type="button" class="ascwo-danger-button" @click="removeNestedItem('backgrounds', item.id)">{{ __('Remove', 'all-signs-customizer-for-woocommerce-pro') }}</button></td>
                        </tr>
                        <tr v-if="designForm.backgrounds.items.length === 0"><td colspan="3" class="ascwo-empty-cell">{{ __('No background colors are available for this design.', 'all-signs-customizer-for-woocommerce-pro') }}</td></tr>
                      </tbody>
                    </table>
                  </div>
                </template>
                <div v-else class="ascwo-background-editor-card">
                  <h4>{{ __('Add color', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                  <div class="ascwo-segmented">
                    <button type="button" :class="{ 'is-active': subMode === 'existing' }" @click="setBackgroundSubMode('existing')">{{ __('Choose existing', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                    <button type="button" :class="{ 'is-active': subMode === 'create' }" @click="setBackgroundSubMode('create')">{{ __('Create new', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                  </div>

                  <template v-if="subMode === 'existing'">
                    <p class="ascwo-muted">{{ __('Choose one or more existing colors. The default color for this design is set in the table below.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    <div class="ascwo-option-list ascwo-background-option-list">
                      <label v-for="item in availableColorOptions" :key="item.id" class="ascwo-check-row">
                        <input type="checkbox" :checked="draftIds.includes(item.id)" @change="toggleDraftId(item.id, $event.target.checked)" />
                        <span>{{ item.label }}</span>
                      </label>
                      <div v-if="availableColorOptions.length === 0" class="ascwo-empty-cell">{{ __('No colors are available to add.', 'all-signs-customizer-for-woocommerce-pro') }}</div>
                    </div>
                    <div class="ascwo-form-actions">
                      <button type="button" class="ascwo-secondary-button" @click="closeEditor">{{ __('Cancel', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                      <button type="button" class="ascwo-primary-button" :disabled="draftIds.length === 0 || isBackgroundSaving" @click="addBackgroundColors">
                        <span v-if="isBackgroundSaving" class="ascwo-button-loader"></span>
                        <span v-else>{{ __('Add colors', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                      </button>
                    </div>
                  </template>

                  <template v-else>
                    <label><span class="ascwo-form-label">{{ __('Label', 'all-signs-customizer-for-woocommerce-pro') }}</span><input v-model.trim="backgroundDraft.label" class="ascwo-form-input" /></label>
                    <label>
                      <span class="ascwo-form-label">{{ __('Preview image', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                      <div class="ascwo-media-input ascwo-preview-media-input">
                        <button type="button" class="ascwo-primary-button" @click="selectBackgroundDraftFile('previewImg')">{{ __('Image', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                        <input :value="backgroundDraft.previewImg" readonly class="ascwo-form-input ascwo-media-field" />
                        <button v-if="backgroundDraft.previewImg" type="button" class="ascwo-media-remove-button" @click="backgroundDraft.previewImg = ''">{{ __('Delete', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                        <img v-if="backgroundDraft.previewImg" :src="backgroundDraft.previewImg" alt="" class="ascwo-media-thumb" />
                      </div>
                    </label>
                    <div class="ascwo-background-pattern-row">
                      <div><h5>{{ __('Pattern', 'all-signs-customizer-for-woocommerce-pro') }}</h5><p>{{ __('Choose between a flat background color or a pattern image.', 'all-signs-customizer-for-woocommerce-pro') }}</p></div>
                      <div class="ascwo-switch-line"><span>{{ __('Flat color', 'all-signs-customizer-for-woocommerce-pro') }}</span><button type="button" :class="['ascwo-toggle', backgroundDraft.usePattern ? 'is-active' : '']" @click="backgroundDraft.usePattern = !backgroundDraft.usePattern"><span></span></button><span>{{ __('Pattern image', 'all-signs-customizer-for-woocommerce-pro') }}</span></div>
                    </div>
                    <label v-if="!backgroundDraft.usePattern"><span class="ascwo-form-label">{{ __('Material background color', 'all-signs-customizer-for-woocommerce-pro') }}</span><div class="ascwo-color-input-row"><input v-model="backgroundDraft.hexCode" type="color" /><input v-model.trim="backgroundDraft.hexCode" class="ascwo-form-input" /></div></label>
                    <label v-else>
                      <span class="ascwo-form-label">{{ __('Pattern image', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                      <div class="ascwo-media-input ascwo-preview-media-input">
                        <button type="button" class="ascwo-primary-button" @click="selectBackgroundDraftFile('patternImage')">{{ __('Image', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                        <input :value="backgroundDraft.patternImage" readonly class="ascwo-form-input ascwo-media-field" />
                        <button v-if="backgroundDraft.patternImage" type="button" class="ascwo-media-remove-button" @click="backgroundDraft.patternImage = ''">{{ __('Delete', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                        <img v-if="backgroundDraft.patternImage" :src="backgroundDraft.patternImage" alt="" class="ascwo-media-thumb" />
                      </div>
                    </label>
                    <div class="ascwo-background-pattern-row">
                      <div><h5>{{ __('Text color', 'all-signs-customizer-for-woocommerce-pro') }}</h5><p>{{ __('Enable a dedicated text color for this color option.', 'all-signs-customizer-for-woocommerce-pro') }}</p></div>
                      <button type="button" :class="['ascwo-toggle', backgroundDraft.enableTextColor ? 'is-active' : '']" @click="backgroundDraft.enableTextColor = !backgroundDraft.enableTextColor"><span></span></button>
                    </div>
                    <div v-if="backgroundDraft.enableTextColor" class="ascwo-background-text-color-fields">
                      <label><span class="ascwo-form-label">{{ __('Text color name', 'all-signs-customizer-for-woocommerce-pro') }}</span><input v-model.trim="backgroundDraft.textColorName" class="ascwo-form-input" /></label>
                      <label><span class="ascwo-form-label">{{ __('Text color', 'all-signs-customizer-for-woocommerce-pro') }}</span><div class="ascwo-color-input-row"><input v-model="backgroundDraft.textHexCode" type="color" /><input v-model.trim="backgroundDraft.textHexCode" class="ascwo-form-input" /></div></label>
                      <div class="ascwo-background-pattern-row ascwo-same-border-color-row">
                        <span>{{ __('Use the same color for border', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                        <button type="button" :class="['ascwo-toggle', backgroundDraft.useSameColorForBorder ? 'is-active' : '']" @click="backgroundDraft.useSameColorForBorder = !backgroundDraft.useSameColorForBorder"><span></span></button>
                      </div>
                    </div>
                    <label><span class="ascwo-form-label">{{ __('Additional price', 'all-signs-customizer-for-woocommerce-pro') }}</span><input v-model.number="backgroundDraft.additionalPrice" type="number" min="0" step="0.01" class="ascwo-form-input" /></label>
                    <div class="ascwo-form-actions">
                      <button type="button" class="ascwo-secondary-button" @click="closeEditor">{{ __('Cancel', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                      <button type="button" class="ascwo-primary-button" :disabled="!canCreateBackgroundColor || isBackgroundSaving" @click="createAndAddBackgroundColor">
                        <span v-if="isBackgroundSaving" class="ascwo-button-loader"></span>
                        <span v-else>{{ __('Create color', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                      </button>
                    </div>
                  </template>
                </div>
                <div class="ascwo-toggle-card ascwo-custom-color-card">
                  <div><h4>{{ __('Custom color', 'all-signs-customizer-for-woocommerce-pro') }}</h4><p>{{ __('Allow customers to choose a custom color for this design.', 'all-signs-customizer-for-woocommerce-pro') }}</p><label v-if="designForm.backgrounds.enableCustomColor" class="ascwo-custom-color-label"><span class="ascwo-form-label">{{ __('Custom color label', 'all-signs-customizer-for-woocommerce-pro') }}</span><input v-model.trim="designForm.backgrounds.customColorLabel" class="ascwo-form-input" /></label></div>
                  <button type="button" :class="['ascwo-toggle', designForm.backgrounds.enableCustomColor ? 'is-active' : '']" @click="designForm.backgrounds.enableCustomColor = !designForm.backgrounds.enableCustomColor"><span></span></button>
                </div>
                <div class="ascwo-save-row">
                  <button type="button" class="ascwo-primary-button" :disabled="savingModule === 'Background'" @click="saveDesignModule('Background')">
                    <span v-if="savingModule === 'Background'" class="ascwo-button-loader"></span>
                    <span v-else>{{ __('Save Background', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                  </button>
                </div>
              </section>
            </template>

            <template v-else-if="activeModule === 'fixing'">
              <section class="ascwo-module-card">
                <div v-if="editorMode !== 'fixing'" class="ascwo-module-card-header">
                  <div>
                    <h4>{{ __('Fixing methods available for this design', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                    <p>{{ __('Choose existing fixing methods already available in this config, add a new global fixing method, or add one custom fixing method for this design.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                  </div>
                  <button type="button" class="ascwo-primary-button" @click="openPicker('fixing')">{{ __('Add fixing method', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                </div>

                <div v-if="editorMode === 'fixing'" class="ascwo-config-card ascwo-fixing-editor-card">
                  <h4>{{ __('Configure fixing methods', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                  <div class="ascwo-segmented">
                    <button type="button" :class="{ 'is-active': subMode === 'existing' }" @click="setFixingSubMode('existing')">{{ __('Choose existing', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                    <button type="button" :class="{ 'is-active': subMode === 'create' }" @click="setFixingSubMode('create')">{{ __('Add new', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                    <button type="button" :class="{ 'is-active': subMode === 'custom' }" @click="setFixingSubMode('custom')">{{ __('Add custom', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                  </div>

                  <template v-if="subMode === 'existing'">
                    <p class="ascwo-muted">{{ __('Select one or more existing fixing methods. The default method for this design is defined in the table below.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    <div class="ascwo-option-list ascwo-fixing-option-list">
                      <label v-for="item in fixingOptions" :key="item.id" class="ascwo-check-row ascwo-preview-check-row">
                        <input type="checkbox" :checked="draftIds.includes(item.id)" @change="toggleDraftId(item.id, $event.target.checked)" />
                        <span class="ascwo-mini-preview" v-html="fixingPreview(item)"></span>
                        <span><strong>{{ item.label }}</strong></span>
                      </label>
                      <div v-if="fixingOptions.length === 0" class="ascwo-empty-cell">{{ __('No fixing methods are available.', 'all-signs-customizer-for-woocommerce-pro') }}</div>
                    </div>
                    <p v-if="draftIds.length" class="ascwo-muted ascwo-mt-2">{{ draftIds.length }} {{ draftIds.length > 1 ? __('fixing methods selected', 'all-signs-customizer-for-woocommerce-pro') : __('fixing method selected', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    <div class="ascwo-form-actions">
                      <button type="button" class="ascwo-secondary-button" @click="closeEditor">{{ __('Cancel', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                      <button type="button" class="ascwo-primary-button" :disabled="draftIds.length === 0 || isFixingSaving" @click="saveExistingFixingMethods">
                        <span v-if="isFixingSaving" class="ascwo-button-loader"></span>
                        <span v-else>{{ __('Add fixing methods', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                      </button>
                    </div>
                  </template>

                  <template v-else-if="subMode === 'create'">
                    <p class="ascwo-muted">{{ __('Create a new global fixing method from the managed fixing methods library, then associate it directly to this design.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    <label><span class="ascwo-form-label">{{ __('From Manage Fixing Methods', 'all-signs-customizer-for-woocommerce-pro') }}</span><select v-model="customDraft.fixingMethodId" class="ascwo-form-input" @change="syncManagedFixingDraft"><option value="">{{ __('None', 'all-signs-customizer-for-woocommerce-pro') }}</option><option v-for="item in managedFixingChoices" :key="item.value" :value="item.value">{{ item.label }}</option></select></label>
                    <div class="ascwo-preview-choice">
                      <span class="ascwo-mini-preview" v-html="fixingPreview(selectedManagedFixing || {})"></span>
                      <div><strong>{{ selectedManagedFixing?.label || __('None', 'all-signs-customizer-for-woocommerce-pro') }}</strong><small>{{ selectedManagedFixing?.description || 'none' }}</small></div>
                    </div>
                    <label><span class="ascwo-form-label">{{ __('Additional price', 'all-signs-customizer-for-woocommerce-pro') }}</span><input v-model.number="customDraft.additionalPrice" type="number" min="0" step="0.01" class="ascwo-form-input" /></label>
                    <label><span class="ascwo-form-label">{{ __('Exclude sizes', 'all-signs-customizer-for-woocommerce-pro') }}</span><div class="ascwo-option-list ascwo-compact-option-list"><label v-for="size in sizeOptions" :key="size.id" class="ascwo-check-row"><input type="checkbox" :checked="customDraft.excludeSizes?.includes(size.id)" @change="toggleCustomDraftList('excludeSizes', size.id, $event.target.checked)" /><span>{{ size.label }}</span></label></div></label>
                    <label><span class="ascwo-form-label">{{ __('Exclude shapes', 'all-signs-customizer-for-woocommerce-pro') }}</span><div class="ascwo-option-list ascwo-compact-option-list"><label v-for="shape in shapeOptions" :key="shape.id" class="ascwo-check-row"><input type="checkbox" :checked="customDraft.excludeShapes?.includes(shape.id)" @change="toggleCustomDraftList('excludeShapes', shape.id, $event.target.checked)" /><span>{{ shape.label }}</span></label></div></label>
                    <div class="ascwo-form-actions">
                      <button type="button" class="ascwo-secondary-button" @click="closeEditor">{{ __('Cancel', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                      <button type="button" class="ascwo-primary-button" :disabled="!canSaveFixingEditor || isFixingSaving" @click="createAndAddFixingMethod">
                        <span v-if="isFixingSaving" class="ascwo-button-loader"></span>
                        <span v-else>{{ __('Create fixing method', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                      </button>
                    </div>
                  </template>

                  <template v-else>
                    <label><span class="ascwo-form-label">{{ __('Custom fixing label', 'all-signs-customizer-for-woocommerce-pro') }}</span><input v-model.trim="customDraft.label" class="ascwo-form-input" /></label>
                    <label><span class="ascwo-form-label">{{ __('Size', 'all-signs-customizer-for-woocommerce-pro') }}</span><select v-model="customDraft.sizeId" class="ascwo-form-input"><option v-for="size in sizeOptions" :key="size.id" :value="size.id">{{ size.label }}</option></select></label>
                    <label><span class="ascwo-form-label">{{ __('SVG file', 'all-signs-customizer-for-woocommerce-pro') }}</span><div class="ascwo-media-input"><button type="button" class="ascwo-primary-button" @click="selectDraftFile('url')">{{ __('SVG', 'all-signs-customizer-for-woocommerce-pro') }}</button><input :value="customDraft.url" readonly class="ascwo-form-input ascwo-media-field" /></div></label>
                    <label><span class="ascwo-form-label">{{ __('Additional price', 'all-signs-customizer-for-woocommerce-pro') }}</span><input v-model.number="customDraft.additionalPrice" type="number" min="0" step="0.01" class="ascwo-form-input" /></label>
                    <div class="ascwo-form-actions">
                      <button type="button" class="ascwo-secondary-button" @click="closeEditor">{{ __('Cancel', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                      <button type="button" class="ascwo-primary-button" :disabled="!canSaveFixingEditor || isFixingSaving" @click="saveCustomFixingMethod">
                        <span v-if="isFixingSaving" class="ascwo-button-loader"></span>
                        <span v-else>{{ __('Save custom fixing', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                      </button>
                    </div>
                  </template>
                </div>

                <div v-if="editorMode !== 'fixing'" class="ascwo-table-card ascwo-fixing-table-card">
                  <table class="ascwo-designs-table">
                    <thead><tr><th></th><th>{{ __('Fixing method', 'all-signs-customizer-for-woocommerce-pro') }}</th><th>{{ __('Preview', 'all-signs-customizer-for-woocommerce-pro') }}</th><th>{{ __('Default', 'all-signs-customizer-for-woocommerce-pro') }}</th><th>{{ __('Actions', 'all-signs-customizer-for-woocommerce-pro') }}</th></tr></thead>
                    <tbody>
                      <tr v-for="item in selectedFixingRows" :key="item.id" @dragover.prevent @drop="dropNestedItem($event, 'fixingMethods', item.id)">
                        <td>
                          <button type="button" class="ascwo-reorder-handle" draggable="true" :aria-label="__('Reorder fixing method', 'all-signs-customizer-for-woocommerce-pro')" @dragstart="startNestedDrag($event, 'fixingMethods', item.id)" @dragend="endDrag">
                            <span v-for="dot in 6" :key="dot"></span>
                          </button>
                        </td>
                        <td><strong>{{ item.label }}</strong><p>{{ item.description }}</p></td>
                        <td><span class="ascwo-mini-preview" v-html="fixingPreview(item.source || item.item)"></span></td>
                        <td><button type="button" :class="['ascwo-toggle', item.isDefault ? 'is-active' : '']" @click="setDefaultNested('fixingMethods', item.id)"><span></span></button></td>
                        <td><div class="ascwo-row-actions"><button type="button" class="ascwo-secondary-button" @click="editFixing(item.id)">{{ __('Edit', 'all-signs-customizer-for-woocommerce-pro') }}</button><button type="button" class="ascwo-danger-button" @click="removeNestedItem('fixingMethods', item.id)">{{ __('Remove', 'all-signs-customizer-for-woocommerce-pro') }}</button></div></td>
                      </tr>
                      <tr v-if="selectedFixingRows.length === 0"><td colspan="5" class="ascwo-empty-cell">{{ __('No fixing methods are available for this design yet.', 'all-signs-customizer-for-woocommerce-pro') }}</td></tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="editorMode !== 'fixing'" class="ascwo-save-row">
                  <button type="button" class="ascwo-primary-button" :disabled="savingModule === 'Fixing'" @click="saveDesignModule('Fixing')">
                    <span v-if="savingModule === 'Fixing'" class="ascwo-button-loader"></span>
                    <span v-else>{{ __('Save Fixing', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                  </button>
                </div>
              </section>
            </template>

            <template v-else-if="activeModule === 'text'">
              <section class="ascwo-module-card ascwo-text-module">
                <div class="ascwo-module-card-header ascwo-text-module-header">
                  <div>
                    <h4>{{ __('Text zones available for this design', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                    <p>{{ __('Configure the text zones for this design. Advanced placement and positioning are handled in the mini configurator.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                  </div>
                  <button type="button" class="ascwo-primary-button" @click.stop.prevent="openTextZone()">{{ __('Add text zone', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                </div>

                <div v-if="editorMode === 'text'" class="ascwo-config-card ascwo-zone-editor ascwo-text-zone-editor">
                  <h4>{{ editingZoneId ? __('Edit text zone', 'all-signs-customizer-for-woocommerce-pro') : __('Add text zone', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                  <div class="ascwo-text-zone-content">
                    <h5>{{ __('Content', 'all-signs-customizer-for-woocommerce-pro') }}</h5>
                    <p>{{ __('Define the customer-facing label and default text.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    <div class="ascwo-two-col">
                      <label>
                        <span class="ascwo-form-label">{{ __('Field label', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                        <input v-model.trim="textZoneDraft.label" class="ascwo-form-input" />
                      </label>
                      <label>
                        <span class="ascwo-form-label">{{ __('Default value (Optional)', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                        <input v-model="textZoneDraft.value" class="ascwo-form-input" />
                      </label>
                    </div>

                    <h5>{{ __('Validation', 'all-signs-customizer-for-woocommerce-pro') }}</h5>
                    <p>{{ __('Set input constraints for this text zone.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    <div class="ascwo-text-validation-grid">
                      <label class="ascwo-inline-check ascwo-required-check">
                        <input v-model="textZoneDraft.required" type="checkbox" />
                        {{ __('Required', 'all-signs-customizer-for-woocommerce-pro') }}
                      </label>
                      <label>
                        <span class="ascwo-form-label">{{ __('Min characters', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                        <input v-model.number="textZoneDraft.minCharacters" type="number" min="0" class="ascwo-form-input" />
                      </label>
                      <label>
                        <span class="ascwo-form-label">{{ __('Max characters', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                        <input v-model.number="textZoneDraft.maxCharacters" type="number" min="0" class="ascwo-form-input" />
                      </label>
                    </div>
                  </div>

                  <div class="ascwo-form-actions">
                    <button type="button" class="ascwo-secondary-button" @click.stop.prevent="closeEditor">{{ __('Cancel', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                    <button type="button" class="ascwo-primary-button" :disabled="!canSaveTextZone" @click.stop.prevent="saveTextZone">{{ __('Save text zone', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                  </div>
                </div>

                <div v-if="editorMode !== 'text'" class="ascwo-table-card ascwo-text-table-card">
                  <table class="ascwo-designs-table">
                    <colgroup>
                      <col class="ascwo-zone-reorder-col" />
                      <col class="ascwo-text-default-col" />
                      <col class="ascwo-text-label-col" />
                      <col class="ascwo-zone-actions-col" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th></th>
                        <th>{{ __('Default', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                        <th>{{ __('Text zone', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                        <th>{{ __('Actions', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="row in textRows" :key="row.id" @dragover.prevent @drop="dropZoneItem($event, 'textZones', row.id)">
                        <td>
                          <button type="button" class="ascwo-reorder-handle" draggable="true" :aria-label="__('Reorder text zone', 'all-signs-customizer-for-woocommerce-pro')" @dragstart="startZoneDrag($event, 'textZones', row.id)" @dragend="endDrag">
                            <span v-for="dot in 6" :key="dot"></span>
                          </button>
                        </td>
                        <td><strong>{{ row.defaultLabel }}</strong><p>{{ row.description }}</p></td>
                        <td>{{ row.label }}</td>
                        <td>
                          <div class="ascwo-row-actions">
                            <button type="button" class="ascwo-secondary-button ascwo-small-button" @click.stop.prevent="openTextZone(row.id)">{{ __('Edit', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                            <button type="button" class="ascwo-danger-button ascwo-small-button" @click.stop.prevent="removeTextZone(row.id)">{{ __('Remove', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="textRows.length === 0"><td colspan="4" class="ascwo-empty-cell">{{ __('No text zone is available for this design yet.', 'all-signs-customizer-for-woocommerce-pro') }}</td></tr>
                    </tbody>
                  </table>
                </div>

                <div v-if="editorMode !== 'text'" class="ascwo-save-row">
                  <button type="button" class="ascwo-primary-button" :disabled="savingModule === 'Text'" @click="saveDesignModule('Text')">
                    <span v-if="savingModule === 'Text'" class="ascwo-button-loader"></span>
                    <span v-else>{{ __('Save Text', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                  </button>
                </div>
              </section>
            </template>

            <template v-else-if="activeModule === 'image'">
              <section class="ascwo-module-card ascwo-image-module">
                <div v-if="editorMode !== 'image'" class="ascwo-table-card ascwo-image-table-card">
                  <div class="ascwo-image-card-header">
                    <div>
                      <h4>{{ __('Image zones linked to this design', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                      <p>{{ __('Define how each image field should be named and behave on this design.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    </div>
                    <button type="button" class="ascwo-primary-button" @click.stop.prevent="openImageZone()">{{ __('Add image zone', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                  </div>
                  <table class="ascwo-designs-table">
                    <colgroup>
                      <col class="ascwo-zone-reorder-col" />
                      <col class="ascwo-image-zone-col" />
                      <col class="ascwo-image-label-col" />
                      <col class="ascwo-image-preview-col" />
                      <col class="ascwo-image-actions-col" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th></th>
                        <th>{{ __('Image zone', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                        <th>{{ __('Label', 'all-signs-customizer-for-woocommerce-pro') }}<br>{{ __('(Internal)', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                        <th>{{ __('Default image', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                        <th>{{ __('Actions', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="row in imageRows" :key="row.id" @dragover.prevent @drop="dropZoneItem($event, 'imageZones', row.id)">
                        <td>
                          <button type="button" class="ascwo-reorder-handle" draggable="true" :aria-label="__('Reorder image zone', 'all-signs-customizer-for-woocommerce-pro')" @dragstart="startZoneDrag($event, 'imageZones', row.id)" @dragend="endDrag">
                            <span v-for="dot in 6" :key="dot"></span>
                          </button>
                        </td>
                        <td><strong>{{ row.defaultLabel }}</strong><p>{{ row.description }}</p></td>
                        <td>{{ row.label }}</td>
                        <td>
                          <span class="ascwo-mini-preview ascwo-image-thumb">
                            <img v-if="row.preview" :src="row.preview" alt="" />
                            <span v-else></span>
                          </span>
                        </td>
                        <td>
                          <div class="ascwo-row-actions ascwo-image-actions">
                            <button type="button" class="ascwo-secondary-button ascwo-small-button" @click.stop.prevent="openImageZone(row.id)">{{ __('Edit', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                            <button type="button" class="ascwo-danger-button ascwo-small-button" @click.stop.prevent="removeImageZone(row.id)">{{ __('Remove', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="imageRows.length === 0"><td colspan="5" class="ascwo-empty-cell">{{ __('No image zone is available for this design yet.', 'all-signs-customizer-for-woocommerce-pro') }}</td></tr>
                    </tbody>
                  </table>
                </div>

                <div v-if="editorMode === 'image'" class="ascwo-config-card ascwo-zone-editor ascwo-image-zone-editor">
                  <h4>{{ editingZoneId ? __('Edit image zone', 'all-signs-customizer-for-woocommerce-pro') : __('Add image zone', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                  <div class="ascwo-image-zone-content">
                    <h5>{{ __('Content', 'all-signs-customizer-for-woocommerce-pro') }}</h5>
                    <p>{{ __('Name the image zone and choose its default image.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    <div class="ascwo-two-col">
                      <label>
                        <span class="ascwo-form-label">{{ __('Field label', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                        <input v-model.trim="imageZoneDraft.label" class="ascwo-form-input" />
                      </label>
                      <label>
                        <span class="ascwo-form-label">{{ __('Default image (Optional)', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                        <div class="ascwo-media-input ascwo-image-upload-field">
                          <button type="button" class="ascwo-primary-button ascwo-media-button" @click.stop.prevent="selectImageZoneFile">
                            {{ imageZoneDraft.image ? __('Change image', 'all-signs-customizer-for-woocommerce-pro') : __('Upload image', 'all-signs-customizer-for-woocommerce-pro') }}
                          </button>
                          <button v-if="imageZoneDraft.image" type="button" class="ascwo-media-remove" @click.stop.prevent="imageZoneDraft.image = ''">x</button>
                          <span class="ascwo-upload-preview">
                            <img v-if="imageZoneDraft.image" :src="imageZoneDraft.image" alt="" />
                          </span>
                        </div>
                      </label>
                    </div>

                    <h5>{{ __('Allowed files', 'all-signs-customizer-for-woocommerce-pro') }}</h5>
                    <p>{{ __('Choose what types of files customers can upload.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    <div class="ascwo-check-grid ascwo-image-file-grid">
                      <label class="ascwo-inline-check"><input v-model="imageZoneDraft.allowedFiles.svg" type="checkbox" /> SVG</label>
                      <label class="ascwo-inline-check"><input v-model="imageZoneDraft.allowedFiles.png" type="checkbox" /> PNG</label>
                      <label class="ascwo-inline-check"><input v-model="imageZoneDraft.allowedFiles.jpeg" type="checkbox" /> JPG / JPEG</label>
                      <label class="ascwo-inline-check"><input v-model="imageZoneDraft.allowedFiles.webp" type="checkbox" /> WebP</label>
                    </div>

                    <h5>{{ __('Image settings', 'all-signs-customizer-for-woocommerce-pro') }}</h5>
                    <p>{{ __('Define how the uploaded image should behave.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    <div class="ascwo-image-settings-grid">
                      <label>
                        <span class="ascwo-form-label">{{ __('Min width', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                        <input v-model.number="imageZoneDraft.minWidth" type="number" min="0" class="ascwo-form-input" />
                      </label>
                      <label>
                        <span class="ascwo-form-label">{{ __('Min height', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                        <input v-model.number="imageZoneDraft.minHeight" type="number" min="0" class="ascwo-form-input" />
                      </label>
                      <label>
                        <span class="ascwo-form-label">{{ __('Max file size (MB)', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                        <input v-model.number="imageZoneDraft.maxFileSizeMb" type="number" min="0" class="ascwo-form-input" />
                      </label>
                      <label>
                        <span class="ascwo-form-label">{{ __('Fit mode', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                        <select v-model="imageZoneDraft.fitMode" class="ascwo-form-input">
                          <option value="contain">{{ __('Contain', 'all-signs-customizer-for-woocommerce-pro') }}</option>
                          <option value="cover">{{ __('Cover', 'all-signs-customizer-for-woocommerce-pro') }}</option>
                          <option value="stretch">{{ __('Stretch', 'all-signs-customizer-for-woocommerce-pro') }}</option>
                        </select>
                      </label>
                      <label class="ascwo-inline-check">
                        <input v-model="imageZoneDraft.required" type="checkbox" />
                        {{ __('Required', 'all-signs-customizer-for-woocommerce-pro') }}
                      </label>
                      <label class="ascwo-inline-check">
                        <input v-model="imageZoneDraft.lockAspectRatio" type="checkbox" />
                        {{ __('Lock aspect ratio', 'all-signs-customizer-for-woocommerce-pro') }}
                      </label>
                    </div>
                  </div>
                  <div class="ascwo-form-actions">
                    <button type="button" class="ascwo-secondary-button" @click.stop.prevent="closeEditor">{{ __('Cancel', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                    <button type="button" class="ascwo-primary-button" :disabled="!canSaveImageZone" @click.stop.prevent="saveImageZone">{{ __('Save image zone', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                  </div>
                </div>

                <div v-if="editorMode !== 'image'" class="ascwo-save-row">
                  <button type="button" class="ascwo-primary-button" :disabled="savingModule === 'Image'" @click="saveDesignModule('Image')">
                    <span v-if="savingModule === 'Image'" class="ascwo-button-loader"></span>
                    <span v-else>{{ __('Save Image', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                  </button>
                </div>
              </section>
            </template>

            <template v-else-if="activeModule === 'lighting'">
              <section class="ascwo-module-card ascwo-lighting-module">
                <div class="ascwo-toggle-card">
                  <div>
                    <h4>{{ __('Lighting colors', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                    <p>{{ __('Enable or disable the lighting color set for this design.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                  </div>
                  <button type="button" :class="['ascwo-toggle', designForm.lightings.enabled ? 'is-active' : '']" @click="toggleSectionEnabled('lightings')"><span></span></button>
                </div>

                <template v-if="editorMode !== 'lighting'">
                  <div class="ascwo-module-card-header">
                    <div>
                      <h4>{{ __('Lighting colors linked to this design', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                      <p>{{ __('Select lighting colors from the global lighting library or create a new one and associate it directly to this design.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    </div>
                    <button type="button" class="ascwo-primary-button" :disabled="!designForm.lightings.enabled" @click="openPicker('lighting')">{{ __('Add lighting color', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                  </div>

                  <div class="ascwo-table-card ascwo-lighting-table-card">
                    <table class="ascwo-designs-table">
                      <thead>
                        <tr>
                          <th>{{ __('Label', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                          <th>{{ __('Color', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                          <th>{{ __('Default', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                          <th>{{ __('Additional price', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                          <th>{{ __('Actions', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="row in lightingRows" :key="row.id">
                          <td>{{ row.label }}</td>
                          <td>
                            <span class="ascwo-color-value">
                              <span class="ascwo-color-dot" :style="{ backgroundColor: row.hex }"></span>
                              <span>{{ row.hex }}</span>
                            </span>
                          </td>
                          <td>
                            <button type="button" :class="['ascwo-toggle', row.isDefault ? 'is-active' : '']" @click="setDefaultNested('lightings', row.id)"><span></span></button>
                          </td>
                          <td>{{ row.additionalPrice }} {{ currencySymbol }}</td>
                          <td>
                            <button type="button" class="ascwo-danger-button ascwo-small-button" @click="removeNestedItem('lightings', row.id)">{{ __('Remove', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                          </td>
                        </tr>
                        <tr v-if="lightingRows.length === 0">
                          <td colspan="5" class="ascwo-empty-cell">{{ __('No lighting color is available for this design yet.', 'all-signs-customizer-for-woocommerce-pro') }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </template>

                <div v-else class="ascwo-config-card ascwo-lighting-editor-card">
                  <h4>{{ __('Configure lighting colors', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                  <div class="ascwo-segmented">
                    <button type="button" :class="{ 'is-active': subMode === 'existing' }" @click="subMode = 'existing'">{{ __('Choose existing', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                    <button type="button" :class="{ 'is-active': subMode === 'create' }" @click="subMode = 'create'">{{ __('Create new', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                  </div>

                  <template v-if="subMode === 'existing'">
                    <p>{{ __('Select one or more existing lighting colors. The default lighting color for this design is defined in the table below.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    <div class="ascwo-option-list ascwo-lighting-option-list">
                      <label v-for="item in availableLightingOptions" :key="item.id" class="ascwo-check-row">
                        <input type="checkbox" :checked="draftIds.includes(item.id)" @change="toggleDraftId(item.id, $event.target.checked)" />
                        <span>{{ item.label }}</span>
                      </label>
                      <p v-if="availableLightingOptions.length === 0" class="ascwo-muted">{{ __('No lighting colors available.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    </div>
                    <div class="ascwo-form-actions">
                      <button type="button" class="ascwo-secondary-button" :disabled="isLightingSaving" @click="closeEditor">{{ __('Cancel', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                      <button type="button" class="ascwo-primary-button" :disabled="draftIds.length === 0 || isLightingSaving" @click="saveLightingEditor">
                        <span v-if="isLightingSaving" class="ascwo-button-loader"></span>
                        <span v-else>{{ __('Add lighting colors', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                      </button>
                    </div>
                  </template>

                  <template v-else>
                    <div class="ascwo-two-col">
                      <label><span class="ascwo-form-label">{{ __('Label', 'all-signs-customizer-for-woocommerce-pro') }}</span><input v-model.trim="customDraft.label" class="ascwo-form-input" /></label>
                      <label><span class="ascwo-form-label">{{ __('Additional price', 'all-signs-customizer-for-woocommerce-pro') }}</span><input v-model.number="customDraft.additionalPrice" type="number" min="0" step="0.01" class="ascwo-form-input" /></label>
                    </div>
                    <label class="ascwo-lighting-color-field">
                      <span class="ascwo-form-label">{{ __('Color', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                      <div class="ascwo-color-input-row ascwo-lighting-color-row">
                        <input type="color" v-model="customDraft.hexCode" class="ascwo-native-color" />
                        <input v-model.trim="customDraft.hexCode" class="ascwo-form-input" />
                      </div>
                    </label>
                    <div class="ascwo-form-actions">
                      <button type="button" class="ascwo-secondary-button" :disabled="isLightingSaving" @click="closeEditor">{{ __('Cancel', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                      <button type="button" class="ascwo-primary-button" :disabled="!customDraft.label?.trim() || isLightingSaving" @click="saveLightingEditor">
                        <span v-if="isLightingSaving" class="ascwo-button-loader"></span>
                        <span v-else>{{ __('Create lighting color', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                      </button>
                    </div>
                  </template>
                </div>

                <div v-if="editorMode !== 'lighting'" class="ascwo-save-row">
                  <button type="button" class="ascwo-primary-button" :disabled="savingModule === 'Lighting'" @click="saveDesignModule('Lighting')">
                    <span v-if="savingModule === 'Lighting'" class="ascwo-button-loader"></span>
                    <span v-else>{{ __('Save Lighting', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                  </button>
                </div>
              </section>
            </template>

            <template v-else-if="activeModule === 'border'">
              <section class="ascwo-module-card">
                <div class="ascwo-module-card-header">
                  <div>
                    <h4>{{ __('Borders available for this design', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                    <p>{{ __('Choose existing borders already available in this config, add a new global border, or add one custom border just for this design.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                  </div>
                  <button type="button" class="ascwo-primary-button" @click="openPicker('border')">{{ __('Add border', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                </div>

                <div v-if="editorMode === 'border'" class="ascwo-config-card ascwo-border-editor-card">
                  <h4>{{ __('Configure borders', 'all-signs-customizer-for-woocommerce-pro') }}</h4>
                  <div class="ascwo-segmented">
                    <button type="button" :class="{ 'is-active': subMode === 'existing' }" @click="setBorderSubMode('existing')">{{ __('Choose existing', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                    <button type="button" :class="{ 'is-active': subMode === 'create' }" @click="setBorderSubMode('create')">{{ __('Add new', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                    <button type="button" :class="{ 'is-active': subMode === 'custom' }" @click="setBorderSubMode('custom')">{{ __('Add custom', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                  </div>

                  <template v-if="subMode === 'existing'">
                    <p>{{ __('Select one or more existing borders. The default border for this design is defined in the table below.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    <div class="ascwo-option-list ascwo-border-option-list">
                      <label v-for="item in borderOptions" :key="item.id" class="ascwo-check-row ascwo-preview-check-row">
                        <input type="checkbox" :checked="draftIds.includes(item.id)" @change="toggleDraftId(item.id, $event.target.checked)" />
                        <span class="ascwo-mini-preview" v-html="borderPreview(item)"></span>
                        <span><strong>{{ item.label }}</strong><small>{{ item.description || item.borderKey || '' }}</small></span>
                      </label>
                      <p v-if="borderOptions.length === 0" class="ascwo-muted">{{ __('No existing borders are available.', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                    </div>
                    <p v-if="draftIds.length" class="ascwo-muted ascwo-mt-2">{{ draftIds.length }} {{ draftIds.length > 1 ? __('borders selected', 'all-signs-customizer-for-woocommerce-pro') : __('border selected', 'all-signs-customizer-for-woocommerce-pro') }}</p>
                  </template>

                  <template v-else-if="subMode === 'create'">
                    <label><span class="ascwo-form-label">{{ __('From Manage Borders', 'all-signs-customizer-for-woocommerce-pro') }}</span><select v-model="customDraft.borderId" class="ascwo-form-input" @change="syncManagedBorderDraft"><option value="">{{ __('None', 'all-signs-customizer-for-woocommerce-pro') }}</option><option v-for="item in managedBorderChoices" :key="item.value" :value="item.value">{{ item.label }}</option></select></label>
                    <div v-if="selectedManagedBorder" class="ascwo-preview-choice">
                      <span class="ascwo-mini-preview" v-html="borderPreview(selectedManagedBorder)"></span>
                      <span><strong>{{ selectedManagedBorder.label }}</strong><small>{{ selectedManagedBorder.description || selectedManagedBorder.borderKey || '' }}</small></span>
                    </div>
                    <label><span class="ascwo-form-label">{{ __('Additional price', 'all-signs-customizer-for-woocommerce-pro') }}</span><input v-model.number="customDraft.additionalPrice" type="number" min="0" step="0.01" class="ascwo-form-input" /></label>
                    <label><span class="ascwo-form-label">{{ __('Exclude sizes', 'all-signs-customizer-for-woocommerce-pro') }}</span><div class="ascwo-option-list ascwo-compact-option-list"><label v-for="size in sizeOptions" :key="size.id" class="ascwo-check-row"><input type="checkbox" :checked="customDraft.excludeSizes?.includes(size.id)" @change="toggleCustomDraftList('excludeSizes', size.id, $event.target.checked)" /><span>{{ size.label }}</span></label></div></label>
                    <label><span class="ascwo-form-label">{{ __('Exclude shapes', 'all-signs-customizer-for-woocommerce-pro') }}</span><div class="ascwo-option-list ascwo-compact-option-list"><label v-for="shape in shapeOptions" :key="shape.id" class="ascwo-check-row"><input type="checkbox" :checked="customDraft.excludeShapes?.includes(shape.id)" @change="toggleCustomDraftList('excludeShapes', shape.id, $event.target.checked)" /><span>{{ shape.label }}</span></label></div></label>
                  </template>

                  <template v-else>
                    <label><span class="ascwo-form-label">{{ __('Custom border label', 'all-signs-customizer-for-woocommerce-pro') }}</span><input v-model.trim="customDraft.label" class="ascwo-form-input" /></label>
                    <label><span class="ascwo-form-label">{{ __('SVG file', 'all-signs-customizer-for-woocommerce-pro') }}</span><div class="ascwo-media-input"><button type="button" class="ascwo-primary-button" @click="selectDraftFile('url')">{{ __('SVG', 'all-signs-customizer-for-woocommerce-pro') }}</button><input :value="customDraft.url" readonly class="ascwo-form-input ascwo-media-field" /></div></label>
                    <label><span class="ascwo-form-label">{{ __('Additional price', 'all-signs-customizer-for-woocommerce-pro') }}</span><input v-model.number="customDraft.additionalPrice" type="number" min="0" step="0.01" class="ascwo-form-input" /></label>
                  </template>

                  <div class="ascwo-form-actions">
                    <button type="button" class="ascwo-secondary-button" :disabled="isBorderSaving" @click="closeEditor">{{ __('Cancel', 'all-signs-customizer-for-woocommerce-pro') }}</button>
                    <button type="button" class="ascwo-primary-button" :disabled="isBorderSaving || !canSaveBorderEditor" @click="saveBorderEditor">
                      <span v-if="isBorderSaving" class="ascwo-button-loader"></span>
                      <span v-else>{{ subMode === 'custom' ? __('Save custom border', 'all-signs-customizer-for-woocommerce-pro') : subMode === 'create' ? __('Create border', 'all-signs-customizer-for-woocommerce-pro') : __('Add borders', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                    </button>
                  </div>
                </div>

                <div v-if="editorMode !== 'border'" class="ascwo-table-card ascwo-border-table-card">
                  <table class="ascwo-designs-table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>{{ __('Border', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                        <th>{{ __('Preview', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                        <th>{{ __('Default', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                        <th>{{ __('Actions', 'all-signs-customizer-for-woocommerce-pro') }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in borderRows" :key="item.id" @dragover.prevent @drop="dropNestedItem($event, 'borders', item.id)">
                        <td>
                          <button type="button" class="ascwo-reorder-handle" draggable="true" :aria-label="__('Reorder border', 'all-signs-customizer-for-woocommerce-pro')" @dragstart="startNestedDrag($event, 'borders', item.id)" @dragend="endDrag">
                            <span v-for="dot in 6" :key="dot"></span>
                          </button>
                        </td>
                        <td>{{ item.label }}</td>
                        <td><span class="ascwo-mini-preview" v-html="borderPreview(item)"></span></td>
                        <td><button type="button" :class="['ascwo-toggle', item.isDefault ? 'is-active' : '']" @click="setDefaultNested('borders', item.id)"><span></span></button></td>
                        <td><div class="ascwo-row-actions"><button type="button" class="ascwo-secondary-button" @click="editBorder(item.id)">{{ __('Edit', 'all-signs-customizer-for-woocommerce-pro') }}</button><button type="button" class="ascwo-danger-button" @click="removeNestedItem('borders', item.id)">{{ __('Remove', 'all-signs-customizer-for-woocommerce-pro') }}</button></div></td>
                      </tr>
                      <tr v-if="borderRows.length === 0"><td colspan="5" class="ascwo-empty-cell">{{ __('No borders are available for this design yet.', 'all-signs-customizer-for-woocommerce-pro') }}</td></tr>
                    </tbody>
                  </table>
                </div>

                <div v-if="editorMode !== 'border'" class="ascwo-save-row">
                  <button type="button" class="ascwo-primary-button" :disabled="savingModule === 'Border'" @click="saveDesignModule('Border')">
                    <span v-if="savingModule === 'Border'" class="ascwo-button-loader"></span>
                    <span v-else>{{ __('Save Border', 'all-signs-customizer-for-woocommerce-pro') }}</span>
                  </button>
                </div>
              </section>
            </template>
          </template>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
/* global wp */
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { __ } from '@wordpress/i18n';
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';

const route = useRoute();
const router = useRouter();

const configId = computed(() => route.params.configId);
const componentId = computed(() => route.params.componentId);
const optionId = computed(() => route.params.optionId);
const isDesignDetail = computed(() => optionId.value !== undefined && optionId.value !== null);
const activeDesignIndex = computed(() => designs.value.findIndex((item, index) => String(item.id || `design-${index + 1}`) === String(optionId.value)));
const currencySymbol = '$';

const isFetching = ref(false);
const isLoading = ref(false);
const activeModule = ref('overview');
const configData = ref({});
const editorReferences = ref({});
const editorMode = ref('');
const subMode = ref('existing');
const draftIds = ref([]);
const customDraft = ref({});
const sizeDraft = ref({});
const backgroundDraft = ref({});
const isSizeCreating = ref(false);
const isShapeSaving = ref(false);
const isBackgroundSaving = ref(false);
const isFixingSaving = ref(false);
const isLightingSaving = ref(false);
const isBorderSaving = ref(false);
const savingModule = ref('');
const textZoneDraft = ref({});
const imageZoneDraft = ref({});
const editingZoneId = ref('');

const modules = [
  { key: 'overview', label: 'Design details', description: 'Define the basic information for this design.', icon: '▣' },
  { key: 'size', label: 'Size', description: 'Define available sizes', icon: '↔' },
  { key: 'shape', label: 'Shape', description: 'Define available shapes', icon: '◇' },
  { key: 'background', label: 'Background', description: 'Set background options', icon: '◩' },
  { key: 'fixing', label: 'Fixing', description: 'Define fixing methods', icon: '⌘' },
  { key: 'text', label: 'Text', description: 'Configure text zones', icon: 'A' },
  { key: 'image', label: 'Image', description: 'Configure image zones', icon: '▤' },
  { key: 'lighting', label: 'Lighting', description: 'Configure lighting', icon: '▰' },
  { key: 'border', label: 'Border', description: 'Configure borders', icon: '⚙' },
];

const emptyComponent = () => ({
  id: '',
  label: '',
  title: '',
  name: '',
  description: '',
  icon: '',
  isDefault: false,
  options: [],
});

const emptyDesign = () => ({
  id: '',
  label: '',
  name: '',
  description: '',
  icon: '',
  image: '',
  additionalPrice: 0,
  isDefault: false,
  sizes: { items: [] },
  shapes: { items: [] },
  fixingMethods: { items: [] },
  borders: { items: [] },
  backgrounds: { enabled: true, enableCustomColor: false, customColorLabel: 'Custom Color', items: [] },
  lightings: { enabled: true, enableCustomColor: false, customColorLabel: 'Custom Color', items: [] },
  textZones: [],
  imageZones: [],
});

const componentForm = ref(emptyComponent());
const designForm = ref(emptyDesign());
const draggingDesignIndex = ref(null);
const configuredDesignIndex = ref(null);
const designs = computed(() => Array.isArray(componentForm.value.options) ? componentForm.value.options : []);
const configuredDesign = computed(() => {
  const index = configuredDesignIndex.value;
  if (index === null || index < 0 || index >= designs.value.length) return null;
  return designs.value[index] || null;
});
const activeModuleData = computed(() => modules.find((module) => module.key === activeModule.value) || modules[0]);
const configRequiredOptions = computed(() => {
  const references = editorReferences.value?.requiredOptions;
  if (references && typeof references === 'object') return references;
  return configData.value?.requiredOptions || configData.value?.data?.requiredOptions || {};
});
const configAdditionalOptions = computed(() => configData.value?.additionalOptions || configData.value?.data?.additionalOptions || {});
const managedShapeLibrary = computed(() => (Array.isArray(editorReferences.value?.manageShapes) ? editorReferences.value.manageShapes : []));
const managedFixingLibrary = computed(() => (Array.isArray(editorReferences.value?.manageFixingMethods) ? editorReferences.value.manageFixingMethods : []));
const managedBorderLibrary = computed(() => (Array.isArray(editorReferences.value?.manageBorders) ? editorReferences.value.manageBorders : []));

const sectionItems = (section) => {
  const value = section === 'materials'
    ? configAdditionalOptions.value?.materials
    : configRequiredOptions.value?.[section];
  return Array.isArray(value?.items) ? value.items : [];
};

const makeOptionRows = (items, fallbackPrefix) => items.map((item, index) => {
  const id = String(item.id || item.value || item.shapeId || item.fixingMethodId || `${fallbackPrefix}-${index + 1}`);
  const label = String(item.label || item.title || item.name || item.fontFamily || `${fallbackPrefix} ${index + 1}`);
  return {
    ...item,
    id,
    value: id,
    label,
    description: String(item.description || ''),
    image: String(item.previewImg || item.icon || item.url || item.image || ''),
    hex: String(item.hexCode || item.pattern?.codeHex || item.textColor?.codeHex || item.color || '#ffffff'),
  };
});

const normalizedKey = (value) => String(value || '').trim().toLowerCase().replace(/^(shape|fixing|fixmethod|border)-/, '').replace(/[\s_]+/g, '-');
const keyAliases = {
  rectangle: ['rectangle', 'rectangular', 'horizontal-banner'],
  'rounded-rectangle': ['rounded-rectangle', 'rounded-square', 'vertical-banner'],
  'rounded-corners': ['rounded-corners', 'rounded-border', 'rounded-edge'],
  'standard-border': ['standard-border', 'standard', 'border-standard'],
  'double-line-border': ['double-line-border', 'double-border', 'double-line'],
  eyelets: ['eyelets', 'eyelet'],
  'wall-screws': ['wall-screws', 'wall-screw', 'screws', 'screw'],
  'hanging-kit': ['hanging-kit', 'hanging', 'hanger'],
  'standoff-kit': ['standoff-kit', 'stand-off-kit', 'standoff', 'stand-off'],
  'adhesive-pad': ['adhesive-pad', 'adhesive'],
  'rail-system': ['rail-system', 'rail'],
  hems: ['hems', 'hem'],
  'rope-finish': ['rope-finish', 'rope'],
  'pole-pocket': ['pole-pocket', 'pole'],
};
const expandKeys = (keys) => Array.from(new Set(keys.flatMap((key) => keyAliases[key] || [key])));

const managedRow = (item, index, prefix) => {
  const fallbackId = `${prefix}-${index + 1}`;
  const managedId = String(item?.id || item?.value || fallbackId);
  const label = String(item?.name || item?.label || item?.title || `${prefix} ${index + 1}`).trim();
  return {
    ...item,
    id: managedId,
    value: managedId,
    managedId,
    managedIndex: index + 1,
    label,
    name: String(item?.name || label),
    description: String(item?.description || item?.type || item?.key || ''),
    image: String(item?.icon || item?.previewImg || item?.url || item?.image || ''),
    icon: String(item?.icon || ''),
  };
};

const managedChoices = (library, prefix) => library
  .map((item, index) => managedRow(item, index, prefix))
  .filter((item) => item.label);

const resolveManagedItem = (library, item, idKeys = []) => {
  if (!library.length || !item) return null;

  const baseItemKeys = [
    item?.id,
    item?.value,
    item?.label,
    item?.name,
    item?.type,
    item?.shapeKey,
    item?.borderKey,
    item?.fixingKey,
  ].map(normalizedKey).filter(Boolean);
  const itemKeys = expandKeys(baseItemKeys);

  const namedMatch = library.find((entry) => {
    const entryKeys = expandKeys([
      entry?.id,
      entry?.value,
      entry?.label,
      entry?.name,
      entry?.type,
      entry?.key,
      entry?.shapeKey,
      entry?.borderKey,
      entry?.fixingKey,
    ].map(normalizedKey).filter(Boolean));
    return entryKeys.some((key) => itemKeys.includes(key));
  });

  if (namedMatch) return namedMatch;

  if (baseItemKeys.some((key) => !/^\d+$/.test(key))) {
    return null;
  }

  for (const key of idKeys) {
    const numericId = Number(item?.[key]);
    if (Number.isInteger(numericId) && numericId > 0 && library[numericId - 1]) {
      return library[numericId - 1];
    }
  }

  const managedId = Number(item?.managedIndex || item?.managedId);
  if (Number.isInteger(managedId) && managedId > 0 && library[managedId - 1]) {
    return library[managedId - 1];
  }

  return null;
};

const globalPreview = (managed, fallback = '') => {
  const image = String(managed?.icon || managed?.previewImg || managed?.image || managed?.url || '').trim();
  return image && !isLegacyDemoPreview(image) ? `<img src="${image}" alt="">` : fallback;
};

const shapeFallbackPreview = (shape = {}) => {
  const key = normalizedKey(shape?.label || shape?.name || shape?.type || shape?.description || '');
  if (key.includes('oval')) return '<svg viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="20" fill="#fff" stroke="#111827" stroke-width="4"/></svg>';
  if (key.includes('triangle')) return '<svg viewBox="0 0 56 56" aria-hidden="true"><path d="M28 9 49 47H7Z" fill="#fff" stroke="#111827" stroke-width="4" stroke-linejoin="round"/></svg>';
  if (key.includes('rounded')) return '<svg viewBox="0 0 56 56" aria-hidden="true"><rect x="11" y="12" width="34" height="32" rx="7" fill="#fff" stroke="#111827" stroke-width="4"/></svg>';
  if (key.includes('square')) return '<svg viewBox="0 0 56 56" aria-hidden="true"><rect x="12" y="12" width="32" height="32" fill="#fff" stroke="#111827" stroke-width="4"/></svg>';
  return '<svg viewBox="0 0 56 56" aria-hidden="true"><rect x="10" y="17" width="36" height="22" fill="#fff" stroke="#111827" stroke-width="4"/></svg>';
};
const fixingFallbackPreview = (fixing = {}) => {
  const key = normalizedKey(fixing?.label || fixing?.name || fixing?.type || fixing?.description || '');
  if (key === 'none') {
    return '<svg viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="18" fill="#fff" stroke="#111827" stroke-width="4"/><path d="M16 40 40 16" fill="none" stroke="#111827" stroke-width="4" stroke-linecap="round"/></svg>';
  }
  if (key.includes('hanging')) {
    return '<svg viewBox="0 0 56 56" aria-hidden="true"><path d="M28 11v10" fill="none" stroke="#616161" stroke-width="4" stroke-linecap="round"/><path d="M18 24h20l5 20H13Z" fill="none" stroke="#616161" stroke-width="4" stroke-linejoin="round"/></svg>';
  }
  if (key.includes('standoff') || key.includes('stand-off')) {
    return '<svg viewBox="0 0 56 56" aria-hidden="true"><rect x="15" y="14" width="24" height="24" rx="2" fill="#fff" stroke="#616161" stroke-width="4"/><rect x="22" y="21" width="20" height="20" rx="2" fill="#fff" stroke="#616161" stroke-width="3"/></svg>';
  }
  if (key.includes('adhesive')) {
    return '<svg viewBox="0 0 56 56" aria-hidden="true"><rect x="13" y="20" width="30" height="18" rx="9" fill="none" stroke="#616161" stroke-width="4"/><path d="M18 29h20" fill="none" stroke="#616161" stroke-width="3" stroke-linecap="round"/></svg>';
  }
  if (key.includes('rail')) {
    return '<svg viewBox="0 0 56 56" aria-hidden="true"><path d="M13 20h30M13 36h30M19 20v16M37 20v16" fill="none" stroke="#616161" stroke-width="4" stroke-linecap="round"/></svg>';
  }
  if (key.includes('eyelet')) {
    return '<svg viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="15" fill="#fff" stroke="#616161" stroke-width="4"/><circle cx="28" cy="28" r="6" fill="none" stroke="#616161" stroke-width="3"/></svg>';
  }
  if (key.includes('pole')) {
    return '<svg viewBox="0 0 56 56" aria-hidden="true"><rect x="11" y="18" width="34" height="20" rx="3" fill="none" stroke="#616161" stroke-width="4"/><path d="M19 18v20" fill="none" stroke="#616161" stroke-width="3"/></svg>';
  }
  return '<svg viewBox="0 0 56 56" aria-hidden="true"><path d="M18 38 38 18M16 40l7 7M36 16l4-4 4 4-4 4" fill="none" stroke="#616161" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
};
const borderFallbackPreview = (border = {}) => {
  const key = normalizedKey(border?.label || border?.name || border?.type || '');
  if (key.includes('double')) return '<svg viewBox="0 0 56 56" aria-hidden="true"><rect x="12" y="12" width="32" height="32" rx="2" fill="none" stroke="#111827" stroke-width="3"/><rect x="18" y="18" width="20" height="20" rx="1" fill="none" stroke="#111827" stroke-width="3"/></svg>';
  if (key.includes('rounded')) return '<svg viewBox="0 0 56 56" aria-hidden="true"><rect x="12" y="12" width="32" height="32" rx="7" fill="none" stroke="#111827" stroke-width="4"/></svg>';
  return '<svg viewBox="0 0 56 56" aria-hidden="true"><rect x="13" y="13" width="30" height="30" rx="3" fill="none" stroke="#111827" stroke-width="4"/></svg>';
};

const normalizeHexColor = (value) => {
  const hex = String(value || '').trim();
  if (/^#[0-9a-f]{6}$/i.test(hex)) return hex.toUpperCase();
  if (/^[0-9a-f]{6}$/i.test(hex)) return `#${hex.toUpperCase()}`;
  return '#FFCF5A';
};

const enrichManagedReference = (item, library, idKeys, fallbackPrefix) => {
  const managed = resolveManagedItem(library, item, idKeys);
  if (!managed && !item?.custom && !item?.label && !item?.name && !item?.url && !item?.image) return null;
  return {
    ...item,
    managedItem: managed || null,
    image: managed ? String(managed.icon || managed.previewImg || managed.image || managed.url || item.image || '') : String(item.previewImg || item.icon || item.url || item.image || ''),
    label: String(item.label || managed?.name || managed?.label || `${fallbackPrefix}`),
  };
};

const sizeOptions = computed(() => sectionItems('sizes')
  .map((item) => {
    const id = String(item?.id || '');
    const width = Number(item?.width || 0);
    const height = Number(item?.height || 0);
    const dimensionLabel = width > 0 && height > 0 ? `${width} x ${height} mm` : '';
    return {
      ...item,
      id,
      value: id,
      label: String(item?.label || dimensionLabel || '').trim(),
      width,
      height,
      maxTextChar: Number(item?.maxTextChar ?? -1),
      numberOfLines: Number(item?.numberOfLines ?? item?.textNumber ?? -1),
    };
  })
  .filter((item) => item.id && item.label));
const shapeOptions = computed(() => makeOptionRows(sectionItems('shapes'), 'shape')
  .map((item) => enrichManagedReference(item, managedShapeLibrary.value, ['shapeId'], 'Shape'))
  .filter(Boolean));
const managedShapeChoices = computed(() => {
  const requiredShapeIds = new Set(shapeOptions.value.map((item) => String(item.shapeId || '')));
  const rows = managedChoices(managedShapeLibrary.value, 'shape').map((item) => ({ ...item, shapeId: item.id }));
  const filtered = rows.filter((item) => !requiredShapeIds.has(String(item.shapeId)));
  return filtered.length ? filtered : rows;
});
const colorOptions = computed(() => makeOptionRows(sectionItems('colors'), 'color'));
const fixingOptions = computed(() => {
  const camelItems = sectionItems('fixingMethods');
  const kebabItems = sectionItems('fixing-methods');
  return makeOptionRows(camelItems.length ? camelItems : kebabItems, 'fixing')
    .map((item) => enrichManagedReference(item, managedFixingLibrary.value, ['fixingMethodId'], 'Fixing method'))
    .filter(Boolean);
});
const borderOptions = computed(() => makeOptionRows(sectionItems('borders'), 'border')
  .map((item) => enrichManagedReference(item, managedBorderLibrary.value, ['borderId'], 'Border'))
  .filter(Boolean)
  .map((item) => ({
    ...item,
    previewHtml: globalPreview(item.managedItem, borderFallbackPreview(item)),
  })));
const managedBorderChoices = computed(() => {
  const requiredBorderIds = new Set(borderOptions.value.map((item) => String(item.borderId || '')));
  const rows = managedChoices(managedBorderLibrary.value, 'border').map((item) => ({ ...item, borderId: item.id }));
  const filtered = rows.filter((item) => !requiredBorderIds.has(String(item.borderId)));
  return filtered.length ? filtered : rows;
});
const lightingOptions = computed(() => makeOptionRows(sectionItems('lightings'), 'lighting'));
const fontOptions = computed(() => makeOptionRows(sectionItems('fonts'), 'font'));

const existingIds = (section) => {
  const items = designForm.value?.[section]?.items;
  return Array.isArray(items) ? items.map((item) => String(item.id)) : [];
};

const availableSizeOptions = computed(() => sizeOptions.value.filter((item) => !existingIds('sizes').includes(item.id)));
const availableColorOptions = computed(() => colorOptions.value.filter((item) => !existingIds('backgrounds').includes(item.id)));
const availableLightingOptions = computed(() => lightingOptions.value.filter((item) => !existingIds('lightings').includes(item.id)));

const rowFromOption = (item, source, fallbackLabel) => ({
  id: String(item.id || ''),
  label: String(item.label || source?.label || fallbackLabel),
  description: String(item.description || source?.description || ''),
  preview: String(item.url || item.image || source?.image || source?.managedItem?.icon || ''),
  previewHtml: source?.previewHtml || '',
  isDefault: Boolean(item.isDefault),
  source,
  item,
});

const shapeRows = computed(() => (designForm.value.shapes.items || []).map((item) => rowFromOption(item, shapeOptions.value.find((shape) => shape.id === String(item.id)), 'Shape')));
const borderRows = computed(() => (designForm.value.borders.items || []).map((item) => rowFromOption(item, borderOptions.value.find((border) => border.id === String(item.id)), 'Border')));
const lightingRows = computed(() => (designForm.value.lightings.items || []).map((item) => {
  const source = lightingOptions.value.find((lighting) => lighting.id === String(item.id));
  return {
    ...rowFromOption(item, source, 'Lighting color'),
    hex: normalizeHexColor(item.hexCode || source?.hex || '#ffcf5a'),
    additionalPrice: Number(item.additionalPrice ?? source?.additionalPrice ?? 0),
  };
}));
const ensureZoneId = (zone, prefix, index) => String(zone.id || zone.zoneId || zone.key || `${prefix}-${index + 1}`);
const normalizeTextZone = (zone = {}, index = 0) => {
  const id = ensureZoneId(zone, 'text', index);
  const internalLabel = String(zone.internalLabel || zone.label || `Text zone ${index + 1}`);
  return {
    ...zone,
    id,
    internalLabel,
    label: String(zone.label || internalLabel),
    value: String(zone.value || ''),
    defaultFont: String(zone.defaultFont || fontOptions.value[0]?.label || 'Arial'),
    fontSize: Number(zone.fontSize || 10),
    color: String(zone.color || '#000000'),
    textAlign: String(zone.textAlign || 'center'),
    bold: zone.bold !== undefined ? Boolean(zone.bold) : true,
    italic: Boolean(zone.italic),
    required: Boolean(zone.required),
    minCharacters: Number(zone.minCharacters || 0),
    maxCharacters: Number(zone.maxCharacters || 0),
    permissions: {
      editText: true,
      changeFont: true,
      changeColor: true,
      resizeText: true,
      moveText: true,
      rotateText: true,
      flipHorizontally: false,
      flipVertically: false,
      ...(zone.permissions || {}),
    },
  };
};
const ensureTextZones = () => {
  const zones = Array.isArray(designForm.value?.textZones) ? designForm.value.textZones : [];
  designForm.value.textZones = zones.map((zone, index) => normalizeTextZone(zone, index));
  return designForm.value.textZones;
};
const textRows = computed(() => (Array.isArray(designForm.value?.textZones) ? designForm.value.textZones : []).map((zone, index) => {
  const id = ensureZoneId(zone, 'text', index);
  const label = String(zone.label || zone.internalLabel || `Text zone ${index + 1}`);
  return {
    id,
    defaultLabel: label,
    label,
    description: `ID: ${id}`,
    preview: '',
    item: zone,
  };
}));
const imageRows = computed(() => (designForm.value.imageZones || []).map((zone, index) => {
  const id = ensureZoneId(zone, 'image', index);
  const label = String(zone.label || zone.internalLabel || `Image zone ${index + 1}`);
  return {
    id,
    defaultLabel: label,
    label,
    description: `ID: ${id}`,
    preview: zone.image || '',
    item: zone,
  };
}));

const normalizeImageZone = (zone = {}, index = 0) => {
  const id = ensureZoneId(zone, 'image', index);
  const internalLabel = String(zone.internalLabel || zone.label || `Image zone ${index + 1}`);
  return {
    ...zone,
    id,
    internalLabel,
    label: String(zone.label || internalLabel),
    image: String(zone.image || ''),
    allowedFiles: {
      svg: true,
      png: true,
      jpeg: true,
      webp: false,
      ...(zone.allowedFiles || {}),
    },
    required: Boolean(zone.required),
    minWidth: Number(zone.minWidth || 100),
    minHeight: Number(zone.minHeight || 100),
    maxFileSizeMb: Number(zone.maxFileSizeMb || 2),
    fitMode: ['contain', 'cover', 'stretch'].includes(String(zone.fitMode || '')) ? String(zone.fitMode) : 'contain',
    lockAspectRatio: typeof zone.lockAspectRatio === 'boolean' ? zone.lockAspectRatio : true,
    permissions: {
      replaceImage: true,
      resizeImage: true,
      moveImage: true,
      rotateImage: true,
      flipHorizontally: true,
      flipVertically: false,
      ...(zone.permissions || {}),
    },
  };
};

const ensureImageZones = () => {
  const zones = Array.isArray(designForm.value?.imageZones) ? designForm.value.imageZones : [];
  designForm.value.imageZones = zones.map((zone, index) => normalizeImageZone(zone, index));
  return designForm.value.imageZones;
};
const selectedSizeRows = computed(() => {
  const globalIds = new Set(sizeOptions.value.map((item) => item.id));
  const rows = (designForm.value.sizes.items || [])
    .filter((item) => item && globalIds.has(String(item.id || '')))
    .map((item) => ({
      ...item,
      id: String(item.id),
      label: sizeLabel(item.id),
      isDefault: Boolean(item.isDefault),
    }));
  if (rows.length && !rows.some((item) => item.isDefault)) {
    return rows.map((item, index) => ({ ...item, isDefault: index === 0 }));
  }
  return rows;
});
const selectedFixingRows = computed(() => (designForm.value.fixingMethods.items || []).map((item) => {
  const source = fixingOptions.value.find((fixing) => fixing.id === String(item.id));
  const sizeId = item.sizeId || selectedSizeRows.value.find((size) => size.isDefault)?.id || selectedSizeRows.value[0]?.id || '';
  return {
    ...item,
    id: String(item.id || ''),
    label: String(item.label || source?.label || 'Fixing method'),
    description: sizeId ? `Size: ${sizeLabel(sizeId)}` : String(item.description || source?.description || ''),
    isDefault: Boolean(item.isDefault),
    source,
    item,
  };
}));
const selectedManagedShape = computed(() => managedShapeChoices.value.find((item) => String(item.value) === String(customDraft.value.shapeId || '')) || null);
const managedFixingChoices = computed(() => {
  const requiredFixingIds = new Set(fixingOptions.value.map((item) => String(item.fixingMethodId || '')));
  const rows = managedChoices(managedFixingLibrary.value, 'fixing').map((item) => ({ ...item, fixingMethodId: item.id }));
  const filtered = rows.filter((item) => !requiredFixingIds.has(String(item.fixingMethodId)));
  return filtered.length ? filtered : rows;
});
const selectedManagedFixing = computed(() => managedFixingChoices.value.find((item) => String(item.value) === String(customDraft.value.fixingMethodId || '')) || null);
const selectedManagedBorder = computed(() => managedBorderChoices.value.find((item) => String(item.value) === String(customDraft.value.borderId || '')) || null);
const canSaveShapeEditor = computed(() => {
  if (subMode.value === 'existing') return draftIds.value.length > 0;
  if (subMode.value === 'create') return Boolean(String(customDraft.value.shapeId || '').trim());
  return Boolean(String(customDraft.value.label || '').trim() && String(customDraft.value.url || '').trim());
});
const canCreateBackgroundColor = computed(() => Boolean(String(backgroundDraft.value.label || '').trim()));
const canSaveFixingEditor = computed(() => {
  if (subMode.value === 'existing') return draftIds.value.length > 0;
  if (subMode.value === 'create') return Boolean(String(customDraft.value.fixingMethodId || '').trim());
  return Boolean(String(customDraft.value.label || '').trim() && String(customDraft.value.url || '').trim());
});
const canSaveBorderEditor = computed(() => {
  if (subMode.value === 'existing') return draftIds.value.length > 0;
  if (subMode.value === 'create') return Boolean(String(customDraft.value.borderId || '').trim());
  return Boolean(String(customDraft.value.label || '').trim() && String(customDraft.value.url || '').trim());
});

const fallbackDesignLabel = (index) => `Design ${Number(index || 0) + 1}`;

const normalizeDesign = (item = {}, index = 0) => ({
  ...emptyDesign(),
  ...item,
  id: String(item.id || `option-${index + 1}`),
  label: String(item.label || item.name || fallbackDesignLabel(index)),
  name: String(item.name || item.label || fallbackDesignLabel(index)),
  description: String(item.description || ''),
  icon: String(item.icon || ''),
  image: String(item.image || ''),
  additionalPrice: Number(item.additionalPrice ?? item.overrides?.additionalPrice ?? 0),
  isDefault: Boolean(item.isDefault),
  sizes: item.sizes && Array.isArray(item.sizes.items) ? item.sizes : { items: [] },
  shapes: item.shapes && Array.isArray(item.shapes.items) ? item.shapes : { items: [] },
  fixingMethods: item.fixingMethods && Array.isArray(item.fixingMethods.items) ? item.fixingMethods : { items: [] },
  borders: item.borders && Array.isArray(item.borders.items) ? item.borders : { items: [] },
  backgrounds: item.backgrounds || emptyDesign().backgrounds,
  lightings: item.lightings || emptyDesign().lightings,
  textZones: Array.isArray(item.textZones) ? item.textZones.map((zone, zoneIndex) => normalizeTextZone(zone, zoneIndex)) : [],
  imageZones: Array.isArray(item.imageZones) ? item.imageZones.map((zone, zoneIndex) => normalizeImageZone(zone, zoneIndex)) : [],
});

const setActiveModule = (key) => {
  if (activeModule.value === key) return;
  closeEditor();
  activeModule.value = key;
};

const normalizeComponent = (item = {}) => {
  const label = String(item.label || item.title || item.name || '');
  return {
    ...emptyComponent(),
    ...item,
    id: String(item.id || `component-${componentId.value}`),
    label,
    title: String(item.title || label),
    name: String(item.name || label),
    description: String(item.description || ''),
    icon: String(item.icon || ''),
    isDefault: Boolean(item.isDefault),
    options: Array.isArray(item.options) ? item.options.map((option, index) => normalizeDesign(option, index)) : [],
  };
};

const syncDesignFormFromRoute = (resetModule = true) => {
  if (!isDesignDetail.value) {
    designForm.value = emptyDesign();
    activeModule.value = 'overview';
    return;
  }

  const existing = designs.value[activeDesignIndex.value];
  designForm.value = normalizeDesign(existing || {}, activeDesignIndex.value);
  if (resetModule) {
    activeModule.value = 'overview';
  }
};

const fetchComponent = async () => {
  isFetching.value = true;
  try {
    const [response, config] = await Promise.all([
      api.getRequiredOptionComponentOptions(configId.value, componentId.value),
      api.getConfig(configId.value),
    ]);
    configData.value = config || {};
    editorReferences.value = {
      requiredOptions: response?.requiredOptions || {},
      manageShapes: response?.manageShapes || [],
      manageFixingMethods: response?.manageFixingMethods || [],
      manageBorders: response?.manageBorders || [],
    };
    componentForm.value = normalizeComponent(response?.component || {});
    syncDesignFormFromRoute();
  } catch (error) {
    toastMessage(__('Unable to load design collection.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
  } finally {
    isFetching.value = false;
  }
};

const persistComponent = async (payload, successMessage, notify = true) => {
  isLoading.value = true;
  try {
    const result = await api.updateRequiredOptionComponent(configId.value, componentId.value, payload);
    if (result?.success === false) {
      if (notify) {
        toastMessage(result.message || __('Unable to save changes.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
      }
      return false;
    }
    const section = result?.data?.components?.items?.find?.(
      (item, index) => String(item?.id || `component-${index + 1}`) === String(componentId.value)
    );
    componentForm.value = normalizeComponent(section || payload);
    syncDesignFormFromRoute(false);
    if (notify) {
      toastMessage(result?.message || successMessage || __('Saved.', 'all-signs-customizer-for-woocommerce-pro'));
    }
    return true;
  } catch (error) {
    if (notify) {
      toastMessage(__('Unable to save changes.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
    }
    return false;
  } finally {
    isLoading.value = false;
  }
};

const goBackToComponents = () => {
  router.push({ name: 'required-components', params: { configId: configId.value } });
};

const goBackToCollection = () => {
  router.push({ name: 'required-component-options', params: { configId: configId.value, componentId: componentId.value } });
};

const goToDesign = (itemId) => {
  router.push({
    name: 'required-component-option-detail',
    params: { configId: configId.value, componentId: componentId.value, optionId: String(itemId) },
  });
};

const openMiniConfigurator = (index) => {
  if (index < 0 || index >= designs.value.length) return;
  configuredDesignIndex.value = index;
};

const closeMiniConfigurator = () => {
  configuredDesignIndex.value = null;
};

const configureCurrentDesign = () => {
  const index = activeDesignIndex.value;
  openMiniConfigurator(index);
  router.push({ name: 'required-component-options', params: { configId: configId.value, componentId: componentId.value } });
};

const getShapeRadius = (shapeLabel) => {
  const normalized = String(shapeLabel || '').toLowerCase();
  if (normalized.includes('oval') || normalized.includes('circle')) return '999px';
  if (normalized.includes('polygon')) return '36px';
  if (normalized.includes('wave')) return '42% 18% 42% 18% / 20% 42% 20% 42%';
  if (normalized.includes('diamond')) return '12px';
  if (normalized.includes('rounded')) return '28px';
  return '18px';
};

const getPlateBackground = (hex) => {
  if (!hex) return 'linear-gradient(135deg, #ffffff 0%, #eef2f6 100%)';
  const normalized = String(hex).toLowerCase();
  if (normalized === '#000000' || normalized === '#111827') {
    return 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
  }
  return hex;
};

const saveCollectionInfo = async () => {
  await persistComponent({
    ...componentForm.value,
    label: componentForm.value.label,
    title: componentForm.value.label,
    name: componentForm.value.label,
  }, __('Collection updated.', 'all-signs-customizer-for-woocommerce-pro'));
};

const componentCount = (design, key) => {
  if (Array.isArray(design?.[key])) return design[key].length;
  if (Array.isArray(design?.[key]?.items)) return design[key].items.length;
  return 0;
};

const summarizeDesign = (design) => [
  componentCount(design, 'sizes') ? `${componentCount(design, 'sizes')} size` : 'no size',
  componentCount(design, 'shapes') ? `${componentCount(design, 'shapes')} shape` : 'no shape',
  componentCount(design, 'backgrounds') ? `${componentCount(design, 'backgrounds')} color` : 'no color',
  componentCount(design, 'fixingMethods') ? `${componentCount(design, 'fixingMethods')} fixing` : 'no fixing',
].join(' · ');

const designModules = (design) => {
  const rows = [];
  if (componentCount(design, 'shapes')) rows.push({ key: 'shape', label: 'Shape', icon: '○' });
  if (componentCount(design, 'textZones')) rows.push({ key: 'text', label: 'Text', icon: 'T' });
  if (componentCount(design, 'backgrounds')) rows.push({ key: 'background', label: 'Colors', icon: '◩' });
  if (componentCount(design, 'imageZones')) rows.push({ key: 'image', label: 'Images', icon: '▤' });
  if (componentCount(design, 'fixingMethods')) rows.push({ key: 'fixing', label: 'Fixing', icon: '⌘' });
  if (componentCount(design, 'borders')) rows.push({ key: 'border', label: 'Borders', icon: '□' });
  return rows;
};

const visibleModules = (design) => designModules(design).slice(0, 3);
const hiddenModuleCount = (design) => Math.max(designModules(design).length - 3, 0);

const configuredPreview = computed(() => {
  const design = configuredDesign.value || emptyDesign();
  const defaultBackgroundId = String(
    design.backgrounds?.items?.find((item) => item.isDefault)?.id ||
    design.backgrounds?.items?.[0]?.id ||
    ''
  );
  const color = colorOptions.value.find((item) => String(item.id) === defaultBackgroundId);
  const defaultColor = color ? { label: color.label, hex: normalizeHexColor(color.hex) } : null;
  const shapeId = String(
    design.shapes?.items?.find((item) => item.custom)?.id ||
    design.shapes?.items?.[0]?.id ||
    ''
  );
  const shape = design.shapes?.items?.find((item) => String(item.id) === shapeId) || {};
  const shapeSource = shapeOptions.value.find((item) => String(item.id) === shapeId);
  const shapeLabel = String(shape.label || shapeSource?.label || 'Shape');
  const textZones = (Array.isArray(design.textZones) ? design.textZones : []).map((zone, index) => {
    const hasPosition = Number(zone.x || 0) !== 0 || Number(zone.y || 0) !== 0;
    return {
      id: ensureZoneId(zone, 'text', index),
      label: String(zone.value || zone.label || zone.internalLabel || `Text ${index + 1}`),
      value: String(zone.value || zone.label || zone.internalLabel || ''),
      x: hasPosition ? Number(zone.x || 50) : 50,
      y: hasPosition ? Number(zone.y || 55) : 56 + (index * 10),
      textAlign: String(zone.textAlign || zone.alignment || 'center'),
      fontSize: Number(zone.fontSize || (index === 0 ? 42 : 13)),
      bold: zone.bold !== false,
      italic: Boolean(zone.italic),
      defaultFont: String(zone.defaultFont || ''),
      color: String(zone.color || '#111827'),
    };
  });
  const imageZones = (Array.isArray(design.imageZones) ? design.imageZones : [])
    .filter((zone) => String(zone.image || '').trim())
    .map((zone, index) => {
      const hasPosition = Number(zone.x || 0) !== 0 || Number(zone.y || 0) !== 0;
      return {
        id: ensureZoneId(zone, 'image', index),
        image: String(zone.image || ''),
        x: hasPosition ? Number(zone.x || 50) : 50,
        y: hasPosition ? Number(zone.y || 30) : 30,
        width: Number(zone.width || 42),
        height: Number(zone.height || 42),
        fitMode: zone.fitMode === 'cover' ? 'cover' : zone.fitMode === 'stretch' ? 'fill' : 'contain',
      };
    });
  const title = String(design.label || __('Configure design', 'all-signs-customizer-for-woocommerce-pro'));
  const subtitle = String(design.description || __('Live option preview', 'all-signs-customizer-for-woocommerce-pro'));
  const accentColor = defaultColor?.hex || '#d4a000';

  return {
    title,
    subtitle,
    glyph: title.slice(0, 2).toUpperCase(),
    heroImage: String(design.icon || design.image || ''),
    defaultColor,
    accentColor,
    plateBackground: getPlateBackground(defaultColor?.hex),
    plateRadius: getShapeRadius(shapeLabel),
    textColor: ['#000000', '#111827'].includes(String(defaultColor?.hex || '').toLowerCase()) ? '#f9fafb' : '#111827',
    fixingCount: componentCount(design, 'fixingMethods'),
    textZones,
    imageZones,
  };
});

const addDesign = async () => {
  const index = designs.value.length;
  const nextDesign = normalizeDesign({
    ...emptyDesign(),
    label: fallbackDesignLabel(index),
    name: fallbackDesignLabel(index),
    isDefault: designs.value.length === 0,
  }, index);
  const nextOptions = [...designs.value, nextDesign];
  const saved = await persistComponent({
    ...componentForm.value,
    options: nextOptions,
  }, __('Design added.', 'all-signs-customizer-for-woocommerce-pro'));
  if (saved) {
    goToDesign(designs.value[index]?.id || index);
  }
};

const saveDesign = async (notify = true) => {
  const index = activeDesignIndex.value;
  const nextDesign = normalizeDesign({
    ...designForm.value,
    label: designForm.value.label,
    name: designForm.value.label,
    overrides: {
      ...(designForm.value.overrides || {}),
      additionalPrice: Number(designForm.value.additionalPrice || 0),
    },
  }, index);
  const nextOptions = designs.value.map((item, itemIndex) => itemIndex === index ? nextDesign : { ...item });
  return persistComponent({
    ...componentForm.value,
    options: nextOptions,
  }, __('Design saved.', 'all-signs-customizer-for-woocommerce-pro'), notify);
};

const persistDesignSilently = async () => {
  const saved = await saveDesign(false);
  if (!saved) {
    throw new Error('Unable to persist design');
  }
};

const saveDesignModule = async (label) => {
  if (savingModule.value) return;
  savingModule.value = label || 'Design';
  try {
    if (label === 'Size') {
      designForm.value.sizes.items = selectedSizeRows.value.map((item) => ({
        id: item.id,
        isDefault: Boolean(item.isDefault),
      }));
    }
    const saved = await saveDesign(false);
    if (saved && label) {
      toastMessage(`${label} saved`);
    } else if (!saved) {
      toastMessage(__('Unable to save design changes.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
    }
  } finally {
    savingModule.value = '';
  }
};

const closeEditor = () => {
  editorMode.value = '';
  subMode.value = 'existing';
  draftIds.value = [];
  customDraft.value = {};
  sizeDraft.value = {};
  backgroundDraft.value = {};
  textZoneDraft.value = {};
  imageZoneDraft.value = {};
  editingZoneId.value = '';
};

const emptyBackgroundDraft = () => ({
  label: '',
  previewImg: '',
  usePattern: false,
  hexCode: '#000000',
  patternImage: '',
  enableTextColor: false,
  textColorName: '',
  textHexCode: '#111827',
  useSameColorForBorder: false,
  additionalPrice: 0,
});

const openPicker = (mode) => {
  editorMode.value = mode;
  subMode.value = 'existing';
  draftIds.value = [];
  customDraft.value = {
    label: '',
    url: '',
    additionalPrice: 0,
    hexCode: '#ffcf5a',
  };
  if (mode === 'size') {
    sizeDraft.value = {
      label: '',
      width: 100,
      height: 50,
      numberOfLines: -1,
      maxTextChar: -1,
    };
  }
  if (mode === 'shape') {
    const savedShape = Array.isArray(designForm.value?.shapes?.items)
      ? designForm.value.shapes.items.find((item) => !item?.custom)
      : null;
    draftIds.value = savedShape?.id ? [String(savedShape.id)] : [];
  }
  if (mode === 'background') {
    backgroundDraft.value = emptyBackgroundDraft();
  }
  if (mode === 'fixing') {
    draftIds.value = Array.isArray(designForm.value?.fixingMethods?.items)
      ? designForm.value.fixingMethods.items.filter((item) => !item?.custom).map((item) => String(item.id))
      : [];
    customDraft.value = {
      label: '',
      url: '',
      additionalPrice: 0,
      fixingMethodId: '',
      sizeId: selectedSizeRows.value.find((size) => size.isDefault)?.id || selectedSizeRows.value[0]?.id || sizeOptions.value[0]?.id || '',
      excludeSizes: [],
      excludeShapes: [],
    };
  }
  if (mode === 'lighting') {
    customDraft.value = {
      label: '',
      additionalPrice: 0,
      hexCode: '#ffcf5a',
    };
  }
  if (mode === 'border') {
    draftIds.value = Array.isArray(designForm.value?.borders?.items)
      ? designForm.value.borders.items.filter((item) => !item?.custom).map((item) => String(item.id))
      : [];
    customDraft.value = {
      label: '',
      url: '',
      additionalPrice: 0,
      id: '',
      excludeSizes: [],
      excludeShapes: [],
    };
  }
};

const toggleDraftId = (id, checked) => {
  const value = String(id);
  draftIds.value = checked
    ? Array.from(new Set([...draftIds.value, value]))
    : draftIds.value.filter((item) => item !== value);
};

const selectSingleDraftId = (id, checked) => {
  draftIds.value = checked ? [String(id)] : [];
};

const withOneDefault = (items) => {
  if (!items.length) return [];
  const hasDefault = items.some((item) => item.isDefault);
  return items.map((item, index) => ({ ...item, isDefault: hasDefault ? Boolean(item.isDefault) : index === 0 }));
};

const addNestedItems = (section, ids, mapper) => {
  const current = Array.isArray(designForm.value?.[section]?.items) ? designForm.value[section].items : [];
  const next = ids
    .filter((id) => !current.some((item) => String(item.id) === String(id)))
    .map(mapper);
  designForm.value[section].items = withOneDefault([...current, ...next]);
  closeEditor();
};

const refreshGlobalSizes = async () => {
  const latestConfig = await api.getConfig(configId.value);
  configData.value = latestConfig || configData.value;
  editorReferences.value = {
    ...editorReferences.value,
    requiredOptions: latestConfig?.requiredOptions || latestConfig?.data?.requiredOptions || editorReferences.value?.requiredOptions || {},
  };
};
const refreshGlobalRequiredOptions = refreshGlobalSizes;

const addSelectedSizes = () => addNestedItems('sizes', draftIds.value, (id) => ({ id: String(id), isDefault: false }));

const createAndAddSize = async () => {
  if (!String(sizeDraft.value.label || '').trim()) return;
  isSizeCreating.value = true;
  try {
    const response = await api.addRequiredOptionSizeItem(configId.value, {
      label: String(sizeDraft.value.label || '').trim(),
      width: Number(sizeDraft.value.width || 0),
      height: Number(sizeDraft.value.height || 0),
      numberOfLines: Number(sizeDraft.value.numberOfLines ?? -1),
      maxTextChar: Number(sizeDraft.value.maxTextChar ?? -1),
    });
    const createdSize = response?.data?.size;
    if (response?.success === false || !createdSize?.id) {
      toastMessage(response?.message || __('Unable to create size.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
      return;
    }
    await refreshGlobalSizes();
    addNestedItems('sizes', [createdSize.id], () => ({ id: String(createdSize.id), isDefault: false }));
    await persistDesignSilently();
    toastMessage(response.message || __('Size successfully added.', 'all-signs-customizer-for-woocommerce-pro'));
  } catch (error) {
    toastMessage(__('Unable to create size.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
  } finally {
    isSizeCreating.value = false;
  }
};

const setBackgroundSubMode = (mode) => {
  subMode.value = mode;
  draftIds.value = [];
  backgroundDraft.value = emptyBackgroundDraft();
};

const addBackgroundColors = async () => {
  if (!draftIds.value.length || isBackgroundSaving.value) return;
  isBackgroundSaving.value = true;
  try {
    addNestedItems('backgrounds', draftIds.value, (id) => ({ id: String(id), isDefault: false }));
    await persistDesignSilently();
    toastMessage(__('Background colors added.', 'all-signs-customizer-for-woocommerce-pro'));
  } catch (error) {
    toastMessage(__('Unable to add background colors.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
  } finally {
    isBackgroundSaving.value = false;
  }
};

const createAndAddBackgroundColor = async () => {
  if (!canCreateBackgroundColor.value || isBackgroundSaving.value) return;
  isBackgroundSaving.value = true;
  try {
    const label = String(backgroundDraft.value.label || '').trim();
    const patternImage = String(backgroundDraft.value.patternImage || '').trim();
    const previewImg = String(backgroundDraft.value.previewImg || '').trim();
    const payload = {
      label,
      name: label,
      previewImg,
      image: previewImg,
      pattern: {
        type: backgroundDraft.value.usePattern ? 'image' : 'color',
        codeHex: backgroundDraft.value.usePattern ? '' : String(backgroundDraft.value.hexCode || '#000000').trim(),
        image: backgroundDraft.value.usePattern ? patternImage : '',
        url: backgroundDraft.value.usePattern ? patternImage : '',
      },
      textColor: {
        enabled: Boolean(backgroundDraft.value.enableTextColor),
        name: String(backgroundDraft.value.textColorName || '').trim(),
        label: String(backgroundDraft.value.textColorName || '').trim(),
        codeHex: String(backgroundDraft.value.textHexCode || '#111827').trim(),
        useSameColorForBorder: Boolean(backgroundDraft.value.useSameColorForBorder),
      },
      additionalPrice: Number(backgroundDraft.value.additionalPrice || 0),
      isDefault: false,
    };
    const response = await api.addRequiredOptionColorItem(configId.value, payload);
    const createdColor = response?.data?.color;
    if (response?.success === false || !createdColor?.id) {
      toastMessage(response?.message || __('Unable to create color.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
      return;
    }
    await refreshGlobalRequiredOptions();
    addNestedItems('backgrounds', [createdColor.id], () => ({ id: String(createdColor.id), isDefault: false }));
    await persistDesignSilently();
    toastMessage(response.message || __('Color successfully added.', 'all-signs-customizer-for-woocommerce-pro'));
  } catch (error) {
    toastMessage(__('Unable to create color.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
  } finally {
    isBackgroundSaving.value = false;
  }
};

const setFixingSubMode = (mode) => {
  subMode.value = mode;
  if (mode === 'existing') {
    draftIds.value = Array.isArray(designForm.value?.fixingMethods?.items)
      ? designForm.value.fixingMethods.items.filter((item) => !item?.custom).map((item) => String(item.id))
      : [];
  } else {
    draftIds.value = [];
  }
  customDraft.value = {
    label: '',
    url: '',
    additionalPrice: 0,
    fixingMethodId: mode === 'create' ? String(managedFixingChoices.value[0]?.value || '') : '',
    sizeId: selectedSizeRows.value.find((size) => size.isDefault)?.id || selectedSizeRows.value[0]?.id || sizeOptions.value[0]?.id || '',
    excludeSizes: [],
    excludeShapes: [],
  };
  if (mode === 'create') syncManagedFixingDraft();
};

const toggleCustomDraftList = (field, id, checked) => {
  const current = Array.isArray(customDraft.value[field]) ? customDraft.value[field].map(String) : [];
  customDraft.value[field] = checked
    ? Array.from(new Set([...current, String(id)]))
    : current.filter((item) => item !== String(id));
};

const syncManagedFixingDraft = () => {
  const selected = selectedManagedFixing.value;
  if (!selected) return;
  customDraft.value = {
    ...customDraft.value,
    label: String(selected.label || customDraft.value.label || ''),
  };
};

const fixingDesignItemFromSource = (source) => ({
  id: String(source?.id || ''),
  fixingMethodId: String(source?.fixingMethodId || source?.id || ''),
  custom: false,
  isDefault: false,
  label: String(source?.label || ''),
  excludeSizes: Array.isArray(source?.excludeSizes) ? source.excludeSizes : [],
  excludeShapes: Array.isArray(source?.excludeShapes) ? source.excludeShapes : [],
});

const saveExistingFixingMethods = async () => {
  if (!draftIds.value.length || isFixingSaving.value) return;
  isFixingSaving.value = true;
  try {
    const customItems = (designForm.value.fixingMethods.items || []).filter((item) => item.custom);
    const selectedItems = draftIds.value
      .map((id) => fixingOptions.value.find((item) => item.id === String(id)))
      .filter(Boolean)
      .map(fixingDesignItemFromSource);
    designForm.value.fixingMethods.items = withOneDefault([...selectedItems, ...customItems]);
    closeEditor();
    await persistDesignSilently();
    toastMessage(__('Fixing methods added.', 'all-signs-customizer-for-woocommerce-pro'));
  } catch (error) {
    toastMessage(__('Unable to add fixing methods.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
  } finally {
    isFixingSaving.value = false;
  }
};

const createAndAddFixingMethod = async () => {
  if (!canSaveFixingEditor.value || isFixingSaving.value) return;
  isFixingSaving.value = true;
  try {
    const selected = selectedManagedFixing.value;
    const label = String(customDraft.value.label || selected?.label || '').trim();
    const payload = {
      label,
      name: label,
      fixingMethodId: String(selected?.fixingMethodId || customDraft.value.fixingMethodId || ''),
      previewImg: String(selected?.image || selected?.icon || ''),
      icon: String(selected?.icon || selected?.image || ''),
      additionalPrice: Number(customDraft.value.additionalPrice || 0),
      excludeSizes: Array.isArray(customDraft.value.excludeSizes) ? customDraft.value.excludeSizes : [],
      excludeShapes: Array.isArray(customDraft.value.excludeShapes) ? customDraft.value.excludeShapes : [],
      isDefault: false,
    };
    const response = await api.addRequiredOptionFixingMethodItem(configId.value, payload);
    const created = response?.data?.fixingMethod;
    if (response?.success === false || !created?.id) {
      toastMessage(response?.message || __('Unable to create fixing method.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
      return;
    }
    await refreshGlobalRequiredOptions();
    addNestedItems('fixingMethods', [created.id], () => fixingDesignItemFromSource(created));
    await persistDesignSilently();
    toastMessage(response.message || __('Fixing method successfully added.', 'all-signs-customizer-for-woocommerce-pro'));
  } catch (error) {
    toastMessage(__('Unable to create fixing method.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
  } finally {
    isFixingSaving.value = false;
  }
};

const saveCustomFixingMethod = async () => {
  if (!canSaveFixingEditor.value || isFixingSaving.value) return;
  isFixingSaving.value = true;
  try {
    const item = {
      id: String(customDraft.value.id || `custom-fixing-${Date.now()}`),
      label: String(customDraft.value.label || 'Custom fixing'),
      url: String(customDraft.value.url || ''),
      sizeId: String(customDraft.value.sizeId || ''),
      additionalPrice: Number(customDraft.value.additionalPrice || 0),
      custom: true,
      isDefault: false,
    };
    const current = Array.isArray(designForm.value.fixingMethods.items) ? designForm.value.fixingMethods.items : [];
    designForm.value.fixingMethods.items = withOneDefault([...current.filter((entry) => String(entry.id) !== item.id), item]);
    closeEditor();
    await persistDesignSilently();
    toastMessage(__('Custom fixing saved.', 'all-signs-customizer-for-woocommerce-pro'));
  } catch (error) {
    toastMessage(__('Unable to save custom fixing.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
  } finally {
    isFixingSaving.value = false;
  }
};

const shapeDesignItemFromSource = (source) => ({
  id: String(source?.id || ''),
  shapeId: String(source?.shapeId || ''),
  custom: false,
  isDefault: true,
  label: String(source?.label || ''),
});

const syncManagedShapeDraft = () => {
  const selected = selectedManagedShape.value;
  if (!selected) return;
  customDraft.value = {
    ...customDraft.value,
    label: String(selected.label || customDraft.value.label || ''),
  };
};

const setShapeSubMode = (mode) => {
  subMode.value = mode;
  draftIds.value = mode === 'existing' ? draftIds.value : [];
  customDraft.value = {
    label: '',
    url: '',
    additionalPrice: 0,
    shapeId: mode === 'create' ? String(managedShapeChoices.value[0]?.value || '') : '',
  };
  syncManagedShapeDraft();
};

const saveShapeEditor = async () => {
  if (!canSaveShapeEditor.value || isShapeSaving.value) return;
  isShapeSaving.value = true;
  try {
    if (subMode.value === 'existing') {
      const source = shapeOptions.value.find((item) => item.id === String(draftIds.value[0]));
      if (!source) return;
      designForm.value.shapes.items = [shapeDesignItemFromSource(source)];
      await persistDesignSilently();
      closeEditor();
      toastMessage(__('Shape saved.', 'all-signs-customizer-for-woocommerce-pro'));
      return;
    }

    if (subMode.value === 'create') {
      const selected = selectedManagedShape.value;
      const response = await api.addRequiredOptionShapeItem(configId.value, {
        shapeId: String(selected?.shapeId || customDraft.value.shapeId || ''),
        label: String(selected?.label || customDraft.value.label || '').trim(),
        additionalPrice: Number(customDraft.value.additionalPrice || 0),
        isDefault: false,
      });
      const createdShape = response?.data?.shape;
      if (response?.success === false || !createdShape?.id) {
        toastMessage(response?.message || __('Unable to create shape.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
        return;
      }
      await refreshGlobalRequiredOptions();
      designForm.value.shapes.items = [shapeDesignItemFromSource(createdShape)];
      await persistDesignSilently();
      closeEditor();
      toastMessage(response.message || __('Shape successfully added.', 'all-signs-customizer-for-woocommerce-pro'));
      return;
    }

    designForm.value.shapes.items = [{
      id: String(customDraft.value.id || `custom-shape-${Date.now()}`),
      label: String(customDraft.value.label || '').trim(),
      url: String(customDraft.value.url || '').trim(),
      additionalPrice: Number(customDraft.value.additionalPrice || 0),
      custom: true,
      isDefault: true,
    }];
    await persistDesignSilently();
    closeEditor();
    toastMessage(__('Shape saved.', 'all-signs-customizer-for-woocommerce-pro'));
  } catch (error) {
    toastMessage(__('Unable to save shape.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
  } finally {
    isShapeSaving.value = false;
  }
};

const lightingDesignItemFromSource = (source = {}) => ({
  id: String(source.id || ''),
  label: String(source.label || ''),
  hexCode: normalizeHexColor(source.hexCode || source.hex || '#ffcf5a'),
  additionalPrice: Number(source.additionalPrice || 0),
  isDefault: false,
});

const saveLightingEditor = async () => {
  if (isLightingSaving.value) return;
  isLightingSaving.value = true;
  try {
    if (subMode.value === 'existing') {
      addNestedItems('lightings', draftIds.value, (id) => {
        const source = lightingOptions.value.find((item) => item.id === String(id));
        return lightingDesignItemFromSource(source || { id });
      });
      return;
    }

    const label = String(customDraft.value.label || '').trim();
    if (!label) return;
    const response = await api.addRequiredOptionLightingItem(configId.value, {
      label,
      hexCode: normalizeHexColor(customDraft.value.hexCode || '#ffcf5a'),
      additionalPrice: Number(customDraft.value.additionalPrice || 0),
      isDefault: false,
    });
    const createdLighting = response?.data?.lighting;
    if (response?.success === false || !createdLighting?.id) {
      toastMessage(response?.message || __('Unable to create lighting color.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
      return;
    }
    await refreshGlobalRequiredOptions();
    addNestedItems('lightings', [createdLighting.id], () => lightingDesignItemFromSource(createdLighting));
    toastMessage(response.message || __('Lighting color successfully added.', 'all-signs-customizer-for-woocommerce-pro'));
  } catch (error) {
    toastMessage(__('Unable to save lighting color.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
  } finally {
    isLightingSaving.value = false;
  }
};

const borderDesignItemFromSource = (source = {}) => ({
  id: String(source.id || ''),
  borderId: String(source.borderId || source.managedId || ''),
  custom: false,
  isDefault: false,
  label: String(source.label || source.name || ''),
  additionalPrice: Number(source.additionalPrice || 0),
  excludeSizes: Array.isArray(source.excludeSizes) ? source.excludeSizes : [],
  excludeShapes: Array.isArray(source.excludeShapes) ? source.excludeShapes : [],
});

const syncManagedBorderDraft = () => {
  const selected = selectedManagedBorder.value;
  if (!selected) return;
  customDraft.value = {
    ...customDraft.value,
    label: String(selected.label || customDraft.value.label || ''),
    borderId: String(selected.value || customDraft.value.borderId || ''),
  };
};

const setBorderSubMode = (mode) => {
  subMode.value = mode;
  draftIds.value = mode === 'existing'
    ? (Array.isArray(designForm.value?.borders?.items) ? designForm.value.borders.items.filter((item) => !item?.custom).map((item) => String(item.id)) : [])
    : [];
  customDraft.value = {
    label: '',
    url: '',
    additionalPrice: 0,
    borderId: mode === 'create' ? String(managedBorderChoices.value[0]?.value || '') : '',
    excludeSizes: [],
    excludeShapes: [],
  };
  syncManagedBorderDraft();
};

const saveBorderEditor = async () => {
  if (!canSaveBorderEditor.value || isBorderSaving.value) return;
  isBorderSaving.value = true;
  try {
    if (subMode.value === 'existing') {
      addNestedItems('borders', draftIds.value, (id) => {
        const source = borderOptions.value.find((item) => item.id === String(id));
        return borderDesignItemFromSource(source || { id });
      });
      return;
    }

    if (subMode.value === 'create') {
      const selected = selectedManagedBorder.value;
      const response = await api.addRequiredOptionBorderItem(configId.value, {
        borderId: String(selected?.value || customDraft.value.borderId || ''),
        label: String(selected?.label || customDraft.value.label || '').trim(),
        additionalPrice: Number(customDraft.value.additionalPrice || 0),
        excludeSizes: Array.isArray(customDraft.value.excludeSizes) ? customDraft.value.excludeSizes : [],
        excludeShapes: Array.isArray(customDraft.value.excludeShapes) ? customDraft.value.excludeShapes : [],
        isDefault: false,
      });
      const createdBorder = response?.data?.border;
      if (response?.success === false || !createdBorder?.id) {
        toastMessage(response?.message || __('Unable to create border.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
        return;
      }
      await refreshGlobalRequiredOptions();
      const current = Array.isArray(designForm.value.borders.items) ? designForm.value.borders.items : [];
      designForm.value.borders.items = withOneDefault([...current.filter((entry) => String(entry.id) !== String(createdBorder.id)), borderDesignItemFromSource(createdBorder)]);
      closeEditor();
      await persistDesignSilently();
      toastMessage(response.message || __('Border successfully added.', 'all-signs-customizer-for-woocommerce-pro'));
      return;
    }

    const item = {
      id: String(customDraft.value.id || `custom-border-${Date.now()}`),
      label: String(customDraft.value.label || 'Custom border'),
      url: String(customDraft.value.url || ''),
      additionalPrice: Number(customDraft.value.additionalPrice || 0),
      custom: true,
      borderId: String(customDraft.value.borderId || ''),
      isDefault: false,
    };
    const current = Array.isArray(designForm.value.borders.items) ? designForm.value.borders.items : [];
    designForm.value.borders.items = withOneDefault([...current.filter((entry) => String(entry.id) !== item.id), item]);
    closeEditor();
    await persistDesignSilently();
    toastMessage(__('Custom border saved.', 'all-signs-customizer-for-woocommerce-pro'));
  } catch (error) {
    toastMessage(__('Unable to save border.', 'all-signs-customizer-for-woocommerce-pro'), 'error');
  } finally {
    isBorderSaving.value = false;
  }
};

const removeNestedItem = (section, id) => {
  if (!designForm.value?.[section]?.items) return;
  designForm.value[section].items = withOneDefault(designForm.value[section].items.filter((item) => String(item.id) !== String(id)));
};

const setDefaultNested = (section, id) => {
  if (!designForm.value?.[section]?.items) return;
  designForm.value[section].items = designForm.value[section].items.map((item) => ({ ...item, isDefault: String(item.id) === String(id) }));
};

const dragState = ref(null);

const reorderItems = (items, fromId, toId, idGetter) => {
  const fromIndex = items.findIndex((item, index) => String(idGetter(item, index)) === String(fromId));
  const toIndex = items.findIndex((item, index) => String(idGetter(item, index)) === String(toId));
  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return items;
  const next = [...items];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
};

const startNestedDrag = (event, section, id) => {
  dragState.value = { type: 'nested', section, id: String(id) };
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', String(id));
};

const dropNestedItem = (event, section, targetId) => {
  event.preventDefault();
  if (dragState.value?.type !== 'nested' || dragState.value.section !== section) return;
  const items = Array.isArray(designForm.value?.[section]?.items) ? designForm.value[section].items : [];
  designForm.value[section].items = reorderItems(items, dragState.value.id, targetId, (item) => item.id);
  dragState.value = null;
};

const startZoneDrag = (event, listKey, id) => {
  dragState.value = { type: 'zone', listKey, id: String(id) };
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', String(id));
};

const dropZoneItem = (event, listKey, targetId) => {
  event.preventDefault();
  if (dragState.value?.type !== 'zone' || dragState.value.listKey !== listKey) return;
  const items = Array.isArray(designForm.value?.[listKey]) ? designForm.value[listKey] : [];
  const prefix = listKey === 'imageZones' ? 'image' : 'text';
  designForm.value[listKey] = reorderItems(items, dragState.value.id, targetId, (item, index) => ensureZoneId(item, prefix, index));
  dragState.value = null;
};

const endDrag = () => {
  dragState.value = null;
};

const toggleSectionEnabled = (section) => {
  designForm.value[section].enabled = !designForm.value[section].enabled;
};

const sizeLabel = (id) => sizeOptions.value.find((item) => item.id === String(id))?.label || String(id);
const colorLabel = (id) => colorOptions.value.find((item) => item.id === String(id))?.label || String(id);
const colorHex = (id) => colorOptions.value.find((item) => item.id === String(id))?.hex || '#ffffff';
const isLegacyDemoPreview = (value) => String(value || '').includes('/aso_default_files/demos/');
const managedFixingFor = (fixing) => {
  if (fixing?.managedItem) return fixing.managedItem;
  if (fixing?.source?.managedItem) return fixing.source.managedItem;
  if (fixing?.item?.managedItem) return fixing.item.managedItem;
  return resolveManagedItem(managedFixingLibrary.value, fixing?.item || fixing, ['fixingMethodId']);
};
const fixingPreview = (fixing = {}) => {
  const managed = managedFixingFor(fixing);
  const ownImage = String(fixing?.url || fixing?.image || fixing?.preview || fixing?.item?.url || fixing?.item?.image || fixing?.source?.url || fixing?.source?.image || '').trim();
  if (ownImage && !isLegacyDemoPreview(ownImage)) return `<img src="${ownImage}" alt="">`;
  return globalPreview(managed, fixingFallbackPreview(fixing?.item || fixing?.source || managed || fixing));
};
const managedShapeFor = (shape) => {
  if (shape?.managedItem) return shape.managedItem;
  if (shape?.source?.managedItem) return shape.source.managedItem;
  if (shape?.item?.managedItem) return shape.item.managedItem;
  return resolveManagedItem(managedShapeLibrary.value, shape?.item || shape, ['shapeId']);
};
const shapePreview = (shape) => {
  const managed = managedShapeFor(shape);
  const ownImage = String(shape?.url || shape?.image || shape?.preview || shape?.item?.url || shape?.item?.image || shape?.source?.url || shape?.source?.image || '').trim();
  if (ownImage && !isLegacyDemoPreview(ownImage)) return `<img src="${ownImage}" alt="">`;
  return globalPreview(managed, shapeFallbackPreview(shape?.item || shape?.source || shape));
};

const managedBorderFor = (border) => {
  if (border?.managedItem) return border.managedItem;
  if (border?.source?.managedItem) return border.source.managedItem;
  if (border?.item?.managedItem) return border.item.managedItem;
  return resolveManagedItem(managedBorderLibrary.value, border?.item || border, ['id', 'borderId']);
};

const borderPreview = (border) => {
  const managed = managedBorderFor(border);
  const ownImage = String(border?.url || border?.image || border?.preview || border?.item?.url || border?.item?.image || border?.source?.url || border?.source?.image || '').trim();
  if (ownImage && !isLegacyDemoPreview(ownImage)) return `<img src="${ownImage}" alt="">`;
  return globalPreview(managed, borderFallbackPreview(border?.item || border?.source || border));
};

const editShape = (id) => {
  const item = designForm.value.shapes.items.find((entry) => String(entry.id) === String(id));
  openPicker('shape');
  subMode.value = item?.custom ? 'custom' : 'existing';
  draftIds.value = item?.custom ? [] : [String(id)];
  customDraft.value = { ...item };
};

const editBorder = (id) => {
  const item = designForm.value.borders.items.find((entry) => String(entry.id) === String(id));
  openPicker('border');
  subMode.value = item?.custom ? 'custom' : 'existing';
  draftIds.value = item?.custom ? [] : [String(id)];
  customDraft.value = { ...item };
};

const editFixing = (id) => {
  const item = designForm.value.fixingMethods.items.find((entry) => String(entry.id) === String(id));
  openPicker('fixing');
  subMode.value = item?.custom ? 'custom' : 'existing';
  draftIds.value = item?.custom ? [] : [String(id)];
  customDraft.value = {
    label: '',
    url: '',
    additionalPrice: 0,
    fixingMethodId: '',
    sizeId: selectedSizeRows.value.find((size) => size.isDefault)?.id || selectedSizeRows.value[0]?.id || sizeOptions.value[0]?.id || '',
    excludeSizes: [],
    excludeShapes: [],
    ...item,
  };
};

const emptyTextZone = () => ({
  id: `text-${Date.now()}`,
  label: '',
  internalLabel: '',
  value: '',
  defaultFont: '',
  fontSize: 10,
  color: '#000000',
  textAlign: 'center',
  bold: true,
  italic: false,
  required: false,
  minCharacters: 0,
  maxCharacters: 0,
  permissions: {
    editText: true,
    changeFont: true,
    changeColor: true,
    resizeText: true,
    moveText: true,
    rotateText: true,
    flipHorizontally: false,
    flipVertically: false,
  },
  x: 0,
  y: 0,
});

const canSaveTextZone = computed(() => String(textZoneDraft.value?.label || '').trim().length > 0);

const openTextZone = (id = '') => {
  const zones = ensureTextZones();
  const existing = zones.find((zone) => String(zone.id) === String(id));
  textZoneDraft.value = JSON.parse(JSON.stringify({
    ...emptyTextZone(),
    ...(existing || {}),
    permissions: {
      ...emptyTextZone().permissions,
      ...(existing?.permissions || {}),
    },
  }));
  editingZoneId.value = existing?.id || '';
  editorMode.value = 'text';
};

const saveTextZone = () => {
  const label = String(textZoneDraft.value.label || '').trim();
  if (!label) return;
  const zones = ensureTextZones();
  const next = normalizeTextZone({
    ...textZoneDraft.value,
    internalLabel: label,
    label,
    value: String(textZoneDraft.value.value || ''),
  }, zones.length);
  designForm.value.textZones = editingZoneId.value
    ? zones.map((zone) => String(zone.id) === String(editingZoneId.value) ? next : zone)
    : [...zones, next];
  closeEditor();
};

const removeTextZone = (id) => {
  const zones = ensureTextZones();
  designForm.value.textZones = zones.filter((zone) => String(zone.id) !== String(id));
};

const emptyImageZone = () => ({
  id: `image-${Date.now()}`,
  label: '',
  internalLabel: '',
  image: '',
  allowedFiles: { svg: true, png: true, jpeg: true, webp: false },
  required: false,
  minWidth: 100,
  minHeight: 100,
  maxFileSizeMb: 2,
  permissions: {
    replaceImage: true,
    resizeImage: true,
    moveImage: true,
    rotateImage: true,
    flipHorizontally: true,
    flipVertically: false,
  },
  tint: '',
  fitMode: 'contain',
  lockAspectRatio: true,
  width: 0,
  height: 0,
  x: 0,
  y: 0,
});

const canSaveImageZone = computed(() => String(imageZoneDraft.value?.label || '').trim().length > 0);

const openImageZone = (id = '') => {
  const zones = ensureImageZones();
  const existing = zones.find((zone) => String(zone.id) === String(id));
  imageZoneDraft.value = JSON.parse(JSON.stringify({
    ...emptyImageZone(),
    ...(existing || {}),
    allowedFiles: {
      ...emptyImageZone().allowedFiles,
      ...(existing?.allowedFiles || {}),
    },
    permissions: {
      ...emptyImageZone().permissions,
      ...(existing?.permissions || {}),
    },
  }));
  editingZoneId.value = existing?.id || '';
  editorMode.value = 'image';
};

const saveImageZone = () => {
  const label = String(imageZoneDraft.value.label || '').trim();
  if (!label) return;
  const zones = ensureImageZones();
  const next = normalizeImageZone({
    ...imageZoneDraft.value,
    internalLabel: label,
    label,
  }, zones.length);
  designForm.value.imageZones = editingZoneId.value
    ? zones.map((zone) => String(zone.id) === String(editingZoneId.value) ? next : zone)
    : [...zones, next];
  closeEditor();
};

const removeImageZone = (id) => {
  const zones = ensureImageZones();
  designForm.value.imageZones = zones.filter((zone) => String(zone.id) !== String(id));
};

const setDefaultDesign = async (itemId) => {
  const targetIndex = designs.value.findIndex((item, index) => String(item.id || `design-${index + 1}`) === String(itemId));
  if (targetIndex < 0) return;
  const nextOptions = designs.value.map((item, itemIndex) => ({
    ...item,
    isDefault: itemIndex === targetIndex,
  }));
  await persistComponent({ ...componentForm.value, options: nextOptions }, __('Default design updated.', 'all-signs-customizer-for-woocommerce-pro'));
};

const reorderDesign = async (fromIndex, toIndex) => {
  if (fromIndex === null || fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= designs.value.length || toIndex >= designs.value.length) return;
  const nextOptions = designs.value.map((item) => ({ ...item }));
  const [moved] = nextOptions.splice(fromIndex, 1);
  nextOptions.splice(toIndex, 0, moved);
  if (configuredDesignIndex.value === fromIndex) {
    configuredDesignIndex.value = toIndex;
  } else if (configuredDesignIndex.value !== null && fromIndex < configuredDesignIndex.value && toIndex >= configuredDesignIndex.value) {
    configuredDesignIndex.value -= 1;
  } else if (configuredDesignIndex.value !== null && fromIndex > configuredDesignIndex.value && toIndex <= configuredDesignIndex.value) {
    configuredDesignIndex.value += 1;
  }
  await persistComponent({ ...componentForm.value, options: nextOptions }, __('Design order updated.', 'all-signs-customizer-for-woocommerce-pro'));
};

const startDesignDrag = (event, index) => {
  draggingDesignIndex.value = index;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', String(index));
};

const dropDesign = async (event, targetIndex) => {
  event.preventDefault();
  const transferValue = event.dataTransfer.getData('text/plain');
  const fromIndex = draggingDesignIndex.value !== null
    ? draggingDesignIndex.value
    : Number(transferValue);
  draggingDesignIndex.value = null;
  if (!Number.isInteger(fromIndex)) return;
  await reorderDesign(fromIndex, targetIndex);
};

const endDesignDrag = () => {
  draggingDesignIndex.value = null;
};

const deleteDesign = async (index) => {
  if (!window.confirm(__('Delete this design?', 'all-signs-customizer-for-woocommerce-pro'))) return;
  const nextOptions = designs.value.map((item) => ({ ...item }));
  nextOptions.splice(index, 1);
  if (configuredDesignIndex.value === index) {
    configuredDesignIndex.value = null;
  } else if (configuredDesignIndex.value !== null && index < configuredDesignIndex.value) {
    configuredDesignIndex.value -= 1;
  }
  await persistComponent({ ...componentForm.value, options: nextOptions }, __('Design deleted.', 'all-signs-customizer-for-woocommerce-pro'));
};

const openMediaFrame = (title, buttonText, callback) => {
  const uploader = wp.media({ title, button: { text: buttonText }, multiple: false });
  uploader.on('select', () => {
    const selection = uploader.state().get('selection');
    selection.map((attachment) => {
      const media = attachment.toJSON();
      if (media.type === 'image') callback(media.url);
    });
  });
  uploader.open();
};

const selectCollectionImage = () => {
  openMediaFrame(
    __('Select collection image', 'all-signs-customizer-for-woocommerce-pro'),
    __('Use image', 'all-signs-customizer-for-woocommerce-pro'),
    (url) => { componentForm.value.icon = url; }
  );
};

const selectDesignImage = () => {
  openMediaFrame(
    __('Select design image', 'all-signs-customizer-for-woocommerce-pro'),
    __('Use image', 'all-signs-customizer-for-woocommerce-pro'),
    (url) => { designForm.value.image = url; }
  );
};

const selectDraftFile = (field) => {
  openMediaFrame(
    __('Select file', 'all-signs-customizer-for-woocommerce-pro'),
    __('Use file', 'all-signs-customizer-for-woocommerce-pro'),
    (url) => { customDraft.value[field] = url; }
  );
};

const selectBackgroundDraftFile = (field) => {
  openMediaFrame(
    __('Select background image', 'all-signs-customizer-for-woocommerce-pro'),
    __('Use image', 'all-signs-customizer-for-woocommerce-pro'),
    (url) => { backgroundDraft.value[field] = url; }
  );
};

const selectImageZoneFile = () => {
  openMediaFrame(
    __('Select default image', 'all-signs-customizer-for-woocommerce-pro'),
    __('Use image', 'all-signs-customizer-for-woocommerce-pro'),
    (url) => { imageZoneDraft.value.image = url; }
  );
};

// eslint-disable-next-line no-unused-vars
const PickerBox = defineComponent({
  name: 'PickerBox',
  props: {
    items: { type: Array, default: () => [] },
    selected: { type: Array, default: () => [] },
  },
  emits: ['toggle', 'cancel', 'save'],
  template: `
    <div class="ascwo-config-card">
      <h4>Choose existing</h4>
      <p class="ascwo-muted">Select one or more existing items. The default item is defined in the table below.</p>
      <div class="ascwo-option-list">
        <label v-for="item in items" :key="item.id" class="ascwo-check-row">
          <input type="checkbox" :checked="selected.includes(item.id)" @change="$emit('toggle', item.id, $event.target.checked)" />
          <span v-if="item.hex" class="ascwo-color-dot" :style="{ background: item.hex }"></span>
          <span v-if="item.image" class="ascwo-mini-preview"><img :src="item.image" alt="" /></span>
          <span>{{ item.label }}</span>
        </label>
        <p v-if="items.length === 0" class="ascwo-muted">No item is available.</p>
      </div>
      <div class="ascwo-form-actions">
        <button type="button" class="ascwo-secondary-button" @click="$emit('cancel')">Cancel</button>
        <button type="button" class="ascwo-primary-button" :disabled="selected.length === 0" @click="$emit('save')">Add selected</button>
      </div>
    </div>
  `,
});

// eslint-disable-next-line no-unused-vars
const ModuleChooser = defineComponent({
  name: 'ModuleChooser',
  props: {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    button: { type: String, required: true },
    open: { type: Boolean, default: false },
  },
  emits: ['open'],
  template: `
    <section class="ascwo-module-card">
      <div class="ascwo-module-card-header">
        <div>
          <h4>{{ title }}</h4>
          <p>{{ description }}</p>
        </div>
        <button type="button" class="ascwo-primary-button" @click="$emit('open')">{{ button }}</button>
      </div>
      <slot />
    </section>
  `,
});

// eslint-disable-next-line no-unused-vars
const AdvancedRowsTable = defineComponent({
  name: 'AdvancedRowsTable',
  props: {
    rows: { type: Array, default: () => [] },
    configure: { type: Boolean, default: false },
  },
  emits: ['edit', 'remove', 'default'],
  template: `
    <div class="ascwo-table-card">
      <table class="ascwo-designs-table">
        <thead>
          <tr>
            <th></th>
            <th>Label</th>
            <th>Preview</th>
            <th>Default</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td><span class="ascwo-reorder-handle is-static" aria-hidden="true"><span v-for="dot in 6" :key="dot"></span></span></td>
            <td><strong>{{ row.label }}</strong><p v-if="row.description">{{ row.description }}</p></td>
            <td><span class="ascwo-mini-preview" v-html="row.previewHtml || ''" v-if="row.previewHtml"></span><span v-else class="ascwo-mini-preview"><img v-if="row.preview" :src="row.preview" alt="" /><span v-else></span></span></td>
            <td>
              <button v-if="'isDefault' in row.item" type="button" :class="['ascwo-toggle', row.isDefault ? 'is-active' : '']" @click="$emit('default', row.id)"><span></span></button>
            </td>
            <td>
              <div class="ascwo-row-actions">
                <button type="button" class="ascwo-secondary-button ascwo-small-button" @click="$emit('edit', row.id)">Edit</button>
                <button v-if="configure" type="button" class="ascwo-secondary-button ascwo-small-button">Configure placement</button>
                <button type="button" class="ascwo-danger-button ascwo-small-button" @click="$emit('remove', row.id)">Remove</button>
              </div>
            </td>
          </tr>
          <tr v-if="rows.length === 0"><td colspan="5" class="ascwo-empty-cell">No item is available for this design yet.</td></tr>
        </tbody>
      </table>
    </div>
  `,
});

// eslint-disable-next-line no-unused-vars
const LightingEditor = defineComponent({
  name: 'LightingEditor',
  props: {
    draft: { type: Object, required: true },
    items: { type: Array, default: () => [] },
    selected: { type: Array, default: () => [] },
    mode: { type: String, default: 'existing' },
  },
  emits: ['update:draft', 'mode', 'toggle', 'cancel', 'save'],
  methods: {
    update(key, value) { this.$emit('update:draft', { ...this.draft, [key]: value }); },
  },
  template: `
    <div class="ascwo-config-card">
      <h4>Configure lighting colors</h4>
      <div class="ascwo-segmented"><button type="button" :class="{ 'is-active': mode === 'existing' }" @click="$emit('mode', 'existing')">Choose existing</button><button type="button" :class="{ 'is-active': mode === 'create' }" @click="$emit('mode', 'create')">Create new</button></div>
      <div v-if="mode === 'existing'" class="ascwo-option-list">
        <label v-for="item in items" :key="item.id" class="ascwo-check-row"><input type="checkbox" :checked="selected.includes(item.id)" @change="$emit('toggle', item.id, $event.target.checked)" /><span class="ascwo-color-dot" :style="{ background: item.hex }"></span><span>{{ item.label }}</span></label>
      </div>
      <div v-else class="ascwo-two-col">
        <label><span class="ascwo-form-label">Label</span><input :value="draft.label" class="ascwo-form-input" @input="update('label', $event.target.value)" /></label>
        <label><span class="ascwo-form-label">Additional price</span><input :value="draft.additionalPrice" type="number" class="ascwo-form-input" @input="update('additionalPrice', Number($event.target.value))" /></label>
        <label><span class="ascwo-form-label">Color</span><input :value="draft.hexCode" class="ascwo-form-input" @input="update('hexCode', $event.target.value)" /></label>
      </div>
      <div class="ascwo-form-actions"><button type="button" class="ascwo-secondary-button" @click="$emit('cancel')">Cancel</button><button type="button" class="ascwo-primary-button" :disabled="mode === 'existing' && selected.length === 0" @click="$emit('save')">{{ mode === 'existing' ? 'Add lighting colors' : 'Create lighting color' }}</button></div>
    </div>
  `,
});

// eslint-disable-next-line no-unused-vars
const BorderEditor = defineComponent({
  name: 'BorderEditor',
  props: {
    draft: { type: Object, required: true },
    items: { type: Array, default: () => [] },
    selected: { type: Array, default: () => [] },
    mode: { type: String, default: 'existing' },
  },
  emits: ['update:draft', 'mode', 'toggle', 'upload', 'cancel', 'save'],
  methods: {
    update(key, value) { this.$emit('update:draft', { ...this.draft, [key]: value }); },
  },
  template: `
    <div class="ascwo-config-card">
      <h4>Configure borders</h4>
      <div class="ascwo-segmented"><button type="button" :class="{ 'is-active': mode === 'existing' }" @click="$emit('mode', 'existing')">Choose existing</button><button type="button" :class="{ 'is-active': mode === 'new' }" @click="$emit('mode', 'new')">Add new</button><button type="button" :class="{ 'is-active': mode === 'custom' }" @click="$emit('mode', 'custom')">Add custom</button></div>
      <div v-if="mode === 'existing'" class="ascwo-option-list">
        <label v-for="item in items" :key="item.id" class="ascwo-check-row"><input type="checkbox" :checked="selected.includes(item.id)" @change="$emit('toggle', item.id, $event.target.checked)" /><span v-if="item.previewHtml" class="ascwo-mini-preview" v-html="item.previewHtml"></span><span v-else class="ascwo-mini-preview"><img v-if="item.image" :src="item.image" alt="" /><span v-else></span></span><span>{{ item.label }}</span></label>
      </div>
      <div v-else class="ascwo-field-stack">
        <label><span class="ascwo-form-label">{{ mode === 'new' ? 'From Manage Borders' : 'Custom border label' }}</span><input :value="draft.label" class="ascwo-form-input" @input="update('label', $event.target.value)" /></label>
        <label v-if="mode === 'custom'"><span class="ascwo-form-label">SVG file</span><div class="ascwo-media-input"><button type="button" class="ascwo-primary-button" @click="$emit('upload')">SVG</button><input :value="draft.url" readonly class="ascwo-form-input ascwo-media-field" /></div></label>
        <label><span class="ascwo-form-label">Additional price</span><input :value="draft.additionalPrice" type="number" class="ascwo-form-input" @input="update('additionalPrice', Number($event.target.value))" /></label>
      </div>
      <div class="ascwo-form-actions"><button type="button" class="ascwo-secondary-button" @click="$emit('cancel')">Cancel</button><button type="button" class="ascwo-primary-button" :disabled="mode === 'existing' && selected.length === 0" @click="$emit('save')">{{ mode === 'custom' ? 'Save custom border' : 'Add borders' }}</button></div>
    </div>
  `,
});

watch(() => route.params.optionId, syncDesignFormFromRoute);
watch(() => route.params.componentId, fetchComponent);

onMounted(fetchComponent);
</script>

<style scoped>
.ascwo-design-flow {
  padding-top: 12px;
}

.ascwo-page-header,
.ascwo-page-card {
  padding: 16px 20px;
}

.ascwo-page-header h2 {
  margin: 0 0 4px;
  color: #303030;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
}

.ascwo-page-header p,
.ascwo-section-header p,
.ascwo-help-text,
.ascwo-design-cell p,
.ascwo-info-box > span:not(.ascwo-info-icon),
.ascwo-detail-actions p,
.ascwo-editor-heading p,
.ascwo-module-placeholder span {
  margin: 0;
  color: #616161;
  font-size: 12px;
  line-height: 16px;
}

.ascwo-back-button {
  margin-top: 14px;
}

.ascwo-collection-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 1fr);
  gap: 28px;
  align-items: start;
  margin-top: 16px;
}

.ascwo-field-stack {
  display: grid;
  gap: 14px;
}

.ascwo-page-card h3,
.ascwo-section-header h3,
.ascwo-editor-heading h3 {
  margin: 0 0 4px;
  color: #303030;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
}

.ascwo-section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
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
  justify-content: space-between;
  gap: 12px;
}

.ascwo-label-with-count span:last-child {
  color: #616161;
  font-weight: 600;
}

.ascwo-form-label em {
  font-style: normal;
  font-weight: 500;
}

.ascwo-form-input,
.ascwo-form-textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #8a8f98;
  border-radius: 7px;
  padding: 6px 10px;
  background: #fff;
  color: #303030;
  font-size: 13px;
  line-height: 20px;
}

.ascwo-form-textarea {
  min-height: 74px;
  resize: vertical;
}

.ascwo-large-textarea {
  min-height: 116px;
}

.ascwo-media-input {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
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

.ascwo-clickable-row:hover,
.ascwo-clickable-row.is-highlighted {
  background: #f8fafc;
}

.ascwo-empty-cell {
  padding: 36px 12px;
  text-align: center;
  color: #616161;
}

.ascwo-design-cell {
  display: grid;
  gap: 4px;
}

.ascwo-design-cell strong {
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
}

.ascwo-component-badges,
.ascwo-row-actions,
.ascwo-toggle-cell,
.ascwo-detail-actions,
.ascwo-sticky-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ascwo-module-badge {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  background: #fff;
  color: #111827;
  font-size: 16px;
  font-weight: 600;
}

.ascwo-preview-box {
  width: 88px;
  height: 56px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  background: #f8f9fb;
  overflow: hidden;
}

.ascwo-preview-box img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.ascwo-drag-button {
  width: 34px;
  height: 34px;
  display: grid;
  grid-template-columns: repeat(2, 4px);
  grid-auto-rows: 4px;
  place-content: center;
  gap: 4px 5px;
  border: 1px solid #d0d5dd;
  border-radius: 999px;
  background: #f8f9fb;
  cursor: grab;
}

.ascwo-drag-button span {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #6b7280;
}

.ascwo-icon-button,
.ascwo-secondary-button,
.ascwo-primary-button,
.ascwo-danger-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 30px;
  padding: 6px 11px;
  border-radius: 7px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
}

.ascwo-small-button {
  min-height: 28px;
  padding: 5px 10px;
}

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

.ascwo-primary-button:disabled,
.ascwo-secondary-button:disabled,
.ascwo-drag-button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.ascwo-button-loader {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: #fff;
  border-radius: 999px;
  animation: ascwo-spin 0.75s linear infinite;
}

@keyframes ascwo-spin {
  to {
    transform: rotate(360deg);
  }
}

.ascwo-toggle {
  position: relative;
  width: 34px;
  height: 20px;
  border: 0;
  border-radius: 999px;
  background: #d9dee8;
  cursor: pointer;
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
  margin-top: 20px;
  border: 1px solid #93c5fd;
  border-radius: 8px;
  background: #eff6ff;
  padding: 12px 14px;
}

.ascwo-info-box strong {
  color: #1e3a5f;
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
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
  font-weight: 700;
  font-style: normal;
}

.ascwo-sticky-actions {
  justify-content: flex-end;
  padding: 0 4px;
}

.ascwo-design-detail-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.ascwo-breadcrumb-line {
  margin-top: 14px !important;
  color: #303030 !important;
}

.ascwo-breadcrumb-line strong {
  font-weight: 600;
}

.ascwo-detail-actions {
  align-items: flex-start;
}

.ascwo-detail-actions > div {
  display: grid;
  gap: 6px;
  justify-items: center;
}

.ascwo-design-editor-shell {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  min-height: 480px;
  border: 1px solid #d0d5dd;
  border-radius: 12px;
  background: #fff;
  overflow: hidden;
}

.ascwo-design-tabs {
  border-right: 1px solid #d0d5dd;
  padding: 6px;
  background: #fff;
}

.ascwo-design-tab {
  width: 100%;
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr);
  gap: 8px;
  align-items: center;
  border: 0;
  border-left: 2px solid transparent;
  background: transparent;
  padding: 10px 8px 10px 12px;
  text-align: left;
  cursor: pointer;
}

.ascwo-design-tab.is-active {
  border-left-color: #007a72;
  background: #f8fafc;
}

.ascwo-tab-icon {
  color: #667085;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
}

.ascwo-design-tab.is-active .ascwo-tab-icon {
  color: #111827;
}

.ascwo-design-tab strong {
  display: block;
  color: #667085;
  font-size: 13px;
  line-height: 17px;
  font-weight: 500;
}

.ascwo-design-tab.is-active strong {
  color: #111827;
  font-weight: 600;
}

.ascwo-design-tab small {
  display: block;
  color: #4b5563;
  font-size: 12px;
  line-height: 16px;
}

.ascwo-design-editor-body {
  padding: 18px;
}

.ascwo-editor-heading {
  margin-bottom: 14px;
}

.ascwo-overview-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 1fr);
  gap: 18px;
}

.ascwo-upload-panel {
  display: grid;
  gap: 4px;
}

.ascwo-upload-box {
  border: 1px dashed #d0d5dd;
  border-radius: 8px;
  padding: 44px 36px;
}

.ascwo-preview-panel h4 {
  margin: 0 0 12px;
  color: #111827;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
}

.ascwo-preview-stage {
  height: 220px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: #f5f6f7;
  overflow: hidden;
}

.ascwo-preview-stage img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.ascwo-sign-preview {
  width: 210px;
  height: 112px;
  position: relative;
  border: 5px solid #007a72;
  border-radius: 16px;
  background: #fff;
}

.ascwo-sign-preview span {
  position: absolute;
  top: 50%;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #007a72;
  transform: translateY(-50%);
}

.ascwo-sign-preview span:first-child {
  left: 24px;
}

.ascwo-sign-preview span:last-child {
  right: 24px;
}

.ascwo-mini-configurator-card {
  display: grid;
  gap: 16px;
}

.ascwo-mini-configurator-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
}

.ascwo-mini-configurator-header h3 {
  margin: 0 0 4px;
  color: #303030;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
}

.ascwo-mini-configurator-header p {
  margin: 0;
  color: #616161;
  font-size: 12px;
  line-height: 17px;
}

.ascwo-mini-preview-frame {
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  background: #fff;
  padding: 16px;
}

.ascwo-mini-preview-stage {
  position: relative;
  height: 640px;
  overflow: hidden;
  border: 1px solid #d0d5dd;
  border-radius: 18px;
  background: radial-gradient(circle at 24% 18%, #ffffff 0%, #f3f6f8 42%, #dce4e8 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.ascwo-mini-preview-glow {
  position: absolute;
  left: 14%;
  top: 14%;
  width: 72%;
  height: 64%;
  border-radius: 999px;
  opacity: 0.2;
  filter: blur(78px);
}

.ascwo-mini-preview-plate {
  position: absolute;
  left: 14%;
  top: 14%;
  width: 72%;
  height: 64%;
  display: grid;
  place-items: center;
  border: 6px solid #d4a000;
  box-shadow: 0 28px 60px rgba(15, 23, 42, 0.18), inset 0 0 0 1px rgba(255, 255, 255, 0.24);
}

.ascwo-mini-preview-fixing {
  position: absolute;
  top: 44%;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: radial-gradient(circle, #fff, #d0a54b 55%, #6b4c10);
  box-shadow: 0 6px 12px rgba(15, 23, 42, 0.18);
}

.ascwo-mini-preview-fixing.is-left {
  left: 10%;
}

.ascwo-mini-preview-fixing.is-right {
  right: 10%;
}

.ascwo-mini-preview-image-zone {
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.ascwo-mini-preview-text-zone {
  position: absolute;
  z-index: 3;
  width: 70%;
  line-height: 1.05;
  letter-spacing: 0;
  transform: translate(-50%, -50%);
}

.ascwo-mini-preview-content {
  width: 78%;
  display: grid;
  gap: 18px;
  text-align: center;
  place-items: center;
}

.ascwo-mini-preview-logo {
  width: 88px;
  height: 88px;
  display: grid;
  place-items: center;
  overflow: hidden;
  border: 2px solid currentColor;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  font-size: 22px;
  font-weight: 700;
}

.ascwo-mini-preview-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ascwo-mini-preview-copy {
  display: grid;
  gap: 8px;
}

.ascwo-mini-preview-copy strong {
  display: block;
  color: inherit;
  font-size: 42px;
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: 0;
}

.ascwo-mini-preview-copy span {
  display: block;
  color: inherit;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  opacity: 0.78;
  font-weight: 700;
}

.ascwo-price-input {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 108px;
  gap: 10px;
}

.ascwo-price-input span {
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: #f3f4f6;
  color: #9ca3af;
  font-weight: 700;
}

.ascwo-save-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
}

.ascwo-module-placeholder {
  display: grid;
  gap: 8px;
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  background: #f8fafc;
  padding: 24px;
}

.ascwo-module-card {
  display: grid;
  gap: 16px;
}

.ascwo-background-section-heading {
  display: grid;
  justify-items: start;
  gap: 6px;
}

.ascwo-background-section-heading h4,
.ascwo-background-editor-card h4,
.ascwo-background-pattern-row h5 {
  margin: 0;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
}

.ascwo-background-section-heading p,
.ascwo-background-pattern-row p {
  margin: 0;
  color: #616161;
  font-size: 12px;
  line-height: 17px;
}

.ascwo-background-section-heading .ascwo-primary-button,
.ascwo-background-editor-card .ascwo-primary-button,
.ascwo-background-editor-card .ascwo-secondary-button {
  white-space: nowrap;
}

.ascwo-background-table-card .ascwo-designs-table {
  table-layout: fixed;
}

.ascwo-background-color-col {
  width: 34%;
}

.ascwo-background-default-col {
  width: 26%;
}

.ascwo-background-remove-col {
  width: 40%;
}

.ascwo-background-table-card .ascwo-designs-table td:first-child {
  white-space: nowrap;
}

.ascwo-background-table-card .ascwo-designs-table th,
.ascwo-background-table-card .ascwo-designs-table td {
  padding-right: 28px;
}

.ascwo-background-editor-card {
  display: grid;
  gap: 14px;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  background: #fff;
  padding: 20px 22px;
}

.ascwo-background-option-list {
  max-height: none;
  padding: 8px 0;
}

.ascwo-background-option-list .ascwo-check-row {
  min-height: 40px;
}

.ascwo-background-pattern-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.ascwo-switch-line {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #616161;
  font-size: 12px;
  line-height: 17px;
  white-space: nowrap;
}

.ascwo-color-input-row {
  display: grid;
  grid-template-columns: 46px minmax(0, 210px);
  gap: 10px;
  align-items: center;
}

.ascwo-color-input-row input[type="color"] {
  width: 46px;
  height: 38px;
  padding: 4px;
  border: 1px solid #d0d5dd;
  border-radius: 7px;
  background: #fff;
}

.ascwo-preview-media-input {
  grid-template-columns: auto minmax(0, 1fr) auto auto;
}

.ascwo-media-remove-button {
  display: inline-grid;
  place-items: center;
  min-width: 28px;
  height: 30px;
  border: 0;
  background: transparent;
  color: #d72c0d;
  font-size: 0;
  cursor: pointer;
}

.ascwo-media-remove-button::before {
  content: "×";
  font-size: 30px;
  line-height: 1;
  font-weight: 400;
}

.ascwo-media-thumb {
  width: 38px;
  height: 38px;
  border: 1px solid #dfe3e8;
  border-radius: 6px;
  object-fit: cover;
  background: #f6f6f7;
}

.ascwo-background-text-color-fields {
  display: grid;
  gap: 16px;
}

.ascwo-background-text-color-fields .ascwo-form-input {
  max-width: none;
}

.ascwo-same-border-color-row {
  color: #303030;
  font-size: 13px;
  line-height: 18px;
}

.ascwo-fixing-editor-card {
  display: grid;
  gap: 14px;
  padding: 16px 18px;
}

.ascwo-fixing-option-list {
  align-content: start;
  max-height: 320px;
  padding: 8px 0;
}

.ascwo-fixing-option-list .ascwo-preview-check-row {
  min-height: 66px;
  padding: 8px 14px;
}

.ascwo-compact-option-list {
  max-height: 156px;
  padding: 8px 0;
}

.ascwo-fixing-table-card .ascwo-designs-table {
  table-layout: fixed;
}

.ascwo-fixing-table-card .ascwo-designs-table th:first-child,
.ascwo-fixing-table-card .ascwo-designs-table td:first-child {
  width: 34px;
}

.ascwo-fixing-table-card .ascwo-designs-table th:nth-child(2),
.ascwo-fixing-table-card .ascwo-designs-table td:nth-child(2) {
  width: 34%;
}

.ascwo-fixing-table-card .ascwo-designs-table th:nth-child(3),
.ascwo-fixing-table-card .ascwo-designs-table td:nth-child(3),
.ascwo-fixing-table-card .ascwo-designs-table th:nth-child(4),
.ascwo-fixing-table-card .ascwo-designs-table td:nth-child(4) {
  width: 120px;
}

.ascwo-fixing-table-card .ascwo-designs-table th:last-child,
.ascwo-fixing-table-card .ascwo-designs-table td:last-child {
  width: 230px;
}

.ascwo-text-table-card .ascwo-designs-table {
  table-layout: fixed;
}

.ascwo-zone-reorder-col {
  width: 7%;
}

.ascwo-text-default-col {
  width: 57%;
}

.ascwo-text-label-col {
  width: 14%;
}

.ascwo-zone-actions-col {
  width: 22%;
}

.ascwo-text-module-header {
  align-items: flex-start;
}

.ascwo-text-module-header .ascwo-primary-button {
  flex: 0 0 auto;
  white-space: nowrap;
}

.ascwo-text-table-card {
  padding: 16px 18px;
}

.ascwo-text-table-card .ascwo-designs-table th,
.ascwo-text-table-card .ascwo-designs-table td {
  padding: 12px 16px;
}

.ascwo-text-table-card .ascwo-designs-table td {
  min-height: 96px;
}

.ascwo-text-table-card .ascwo-designs-table td:nth-child(2) p {
  max-width: none;
  overflow-wrap: break-word;
  word-break: normal;
}

.ascwo-text-table-card .ascwo-row-actions {
  display: grid;
  grid-template-columns: max-content;
  gap: 4px;
  justify-content: start;
}

.ascwo-text-table-card .ascwo-row-actions .ascwo-small-button {
  min-height: 31px;
  padding: 5px 12px;
  margin: 0;
}

.ascwo-text-table-card .ascwo-row-actions .ascwo-danger-button {
  grid-column: 1;
  justify-self: start;
  border: 1px solid #c9cccf;
  border-radius: 7px;
  background: #fff;
}

.ascwo-text-zone-editor {
  padding: 18px 20px;
}

.ascwo-text-zone-editor > h4 {
  margin-bottom: 16px;
}

.ascwo-text-zone-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 18px;
}

.ascwo-text-zone-content,
.ascwo-text-zone-editor .ascwo-permissions-card {
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
}

.ascwo-text-zone-content h5,
.ascwo-text-zone-editor .ascwo-permissions-card h5 {
  margin: 0 0 4px;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
}

.ascwo-text-zone-content h5:not(:first-child) {
  margin-top: 16px;
}

.ascwo-text-zone-content h5 em {
  font-style: normal;
  font-weight: 500;
}

.ascwo-text-zone-content p,
.ascwo-text-zone-editor .ascwo-permissions-card p {
  margin: 0 0 14px;
  color: #616161;
  font-size: 12px;
  line-height: 17px;
}

.ascwo-text-field-label {
  display: block;
  max-width: calc(50% - 6px);
  margin-top: 12px;
}

.ascwo-text-appearance-grid {
  display: grid;
  grid-template-columns: minmax(0, 104px) auto minmax(0, 112px) minmax(0, 96px);
  gap: 12px;
  align-items: end;
}

.ascwo-text-style-checks {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
}

.ascwo-unit-input {
  position: relative;
}

.ascwo-unit-input .ascwo-form-input {
  padding-right: 34px;
}

.ascwo-unit-input span {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #616161;
  font-size: 12px;
  line-height: 16px;
  pointer-events: none;
}

.ascwo-text-color-field {
  display: block;
  max-width: 260px;
  margin-top: 14px;
}

.ascwo-text-validation-grid {
  display: grid;
  grid-template-columns: minmax(0, 220px) minmax(0, 1fr) minmax(0, 1fr);
  gap: 14px;
  align-items: end;
}

.ascwo-required-check {
  min-height: 42px;
  align-items: center;
}

.ascwo-image-table-card {
  padding: 18px 20px;
}

.ascwo-image-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 18px;
}

.ascwo-image-card-header h4,
.ascwo-image-zone-content h5,
.ascwo-image-zone-editor .ascwo-permissions-card h5 {
  margin: 0 0 6px;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
}

.ascwo-image-card-header p,
.ascwo-image-zone-content p,
.ascwo-image-zone-editor .ascwo-permissions-card p {
  margin: 0 0 14px;
  color: #616161;
  font-size: 12px;
  line-height: 17px;
}

.ascwo-image-table-card .ascwo-designs-table {
  table-layout: fixed;
}

.ascwo-image-zone-col {
  width: 43%;
}

.ascwo-image-label-col {
  width: 16%;
}

.ascwo-image-preview-col {
  width: 15%;
}

.ascwo-image-actions-col {
  width: 19%;
}

.ascwo-image-table-card .ascwo-designs-table th,
.ascwo-image-table-card .ascwo-designs-table td {
  padding: 12px 16px;
}

.ascwo-image-table-card .ascwo-designs-table td {
  min-height: 96px;
}

.ascwo-image-table-card .ascwo-designs-table td:nth-child(2) p {
  max-width: none;
  overflow-wrap: break-word;
  word-break: normal;
}

.ascwo-image-actions {
  display: grid;
  grid-template-columns: max-content;
  gap: 4px;
  justify-content: start;
}

.ascwo-image-actions .ascwo-small-button {
  min-height: 31px;
  padding: 5px 12px;
  margin: 0;
}

.ascwo-image-actions .ascwo-danger-button {
  grid-column: 1;
  justify-self: start;
  border: 1px solid #c9cccf;
  border-radius: 7px;
  background: #fff;
}

.ascwo-image-thumb {
  width: 38px;
  height: 38px;
}

.ascwo-image-zone-editor {
  padding: 18px 20px;
}

.ascwo-image-zone-editor > h4 {
  margin-bottom: 16px;
}

.ascwo-image-zone-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 18px;
}

.ascwo-image-zone-content {
  width: 100%;
  max-width: none;
  box-sizing: border-box;
  display: grid;
  gap: 16px;
  padding: 16px 18px;
  border: 1px solid #e4e7ec;
  border-radius: 8px;
  background: #fff;
}

.ascwo-image-zone-content h5:not(:first-child) {
  margin-top: 0;
}

.ascwo-image-upload-field {
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 28px 36px;
  align-items: center;
  gap: 4px;
  height: 42px;
  padding: 3px;
  overflow: hidden;
}

.ascwo-image-upload-field .ascwo-media-button {
  min-width: 0;
  width: 100%;
  padding-left: 12px;
  padding-right: 12px;
}

.ascwo-media-remove {
  width: 28px;
  min-height: 30px;
  border: 0;
  background: transparent;
  color: #d72c0d;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}

.ascwo-upload-preview {
  width: 34px;
  height: 34px;
  display: inline-grid;
  place-items: center;
  border: 1px solid #dfe3e8;
  border-radius: 7px;
  background: #fff;
  overflow: hidden;
}

.ascwo-upload-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.ascwo-image-file-grid {
  margin-top: 0;
  grid-template-columns: repeat(4, max-content);
  column-gap: 74px;
  row-gap: 14px;
}

.ascwo-image-validation-grid {
  display: grid;
  grid-template-columns: minmax(0, 122px) minmax(0, 124px) minmax(0, 124px) minmax(0, 124px);
  gap: 12px;
  align-items: end;
}

.ascwo-image-settings-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 14px;
  align-items: end;
}

.ascwo-custom-color-card {
  align-items: flex-start;
}

.ascwo-custom-color-card > div {
  flex: 1 1 auto;
  min-width: 0;
}

.ascwo-custom-color-label {
  display: block;
  margin-top: 14px;
}

.ascwo-custom-color-label .ascwo-form-input {
  width: 100%;
  max-width: none;
}

.ascwo-module-card-header,
.ascwo-toggle-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  background: #fff;
  padding: 18px 22px;
}

.ascwo-module-card-header h4,
.ascwo-toggle-card h4,
.ascwo-config-card h4,
.ascwo-zone-editor h5 {
  margin: 0 0 6px;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
}

.ascwo-module-card-header p,
.ascwo-toggle-card p,
.ascwo-config-card p,
.ascwo-designs-table td p {
  margin: 0;
  color: #616161;
  font-size: 12px;
  line-height: 17px;
}

.ascwo-config-card,
.ascwo-table-card {
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  background: #fff;
  padding: 16px 18px;
}

.ascwo-table-card .ascwo-designs-table th,
.ascwo-table-card .ascwo-designs-table td {
  padding: 11px 14px;
}

.ascwo-option-list {
  display: grid;
  gap: 0;
  max-height: 300px;
  overflow: auto;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  margin-top: 12px;
  padding: 8px 0;
}

.ascwo-check-row {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 42px;
  padding: 8px 14px;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
}

.ascwo-preview-check-row {
  align-items: center;
  min-height: 66px;
}

.ascwo-preview-check-row strong,
.ascwo-preview-choice strong {
  display: block;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
}

.ascwo-preview-check-row small,
.ascwo-preview-choice small {
  display: block;
  margin-top: 2px;
  color: #616161;
  font-size: 12px;
  line-height: 16px;
}

.ascwo-check-row input,
.ascwo-inline-check input {
  width: 15px;
  height: 15px;
}

.ascwo-muted {
  color: #616161;
  font-size: 12px;
  line-height: 17px;
}

.ascwo-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
}

.ascwo-mini-preview {
  width: 42px;
  height: 42px;
  display: inline-grid;
  place-items: center;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  background: #f8fafc;
  overflow: hidden;
}

.ascwo-mini-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.ascwo-mini-preview svg {
  width: 38px;
  height: 38px;
  display: block;
}

.ascwo-preview-choice {
  display: flex;
  align-items: center;
  gap: 14px;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  background: #f6f6f7;
  padding: 12px 14px;
}

.ascwo-mini-preview > span,
.ascwo-shape-preview {
  width: 24px;
  height: 14px;
  display: block;
  border: 2px solid #007a72;
  border-radius: 3px;
  background: #fff;
}

.ascwo-row-grip {
  color: #667085;
  letter-spacing: 1px;
  font-weight: 700;
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
  cursor: grab;
  vertical-align: middle;
}

.ascwo-reorder-handle span {
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: #667085;
}

.ascwo-reorder-handle:active {
  cursor: grabbing;
}

.ascwo-reorder-handle:focus-visible {
  outline: 2px solid #005bd3;
  outline-offset: 2px;
}

.ascwo-reorder-handle.is-static {
  cursor: default;
}

.ascwo-segmented {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0 12px;
}

.ascwo-segmented button {
  min-height: 30px;
  border: 1px solid #c9cccf;
  border-radius: 7px;
  background: #fff;
  color: #303030;
  padding: 6px 12px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  cursor: pointer;
}

.ascwo-segmented button.is-active {
  border-color: #00635d;
  background: #007a72;
  color: #fff;
}

.ascwo-color-dot {
  width: 18px;
  height: 18px;
  display: inline-block;
  border: 1px solid #d0d5dd;
  border-radius: 999px;
  vertical-align: middle;
  margin-right: 8px;
}

.ascwo-mt-2 {
  margin-top: 10px;
}

.ascwo-zone-editor {
  margin-bottom: 16px;
}

.ascwo-zone-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 18px;
  margin-top: 14px;
}

.ascwo-two-col,
.ascwo-three-col,
.ascwo-four-col,
.ascwo-check-grid {
  display: grid;
  gap: 12px;
}

.ascwo-two-col {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.ascwo-three-col {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.ascwo-four-col {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.ascwo-check-grid {
  grid-template-columns: repeat(4, max-content);
}

.ascwo-inline-check {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #303030;
  font-size: 12px;
  line-height: 16px;
}

.ascwo-permissions-card {
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  padding: 16px;
}

.ascwo-permission-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
  color: #303030;
  font-size: 12px;
  line-height: 16px;
}

.ascwo-design-editor-body :deep(.ascwo-module-card) {
  display: grid;
  gap: 16px;
}

.ascwo-design-editor-body :deep(.ascwo-module-card-header),
.ascwo-design-editor-body :deep(.ascwo-toggle-card) {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  background: #fff;
  padding: 18px 22px;
}

.ascwo-design-editor-body :deep(.ascwo-module-card-header > div),
.ascwo-design-editor-body :deep(.ascwo-toggle-card > div) {
  flex: 1 1 auto;
  min-width: 0;
}

.ascwo-design-editor-body :deep(.ascwo-module-card-header h4),
.ascwo-design-editor-body :deep(.ascwo-toggle-card h4),
.ascwo-design-editor-body :deep(.ascwo-config-card h4),
.ascwo-design-editor-body :deep(.ascwo-zone-editor h5) {
  margin: 0 0 6px;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
}

.ascwo-design-editor-body :deep(.ascwo-module-card-header p),
.ascwo-design-editor-body :deep(.ascwo-toggle-card p),
.ascwo-design-editor-body :deep(.ascwo-config-card p),
.ascwo-design-editor-body :deep(.ascwo-designs-table td p) {
  margin: 0;
  color: #616161;
  font-size: 12px;
  line-height: 17px;
  font-weight: 400;
}

.ascwo-design-editor-body :deep(.ascwo-config-card),
.ascwo-design-editor-body :deep(.ascwo-table-card) {
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  background: #fff;
  padding: 16px 18px;
}

.ascwo-design-editor-body :deep(.ascwo-designs-table) {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.ascwo-design-editor-body :deep(.ascwo-designs-table thead tr) {
  background: #f6f6f7;
}

.ascwo-design-editor-body :deep(.ascwo-designs-table th),
.ascwo-design-editor-body :deep(.ascwo-designs-table td) {
  padding: 11px 14px;
  border-bottom: 1px solid #eceff2;
  color: #303030;
  text-align: left;
  vertical-align: middle;
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
}

.ascwo-design-editor-body :deep(.ascwo-designs-table th) {
  color: #616161;
  font-weight: 700;
}

.ascwo-design-editor-body :deep(.ascwo-designs-table th:first-child),
.ascwo-design-editor-body :deep(.ascwo-designs-table td:first-child) {
  width: 34px;
}

.ascwo-design-editor-body :deep(.ascwo-designs-table th:nth-child(3)),
.ascwo-design-editor-body :deep(.ascwo-designs-table td:nth-child(3)),
.ascwo-design-editor-body :deep(.ascwo-designs-table th:nth-child(4)),
.ascwo-design-editor-body :deep(.ascwo-designs-table td:nth-child(4)) {
  width: 96px;
}

.ascwo-design-editor-body :deep(.ascwo-designs-table th:last-child),
.ascwo-design-editor-body :deep(.ascwo-designs-table td:last-child) {
  width: 250px;
}

.ascwo-size-table-card :deep(.ascwo-designs-table) {
  table-layout: auto;
}

.ascwo-size-table-card :deep(.ascwo-designs-table th:first-child),
.ascwo-size-table-card :deep(.ascwo-designs-table td:first-child) {
  width: auto;
  min-width: 180px;
  white-space: nowrap;
}

.ascwo-size-table-card :deep(.ascwo-designs-table th:nth-child(2)),
.ascwo-size-table-card :deep(.ascwo-designs-table td:nth-child(2)) {
  width: 180px;
  padding-left: 28px;
}

.ascwo-size-table-card :deep(.ascwo-designs-table th:nth-child(3)),
.ascwo-size-table-card :deep(.ascwo-designs-table td:nth-child(3)) {
  width: 180px;
  padding-left: 28px;
  text-align: right;
}

.ascwo-size-table-card :deep(.ascwo-designs-table td:first-child) {
  font-weight: 400;
}

.ascwo-lighting-table-card :deep(.ascwo-designs-table) {
  table-layout: auto;
}

.ascwo-lighting-table-card :deep(.ascwo-designs-table th:first-child),
.ascwo-lighting-table-card :deep(.ascwo-designs-table td:first-child) {
  width: 20%;
}

.ascwo-lighting-table-card :deep(.ascwo-designs-table th:nth-child(2)),
.ascwo-lighting-table-card :deep(.ascwo-designs-table td:nth-child(2)),
.ascwo-lighting-table-card :deep(.ascwo-designs-table th:nth-child(3)),
.ascwo-lighting-table-card :deep(.ascwo-designs-table td:nth-child(3)) {
  width: 15%;
}

.ascwo-lighting-table-card :deep(.ascwo-designs-table th:nth-child(4)),
.ascwo-lighting-table-card :deep(.ascwo-designs-table td:nth-child(4)) {
  width: 22%;
}

.ascwo-lighting-table-card :deep(.ascwo-designs-table th:last-child),
.ascwo-lighting-table-card :deep(.ascwo-designs-table td:last-child) {
  width: 18%;
}

.ascwo-lighting-table-card :deep(.ascwo-designs-table td:first-child) {
  font-weight: 400;
}

.ascwo-color-value {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

.ascwo-lighting-option-list .ascwo-check-row {
  min-height: 34px;
}

.ascwo-lighting-color-field {
  display: block;
  width: min(318px, 100%);
  margin-top: 16px;
}

.ascwo-lighting-color-row {
  display: grid;
  grid-template-columns: 58px minmax(0, 1fr);
  gap: 10px;
  border: 0;
  height: auto;
  overflow: visible;
}

.ascwo-lighting-color-row .ascwo-native-color {
  width: 58px;
  height: 40px;
  margin: 0;
  border-radius: 8px;
}

.ascwo-lighting-color-row .ascwo-form-input {
  height: 40px;
  border: 1px solid #8c9196;
  border-radius: 8px;
}

.ascwo-design-editor-body :deep(.ascwo-designs-table strong) {
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
}

.ascwo-design-editor-body :deep(.ascwo-row-actions) {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.ascwo-design-editor-body :deep(.ascwo-secondary-button),
.ascwo-design-editor-body :deep(.ascwo-primary-button),
.ascwo-design-editor-body :deep(.ascwo-danger-button) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 30px;
  padding: 6px 11px;
  border-radius: 7px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
}

.ascwo-design-editor-body :deep(.ascwo-secondary-button) {
  border: 1px solid #c9cccf;
  background: #fff;
  color: #303030;
}

.ascwo-design-editor-body :deep(.ascwo-primary-button) {
  border: 0;
  background: #007a72;
  color: #fff;
}

.ascwo-design-editor-body :deep(.ascwo-danger-button) {
  border: 1px solid transparent;
  background: transparent;
  color: #a52817;
}

.ascwo-design-editor-body :deep(.ascwo-primary-button:disabled),
.ascwo-design-editor-body :deep(.ascwo-secondary-button:disabled) {
  background: #d9d9d9;
  color: #fff;
  cursor: not-allowed;
}

.ascwo-design-editor-body :deep(.ascwo-toggle) {
  position: relative;
  flex: 0 0 auto;
  width: 34px;
  height: 20px;
  border: 0;
  border-radius: 999px;
  background: #d9dee8;
  cursor: pointer;
}

.ascwo-design-editor-body :deep(.ascwo-toggle span) {
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

.ascwo-design-editor-body :deep(.ascwo-toggle.is-active) {
  background: #007a72;
}

.ascwo-design-editor-body :deep(.ascwo-toggle.is-active span) {
  transform: translateX(14px);
}

.ascwo-design-editor-body :deep(.ascwo-option-list) {
  display: grid;
  gap: 0;
  max-height: 320px;
  overflow: auto;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  margin-top: 12px;
  padding: 8px 0;
}

.ascwo-design-editor-body :deep(.ascwo-check-row) {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 42px;
  padding: 8px 14px;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
}

.ascwo-design-editor-body :deep(.ascwo-preview-check-row) {
  align-items: center;
  min-height: 66px;
}

.ascwo-design-editor-body :deep(.ascwo-preview-check-row strong),
.ascwo-design-editor-body :deep(.ascwo-preview-choice strong) {
  display: block;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
}

.ascwo-design-editor-body :deep(.ascwo-preview-check-row small),
.ascwo-design-editor-body :deep(.ascwo-preview-choice small) {
  display: block;
  margin-top: 2px;
  color: #616161;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
}

.ascwo-design-editor-body :deep(.ascwo-check-row input),
.ascwo-design-editor-body :deep(.ascwo-inline-check input) {
  width: 15px;
  height: 15px;
  margin: 0;
}

.ascwo-design-editor-body :deep(.ascwo-muted) {
  color: #616161;
  font-size: 12px;
  line-height: 17px;
}

.ascwo-design-editor-body :deep(.ascwo-form-actions) {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
}

.ascwo-design-editor-body :deep(.ascwo-mini-preview) {
  width: 42px;
  height: 42px;
  display: inline-grid;
  place-items: center;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  background: #f8fafc;
  overflow: hidden;
}

.ascwo-design-editor-body :deep(.ascwo-mini-preview img) {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.ascwo-design-editor-body :deep(.ascwo-mini-preview svg) {
  width: 38px;
  height: 38px;
  display: block;
}

.ascwo-design-editor-body :deep(.ascwo-preview-choice) {
  display: flex;
  align-items: center;
  gap: 14px;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  background: #f6f6f7;
  padding: 12px 14px;
}

.ascwo-design-editor-body :deep(.ascwo-mini-preview > span),
.ascwo-design-editor-body :deep(.ascwo-shape-preview) {
  width: 24px;
  height: 14px;
  display: block;
  border: 2px solid #007a72;
  border-radius: 3px;
  background: #fff;
}

.ascwo-design-editor-body :deep(.ascwo-row-grip) {
  display: inline-block;
  color: #667085;
  font-size: 12px;
  letter-spacing: 1px;
  transform: rotate(90deg);
}

.ascwo-design-editor-body :deep(.ascwo-reorder-handle) {
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
  cursor: grab;
  vertical-align: middle;
}

.ascwo-design-editor-body :deep(.ascwo-reorder-handle span) {
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: #667085;
}

.ascwo-design-editor-body :deep(.ascwo-reorder-handle:active) {
  cursor: grabbing;
}

.ascwo-design-editor-body :deep(.ascwo-reorder-handle:focus-visible) {
  outline: 2px solid #005bd3;
  outline-offset: 2px;
}

.ascwo-design-editor-body :deep(.ascwo-reorder-handle.is-static) {
  cursor: default;
}

.ascwo-design-editor-body :deep(.ascwo-segmented) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0 12px;
}

.ascwo-design-editor-body :deep(.ascwo-segmented button) {
  min-height: 30px;
  border: 1px solid #c9cccf;
  border-radius: 7px;
  background: #fff;
  color: #303030;
  padding: 6px 12px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  cursor: pointer;
}

.ascwo-design-editor-body :deep(.ascwo-segmented button.is-active) {
  border-color: #00635d;
  background: #007a72;
  color: #fff;
}

.ascwo-design-editor-body :deep(.ascwo-color-dot) {
  width: 18px;
  height: 18px;
  display: inline-block;
  flex: 0 0 auto;
  border: 1px solid #d0d5dd;
  border-radius: 999px;
  vertical-align: middle;
}

.ascwo-design-editor-body :deep(.ascwo-toggle-card .ascwo-form-input) {
  width: 100%;
  max-width: none;
}

.ascwo-design-editor-body :deep(.ascwo-mt-2) {
  margin-top: 10px;
}

.ascwo-design-editor-body :deep(.ascwo-zone-editor) {
  margin-bottom: 16px;
}

.ascwo-design-editor-body :deep(.ascwo-zone-grid) {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 18px;
  margin-top: 14px;
}

.ascwo-design-editor-body :deep(.ascwo-two-col),
.ascwo-design-editor-body :deep(.ascwo-three-col),
.ascwo-design-editor-body :deep(.ascwo-four-col),
.ascwo-design-editor-body :deep(.ascwo-check-grid) {
  display: grid;
  gap: 12px;
}

.ascwo-design-editor-body :deep(.ascwo-two-col) {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.ascwo-design-editor-body :deep(.ascwo-three-col) {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.ascwo-design-editor-body :deep(.ascwo-four-col) {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.ascwo-design-editor-body :deep(.ascwo-check-grid) {
  grid-template-columns: repeat(4, max-content);
}

.ascwo-design-editor-body :deep(.ascwo-inline-check) {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #303030;
  font-size: 12px;
  line-height: 16px;
}

.ascwo-design-editor-body :deep(.ascwo-permissions-card) {
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  padding: 16px;
}

.ascwo-design-editor-body :deep(.ascwo-permission-row) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
  color: #303030;
  font-size: 12px;
  line-height: 16px;
}

.ascwo-design-editor-body :deep(.ascwo-text-table-card .ascwo-designs-table) {
  table-layout: fixed;
}

.ascwo-design-editor-body :deep(.ascwo-text-table-card .ascwo-designs-table th),
.ascwo-design-editor-body :deep(.ascwo-text-table-card .ascwo-designs-table td),
.ascwo-design-editor-body :deep(.ascwo-image-table-card .ascwo-designs-table th),
.ascwo-design-editor-body :deep(.ascwo-image-table-card .ascwo-designs-table td) {
  width: auto !important;
}

.ascwo-design-editor-body :deep(.ascwo-text-module-header) {
  align-items: flex-start;
}

.ascwo-design-editor-body :deep(.ascwo-text-module-header .ascwo-primary-button) {
  flex: 0 0 auto;
  white-space: nowrap;
}

.ascwo-design-editor-body :deep(.ascwo-text-table-card) {
  padding: 16px 18px;
}

.ascwo-design-editor-body :deep(.ascwo-text-table-card .ascwo-designs-table th),
.ascwo-design-editor-body :deep(.ascwo-text-table-card .ascwo-designs-table td) {
  padding: 12px 16px;
}

.ascwo-design-editor-body :deep(.ascwo-text-table-card .ascwo-designs-table td) {
  min-height: 96px;
}

.ascwo-design-editor-body :deep(.ascwo-text-table-card .ascwo-designs-table td:nth-child(2) p) {
  max-width: none;
  overflow-wrap: break-word;
  word-break: normal;
}

.ascwo-design-editor-body :deep(.ascwo-text-table-card .ascwo-row-actions) {
  display: grid;
  grid-template-columns: max-content;
  gap: 4px;
  justify-content: start;
}

.ascwo-design-editor-body :deep(.ascwo-text-table-card .ascwo-row-actions .ascwo-small-button) {
  min-height: 31px;
  padding: 5px 12px;
  margin: 0;
}

.ascwo-design-editor-body :deep(.ascwo-text-table-card .ascwo-row-actions .ascwo-danger-button) {
  grid-column: 1;
  justify-self: start;
  border: 1px solid #c9cccf;
  border-radius: 7px;
  background: #fff;
}

.ascwo-design-editor-body :deep(.ascwo-image-table-card .ascwo-designs-table td) {
  min-height: 96px;
}

.ascwo-design-editor-body :deep(.ascwo-image-table-card .ascwo-designs-table td:nth-child(2) p) {
  max-width: none;
  overflow-wrap: break-word;
  word-break: normal;
}

.ascwo-design-editor-body :deep(.ascwo-image-actions) {
  display: grid;
  grid-template-columns: max-content;
  gap: 4px;
  justify-content: start;
}

.ascwo-design-editor-body :deep(.ascwo-image-actions .ascwo-small-button) {
  min-height: 31px;
  padding: 5px 12px;
  margin: 0;
}

.ascwo-design-editor-body :deep(.ascwo-image-actions .ascwo-danger-button) {
  grid-column: 1;
  justify-self: start;
  border: 1px solid #c9cccf;
  border-radius: 7px;
  background: #fff;
}

.ascwo-design-editor-body :deep(.ascwo-text-zone-editor) {
  padding: 18px 20px;
}

.ascwo-design-editor-body :deep(.ascwo-text-zone-editor > h4) {
  margin-bottom: 16px;
}

.ascwo-design-editor-body :deep(.ascwo-text-zone-grid) {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 18px;
}

.ascwo-design-editor-body :deep(.ascwo-text-zone-content),
.ascwo-design-editor-body :deep(.ascwo-text-zone-editor .ascwo-permissions-card) {
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
}

.ascwo-design-editor-body :deep(.ascwo-text-zone-content h5),
.ascwo-design-editor-body :deep(.ascwo-text-zone-editor .ascwo-permissions-card h5) {
  margin: 0 0 4px;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
}

.ascwo-design-editor-body :deep(.ascwo-text-zone-content h5:not(:first-child)) {
  margin-top: 16px;
}

.ascwo-design-editor-body :deep(.ascwo-text-zone-content h5 em) {
  font-style: normal;
  font-weight: 500;
}

.ascwo-design-editor-body :deep(.ascwo-text-zone-content p),
.ascwo-design-editor-body :deep(.ascwo-text-zone-editor .ascwo-permissions-card p) {
  margin: 0 0 14px;
  color: #616161;
  font-size: 12px;
  line-height: 17px;
  font-weight: 400;
}

.ascwo-design-editor-body :deep(.ascwo-text-field-label) {
  display: block;
  max-width: calc(50% - 6px);
  margin-top: 12px;
}

.ascwo-design-editor-body :deep(.ascwo-text-appearance-grid) {
  display: grid;
  grid-template-columns: minmax(0, 104px) auto minmax(0, 112px) minmax(0, 96px);
  gap: 12px;
  align-items: end;
}

.ascwo-design-editor-body :deep(.ascwo-text-style-checks) {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
}

.ascwo-design-editor-body :deep(.ascwo-unit-input) {
  position: relative;
}

.ascwo-design-editor-body :deep(.ascwo-unit-input .ascwo-form-input) {
  padding-right: 34px;
}

.ascwo-design-editor-body :deep(.ascwo-unit-input span) {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #616161;
  font-size: 12px;
  line-height: 16px;
  pointer-events: none;
}

.ascwo-design-editor-body :deep(.ascwo-text-color-field) {
  display: block;
  max-width: 260px;
  margin-top: 14px;
}

.ascwo-design-editor-body :deep(.ascwo-text-validation-grid) {
  display: grid;
  grid-template-columns: minmax(0, 220px) minmax(0, 1fr) minmax(0, 1fr);
  gap: 14px;
  align-items: end;
}

.ascwo-design-editor-body :deep(.ascwo-image-zone-content) {
  width: 100%;
  max-width: none;
  box-sizing: border-box;
  display: grid;
  gap: 16px;
  padding: 16px 18px;
  border: 1px solid #e4e7ec;
  border-radius: 8px;
  background: #fff;
}

.ascwo-design-editor-body :deep(.ascwo-image-file-grid) {
  margin-top: 0;
  grid-template-columns: repeat(4, max-content);
  column-gap: 74px;
  row-gap: 14px;
}

.ascwo-design-editor-body :deep(.ascwo-image-settings-grid) {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 14px;
  align-items: end;
}

@media (max-width: 1100px) {
  .ascwo-collection-grid,
  .ascwo-overview-grid,
  .ascwo-design-editor-shell,
  .ascwo-zone-grid,
  .ascwo-two-col,
  .ascwo-text-validation-grid,
  .ascwo-image-settings-grid,
  .ascwo-three-col,
  .ascwo-four-col {
    grid-template-columns: 1fr;
  }

  .ascwo-design-detail-header,
  .ascwo-section-header {
    flex-direction: column;
  }

  .ascwo-image-zone-content {
    max-width: none;
  }

  .ascwo-design-tabs {
    border-right: 0;
    border-bottom: 1px solid #d0d5dd;
  }
}
</style>
