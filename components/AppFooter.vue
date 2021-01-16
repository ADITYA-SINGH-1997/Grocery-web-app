<template>
  <v-footer
  absolute
    color="grey darken-2"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col cols="12" class=" py-4 text-center white--text">
         <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-col>
      <v-col
        class="grey  py-4 text-center white--text"
        cols="12"
      >
        &copy; {{ new Date().getFullYear() }} — <strong>Fress Kart</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>


<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
    }),
  }
</script>