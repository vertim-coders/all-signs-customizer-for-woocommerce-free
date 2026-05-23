<template>
  <main class="asowp-request-quotes-page">
    <header class="asowp-request-quotes-heading">
      <h1>{{ __("Request quotes", "all-signs-options-pro") }}</h1>
      <p>{{ requestQuotes.length }} {{ requestQuotes.length === 1 ? __("request stored", "all-signs-options-pro") : __("request stored", "all-signs-options-pro") }}</p>
    </header>

    <section class="asowp-request-quotes-layout">
      <article class="asowp-request-quotes-card asowp-request-quotes-list-card">
        <header>
          <h2>{{ __("Stored request quotes", "all-signs-options-pro") }}</h2>
          <p>{{ __("Read the customer request and download the uploaded files.", "all-signs-options-pro") }}</p>
        </header>

        <div v-if="requestQuotes.length === 0" class="asowp-request-quotes-empty">
          {{ __("No request quote has been saved yet.", "all-signs-options-pro") }}
        </div>

        <button
          v-for="quote in requestQuotes"
          v-else
          :key="quote.id"
          type="button"
          class="asowp-request-quotes-row"
          :class="{ 'is-active': selectedQuote && selectedQuote.id === quote.id }"
          @click="selectedQuote = quote"
        >
          <span>
            <strong>{{ quote.customer || __("Unknown customer", "all-signs-options-pro") }}</strong>
            <small>{{ quote.email }}</small>
          </span>
          <span>{{ quote.date }}</span>
        </button>
      </article>

      <aside class="asowp-request-quotes-card asowp-request-quotes-detail-card">
        <template v-if="selectedQuote">
          <h2>{{ selectedQuote.customer || __("Quote details", "all-signs-options-pro") }}</h2>
          <dl>
            <div>
              <dt>{{ __("Email", "all-signs-options-pro") }}</dt>
              <dd>{{ selectedQuote.email || "-" }}</dd>
            </div>
            <div>
              <dt>{{ __("Message", "all-signs-options-pro") }}</dt>
              <dd>{{ selectedQuote.message || "-" }}</dd>
            </div>
          </dl>
        </template>
        <p v-else>{{ __("Select a quote to see details.", "all-signs-options-pro") }}</p>
      </aside>
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { __ } from "@wordpress/i18n";

const requestQuotes = ref([]);
const selectedQuote = ref(null);
</script>

<style>
.asowp-request-quotes-page,
.asowp-request-quotes-page * {
  box-sizing: border-box;
}

.asowp-request-quotes-page {
  min-height: calc(100vh - 32px);
  padding: 42px 48px 80px;
  background: #f3f3f3;
  color: #303030;
  font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif;
}

.asowp-request-quotes-heading {
  width: min(1186px, 100%);
  margin: 0 auto 30px;
}

.asowp-request-quotes-heading h1 {
  margin: 0;
  color: #111827;
  font-size: 24px;
  line-height: 30px;
  font-weight: 750;
}

.asowp-request-quotes-heading p {
  margin: 3px 0 0;
  color: #4b5563;
  font-size: 14px;
  line-height: 20px;
}

.asowp-request-quotes-layout {
  width: min(1186px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(320px, 1fr);
  gap: 20px;
  align-items: start;
}

.asowp-request-quotes-card {
  background: #ffffff;
  border: 1px solid #dfe3e8;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
}

.asowp-request-quotes-list-card {
  min-height: 202px;
  padding: 38px 39px;
}

.asowp-request-quotes-list-card header {
  padding-bottom: 22px;
  border-bottom: 1px solid #e5e7eb;
}

.asowp-request-quotes-list-card h2,
.asowp-request-quotes-detail-card h2 {
  margin: 0;
  color: #303030;
  font-size: 16px;
  line-height: 22px;
  font-weight: 700;
}

.asowp-request-quotes-list-card header p {
  margin: 6px 0 0;
  color: #616161;
  font-size: 15px;
  line-height: 22px;
}

.asowp-request-quotes-empty {
  padding-top: 22px;
  color: #303030;
  font-size: 15px;
  line-height: 22px;
}

.asowp-request-quotes-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  color: #303030;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
  cursor: pointer;
}

.asowp-request-quotes-row:hover,
.asowp-request-quotes-row:focus,
.asowp-request-quotes-row:active {
  color: #303030;
  background: transparent;
  outline: none;
  box-shadow: none;
}

.asowp-request-quotes-row strong,
.asowp-request-quotes-row small {
  display: block;
}

.asowp-request-quotes-row strong {
  font-size: 14px;
  line-height: 20px;
}

.asowp-request-quotes-row small,
.asowp-request-quotes-row > span:last-child {
  color: #616161;
  font-size: 12px;
  line-height: 18px;
}

.asowp-request-quotes-detail-card {
  min-height: 106px;
  padding: 39px 39px;
}

.asowp-request-quotes-detail-card p {
  margin: 0;
  color: #303030;
  font-size: 15px;
  line-height: 22px;
}

.asowp-request-quotes-detail-card dl {
  display: grid;
  gap: 16px;
  margin: 18px 0 0;
}

.asowp-request-quotes-detail-card dt {
  margin: 0 0 4px;
  color: #616161;
  font-size: 12px;
  line-height: 17px;
}

.asowp-request-quotes-detail-card dd {
  margin: 0;
  color: #303030;
  font-size: 14px;
  line-height: 20px;
}

@media (max-width: 980px) {
  .asowp-request-quotes-page {
    padding: 28px 16px 60px;
  }

  .asowp-request-quotes-layout {
    grid-template-columns: 1fr;
  }
}
</style>
