<template>
  <div id="app">
    еуые
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      // ru: vdp_translation_ru.js,
      showEmailError: false,
      disabledDates: {
        ranges: [{ // Disable dates in given ranges (exclusive).
          from: new Date(2010, 9, 16),
          to: new Date(Date.now() - 86400000)
        }]
      },
      currentStep: 0,
      openModal: false,
      message: 'qwerty',
      openCartModal: false,
      results: [],
      tags: [],
      cartArr: [
        // {
        //     "id": 32,
        //     "active_variation_id": 34,
        //     "active_variation_size": "M",
        //     "price": "1000",
        //     "name": "Гастробокс 35",
        //     "attributes": [
        //         {
        //             "id": 0,
        //             "name": "Size",
        //             "position": 0,
        //             "visible": true,
        //             "variation": true,
        //             "options": [
        //                 "S",
        //                 "M",
        //                 "L"
        //             ]
        //         }
        //     ],
        //     "quantity": 2
        // }
      ],
      userName: '',
      userSecondName: '',
      userPhone: '',
      userEmail: '',
      // ********* Step 2
      userStreet: '',
      userHouse: '',
      userCorp: '',
      userOffice: '',
      userFlat: '',
      userArea: '',
      userPod: '',
      userHousePhone: '',
      userHaveElevator: false,
      // ******** Step 3
      userOrderDate: '',
      // userOrderTime: '',
      userOrderTimeHour: 16,
      userOrderTimeMinute: 0,
      userOrderComment: '',
      userOrderPersonQuantity: 1,
      timeDropdownShow: false,
      preloadingOrder: false,
      userComment: '',
      orderId: ''
    }
  },
  computed: {
    environment () {
      return String(process.env.NUXT_SRC_URL)
    }
  },

}
</script>
