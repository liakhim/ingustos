const url = 'router/products.php';
const urlTags = 'router/tags.php';
let vm = new Vue({
    el: '#app',
    data: {
        currentStep: 0,
        openModal: false,
        message: 'qwerty',
        openCartModal: false,
        results: [],
        tags: [],
        cartArr: [],
        userName: '',
        userSecondName: '',
        userPhone: '',
        userEmail: '',
        userOrderDate: ''
    },
    watch: {
        openCartModal (v) {
            document.body.style.overflowY = v ? "hidden" : "scroll"
        },
      currentStep (v) {
          if (v === 3) {
              $('.input-daterange').datepicker({
                  format: 'dd-mm-yyyy',
                  todayHighlight: true,
                  startDate: '0d'
              });
          }
      }
    },
    methods: {
        test () {
          alert('change')
        },
        addToCart (product) {
            console.log(product)
            const k = this.localProducts.find(v => v.id === product.id)
            this.cartArr.push({
                ...k,
                quantity: 2
            })
        },
        deleteFromCart (id) {
            const ind = this.cartArr.indexOf(this.cartArr.find(v => v.id === id))
            this.cartArr.splice(ind, 1)
        },
        changeVariation (id, variation_id) {
            const prod = this.results.find(v => +v.id === +id)
            console.log(prod)
            prod.vars.map(v => {
                v.active = false
            })
            prod.vars[+variation_id].active = true
            let init = this.results
            this.results = []
            this.results = init
        },
        createOrder () {
            axios.post('router/order.php', {
                withCredentials: true
            })
        },
        postSend () {
            axios.post('router/test.php', JSON.stringify({
                params: '1'
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        activeVariable (product) {
            return product.vars.find(v => v.active)
        },
        countPercent (product) {
            return Math.floor(((this.choosePrice(product) - this.chooseMainPrice(product))/this.choosePrice(product))*100)
        },
        choosePrice (product) {
            let price
            if (product.vars) {
                let activeVariable = this.activeVariable(product)
                if (activeVariable.regular_price) {
                    price = activeVariable.regular_price
                } else {
                    price = activeVariable.price
                }
            } else {
                price = product.price
            }
            return price
        },
        chooseMainPrice (product) {
            let price
            if (product.vars) {
                let activeVariable = this.activeVariable(product)
                if (activeVariable.sale_price) {
                    price = activeVariable.sale_price
                } else {
                    price = activeVariable.price
                }
            } else {
                price = product.price
            }
            return price
        }
    },
    computed: {
        date () {
            console.log(document.getElementById('date'))
          return document.getElementById('date')
        },
        localProducts () {
            const arr = []
            this.results.forEach(v => {
                arr.push({
                    id: v.id,
                    active_variation_id: (v.vars && v.vars.length) ? v.vars.find(v => v.active).id : null,
                    active_variation_size: (v.vars && v.vars.length) ? v.vars.find(v => v.active).attributes[0].option : null ,
                    price: this.chooseMainPrice(v),
                    name: v.name,
                    attributes: v.attributes,
                })
            })
            return arr
        },
        filteredProducts () {
            return this.results.filter(v => v.id) || []
        },
        orderSum () {
            let counter = 0
            this.cartArr.forEach(v => {
                counter += +v.price
            })
            return counter
        }
    },
    mounted () {
        axios.get(urlTags, {
            withCredentials: true
        }).then(response => {
            this.tags = response.data
        })
        let t = []
        this.results = t.map(v => {
            if (!!v.vars) {
                v.vars[1].active = true
            }
            return v
        })
        axios.get(url, {
            withCredentials: true
        }).then(response => {
            console.log(response)
            this.results = response.data.map(v => {
                if (!!v.vars) {
                    v.vars[1].active = true
                }
                return v
            })
        })
    }
})
