<template>
  <div class="ascwo-general">
    <div v-if="isFetching" class="ascwo-general-card ascwo-general-loading">
      <img :src="loadingIcon" alt="" />
    </div>

    <div v-else class="ascwo-general-layout">
      <div class="ascwo-general-main">
        <header class="ascwo-general-card ascwo-general-hero">
          <h1>{{ __('General', 'all-signs-customizer-for-woocommerce') }}</h1>
          <p>{{ __('Work with the classic configuration settings in one page. Each block writes directly into the existing classic settings data.', 'all-signs-customizer-for-woocommerce') }}</p>
        </header>

        <section id="ascwo-general-product" class="ascwo-general-card ascwo-general-section">
          <div class="ascwo-general-section-head">
            <div>
              <h2>{{ __('Product', 'all-signs-customizer-for-woocommerce') }}</h2>
              <p>{{ __('Storefront and add-to-cart behavior, aligned with the standard ASO product settings.', 'all-signs-customizer-for-woocommerce') }}</p>
            </div>
            <button type="button" class="ascwo-general-collapse" @click="toggleSection('product')">
              {{ openSections.product ? __('Show less', 'all-signs-customizer-for-woocommerce') : __('Show more', 'all-signs-customizer-for-woocommerce') }}
              <ChevronUpIcon v-if="openSections.product" />
              <ChevronDownIcon v-else />
            </button>
          </div>

          <div v-if="openSections.product">
            <div class="ascwo-product-grid">
              <article v-for="item in productCards" :key="item.key" class="ascwo-product-option">
                <h3>{{ item.title }}</h3>
                <label class="ascwo-switch">
                  <input type="checkbox" :checked="Boolean(product[item.key])" @change="item.radio ? setProductRedirect(item.key) : product[item.key] = $event.target.checked">
                  <span></span>
                </label>
                <div class="ascwo-option-rule"></div>
                <p>{{ item.description }}</p>
              </article>
            </div>
            <div class="ascwo-save-row">
              <button type="button" class="ascwo-ui-button-primary ascwo-general-save" :disabled="savingSection === 'product'" @click="saveProduct">
                <Loader2Icon v-if="savingSection === 'product'" class="ascwo-spin" />
                {{ __('Save Product', 'all-signs-customizer-for-woocommerce') }}
              </button>
            </div>
          </div>
        </section>

        <section id="ascwo-general-mode" class="ascwo-general-card ascwo-general-section">
          <div class="ascwo-general-section-head">
            <div>
              <h2>{{ __('Mode', 'all-signs-customizer-for-woocommerce') }}</h2>
              <p>{{ __('Single or multi-selection behavior and share/save capabilities.', 'all-signs-customizer-for-woocommerce') }}</p>
            </div>
            <button type="button" class="ascwo-general-collapse" @click="toggleSection('mode')">
              {{ openSections.mode ? __('Show less', 'all-signs-customizer-for-woocommerce') : __('Show more', 'all-signs-customizer-for-woocommerce') }}
              <ChevronUpIcon v-if="openSections.mode" />
              <ChevronDownIcon v-else />
            </button>
          </div>

          <div v-if="openSections.mode" class="ascwo-nested-card">
            <div class="ascwo-general-section-head ascwo-nested-head">
              <div>
                <h3>{{ __('Mode', 'all-signs-customizer-for-woocommerce') }}</h3>
                <p>{{ __('Control customization mode and customer share/save capabilities.', 'all-signs-customizer-for-woocommerce') }}</p>
              </div>
              <button type="button" class="ascwo-general-collapse" @click="toggleNested('mode')">
                {{ nestedSections.mode ? __('Show less', 'all-signs-customizer-for-woocommerce') : __('Show more', 'all-signs-customizer-for-woocommerce') }}
                <ChevronUpIcon v-if="nestedSections.mode" />
                <ChevronDownIcon v-else />
              </button>
            </div>
            <div v-if="nestedSections.mode">
              <div class="ascwo-toggle-row">
                <div>
                  <strong>{{ __('Allow Share', 'all-signs-customizer-for-woocommerce') }}</strong>
                  <p>{{ __('Let customers share the configured sign.', 'all-signs-customizer-for-woocommerce') }}</p>
                </div>
                <label class="ascwo-switch"><input type="checkbox" v-model="mode.shareAndSave.allowShare"><span></span></label>
              </div>
              <div class="ascwo-toggle-row">
                <div>
                  <strong>{{ __('Allow Save', 'all-signs-customizer-for-woocommerce') }}</strong>
                  <p>{{ __('Let customers save their configuration for later.', 'all-signs-customizer-for-woocommerce') }}</p>
                </div>
                <label class="ascwo-switch"><input type="checkbox" v-model="mode.shareAndSave.allowSave"><span></span></label>
              </div>
              <label class="ascwo-field">
                <span>{{ __('Share Sign Location', 'all-signs-customizer-for-woocommerce') }}</span>
                <select v-model="mode.shareAndSave.shareSignLocation" class="ascwo-ui-input">
                  <option value="options_review">{{ __('Options + Review', 'all-signs-customizer-for-woocommerce') }}</option>
                  <option value="review_only">{{ __('Review only', 'all-signs-customizer-for-woocommerce') }}</option>
                </select>
              </label>
              <div class="ascwo-save-row">
                <button type="button" class="ascwo-ui-button-primary ascwo-general-save" :disabled="savingSection === 'mode'" @click="saveGenericSection('mode', mode)">
                  <Loader2Icon v-if="savingSection === 'mode'" class="ascwo-spin" />
                  {{ __('Save Mode', 'all-signs-customizer-for-woocommerce') }}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="ascwo-general-output" class="ascwo-general-card ascwo-general-section">
          <div class="ascwo-general-section-head">
            <div>
              <h2>{{ __('Output', 'all-signs-customizer-for-woocommerce') }}</h2>
              <p>{{ __('Output formats, watermark and generated file settings.', 'all-signs-customizer-for-woocommerce') }}</p>
            </div>
            <button type="button" class="ascwo-general-collapse" @click="toggleSection('output')">
              {{ openSections.output ? __('Show less', 'all-signs-customizer-for-woocommerce') : __('Show more', 'all-signs-customizer-for-woocommerce') }}
              <ChevronUpIcon v-if="openSections.output" />
              <ChevronDownIcon v-else />
            </button>
          </div>

          <div v-if="openSections.output" class="ascwo-form-stack">
            <label class="ascwo-field">
              <span>{{ __('Output files format', 'all-signs-customizer-for-woocommerce') }}</span>
              <select v-model="output.filesFormat" class="ascwo-ui-input">
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="svg">SVG</option>
                <option value="png+jpeg">PNG + JPEG</option>
                <option value="png+svg">PNG + SVG</option>
                <option value="jpeg+svg">JPEG + SVG</option>
              </select>
            </label>
            <label class="ascwo-field">
              <span>{{ __('PDF Quality (DPI)', 'all-signs-customizer-for-woocommerce') }}</span>
              <select v-model="output.pdfQuality" class="ascwo-ui-input">
                <option value="150">150 DPI</option>
                <option value="300">300 DPI (Quality Print)</option>
                <option value="600">600 DPI</option>
              </select>
            </label>
            <div class="ascwo-field">
              <span>{{ __('Watermark', 'all-signs-customizer-for-woocommerce') }}</span>
              <div class="ascwo-upload-control">
                <button type="button" class="ascwo-ui-button-primary" @click="selectWaterMarkImage">{{ __('Upload image', 'all-signs-customizer-for-woocommerce') }}</button>
                <div class="ascwo-upload-preview">
                  <img v-if="output.waterMark" :src="output.waterMark" alt="">
                  <button v-if="output.waterMark" type="button" @click="output.waterMark = ''">x</button>
                </div>
              </div>
            </div>
            <div class="ascwo-toggle-row">
              <div>
                <strong>{{ __('Zip output files', 'all-signs-customizer-for-woocommerce') }}</strong>
                <p>{{ __('Package generated output files into a zip archive.', 'all-signs-customizer-for-woocommerce') }}</p>
              </div>
              <label class="ascwo-switch"><input type="checkbox" v-model="output.zipOutputFiles.active"><span></span></label>
            </div>
            <label class="ascwo-field">
              <span>{{ __('Zip output folder prefix', 'all-signs-customizer-for-woocommerce') }}</span>
              <input v-model="output.zipOutputFiles.zipOutFolderPrefix" class="ascwo-ui-input" type="text">
            </label>
            <div class="ascwo-toggle-row">
              <div>
                <strong>{{ __('Design composition', 'all-signs-customizer-for-woocommerce') }}</strong>
                <p>{{ __('Include design composition details in the order output.', 'all-signs-customizer-for-woocommerce') }}</p>
              </div>
              <label class="ascwo-switch"><input type="checkbox" v-model="output.designComposition"><span></span></label>
            </div>
            <div class="ascwo-save-row">
              <button type="button" class="ascwo-ui-button-primary ascwo-general-save" :disabled="savingSection === 'output'" @click="saveOutput">
                <Loader2Icon v-if="savingSection === 'output'" class="ascwo-spin" />
                {{ __('Save Output', 'all-signs-customizer-for-woocommerce') }}
              </button>
            </div>
          </div>
        </section>

        <section id="ascwo-general-upload" class="ascwo-general-card ascwo-general-section">
          <div class="ascwo-general-section-head">
            <div>
              <h2>{{ __('Upload Design', 'all-signs-customizer-for-woocommerce') }}</h2>
              <p>{{ __('Allowed upload formats, size limits and archive rules.', 'all-signs-customizer-for-woocommerce') }}</p>
            </div>
            <button type="button" class="ascwo-general-collapse" @click="toggleSection('upload')">
              {{ openSections.upload ? __('Show less', 'all-signs-customizer-for-woocommerce') : __('Show more', 'all-signs-customizer-for-woocommerce') }}
              <ChevronUpIcon v-if="openSections.upload" />
              <ChevronDownIcon v-else />
            </button>
          </div>

          <div v-if="openSections.upload" class="ascwo-form-stack">
            <div class="ascwo-field">
              <span>{{ __('Allowed upload formats', 'all-signs-customizer-for-woocommerce') }}</span>
              <div class="ascwo-chip-box">
                <span v-for="format in upload.allowedFormats" :key="format" class="ascwo-chip">{{ format }} <button type="button" @click="removeChip(upload.allowedFormats, format)">x</button></span>
                <select class="ascwo-chip-select" @change="addChip(upload.allowedFormats, $event)">
                  <option value="">{{ __('Select allowed upload formats', 'all-signs-customizer-for-woocommerce') }}</option>
                  <option v-for="format in uploadFormatOptions" :key="format" :value="format">{{ format }}</option>
                </select>
              </div>
              <p>{{ __('Choose the upload formats allowed for customer files.', 'all-signs-customizer-for-woocommerce') }}</p>
            </div>
            <div class="ascwo-two-columns">
              <label class="ascwo-field">
                <span>{{ __('Maximum upload size (MB)', 'all-signs-customizer-for-woocommerce') }}</span>
                <input v-model.number="upload.maxUploadSize" class="ascwo-ui-input" type="number">
              </label>
              <label class="ascwo-field">
                <span>{{ __('Maximum upload number', 'all-signs-customizer-for-woocommerce') }}</span>
                <input v-model.number="upload.maxUploadNumber" class="ascwo-ui-input" type="number">
              </label>
            </div>
            <div class="ascwo-toggle-row">
              <div>
                <strong>{{ __('Zip output files', 'all-signs-customizer-for-woocommerce') }}</strong>
                <p>{{ __('Package customer uploads in a zip file when needed.', 'all-signs-customizer-for-woocommerce') }}</p>
              </div>
              <label class="ascwo-switch"><input type="checkbox" v-model="upload.zipFiles.active"><span></span></label>
            </div>
            <div class="ascwo-save-row">
              <button type="button" class="ascwo-ui-button-primary ascwo-general-save" :disabled="savingSection === 'upload'" @click="saveUpload">
                <Loader2Icon v-if="savingSection === 'upload'" class="ascwo-spin" />
                {{ __('Save Upload', 'all-signs-customizer-for-woocommerce') }}
              </button>
            </div>
          </div>
        </section>

        <section id="ascwo-general-quantity" class="ascwo-general-card ascwo-general-section">
          <div class="ascwo-general-section-head">
            <div>
              <h2>{{ __('Quantity Limits', 'all-signs-customizer-for-woocommerce') }}</h2>
              <p>{{ __('Minimum and maximum quantities allowed for this configuration.', 'all-signs-customizer-for-woocommerce') }}</p>
            </div>
            <button type="button" class="ascwo-general-collapse" @click="toggleSection('quantity')">
              {{ openSections.quantity ? __('Show less', 'all-signs-customizer-for-woocommerce') : __('Show more', 'all-signs-customizer-for-woocommerce') }}
              <ChevronUpIcon v-if="openSections.quantity" />
              <ChevronDownIcon v-else />
            </button>
          </div>
          <div v-if="openSections.quantity" class="ascwo-form-stack">
            <div class="ascwo-toggle-row">
              <div>
                <strong>{{ __('Enable quantity limits', 'all-signs-customizer-for-woocommerce') }}</strong>
                <p>{{ __('Restrict customer orders to a minimum and maximum quantity.', 'all-signs-customizer-for-woocommerce') }}</p>
              </div>
              <label class="ascwo-switch"><input type="checkbox" v-model="quantityLimits.enabled"><span></span></label>
            </div>
            <div v-if="quantityLimits.enabled" class="ascwo-two-columns">
              <label class="ascwo-field"><span>{{ __('Minimum quantity', 'all-signs-customizer-for-woocommerce') }}</span><input v-model.number="quantityLimits.minimum" class="ascwo-ui-input" type="number"></label>
              <label class="ascwo-field"><span>{{ __('Maximum quantity', 'all-signs-customizer-for-woocommerce') }}</span><input v-model.number="quantityLimits.maximum" class="ascwo-ui-input" type="number"></label>
            </div>
            <div class="ascwo-save-row">
              <button type="button" class="ascwo-ui-button-primary ascwo-general-save" :disabled="savingSection === 'quantityLimits'" @click="saveGenericSection('quantityLimits', quantityLimits)">
                <Loader2Icon v-if="savingSection === 'quantityLimits'" class="ascwo-spin" />
                {{ __('Save Quantity Limits', 'all-signs-customizer-for-woocommerce') }}
              </button>
            </div>
          </div>
        </section>

        <section id="ascwo-general-discount" class="ascwo-general-card ascwo-general-section">
          <div class="ascwo-general-section-head">
            <div>
              <h2>{{ __('Discount', 'all-signs-customizer-for-woocommerce') }}</h2>
              <p>{{ __('Choose between a simple discount or quantity-based discount lots.', 'all-signs-customizer-for-woocommerce') }}</p>
            </div>
            <button type="button" class="ascwo-general-collapse" @click="toggleSection('discount')">
              {{ openSections.discount ? __('Show less', 'all-signs-customizer-for-woocommerce') : __('Show more', 'all-signs-customizer-for-woocommerce') }}
              <ChevronUpIcon v-if="openSections.discount" />
              <ChevronDownIcon v-else />
            </button>
          </div>
          <div v-if="openSections.discount" class="ascwo-form-stack">
            <div class="ascwo-toggle-row">
              <div>
                <strong>{{ __('Discount by quantity', 'all-signs-customizer-for-woocommerce') }}</strong>
                <p>{{ __('Turn this on if discounts should depend on ordered quantity.', 'all-signs-customizer-for-woocommerce') }}</p>
              </div>
              <label class="ascwo-switch"><input type="checkbox" v-model="discount.byQuantity"><span></span></label>
            </div>
            <label class="ascwo-field">
              <span>{{ __('Discount type', 'all-signs-customizer-for-woocommerce') }}</span>
              <select v-model="discount.type" class="ascwo-ui-input">
                <option value="none">{{ __('None', 'all-signs-customizer-for-woocommerce') }}</option>
                <option value="percent">{{ __('Percentage', 'all-signs-customizer-for-woocommerce') }}</option>
                <option value="fixed">{{ __('Fixed', 'all-signs-customizer-for-woocommerce') }}</option>
              </select>
            </label>
            <div class="ascwo-save-row">
              <button type="button" class="ascwo-ui-button-primary ascwo-general-save" :disabled="savingSection === 'discount'" @click="saveGenericSection('discount', discount)">
                <Loader2Icon v-if="savingSection === 'discount'" class="ascwo-spin" />
                {{ __('Save Discount', 'all-signs-customizer-for-woocommerce') }}
              </button>
            </div>
          </div>
        </section>

        <section id="ascwo-general-mobile" class="ascwo-general-card ascwo-general-section">
          <div class="ascwo-general-section-head">
            <div>
              <h2>{{ __('Mobile Option', 'all-signs-customizer-for-woocommerce') }}</h2>
              <p>{{ __('Mobile navigation and selection display preferences.', 'all-signs-customizer-for-woocommerce') }}</p>
            </div>
            <button type="button" class="ascwo-general-collapse" @click="toggleSection('mobile')">
              {{ openSections.mobile ? __('Show less', 'all-signs-customizer-for-woocommerce') : __('Show more', 'all-signs-customizer-for-woocommerce') }}
              <ChevronUpIcon v-if="openSections.mobile" />
              <ChevronDownIcon v-else />
            </button>
          </div>
          <div v-if="openSections.mobile" class="ascwo-form-stack">
            <label class="ascwo-field">
              <span>{{ __('Show Navigation Menu on Mobile', 'all-signs-customizer-for-woocommerce') }}</span>
              <select v-model="mobile.showNavigatorMenu" class="ascwo-ui-input">
                <option value="off">{{ __('Off', 'all-signs-customizer-for-woocommerce') }}</option>
                <option value="on">{{ __('On', 'all-signs-customizer-for-woocommerce') }}</option>
              </select>
              <p>{{ __('Display a navigation menu of the selections on mobile.', 'all-signs-customizer-for-woocommerce') }}</p>
            </label>
            <label class="ascwo-field">
              <span>{{ __('Show Navigation Menu First', 'all-signs-customizer-for-woocommerce') }}</span>
              <select v-model="mobile.showNavigationMenuFirst" class="ascwo-ui-input">
                <option value="yes">{{ __('Yes', 'all-signs-customizer-for-woocommerce') }}</option>
                <option value="no">{{ __('No', 'all-signs-customizer-for-woocommerce') }}</option>
              </select>
              <p>{{ __('Allow customers to jump to a selection from the mobile menu before seeing the first option block.', 'all-signs-customizer-for-woocommerce') }}</p>
            </label>
            <label class="ascwo-field">
              <span>{{ __('Mobile Selection Options Display', 'all-signs-customizer-for-woocommerce') }}</span>
              <select v-model="mobile.mobileSelectionOptionsDisplay" class="ascwo-ui-input">
                <option value="horizontally-stack">{{ __('Horizontally Stack', 'all-signs-customizer-for-woocommerce') }}</option>
                <option value="scroll">{{ __('Scroll', 'all-signs-customizer-for-woocommerce') }}</option>
              </select>
              <p>{{ __('Choose whether selection options are shown as horizontal stacks or scrollable items.', 'all-signs-customizer-for-woocommerce') }}</p>
            </label>
            <div class="ascwo-save-row">
              <button type="button" class="ascwo-ui-button-primary ascwo-general-save" :disabled="savingSection === 'mobile'" @click="saveMobile">
                <Loader2Icon v-if="savingSection === 'mobile'" class="ascwo-spin" />
                {{ __('Save Mobile', 'all-signs-customizer-for-woocommerce') }}
              </button>
            </div>
          </div>
        </section>

        <section id="ascwo-general-request" class="ascwo-general-card ascwo-general-section">
          <div class="ascwo-general-section-head">
            <div>
              <h2>{{ __('Request Quote', 'all-signs-customizer-for-woocommerce') }}</h2>
              <p>{{ __('Quote request workflow, recipient emails and upload rules.', 'all-signs-customizer-for-woocommerce') }}</p>
            </div>
            <button type="button" class="ascwo-general-collapse" @click="toggleSection('request')">
              {{ openSections.request ? __('Show less', 'all-signs-customizer-for-woocommerce') : __('Show more', 'all-signs-customizer-for-woocommerce') }}
              <ChevronUpIcon v-if="openSections.request" />
              <ChevronDownIcon v-else />
            </button>
          </div>
          <div v-if="openSections.request" class="ascwo-nested-card ascwo-form-stack">
            <div class="ascwo-general-section-head ascwo-nested-head">
              <div>
                <h3>{{ __('Request A Quote', 'all-signs-customizer-for-woocommerce') }}</h3>
                <p>{{ __('Configure the request quote flow, recipient emails and file upload restrictions.', 'all-signs-customizer-for-woocommerce') }}</p>
              </div>
            </div>
            <div class="ascwo-toggle-row">
              <div>
                <strong>{{ __('Enable Request Quote', 'all-signs-customizer-for-woocommerce') }}</strong>
                <p>{{ __('Turn this on to let customers submit quote requests instead of going straight to purchase.', 'all-signs-customizer-for-woocommerce') }}</p>
              </div>
              <label class="ascwo-switch"><input type="checkbox" v-model="requestQuote.enableRequestQuote"><span></span></label>
            </div>
            <div class="ascwo-two-columns">
              <label class="ascwo-field"><span>{{ __('Receiver Email(s)', 'all-signs-customizer-for-woocommerce') }}</span><input :value="requestQuote.receiversEmail.join(', ')" class="ascwo-ui-input" type="text" @input="requestQuote.receiversEmail = splitList($event.target.value)"><p>{{ __('Separate multiple email addresses with commas.', 'all-signs-customizer-for-woocommerce') }}</p></label>
              <label class="ascwo-field"><span>{{ __('Email Subject', 'all-signs-customizer-for-woocommerce') }}</span><input v-model="requestQuote.emailSubject" class="ascwo-ui-input" type="text"></label>
            </div>
            <div class="ascwo-toggle-row">
              <div>
                <strong>{{ __('Allow Upload Files', 'all-signs-customizer-for-woocommerce') }}</strong>
                <p>{{ __('Allow the customer to attach files to a request quote submission.', 'all-signs-customizer-for-woocommerce') }}</p>
              </div>
              <label class="ascwo-switch"><input type="checkbox" v-model="requestQuote.allowUploadFiles"><span></span></label>
            </div>
            <div class="ascwo-field">
              <span>{{ __('Accepted Extensions', 'all-signs-customizer-for-woocommerce') }}</span>
              <div class="ascwo-chip-box">
                <span v-for="extension in requestQuote.acceptExtensions" :key="extension" class="ascwo-chip">{{ extension.replace('.', '').toUpperCase() }} <button type="button" @click="removeChip(requestQuote.acceptExtensions, extension)">x</button></span>
                <select class="ascwo-chip-select" @change="addChip(requestQuote.acceptExtensions, $event)">
                  <option value="">{{ __('Select file extensions', 'all-signs-customizer-for-woocommerce') }}</option>
                  <option v-for="extension in quoteExtensionOptions" :key="extension" :value="extension">{{ extension.replace('.', '').toUpperCase() }}</option>
                </select>
              </div>
              <p>{{ __('Choose the file extensions customers are allowed to upload.', 'all-signs-customizer-for-woocommerce') }}</p>
            </div>
            <div class="ascwo-two-columns">
              <label class="ascwo-field"><span>{{ __('Max File Size (MB)', 'all-signs-customizer-for-woocommerce') }}</span><input v-model.number="requestQuote.maxFileSize" class="ascwo-ui-input" type="number"><p>{{ __('Maximum file size allowed for one uploaded file.', 'all-signs-customizer-for-woocommerce') }}</p></label>
              <label class="ascwo-field"><span>{{ __('Max Files Number', 'all-signs-customizer-for-woocommerce') }}</span><input v-model.number="requestQuote.maxFilesNumber" class="ascwo-ui-input" type="number"><p>{{ __('Maximum number of files allowed per quote request.', 'all-signs-customizer-for-woocommerce') }}</p></label>
            </div>
            <div class="ascwo-toggle-row">
              <div>
                <strong>{{ __('Send To Customer', 'all-signs-customizer-for-woocommerce') }}</strong>
                <p>{{ __('Send a copy or acknowledgement of the request quote to the customer.', 'all-signs-customizer-for-woocommerce') }}</p>
              </div>
              <label class="ascwo-switch"><input type="checkbox" v-model="requestQuote.sendToCustomer"><span></span></label>
            </div>
            <div class="ascwo-save-row">
              <button type="button" class="ascwo-ui-button-primary ascwo-general-save" :disabled="savingSection === 'requestQuote'" @click="saveGenericSection('requestQuote', requestQuote)">
                <Loader2Icon v-if="savingSection === 'requestQuote'" class="ascwo-spin" />
                {{ __('Save Request Quote', 'all-signs-customizer-for-woocommerce') }}
              </button>
            </div>
          </div>
        </section>

        <section id="ascwo-general-simple" class="ascwo-general-card ascwo-general-section">
          <div class="ascwo-general-section-head">
            <div>
              <h2>{{ __('Simple Options', 'all-signs-customizer-for-woocommerce') }}</h2>
              <p>{{ __('Replace the full customizer with native product option groups when needed.', 'all-signs-customizer-for-woocommerce') }}</p>
            </div>
            <button type="button" class="ascwo-general-collapse" @click="toggleSection('simple')">
              {{ openSections.simple ? __('Show less', 'all-signs-customizer-for-woocommerce') : __('Show more', 'all-signs-customizer-for-woocommerce') }}
              <ChevronUpIcon v-if="openSections.simple" />
              <ChevronDownIcon v-else />
            </button>
          </div>
          <div v-if="openSections.simple" class="ascwo-form-stack">
            <div class="ascwo-toggle-row">
              <div>
                <strong>{{ __('Enable Simple Product Options', 'all-signs-customizer-for-woocommerce') }}</strong>
                <p>{{ __('When enabled, the product page will show simple option selectors instead of the full customizer.', 'all-signs-customizer-for-woocommerce') }}</p>
              </div>
              <label class="ascwo-switch"><input type="checkbox" v-model="simpleOptions.enabled"><span></span></label>
            </div>
            <div class="ascwo-save-row">
              <button type="button" class="ascwo-ui-button-primary ascwo-general-save" :disabled="savingSection === 'simpleOptions'" @click="saveGenericSection('simpleOptions', simpleOptions)">
                <Loader2Icon v-if="savingSection === 'simpleOptions'" class="ascwo-spin" />
                {{ __('Save Simple Options', 'all-signs-customizer-for-woocommerce') }}
              </button>
            </div>
          </div>
        </section>
      </div>

      <div class="ascwo-section-menu-wrap">
        <aside class="ascwo-section-menu ascwo-general-card">
          <h2>{{ __('Section Menu', 'all-signs-customizer-for-woocommerce') }}</h2>
          <div class="ascwo-section-menu-links">
            <a v-for="item in sectionMenu" :key="item.id" :href="`#${item.id}`" @click.prevent="scrollToSection(item.id)">
              {{ item.label }}
            </a>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ChevronDownIcon, ChevronUpIcon, Loader2Icon } from 'lucide-vue-next';
