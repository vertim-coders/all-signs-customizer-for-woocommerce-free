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
          <input type="text" class="asowp-box-border asowp-w-full asowp-h-12 asowp-px-4 asowp-rounded-lg asowp-border asowp-border-solid asowp-border-[#8c9196] asowp-text-[16px] asowp-outline-none focus:asowp-border-[#008060]" :placeholder="__('Search configurator items...', 'all-signs-options-pro')" />
        </div>
      </div>

      <!-- Navigation Menu -->
      <div class="asowp-config-nav-card asowp-flex-1 asowp-overflow-y-auto asowp-bg-white asowp-rounded-2xl asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-p-5">
        <div v-for="section in accordionSections" :key="section.key" class="asowp-mb-2">
          <button
            type="button"
            @click="toggleSection(section.key)"
            class="asowp-config-accordion asowp-w-full asowp-h-12 asowp-flex asowp-items-center asowp-justify-between asowp-px-4 asowp-rounded-xl asowp-bg-[#f5f6f7] asowp-border asowp-border-solid asowp-border-[#d1d5db] asowp-text-[16px] asowp-font-[900] asowp-text-[#5c5f62] asowp-cursor-pointer"
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
        <div v-if="isNewComponent" class="asowp-max-w-[800px] asowp-mx-auto">
          <div class="asowp-bg-white asowp-rounded-2xl asowp-shadow-sm asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-overflow-hidden">
            <div class="asowp-px-6 asowp-py-4 asowp-border-b asowp-border-solid asowp-border-[#f1f1f1]">
              <h3 class="asowp-text-[18px] asowp-font-bold asowp-text-[#1a1a1a]">{{ isEdit ? __('Edit material', 'all-signs-options-pro') : __('Create new material', 'all-signs-options-pro') }}</h3>
            </div>
            <div class="asowp-p-6 asowp-space-y-6">
              <div class="asowp-grid md:asowp-grid-cols-2 asowp-gap-6">
                <div class="asowp-space-y-2">
                  <label class="asowp-text-[14px] asowp-font-bold asowp-text-[#1a1a1a]">{{ __('Name', 'all-signs-options-pro') }} <span class="asowp-text-red-500">*</span></label>
                  <input type="text" v-model="newMaterial.name" :class="['asowp-w-full asowp-px-4 asowp-py-2 asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#c1c4c7] focus:asowp-border-[#006e52] asowp-outline-none', emptyLabel ? 'asowp-border-red-500' : '']">
                </div>
                <div class="asowp-space-y-2">
                  <label class="asowp-text-[14px] asowp-font-bold asowp-text-[#1a1a1a]">{{ __('Description', 'all-signs-options-pro') }}</label>
                  <input type="text" v-model="newMaterial.description" class="asowp-w-full asowp-px-4 asowp-py-2 asowp-rounded-xl asowp-border asowp-border-solid asowp-border-[#c1c4c7] focus:asowp-border-[#006e52] asowp-outline-none">
                </div>
              </div>
              <div class="asowp-grid md:asowp-grid-cols-2 asowp-gap-6">
                <div class="asowp-space-y-2">
                  <label class="asowp-text-[14px] asowp-font-bold asowp-text-[#1a1a1a]">{{ __('Icon', 'all-signs-options-pro') }}</label>
                  <div class="asowp-flex asowp-items-center asowp-gap-4 asowp-p-3 asowp-border asowp-border-solid asowp-border-[#e1e3e5] asowp-rounded-xl">
                    <button @click="selectMaterialIcon" class="asowp-px-4 asowp-py-2 asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-rounded-lg asowp-text-[12px] asowp-font-bold asowp-cursor-pointer hover:asowp-bg-gray-50">{{ __('Choose file', 'all-signs-options-pro') }}</button>
                    <div v-if="newMaterial.icon" class="asowp-relative asowp-w-10 asowp-h-10 asowp-rounded-lg asowp-overflow-hidden asowp-border asowp-border-solid asowp-border-[#e1e3e5]">
                      <img :src="newMaterial.icon" class="asowp-w-full asowp-h-full asowp-object-cover">
                      <button @click="newMaterial.icon = ''" class="asowp-absolute asowp-inset-0 asowp-bg-black/40 asowp-text-white asowp-flex asowp-items-center asowp-justify-center asowp-opacity-0 hover:asowp-opacity-100 asowp-transition-opacity asowp-border-none asowp-cursor-pointer">
                        <XIcon class="asowp-w-4 asowp-h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div class="asowp-space-y-2">
                  <label class="asowp-text-[14px] asowp-font-bold asowp-text-[#1a1a1a]">{{ __('Behavior type', 'all-signs-options-pro') }}</label>
                  <div class="asowp-w-full asowp-px-4 asowp-py-2 asowp-bg-gray-100 asowp-rounded-xl asowp-text-[14px] asowp-text-[#616161] asowp-font-medium">{{ enforcedMaterialType }}</div>
                </div>
              </div>
            </div>
            <div class="asowp-px-6 asowp-py-4 asowp-bg-[#fbfcfc] asowp-border-t asowp-border-solid asowp-border-[#e1e3e5] asowp-flex asowp-justify-end asowp-gap-3">
              <button @click="back" class="asowp-px-6 asowp-py-2 asowp-bg-white asowp-border asowp-border-solid asowp-border-[#c1c4c7] asowp-rounded-xl asowp-text-[14px] asowp-font-bold asowp-cursor-pointer hover:asowp-bg-gray-50">{{ __('Cancel', 'all-signs-options-pro') }}</button>
              <button @click="isEdit ? updateMaterial() : addNewMaterial()" class="asowp-px-8 asowp-py-2 asowp-bg-[#006e52] asowp-text-white asowp-border-none asowp-rounded-xl asowp-text-[14px] asowp-font-bold asowp-cursor-pointer hover:asowp-bg-[#005c45] shadow-sm">
                {{ isLoading ? __('Saving...', 'all-signs-options-pro') : __('Save', 'all-signs-options-pro') }}
              </button>
            </div>
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
  XIcon,
  Trash2Icon,
  Loader2Icon,
  SearchIcon,
  DollarSignIcon,
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
const newMaterial = ref({ name: "", description: "", icon: "", popImg: "", type: "simple", active: true });
const emptyLabel = ref(false);
const customizerSigns = ref({});
const configurationMeta = ref({});

