<template>
  <SearchSelect
    v-model="value"
    style="width: 100%"
    :options="remote.suspicious.options"
    :remote-method="remote.suspicious.method"
  />
</template>

<script lang="ts" setup>
import SearchSelect from '@/components/SearchSelect/index.vue'
import useRemoteSearch from '@/use-hooks/use-remote-search'
const remote = useRemoteSearch()
const value = ref([])
</script>