import api from '@/admin/Api/api';
import toastMessage from '@/admin/utils/functions';
import { __ } from "@wordpress/i18n";

const loadingIcon = `${String(window?.ascwo_data?.assets_url || "").replace(/\/$/, "")}/icons/ic_loading.svg`;

const route = useRoute();
const configId = ref(route.params.configId);
const isFetching = ref(false);
const savingSection = ref('');

const defaultProduct = () => ({
  designFromScratch: true,
  redirectAfterAddingToCart: true,
  redirectToCheckOutPage: false,
  hideAddToCartButtonOnShopPage: true,
  hidePricing: false,
  showRecapAfterFinish: true,
  uploadFileOnFinish: false,
});

const defaultMode = () => ({
  type: 'simple',
  allowMultiFonts: false,
  allowMultiColors: false,
  shareAndSave: {
    allowShare: false,
    allowSave: false,
    shareSignLocation: 'options_review',
  },
});

const defaultOutput = () => ({
  filesFormat: 'png',
  pdfQuality: '300',
  waterMark: '',
  zipOutputFiles: {
    active: true,
    zipOutFolderPrefix: 'aso_',
  },
  designComposition: true,
});

const defaultUpload = () => ({
  allowedFormats: ['JPG', 'JPEG', 'PNG', 'GIF', 'BMP', 'TIFF', 'WEBP', 'PSD', 'AI', 'SVG', 'EPS', 'PDF'],
  allowFormat: 'jpg,jpeg,png,gif,bmp,tiff,webp,psd,ai,svg,eps,pdf',
  maxUploadSize: 5000,
  maxUploadNumber: 5,
  zipFiles: {
    active: false,
    zipOutFolderPrefix: 'aso_',
  },
});

