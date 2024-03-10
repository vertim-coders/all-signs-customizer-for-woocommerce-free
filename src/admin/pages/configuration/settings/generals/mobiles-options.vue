<template>
    <div>                
        <div class="aso-bg-[#F8F9FB] aso-px-8 aso-py-8 aso-space-y-6">
            <div class="aso-flex aso-flex-col aso-space-y-3">
                <label class="aso-text-[12px] aso-font-medium">Show Navigation Menu on Mobile</label>
                <select>
                    <option>On</option>
                    <option>Off</option>
                </select>
            </div>
            <div class="aso-text-[11px] aso-text-[#444444]">Display a navigation menu of the selections on mobile.</div>
            <div class="aso-flex aso-flex-col aso-space-y-3">
                <label class="aso-text-[12px] aso-font-medium">Show Navigation Menu First</label>
                <select>
                    <option>Yes</option>
                    <option>No</option>
                </select>
            </div>
            <div class="aso-text-[11px] aso-text-[#444444]">This allows the users to jump to a specific selection from the navigation menu first. Otherwise, the screen will show the first selection.</div>
            <div class="aso-flex aso-flex-col aso-space-y-3">
                <label class="aso-text-[12px] aso-font-medium">Mobile Selection Options Display</label>
                <select>
                    <option>Horizontally Stack</option>
                    <option>Scroll</option>
                </select>
            </div>
            <div class="aso-text-[11px] aso-text-[#444444]">Allow selection options to display as horizontally scrollable options on mobile or stacked vertically.</div>
        </div>
    </div>
    <div class="aso-bg-[#F8F9FB] aso-flex aso-space-x-4 aso-px-4 aso-py-3 aso-justify-end aso-items-end">
        <div class="aso-bg-[#016464] aso-rounded">
            <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-text-white aso-px-12 aso-p-2.5 aso-border-none aso-opacity-90 hover:aso-opacity-100 hover:aso-border-none hover:aso-text-white hover:aso-bg-[#016464] aso-cursor-pointer">
                <div class="aso-font-semibold aso-text-[16px]">Save</div>
            </button>
        </div>
    </div>
</template>
<script setup>

</script> 