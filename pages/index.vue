<template>
<div 
style="margin-bottom:250px">
  
  <div style="margin-top:65px;">
  <AppCarousel /></div><v-divider/>
  
  <AppCategories />
  <AppGrid :data="newProducts" />
  <ScrollTop />
  
</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["newProducts"])
  },
  methods:{
    clearSearch(){
			this.$store.commit('setHasUserSearched', false);
		    this.$store.commit('setProductTitleSearched', '');
		}
  }
};
</script>

<style lang="scss" scoped>
</style>