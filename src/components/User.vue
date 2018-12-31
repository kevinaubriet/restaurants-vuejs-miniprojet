<template>
	<div id="user">
		<h3>Utilisateur</h3>
		<p>Mon nom est {{userName}}</p>
	</div>
</template>

<script>
import Info from './Info.vue';
import Restaurant from './Restaurant.vue'
export default {

	data() {
		return {
			userName : 'toto' 
		}
	},
	components: { 				// LOCAL COMPONENTS
		'app-info': Info 
	}
}
</script>

<style>
	p {
		font-style: italic;
		color:red; 
	}
</style>