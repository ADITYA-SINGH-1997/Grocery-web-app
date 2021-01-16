<template>
  <div style="margin-top:80px" class="login-page ">
    <v-layout flex align-center justify-center>
      <v-flex xs6 sm6 elevation-6>
        <v-card>
          <v-card-title flex align-center justify-center>
            <h1>Login</h1>
          </v-card-title>
          <v-card-text class="pt-4">
            <div>
              <v-form ref="form">
                <v-text-field
                  v-model="userData.email"
                  label="Enter your e-mail address"
                  counter
                  required
                ></v-text-field>
                <v-text-field
                  v-model="userData.password"
                  label="Enter your password"
                  :append-icon="
                    userData.showPassword ? 'mdi-eye-off' : 'mdi-eye'
                  "
                  :type="userData.showPassword ? 'text' : 'password'"
                  required
                  @click:append="userData.showPassword = !userData.showPassword"
                ></v-text-field>
                <v-layout justify-space-between>
                  <v-btn color="secondary" @click="logInUser(userData)">
                    Login
                  </v-btn>
                  <a href="?">Forgot Password</a>
                </v-layout><br> 
                <v-snackbar color="primary" v-model="snackbar">{{text}}</v-snackbar>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data: () => ({
    snackbar:false,
    text:null,
    userData: {
      email: 'email@email.com',
      password: 'long-password',
      showPassword: false,
    },
  }),
  methods: {
   async logInUser(userData){
      //this.$store.dispatch('logInUser', userData)
          try {
      await this.$auth.loginWith('local', {
        data: userData,
      })
      this.text = "successfully logged in"+ this.$auth.user.email
     this.snackbar=true

    } catch (error) {
      console.log(error)
      console.log('notification unsuccessful')
        this.text = "user doesn't exist"
      this.snackbar=true
    }
    console.log(this.$auth.user)
    }
  },
}
</script>
