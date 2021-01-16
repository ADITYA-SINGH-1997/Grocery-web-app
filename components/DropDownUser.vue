<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="accent"
          dark
          v-bind="attrs"
          v-on="on"
        >
         {{$auth.user.first_name}}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
           nuxt :to="`/${item.route}`" 
        >
         <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-list-item > <div v-if="$auth.loggedIn" class="hidden-sm-and-down">
         <nuxt-link  to="/"> <v-btn color="secondary" @click="$auth.logout()" >
          <v-icon >mdi-logout</v-icon>Logout</v-btn></nuxt-link>
         </div></v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'My Account', route:'myAccount' },
        { title: 'Orders', route:'orders' },
      ],
    }),
  }
</script>