const defaultQuantityLimits = () => ({
  enabled: false,
  minimum: 1,
  maximum: 999,
});

const defaultDiscount = () => ({
  byQuantity: false,
  type: 'none',
});

const defaultMobile = () => ({
  showNavigatorMenu: 'off',
  showNavigationMenuFirst: 'yes',
  mobileSelectionOptionsDisplay: 'horizontally-stack',
});

const defaultRequestQuote = () => ({
  enableRequestQuote: false,
  receiversEmail: [],
  sendToCustomer: false,
  allowUploadFiles: false,
  acceptExtensions: ['.jpg', '.png', '.svg', '.pdf'],
  maxFileSize: 10,
  maxFilesNumber: 5,
  emailSubject: 'Request A Quote',
});

const defaultSimpleOptions = () => ({
  enabled: false,
  optionGroups: [],
});

const product = ref(defaultProduct());
const mode = ref(defaultMode());
const output = ref(defaultOutput());
const upload = ref(defaultUpload());
const quantityLimits = ref(defaultQuantityLimits());
const discount = ref(defaultDiscount());
const mobile = ref(defaultMobile());
const requestQuote = ref(defaultRequestQuote());
const simpleOptions = ref(defaultSimpleOptions());

const openSections = reactive({
  product: true,
  mode: true,
  output: true,
  upload: true,
  quantity: true,
  discount: true,
  mobile: true,
  request: true,
  simple: true,
});

