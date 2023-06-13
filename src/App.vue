<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

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
