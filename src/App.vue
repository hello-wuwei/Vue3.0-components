<template>
  <div class="app-container">
    <SearchSelect
      v-model="value"
      style="width: 100%"
      :options="remote.suspicious.options"
      :remote-method="remote.suspicious.method"
    />
  </div>
</template>

<script lang="ts" setup>
import { SearchSelect } from '@/components/SearchSelect/lib/index.es'
import useRemoteSearch from '@/use-hooks/use-remote-search'
import '@/components/SearchSelect/lib/style.css'
const remote = useRemoteSearch()
const value = ref([])
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  margin: 0;
}
ul {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
p {
  margin: 0;
}
#app {
  .app-container {
    height: 100%;
    .el-container {
      height: 100%;
    }
  }
}
</style>