const nestedSections = reactive({
  mode: true,
});

const sectionMenu = [
  { id: 'ascwo-general-product', label: 'Product' },
  { id: 'ascwo-general-mode', label: 'Mode' },
  { id: 'ascwo-general-output', label: 'Output' },
  { id: 'ascwo-general-upload', label: 'Upload Design' },
  { id: 'ascwo-general-quantity', label: 'Quantity Limits' },
  { id: 'ascwo-general-discount', label: 'Discount' },
  { id: 'ascwo-general-mobile', label: 'Mobile Option' },
  { id: 'ascwo-general-request', label: 'Request Quote' },
  { id: 'ascwo-general-simple', label: 'Simple Options' },
];

const productCards = [
  {
    key: 'designFromScratch',
    title: 'Enable design from scratch',
    description: 'Would you like to allow your clients to design the product from scratch? Or do you prefer allowing the customization only for templates assigned to the custom product ?',
  },
  {
    key: 'redirectAfterAddingToCart',
    title: 'Redirect to cart after adding a custom design to the cart',
    description: 'This options allow you to define what to do after adding a design to the cart',
    radio: true,
  },
  {
    key: 'redirectToCheckOutPage',
    title: 'Redirect to checkout page after adding a custom design to the cart',
    description: 'This options allow you to define what to do after adding a design to the cart',
    radio: true,
  },
  {
    key: 'hideAddToCartButtonOnShopPage',
    title: 'Hide add to cart buttons for custom product on shop',
    description: 'This options allow you to show/hide the cart button on the cart button on the customization page',
  },
  {
    key: 'hidePricing',
    title: 'Hide sign pricing on design screen',
    description: 'This options allow you to show/hide the sign pricing on design screen',
  },
  {
    key: 'showRecapAfterFinish',
    title: 'Show Recap after finish',
    description: 'This option allows you to show recap before adding the product to the cart',
  },
  {
    key: 'uploadFileOnFinish',
    title: 'Upload File on Finish',
    description: 'This option allows you to upload the design file upon completion. It will be associated with the product, and the user can manually add the product to the cart.',
  },
];

