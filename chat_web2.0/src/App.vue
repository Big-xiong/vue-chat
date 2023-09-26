<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'App',
	watch: {
		$route (to, from) {
			if (to.name === 'ServerLogin' && from.name === 'ChatServer') {
				this.offlineServer()
			}
		}
	},
	mounted () {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		const vh = window.innerHeight * 0.01
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`)

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			const vh = window.innerHeight * 0.01

			document.documentElement.style.setProperty('--vh', `${vh}px`)
		})
	},
	methods: {
		...mapActions('chatServer', ['offlineServer', 'onlineServer', 'hideServer'])
	}
}
</script>
