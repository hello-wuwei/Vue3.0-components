<template>
  <div ref="graph" style="height: 700px"></div>
</template>

<script lang="ts" setup>
import Graph from 'chain-graph'
// import Graph from '@/components/graph'
import normalNode from '@/utils/graph-node/normal-node'
import rootNode from '@/utils/graph-node/root-node'

const graph = ref<HTMLDivElement>()
const { createGraph } = new Graph({
  defaultNodeType: 'normal-node',
  beforeCreate({ registerNode }) {
    registerNode('normal-node', normalNode)
    registerNode('root-node', rootNode)
  },
  getBtnOptions(cfg) {
    const isFront = cfg?.direction !== 'BACK'
    const isBack = cfg?.direction !== 'FRONT'
    return {
      left: { extend: isFront, hidden: isFront, show: isFront },
      right: { extend: isBack, hidden: isBack, show: isBack },
    }
  },
  extendMethod(model) {
    const items = [1, 2, 3, 4, 5].map((item) => {
      return {
        label: 'node-' + item,
        id: item + new Date().getTime().toString(),
        children: [],
        direction: 'FRONT',
      }
    })
    const children = model.children.concat(items)
    return children
  },
  getEdgeStroke() {
    return 'red'
  },
})

onMounted(() => {
  createGraph(data, { el: graph.value! })
})
const data = {
  label: 'node-0',
  id: '000',
  children: [
    {
      label: 'node-1',
      id: '111',
      direction: 'FRONT',
      chlidren: [
        {
          label: 'node-11',
          id: '111-111',
          chlidren: [{ label: 'node-111', id: '111-112' }],
        },
      ],
    },
    {
      label: 'node-2',
      id: '222',
      direction: 'FRONT',
      chlidren: [
        {
          label: 'node-21',
          id: '222-111',
          chlidren: [{ label: 'node-211', id: '222-112' }],
        },
      ],
    },
    {
      label: 'node-3',
      id: '333',
      direction: 'FRONT',
      chlidren: [
        {
          label: 'node-31',
          id: '333-111',
        },
      ],
    },
    {
      label: 'node-4',
      id: '444',
      direction: 'FRONT',
      chlidren: [
        {
          label: 'node-41',
          id: '444-111',
        },
      ],
    },
    {
      label: 'node-5',
      id: '555',
      direction: 'FRONT',
      chlidren: [
        {
          label: 'node-51',
          id: '555-111',
          chlidren: [{ label: 'node-511' }],
        },
      ],
    },
  ],
}
</script>
