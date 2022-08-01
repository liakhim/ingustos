// const url = 'router/products.php';
// const urlTags = 'router/tags.php';
// let vm = new Vue({
//     el: '#app',
//     data: {
//         ru: vdp_translation_ru.js,
//         showEmailError: false,
//         disabledDates: {
//             ranges: [{ // Disable dates in given ranges (exclusive).
//                 from: new Date(2010, 9, 16),
//                 to: new Date(Date.now() - 86400000)
//             }]
//         },
//         currentStep: 0,
//         openModal: false,
//         message: 'qwerty',
//         openCartModal: false,
//         results: [],
//         tags: [],
//         cartArr: [
//             // {
//             //     "id": 32,
//             //     "active_variation_id": 34,
//             //     "active_variation_size": "M",
//             //     "price": "1000",
//             //     "name": "Гастробокс 35",
//             //     "attributes": [
//             //         {
//             //             "id": 0,
//             //             "name": "Size",
//             //             "position": 0,
//             //             "visible": true,
//             //             "variation": true,
//             //             "options": [
//             //                 "S",
//             //                 "M",
//             //                 "L"
//             //             ]
//             //         }
//             //     ],
//             //     "quantity": 2
//             // }
//         ],
//         userName: '',
//         userSecondName: '',
//         userPhone: '',
//         userEmail: '',
//         // ********* Step 2
//         userStreet: '',
//         userHouse: '',
//         userCorp: '',
//         userOffice: '',
//         userFlat: '',
//         userArea: '',
//         userPod: '',
//         userHousePhone: '',
//         userHaveElevator: false,
//         // ******** Step 3
//         userOrderDate: '',
//         // userOrderTime: '',
//         userOrderTimeHour: 16,
//         userOrderTimeMinute: 0,
//         userOrderComment: '',
//         userOrderPersonQuantity: 1,
//         timeDropdownShow: false,
//         preloadingOrder: false,
//         userComment: '',
//         orderId: ''
//     },
//     components: {
//         vuejsDatepicker
//     },
//     watch: {
//         openCartModal (v) {
//             if (window.screen.width < 769) {
//                 document.body.style.overflowY = v ? "hidden" : "scroll"
//             }
//         }
//     },
//     methods: {
//         validEmail (val) {
//             const regexQuery = '^\\w+([\\+.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'
//             const email = new RegExp(regexQuery, 'i')
//             return email.test(val)
//         },
//         closeOrder () {
//           this.openCartModal = false
//             this.userName = ''
//                 this.userSecondName = ''
//                 this.userPhone = ''
//                 this.userEmail = ''
//                 this.userStreet = ''
//                 this.userHouse = ''
//                 this.userCorp = ''
//                 this.userOffice = ''
//                 this.userFlat = ''
//                 this.userArea = ''
//                 this.userPod = ''
//                 this.userHousePhone = ''
//                 this.userHaveElevator = false
//                 this.userOrderDate = ''
//                 this.userOrderTimeHour = 16
//                 this.userOrderTimeMinute = 0
//                 this.userOrderComment = ''
//                 this.userOrderPersonQuantity = 1
//                 this.timeDropdownShow = false
//                 this.preloadingOrder = false
//                 this.userComment = ''
//         },
//         dropdown(e){
//             let el = this.$refs.dropdown;
//             let target = e.target;
//             if (el !== target && !el.contains(target)){
//                 this.timeDropdownShow = false
//             }
//         },
//         incCurrentStep () {
//           if (this.currentStep <= 3) {
//               this.currentStep += 1
//           }
//           if (this.currentStep === 4) {
//               this.createOrder()
//           }
//         },
//         close () {
//             this.timeDropdownShow = false
//         },
//         userOrderTimeMinuteForShow (min) {
//             if (min >= 0 && min <=9) {
//                 return '0' + min
//             } else {
//                 return min
//             }
//         },
//         incHour () {
//           this.userOrderTimeHour += 1
//         },
//         decHour () {
//           if (this.userOrderTimeHour >= 2) {
//               this.userOrderTimeHour -= 1
//           }
//         },
//         incMinute () {
//             if (this.userOrderTimeMinute <= 54) {
//                 this.userOrderTimeMinute += 5
//             }
//         },
//         decMinute () {
//             if (this.userOrderTimeMinute >= 5) {
//                 this.userOrderTimeMinute -= 5
//             }
//         },
//         incPersons () {
//             this.userOrderPersonQuantity += 1
//         },
//         decPersons () {
//             if (this.userOrderPersonQuantity >= 2) {
//                 this.userOrderPersonQuantity -= 1
//             }
//         },
//         test () {
//           alert('change')
//         },
//         testBlur () {
//           alert('blur')
//         },
//         customFormatter(date) {
//             return moment(date).format('MMMM Do YYYY, h:mm:ss a');
//         },
//         addToCart (product) {
//             console.log(product)
//             const k = this.localProducts.find(v => v.id === product.id)
//             this.cartArr.push({
//                 ...k,
//                 quantity: 1
//             })
//         },
//         incCartProductQuantity (item) {
//             const ind = this.cartArr.indexOf(this.cartArr.find(v => v.active_variation_id === item.active_variation_id))
//             this.cartArr[ind].quantity += 1
//         },
//         decCartProductQuantity (item) {
//             const ind = this.cartArr.indexOf(this.cartArr.find(v => v.active_variation_id === item.active_variation_id))
//             if (this.cartArr[ind].quantity > 1) {
//                 this.cartArr[ind].quantity -= 1
//             } else {
//                 this.deleteFromCart(id)
//             }
//         },
//         deleteFromCart (id) {
//             const ind = this.cartArr.indexOf(this.cartArr.find(v => v.id === id))
//             this.cartArr.splice(ind, 1)
//         },
//         changeVariation (id, variation_id) {
//             const prod = this.results.find(v => +v.id === +id)
//             console.log(prod)
//             prod.vars.map(v => {
//                 v.active = false
//             })
//             prod.vars[+variation_id].active = true
//             let init = this.results
//             this.results = []
//             this.results = init
//         },
//         createOrder () {
//             return new Promise((resolve, reject) => {
//                 axios.post('router/order.php', {
//                     "billing": {
//                         "first_name": this.userName,
//                         "last_name": this.userSecondName,
//                         "address_1": this.address,
//                         "address_2": "",
//                         "city": "Москва",
//                         "state": "MSC",
//                         "postcode": "127000",
//                         "country": "RU",
//                         "email": this.userEmail,
//                         "phone": this.userPhone
//                     },
//                     "shipping": {
//                         "first_name": this.userName,
//                         "last_name": this.userSecondName,
//                         "address_1": this.address,
//                         "address_2": "",
//                         "city": "Москва",
//                         "state": "MSC",
//                         "postcode": "127000",
//                         "country": "RU",
//                     },
//                     "line_items": this.sendProducts,
//                     "shipping_lines": [
//                         {
//                             "method_id": "flat_rate",
//                             "method_title": "Flat Rate",
//                             "total": String(this.shipping)
//                         }
//                     ]
//                 }).then((response) => {
//                     this.orderId = response.data.id
//                     console.log('-------')
//                     console.log(response.data.id)
//                     axios.post('router/order_note.php', {
//                         id: response.data.id,
//                         note: this.note
//                     }).then(() => {
//                         this.currentStep = 5
//                     })
//                 })
//             })
//         },
//         postSend () {
//             axios.post('router/test.php', JSON.stringify({
//                 params: '1'
//             }), {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//         },
//         activeVariable (product) {
//             return product.vars.find(v => v.active)
//         },
//         countPercent (product) {
//             return Math.floor(((this.choosePrice(product) - this.chooseMainPrice(product))/this.choosePrice(product))*100)
//         },
//         choosePrice (product) {
//             let price
//             if (product.vars) {
//                 let activeVariable = this.activeVariable(product)
//                 if (activeVariable.regular_price) {
//                     price = activeVariable.regular_price
//                 } else {
//                     price = activeVariable.price
//                 }
//             } else {
//                 price = product.price
//             }
//             return price
//         },
//         chooseMainPrice (product) {
//             let price
//             if (product.vars) {
//                 let activeVariable = this.activeVariable(product)
//                 if (activeVariable.sale_price) {
//                     price = activeVariable.sale_price
//                 } else {
//                     price = activeVariable.price
//                 }
//             } else {
//                 price = product.price
//             }
//             return price
//         }
//     },
//     computed: {
//         shipping () {
//           let shipping = 400
//           if (this.orderSum >= 3500) {
//               shipping = 0
//           }
//           return shipping
//         },
//         address () {
//             let address = this.userStreet + ', дом:' + this.userHouse
//             if (this.userCorp.length) {
//                 address += 'Корпус: ' + this.userCorp
//             }
//             if (this.userOffice.length) {
//                 address += 'Офис: ' + this.userOffice
//             }
//             if (this.userFlat.length) {
//                 address += 'Офис: ' + this.userFlat
//             }
//             if (this.userArea.length) {
//                 address += 'Этаж: ' + this.userArea
//             }
//             if (this.userPod.length) {
//                 address += 'Подъезд: ' + this.userPod
//             }
//             if (this.userHousePhone.length) {
//                 address += 'Домофон: ' + this.userHousePhone
//             }
//             if (this.userHaveElevator.length) {
//                 address += 'Лифт: есть'
//             }
//           return address
//         },
//         note () {
//             let note = 'Дата доставки: ' + this.userOrderDate + 'Время доставки: ' + this.userOrderTime
//             if (this.userComment.length > 0) {
//                 note += ';' + this.userComment
//             }
//             note += '; Количество персон: ' + this.userOrderPersonQuantity
//             return note
//         },
//         sendProducts () {
//             const products = []
//             this.cartArr.forEach(v => {
//                 products.push({
//                     product_id: v.id,
//                     variation_id: v.active_variation_id,
//                     quantity: v.quantity
//                 })
//             })
//             return products
//         },
//         today () {
//           return 'Сегодня (' + moment().format('DD.MM.YYYY') + ')'
//         },
//         tomorrow () {
//           return 'Завтра (' + moment().add(1, 'days').format('DD.MM.YYYY') + ')'
//         },
//         userOrderTime () {
//           return this.userOrderTimeHour + ':' + this.userOrderTimeMinuteForShow(this.userOrderTimeMinute)
//         },
//         date () {
//           console.log(document.getElementById('date'))
//           return document.getElementById('date')
//         },
//         activeNextStepButton () {
//             if (this.currentStep === 1
//                 && this.userName.length > 0
//                 && this.userSecondName.length > 0
//                 && this.userEmail.length > 0
//                 && this.validEmail(this.userEmail)
//                 && this.userPhone.length > 0)
//             {
//                 return false
//             }
//             if (this.currentStep === 2
//                 && this.userStreet.length > 0
//                 && this.userHouse.length > 0 )
//             {
//                 return false
//             }
//             if (this.currentStep === 3 && !!this.userOrderDate && !!this.userOrderTime) {
//                 return false
//             }
//             return true
//         },
//         localProducts () {
//             const arr = []
//             this.results.forEach(v => {
//                 arr.push({
//                     id: v.id,
//                     active_variation_id: (v.vars && v.vars.length) ? v.vars.find(v => v.active).id : null,
//                     active_variation_size: (v.vars && v.vars.length) ? v.vars.find(v => v.active).attributes[0].option : null,
//                     active_variation_image: (v.vars && v.vars.length) ? v.vars.find(v => v.active).image : v.images,
//                     price: this.chooseMainPrice(v),
//                     name: v.name,
//                     attributes: v.attributes,
//                 })
//             })
//             return arr
//         },
//         filteredProducts () {
//             return this.results.filter(v => v.id && v.catalog_visibility !== 'hidden') || []
//         },
//         orderSum () {
//             let counter = 0
//             this.cartArr.forEach(v => {
//                 counter += +v.price * v.quantity
//             })
//             return counter
//         },
//         productsInCartArrSum () {
//             let counter = 0
//             this.cartArr.forEach(v => {
//                 counter += v.quantity
//             })
//             return counter
//         }
//     },
//     mounted () {
//         let t = []
//         this.results = t.map(v => {
//             if (v.vars) {
//                 v.vars[1].active = true
//             }
//             return v
//         })
//         axios.get(url, {
//             withCredentials: true
//         }).then(response => {
//             console.log(response)
//             this.results = response.data.map(v => {
//                 if (v.vars) {
//                     v.vars[1].active = true
//                 }
//                 return v
//             })
//         })
//     },
//     created(){
//         document.addEventListener('click', this.dropdown)
//     },
//     destroyed () {
//         document.removeEventListener('click', this.dropdown)
//     },
// })
