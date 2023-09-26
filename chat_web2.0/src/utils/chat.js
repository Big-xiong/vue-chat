const baseUrl = process.env.VUE_APP_BASE_URL

// 聊天内容格式化
export function formatContent(content) {
  // 格式化表情
  content = content.replace(/face\[([0-9a-z]+)\]/g, '<img src="/img/emoji/$1.png" class="emoji" />')
  // 格式化图片
  // content = content.replace(/^img\[(\S+)\]$/, `<img src="${baseUrl}$1" class="img" />`)
  content = content.replace(/img\[([\s\S]+)\]/, `<img src="${baseUrl}$1" class="img" />`)
  // 格式化文件
  content = content.replace(/^file\(([\s\S]+)\)\[([\s\S]+)\]$/, `<a href="${baseUrl}$1" class="file"><i class="iconfont icon-file-download"></i>$2</a>`)
  // 格式化视频
  content = content.replace(/^video\[([\s\S]+)\]$/, `<video src="${baseUrl}$1" controls="controls" class="video" />`)
  // 格式化音频
  content = content.replace(/^audio\[([\s\S]+)\]$/, `<audio src="${baseUrl}$1" controls="controls" class="audio" />`)
  return content
}

// 标题闪烁
export const titleFlash = {
  step: 0,
  timer: null,
  start(vm) {
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      document.title = ++this.step % 2 == 0 ? vm.$t('chatServer.flashTitle.empty') + vm.$t('chatServer.flashTitle.souce') : vm.$t('chatServer.flashTitle.entity') + vm.$t('chatServer.flashTitle.souce')
    }, 600)
  },
  end(vm) {
    clearInterval(this.timer)
    document.title = vm.$t('chatServer.flashTitle.souce')
  }
}

// 消息通知
export function desktopNotice(avatar, message) {
  Notification.requestPermission(status => {
    if (status == 'granted') {
      const notice = new Notification('您有新消息', {
        dir: 'auto',
        icon: avatar,
        body: message,
        tag: 'sds' + Math.random()
      })
      notice.onclick = function() {
        window.focus()
      }
      notice.onshow = function() {
        setTimeout(function() {
          notice.close()
        }, 4000)
      }
    }
  })
}

// 放大聊天内容中的图片
export function extractImage(message) {
  if (message) {
    const imgReg = /img\[([\s\S]+?)\]/
    let index = message.search(imgReg)
    if (index == -1) {
      return {
        includeImg: false,
        content: formatContent(message)
      }
    } else {
      const content = []

      while (index != -1) {
        const prev = message.slice(0, index)
        const match = imgReg.exec(message)
        content.push(prev)
        content.push({
          isImg: true,
          src: baseUrl + match[1]
        })
        message = message.slice(index + match[0].length)
        index = message.search(imgReg)
      }
      content.push(message)

      return {
        includeImg: true,
        content: content
      }
    }
  } else {
    return {
      includeImg: false,
      content: ''
    }
  }
}