const uploadFormatOptions = ['JPG', 'JPEG', 'PNG', 'GIF', 'BMP', 'TIFF', 'WEBP', 'PSD', 'AI', 'SVG', 'EPS', 'PDF'];
const quoteExtensionOptions = ['.jpg', '.png', '.svg', '.pdf', '.jpeg', '.webp', '.ai', '.eps'];

const normalizeMode = (raw = {}) => ({
  ...defaultMode(),
  ...raw,
  shareAndSave: {
    ...defaultMode().shareAndSave,
    ...(raw.shareAndSave || {}),
  },
});

const normalizeOutput = (raw = {}) => ({
  ...defaultOutput(),
  ...raw,
  filesFormat: raw.filesFormat || raw.fileFormat || 'png',
  zipOutputFiles: {
    ...defaultOutput().zipOutputFiles,
    ...(raw.zipOutputFiles || {}),
  },
});

const normalizeList = (value, fallback = []) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string') return splitList(value);
  return [...fallback];
};

const normalizeUpload = (raw = {}) => {
  const defaults = defaultUpload();
  const allowedFormats = normalizeList(raw.allowedFormats || raw.allowFormat, defaults.allowedFormats)
    .map((format) => String(format).toUpperCase());

  return {
    ...defaults,
    ...raw,
    allowedFormats,
    allowFormat: allowedFormats.map((format) => format.toLowerCase()).join(','),
    maxUploadSize: Number(raw.maxUploadSize ?? defaults.maxUploadSize),
    maxUploadNumber: Number(raw.maxUploadNumber ?? defaults.maxUploadNumber),
    zipFiles: {
      ...defaults.zipFiles,
      ...(raw.zipFiles || {}),
      active: Boolean(raw.zipFiles?.active ?? raw.zipOutputFiles ?? defaults.zipFiles.active),
    },
  };
};

