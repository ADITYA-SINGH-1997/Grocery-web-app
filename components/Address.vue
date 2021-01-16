<template>
<div v-if="!submitted">
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            ref="name"
            v-model="name"
            :rules="[() => !!name || 'This field is required']"
            :error-messages="errorMessages"
            label="Full Name"
            placeholder="Dinesh Kumar"
            required
          ></v-text-field>
          <v-text-field
            ref="address"
            v-model="address"
            :rules="[
              () => !!address || 'This field is required',
              () => !!address && address.length <= 35 || 'Address must be less than 35 characters',
              addressCheck
            ]"
            label="Address Line"
            placeholder="RZ-923/E,Rajnagar-2,Palam Colony"
            counter="50"
            required
          ></v-text-field>
          <v-text-field
            ref="city"
            v-model="city"
            :rules="[() => !!city || 'This field is required', addressCheck]"
            label="City/District"
            placeholder="New Delhi"
            required
          ></v-text-field>
          
          <v-text-field
            ref="zip"
            v-model="zip"
            :rules="[() => !!zip || 'This field is required']"
            label="ZIP / Postal Code"
            required
            placeholder="110077"
          ></v-text-field>
          <v-autocomplete
            ref="state"
            v-model="state"
            :rules="[() => !!state || 'This field is required']"
            :items="states"
            label="State"
            placeholder="Select..."
            required
          ></v-autocomplete>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              left
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="my-0"
                  v-bind="attrs"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" text @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row></div>
</template>


<script>
  export default {
    data: () => ({
      states: ['Andhra Pradesh','Arunachal Pradesh','Assam', 'Bihar', 'Chhattisgarh','Delhi', 'Goa', 'Gujrat', 'Haryana', 'Himachal Pradesh', 'Jharkhand','Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalya','Mizoram', 'Nagaland','Orissa', 'Punjab','Rajasthan', 'Sikkim', 'Tamil Nadu','Telangana','Tripura','Uttarakhand','Uttar Pradesh','West Bengal'],
      errorMessages: '',
      name: null,
      address: null,
      city: null,
      state: null,
      zip: null,
      //country: null,
      formHasErrors: false,
      submitted:false
    }),

    computed: {
      form () {
        return {
          name: this.name,
          address: this.address,
          city: this.city,
          state: this.state,
          zip: this.zip,
          //country: this.country,
        }
      },
    },

    watch: {
      name () {
        this.errorMessages = ''
      },
    },

    methods: {
      addressCheck () {
        this.errorMessages = this.address && !this.name
          ? 'Hey! I\'m required'
          : ''

        return true
      },
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      submit () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true

          this.$refs[f].validate(true)
          let adr= this.name+' , '+this.address+' , '+this.city+' , '+this.state+' , PIN: '+this.zip
          if(!this.form[f]) {
              this.formHasErrors = true
          }
          else{
              this.submitted=true
              this.$store.commit('setAddress',adr)
          }
        })

    
      },
    },
  }
</script>