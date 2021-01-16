<template>
     <v-container  style="height: 400px;">
      <v-row
        class="fill-height"
        align-content="center"
        justify="center"
      >
        <v-col
          class="subtitle-1 text-center"
          cols="12"
        >
        <v-avatar>
          <v-img src="/logoMobile.jpg"></v-img>
        </v-avatar>
        </v-col>
        <v-col cols="2">
          <v-progress-linear
            color="primary"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
</template>
