<template>
    <div>
        <div class="aso-space-y-4">
            <div>
                <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
                    <div class="aso-flex aso-justify-between">
                        <div class="aso-flex aso-flex-col aso-w-2/5">
                            <label class="aso-text-[12px]">Measurement Unit</label>
                            <select>
                                <option>Centimeters</option>
                                <option>inches</option>
                                <option>milimetres</option>
                                <option>Both Centimeters and Inches</option>
                            </select>
                        </div>
                        <div class="aso-flex aso-flex-col aso-w-2/5">
                            <label class="aso-text-[12px]">Show/hide Measurements</label>
                            <select>
                                <option>show both width and height</option>
                                <option>Do not show measurements</option>
                                <option>show only height</option>
                                <option>show only width</option>
                            </select>
                        </div>
                    </div>
                    <div class="aso-flex aso-justify-between">
                        <div class="aso-flex aso-flex-col aso-w-2/5">
                            <label class="aso-text-[12px]">Decimal Format of Measurements</label>
                            <select>
                                <option>with decimal</option>
                                <option>No decimal</option>
                            </select>
                        </div>
                        <div class="aso-flex aso-flex-col aso-w-2/5">
                            <label class="aso-text-[12px]"></label>
                            <select>
                                <option>Right</option>
                                <option>Left</option>
                            </select>
                        </div>
                    </div>
                    <div class="aso-flex aso-flex-col aso-w-2/5">
                        <label class="aso-text-[12px]"></label>
                        <select>
                            <option>display</option>
                            <option>Hidden</option>
                        </select>
                    </div>
                    <div class="aso-text-[11px] aso-text-[#444444]">Display a switch to turn default background into day or right mode</div>
                </div>
            </div>
            <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-3 aso-justify-end aso-items-end">
                <div class="aso-bg-[#016464] aso-rounded">
                    <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                        <div class="aso-font-semibold aso-text-[16px]">Save</div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    
</script> 