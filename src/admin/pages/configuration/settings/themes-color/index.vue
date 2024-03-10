<template>
    <div>
        <div class="aso-space-y-1">
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                <h3 class="aso-text-[16px]">Content Header</h3>
                <div class="aso-flex aso-justify-between">
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Text color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="textColorContentHeader"
                                @input="updateHexCode1"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="textColorContentHeader"
                                @input="updateColorFromHex1"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Background header</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="backgroundColorHeader"
                                @input="updateHexCode2"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="backgroundColorHeader"
                                @input="updateColorFromHex2"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                <h3 class="aso-text-[16px]">Content Side menu</h3>
                <div class="aso-flex aso-justify-between">
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Text color</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="textColorContentSideMenu"
                                @input="updateHexCode3"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="textColorContentSideMenu"
                                @input="updateColorFromHex3"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Background header</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="backgroundColorHeaderContentSide"
                                @input="updateHexCode4"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="backgroundColorHeaderContentSide"
                                @input="updateColorFromHex4"
                                class="aso-p-1 aso-text-black aso-w-full aso-translate-y-0"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                <h3 class="aso-text-[16px]">Menu</h3>
                <div class="aso-flex aso-justify-between">
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">color Text options</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="textColorOptionsMenu"
                                @input="updateHexCode5"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="textColorOptionsMenu"
                                @input="updateColorFromHex5"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="so-text-[12px] aso-text-[#444444]">Background options</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="backgroundColorOptionsMenu"
                                @input="updateHexCode6"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="backgroundColorOptionsMenu"
                                @input="updateColorFromHex6"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                <div class="aso-flex aso-justify-between">
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="aso-text-[12px] aso-text-[#444444]">Color text Button Save</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="textColorButtonSave"
                                @input="updateHexCode7"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="textColorButtonSave"
                                @input="updateColorFromHex7"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5 aso-space-y-2">
                        <label class="so-text-[12px] aso-text-[#444444]">Background color text Button Save</label>
                        <div class="aso-relative aso-flex">
                            <input
                                id="colorPicker"
                                type="color"
                                v-model="backgroundColorTextButtonSave"
                                @input="updateHexCode8"
                                class="aso-w-9 aso-h-[30px]"
                            />
                            <input
                                type="text"
                                v-model="backgroundColorTextButtonSave"
                                @input="updateColorFromHex8"
                                class="aso-p-1 aso-text-black aso-w-full -aso-translate-y-px"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                <h3 class="aso-text-[16px]">Choose your customizer appearance</h3>
                <div class="aso-w-1/2">
                    <img class="aso-w-full" src="../../../../../../assets/images/img_homepage.png" alt=""/>
                    <div class="aso-flex aso-bg-white aso-p-2 -aso-translate-y-2">
                        <div class="aso-w-1/2 aso-flex">
                            <span class="aso-text-[13px] aso-font-bold">Default skyn</span>
                        </div>
                        <div class="aso-w-1/2 aso-flex aso-justify-end aso-space-x-4 aso-pt-2">
                            <span class="-aso-translate-y-2 aso-text-[#016464] aso-text-[13px]">Select</span>
                            <input type="radio">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-3 aso-justify-end aso-items-end">
            <div class="aso-bg-[#016464] aso-rounded">
                <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-rounded hover:aso-bg-[#016464] aso-cursor-pointer">
                    <div class="aso-font-semibold aso-text-[16px]">Save</div>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

const textColorContentHeader = ref('#000000');

const updateHexCode1 = () => {
    textColorContentHeader.value = event.target.value;
};

const updateColorFromHex1 = () => {
  if (textColorContentHeader.value[0] !== '#') {
    textColorContentHeader.value = '#' + textColorContentHeader.value;
  }
};

const backgroundColorHeader = ref('#000000');

const updateHexCode2 = () => {
    backgroundColorHeader.value = event.target.value;
};

const updateColorFromHex2 = () => {
  if (backgroundColorHeader.value[0] !== '#') {
    backgroundColorHeader.value = '#' + backgroundColorHeader.value;
  }
};

const textColorContentSideMenu = ref('#000000');

const updateHexCode3 = () => {
    textColorContentSideMenu.value = event.target.value;
};

const updateColorFromHex3 = () => {
  if (textColorContentSideMenu.value[0] !== '#') {
    textColorContentSideMenu.value = '#' + textColorContentSideMenu.value;
  }
};
const backgroundColorHeaderContentSide = ref('#000000');

const updateHexCode4 = () => {
    backgroundColorHeaderContentSide.value = event.target.value;
};

const updateColorFromHex4 = () => {
  if (backgroundColorHeaderContentSide.value[0] !== '#') {
    backgroundColorHeaderContentSide.value = '#' + backgroundColorHeaderContentSide.value;
  }
};
const textColorOptionsMenu = ref('#000000');

const updateHexCode5 = () => {
    textColorOptionsMenu.value = event.target.value;
};

const updateColorFromHex5 = () => {
  if (textColorOptionsMenu.value[0] !== '#') {
    textColorOptionsMenu.value = '#' + textColorOptionsMenu.value;
  }
};
const backgroundColorOptionsMenu = ref('#000000');

const updateHexCode6 = () => {
    backgroundColorOptionsMenu.value = event.target.value;
};

const updateColorFromHex6 = () => {
  if (backgroundColorOptionsMenu.value[0] !== '#') {
    backgroundColorOptionsMenu.value = '#' + backgroundColorOptionsMenu.value;
  }
};
const textColorButtonSave = ref('#000000');

const updateHexCode7 = () => {
    textColorButtonSave.value = event.target.value;
};

const updateColorFromHex7 = () => {
  if (textColorButtonSave.value[0] !== '#') {
    textColorButtonSave.value = '#' + textColorButtonSave.value;
  }
};
const backgroundColorTextButtonSave = ref('#000000');

const updateHexCode8 = () => {
    backgroundColorTextButtonSave.value = event.target.value;
};

const updateColorFromHex8 = () => {
  if (backgroundColorTextButtonSave.value[0] !== '#') {
    backgroundColorTextButtonSave.value = '#' + backgroundColorTextButtonSave.value;
  }
};
</script> 