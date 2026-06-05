<template>
  <div class="asowp-global-output">
    <section v-if="isFetching" class="asowp-output-loader asowp-shopify-card">
      <img :src="loadingIcon" alt="" class="asowp-output-loader-icon" />
    </section>

    <template v-else>
      <section class="asowp-output-hero asowp-shopify-card">
        <h2>{{ __("Output", "all-signs-options-pro") }}</h2>
        <p>{{ __("Configure exported file naming and output notification emails.", "all-signs-options-pro") }}</p>
      </section>

      <form class="asowp-output-form" @submit.prevent="updateGlobalOutput">
        <section class="asowp-output-card asowp-shopify-card">
          <h3>{{ __("File Naming", "all-signs-options-pro") }}</h3>
          <div class="asowp-output-setting-row">
            <div>
              <div class="asowp-output-toggle-line">
                <strong>{{ __("Use order id as zip name", "all-signs-options-pro") }}</strong>
                <label class="asowp-output-switch">
                  <input type="checkbox" v-model="output.zipName" />
                  <span></span>
                </label>
              </div>
              <p>{{ __("Use the order id as the zip filename for uploaded customization assets.", "all-signs-options-pro") }}</p>
            </div>
          </div>
        </section>

        <section class="asowp-output-card asowp-shopify-card">
          <h3>{{ __("Notifications", "all-signs-options-pro") }}</h3>
          <div class="asowp-output-notification-toggles">
            <div class="asowp-output-toggle-line">
              <strong>{{ __("Send email to customer", "all-signs-options-pro") }}</strong>
              <label class="asowp-output-switch">
                <input type="checkbox" v-model="output.enableSendMailToCustom" />
                <span></span>
              </label>
            </div>

            <div class="asowp-output-toggle-line">
              <strong>{{ __("Send email to admin", "all-signs-options-pro") }}</strong>
              <label class="asowp-output-switch">
                <input type="checkbox" v-model="output.enableSendMailToAdmin" />
                <span></span>
              </label>
            </div>
          </div>

          <label class="asowp-output-field">
            <span>{{ __("Admin recipient emails", "all-signs-options-pro") }}</span>
            <input
              v-model.trim="output.ouputReceiverMails"
              type="text"
              class="asowp-shopify-input"
              autocomplete="off"
            />
            <small>{{ __("Separate multiple emails with commas.", "all-signs-options-pro") }}</small>
          </label>
        </section>

        <div class="asowp-output-actions">
          <button type="submit" class="asowp-shopify-button-primary" :disabled="isLoading">
            <Loader2Icon v-if="isLoading" class="asowp-output-save-loader" />
            {{ __("Save Output", "all-signs-options-pro") }}
          </button>
        </div>
      </form>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Loader2Icon } from "lucide-vue-next";
import api from "@/admin/Api/api";
import toastMessage from "@/admin/utils/functions";
import { __ } from "@wordpress/i18n";

const loadingIcon = `${String(window?.asowp_data?.assets_url || "").replace(/\/$/, "")}/icons/ic_loading.svg`;

const defaultOutput = () => ({
  zipName: true,
  calculateOutput: true,
  enableSendMailToCustom: true,
  enableSendMailToAdmin: true,
  ouputReceiverMails: "",
});

const isFetching = ref(false);
const isLoading = ref(false);
const output = ref(defaultOutput());

const normalizeOutput = (raw = {}) => {
  const source = raw && !raw.message ? raw : {};
  return {
    ...defaultOutput(),
    ...source,
    zipName: source.zipName ?? source.useOrderIdAsZipName ?? defaultOutput().zipName,
    calculateOutput: source.calculateOutput ?? defaultOutput().calculateOutput,
    enableSendMailToCustom: source.enableSendMailToCustom ?? source.mailCustomer ?? defaultOutput().enableSendMailToCustom,
    enableSendMailToAdmin: source.enableSendMailToAdmin ?? source.mailAdmin ?? defaultOutput().enableSendMailToAdmin,
    ouputReceiverMails: source.ouputReceiverMails ?? source.outputReceiverMails ?? source.receiverMails ?? "",
  };
};

const fetchGlobalOutput = async () => {
  isFetching.value = true;
  try {
    output.value = normalizeOutput(await api.getGlobalSettingsOutput());
  } finally {
    isFetching.value = false;
  }
};

const updateGlobalOutput = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  try {
    const payload = normalizeOutput(output.value);
    const result = await api.updateGlobalSettingsOutput(payload);
    if (result?.success) {
      output.value = payload;
      toastMessage(result.message, result.success === "same" ? "warning" : undefined);
    } else {
      toastMessage(result?.message || __("The output settings update failed", "all-signs-options-pro"), "error");
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchGlobalOutput);
</script>

<style scoped>
.asowp-global-output {
  display: grid;
  gap: 12px;
  margin: 10px 0 0;
  color: var(--asowp-shopify-text);
}

.asowp-output-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 306px;
}

.asowp-output-loader-icon {
  width: 200px;
  height: 200px;
}

.asowp-output-hero {
  padding: 24px 28px;
}

.asowp-output-hero h2,
.asowp-output-card h3 {
  margin: 0;
  color: var(--asowp-shopify-text);
  font-weight: var(--asowp-shopify-weight-heavy);
}

.asowp-output-hero h2 {
  font-size: 20px;
  line-height: 26px;
}

.asowp-output-hero p {
  margin: 4px 0 0;
  color: var(--asowp-shopify-text-subdued);
  font-size: 13px;
  line-height: 18px;
}

.asowp-output-form {
  display: grid;
  gap: 12px;
}

.asowp-output-card {
  padding: 24px 28px;
}

.asowp-output-card h3 {
  font-size: 14px;
  line-height: 20px;
}

.asowp-output-setting-row {
  margin-top: 16px;
}

.asowp-output-toggle-line {
  display: inline-flex;
  align-items: center;
  gap: 16px;
}

.asowp-output-toggle-line strong {
  color: var(--asowp-shopify-text);
  font-size: 13px;
  line-height: 20px;
  font-weight: var(--asowp-shopify-weight-bold);
}

.asowp-output-card p,
.asowp-output-field small {
  display: block;
  margin: 6px 0 0;
  color: var(--asowp-shopify-text-subdued);
  font-size: 13px;
  line-height: 18px;
}

.asowp-output-notification-toggles {
  display: flex;
  align-items: center;
  gap: 34px;
  margin-top: 16px;
  margin-bottom: 22px;
  flex-wrap: wrap;
}

.asowp-output-field {
  display: grid;
  gap: 6px;
}

.asowp-output-field span {
  color: var(--asowp-shopify-text);
  font-size: 13px;
  line-height: 18px;
}

.asowp-output-actions {
  display: flex;
  justify-content: flex-end;
}

.asowp-output-actions .asowp-shopify-button-primary {
  min-height: 30px;
  padding: 6px 12px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 800;
}

.asowp-output-save-loader {
  width: 15px;
  height: 15px;
  margin-right: 7px;
  animation: asowp-shopify-spin 0.8s linear infinite;
}

.asowp-output-switch {
  position: relative;
  display: inline-flex;
  width: 40px;
  height: 24px;
  flex: 0 0 auto;
  cursor: pointer;
}

.asowp-output-switch input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.asowp-output-switch span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: #cfd8e6;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.04);
  transition: background-color 120ms ease;
}

.asowp-output-switch span::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 2px 5px rgba(15, 23, 42, 0.24);
  transition: transform 120ms ease;
}

.asowp-output-switch input:checked + span {
  background: #007a72;
}

.asowp-output-switch input:checked + span::after {
  transform: translateX(16px);
}
</style>
