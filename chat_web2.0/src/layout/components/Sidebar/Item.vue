<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    // if (icon) {
    //   if (icon.includes('el-icon')) {
    //     vnodes.push(<i class={[icon, 'sub-el-icon']} />)
    //   } else {
    //     vnodes.push(<svg-icon icon-class={icon}/>)
    //   }
    // }

    // vnodes.push(<i class={[icon, 'iconfont', 'sub-el-icon']} />)
    vnodes.push(<svg-icon icon-class={icon} />)

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  color: currentColor;
  width: 20px !important;
  height: 20px !important;
  font-size: 14px;
}
.material-icons-round {
  font-size: 17px;
}
</style>
