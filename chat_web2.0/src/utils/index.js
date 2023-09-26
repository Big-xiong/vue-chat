/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * 将驼峰命名转换为中划线命名
 * @param {*} v
 */
export function camel2Dashed(v) {
  return v.replace(/[A-Z]/g, match => '-' + match.toLowerCase())
}

export function numberToUpperCase(textIndex) {
  let newString = ''
  const newTextIndex = (textIndex + 1) + ''

  function sum(value, index) {
    var newValue = ''
    if ((textIndex === 9)) {
      return !index ? '十' : ''
    }
    const isSeat = (~~textIndex > 9 && ~~textIndex < 19)
    switch (~~value) {
      case 1:
        newValue = !index ? (isSeat ? '' : '一') : '十一'
        break
      case 2:
        newValue = !index ? (isSeat ? '' : '二') : '十二'
        break
      case 3:
        newValue = !index ? (isSeat ? '' : '三') : '十三'
        break
      case 4:
        newValue = !index ? (isSeat ? '' : '四') : '十四'
        break
      case 5:
        newValue = !index ? (isSeat ? '' : '五') : '十五'
        break
      case 6:
        newValue = !index ? (isSeat ? '' : '六') : '十六'
        break
      case 7:
        newValue = !index ? (isSeat ? '' : '七') : '十七'
        break
      case 8:
        newValue = !index ? (isSeat ? '' : '八') : '十八'
        break
      case 9:
        newValue = !index ? (isSeat ? '' : '九') : '十九'
        break
      case 0:
        newValue = '十'
        break
      default:
        break
    }
    return newValue
  }

  for (let i = 0; i < newTextIndex.length; i++) {
    newString += sum(newTextIndex.substring(i, i + 1), i)
  }
  return newString
}

export function setColorOrGradient(color) {
  if (!color) {
    return ''
  }
  if (color.indexOf(',') != -1) {
    const _color = color.split(',')
    return `background-image: linear-gradient(to bottom, ${_color[0]} , ${_color[1]});`
  } else {
    return `background:${color};`
  }
}

export function isMobile () {
  const info = navigator.userAgent
  const agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod', 'iPad']
  for (let i = 0; i < agents.length; i++) {
    if (info.indexOf(agents[i]) >= 0) return true
  }
  return false
}

// 图片压缩上传
export const imgTool = {
  // 判断图片大小-进行压缩
  beforeUpload(file, MBsize, KBsize){
      return new Promise((resolve, reject) => {
          let isLt2M = file.size / 1024 / 1024 > MBsize; // 判定图片大小是否小于 *** MB
          if(KBsize) {
              isLt2M = file.size / 1024 > KBsize; // 判定图片大小是否小于 *** KB
          }
          if(!isLt2M) {
              reject()
          }
          let image = new Image(), resultBlob = '';
          image.src = URL.createObjectURL(file);
          image.onload = () => {
              // 调用方法获取blob格式，方法写在下边
              resultBlob = imgTool.compressUpload(image, file);
              resolve(resultBlob)
          }
          image.onerror = () => {
              reject()
          }
      });
  },

  /* 图片压缩方法-canvas压缩 */
  compressUpload(image, file) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let initSize = image.src.length
      let { width } = image, { height } = image
      canvas. width = width
      canvas.height = height
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(image, 0, 0, width, height)

      // 进行最小压缩0.1
      let compressData = canvas.toDataURL('image/jpeg', 0.1)

      // 压缩后调用方法进行base64转Blob，方法写在下边
      let blobImg = imgTool.dataURItoBlob(compressData)
      return blobImg
  },

  /* base64转Blob对象 */
  dataURItoBlob(data) {
      let byteString;
      if(data.split(',')[0].indexOf('base64') >= 0) {
          byteString = atob(data.split(',')[1])
      }else {
          byteString = unescape(data.split(',')[1])
      }

      let mimeString = data
          .split(',')[0]
          .split(':')[1]
          .split(';')[0];
      let ia = new Uint8Array(byteString.length)
      for( let i = 0; i < byteString.length; i += 1) {
          ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ia], {type: mimeString})
  }
}
