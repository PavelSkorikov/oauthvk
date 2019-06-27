<template>
  <q-layout view="lHh Lpr lFf">
    <q-tabs
      v-model="tab"
      inline-label
      class="bg-primary text-white shadow-2"
    >
      <q-tab name="auth" icon="people" label="Авторизация" />
    </q-tabs>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
