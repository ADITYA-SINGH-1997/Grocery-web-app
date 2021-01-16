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
         Login/Register
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
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Login', route:'login' },
        { title: 'Register', route:'register' },

      ],
    }),
  }
</script>