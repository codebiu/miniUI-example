import { useDark } from '@vueuse/core'
const SysSettingStore = defineStore('sysSetting', () => {
  // state
  const baseMd = 768
  const sysStyle = ref({
    headFootShow: true,
    isUserControlShow: false,
    // 左侧选择栏
    leftControlShow: true,
    // 大小屏切分 普通页面不需要考虑横屏，部分三维场景考虑
    isMd: window.innerWidth > baseMd,
    theme: {
      isDark: useDark(),
      // useDark 本地设置 auto light dark
      themeValue: localStorage.getItem('vueuse-color-scheme'),
      head: [{ height: '35px' }],
      leftControl: {
        tabPosition: 'left'
      }
    },
    language: 'zh' as any
  })

  const sysObj = {
    $ObjLargeTemp: new Map()
  }
  // 窗口变化重置
  window.onresize = () => {
    // 判断中小设备
    sysStyle.value.isMd = window.innerWidth > baseMd
  }

  // 设置弹窗
  const isSysSettingShow = ref(false)


  /**
 * 手动更改主题
 */
  const changeThemeValue = () => {
    switch (sysStyle.value.theme.themeValue) {
      case 'light':
        sysStyle.value.theme.isDark = false
        break
      case 'dark':
        sysStyle.value.theme.isDark = true
        break
      case 'auto':
        // 媒体查询检测夜晚/黑暗模式
        sysStyle.value.theme.isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        break
    }
    console.log('r_changeThemeValue',sysStyle.value.theme.isDark)
    return sysStyle.value.theme.isDark
  }

  return { sysStyle, sysObj, isSysSettingShow, changeThemeValue }
})

export { SysSettingStore }
