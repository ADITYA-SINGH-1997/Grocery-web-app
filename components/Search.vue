<template>
      <v-text-field
	  @click:clear='clearValue()'
	  dark
	  clearable
        v-model="value"
        :placeholder="placeholder"
        @keyup="search(value)"
        class="mx-2"
        flat
        hide-details
        label="Search"
        prepend-inner-icon="mdi-magnify"
        solo-inverted
      ><v-btn dark>clear search</v-btn>
	  </v-text-field>
</template>

<script>
export default {
  name: 'search',
	data () {
		return {
			value: ''
		}
	},

	computed: {
		placeholder () {
			if (this.$route.path === '/wishlist') {
				return 'Search in wishlist...';
			} else {
				return 'Search...';
			}
		}
	},

	methods: {
		search (value) {
			if (value.length > 0) {
				this.$store.commit('setHasUserSearched', true);
				this.$store.commit('setProductTitleSearched', value);
			} else {
				this.$store.commit('setHasUserSearched', false);
				this.$store.commit('setProductTitleSearched', '');
			}
		},
		clearValue(){
			this.$store.commit('setHasUserSearched', false);
				this.$store.commit('setProductTitleSearched', '');
		}
		
	}
}
</script>
<style scoped>

</style>