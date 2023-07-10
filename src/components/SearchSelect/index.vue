<template>
  <div ref="containerRef" class="search-select-container">
    <div class="select-wrapper" @click="handleShowPopper">
      <div v-if="!indexs.viewIndexs.length" class="placeholder">Select</div>
      <div v-if="showLayout" class="select-tags-container">
        <div class="search-select-tags-wrapper">
          <el-tag
            v-for="index in indexs.viewIndexs"
            :key="index"
            disable-transitions
            type="info"
            closable
            @close="handleItemClick(selectedOptions[index])"
          >
            <slot name="tag" :option="selectedOptions[index]">{{ selectedOptions[index][labelKey] }}</slot>
          </el-tag>
          <el-tag v-if="indexs.collapseIndexs.length" disable-transitions type="info" @click.stop="onCollapseClick">
            +{{ indexs.collapseIndexs.length }}
          </el-tag>
        </div>
        <div class="search-select-arrow">
          <el-icon :size="16" class="arrow" :class="{ 'is-reverse': showPopper }"><ArrowDown /></el-icon>
        </div>
      </div>

      <el-icon
        v-if="indexs.viewIndexs.length"
        class="clear-icon"
        :size="14"
        @click.stop="emit('update:modelValue', [])"
      >
        <Close />
      </el-icon>
      <div class="select-tags-container" style="height: 0; overflow: hidden; border-top: none; border-bottom: 0">
        <div ref="tagsRef" class="search-select-tags-wrapper">
          <el-tag v-for="tag in selectedOptions" :key="tag[valueKey]" disable-transitions type="info" closable>
            <slot name="tag" :option="tag">{{ tag[labelKey] }}</slot>
          </el-tag>
        </div>
        <div class="search-select-arrow">
          <el-icon :size="14" class="arrow"><ArrowDown /></el-icon>
        </div>
      </div>
    </div>
    <transition name="be-zoom-in-top">
      <div v-if="showPopper" class="popper-warpper">
        <div class="content-board">
          <div class="input-search-wrapper">
            <el-input v-model="keywords" clearable placeholder="Please search for content" @input="onInput">
              <template #suffix>
                <el-icon>
                  <Search />
                </el-icon>
              </template>
            </el-input>
          </div>
          <p class="tip-text">
            <slot name="search-tip"></slot>
          </p>
          <ul v-loading="props.loading">
            <li
              v-for="option in options"
              :key="option[valueKey]"
              :class="{
                selected: modelValue.includes(option[valueKey]),
                selectdisabled: selectDisabledOption(option),
                disabled: disabledOption(option),
              }"
              @click="handleItemClick(option)"
            >
              <slot name="option" :option="option">
                <span>{{ option[props.labelKey] }}</span>
              </slot>
            </li>
          </ul>
          <div v-if="!options.length" class="empty">No data to show</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDown, Close, Search } from '@element-plus/icons-vue'
// import options from './mock'
import { debounce, uniqBy } from 'lodash'

type Option = { [key: string]: string }
type Value = (number | string)[]
const props = withDefaults(
  defineProps<{
    loading?: boolean
    options?: Option[]
    valueKey?: string
    labelKey?: string
    modelValue?: Value
    initRemoteLoad?: boolean
    defaultSelectedOptions?: any
    disabledOption?: (option: Option) => boolean
    selectDisabledOption?: (option: Option) => boolean
    remoteMethod?: (keywords?: string) => void
  }>(),
  {
    loading: false,
    options: () => [],
    valueKey: 'value',
    labelKey: 'label',
    modelValue: () => [],
    initRemoteLoad: true,
    defaultSelectedOptions: null,
    disabledOption: () => false,
    selectDisabledOption: () => false,
    remoteMethod: undefined,
  }
)

const containerRef = ref(null)
const tagsRef = ref(null)

const emit = defineEmits(['update:modelValue', 'collapse-click'])

const indexs = ref<{ viewIndexs: number[]; collapseIndexs: number[] }>({
  viewIndexs: [],
  collapseIndexs: [],
})
const showPopper = ref(false)

