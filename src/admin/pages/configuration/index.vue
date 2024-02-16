<template>
    <div class="aso-justify-center aso-items-center aso-h-[100vh]">
        <div v-show="pageCreateConfig">
            <div class="aso-pb-4 aso-bg-[#F8F9FB] aso-px-4 aso-border-b-3 aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-solid aso-border-[#f0f0f1] ">
               <div class="aso-bg-[#F8F9FB] aso-font-bold aso-py-4">
                    List of configurations
               </div>
               <div class="aso-flex aso-space-x-2 aso-w-4/4">
                    <div class="aso-w-1/4 aso-relative">
                        <input name="" id="" class="aso-w-[95%] aso-h-[40px] aso-absolute" placeholder="Search name configuration">
                        <button class="aso-absolute aso-w-fit aso-h-fit aso-border-none aso-bg-[#F7F8F8] aso-rounded aso-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] aso-translate-y-2.5 aso-right-4">
                            <svg class="aso-w-4 aso-h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 10.5C6 10.3674 6.05268 10.2402 6.14645 10.1464C6.24021 10.0527 6.36739 10 6.5 10H9.5C9.63261 10 9.75979 10.0527 9.85355 10.1464C9.94732 10.2402 10 10.3674 10 10.5C10 10.6326 9.94732 10.7598 9.85355 10.8536C9.75979 10.9473 9.63261 11 9.5 11H6.5C6.36739 11 6.24021 10.9473 6.14645 10.8536C6.05268 10.7598 6 10.6326 6 10.5ZM4 7.5C4 7.36739 4.05268 7.24021 4.14645 7.14645C4.24021 7.05268 4.36739 7 4.5 7H11.5C11.6326 7 11.7598 7.05268 11.8536 7.14645C11.9473 7.24021 12 7.36739 12 7.5C12 7.63261 11.9473 7.75979 11.8536 7.85355C11.7598 7.94732 11.6326 8 11.5 8H4.5C4.36739 8 4.24021 7.94732 4.14645 7.85355C4.05268 7.75979 4 7.63261 4 7.5ZM2 4.5C2 4.36739 2.05268 4.24021 2.14645 4.14645C2.24021 4.05268 2.36739 4 2.5 4H13.5C13.6326 4 13.7598 4.05268 13.8536 4.14645C13.9473 4.24021 14 4.36739 14 4.5C14 4.63261 13.9473 4.75979 13.8536 4.85355C13.7598 4.94732 13.6326 5 13.5 5H2.5C2.36739 5 2.24021 4.94732 2.14645 4.85355C2.05268 4.75979 2 4.63261 2 4.5Z" fill="#586374"/>
                            </svg>
                        </button>
                    </div>
                    <div class="aso-w-1/4">
                        <select name="" id="" class="aso-w-[95%] aso-h-[40px]">
                            <option selected>filter by mode</option>
                        </select>
                    </div>
                    <div class="aso-w-1/4">
                        <select name="" id="" class="aso-w-[95%] aso-h-[40px]">
                            <option selected>filter by product type</option>
                        </select>
                    </div>
                    <div class="aso-w-1/4">
                        <button class="aso-flex aso-w-fit aso-h-fit aso-rounded aso-bg-[#016464] aso-px-6 aso-space-x-2 aso-p-2 aso-border-none aso-text-white aso-cursor-pointer" @click="addConfig">
                            <svg class="aso-w-6 aso-h-6" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="plus-lg">
                                <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11 2.75C11.1823 2.75 11.3572 2.82243 11.4861 2.95136C11.6151 3.0803 11.6875 3.25516 11.6875 3.4375V10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H11.6875V18.5625C11.6875 18.7448 11.6151 18.9197 11.4861 19.0486C11.3572 19.1776 11.1823 19.25 11 19.25C10.8177 19.25 10.6428 19.1776 10.5139 19.0486C10.3849 18.9197 10.3125 18.7448 10.3125 18.5625V11.6875H3.4375C3.25516 11.6875 3.0803 11.6151 2.95136 11.4861C2.82243 11.3572 2.75 11.1823 2.75 11C2.75 10.8177 2.82243 10.6428 2.95136 10.5139C3.0803 10.3849 3.25516 10.3125 3.4375 10.3125H10.3125V3.4375C10.3125 3.25516 10.3849 3.0803 10.5139 2.95136C10.6428 2.82243 10.8177 2.75 11 2.75Z" fill="white"/>
                                </g>
                            </svg>
                            <div class="aso-text-[15px]">
                                Add new configuration
                            </div>
                        </button>
                    </div>
               </div>
            </div>
            <div class="aso-flex aso-bg-[#F8F9FB] aso-px-4 aso-p-3">
               <div class="aso-flex aso-w-[94.5%] aso-space-x-5">
                   <div class="aso-text-[12px]  aso-py-1">
                       Legend unavailable
                  </div>
                  <div class="aso-bg-[#EEF5FF] aso-rounded-full aso-text-[12px] aso-pl-3 aso-p-2 aso-py-1">
                       1. Name of component group
                  </div>
                  <div class="aso-bg-[#FFC7D8] aso-text-[12px] aso-rounded-full aso-w-[15%] aso-pl-5 aso-p-1">
                       2. Button for managers 
                  </div>
                </div>
               <div class="">
                    <select name="" id="">
                        <option value="">7</option>
                    </select>
               </div>
            </div>
            <div class="aso-relative" id="monTableau">
                <table class="aso-text-left aso-border aso-border-collapse aso-border-0">
                    <thead class="aso-text-[14px] aso-bg-[#f0f0f1]">
                        <tr>
                            <th scope="col" class="aso-p-4 aso-w-12">
                                
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3">
                                Name configuration
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3">
                                Description
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3">
                                icon
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3">
                                PopupImg
                            </th>
                            <th scope="col" class="aso-px-6 aso-py-3">
                                Action
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody class="aso-bg-white">
                       
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-[5%] aso-p-4">
                                <div class="aso-flex aso-items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" class="aso-w-4 aso-h-4  aso-bg-gray-100 aso-border-gray-300 aso-rounded focus:aso-ring-blue-500">
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-4 aso-flex aso-space-x-2">
                                <div class="aso-w-5 aso-h-5 aso-p-1 aso-px-1 aso-flex aso-justify-center aso--items-center aso-rounded-full aso-bg-[#f0f0f1] aso-border aso-border-solid aso-border-black ">
                                    <span class="">AS</span> 
                                </div>
                                <div class="aso-py-1">
                                    Acrylic Signs
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                Acrylic signs, also known .....
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                <svg class="aso-w-8 aso-h-8" viewBox="0 0 45 33" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <rect width="45" height="33" fill="url(#pattern0)"/>
                                    <defs>
                                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image0_425_2805" transform="matrix(0.00847458 0 0 0.0115562 0 -0.0662558)"/>
                                    </pattern>
                                    <image id="image0_425_2805" width="118" height="98" xlink:href="data:image/png;base64,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"/>
                                    </defs>
                                </svg>
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                <img class="aso-w-8 aso-h-8" src="../../../../assets/images/img/Rectangle 3704.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                <div class="aso-flex aso-space-x-2">
                                    <div>
                                        <button class="aso-bg-transparent aso-border-none aso-cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div>
                                        <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div>
                                        <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-[5%] aso-p-4">
                                <div class="aso-flex aso-items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" class="aso-w-4 aso-h-4  aso-bg-gray-100 aso-border-gray-300 aso-rounded focus:aso-ring-blue-500">
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-4 aso-flex aso-space-x-2">
                                <div class="aso-w-5 aso-h-5 aso-p-1 aso-px-1 aso-flex aso-justify-center aso--items-center aso-rounded-full aso-bg-[#f0f0f1] aso-border aso-border-solid aso-border-black ">
                                    <span class="">AS</span> 
                                </div>
                                <div class="aso-py-1">
                                    Acrylic Signs
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                Acrylic signs, also known .....
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                <svg class="aso-w-8 aso-h-8" viewBox="0 0 45 33" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <rect width="45" height="33" fill="url(#pattern0)"/>
                                    <defs>
                                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image0_425_2805" transform="matrix(0.00847458 0 0 0.0115562 0 -0.0662558)"/>
                                    </pattern>
                                    <image id="image0_425_2805" width="118" height="98" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAABiCAYAAACF4CecAAAMYmlDQ1BJQ0MgUHJvZmlsZQAASImVlwdYk1cXgO83MklYgQjICHuJIjOAjBBWBAGZgqiEJJAwYkgIKm5qUcG6RRQnWgFRbLUCUgci1lkUt3UUByqVWhy4UPlvSKBW//H853nud9+ce+6555zcb1wAdDr5MlkuqgtAnrRAHhcezJqUksoiPQEIwAAV2ACcL1DIOLGxUQDKUP9PeX0NWkO57KLy9fX4fxV9oUghAABJg5whVAjyILcAgBcLZPICAIghUG89o0CmYjFkAzkMEPIcFWepeaWKM9S8c9AmIY4LuQkAMo3Pl2cBoN0G9axCQRb0o/0QsqtUKJECoGMAOUAg5gshJ0AelZc3XcULIDtAexnkGsjsjM98Zv3Df8awfz4/a5jVeQ0KOUSikOXyZ/2fpfnfkperHFrDDjaaWB4Rp8of1vBGzvRIFdMg90gzomNUtYb8ViJU1x0AlCpWRiSq7VFTgYIL6weYkF2F/JBIyKaQw6S50VEafUamJIwHGe4WdKakgJegmbtEpAiN1/jcJJ8eFzPEmXIuRzO3ni8fXFdl36bMSeRo/N8Qi3hD/l8ViROSIVMBwKiFkqRoyNqQDRQ58ZFqG8yqSMyNHrKRK+NU8dtAZouk4cFq/1hapjwsTmMvy1MM5YuViCW8aA1XFIgTItT1wXYL+IPxG0FuEEk5iUN+RIpJUUO5CEUhoercsXaRNFGTL3ZXVhAcp5nbK8uN1djjZFFuuEpvBdlEURivmYuPK4CbU+0fj5IVxCao48TTs/njY9Xx4IUgCnBBCGABJWwZYDrIBpL2nsYe+Es9Egb4QA6ygAi4aDRDM5IHR6TwGg+KwJ+QREAxPC94cFQECqH+47BWfXUBmYOjhYMzcsAjyHkgEuTC38rBWdLh1ZLAQ6iRfLW6AMaaC5tq7GsdB2qiNBrlkF+WzpAlMZQYQowghhEdcRM8APfDo+A1CDY3nI37DEX7tz3hEaGDcJ9wldBJuDlNUiz/IpYJoBP6D9NknPF5xrgd9OmJB+P+0Dv0jDNxE+CCe8B1OHggXNkTarmauFW5s/5NnsMZfFZzjR3FlYJSRlCCKA5fztR20vYc9qKq6Of1UceaMVxV7vDIl+tzP6uzEPaRX1piS7AD2CnsOHYGO4w1AhZ2DGvCzmNHVDy8hx4O7qGh1eIG48mBfiRfrcfXrKmqpMK1zrXb9YNmDBSIZhaobjDudNksuSRLXMDiwLeAiMWTCkaPYrm5unkAoHqnqB9TL5mD7wqEefZvXX4LAD6lUJn1t45vDcChRwAwXv+ts34Bbw/4rD9yUaCUF6p1uOpCgE8DHXhHGQNzYA0cYEZuwAv4gSAQCsaDGJAAUsBUWGcx3M9yMAPMAQtBCSgDK8E6sBFsBTtADdgL9oNGcBgcB7+Ac+AiuApuwf3TBZ6CXvAa9CMIQkLoCAMxRiwQW8QZcUPYSAASikQhcUgKko5kIVJEicxBvkHKkNXIRmQ7Uov8iBxCjiNnkA7kJnIP6UZeIO9RDKWhBqgZaoeOQdkoB41EE9ApaBaajxahi9DlaAVahe5BG9Dj6Dn0KtqJPkX7MIBpYUzMEnPB2BgXi8FSsUxMjs3DSrFyrAqrx5rhP30Z68R6sHc4EWfgLNwF7uEIPBEX4Pn4PHwZvhGvwRvwNvwyfg/vxT8R6ARTgjPBl8AjTCJkEWYQSgjlhF2Eg4ST8G7qIrwmEolMoj3RG96NKcRs4mziMuJm4j5iC7GD+IDYRyKRjEnOJH9SDIlPKiCVkDaQ9pCOkS6RukhvyVpkC7IbOYycSpaSi8nl5N3ko+RL5MfkfoouxZbiS4mhCCmzKCsoOynNlAuULko/VY9qT/WnJlCzqQupFdR66knqbepLLS0tKy0frYlaEq0FWhVaP2id1rqn9Y6mT3OicWlpNCVtOa2a1kK7SXtJp9Pt6EH0VHoBfTm9ln6Cfpf+VpuhPVqbpy3Unq9dqd2gfUn7mQ5Fx1aHozNVp0inXOeAzgWdHl2Krp0uV5evO0+3UveQ7nXdPj2G3li9GL08vWV6u/XO6D3RJ+nb6YfqC/UX6e/QP6H/gIExrBlchoDxDWMn4ySjy4BoYG/AM8g2KDPYa9Bu0Guob+hhmGQ407DS8IhhJxNj2jF5zFzmCuZ+5jXm+xFmIzgjRCOWjqgfcWnEG6ORRkFGIqNSo31GV43eG7OMQ41zjFcZNxrfMcFNnEwmmsww2WJy0qRnpMFIv5GCkaUj94/8zRQ1dTKNM51tusP0vGmfmblZuJnMbIPZCbMec6Z5kHm2+Vrzo+bdFgyLAAuJxVqLYxZ/sAxZHFYuq4LVxuq1NLWMsFRabrdst+y3srdKtCq22md1x5pqzbbOtF5r3Wrda2NhM8Fmjk2dzW+2FFu2rdh2ve0p2zd29nbJdovtGu2e2BvZ8+yL7OvsbzvQHQId8h2qHK44Eh3ZjjmOmx0vOqFOnk5ip0qnC86os5ezxHmzc8cowiifUdJRVaOuu9BcOC6FLnUu90YzR0eNLh7dOPrZGJsxqWNWjTk15pOrp2uu607XW2P1x44fWzy2eewLNyc3gVul2xV3unuY+3z3JvfnHs4eIo8tHjc8GZ4TPBd7tnp+9PL2knvVe3V723ine2/yvs42YMeyl7FP+xB8gn3m+xz2eefr5Vvgu9/3Lz8Xvxy/3X5PxtmPE43bOe6Bv5U/33+7f2cAKyA9YFtAZ6BlID+wKvB+kHWQMGhX0GOOIyebs4fzLNg1WB58MPgN15c7l9sSgoWEh5SGtIfqhyaGbgy9G2YVlhVWF9Yb7hk+O7wlghARGbEq4jrPjCfg1fJ6x3uPnzu+LZIWGR+5MfJ+lFOUPKp5Ajph/IQ1E25H20ZLoxtjQAwvZk3MnVj72PzYnycSJ8ZOrJz4KG5s3Jy4U/GM+Gnxu+NfJwQnrEi4leiQqExsTdJJSkuqTXqTHJK8Orlz0phJcyedSzFJkaQ0pZJSk1J3pfZNDp28bnJXmmdaSdq1KfZTZk45M9Vkau7UI9N0pvGnHUgnpCen707/wI/hV/H7MngZmzJ6BVzBesFTYZBwrbBb5C9aLXqc6Z+5OvNJln/WmqxucaC4XNwj4Uo2Sp5nR2RvzX6TE5NTnTOQm5y7L4+cl553SKovzZG2TTefPnN6h8xZViLrzPfNX5ffK4+U71IgiimKpgID+PF+Xumg/FZ5rzCgsLLw7YykGQdm6s2Uzjw/y2nW0lmPi8KKvp+NzxbMbp1jOWfhnHtzOXO3z0PmZcxrnW89f9H8rgXhC2oWUhfmLPy12LV4dfGrb5K/aV5ktmjBogffhn9bV6JdIi+5vthv8dYl+BLJkval7ks3LP1UKiw9W+ZaVl72YZlg2dnvxn5X8d3A8szl7Su8VmxZSVwpXXltVeCqmtV6q4tWP1gzYU3DWtba0rWv1k1bd6bco3zreup65frOiqiKpg02G1Zu+LBRvPFqZXDlvk2mm5ZuerNZuPnSlqAt9VvNtpZtfb9Nsu3G9vDtDVV2VeU7iDsKdzzambTz1Pfs72t3mewq2/WxWlrdWRNX01brXVu723T3ijq0TlnXvSdtz8W9IXub6l3qt+9j7iv7Afyg/OGPH9N/vLY/cn/rAfaB+p9sf9p0kHGwtAFpmNXQ2yhu7GxKaeo4NP5Qa7Nf88GfR/9cfdjycOURwyMrjlKPLjo6cKzoWF+LrKXneNbxB63TWm+dmHTiStvEtvaTkSdP/xL2y4lTnFPHTvufPnzG98yhs+yzjee8zjWc9zx/8FfPXw+2e7U3XPC+0HTR52Jzx7iOo5cCLx2/HHL5lyu8K+euRl/tuJZ47cb1tOudN4Q3ntzMvfn8t8Lf+m8tuE24XXpH9075XdO7Vb87/r6v06vzyL2Qe+fvx9+/9UDw4OlDxcMPXYse0R+VP7Z4XPvE7cnh7rDui39M/qPrqexpf0/Jn3p/bnrm8Oynv4L+Ot87qbfrufz5wItlL41fVr/yeNXaF9t393Xe6/43pW+N39a8Y7879T75/eP+GR9IHyo+On5s/hT56fZA3sCAjC/nD34KYLChmZkAvKgGgJ4Cvx0uwmPCZPWZb1AQ9Tl1kMB/YvW5cFC8AKgOAiBxAQBR8BtlC2y2kGmwV32qJwQB1N19uGlEkenupvZFgycewtuBgZdmAJCaAfgoHxjo3zww8BGeUbGbALTkq8+aKiHCs8E2RxW1nxuwAF+I+hz6WY5f9kAVgQf4sv8XsISIr9G+JvQAAACKZVhJZk1NACoAAAAIAAQBGgAFAAAAAQAAAD4BGwAFAAAAAQAAAEYBKAADAAAAAQACAACHaQAEAAAAAQAAAE4AAAAAAAAAkAAAAAEAAACQAAAAAQADkoYABwAAABIAAAB4oAIABAAAAAEAAAB2oAMABAAAAAEAAABiAAAAAEFTQ0lJAAAAU2NyZWVuc2hvdM+WvzAAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAHVaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjQuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjExODwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlVzZXJDb21tZW50PlNjcmVlbnNob3Q8L2V4aWY6VXNlckNvbW1lbnQ+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj45ODwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgrw8ImLAAAAHGlET1QAAAACAAAAAAAAADEAAAAoAAAAMQAAADEAAATSLOPkigAABJ5JREFUeAHsm1tIFUEYx8fn1J4qRU8PXqLEMH3ogkpEhFpQhBZKmSUogheCLLxAkCTRBSoNCkENIisLJCgvRQR5yx7Uygt4eahzTOspPfZ82m9s13PG3dPunj3HmTkzcNid2Z3Z2e8333++mdUQl5SQSNxZIESA5Y4pfiEBlk+uSIAVYDm1AKevJTxWgOXUApy+lvBYAZZTC1D0Wt8d82h8chaNTUyjrxNTyDG3gBaXllFlRSHKy8ky1FPhsYbMZc3NAGt8ckaCN40h2ufm0cDQqGbj4WGhaGa0S/O62gUBVs0qFpYBMPBEu2MB9Q8NSyBn0JJz2fATfs32GqojwBoyl/bNajI6JnmlVUmAtcqSGu24yyh44djklFcZ1WhmTXFY2AaUuCNO+m1DtugILNHtHd3KfQKsYgrfT2AOhLlQllE42qWAxteUsD1WAhiPtkZHotS9yRgknLunG3da0K3GVqVIgFVMof8EZNQx9xP1fxxRolErZDQ6aguyRUWg1D0pKDEhHgPcKR31JAFWj5X+3RMoGQV44Im+JAFWw3rrKaMaXVIthn52v+3D3pybvbpWJcFelNaykDIPpSE9Xs98VBwIGbVJ819iQpwug6rS0ygE6T9+qkK5WlRwAtVfXsmTYOWbYE3b0dbw374wA9ZfMgoG27c7SYlGwRtgPtwYHirb0m/H/OJq1POuz6P96ZEu/GwtsHBzxsE09Kjpmkc9MkMlWH/KqC0qEo92rWiUNJA/88fyytDgp88ej+h43IDnZ29gYSC+fHLPox6ZWVewLMsoaUgzeeY9lkcZNQOSrANz7JmSauR0/sGX9MyxsJHx/lUrXgOT7bnnLffYYJFRdyP6cg6q9fRFF5Zf9yUSKcWV5efwY3KlrzzkZoba830CK4fq8icmqxf1/opG1QxBWxkJNmA7T+SDzRhmvaJRM30NdB3SvgEDqxbRab087I3SFI1q9ZOmcqrAuu+NBrOMWjFAqAALHgnrqkAs6q0wGgttUAFWz4KZBWPS1EfqwHa+6UVND9vxnNp4s4YmWzHVF+rAxu3KUv6mp662HJUUnmTKoLR0ljqwm2PTFdvAovrS+ZXPTUqhBSewk8X7fO4rWAT/RmkmHc0tdW2KScM/OJeTe3nf4LBcbMnxm/2Hq6yy3tX2vNNUe1AP2mAhXb/drNgX7Gw0WQ7296LTBZ163fPBaF+83g/txSZlmoIKAwwG3JfxKa/PoOkidWD9YZzaugZXTFKG4cECgwzq7j9cwBRUsCHXYEE2Dxw5awoMeCfUBU8FwKwlbsGCfIL0ll64ahgMzKVQF4zDauISrBQRYuk1GiSBZ0JwBbJtdeAW6AHCFVgAI31cCErpJQcON2Bl6T1dVGVYeh+0tOOlAcvSyyVYGcz95mfk+3nNg4fnF1dxIb3kizLtsTKY5PRsw8sRiHpT0nOYjXpJkGSeWbAyGCG9JNKVPJNgAaqZ5Yjs4TxEveo4V0uZAwubDjVX7hres5U9nNUNh1Vk+s6YA6vvtTzvMhtcebbCVo5rsLL0mgmu2MK4trfcgpWl10xwtdZM7JVwCTYYpZccer6C/QsAAP///TI2XwAABUpJREFU7ZpbaBZHFMePz5r45I0kfTBWahqJF6hWjeKDd6hIvYJiFLSKVgoVkQhCixcUod7AG8boQ6RG0FIMrSCId31Qq1GLmoeapFqfaj776nb/o2dNJt9lZ3b2+3b3m4GPnf12Znbm/OacOWdmydFMXy1e5wwYOkn8kDeR/n2Tcpat3uyMrv3aefDoqYkmY9vGrp+Oe/KFnFUTqVbg8qbBXrt51xlTO99ZumqzA8DFnhIBdvfeBjE7Dx3/ORE8MTH/av870FhiDRYCmLtkfaJM7+mzLQ6sWVCrE1uwML2VNTMTY3oBcuqcOmfK7OWBoULVYwm2qbklUaaXJ+m677cZgRpLsFhPYaqCrkGBFjCDldk/wGQ1mWKlsejshd+vmBx/wdqC6Q0zNIsNWGhoUIeiYBSlFyPGDjs0iw1YSTaxvYXJhdMHwYeZLNgwpdutbVib9Ru3O0NrZjhwllQT6qv4FUHB9kEHSSO58SfdvPOHqPnlFzX0y+mDGq3Eo8qLjpdUt6ae3rmiOnVkJ31SPsR3x990vaWjJ5rJBUvbt27wXc91ymjPgRNe+ddtV728r4zqzOPyprcUud2oXeHswfTW/7BPuWu8FiMMUk1BNTYye8WqA89HeYQyML06oczhhjMiVtddiy3YEAhjPcRWJ3aRVE+ZUBdhkO5azMOxYFkShq4AqbvVyaa3qPeKDXEw2gybT51TJt4m1TW98kCsxsoS0biH+eRQRsf0cl2dMChTdy3YTJLx+T9A4lRGx3wGqZurexZsLglleQ4wuqFM2DtQFmwWcNkeASq0VNV8djfbqnWz9Ud+ZsHKEvFxj609ndg0TNMrdztyYCG067fuJeYkhwWOcemabW5D5RopsDBTGDw+l4RDkqSEEEhlEz/o2CMFlmM5/t44zDUoqOCiXj8oWKOnOy0Xr1Ld2nrv8OHSrw00supT795m/Esgcqc7+OAbGqtzohF1Lcpn/yKlsf7noy2ZSwJBNdaoKc7VWfu8twRwiN/R+Q99PmIY9S/t5xWQwZ5vOiCeyeW8ClLGCFhuc8K4USJbPWK46GRF+WDxtUF52SClrw64vaRf3bCQlrtfZnSl3lJpST8617Tf80lksCyLancCNB7ekVOeRsHyyzNd0fnqqmHi8cRxY8S12nWuMFOLEf7YyQuovfOVJy4oBmtmJrAovHDeTDq4Z4tXL11GG6x7okFnzv2Wrs1A/6WDP3H8aNGmXzMUqAN5rDywsrbX2/jbpmxg/Xxjpg0WH2nh5a1PnorO8YdtvXoawh8VZYMJZh6TYGTVcPGGOMKXwZaU9KW2+++VpWBgM/F6+PgZdbnQX3S8onbXMYBz0N75kjARHv/Zlqma8f+xFpW6Jr6ibIhYj5DnmJp9AeMvVWxwy4/76djJZq/Wxm9X0KbvVor7bGAbD+2g2dN7a7vXkJvR1tjujajm4TQgfZwE0YIPzeFJoDo21fIAeP32XZo1bTKtWbnQqy6DhflF+mbFopxQUa4gYPHibAna3epqPlKPSZBKCWcD4UG+Emu37OmHDV8Gy2uv33FHEqyfzqeDj5mP1PrkOaVS//lpxkgZhm/S0y9asH6IiPXdXet7TIICwE/n6XOYl8nTt2D9EM5ShuGzsycmQQQ8fVifG7fvez0vGlPsjTgPmY9O3ntPn+Hjmi9P34LNA+h0r+jh5Ilwz6ynb8Gmk3pE/pPhC0vgw9Ov+qySLl9oVBpFbL1ipVHGpHAPJ+9DrI+uL54/K+emvzxEC1aWSELuLdiEgJSHYcHKEknIvQWbEJDyMCxYWSIJubdgEwJSHsb/79hlqOkodWIAAAAASUVORK5CYII="/>
                                    </defs>
                                </svg>
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                <img class="aso-w-8 aso-h-8" src="../../../../assets/images/img/Rectangle 3704.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                <div class="aso-flex aso-space-x-2">
                                    <div>
                                        <button class="aso-bg-transparent aso-border-none aso-cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div>
                                        <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div>
                                        <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-[5%] aso-p-4">
                                <div class="aso-flex aso-items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" class="aso-w-4 aso-h-4  aso-bg-gray-100 aso-border-gray-300 aso-rounded focus:aso-ring-blue-500">
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-4 aso-flex aso-space-x-2">
                                <div class="aso-w-5 aso-h-5 aso-p-1 aso-px-1 aso-flex aso-justify-center aso--items-center aso-rounded-full aso-bg-[#f0f0f1] aso-border aso-border-solid aso-border-black ">
                                    <span class="">AS</span> 
                                </div>
                                <div class="aso-py-1">
                                    Acrylic Signs
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                Acrylic signs, also known .....
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                <svg class="aso-w-8 aso-h-8" viewBox="0 0 45 33" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <rect width="45" height="33" fill="url(#pattern0)"/>
                                    <defs>
                                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image0_425_2805" transform="matrix(0.00847458 0 0 0.0115562 0 -0.0662558)"/>
                                    </pattern>
                                    <image id="image0_425_2805" width="118" height="98" xlink:href="data:image/png;base64,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"/>
                                    </defs>
                                </svg>
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                <img class="aso-w-8 aso-h-8" src="../../../../assets/images/img/Rectangle 3704.svg" alt="">
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                <div class="aso-flex aso-space-x-2">
                                    <div>
                                        <button class="aso-bg-transparent aso-border-none aso-cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div>
                                        <button class="aso-bg-transparent aso-border-none aso-text-[#2DD05B] aso-cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div>
                                        <button class="aso-bg-transparent aso-border-none aso-text-[#A00000] aso-cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="aso-border-t-0 aso-border-l-0 aso-border-r-0 aso-border-b-2 aso-border-solid aso-border-[#f0f0f1]">
                            <td class="aso-w-[5%] aso-p-4">
                                <select name="" id="" class="aso-rounded-full">
                                    <option value="">10</option>
                                </select>
                            </td>
                            <td class="aso-px-6 aso-py-4 aso-flex aso-space-x-2">
                                <div class="aso-flex aso-space-x-1">
                                        <div>
                                            01
                                        </div>
                                        <div class="aso-text-[#AAAAAA]">
                                            a
                                        </div>
                                        <div>
                                            10
                                        </div>
                                        <div class="aso-text-[#AAAAAA]">
                                            sur
                                        </div>
                                        <div>
                                            700
                                        </div>
                                </div>
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                
                            </td>
                            <td class="aso-px-6 aso-py-4">
                            </td>
                            <td class="aso-px-6 aso-py-4">
                                
                            </td>
                            <td class="aso-px-6 aso-py-4">
                            <span class="aso-text-[#AAAAAA]">&lt;&lt;  &lt;</span> page 1 sur 8  > <span class="aso-text-[#AAAAAA]"> >> </span> 
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
        <div class="aso-space-y-1" v-show="isNewConfigVisible">
            <div class="aso-bg-[#F8F9FB] aso-font-bold aso-px-4 aso-py-4">
                Create new configuration
            </div>
           <div class="aso-bg-[#F8F9FB] aso-font-bold aso-px-4 aso-py-4">
                <div class="aso-flex">
                    <div class="aso-w-1/2 aso-space-y-2 aso-text-[14px]">
                        <label for="" class="aso-font-normal">Name configuration</label><br>
                        <input type="text" class="aso-rounded aso-w-[80%] aso-h-[35px]">
                    </div>
                    <div class="aso-w-1/2 aso-space-y-2 aso-text-[14px]">
                        <label for="" class="aso-font-normal">Description</label><br>
                        <input type="text" class="aso-rounded aso-w-[80%] aso-h-[35px]">
                    </div>
                </div>
                <div class="aso-flex aso-py-10">
                    <div class="aso-w-1/2 aso-space-y-2 aso-text-[12px]">
                        <label for="" class="aso-font-normal">Upload icon</label><br>
                        <div class="aso-relative">
                            <input type="text" class="aso-rounded aso-w-[80%] aso-h-[40px] aso-absolute">
                            <button class="aso-absolute aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit  aso-p-2 aso-rounded aso-px-6 aso-text-white aso-translate-x-4 aso-translate-y-1 aso-text-[12px] aso-cursor-pointer">upload icon</button>
                        </div>
                        
                    </div>
                    <div class="aso-w-1/2 aso-space-y-2 aso-text-[12px]">
                        <label for="" class="aso-font-normal">Upload PopupImg</label><br>
                        <div class="aso-relative">
                            <input type="text" class="aso-rounded aso-w-[80%] aso-h-[40px] aso-absolute">
                            <button class="aso-absolute aso-bg-[#016464] aso-border-none aso-w-fit aso-h-fit  aso-p-2 aso-rounded aso-px-6 aso-text-white aso-translate-x-4 aso-translate-y-1 aso-text-[12px] aso-cursor-pointer">upload PopupImg</button>
                        </div>
                    </div>
                </div>
           </div>
           <div class="aso-bg-[#F8F9FB] aso-flex aso-font-bold aso-space-x-4 aso-px-4 aso-py-4 aso-justify-end aso-items-end">
                <div class="">
                    <button class="aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-border-[1px] aso-rounded aso-px-8 aso-p-2 aso-border-black aso-border-solid hover:aso-bg-[#016464] aso-cursor-pointer" @click="back">
                        <svg class="aso-w-6 aso-h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12L5 8V11L17.17 11C17.3756 10.414 17.7586 9.90661 18.2657 9.54821C18.7729 9.18981 19.379 8.9982 20 9C20.7956 9 21.5587 9.31607 22.1213 9.87868C22.6839 10.4413 23 11.2044 23 12C23 12.7956 22.6839 13.5587 22.1213 14.1213C21.5587 14.6839 20.7956 15 20 15C18.69 15 17.58 14.17 17.17 13L5 13V16L1 12Z" fill="black"/>
                        </svg>
                        <div class="aso-font-semibold aso-text-[16px]">Back</div>
                    </button>
                </div>
                <div class="">
                    <button class="aso-flex aso-bg-[#016464] aso-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] aso-space-x-2 aso-text-white aso-border-none aso-w-fit aso-h-fit aso-border-[1px] aso-rounded aso-px-8 aso-p-2 aso-border-black aso-border-solid aso-cursor-pointer" @click="next">
                        <div class="aso-font-semibold aso-text-[16px]">Next</div>
                        <svg class="aso-w-6 aso-h-6" viewBox="0 0 22 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 4L18 8V5H5.83C5.62439 5.58597 5.24142 6.09339 4.73429 6.45179C4.22715 6.81019 3.621 7.0018 3 7C2.20435 7 1.44129 6.68393 0.87868 6.12132C0.31607 5.55871 0 4.79565 0 4C0 3.20435 0.31607 2.44129 0.87868 1.87868C1.44129 1.31607 2.20435 1 3 1C4.31 1 5.42 1.83 5.83 3H18V0L22 4Z" fill="white"/>
                        </svg>
                    </button>
                </div>
           </div>
        </div>
        <div class="aso-bg-[#F8F9FB] aso-p-20 aso-space-y-20" v-show="pageIncludeDemo">
            <div class="">
                <div class="aso-font-bold aso-text-[24px] aso-flex aso-justify-center aso-items-center">
                    Include demo data?
                </div>
                <div class="aso-text-[16px] aso-p-4 aso-flex aso-justify-center aso-items-center">
                    To help you get started we can automatically add fonts, colors, prices and sizes to your 
                    new configuration
                </div>
            </div>
            <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                <div>
                    <button class="aso-font-semibold aso-text-[16px] aso-flex aso-bg-transparent aso-w-fit aso-space-x-2 aso-h-fit aso-border-[1px] aso-rounded aso-px-8 aso-p-3 aso-border-black aso-border-solid hover:aso-bg-[#016464] aso-cursor-pointer">
                        Include demo data
                    </button>
                </div>
                <div>
                    <button class="aso-font-semibold aso-text-[16px] aso-text-white aso-flex aso-bg-[#016464] aso-w-fit aso-space-x-2 aso-h-fit aso-border-[1px] aso-rounded aso-px-8 aso-p-3 aso-border-black aso-border-solid hover:aso-bg-[#016464] aso-cursor-pointer" @click="noDemo">
                        No Include demo data
                    </button>
                </div>
            </div>
        </div>
        <div v-show="contentMaterial">
            <Material :configMaterial="pageIncludeDemo" />
        </div>
        
    </div>
</template>

<script setup>
import { ref } from "vue";
import Material from './materials/material.vue';
const contentMaterial = ref(false);
const isNewConfigVisible = ref(false);
const pageIncludeDemo = ref(false);
const pageCreateConfig = ref(true);
const addConfig = () => {
    pageCreateConfig.value = false;
    isNewConfigVisible.value = true;
}

const back = () => {
    pageCreateConfig.value = true;
    isNewConfigVisible.value = false;
};
const next = () => {
    isNewConfigVisible.value = false;
    pageIncludeDemo.value = true
};
const noDemo = () => {
    contentMaterial.value = true;
    pageIncludeDemo.value = false;
};

</script>