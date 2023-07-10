const options = [
  {
    label: '项目一',
    value: '1',
  },
  {
    label: '项目二',
    value: '2',
  },
  {
    label: '项目三',
    value: '3',
  },
  {
    label: '项目四',
    value: '4',
  },
]

const useRemoteSearch = () => {
  const suspiciousRemoteMethod = (keywords: any) => {
    if (!keywords) {
      if (remote.suspicious.defaultOptions.length) {
        remote.suspicious.options = remote.suspicious.defaultOptions
        return
      }
      remote.suspicious.defaultOptions = options as any
      remote.suspicious.options = options as any
      return
    }
    remote.suspicious.options = remote.suspicious.defaultOptions.filter((option: any) =>
      option.label.toLowerCase().includes(keywords.toLowerCase())
    )
  }

  const remote = reactive({
    suspicious: {
      defaultOptions: [],
      options: [],
      loading: false,
      method: suspiciousRemoteMethod,
    },
  })

  return remote
}

export default useRemoteSearch
