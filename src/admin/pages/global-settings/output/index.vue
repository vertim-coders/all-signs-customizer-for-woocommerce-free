<template>
  <div class="ascwo-global-output">
    <section v-if="isFetching" class="ascwo-output-loader ascwo-ui-card">
      <img :src="loadingIcon" alt="" class="ascwo-output-loader-icon" />
    </section>

    <template v-else>
      <section class="ascwo-output-hero ascwo-ui-card">
        <h2>{{ __("Output", "all-signs-customizer-for-woocommerce") }}</h2>
        <p>{{ __("Configure exported file naming and output notification emails.", "all-signs-customizer-for-woocommerce") }}</p>
      </section>

      <form class="ascwo-output-form" @submit.prevent="updateGlobalOutput">
        <section class="ascwo-output-card ascwo-ui-card">
          <h3>{{ __("File Naming", "all-signs-customizer-for-woocommerce") }}</h3>
          <div class="ascwo-output-setting-row">
            <div>
              <div class="ascwo-output-toggle-line">
                <strong>{{ __("Use order id as zip name", "all-signs-customizer-for-woocommerce") }}</strong>
                <label class="ascwo-output-switch">
                  <input type="checkbox" v-model="output.zipName" />
                  <span></span>
                </label>
              </div>
              <p>{{ __("Use the order id as the zip filename for uploaded customization assets.", "all-signs-customizer-for-woocommerce") }}</p>
            </div>
          </div>
        </section>

        <section class="ascwo-output-card ascwo-ui-card">
          <h3>{{ __("Notifications", "all-signs-customizer-for-woocommerce") }}</h3>
          <div class="ascwo-output-notification-toggles">
            <div class="ascwo-output-toggle-line">
              <strong>{{ __("Send email to customer", "all-signs-customizer-for-woocommerce") }}</strong>
              <label class="ascwo-output-switch">
                <input type="checkbox" v-model="output.enableSendMailToCustom" />
                <span></span>
              </label>
            </div>

            <div class="ascwo-output-toggle-line">
              <strong>{{ __("Send email to admin", "all-signs-customizer-for-woocommerce") }}</strong>
              <label class="ascwo-output-switch">
                <input type="checkbox" v-model="output.enableSendMailToAdmin" />
                <span></span>
              </label>
            </div>
          </div>

          <label class="ascwo-output-field">
            <span>{{ __("Admin recipient emails", "all-signs-customizer-for-woocommerce") }}</span>
            <input
              v-model.trim="output.ouputReceiverMails"
              type="text"
              class="ascwo-ui-input"
              autocomplete="off"
            />
            <small>{{ __("Separate multiple emails with commas.", "all-signs-customizer-for-woocommerce") }}</small>
          </label>
        </section>

        <div class="ascwo-output-actions">
          <button type="submit" class="ascwo-ui-button-primary" :disabled="isLoading">
            <Loader2Icon v-if="isLoading" class="ascwo-output-save-loader" />
            {{ __("Save Output", "all-signs-customizer-for-woocommerce") }}
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

const loadingIcon = `${String(window?.ascwo_data?.assets_url || "").replace(/\/$/, "")}/icons/ic_loading.svg`;

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
      toastMessage(result?.message || __("The output settings update failed", "all-signs-customizer-for-woocommerce"), "error");
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchGlobalOutput);
</script>

<style scoped>
.ascwo-global-output {
  display: grid;
  gap: 12px;
  margin: 10px 0 0;
  color: var(--ascwo-ui-text);
}

.ascwo-output-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 306px;
}

.ascwo-output-loader-icon {
  width: 200px;
  height: 200px;
}

.ascwo-output-hero {
  padding: 24px 28px;
}

.ascwo-output-hero h2,
.ascwo-output-card h3 {
  margin: 0;
  color: var(--ascwo-ui-text);
  font-weight: var(--ascwo-ui-weight-heavy);
}

.ascwo-output-hero h2 {
  font-size: 20px;
  line-height: 26px;
}

.ascwo-output-hero p {
  margin: 4px 0 0;
  color: var(--ascwo-ui-text-subdued);
  font-size: 13px;
  line-height: 18px;
}

.ascwo-output-form {
  display: grid;
  gap: 12px;
}

.ascwo-output-card {
  padding: 24px 28px;
}

.ascwo-output-card h3 {
  font-size: 14px;
  line-height: 20px;
}

.ascwo-output-setting-row {
  margin-top: 16px;
}

.ascwo-output-toggle-line {
  display: inline-flex;
  align-items: center;
  gap: 16px;
}

.ascwo-output-toggle-line strong {
  color: var(--ascwo-ui-text);
  font-size: 13px;
  line-height: 20px;
  font-weight: var(--ascwo-ui-weight-bold);
}

.ascwo-output-card p,
.ascwo-output-field small {
  display: block;
  margin: 6px 0 0;
  color: var(--ascwo-ui-text-subdued);
  font-size: 13px;
  line-height: 18px;
}

.ascwo-output-notification-toggles {
  display: flex;
  align-items: center;
  gap: 34px;
  margin-top: 16px;
  margin-bottom: 22px;
  flex-wrap: wrap;
}

.ascwo-output-field {
  display: grid;
  gap: 6px;
}

.ascwo-output-field span {
  color: var(--ascwo-ui-text);
  font-size: 13px;
  line-height: 18px;
}

.ascwo-output-actions {
  display: flex;
  justify-content: flex-end;
}

.ascwo-output-actions .ascwo-ui-button-primary {
  min-height: 30px;
  padding: 6px 12px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 800;
}

.ascwo-output-save-loader {
  width: 15px;
  height: 15px;
  margin-right: 7px;
  animation: ascwo-ui-spin 0.8s linear infinite;
}

.ascwo-output-switch {
  position: relative;
  display: inline-flex;
  width: 40px;
  height: 24px;
  flex: 0 0 auto;
  cursor: pointer;
}

.ascwo-output-switch input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.ascwo-output-switch span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: #cfd8e6;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.04);
  transition: background-color 120ms ease;
}

.ascwo-output-switch span::after {
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

.ascwo-output-switch input:checked + span {
  background: #007a72;
}

.ascwo-output-switch input:checked + span::after {
  transform: translateX(16px);
}
</style>
