<template>
  <div class="asowp-config-workspace asowp-flex asowp-min-h-screen asowp-bg-[#f3f3f3] asowp-p-3 asowp-gap-4">
    <!-- Left Sidebar (Internal Navigation) -->
    <aside class="asowp-config-sidebar asowp-w-[300px] asowp-flex asowp-flex-col asowp-gap-2.5 asowp-sticky asowp-top-3 asowp-h-[calc(100vh-24px)] asowp-flex-shrink-0">
      <!-- Back to List -->
      <div class="asowp-config-card asowp-bg-white asowp-rounded-2xl asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-p-5">
        <div class="asowp-flex asowp-items-center asowp-justify-between asowp-mb-2">
          <button
            @click="router.push('/configurations')"
            class="asowp-w-10 asowp-h-10 asowp-flex asowp-items-center asowp-justify-center asowp-bg-white asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-rounded-lg asowp-text-[#8c9196] hover:asowp-text-[#111827] asowp-cursor-pointer"
            :aria-label="__('Configurations', 'all-signs-options-pro')"
          >
            <ArrowLeftIcon class="asowp-w-5 asowp-h-5" />
          </button>
          <button
            @click="goToPreview(activeMaterial)"
            class="asowp-w-10 asowp-h-10 asowp-flex asowp-items-center asowp-justify-center asowp-bg-white asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-rounded-lg asowp-text-[#8c9196] hover:asowp-text-[#111827] asowp-cursor-pointer"
            :aria-label="__('Preview', 'all-signs-options-pro')"
          >
            <EyeIcon class="asowp-w-5 asowp-h-5" />
          </button>
        </div>
        <h2 class="asowp-config-title asowp-mt-0 asowp-mb-1 asowp-text-[24px] asowp-leading-7 asowp-font-[900] asowp-text-[#303030] asowp-truncate" :title="config">
          {{ config }}
        </h2>
        <div class="asowp-config-meta asowp-mb-2">
          <div class="asowp-config-meta-row asowp-flex asowp-items-center asowp-gap-1 asowp-min-w-0">
            <span class="asowp-config-meta-pill asowp-px-3 asowp-py-0.5 asowp-rounded-full asowp-bg-[#f1f2f3] asowp-text-[14px] asowp-leading-5 asowp-text-[#6b7280]">ID: {{ configID }}</span>
            <span class="asowp-config-meta-pill asowp-px-3 asowp-py-0.5 asowp-rounded-full asowp-bg-[#f1f2f3] asowp-text-[14px] asowp-leading-5 asowp-text-[#6b7280]">{{ enforcedMaterialType === 'advance' ? __('Preset Components', 'all-signs-options-pro') : __('Direct Options', 'all-signs-options-pro') }}</span>
          </div>
          <span v-if="configurationFamilySlug" class="asowp-config-family-pill asowp-inline-flex asowp-mt-1 asowp-px-3 asowp-py-0.5 asowp-rounded-lg asowp-bg-[#d9ebff] asowp-text-[14px] asowp-leading-5 asowp-text-[#0b4f8a] asowp-truncate">{{ configurationFamilySlug }}</span>
        </div>
        <p class="asowp-config-label asowp-text-[16px] asowp-leading-6 asowp-font-[900] asowp-text-[#303030] asowp-mb-2">{{ __('Configurator Menu', 'all-signs-options-pro') }}</p>
        <div class="asowp-relative">
          <input v-model="searchMenu" type="text" class="asowp-box-border asowp-w-full asowp-h-12 asowp-px-4 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-text-[16px] asowp-outline-none focus:asowp-border-[#008060]" :placeholder="__('Search configurator items...', 'all-signs-options-pro')" />
        </div>
      </div>

      <!-- Navigation Menu -->
      <div class="asowp-config-nav-scroll">
        <div class="asowp-config-nav-card asowp-bg-white asowp-rounded-2xl asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-p-5">
          <div v-for="section in filteredAccordionSections" :key="section.key" class="asowp-config-group">
            <button
              type="button"
              @click="toggleSection(section.key)"
              :class="['asowp-config-accordion asowp-w-full asowp-h-12 asowp-flex asowp-items-center asowp-justify-between asowp-px-4 asowp-rounded-xl asowp-border asowp-border-solid asowp-text-[16px] asowp-font-[900] asowp-text-[#5c5f62] asowp-cursor-pointer', isSectionOpen(section.key) || sectionByRoute === section.key ? 'is-active-group' : '']"
            >
              <span>{{ section.label }}</span>
              <ChevronDownIcon v-if="isSectionOpen(section.key)" class="asowp-w-5 asowp-h-5 asowp-text-[#8c9196]" />
              <ChevronRightIcon v-else class="asowp-w-5 asowp-h-5 asowp-text-[#8c9196]" />
            </button>
            <nav v-if="isSectionOpen(section.key)" class="asowp-config-section-items asowp-ml-4 asowp-pl-4 asowp-py-3 asowp-space-y-2 asowp-border-l asowp-border-solid asowp-border-[#e1e3e5]">
              <button
                v-for="item in section.items"
                :key="item.label"
                type="button"
                @click="navigateSidebarItem(item)"
                :class="sidebarItemClass(item)"
              >
                <component :is="item.icon" class="asowp-w-5 asowp-h-5 asowp-text-[#8c9196] asowp-flex-shrink-0" />
                <span class="asowp-truncate">{{ item.label }}</span>
              </button>
            </nav>
          </div>

          <nav v-if="standaloneMenu.length" class="asowp-space-y-2 asowp-my-6">
            <button
              v-for="item in standaloneMenu"
              :key="item.label"
              type="button"
              @click="navigateSidebarItem(item)"
              :class="sidebarItemClass(item)"
            >
              <component :is="item.icon" class="asowp-w-5 asowp-h-5 asowp-text-[#8c9196] asowp-flex-shrink-0" />
              <span class="asowp-truncate">{{ item.label }}</span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Settings & Preview Footer -->
      <div class="asowp-hidden">
        <button
          @click="navigateTo('config-settings-generals')"
          class="asowp-w-full asowp-flex asowp-items-center asowp-gap-3 asowp-px-3 asowp-py-2 asowp-text-[13px] asowp-font-medium asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-rounded-lg asowp-cursor-pointer hover:asowp-bg-[#f9fafb]"
        >
          <SettingsIcon class="asowp-w-4 asowp-h-4" />
          {{ __('Settings', 'all-signs-options-pro') }}
        </button>
        <button
          @click="goToPreview(activeMaterial)"
          class="asowp-w-full asowp-flex asowp-items-center asowp-gap-3 asowp-px-3 asowp-py-2 asowp-text-[13px] asowp-font-bold asowp-bg-[#006e52] asowp-text-white asowp-border-none asowp-rounded-lg asowp-cursor-pointer hover:asowp-bg-[#005c45]"
        >
          <EyeIcon class="asowp-w-4 asowp-h-4" />
          {{ __('Preview', 'all-signs-options-pro') }}
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="asowp-flex-1 asowp-flex asowp-flex-col asowp-min-w-0">
      <!-- Top Materials Bar -->
      <header class="asowp-hidden">
        <div class="asowp-flex asowp-items-center asowp-gap-4 asowp-overflow-x-auto asowp-flex-1">
          <div
            v-for="(m, idx) in materials"
            :key="idx"
            @click="redirectToMaterial(idx, m.name, m.type)"
            :class="[
              'asowp-px-4 asowp-py-1.5 asowp-rounded-full asowp-text-[13px] asowp-font-bold asowp-whitespace-nowrap asowp-cursor-pointer asowp-transition-all',
              idx === activeMaterialIndex ? 'asowp-bg-[#e1f0ef] asowp-text-[#006e52]' : 'asowp-text-[#616161] hover:asowp-bg-gray-100'
            ]"
          >
            {{ m.name }}
          </div>
          <button @click="addComponent" class="asowp-flex-shrink-0 asowp-w-8 asowp-h-8 asowp-rounded-full asowp-bg-gray-100 asowp-border-none asowp-flex asowp-items-center asowp-justify-center asowp-cursor-pointer hover:asowp-bg-gray-200">
            <PlusIcon class="asowp-w-4 asowp-h-4 asowp-text-[#1a1a1a]" />
          </button>
        </div>

        <div class="asowp-flex asowp-items-center asowp-gap-2">
          <span class="asowp-text-[12px] asowp-text-[#616161]">{{ __('Material type:', 'all-signs-options-pro') }}</span>
          <span class="asowp-px-2 asowp-py-0.5 asowp-rounded-md asowp-bg-[#f1f1f1] asowp-text-[11px] asowp-font-bold asowp-text-[#1a1a1a] asowp-uppercase">
            {{ enforcedMaterialType }}
          </span>
        </div>
      </header>

      <!-- Content View -->
      <div :class="isSettingsStickyRoute ? 'asowp-flex-1 asowp-overflow-visible' : 'asowp-flex-1 asowp-overflow-y-auto'">
        <!-- Route Content -->
        <div v-if="contentComponent" class="asowp-w-full">
          <div v-if="false && activeName && !isAdvanceRoute" class="asowp-mb-6">
            <h1 class="asowp-text-[24px] asowp-font-bold asowp-text-[#1a1a1a] asowp-mb-1">{{ activeName }}</h1>
            <p v-if="activeDescription" class="asowp-text-[14px] asowp-text-[#616161]">{{ activeDescription }}</p>
          </div>

          <AdvanceMaterial v-if="isAdvanceRoute" :key="'adv-'+activeId" />
          <template v-else>
            <section v-if="route.name==='materials'" class="asowp-materials-page">
              <div class="asowp-materials-hero">
                <div>
                  <h1>{{ __('Materials', 'all-signs-options-pro') }}</h1>
                  <p>{{ __('Manage the materials available in this config, assign the pricing used by each one and exclude components when needed.', 'all-signs-options-pro') }}</p>
                </div>
                <button type="button" class="asowp-shopify-button-primary asowp-materials-add-button" @click="addComponent">
                  <PlusIcon class="asowp-w-4 asowp-h-4" />
                  {{ __('Add material', 'all-signs-options-pro') }}
                </button>
              </div>

              <div class="asowp-materials-card">
                <h2>{{ __('Materials List', 'all-signs-options-pro') }}</h2>
                <div class="asowp-materials-table-wrap">
                  <table class="asowp-materials-table">
                    <thead>
                      <tr>
                        <th>{{ __('Move', 'all-signs-options-pro') }}</th>
                        <th>{{ __('Preview', 'all-signs-options-pro') }}</th>
                        <th>{{ __('Label', 'all-signs-options-pro') }}</th>
                        <th>{{ __('Price', 'all-signs-options-pro') }}</th>
                        <th>{{ __('Pricing', 'all-signs-options-pro') }}</th>
                        <th>{{ __('Default', 'all-signs-options-pro') }}</th>
                        <th>{{ __('Actions', 'all-signs-options-pro') }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="isFetching">
                        <td colspan="7" class="asowp-materials-empty">
                          <Loader2Icon class="asowp-table-loader-icon asowp-w-7 asowp-h-7" />
                        </td>
                      </tr>
                      <tr v-else-if="materials.length === 0">
                        <td colspan="7" class="asowp-materials-empty">{{ __('No materials found', 'all-signs-options-pro') }}</td>
                      </tr>
                      <tr v-for="(material, index) in materials" v-else :key="`${material.name}-${index}`">
                        <td>
                          <button type="button" class="asowp-materials-move" :aria-label="__('Move material', 'all-signs-options-pro')">
                            <GripVerticalIcon class="asowp-w-4 asowp-h-4" />
                          </button>
                        </td>
                        <td>
                          <div class="asowp-materials-preview">
                            <img v-if="getMaterialPreview(material)" :src="getMaterialPreview(material)" :alt="getMaterialLabel(material)" />
                          </div>
                        </td>
                        <td class="asowp-materials-label">{{ getMaterialLabel(material) }}</td>
                        <td>{{ Number(material?.additionalPrice || 0) }}</td>
                        <td>{{ getPricingLabel(material?.pricingId) }}</td>
                        <td>
                          <div class="asowp-materials-default">
                            <span>{{ material?.isDefault ? __('Yes', 'all-signs-options-pro') : __('No', 'all-signs-options-pro') }}</span>
                            <button
                              type="button"
                              :class="['asowp-materials-toggle', material?.isDefault ? 'is-active' : '']"
                              :aria-pressed="material?.isDefault ? 'true' : 'false'"
                              @click="setDefaultMaterial(index)"
                            >
                              <span></span>
                            </button>
                            <span>{{ __('Yes', 'all-signs-options-pro') }}</span>
                          </div>
                        </td>
                        <td>
                          <div class="asowp-materials-actions">
                            <button type="button" class="asowp-materials-edit" @click="editMaterial(index)">
                              <Edit2Icon class="asowp-w-4 asowp-h-4" />
                              {{ __('Edit', 'all-signs-options-pro') }}
                            </button>
                            <button type="button" class="asowp-materials-delete" @click="selectDeleteMaterial(index, material)">
                              <Trash2Icon class="asowp-w-4 asowp-h-4" />
                              {{ __('Delete', 'all-signs-options-pro') }}
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <Sizes v-if="route.name==='Simple-Sizes' " :material-id="activeId" :key="'sizes-'+activeId"/>
            <Colors v-if="route.name==='Simple-Colors' " :material-id="activeId" :key="'colors-'+activeId"/>
            <Shapes v-if="route.name==='Simple-Shapes' " :material-id="activeId" :key="'shapes-'+activeId"/>
            <Borders v-if="route.name==='Simple-Borders' " :material-id="activeId" :key="'borders-'+activeId"/>
            <FixingMethods v-if="route.name==='Simple-FixingMethods' " :material-id="activeId" :key="'fix-'+activeId"/>
            <TextImages v-if="route.name==='Simple-TextImages' " :material-id="activeId" :key="'ti-'+activeId"/>
            <CustomizerText v-if="route.name==='Simple-TextSetting' " :data="customizerSigns.text" :fetch-settings="fetchCustomizerSignsSettings" :key="'editor-text-'+configID"/>
            <CustomizerImage v-if="route.name==='Simple-ImageSetup' " :data="customizerSigns.images" :fetch-settings="fetchCustomizerSignsSettings" :key="'editor-image-'+configID"/>
            <CustomizerSignPart v-if="route.name==='Simple-SignPartSetup' " :data="customizerSigns.signPart" :fetch-settings="fetchCustomizerSignsSettings" :key="'editor-sign-'+configID"/>
            <GeneralSettings v-if="route.name==='config-settings-generals' " :key="'settings-general-'+configID"/>
            <CustomizerSetup v-if="route.name==='config-settings-customizer-options' " :key="'settings-customizer-'+configID"/>
            <LanguageImages v-if="route.name==='config-settings-languages-images' " :key="'settings-language-'+configID"/>
            <ThemeColors v-if="route.name==='config-settings-themes-colors' " :key="'settings-theme-'+configID"/>
            <Discounts v-if="route.name==='Simple-Discounts' " :material-id="activeId" :key="'disc-'+activeId"/>
            <OthersComponents v-if="route.name==='Simple-OthersComponents' || route.name==='Simple-OthersComponents-Options' " :material-id="activeId" :key="'others-'+activeId"/>
            <AdditionalInputs v-if="route.name==='Simple-AdditionalInputs' " :key="'inputs-'+configID"/>
            <ClipartsConfig v-if="route.name==='Simple-Cliparts' " :data="customizerSigns.images" :fetch-settings="fetchCustomizerSignsSettings" :key="'cliparts-'+configID"/>
          </template>
        </div>

        <!-- Create/Edit Material Form -->
        <div v-if="isNewComponent" class="asowp-materials-form-card">
          <h2>{{ isEdit ? __('Edit material', 'all-signs-options-pro') : __('Add material', 'all-signs-options-pro') }}</h2>

          <div class="asowp-materials-form-grid asowp-materials-form-grid--two">
            <label class="asowp-materials-field">
              <span>{{ __('Label', 'all-signs-options-pro') }}</span>
              <input v-model="newMaterial.name" type="text" :class="{ 'has-error': emptyLabel }" />
              <em>{{ __('Customer-facing material name.', 'all-signs-options-pro') }}</em>
            </label>

            <label class="asowp-materials-field">
              <span>{{ __('Additional price', 'all-signs-options-pro') }}</span>
              <div class="asowp-materials-price-field">
                <input v-model.number="newMaterial.additionalPrice" type="number" min="0" step="0.01" />
                <strong>$</strong>
              </div>
            </label>
          </div>

          <label class="asowp-materials-field">
            <span>{{ __('Description', 'all-signs-options-pro') }}</span>
            <textarea v-model="newMaterial.description"></textarea>
          </label>

          <div class="asowp-materials-form-grid asowp-materials-form-grid--two">
            <label class="asowp-materials-field">
              <span>{{ __('Preview image', 'all-signs-options-pro') }}</span>
              <div class="asowp-materials-upload">
                <button type="button" @click.prevent="selectMaterialImage('icon')">{{ __('Preview image', 'all-signs-options-pro') }}</button>
                <button v-if="newMaterial.icon" type="button" class="asowp-materials-upload-clear" @click.prevent="clearMaterialImage('icon')">
                  <Trash2Icon class="asowp-w-4 asowp-h-4" />
                </button>
                <div class="asowp-materials-upload-preview">
                  <img v-if="newMaterial.icon" :src="newMaterial.icon" alt="" />
                </div>
              </div>
              <em>{{ __('Used in the list and option previews.', 'all-signs-options-pro') }}</em>
              <img v-if="newMaterial.icon" :src="newMaterial.icon" class="asowp-materials-large-preview" alt="" />
            </label>

            <label class="asowp-materials-field">
              <span>{{ __('Popup image', 'all-signs-options-pro') }}</span>
              <div class="asowp-materials-upload">
                <button type="button" @click.prevent="selectMaterialImage('popImg')">{{ __('Popup image', 'all-signs-options-pro') }}</button>
                <button v-if="newMaterial.popImg" type="button" class="asowp-materials-upload-clear" @click.prevent="clearMaterialImage('popImg')">
                  <Trash2Icon class="asowp-w-4 asowp-h-4" />
                </button>
                <div class="asowp-materials-upload-preview">
                  <img v-if="newMaterial.popImg" :src="newMaterial.popImg" alt="" />
                </div>
              </div>
              <em>{{ __('Optional larger image for product details.', 'all-signs-options-pro') }}</em>
            </label>
          </div>

          <label class="asowp-materials-field">
            <span>{{ __('Pricing used by this material', 'all-signs-options-pro') }}</span>
            <select v-model="newMaterial.pricingId">
              <option value="">{{ __('Select pricing', 'all-signs-options-pro') }}</option>
              <option v-for="pricing in pricingOptions" :key="pricing.id" :value="pricing.id">{{ pricing.label }}</option>
            </select>
            <em>{{ __('This pricing profile is applied when this material is selected.', 'all-signs-options-pro') }}</em>
          </label>

          <div class="asowp-materials-form-actions">
            <button type="button" class="asowp-materials-back" @click="back">{{ __('Back to materials', 'all-signs-options-pro') }}</button>
            <button type="button" class="asowp-shopify-button-primary" :disabled="isLoading || !newMaterial.name.trim()" @click="isEdit ? updateMaterial() : addNewMaterial()">
              {{ isLoading ? __('Saving...', 'all-signs-options-pro') : (isEdit ? __('Update material', 'all-signs-options-pro') : __('Save material', 'all-signs-options-pro')) }}
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Delete Modal (Themed) -->
    <div v-if="openModal" class="asowp-fixed asowp-inset-0 asowp-z-[20000] asowp-flex asowp-items-center asowp-justify-center">
      <div class="asowp-absolute asowp-inset-0 asowp-bg-black/40" @click="closeModal"></div>
      <div class="asowp-relative asowp-w-[min(480px,95vw)] asowp-bg-white asowp-rounded-2xl asowp-shadow-2xl asowp-overflow-hidden">
        <div class="asowp-p-6 asowp-text-center">
          <div class="asowp-w-14 asowp-h-14 asowp-bg-[#fff1f0] asowp-text-[#8e1f0b] asowp-rounded-full asowp-flex asowp-items-center asowp-justify-center asowp-mx-auto asowp-mb-4">
            <Trash2Icon class="asowp-w-7 asowp-h-7" />
          </div>
          <h3 class="asowp-text-[18px] asowp-font-bold asowp-text-[#1a1a1a] asowp-mb-2">{{ __('Delete material?', 'all-signs-options-pro') }}</h3>
          <p class="asowp-text-[14px] asowp-text-[#616161] asowp-mb-6">{{ sprintf(__('Are you sure you want to delete "%s"? This action cannot be undone.', 'all-signs-options-pro'), deleteMaterial.name) }}</p>
          <div class="asowp-flex asowp-gap-3">
            <button @click="closeModal" class="asowp-flex-1 asowp-py-2.5 asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-rounded-xl asowp-text-[14px] asowp-font-bold asowp-cursor-pointer hover:asowp-bg-gray-50">{{ __('No, keep it', 'all-signs-options-pro') }}</button>
            <button @click="delMaterial" :disabled="isLoading" class="asowp-flex-1 asowp-py-2.5 asowp-bg-[#8e1f0b] asowp-text-white asowp-border-none asowp-rounded-xl asowp-text-[14px] asowp-font-bold asowp-cursor-pointer hover:asowp-bg-[#7a1a09]">
              {{ isLoading ? __('Deleting...', 'all-signs-options-pro') : __('Yes, delete', 'all-signs-options-pro') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';
import Sizes from '@/admin/pages/configuration/materials/simple/components/sizes.vue'
import Borders from '@/admin/pages/configuration/materials/simple/components/borders.vue'
import Colors from '@/admin/pages/configuration/materials/simple/components/colors.vue'
import FixingMethods from '@/admin/pages/configuration/materials/simple/components/fixing-methods.vue'
import Shapes from '@/admin/pages/configuration/materials/simple/components/shapes.vue'
import Discounts from '@/admin/pages/configuration/materials/simple/components/discounts.vue'
import TextImages from '@/admin/pages/configuration/materials/simple/components/text-images.vue'
import OthersComponents from '@/admin/pages/configuration/materials/simple/components/others-components/index.vue'
import AdditionalInputs from '@/admin/pages/configuration/additional-options/index.vue'
import ClipartsConfig from '@/admin/pages/configuration/materials/simple/components/cliparts.vue'
import AdvanceMaterial from '@/admin/pages/configuration/materials/advance/index.vue'
import CustomizerText from '@/admin/pages/configuration/settings/customizer-signs/text.vue'
import CustomizerImage from '@/admin/pages/configuration/settings/customizer-signs/image.vue'
import CustomizerSignPart from '@/admin/pages/configuration/settings/customizer-signs/sign-part.vue'
import GeneralSettings from '@/admin/pages/configuration/settings/generals/index.vue'
import CustomizerSetup from '@/admin/pages/configuration/settings/customizer-signs/index.vue'
import LanguageImages from '@/admin/pages/configuration/settings/language-image/index.vue'
import ThemeColors from '@/admin/pages/configuration/settings/themes-color/index.vue'
import {
  ArrowLeftIcon,
  MaximizeIcon,
  PaletteIcon,
  ShapesIcon,
  SquareIcon,
  WrenchIcon,
  TypeIcon,
  TagIcon,
  PlusSquareIcon,
  SettingsIcon,
  EyeIcon,
  PlusIcon,
  CheckIcon,
  Edit2Icon,
  Trash2Icon,
  Loader2Icon,
  SearchIcon,
  DollarSignIcon,
  GripVerticalIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from 'lucide-vue-next';
import { __, sprintf } from "@wordpress/i18n";

const route = useRoute();
const router = useRouter();

const configID = ref(route.params.configId);
const materialId = ref(route.params.materialId);
const config = ref(String(route.params.config ?? '').replace(/-/g, ' '));

const materials = ref([]);
const activeMaterialIndex = ref(0);
const enforcedMaterialType = ref('simple');
const isFetching = ref(false);
const isLoading = ref(false);
const isEdit = ref(false);
const isNewComponent = ref(false);
const contentComponent = ref(true);
const openModal = ref(false);
const deleteMaterial = ref({ id: null, name: "" });
const newMaterial = ref({ name: "", description: "", icon: "", popImg: "", previewImg: "", pricingId: "", additionalPrice: 0, type: "simple", active: true, isDefault: false });
const emptyLabel = ref(false);
const customizerSigns = ref({});
const configurationMeta = ref({});
const editingMaterialIndex = ref(null);

const activeMaterial = computed(() => materials.value[activeMaterialIndex.value] || null);
const activeId = computed(() => activeMaterial.value?.id ?? activeMaterialIndex.value);
const activeName = computed(() => activeMaterial.value?.name ?? '');
const activeDescription = computed(() => activeMaterial.value?.description ?? '');
const isMaterialActive = (material) => material?.active ?? true;
const activeMaterialsCount = computed(() => materials.value.filter(isMaterialActive).length);
const pricingOptions = computed(() => {
  const options = configurationMeta.value?.requiredOptions?.pricing?.priceOptions;
  return Array.isArray(options) ? options : [];
});
const canonicalMaterials = computed(() => {
  const requiredItems = configurationMeta.value?.requiredOptions?.materials?.items;
  if (Array.isArray(requiredItems) && requiredItems.length > 0) {
    return requiredItems;
  }

  const additionalItems = configurationMeta.value?.additionalOptions?.materials?.items;
  return Array.isArray(additionalItems) ? additionalItems : [];
});
const normalizeValue = (value) => String(value || '').toLowerCase().trim().replace(/[_\s]+/g, '-');
const parseMaybeJson = (value) => {
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};
const resolveFamilySlug = (value) => {
  const normalized = normalizeValue(value);
  if (['banner', 'banners'].includes(normalized)) return 'banners';
  if (['sticker', 'stickers'].includes(normalized)) return 'stickers';
  if (['signboard', 'signboards', 'signs-panels', 'signs-&-panels', 'signs-and-panels'].includes(normalized)) return 'signs-panels';
  return '';
};
const configurationFamilySlug = computed(() => {
  const parsedData = parseMaybeJson(configurationMeta.value?.data) || {};
  const settings = parsedData?.settings || configurationMeta.value?.settings || {};
  const explicit = resolveFamilySlug(
    settings.productFamilySlug ||
    settings.productFamily ||
    settings.productType ||
    parsedData.productFamilySlug ||
    parsedData.productFamily ||
    parsedData.productType ||
    configurationMeta.value?.productFamilySlug ||
    configurationMeta.value?.productFamily ||
    configurationMeta.value?.productType
  );
  if (explicit) return explicit;

  const names = materials.value.map(item => normalizeValue(item?.name));
  if (names.some(name => ['fabric', 'mesh', 'banner-vinyl'].includes(name))) return 'banners';
  if (names.some(name => ['paper', 'pvc', 'film', 'sticker-vinyl'].includes(name))) return 'stickers';
  if (names.some(name => ['standard', 'acrylic', 'aluminium', 'aluminum', 'brass', 'eco-friendly', 'magnet', 'photo-paper', 'plastic', 'stainless-steel', 'vinyl', 'wood'].includes(name))) return 'signs-panels';
  return '';
});

const isAdvanceRoute = computed(() => route.name === 'Material-Advance' || route.name === 'Material-Advance-options');
const isSettingsStickyRoute = computed(() => [
  'config-settings-generals',
  'config-settings-customizer-options',
  'config-settings-languages-images',
  'config-settings-themes-colors',
].includes(route.name));
const openSections = ref(['core']);
const searchMenu = ref('');

const coreSetupMenu = [
  { label: __('Sizes', 'all-signs-options-pro'), icon: MaximizeIcon, route: 'Simple-Sizes' },
  { label: __('Pricing', 'all-signs-options-pro'), icon: DollarSignIcon, route: 'Simple-Discounts' },
  { label: __('Fonts', 'all-signs-options-pro'), icon: TypeIcon, route: 'Simple-TextImages' },
  { label: __('Colors', 'all-signs-options-pro'), icon: PaletteIcon, route: 'Simple-Colors' },
  { label: __('Fixing Methods', 'all-signs-options-pro'), icon: WrenchIcon, route: 'Simple-FixingMethods' },
  { label: __('Shapes', 'all-signs-options-pro'), icon: ShapesIcon, route: 'Simple-Shapes' },
  { label: __('Materials', 'all-signs-options-pro'), icon: TagIcon, route: 'materials', configLevel: true },
  { label: __('Borders', 'all-signs-options-pro'), icon: SquareIcon, route: 'Simple-Borders' },
];

const editorSetupMenu = [
  { label: __('Text Setting', 'all-signs-options-pro'), icon: TypeIcon, route: 'Simple-TextSetting' },
  { label: __('Image Setup', 'all-signs-options-pro'), icon: TagIcon, route: 'Simple-ImageSetup' },
  { label: __('Sign Part', 'all-signs-options-pro'), icon: TagIcon, route: 'Simple-SignPartSetup' },
];

const additionalOptionsMenu = [
  { label: __('Components', 'all-signs-options-pro'), icon: PlusSquareIcon, route: 'Simple-OthersComponents' },
  { label: __('Inputs', 'all-signs-options-pro'), icon: PlusSquareIcon, route: 'Simple-AdditionalInputs' },
];

const librariesMenu = [
  { label: __('Cliparts', 'all-signs-options-pro'), icon: TagIcon, route: 'Simple-Cliparts' },
];

const settingsMenu = [
  { label: __('General', 'all-signs-options-pro'), icon: SettingsIcon, route: 'config-settings-generals' },
  { label: __('Customizer Setup', 'all-signs-options-pro'), icon: TagIcon, route: 'config-settings-customizer-options' },
  { label: __('Language & Images', 'all-signs-options-pro'), icon: TypeIcon, route: 'config-settings-languages-images' },
  { label: __('Theme & Color', 'all-signs-options-pro'), icon: PaletteIcon, route: 'config-settings-themes-colors' },
];

const accordionSections = computed(() => [
  { key: 'core', label: __('Core Setup', 'all-signs-options-pro'), items: coreSetupMenu },
  { key: 'editor', label: __('Editor Setup', 'all-signs-options-pro'), items: editorSetupMenu },
  { key: 'additional', label: __('Additional Options', 'all-signs-options-pro'), items: additionalOptionsMenu },
  { key: 'libraries', label: __('Libraries', 'all-signs-options-pro'), items: librariesMenu },
  { key: 'settings', label: __('Settings', 'all-signs-options-pro'), items: settingsMenu },
]);

const standaloneMenu = computed(() => []);
const normalizeSearchValue = (value = '') => String(value).toLowerCase().trim().replace(/\s+/g, ' ');
const itemMatchesSearch = (item, term) => {
  const normalizedTerm = normalizeSearchValue(term);
  if (!normalizedTerm) return true;

  const terms = normalizedTerm.split(' ').filter(Boolean);
  const haystack = normalizeSearchValue([item.label, ...(item.keywords || [])].join(' '));
  return terms.every(part => haystack.includes(part));
};

const filteredAccordionSections = computed(() => {
  const term = searchMenu.value.trim();
  if (!term) return accordionSections.value;

  return accordionSections.value
    .map(section => ({
      ...section,
      items: section.items.filter(item => itemMatchesSearch(item, term)),
    }))
    .filter(section => section.items.length > 0);
});

const navigateTo = (routeName) => {
  const targetIndex = materials.value[activeMaterialIndex.value] ? activeMaterialIndex.value : 0;
  router.push({
    name: routeName,
    params: {
      configId: configID.value,
    },
    query: targetIndex > 0 ? { materialIndex: targetIndex } : {},
  });
};

const navigateConfigRoute = (routeName) => {
  router.push({
    name: routeName,
    params: {
      configId: configID.value,
    }
  });
};

const navigateSidebarItem = (item) => {
  if (item.global) {
    router.push({ name: item.route });
    return;
  }

  if (String(item.route).startsWith('config-')) {
    navigateConfigRoute(item.route);
    return;
  }

  if (item.configLevel) {
    router.push({
      name: item.route,
      params: {
        configId: configID.value,
      }
    });
    return;
  }

  navigateTo(item.route);
};

const isSectionOpen = (key) => searchMenu.value.trim().length > 0 || openSections.value.includes(key);
const toggleSection = (key) => {
  if (searchMenu.value.trim().length > 0) {
    openSections.value = [key];
    return;
  }

  openSections.value = openSections.value.includes(key) ? [] : [key];
};

const sectionByRoute = computed(() => {
  const current = String(route.name || '');
  return accordionSections.value.find(section => section.items.some(item => item.route === current))?.key;
});

const sidebarItemClass = (item) => [
  'asowp-config-nav-item asowp-w-full asowp-flex asowp-items-center asowp-gap-3 asowp-px-4 asowp-py-3 asowp-rounded-xl asowp-text-[18px] asowp-leading-6 asowp-border-none asowp-cursor-pointer asowp-transition-colors asowp-text-left',
  route.name === item.route ? 'is-active asowp-bg-[#eef2ff] asowp-text-[#111827] asowp-font-[900] asowp-border asowp-border-solid asowp-border-[#b8c7ff]' : 'asowp-bg-transparent asowp-text-[#111827] asowp-font-medium hover:asowp-bg-[#f7f8fa]'
];

const fetchMaterials = async () => {
  isFetching.value = true;
  try {
    if (canonicalMaterials.value.length > 0) {
      materials.value = canonicalMaterials.value.map((material, index) => normalizeMaterial(material, index));
      return;
    }

    const result = await api.getMaterials(configID.value);
    if (!result.message) {
      materials.value = result.map((m, index) => normalizeMaterial(m, index));
      return;
    }
    materials.value = [];
  } finally { isFetching.value = false; }
};

const syncActiveIndexFromRoute = () => {
  const idx = Number.parseInt(String(route.query.materialIndex ?? route.params.materialId ?? ''), 10);
  if (Number.isFinite(idx) && idx >= 0 && idx < materials.value.length) {
    activeMaterialIndex.value = idx;
  }
};

const redirectToMaterial = (idx, name, type) => {
  activeMaterialIndex.value = idx;
  navigateTo(enforcedMaterialType.value === 'advance' ? 'Material-Advance' : 'Simple-Sizes');
};

const goToPreview = (c) => router.push({ name: 'preview-back', params: { configId: configID.value } });

const resetMaterialForm = () => {
  newMaterial.value = {
    name: "",
    description: "",
    icon: "",
    popImg: "",
    previewImg: "",
    pricingId: pricingOptions.value[0]?.id || "",
    additionalPrice: 0,
    type: enforcedMaterialType.value,
    active: true,
    isDefault: materials.value.length === 0,
    excludeComponentIds: [],
  };
  editingMaterialIndex.value = null;
  emptyLabel.value = false;
};

const fetchCustomizerSignsSettings = async () => {
  const result = await api.getCustomizerSignsSettings(configID.value);
  if (!result.message) {
    customizerSigns.value = result;
  }
};

const addComponent = () => {
  resetMaterialForm();
  isNewComponent.value = true;
  contentComponent.value = false;
  isEdit.value = false;
};

const back = () => {
  isNewComponent.value = false;
  contentComponent.value = true;
  isEdit.value = false;
  resetMaterialForm();
};

const normalizeMaterial = (material, index = 0) => ({
  ...material,
  id: material?.id || material?.materialKey || material?.sourceMaterialId || `material-${index + 1}`,
  materialKey: material?.materialKey || material?.sourceMaterialId || material?.id || '',
  sourceMaterialId: material?.sourceMaterialId || material?.materialKey || material?.id || '',
  sourceIndex: Number.isInteger(Number(material?.sourceIndex)) ? Number(material.sourceIndex) : index,
  name: material?.name || material?.label || '',
  description: material?.description || '',
  icon: material?.icon || material?.image || material?.previewImg || '',
  popImg: material?.popImg || material?.popupImg || material?.popupImage || '',
  previewImg: material?.previewImg || material?.icon || material?.image || '',
  pricingId: material?.pricingId || '',
  additionalPrice: Number(material?.additionalPrice || 0),
  type: material?.type || enforcedMaterialType.value,
  active: material?.active ?? true,
  isDefault: material?.isDefault ?? index === 0,
  excludeComponentIds: Array.isArray(material?.excludeComponentIds) ? material.excludeComponentIds : [],
});

const getMaterialLabel = (material) => material?.name || material?.label || __('Material', 'all-signs-options-pro');
const getMaterialPreview = (material) => material?.previewImg || material?.icon || material?.image || '';
const getPricingLabel = (pricingId) => {
  if (!pricingId) return __('No pricing selected', 'all-signs-options-pro');
  return pricingOptions.value.find((pricing) => pricing.id === pricingId)?.label || pricingId;
};

const selectMaterialImage = (field) => {
  const uploader = wp.media({ title: __("Select image", "all-signs-options-pro"), button: { text: __("Select image", "all-signs-options-pro") }, multiple: false })
    .on('select', () => {
      const attachment = uploader.state().get('selection').first().toJSON();
      if (attachment.type === "image") {
        newMaterial.value[field] = attachment.url;
        if (field === 'icon') {
          newMaterial.value.previewImg = attachment.url;
        }
      }
    }).open();
};

const clearMaterialImage = (field) => {
  newMaterial.value[field] = "";
  if (field === 'icon') {
    newMaterial.value.previewImg = "";
  }
};

const editMaterial = (index) => {
  const material = normalizeMaterial(materials.value[index], index);
  newMaterial.value = { ...material };
  editingMaterialIndex.value = material.sourceIndex;
  materialId.value = material.sourceIndex;
  isNewComponent.value = true;
  contentComponent.value = false;
  isEdit.value = true;
};

const selectDeleteMaterial = (index, material) => {
  const normalized = normalizeMaterial(material, index);
  deleteMaterial.value = { id: normalized.sourceIndex, name: getMaterialLabel(normalized) };
  openModal.value = true;
};

const setDefaultMaterial = async (index) => {
  if (materials.value[index]?.isDefault || isLoading.value) return;
  isLoading.value = true;
  try {
    const payload = normalizeMaterial(materials.value[index], index);
    payload.isDefault = true;
    const result = await api.updateMaterial(configID.value, payload.sourceIndex, payload);
    if (result.success) {
      await loadConfigurationMeta();
      await fetchMaterials();
      toastMessage(__('Default material updated', 'all-signs-options-pro'));
      return;
    }
    toastMessage(result.message, 'error');
  } finally {
    isLoading.value = false;
  }
};

const loadConfigurationMeta = async () => {
  try {
    const cfg = await api.getConfig(configID.value);
    configurationMeta.value = cfg || {};
    enforcedMaterialType.value = cfg?.materialType === 'advance' ? 'advance' : 'simple';
  } catch (e) {}
};

onMounted(async () => {
  await loadConfigurationMeta();
  await fetchMaterials();
  await fetchCustomizerSignsSettings();
  syncActiveIndexFromRoute();
});

watch(() => [route.query.materialIndex, route.params.materialId], syncActiveIndexFromRoute);
watch(sectionByRoute, (section) => {
  if (section && searchMenu.value.trim().length === 0) {
    openSections.value = [section];
  }
}, { immediate: true });

const addNewMaterial = async () => {
  if (newMaterial.value.name.trim() === '') {
    emptyLabel.value = true;
    toastMessage("Label must not be empty", "warning");
    return;
  }

  isLoading.value = true;
  newMaterial.value.type = enforcedMaterialType.value;
  newMaterial.value.previewImg = newMaterial.value.previewImg || newMaterial.value.icon;
  const result = await api.addMaterial(configID.value, newMaterial.value);
  isLoading.value = false;

  if (result.success) {
    await loadConfigurationMeta();
    await fetchMaterials();
    isNewComponent.value = false;
    contentComponent.value = true;
    resetMaterialForm();
    toastMessage(result.message);
    return;
  }

  toastMessage(result.message, "error");
};

const updateMaterial = async () => {
  if (newMaterial.value.name.trim() === '') {
    emptyLabel.value = true;
    toastMessage("Label must not be empty", "warning");
    return;
  }

  isLoading.value = true;
  emptyLabel.value = false;
  newMaterial.value.type = enforcedMaterialType.value;
  newMaterial.value.previewImg = newMaterial.value.previewImg || newMaterial.value.icon;
  const result = await api.updateMaterial(configID.value, editingMaterialIndex.value ?? materialId.value, newMaterial.value);
  isLoading.value = false;

  if (result.success) {
    await loadConfigurationMeta();
    await fetchMaterials();
    isNewComponent.value = false;
    contentComponent.value = true;
    isEdit.value = false;
    resetMaterialForm();
    toastMessage(result.message);
    return;
  }

  toastMessage(result.message, "error");
};

const closeModal = () => {
  if (!isLoading.value) {
    openModal.value = false;
  }
};

const delMaterial = async () => {
  isLoading.value = true;
  const result = await api.deleteMaterial(configID.value, deleteMaterial.value.id);
  isLoading.value = false;

  if (result.success) {
    await loadConfigurationMeta();
    await fetchMaterials();
    const nextActiveIndex = materials.value.findIndex(isMaterialActive);
    if (nextActiveIndex !== -1) {
      const next = materials.value[nextActiveIndex];
      redirectToMaterial(nextActiveIndex, next.name, next.type);
    }
    toastMessage(result.message);
    closeModal();
    return;
  }

  toastMessage(result.message, "error");
  closeModal();
};
</script>

<style scoped>
.asowp-config-workspace {
  padding: 10px 12px;
  gap: 12px;
  color: #303030;
}

.asowp-config-sidebar {
  position: sticky;
  top: 46px;
  width: 242px;
  max-height: calc(100vh - 58px);
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
}

.asowp-config-card,
.asowp-config-nav-card {
  border-color: #dfe3e8;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
}

.asowp-config-card {
  padding: 14px;
  flex: 0 0 auto;
}

.asowp-config-nav-scroll {
  flex: 1;
  min-height: 0;
  padding-top: 0;
  padding-right: 4px;
  overflow-y: auto;
  overscroll-behavior: contain;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.asowp-config-nav-scroll::-webkit-scrollbar {
  display: none;
}

.asowp-config-nav-card {
  padding: 14px 16px;
  overflow: hidden;
}

.asowp-config-group + .asowp-config-group {
  margin-top: 8px;
}

.asowp-config-title {
  font-size: 18px;
  line-height: 22px;
  font-weight: 800;
}

.asowp-config-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.asowp-config-meta-row {
  max-width: 100%;
}

.asowp-config-meta-pill,
.asowp-config-family-pill {
  max-width: 100%;
  font-size: 11px !important;
  line-height: 16px !important;
  padding: 2px 8px !important;
}

.asowp-config-label {
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
}

.asowp-config-accordion {
  height: 36px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  background: #ffffff;
  border-color: transparent;
}

.asowp-config-accordion.is-active-group {
  background: #f6f6f7;
  border-color: #d1d5db;
}

.asowp-config-section-items {
  margin-left: 12px;
  padding-left: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
  gap: 4px;
  border-top: 0 !important;
  border-right: 0 !important;
  border-bottom: 0 !important;
  border-left: 1px solid #e1e3e5 !important;
  background: transparent !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  outline: 0 !important;
}

.asowp-config-nav-item {
  min-height: 34px;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
  background: transparent;
  box-shadow: none;
}

.asowp-config-nav-item.is-active {
  background: #edf2ff;
  border-color: #b9c7ff;
  font-weight: 800;
}

.asowp-config-nav-item svg {
  width: 15px;
  height: 15px;
}

.asowp-config-card button {
  width: 32px;
  height: 32px;
  border-radius: 8px;
}

.asowp-config-card button svg {
  width: 16px;
  height: 16px;
}

.asowp-config-card span {
  font-size: 11px;
  line-height: 16px;
  padding: 1px 8px;
}

.asowp-config-card input {
  height: 36px;
  font-size: 12px;
  padding-left: 12px;
  padding-right: 12px;
}

header div::-webkit-scrollbar {
  display: none;
}

header div {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.asowp-materials-page {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #303030;
  font-size: 13px;
  line-height: 20px;
}

.asowp-materials-hero,
.asowp-materials-card,
.asowp-materials-form-card {
  background: #ffffff;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
}

.asowp-materials-hero {
  min-height: 74px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.asowp-materials-hero h1,
.asowp-materials-form-card h2 {
  margin: 0;
  color: #303030;
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
}

.asowp-materials-hero p {
  margin: 0;
  color: #616161;
  font-size: 11px;
  line-height: 14px;
  font-weight: 450;
}

.asowp-shopify-button-primary {
  min-height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 4px 12px;
  border: 1px solid #016464;
  border-radius: 7px;
  background: #016464;
  color: #ffffff;
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  cursor: pointer;
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.48) inset,
    -1px 0 0 0 rgba(255, 255, 255, 0.20) inset,
    1px 0 0 0 rgba(255, 255, 255, 0.20) inset,
    0 -1.5px 0 0 rgba(0, 0, 0, 0.25) inset;
}

.asowp-materials-add-button {
  min-height: 28px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11px;
  line-height: 14px;
}

.asowp-materials-add-button svg {
  width: 13px;
  height: 13px;
}

.asowp-shopify-button-primary:hover,
.asowp-shopify-button-primary:focus {
  border-color: #004e4e;
  background: #004e4e;
  color: #ffffff;
  outline: none;
}

.asowp-shopify-button-primary:disabled {
  border-color: #c9c9c9;
  background: #d4d4d4;
  color: #ffffff;
  cursor: not-allowed;
  box-shadow: none;
}

.asowp-materials-card {
  padding: 32px 34px 42px;
}

.asowp-materials-card h2 {
  margin: 0 0 14px;
  color: #303030;
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
}

.asowp-materials-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border: 0;
  background: #ffffff;
}

.asowp-materials-table thead tr {
  background: #f7f7f7;
}

.asowp-materials-table th {
  padding: 7px 12px;
  border: 0;
  color: #616161;
  font-size: 12px;
  line-height: 20px;
  font-weight: 650;
  text-align: left;
  white-space: nowrap;
}

.asowp-materials-table td {
  padding: 10px 12px;
  border-top: 1px solid #e3e3e3;
  border-right: 0;
  border-bottom: 0;
  border-left: 0;
  color: #303030;
  font-size: 13px;
  line-height: 20px;
  vertical-align: middle;
}

.asowp-materials-empty {
  height: 120px;
  text-align: center;
  color: #616161;
}

.asowp-materials-empty .asowp-table-loader-icon {
  margin: 0 auto;
  color: #016464;
  animation: asowp-spin 1s linear infinite;
}

.asowp-materials-move {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c9d2dc;
  border-radius: 999px;
  background: #f8fafc;
  color: #6b7280;
  cursor: grab;
}

.asowp-materials-preview {
  width: 52px;
  height: 52px;
  border: 1px solid #d8dee4;
  border-radius: 8px;
  padding: 4px;
  background: #f8fafc;
  overflow: hidden;
}

.asowp-materials-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.asowp-materials-label {
  font-weight: 800;
}

.asowp-materials-default {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #616161;
}

.asowp-materials-toggle {
  width: 42px;
  height: 24px;
  position: relative;
  border: 0;
  border-radius: 999px;
  background: #cfd6e5;
  cursor: pointer;
  transition: background 0.15s ease;
}

.asowp-materials-toggle span {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.22);
  transition: transform 0.15s ease;
}

.asowp-materials-toggle.is-active {
  background: #007a78;
}

.asowp-materials-toggle.is-active span {
  transform: translateX(18px);
}

.asowp-materials-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.asowp-materials-edit,
.asowp-materials-delete {
  min-height: 28px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 0;
  background: transparent;
  font-size: 11px;
  line-height: 14px;
  font-weight: 700;
  cursor: pointer;
}

.asowp-materials-edit {
  padding: 5px 10px;
  border: 1px solid #c9cccf;
  border-radius: 6px;
  color: #303030;
  background: #ffffff;
  box-shadow: none;
}

.asowp-materials-edit svg,
.asowp-materials-delete svg {
  width: 14px;
  height: 14px;
}

.asowp-materials-delete {
  color: #8e1f0b;
}

.asowp-materials-form-card {
  padding: 34px 34px 28px;
  color: #303030;
}

.asowp-materials-form-card h2 {
  margin-bottom: 24px;
}

.asowp-materials-form-grid {
  display: grid;
  gap: 22px;
}

.asowp-materials-form-grid--two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.asowp-materials-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
  color: #303030;
  font-size: 13px;
  line-height: 20px;
  font-weight: 450;
}

.asowp-materials-field span {
  font-size: 13px;
  line-height: 20px;
  font-weight: 450;
}

.asowp-materials-field input,
.asowp-materials-field textarea,
.asowp-materials-field select,
.asowp-materials-price-field {
  width: 100%;
  min-height: 38px;
  box-sizing: border-box;
  border: 1px solid #8a8a8a;
  border-radius: 7px;
  background: #ffffff;
  color: #303030;
  font-size: 13px;
  line-height: 20px;
  font-weight: 450;
  outline: none;
}

.asowp-materials-field input,
.asowp-materials-field textarea,
.asowp-materials-field select {
  padding: 8px 12px;
}

.asowp-materials-field textarea {
  min-height: 88px;
  resize: vertical;
}

.asowp-materials-field input:focus,
.asowp-materials-field textarea:focus,
.asowp-materials-field select:focus {
  border-color: #016464;
  box-shadow: 0 0 0 1px #016464;
}

.asowp-materials-field input.has-error {
  border-color: #c5280c;
}

.asowp-materials-field em {
  color: #616161;
  font-style: normal;
}

.asowp-materials-price-field {
  display: flex;
  align-items: center;
  overflow: hidden;
}

.asowp-materials-price-field input {
  min-height: 36px;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

.asowp-materials-price-field strong {
  padding: 0 14px;
  color: #616161;
  font-size: 13px;
  font-weight: 450;
}

.asowp-materials-upload {
  height: 40px;
  display: flex;
  align-items: center;
  border: 1px solid #303030;
  border-radius: 4px;
  background: #ffffff;
  overflow: hidden;
}

.asowp-materials-upload > button:first-child {
  min-width: 160px;
  height: 32px;
  margin-left: 4px;
  padding: 0 18px;
  border: 1px solid #016464;
  border-radius: 6px;
  background: #016464;
  color: #ffffff;
  font-size: 13px;
  line-height: 20px;
  font-weight: 800;
  cursor: pointer;
}

.asowp-materials-upload-clear {
  width: 32px;
  height: 32px;
  margin-left: auto;
  border: 0;
  background: transparent;
  color: #ff0000;
  cursor: pointer;
}

.asowp-materials-upload-preview {
  width: 36px;
  height: 36px;
  margin-left: auto;
  margin-right: 4px;
  border: 1px solid #d8dee4;
  border-radius: 8px;
  background: #ffffff;
  overflow: hidden;
}

.asowp-materials-upload-clear + .asowp-materials-upload-preview {
  margin-left: 4px;
}

.asowp-materials-upload-preview img,
.asowp-materials-large-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.asowp-materials-large-preview {
  width: 70px;
  height: 70px;
  margin-top: 14px;
  border: 1px solid #d8dee4;
  border-radius: 8px;
}

.asowp-materials-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.asowp-materials-back {
  min-height: 30px;
  padding: 5px 14px;
  border: 1px solid #c9c9c9;
  border-radius: 7px;
  background: #ffffff;
  color: #303030;
  font-size: 12px;
  line-height: 16px;
  font-weight: 650;
  cursor: pointer;
  box-shadow: 0 -1px 0 #b5b5b5 inset, -1px 0 0 #e3e3e3 inset, 1px 0 0 #e3e3e3 inset, 0 1px 0 #e3e3e3 inset;
}

@keyframes asowp-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 960px) {
  .asowp-materials-form-grid--two {
    grid-template-columns: 1fr;
  }

  .asowp-materials-hero {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
