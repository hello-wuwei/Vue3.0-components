<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- <span class="lang-text"> -->
  {{ text }}
  <!-- </span> -->
</template>

<script lang="ts" setup>
  import { useLang, LangMapProps } from '.'
  import { computed, useSlots } from 'vue'
  const props = defineProps<{ langs?: LangMapProps }>()
  const slots: any = useSlots()
  const { lg } = useLang()
  const originText = slots.default()[0].children
  const text = computed(() => lg(originText, props.langs))
</script>