const serializeUpload = () => ({
  zipFiles: {
    ...upload.value.zipFiles,
    active: Boolean(upload.value.zipFiles?.active),
  },
  allowFormat: normalizeList(upload.value.allowedFormats, defaultUpload().allowedFormats)
    .map((format) => String(format).toLowerCase())
    .join(','),
  maxUploadSize: Number(upload.value.maxUploadSize || 0),
  maxUploadNumber: Number(upload.value.maxUploadNumber || 0),
});

const normalizeRequestQuote = (raw = {}) => ({
  ...defaultRequestQuote(),
  ...raw,
  receiversEmail: normalizeList(raw.receiversEmail, []),
  acceptExtensions: normalizeList(raw.acceptExtensions, defaultRequestQuote().acceptExtensions),
});

const fetchGeneralSettings = async () => {
  const result = await api.getGeneralSettings(configId.value);
  if (result?.message) return;

  const nextProduct = { ...defaultProduct(), ...(result.product || {}) };
  nextProduct.showRecapAfterFinish = result.product?.showRecapAfterFinish ?? result.product?.displayRecapsOnCheckout ?? true;

  product.value = nextProduct;
  mode.value = normalizeMode(result.mode || {});
  output.value = normalizeOutput(result.output || {});
  upload.value = normalizeUpload(result.upload || result.uploadDesign || {});
  quantityLimits.value = { ...defaultQuantityLimits(), ...(result.quantityLimits || {}) };
  discount.value = { ...defaultDiscount(), ...(result.discount || {}) };
  mobile.value = { ...defaultMobile(), ...(result.mobile || {}) };
  requestQuote.value = normalizeRequestQuote(result.requestQuote || {});
  simpleOptions.value = { ...defaultSimpleOptions(), ...(result.simpleOptions || {}) };
};

