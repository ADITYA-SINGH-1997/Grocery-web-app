<template>
    <v-card
    class="mx-auto"
    >
    <v-container fluid>
      <v-row >
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
          md="3"
          sm="3"
        >
        <v-hover >
          <v-card
          >
             <NuxtLink :to="`${card.id}`">
            <v-img
              :src="card.src"
            >
            </v-img>
             </NuxtLink>
          </v-card>
        </v-hover>
        </v-col>
      </v-row>
    </v-container>
    </v-card>
</template>

<script>
  export default {
    data: () => ({
      cards: [
        { title: 'fruits', src: '/a.jpg', flex: 6, id:"/fruits" },
        { title: 'vegetables', src: '/vegetables.jpg', flex: 6, id:"/vegetables" },
        { title: 'grocery', src: '/grocery.jpg', flex: 6, id:"/grocery"  },
        { title: 'dairy', src: '/dairy.jpg', flex: 6, id:"/dairy"  },
      ],
    }),
  }
</script>
<style scoped>



</style>