const outMousedownClosePopper = (e: MouseEvent) => {
  if (!showPopper.value) return
  const board = containerRef.value as HTMLDivElement | null // 搜索面板元素
  if (board && !board.contains(e.target as Node)) {
    showPopper.value = false
    keywords.value = ''
    onInput('')
  }
}

document.addEventListener('mousedown', outMousedownClosePopper)

onUnmounted(() => {
  document.removeEventListener('mousedown', outMousedownClosePopper)
})

const onCollapseClick = () => {
  emit('collapse-click', selectedOptions.value)
}

const handleShowPopper = () => {
  showPopper.value = true
}
props.initRemoteLoad && props.remoteMethod && props.remoteMethod()

const keywords = ref('')
const onInput = debounce((keywords: string) => {
  props.remoteMethod && props.remoteMethod(keywords)
}, 600)

const getCollapseLayout = () => {
  const container = tagsRef.value as HTMLElement | null
  if (!container) return { viewIndexs: [], collapseIndexs: [] }
  const tags = container.children
  const containerSize = window.getComputedStyle(container)
  const containerWidth = Math.ceil(Number(containerSize.width.slice(0, -2)))
  const tagNum = tags.length
  if (!tagNum) return { viewIndexs: [], collapseIndexs: [] }

  let viewWidth = 0
  const viewIndexs = []
  const collapseIndexs = []
  for (let i = 0; i < tagNum; i++) {
    const el = tags[i] as any
    const size = window.getComputedStyle(el)
    const width = Math.ceil(Number(size.width.slice(0, -2))) + 4 // 4为margin-left数
    const cacheWidth = viewWidth + width
    if (cacheWidth < containerWidth - 70) {
      viewWidth = cacheWidth
      viewIndexs.push(i)
    } else {
      collapseIndexs.push(i)
    }
  }
  return { viewIndexs, collapseIndexs }
}

const layout = async (cb?: any) => {
  await nextTick()
  indexs.value = getCollapseLayout()
  cb && cb()
}

watch(
  [() => props.modelValue, () => props.options],
  () => {
    // 重绘前隐藏上一次的layout布局，避免计算新的布局items时出现无对应index，导致报错
    showLayout.value = false
    layout(() => {
      // 重绘后显示新的layout布局
      showLayout.value = true
    })
  },
  { deep: true }
)

const cacheSearchOptions = ref<any[]>([])
watch([() => props.options, () => props.defaultSelectedOptions], ([options, defaultOptions]) => {
  if (options && options.length) {
    cacheSearchOptions.value = uniqBy([...cacheSearchOptions.value, ...options], props.valueKey)
  }
  if (defaultOptions && defaultOptions.length) {
    cacheSearchOptions.value = uniqBy([...cacheSearchOptions.value, ...defaultOptions], props.valueKey)
  }
})
const getSelectedOptionsByValue = (value: Value) => {
  const selectedOptions: Option[] = []
  cacheSearchOptions.value.forEach((option: Option) => {
    if (value.includes(option[props.valueKey])) {
      selectedOptions.push(option)
    }
  })

  // if (props.defaultSelectedOptions) {
  //   const optionIds = selectedOptions.map((option: any) => option[props.valueKey])
  //   props.defaultSelectedOptions.forEach((option: Option) => {
  //     if (value.includes(option[props.valueKey]) && !optionIds.includes(option[props.valueKey])) {
  //       selectedOptions.push(option)
  //     }
  //   })
  // }

  return selectedOptions
}

const selectedOptions = computed(() => getSelectedOptionsByValue(props.modelValue))
const showLayout = ref(true)

const handleItemClick = async (option: any) => {
  if (props.disabledOption(option) || props.selectDisabledOption(option)) return
  const value = [...props.modelValue]
  const index = value.indexOf(option[props.valueKey])
  if (index > -1) {
    value.splice(index, 1)
  } else {
    value.push(option[props.valueKey])
  }
  emit('update:modelValue', value)
}
</script>