const toggleSection = (key) => {
  openSections[key] = !openSections[key];
};

const toggleNested = (key) => {
  nestedSections[key] = !nestedSections[key];
};

const scrollToSection = (id) => {
  window.requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
};

const setProductRedirect = (key) => {
  product.value.redirectAfterAddingToCart = key === 'redirectAfterAddingToCart';
  product.value.redirectToCheckOutPage = key === 'redirectToCheckOutPage';
};

const splitList = (value) => String(value || '').split(',').map((item) => item.trim()).filter(Boolean);

const addChip = (target, event) => {
  const value = event.target.value;
  if (value && !target.includes(value)) {
    target.push(value);
  }
  event.target.value = '';
};

const removeChip = (target, value) => {
  const index = target.indexOf(value);
  if (index !== -1) {
    target.splice(index, 1);
  }
};

const handleSaveResponse = async (result) => {
  if (result?.success) {
    await fetchGeneralSettings();
    toastMessage(result.message);
    return;
  }
  toastMessage(result?.message || __('Unable to save settings', 'all-signs-customizer-for-woocommerce'), 'error');
};

const saveProduct = async () => {
  savingSection.value = 'product';
  try {
    const payload = {
      ...product.value,
      displayRecapsOnCheckout: product.value.showRecapAfterFinish,
    };
    await handleSaveResponse(await api.updateGeneralProduct(configId.value, payload));
  } finally {
    savingSection.value = '';
  }
};

const saveOutput = async () => {
  savingSection.value = 'output';
  try {
    await handleSaveResponse(await api.updateGeneralOutput(configId.value, output.value));
  } finally {
    savingSection.value = '';
  }
};

const saveUpload = async () => {
  savingSection.value = 'upload';
  try {
    await handleSaveResponse(await api.updateGeneralSection(configId.value, 'upload', serializeUpload()));
  } finally {
    savingSection.value = '';
  }
};

const saveMobile = async () => {
  savingSection.value = 'mobile';
  try {
    await handleSaveResponse(await api.updateGeneralMobile(configId.value, mobile.value));
  } finally {
    savingSection.value = '';
  }
};

const saveGenericSection = async (section, data) => {
  savingSection.value = section;
  try {
    await handleSaveResponse(await api.updateGeneralSection(configId.value, section, data));
  } finally {
    savingSection.value = '';
  }
};

const selectWaterMarkImage = async (event) => {
  event.preventDefault();
  const uploader = wp.media({
    title: __('Select WaterMark Image', 'all-signs-customizer-for-woocommerce'),
    button: {
      text: __('Select Image', 'all-signs-customizer-for-woocommerce'),
    },
    multiple: false,
  }).on('select', () => {
    const selection = uploader.state().get('selection');
    selection.map((attachment) => {
      const image = attachment.toJSON();
      if (image.type === 'image') {
        output.value.waterMark = image.url;
      }
    });
  });

  uploader.open();
};

onMounted(async () => {
  isFetching.value = true;
  try {
    await fetchGeneralSettings();
  } finally {
    isFetching.value = false;
  }
});
</script>

<style scoped>
.ascwo-general {
  color: var(--ascwo-ui-text);
}

.ascwo-general-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 20px;
  align-items: start;
}

.ascwo-general-main {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
}

.ascwo-general-card {
  background: var(--ascwo-ui-surface);
  border: 1px solid var(--ascwo-ui-border);
  border-radius: var(--ascwo-ui-radius-card);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
}

.ascwo-general-hero {
  padding: 32px 40px;
}

.ascwo-general-hero h1,
.ascwo-general-section h2,
.ascwo-section-menu h2,
.ascwo-nested-card h3 {
  margin: 0;
  color: #303030;
  font-weight: 750;
  letter-spacing: 0;
}

.ascwo-general-hero h1 {
  font-size: 22px;
  line-height: 28px;
}

.ascwo-general-hero p,
.ascwo-general-section-head p,
.ascwo-field p,
.ascwo-toggle-row p,
.ascwo-product-option p {
  margin: 6px 0 0;
  color: #616161;
  font-size: 14px;
  line-height: 22px;
}

.ascwo-general-section {
  padding: 32px 34px 28px;
  scroll-margin-top: 12px;
}

.ascwo-general-section-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.ascwo-general-section h2,
.ascwo-nested-card h3 {
  font-size: 17px;
  line-height: 24px;
}

.ascwo-general-collapse {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 31px;
  padding: 5px 12px;
  border: 1px solid #c9cccf;
  border-radius: 8px;
  background: #ffffff;
  color: #202223;
  font-size: 13px;
  line-height: 18px;
  font-weight: 650;
  cursor: pointer;
  white-space: nowrap;
}

