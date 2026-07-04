<template>
  <main class="ascwo-request-quotes-page">
    <header class="ascwo-request-quotes-heading">
      <h1>{{ __("Request quotes", "all-signs-customizer-for-woocommerce") }}</h1>
      <p>{{ totalCount }} {{ totalCount === 1 ? __("request stored", "all-signs-customizer-for-woocommerce") : __("requests stored", "all-signs-customizer-for-woocommerce") }}</p>
    </header>

    <section class="ascwo-request-quotes-layout">
      <article class="ascwo-request-quotes-card ascwo-request-quotes-list-card">
        <header>
          <div>
            <h2>{{ __("Stored request quotes", "all-signs-customizer-for-woocommerce") }}</h2>
            <p>{{ __("Read the customer request and download the uploaded files.", "all-signs-customizer-for-woocommerce") }}</p>
          </div>
          <button type="button" class="ascwo-request-quotes-refresh" :disabled="isLoading" @click="loadQuotes">
            <RefreshCwIcon :class="{ 'is-spinning': isLoading }" />
          </button>
        </header>

        <div v-if="isLoading" class="ascwo-request-quotes-loader">
          <img :src="loadingIcon" alt="" />
        </div>

        <div v-else-if="requestQuotes.length === 0" class="ascwo-request-quotes-empty">
          {{ __("No request quote has been saved yet.", "all-signs-customizer-for-woocommerce") }}
        </div>

        <div v-else class="ascwo-request-quotes-table-wrap">
          <table class="ascwo-request-quotes-table">
            <thead>
              <tr>
                <th>{{ __("Created", "all-signs-customizer-for-woocommerce") }}</th>
                <th>{{ __("Customer", "all-signs-customizer-for-woocommerce") }}</th>
                <th>{{ __("Product", "all-signs-customizer-for-woocommerce") }}</th>
                <th>{{ __("Files", "all-signs-customizer-for-woocommerce") }}</th>
                <th>{{ __("Status", "all-signs-customizer-for-woocommerce") }}</th>
                <th>{{ __("Action", "all-signs-customizer-for-woocommerce") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="quote in requestQuotes"
                :key="quote.id"
                :class="{ 'is-active': selectedQuote && selectedQuote.id === quote.id }"
              >
                <td>{{ formatDate(quote.createdAt) }}</td>
                <td>
                  <strong>{{ customerName(quote) }}</strong>
                  <small>{{ quote.customer?.email || "-" }}</small>
                </td>
                <td>
                  <span>{{ quote.productType || "n/a" }}</span>
                  <small>{{ quote.configId ? `Config ${quote.configId}` : __("No config id", "all-signs-customizer-for-woocommerce") }}</small>
                </td>
                <td>{{ quote.files?.length || 0 }}</td>
                <td>
                  <span class="ascwo-request-quotes-badge" :class="`is-${statusTone(quote.status)}`">{{ quote.status || "pending" }}</span>
                </td>
                <td>
                  <button type="button" class="ascwo-request-quotes-view" @click="selectQuote(quote)">
                    {{ __("View", "all-signs-customizer-for-woocommerce") }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      <aside class="ascwo-request-quotes-card ascwo-request-quotes-detail-card">
        <template v-if="selectedQuote">
          <header>
            <div>
              <h2>{{ __("Quote details", "all-signs-customizer-for-woocommerce") }}</h2>
              <p>ID {{ selectedQuote.id }}</p>
            </div>
            <span class="ascwo-request-quotes-badge" :class="`is-${statusTone(selectedQuote.status)}`">{{ selectedQuote.status || "pending" }}</span>
          </header>

          <div class="ascwo-request-quotes-detail-group">
            <h3>{{ __("Customer", "all-signs-customizer-for-woocommerce") }}</h3>
            <p>{{ customerName(selectedQuote) }}</p>
            <p>{{ selectedQuote.customer?.email || __("No email provided", "all-signs-customizer-for-woocommerce") }}</p>
            <p>{{ selectedQuote.customer?.phone || __("No phone provided", "all-signs-customizer-for-woocommerce") }}</p>
          </div>

          <div class="ascwo-request-quotes-detail-group">
            <h3>{{ __("Message", "all-signs-customizer-for-woocommerce") }}</h3>
            <p>{{ selectedQuote.customer?.message || __("No message provided", "all-signs-customizer-for-woocommerce") }}</p>
          </div>

          <div class="ascwo-request-quotes-detail-group">
            <h3>{{ __("Files", "all-signs-customizer-for-woocommerce") }}</h3>
            <p v-if="!selectedQuote.files || selectedQuote.files.length === 0">{{ __("No uploaded file.", "all-signs-customizer-for-woocommerce") }}</p>
            <a
              v-for="(file, index) in selectedQuote.files"
              v-else
              :key="`${selectedQuote.id}-${file.name}-${index}`"
              class="ascwo-request-quotes-file"
              :href="downloadUrl(selectedQuote, index)"
              target="_blank"
              rel="noopener"
            >
              <span>{{ file.name }}</span>
              <DownloadIcon />
            </a>
          </div>

          <div class="ascwo-request-quotes-detail-group">
            <h3>{{ __("Technical data", "all-signs-customizer-for-woocommerce") }}</h3>
            <p>{{ __("Created:", "all-signs-customizer-for-woocommerce") }} {{ formatDate(selectedQuote.createdAt) }}</p>
            <p>{{ __("Product type:", "all-signs-customizer-for-woocommerce") }} {{ selectedQuote.productType || "-" }}</p>
            <p>{{ __("Notified:", "all-signs-customizer-for-woocommerce") }} {{ selectedQuote.notifiedAt ? formatDate(selectedQuote.notifiedAt) : __("No", "all-signs-customizer-for-woocommerce") }}</p>
            <p>{{ __("Source content type:", "all-signs-customizer-for-woocommerce") }} {{ selectedQuote.source?.contentType || "-" }}</p>
          </div>

          <div v-if="selectedQuote.previewImg" class="ascwo-request-quotes-detail-group">
            <h3>{{ __("Preview", "all-signs-customizer-for-woocommerce") }}</h3>
            <img class="ascwo-request-quotes-preview" :src="selectedQuote.previewImg" alt="" />
          </div>

          <footer>
            <button
              type="button"
              class="ascwo-request-quotes-mark"
              :disabled="isSaving || selectedQuote.status === 'notified'"
              @click="markAsNotified"
            >
              <Loader2Icon v-if="isSaving" class="is-spinning" />
              <span>{{ selectedQuote.status === "notified" ? __("Already notified", "all-signs-customizer-for-woocommerce") : __("Mark as notified", "all-signs-customizer-for-woocommerce") }}</span>
            </button>
          </footer>
        </template>
        <p v-else>{{ __("Select a quote to see details.", "all-signs-customizer-for-woocommerce") }}</p>
      </aside>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { __ } from "@wordpress/i18n";
import { DownloadIcon, Loader2Icon, RefreshCwIcon } from "lucide-vue-next";
import api from "@/admin/Api/api";

const requestQuotes = ref([]);
const selectedQuote = ref(null);
const isLoading = ref(true);
const isSaving = ref(false);
const loadingIcon = `${String(ascwo_data.assets_url || "").replace(/\/$/, "")}/icons/ic_loading.svg`;

const totalCount = computed(() => requestQuotes.value.length);

const loadQuotes = async () => {
  isLoading.value = true;
  try {
    const result = await api.getRequestQuotes();
    requestQuotes.value = Array.isArray(result.quotes) ? result.quotes : [];
    if (!selectedQuote.value && requestQuotes.value.length > 0) {
      selectedQuote.value = requestQuotes.value[0];
    }
    if (selectedQuote.value) {
      selectedQuote.value =
        requestQuotes.value.find((quote) => quote.id === selectedQuote.value.id) ||
        requestQuotes.value[0] ||
        null;
    }
  } finally {
    isLoading.value = false;
  }
};

const selectQuote = (quote) => {
  selectedQuote.value = quote;
};

const customerName = (quote) => {
  const firstName = quote?.customer?.firstName || "";
  const lastName = quote?.customer?.lastName || "";
  const name = `${firstName} ${lastName}`.trim();
  return name || quote?.customer?.email || __("Anonymous customer", "all-signs-customizer-for-woocommerce");
};

const formatDate = (value) => {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const statusTone = (status = "") => {
  const normalized = String(status).trim().toLowerCase();
  if (["read", "handled", "replied", "notified"].includes(normalized)) {
    return "success";
  }
  if (["archived", "closed"].includes(normalized)) {
    return "critical";
  }
  return "attention";
};

const downloadUrl = (quote, fileIndex) => {
  return `${String(ascwo_data.rest_url || "").replace(/\/$/, "")}/request-quotes/${quote.id}/download/${fileIndex}`;
};

const markAsNotified = async () => {
  if (!selectedQuote.value) {
    return;
  }

  isSaving.value = true;
  try {
    const result = await api.updateRequestQuote(selectedQuote.value.id, {
      intent: "mark-notified",
    });
    if (result.quote) {
      selectedQuote.value = result.quote;
      requestQuotes.value = requestQuotes.value.map((quote) =>
        quote.id === result.quote.id ? result.quote : quote
      );
    }
  } finally {
    isSaving.value = false;
  }
};

onMounted(loadQuotes);
</script>

<style>
.ascwo-request-quotes-page,
.ascwo-request-quotes-page * {
  box-sizing: border-box;
}

.ascwo-request-quotes-page {
  min-height: calc(100vh - 32px);
  padding: 42px 48px 80px;
  background: #f3f3f3;
  color: #303030;
  font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif;
}

.ascwo-request-quotes-heading,
.ascwo-request-quotes-layout {
  width: min(1186px, 100%);
  margin: 0 auto;
}

.ascwo-request-quotes-heading {
  margin-bottom: 30px;
}

.ascwo-request-quotes-heading h1 {
  margin: 0;
  color: #111827;
  font-size: 24px;
  line-height: 30px;
  font-weight: 750;
}

.ascwo-request-quotes-heading p {
  margin: 3px 0 0;
  color: #4b5563;
  font-size: 14px;
  line-height: 20px;
}

.ascwo-request-quotes-layout {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(320px, 1fr);
  gap: 20px;
  align-items: start;
}

.ascwo-request-quotes-card {
  background: #ffffff;
  border: 1px solid #dfe3e8;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
}

.ascwo-request-quotes-list-card {
  min-height: 202px;
  padding: 38px 39px;
}

.ascwo-request-quotes-list-card > header,
.ascwo-request-quotes-detail-card > header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.ascwo-request-quotes-list-card > header {
  padding-bottom: 22px;
  border-bottom: 1px solid #e5e7eb;
}

.ascwo-request-quotes-list-card h2,
.ascwo-request-quotes-detail-card h2 {
  margin: 0;
  color: #303030;
  font-size: 16px;
  line-height: 22px;
  font-weight: 700;
}

.ascwo-request-quotes-list-card header p,
.ascwo-request-quotes-detail-card header p {
  margin: 6px 0 0;
  color: #616161;
  font-size: 15px;
  line-height: 22px;
}

.ascwo-request-quotes-refresh {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  color: #303030;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  cursor: pointer;
}

.ascwo-request-quotes-refresh svg {
  width: 16px;
  height: 16px;
}

.ascwo-request-quotes-refresh:hover,
.ascwo-request-quotes-refresh:focus,
.ascwo-request-quotes-refresh:active {
  color: #303030;
  background: #ffffff;
  border-color: #b8c0ca;
  outline: none;
  box-shadow: none;
}

.ascwo-request-quotes-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 118px;
}

.ascwo-request-quotes-loader img {
  width: 42px;
  height: 42px;
}

.ascwo-request-quotes-empty {
  padding-top: 22px;
  color: #303030;
  font-size: 15px;
  line-height: 22px;
}

.ascwo-request-quotes-table-wrap {
  padding-top: 14px;
  overflow-x: auto;
}

.ascwo-request-quotes-table {
  width: 100%;
  border-collapse: collapse;
  color: #303030;
}

.ascwo-request-quotes-table th {
  padding: 12px 12px;
  color: #616161;
  background: #f7f7f7;
  border: 0;
  border-bottom: 1px solid #e0e0e0;
  font-size: 13px;
  line-height: 18px;
  font-weight: 650;
  text-align: left;
}

.ascwo-request-quotes-table td {
  padding: 14px 12px;
  border: 0;
  border-bottom: 1px solid #e5e7eb;
  font-size: 13px;
  line-height: 18px;
  vertical-align: middle;
}

.ascwo-request-quotes-table tr.is-active td {
  background: #f8fbff;
}

.ascwo-request-quotes-table strong,
.ascwo-request-quotes-table small {
  display: block;
}

.ascwo-request-quotes-table strong {
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
}

.ascwo-request-quotes-table small {
  color: #616161;
  font-size: 12px;
  line-height: 18px;
}

.ascwo-request-quotes-badge {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 10px;
  color: #5f4b00;
  background: #fff1b8;
  border-radius: 999px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
}

.ascwo-request-quotes-badge.is-success {
  color: #075e54;
  background: #dff5ee;
}

.ascwo-request-quotes-badge.is-critical {
  color: #8a1f11;
  background: #fde2dd;
}

.ascwo-request-quotes-view,
.ascwo-request-quotes-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  padding: 0 14px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
  cursor: pointer;
}

.ascwo-request-quotes-view {
  color: #303030;
  background: #ffffff;
  border: 1px solid #d0d5dd;
}

.ascwo-request-quotes-view:hover,
.ascwo-request-quotes-view:focus,
.ascwo-request-quotes-view:active {
  color: #303030;
  background: #ffffff;
  border-color: #b8c0ca;
  outline: none;
  box-shadow: none;
}

.ascwo-request-quotes-detail-card {
  min-height: 106px;
  padding: 39px 39px;
}

.ascwo-request-quotes-detail-card > p,
.ascwo-request-quotes-detail-group p {
  margin: 0;
  color: #303030;
  font-size: 15px;
  line-height: 22px;
}

.ascwo-request-quotes-detail-group {
  display: grid;
  gap: 7px;
  padding: 18px 0;
  border-bottom: 1px solid #e5e7eb;
}

.ascwo-request-quotes-detail-group h3 {
  margin: 0;
  color: #303030;
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
}

.ascwo-request-quotes-file {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 34px;
  padding: 0 12px;
  color: #303030;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 650;
}

.ascwo-request-quotes-file svg {
  width: 15px;
  height: 15px;
}

.ascwo-request-quotes-preview {
  display: block;
  max-width: 100%;
  height: auto;
  border: 1px solid #dfe3e8;
  border-radius: 8px;
}

.ascwo-request-quotes-detail-card footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 18px;
}

.ascwo-request-quotes-mark {
  gap: 8px;
  color: #ffffff;
  background: #00796b;
  border: 1px solid #005f54;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
}

.ascwo-request-quotes-mark:hover,
.ascwo-request-quotes-mark:focus,
.ascwo-request-quotes-mark:active {
  color: #ffffff;
  background: #00796b;
  border-color: #005f54;
  outline: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
}

.ascwo-request-quotes-mark:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.ascwo-request-quotes-mark svg {
  width: 15px;
  height: 15px;
}

.is-spinning {
  animation: ascwo-request-quotes-spin 0.8s linear infinite;
}

@keyframes ascwo-request-quotes-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 980px) {
  .ascwo-request-quotes-page {
    padding: 28px 16px 60px;
  }

  .ascwo-request-quotes-layout {
    grid-template-columns: 1fr;
  }
}
</style>