<style lang="scss" scoped>
.search-select-tags-wrapper {
  height: 28px;
  width: calc(100% - 22px);
  display: flex;
  ::v-deep(.el-tag) {
    box-sizing: border-box;
    border-color: transparent;
    margin: 2px 0 2px 4px;
    &.el-tag--info {
      background-color: #f0f2f5;
    }
  }
}
.search-select-container {
  position: relative;
  .select-wrapper {
    position: relative;
    .placeholder {
      position: absolute;
      left: 16px;
      top: 0;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      font-weight: 400;
      color: #ccd0d9;
    }
    .clear-icon {
      display: none;
      position: absolute;
      top: 9px;
      right: 36px;
    }
    &:hover {
      .clear-icon {
        display: block;
        cursor: pointer;
      }
    }
  }
  .select-tags-container {
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    height: 32px;
    border-radius: 4px;
    min-width: 100px;
    padding-right: 16px;
    display: flex;
    align-items: center;

    .search-select-arrow {
      width: 22px;
      height: 100%;
      pointer-events: all;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-direction: row-reverse;
      .arrow {
        position: relative;
        height: 1em;
        z-index: 2;
        transition: transform 0.3s;
        transform: rotateZ(0deg);
        cursor: pointer;
        margin-left: 8px;
        &.is-reverse {
          transform: rotateZ(-180deg);
        }
      }
    }
  }
}

.popper-warpper {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding-top: 10px;
  z-index: 2000;
  .content-board {
    background: #fff;
    border: 1px solid var(--el-border-color-light);
    box-shadow: var(--el-box-shadow-light);
    border-radius: 4px;
    .empty {
      font-weight: 400;
      color: #99a2b3;
      height: 100px;
      text-align: center;
      line-height: 100px;
    }
  }
  .input-search-wrapper {
    padding: 16px;
    padding-bottom: 8px;
    position: relative;
    .clear-icon {
      position: absolute;
      right: 52px;
      top: 26px;
      cursor: pointer;
    }
  }

  ul {
    max-height: 300px;
    overflow-y: scroll;
    font-size: 12px;
    line-height: 20px;
    min-width: 10px;
    word-wrap: break-word;
    visibility: visible;
    li {
      position: relative;
      font-size: var(--el-font-size-base);
      padding: 0 32px 0 16px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--el-text-color-regular);
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;
      &.disabled {
        color: #ccd0d9;
        cursor: not-allowed;
      }
      &.selectdisabled {
        color: var(--el-text-color-regular);
        cursor: default;
      }
      &.selected {
        color: var(--el-color-primary);
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          right: 20px;
          border-top: none;
          border-right: none;
          background-repeat: no-repeat;
          background-position: center;
          background-color: var(--el-color-primary);
          mask: url("data:image/svg+xml;utf8,%3Csvg class='icon' width='200' height='200' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='currentColor' d='M406.656 706.944L195.84 496.256a32 32 0 10-45.248 45.248l256 256 512-512a32 32 0 00-45.248-45.248L406.592 706.944z'%3E%3C/path%3E%3C/svg%3E")
            no-repeat;
          mask-size: 100% 100%;
          -webkit-mask: url("data:image/svg+xml;utf8,%3Csvg class='icon' width='200' height='200' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='currentColor' d='M406.656 706.944L195.84 496.256a32 32 0 10-45.248 45.248l256 256 512-512a32 32 0 00-45.248-45.248L406.592 706.944z'%3E%3C/path%3E%3C/svg%3E")
            no-repeat;
          -webkit-mask-size: 100% 100%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
        }
      }
      &:hover:not(.disabled, .selectdisabled) {
        background-color: var(--el-fill-color-light);
      }
    }
  }
}

.tip-text {
  padding: 0 16px;
  font-size: 12px;
  color: #001640;
}
</style>

<style lang="scss">
.be-zoom-in-top-enter-active,
.be-zoom-in-top-leave-active {
  opacity: 1;
  -webkit-transform: scaleY(1);
  transform: scaleY(1);
  -webkit-transition: opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  transition: opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1),
    -webkit-transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  -webkit-transform-origin: center top;
  transform-origin: center top;
}

.be-zoom-in-top-enter,
.be-zoom-in-top-leave-active {
  opacity: 0;
  -webkit-transform: scaleY(0);
  transform: scaleY(0);
}
</style>