const activeMaterial = computed(() => materials.value[activeMaterialIndex.value] || null);
const activeId = computed(() => activeMaterial.value?.id ?? activeMaterialIndex.value);
const activeName = computed(() => activeMaterial.value?.name ?? '');
const activeDescription = computed(() => activeMaterial.value?.description ?? '');
const isMaterialActive = (material) => material?.active ?? true;
const activeMaterialsCount = computed(() => materials.value.filter(isMaterialActive).length);
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

const coreSetupMenu = [
  { label: __('Sizes', 'all-signs-options-pro'), icon: MaximizeIcon, route: 'Simple-Sizes' },
  { label: __('Pricing', 'all-signs-options-pro'), icon: DollarSignIcon, route: 'Simple-Discounts' },
  { label: __('Fonts', 'all-signs-options-pro'), icon: TypeIcon, route: 'Simple-TextImages' },
  { label: __('Colors', 'all-signs-options-pro'), icon: PaletteIcon, route: 'Simple-Colors' },
  { label: __('Fixing Methods', 'all-signs-options-pro'), icon: WrenchIcon, route: 'Simple-FixingMethods' },
  { label: __('Shapes', 'all-signs-options-pro'), icon: ShapesIcon, route: 'Simple-Shapes' },
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

const navigateTo = (routeName) => {
  router.push({
    name: routeName,
    params: {
      ...route.params,
      materialId: activeMaterialIndex.value,
      material: String(activeName.value).toLowerCase().replace(/\s+/g, '-')
    }
  });
};

const navigateConfigRoute = (routeName) => {
  router.push({
    name: routeName,
    params: {
      config: String(config.value).replace(/\s+/g, '-'),
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

  navigateTo(item.route);
};

const isSectionOpen = (key) => openSections.value.includes(key);
const toggleSection = (key) => {
  openSections.value = isSectionOpen(key)
    ? openSections.value.filter(item => item !== key)
    : [...openSections.value, key];
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
    const result = await api.getMaterials(configID.value);
    if (!result.message) {
      materials.value = result.map(m => ({ ...m, active: m?.active ?? true }));
    }
  } finally { isFetching.value = false; }
};

const syncActiveIndexFromRoute = () => {
  const idx = Number.parseInt(String(route.params.materialId ?? ''), 10);
  if (Number.isFinite(idx) && idx >= 0 && idx < materials.value.length) {
    activeMaterialIndex.value = idx;
  }
};

const redirectToMaterial = (idx, name, type) => {
  activeMaterialIndex.value = idx;
  navigateTo(enforcedMaterialType.value === 'advance' ? 'Material-Advance' : 'Simple-Sizes');
};

const goToPreview = (c) => router.push({ name: 'preview-back', params: { configId: configID.value, config: String(config.value).replace(/\s+/g, '-') } });

const resetMaterialForm = () => {
  newMaterial.value = {
    name: "",
    description: "",
    icon: "",
    popImg: "",
    type: enforcedMaterialType.value,
    active: true,
  };
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

const selectMaterialIcon = (e) => {
  e.preventDefault();
  const uploader = wp.media({ title: __("Select Icon", "all-signs-options-pro"), button: { text: __("Select Icon", "all-signs-options-pro") }, multiple: false })
    .on('select', () => {
      const attachment = uploader.state().get('selection').first().toJSON();
      if (attachment.type === "image") newMaterial.value.icon = attachment.url;
    }).open();
};

onMounted(async () => {
  try {
    const cfg = await api.getConfig(configID.value);
    configurationMeta.value = cfg || {};
    enforcedMaterialType.value = cfg?.materialType === 'advance' ? 'advance' : 'simple';
  } catch (e) {}
  await fetchMaterials();
  await fetchCustomizerSignsSettings();
  syncActiveIndexFromRoute();

  if (route.name === 'materials' && materials.value.length > 0) {
    redirectToMaterial(0, materials.value[0].name, materials.value[0].type);
  }
});

watch(() => route.params.materialId, syncActiveIndexFromRoute);
watch(sectionByRoute, (section) => {
  if (section && !openSections.value.includes(section)) {
    openSections.value = [...openSections.value, section];
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
  const result = await api.addMaterial(configID.value, newMaterial.value);
  isLoading.value = false;

  if (result.success) {
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
  const result = await api.updateMaterial(configID.value, materialId.value, newMaterial.value);
  isLoading.value = false;

  if (result.success) {
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
  height: calc(100vh - 58px);
  align-self: flex-start;
  gap: 8px;
}

.asowp-config-card,
.asowp-config-nav-card {
  border-color: #dfe3e8;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
}

.asowp-config-card {
  padding: 14px;
}

.asowp-config-nav-card {
  padding: 14px 16px;
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
  background: #f6f6f7;
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
</style>