.ascwo-general-collapse:hover,
.ascwo-general-collapse:focus {
  background: #ffffff;
  color: #202223;
  border-color: #babfc3;
  box-shadow: none;
  outline: none;
}

.ascwo-general-collapse svg {
  width: 15px;
  height: 15px;
}

.ascwo-product-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.ascwo-product-option {
  min-height: 205px;
  padding: 20px;
  border: 1px solid #dfe3e8;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 12px 26px rgba(15, 23, 42, 0.04);
}

.ascwo-product-option h3 {
  min-height: 48px;
  margin: 0;
  color: #303030;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
}

.ascwo-product-option .ascwo-switch {
  margin: 12px auto 14px;
}

.ascwo-option-rule {
  height: 1px;
  margin: 0 0 14px;
  background: #dfe3e8;
}

.ascwo-product-option p {
  font-size: 14px;
  line-height: 22px;
}

.ascwo-form-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ascwo-nested-card {
  padding: 32px;
  border: 1px solid #dfe3e8;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
}

.ascwo-nested-head {
  margin-bottom: 18px;
}

.ascwo-toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-height: 64px;
  padding: 16px 18px;
  border: 1px solid #dfe3e8;
  border-radius: 12px;
  background: #ffffff;
}

.ascwo-toggle-row strong {
  display: block;
  color: #303030;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
}

.ascwo-switch {
  position: relative;
  display: inline-flex;
  width: 40px;
  height: 24px;
  flex: 0 0 auto;
  cursor: pointer;
}

.ascwo-switch input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.ascwo-switch span {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: #d5dbe6;
  transition: background 160ms ease;
}

.ascwo-switch span::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.26);
  transition: transform 160ms ease;
}

.ascwo-switch input:checked + span {
  background: #007a76;
}

.ascwo-switch input:checked + span::after {
  transform: translateX(16px);
}

.ascwo-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ascwo-field > span {
  color: #303030;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
}

.ascwo-ui-input {
  width: 100%;
  min-height: 42px;
  padding: 8px 12px;
  border: 1px solid #8c9196;
  border-radius: 8px;
  background: #ffffff;
  color: #303030;
  font-size: 14px;
  line-height: 20px;
  outline: none;
  box-sizing: border-box;
}

.ascwo-ui-input:focus {
  border-color: #8c9196;
  box-shadow: none !important;
}

.ascwo-two-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.ascwo-upload-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 46px;
  padding: 3px;
  border: 1px solid #8c9196;
  border-radius: 8px;
  background: #ffffff;
}

.ascwo-upload-control .ascwo-ui-button-primary {
  min-height: 34px;
  padding: 7px 16px;
}

.ascwo-upload-preview {
  position: relative;
  width: 48px;
  height: 48px;
  overflow: hidden;
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  background: #ffffff;
}

.ascwo-upload-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ascwo-upload-preview button {
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 18px;
  height: 18px;
  border: 0;
  border-radius: 4px;
  background: #006e52;
  color: #ffffff;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
}

.ascwo-chip-box {
  min-height: 88px;
  padding: 10px;
  border: 1px solid #8c9196;
  border-radius: 8px;
  background: #ffffff;
}

.ascwo-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 20px;
  margin: 0 8px 8px 0;
  padding: 2px 9px;
  border-radius: 999px;
  background: #e4e5e7;
  color: #303030;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
}

.ascwo-chip button {
  padding: 0;
  border: 0;
  background: transparent;
  color: #777;
  font: inherit;
  cursor: pointer;
}

.ascwo-chip-select {
  display: block;
  width: 100%;
  min-height: 28px;
  border: 0;
  outline: 0;
  color: #616161;
  background: transparent;
  font-size: 14px;
}

.ascwo-save-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
}

.ascwo-general-save {
  min-height: 32px;
  padding: 6px 14px;
  font-size: 13px;
}

.ascwo-general-save svg {
  width: 14px;
  height: 14px;
}

.ascwo-section-menu-wrap {
  position: sticky;
  top: 46px;
  align-self: start;
}

.ascwo-section-menu {
  padding: 10px;
}

.ascwo-section-menu h2 {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 650;
}

.ascwo-section-menu-links {
  display: grid;
  gap: 8px;
  margin-top: 6px;
}

.ascwo-section-menu a {
  display: block;
  width: 100%;
  box-sizing: border-box;
  min-height: 36px;
  padding: 8px 12px;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  background: #ffffff;
  color: #111827;
  text-align: left;
  text-decoration: none;
  font-size: 13px;
  line-height: 1.2;
  font-weight: 600;
  cursor: pointer;
}

.ascwo-section-menu a:hover,
.ascwo-section-menu a:focus {
  background: #ffffff;
  color: #111827;
  border-color: #d1d5db;
  box-shadow: none;
  outline: none;
}

.ascwo-general-loading {
  display: flex;
  min-height: 300px;
  align-items: center;
  justify-content: center;
}

.ascwo-general-loading img {
  width: 140px;
  height: 140px;
}

.ascwo-spin {
  animation: ascwo-general-spin 800ms linear infinite;
}

@keyframes ascwo-general-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1200px) {
  .ascwo-general-layout {
    grid-template-columns: 1fr;
  }

  .ascwo-section-menu {
    position: static;
    order: -1;
  }

  .ascwo-section-menu-wrap {
    position: static;
    order: -1;
  }

  .ascwo-product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 782px) {
  .ascwo-general-section,
  .ascwo-general-hero,
  .ascwo-nested-card {
    padding: 20px;
  }

  .ascwo-product-grid,
  .ascwo-two-columns {
    grid-template-columns: 1fr;
  }

  .ascwo-general-section-head,
  .ascwo-toggle-row {
    flex-direction: column;
    align-items: stretch;
  }

  .ascwo-switch {
    align-self: flex-end;
  }
}
</style>
