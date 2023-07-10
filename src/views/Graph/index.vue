<template>
  <div ref="graph" style="height: 700px"></div>
</template>

<script lang="ts" setup>
import Graph from '@/components/graph';
import normalNode from '@/utils/graph-node/normal-node'
import rootNode from '@/utils/graph-node/root-node'

const graph = ref<HTMLDivElement>()
const { createGraph } = new Graph({
  defaultNodeType: 'normal-node',
  beforeCreate({ registerNode }) {
    registerNode('normal-node', normalNode)
    registerNode('root-node', rootNode)
  }
})

onMounted(() => {
  createGraph(data.value, { el: graph.value! } )
})
  const data = ref([
    {
      label: 'node-1',
      chlidren: [
        {
          label: 'node-11',
          chlidren: [{ label: 'node-111' }]
        }
      ]
    },
    {
      label: 'node-2',
      chlidren: [
        {
          label: 'node-21',
          chlidren: [{ label: 'node-211' }]
        }
      ]
    },
    {
      label: 'node-3',
      chlidren: [
        {
          label: 'node-31',
        }
      ]
    },
    {
      label: 'node-4',
      chlidren: [
        {
          label: 'node-41',
        }
      ]
    },
    {
      label: 'node-5',
      chlidren: [
        {
          label: 'node-51',
          chlidren: [{ label: 'node-511' }]
        }
      ]
    }
  ])
</script>