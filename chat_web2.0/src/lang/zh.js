export default {
  // 商户登录
  sellerLogin: {
    title: '商户登录',
    label: {
      username: '用户名或邮箱',
      password: '密码',
      captcha: '验证码'
    },
    placeholder: {
      username: '请输入用户名或邮箱',
      password: '请输入密码',
      captcha: '请输入验证码'
    },
    tips: {
      username: '请输入用户名或邮箱',
      password: '请输入密码',
      captcha: '验证码不能为空'
    },
    actions: ['登录爱洽', '注册团队', '忘记密码？', '联系客服', '去官网']
  },
  // 客服登录
  serverLogin: {
    title: '客服登录',
    phone: "手机登录",
    phoneTips: "扫码手机登录工作台",
    placeholder: {
      seller_code: '请输入商户名称',
      username: '请输入客服用户名',
      password: '请输入密码',
      captcha: '请输入右侧验证码'
    },
    tips: {
      username: '用户名不能为空',
      password: '密码不能为空',
      captcha: '验证码不能为空',
      logined: '已有客服登录'
    },
    login: '登录',
    peopleType: ['客服人员', '协助人员']
  },
  // 忘记密码
  forgetPassword: {
    title: '忘记密码',
    subTitle: '请填写登录邮箱，我们将发送一封验证邮件',
    placeholder: {
      email: '请输入注册邮箱地址',
      veriCode: '请输入验证码',
      password: '请输入新密码',
      repeatPassword: '请输入新密码'
    },
    tips: {
      email: ['邮箱不能为空', '邮箱格式错误'],
      veriCode: '验证码不能为空',
      password: '请输入新密码',
      repeatPassword: '请输入新密码'
    },
    veriCode: ['后重新获取', '发送验证码'],
    actions: ['返回', '重置密码', '联系客服', '返回首页'],
    resetResult: ['重置密码成功', '重置密码失败'],
    sendResult: ['发送成功', '发送失败']
  },
  // 导航栏
  navbar: {
    periodOfValidity: '使用有效期',
    remaind: '剩余',
    renew: '续费',
    day: '天',
    show: '显示',
    hide: '收起',
    refresh: '刷新',
    messageList: '消息列表',
    fullScreen: '全屏',
    exitFullScreen: '退出全屏',
    modifyPwd: '修改密码',
    buyProd: '购买产品',
    howToUse: '如何使用',
    logout: '退出',
    zh: '中文（简体）',
    en: '英语',
    vi: '越南语',
    th: '泰语',
    es: '西班牙语',
    pt: '葡萄牙语',
    ms: '马来语',
    nightMode: '深夜模式',
    versionInfo: {
      title: '版本信息',
      curVersion: '当前版本：v2.0',
      versionTitle: '授权协议',
      versionContent: `
      <div>1、授权 爱洽 获得官方认证，用户拥有获取后续的更新代码权利。</div>
      <div>2、授权者可将授权后的产品用于任意符合国家法律法规的应用平台，并且不受域名和项目数量限制。</div>
      <div>3、授权者如果使用 爱洽 付费产品开发的商业项目（如ERP、CMS等），需保留授权产品的源码头注释和出处。</div>
      <div>4、授权者务必尊重知识产权，严格保证不恶意传播产品源码、不得直接对授权的产品本身进行二次转售或倒卖、不得对授权的产品进行简单包装后声称为自己的产品等。否则我们有权利收回产品授权，并根据事态轻重追究相应法律责任。</div>
      <div>5、授权 爱洽 官方的源码类付费产品，不支持退款。</div>
      <div>6、我们有义务为授权者提供有效期内的产品下载、更新和维护，一旦过期，授权者无法享有相应权限。终身授权则不受限制。</div>
      <div>7、www.aichating.com 拥有最终解释权</div>
      `,
      reserved: '版权所有'
    },
    modifyPwdForm: {
      title: '修改密码',
      label: {
        oldPwd: '旧密码',
        newPwd: '新密码',
        repeatPwd: '重复密码'
      },
      placeholder: {
        oldPwd: '请输入旧密码',
        newPwd: '请输入新密码',
        repeatPwd: '请输入重复密码'
      },
      tips: {
        oldPwd: '新密码不能为空',
        newPwd: '旧密码不能为空',
        repeatPwd: '重复密码不能为空',
        notSame: '新密码和重复密码不一致'
      }
    }
  },
  // 主页
  dashboard: {
    total: '全部',
    receptionVolume: {
      cumulative: '累计接待量',
      today: '今日接待量',
      online: '当前在线客服',
      unConsult: '未咨询访客'
    },
    onlineServer: {
      title: '在线客服详情',
      name: '用户名',
      group: '所在小组',
      lastLoginTime: '最后登录时间',
      status: '状态',
      serveredNumber: '服务人数',
      totalServeredNumber: '累计服务人数',
      online: '在线',
      offline: '离线',
      invisible: '隐身'
    },
    offlineServer: {
      message: ' 是否客服下线',
      tips: '提示',
      confirm: '确定',
      cancel: '取消'
    },
    receptionOptions: [
      '最近30天接待情况',
      '最近7天接待情况',
      '最近15天接待情况'
    ],
    chart: {
      receptionVolume: '接待人数'
    }
  },
  // 分组列表
  group: {
    groupNamePlaceholder: '请输入分组名称',
    table: {
      groupId: '分组ID',
      accessType: '接入形式',
      platform: '所属平台',
      groupName: '分组名称',
      peopleNumber: '分组人数',
      isPrep: '是否前置分组',
      status: '分组状态',
      createDate: '创建时间',
      updateDate: '更新时间',
      yes: '是',
      no: '否',
      active: '已激活',
      unActive: '未激活'
    },
    form: {
      addTitle: '添加分组',
      editTitle: '编辑分组',
      yes: '是',
      no: '否',
      label: {
        platform: '所属平台',
        groupName: '分组名称',
        isActive: '是否激活',
        isPrep: '是前置组'
      },
      placeholder: {
        groupName: '请输入分组名称',
        platform: '请选择所属平台'
      },
      tips: {
        groupName: '分组名称不能为空',
        platform: '所属平台不能为空'
      }
    },
    delete: {
      message: ' 是否删除分组：{groupName}',
      tips: '提示',
      confirm: '确定',
      cancel: '取消'
    }
  },
  // 客服列表
  server: {
    search: {
      placeholder: {
        serverName: '请输入客服名称',
        serverGroup: '请选择客服分组'
      }
    },
    table: {
      serverCode: '客服标识',
      userName: '用户名',
      serverName: '客服名称',
      serverAvatar: '客服头像',
      serverGroup: '所属分组',
      maxServedNumber: '最大服务人数',
      serverStatus: '客服状态',
      onlineStatus: '在线状态',
      activated: '已激活',
      prohibited: '已禁止',
      online: '在线',
      offline: '离线',
      invisible: '隐身',
      assist: '助手'
    },
    form: {
      addTitle: '添加客服',
      editTitle: '编辑客服',
      yes: '是',
      no: '否',
      change: '更换',
      peopleType: ['添加客服', '添加协助人员'],
      label: {
        serverName: '客服名称',
        serverPwd: '客服密码',
        serverGroup: '所属分组',
        maxServedNumber: '最大服务人数',
        userName: '用户名',
        activeStatus: '是否激活',
        serverAvatar: '客服头像'
      },
      placeholder: {
        serverName: '请输入客服名称',
        serverPwd: '请输入客服密码',
        resetPwd: '输入则为重置',
        serverGroup: '请选择所属分组',
        maxServedNumber: '请输入最大服务人数',
        userName: '请输入用户名'
      },
      tips: {
        serverName: '客服名称不能为空',
        serverPwd: '客服密码不能为空',
        serverGroup: '所属分组不能为空',
        maxServedNumber: '最大服务人数不能为空',
        minServerNumber: '最大服务人数最少为10',
        userName: [
          '用户名不能为空',
          '该用户名已存在'
        ]
      },
      assistLabel: {
        userName: '用户名',
        nickName: '昵称',
        password: '密码',
        isActive: '是否激活',
        avatar: '头像'
      },
      assistPlaceholder: {
        userName: '请输入用户名',
        nickName: '请输入昵称',
        password: '请输入密码',
        isActive: '是否激活',
        avatar: '头像',
        inputPwd: '请输入密码',
        resetPwd: '输入即重置'
      },
      assistTips: {
        userName: '用户名不能为空',
        nickName: '昵称不能为空',
        password: '密码不能为空'
      },
      custom: '自定义'
    },
    delete: {
      message: ' 是否删除客服：{serverName}',
      tips: '提示',
      confirm: '确定',
      cancel: '取消'
    }
  },
  // 域名绑定
  platform: {
    platformPlaceholder: '请输入平台名称',
    addDomainCourse: '域名添加教程',
    batchTips: '请先选择需要修改的平台',
    table: {
      id: '编号',
      domain: '域名',
      platform: '平台名称',
      sign: '客服签名'
    },
    form: {
      addTitle: '添加域名',
      editTitle: '编辑域名',
      batchEdit: '批量编辑',
      label: {
        platformName: '平台名称',
        domainName: '绑定域名',
        islayer: '是否弹层',
        withdraw: '撤回时间',
        serverSign: '客服签名',
        skype: 'SKYPE电话',
        themeColor: '主题颜色',
        bgColor: '背景色',
        switch: '夜晚模式',
        night: '夜晚模式：',
        day: '白天模式：',
        fontColor: '字体颜色',
        onlineImg: '在线图标',
        chatBg: '背景图',
        promoteImg: '展示图片',
        picSize: '推广图宽度大小为230像素',
        promoteLink: '推广链接',

        nightThemeColor: '主题颜色',
        nightWbgColor: '窗口背景色',
        nightChatBgColor: '聊天背景色',
        nightRightColor: '右侧功能区颜色',
        nightFontColor: '字体颜色',
        dayThemeColor: '主题颜色',
        dayWbgColor: '窗口背景色',
        dayChatBgColor: '聊天背景色',
        dayRightColor: '右侧功能区颜色',
        dayFontColor: '字体颜色'
      },
      placeholder: {
        platformName: '请输入平台名称',
        withdraw: '请选择撤回时间',
        domainName: '请输入域名，多个使用换行，域名可以填写特征，主要使用referer赋值',
        serverSign: '请输入客服签名',
        skype: '请输入SKYPE',
        promoteLink: '请输入推广链接'
      },
      tips: {
        platformName: '平台名称不能为空',
        domainName: '域名不能为空'
      },
      unit: {
        close: '关闭',
        s: '秒',
        m: '分钟'
      },
      yes: '是',
      no: '否'
    },
    delete: {
      message: ' 是否删除域名：{domainName}',
      tips: '提示',
      confirm: '确定',
      cancel: '取消'
    },
    default: {
      message: ' 样式将恢复为默认样式',
      tips: '提示',
      confirm: '确定',
      cancel: '取消'
    }
  },
  // 接入客服
  connectServer: {
    type: {
      auto: '自动分配接入',
      fixed: '固定连接接入',
      halfFixed: '半固定连接接入',
      layer: '弹层接入'
    },
    auto: {
      text: [
        '你可以选择条件，生成的网址链接：',
        '输入或选择相应平台',
        '选择自定义参数',
        '选择推荐参数',
        '生成客服链接',
        '* 适用于多个客服同时接入，根据分配策略分配客服',
        '不选择分组即为全部分组客服',
        '下载二维码',
        '复制链接'
      ],
      placeholder: {
        platform: '输入或选择相应平台',
        group: '选择分组'
      },
      tips: {
        platform: '请输入或选择相应平台'
      },
      table: {
        strategy: {
          title: '分配规则',
          options: ['平台分配', '组内分配']
        },
        link: '接入链接',
        ercode: '二维码'
      },
      log: '勾选后：访客可以看到与客服的历史对话',
      domain: '备用域名：当链接出现地区性屏蔽时更换使用',
      logText: '访客端聊天记录'
    },
    fixed: {
      text: [
        '你可以选择条件，生成的网址链接：',
        '接入教程',
        '输入或选择相应平台',
        '选择指定分组客服',
        '选择自定义参数',
        '生成客服链接',
        '自动分配',
        ' * 适合多个或单个客服各自对接客户'
      ],
      placeholder: {
        platform: '选择平台',
        group: '选择分组',
        server: '选择客服'
      },
      tips: {
        platform: '请选择平台',
        group: '请选择分组'
      },
      table: {
        name: '客服',
        link: '链接'
      },
      course: {
        title: '接入教程',
        content: [
          '您可以按照以下步骤生成您需要的链接',
          '固定链接接入教程',
          '1.在域名绑定页面，点击添加，输入您平台下的所有域名。',
          '2.打开如何接入页面，在选择域名输入框下选择之前绑定的域名。',
          '3.在选择分组输入框下，选择之前设置的分组。如果只选择分组不选择客服直接生成链接，将会在列表中显示所有分组下的客服链接。',
          '4.选择分组下的客服。将单独生成此客服的接入链接。',
          '5.当你选择完域名、分组、客服后，点击生成客服链接，列表将列出所选条件的客服链接。',
          '6.复制此链接，可以加到您网站平台的任意图片、文本下，点击如果弹出以下窗口。说明您的接入已完成。'
        ]
      }
    },
    halfFixed: {
      text: [
        '你可以选择条件，生成的网址链接：',
        '接入教程',
        '输入或选择相应平台',
        '选择接待客服，其他组内客服为后备客服',
        '选择自定义参数',
        '生成客服链接',
        '自动分配',
        '固定一个主接待客服，组内其他客服为后备客服，主客服离线时由后备客服接待'
      ],
      placeholder: {
        platform: '选择平台',
        group: '选择分组',
        server: '选择接待客服'
      },
      tips: {
        platform: '请选择平台',
        group: '请选择分组'
      },
      table: {
        name: '客服',
        link: '链接'
      },
      course: {
        title: '接入教程',
        content: [
          '您可以按照以下步骤生成您需要的链接',
          '半固定链接接入教程',
          '1.在域名绑定页面，点击添加，输入您平台下的所有域名。',
          '2.打开如何接入页面，在选择域名输入框下选择之前绑定的域名。',
          '3.在选择分组输入框下，选择之前设置的分组。如果只选择分组不选择客服直接生成链接，将会在列表中显示所有分组下的客服链接。',
          '4.选择分组下的客服。将单独生成此客服的接入链接。',
          '5.当你选择完域名、分组、客服后，点击生成客服链接，列表将列出所选条件的客服链接。',
          '6.复制此链接，可以加到您网站平台的任意图片、文本下，点击如果弹出以下窗口。说明您的接入已完成。'
        ]
      }
    },
    layer: {
      text: [
        '接入教程',
        '在您要接入的网站内添加如下的代码：',
        '复制代码',
        '拷贝此代码到您的网站 则会在您网站上显示咨询客服的图标。',
        '* 可以自动生成一个客服图标，也可替换成自定义图标，按照分配策略分配客服'
      ],
      course: {
        title: '弹窗接入教程',
        content: [
          '您可以按照以下步骤生成您需要的链接',
          '弹窗接入教程',
          '请先复制弹层接入的代码。',
          '之后请找到您保存网站文件的文件夹，在根目录找到 index.html 文件，单机鼠标右键，在下拉菜单中找到“打开方式”，使用“文本”打开 index.html 文件。',
          '当您使用文本打开后，会看到您网站的代码，找到 body 标签，在body标签内粘贴您拷贝的代码。',
          '粘贴您拷贝的代码，如下图',
          '点击保存html文件。双击 index.html 如果您看到网站出现以下图标，则表示爱洽客服接入成功。',
          '颜色等样式信息会自动获取您在域名绑定中设置的样式。'
        ]
      }
    }
  },
  // 自定义参数
  customParams: {
    placeholder: '请输入参数名',
    text: [
      '以下为设置好的参数，您可以直接调用。'
    ],
    table: {
      id: '编号',
      paramsName: '参数名',
      paramsField: '参数字段'
    },
    form: {
      addTitle: '添加自定义参数',
      editTitle: '编辑自定义参数',
      label: {
        name: '参数名',
        field: '参数字段'
      },
      placeholder: {
        name: '请输入参数名',
        field: '请输入参数字段'
      },
      tips: {
        name: '参数名不能为空',
        field: '参数字段不能为空'
      }
    },
    delete: {
      message: ' 是否删除参数：{paramsName}',
      tips: '提示',
      confirm: '确定',
      cancel: '取消'
    }
  },
  // 会话分配
  sessionAssign: {
    head: '基础分配',
    isoff: '旧访客同客服接待',
    loading: '重新分配中。。。',
    options: [
      {
        title: '按排序轮流分配',
        content: '设定一个客服排序, 新的对话按此排序, 在可分配的客服间轮流分配, 从排序最靠前的开始'
      },
      {
        title: '按排序优先分配',
        content: '设定一个客服排序, 优先给排序靠前的客服分配到对话数量上限, 才会分配给排序下一位的客服'
      },
      {
        title: '按当前负载分配',
        content: '当有新对话进来时，优先分配给当前对话数最少的的客服'
      },
      {
        title: '补齐分配',
        content: '当有新对话进来时, 查看所有可分配客服在过去 24 小时的总对话数, 优先分配给最少的客服'
      },
      {
        title: '随机分配',
        content: '当有新对话进来时, 完全随机分配给当前可分配的客服'
      }
    ]
  },
  // 会话记录
  sessionRecord: {
    customerFilter: {
      label: {
        platformName: '平台名称',
        customerName: '客户名称',
        serverName: '客服名称',
        serviceTime: '接待时间',
        customTime: '自定义时间',
        talkType: '对话类型',
        content: "对话内容",
        satisfaction: '满意度'
      },
      placeholder: {
        platformName: '选择平台',
        customerName: '输入你想要查询的客户名称',
        serverName: '客服选择',
        serviceTime: '接待时间',
        customTime: {
          start: '开始日期',
          separator: '至',
          end: '结束日期'
        },
        talkType: '对话类型选择',
        content: "请输入对话内容",
        satisfaction: '满意度选择'
      },
      timeOptions: ['7天', '30天'],
      talkTypeOptions: ['全部', '客服对话', '无消息对话', '自动对话', '群会话'],
      tips: {
        platformName: '请选择平台',
        customerName: '请选择客服',
        serviceTime: '请选择接待时间'
      },
      getCustomer: '获取访客'
    },
    customerList: {
      head: ['当前访客', '全部导出']
    },
    chatContent: {
      server: '客服',
      read: '已读',
      unRead: '未读',
      placeholder: '请输入聊天内容',
      export: '导出',
      seeCustomerDetail: '查看客户详情'
    },
    customerDetail: {
      id: '会话ID',
      userName: '用户名',
      server: '接待客服',
      area: '地区',
      userIp: '用户IP',
      phone: '电话',
      email: '邮箱',
      enterTime: '访客进入时间',
      duration: '会话时长',
      source: '会话来源',
      satisfaction: '满意度',
      browser: '浏览器',
      system: '系统'
    },
    satisfactionOptions: ['非常不满意', '不满意', '一般', '满意', '非常满意'],
    noRecord: '更多记录',
    noData: '暂无数据',
    noMore: '没有更多了'
  },
  // 消息列表
  messageList: {
    unreadCount: '未读数量：',
    placeholder: '选择平台',
    table: {
      name: '消息来源',
      nameValue: '【系统消息】',
      phoneValue: '无',
      phone: '联系电话',
      content: '消息内容',
      leaveTime: '发送时间',
      status: '阅读状态',
      processTime: '处理时间',
      read: '已读',
      unRead: '未读'
    },
    delete: {
      message: ' 是否删除该留言？',
      tips: '提示',
      confirm: '确定',
      cancel: '取消'
    }
  },
  // 自动消息
  authMessage: {
    head: ['选择平台名称', '自动消息设置'],
    config: {
      promote: {
        title: '推广消息',
        tips: '每段对话开启时，系统自动向顾客发送一组推广消息',
        add: '新加推广消息',
        limit: '最多五条',
        table: {
          order: '序号',
          content: '内容',
          status: '状态'
        },
        form: {
          addTitle: '添加推广消息',
          editTitle: '编辑推广消息',
          label: {
            status: '功能启用'
          },
          tips: {
            content: '推广消息不能为空'
          }
        },
        delete: {
          message: ' 您确定要删除该推广消息？',
          tips: '提示',
          confirm: '确定',
          cancel: '取消'
        }
      },
      welcomeMsg: {
        title: '欢迎消息',
        tips: '每段对话开启时，系统自动向顾客发送欢迎消息',
        placeholder: '您好，有什么可以帮助到您的'
      },
      noResponse: {
        title: '顾客无响应消息',
        tips: '客服一段时间没有响应顾客消息时，系统自动向他发送一段消息',
        placeholder: '您好，您的对话已超时，如果您还有其他问题，可以随时联系我们',
        text: ['发送时间：客服超过', '秒后无响应自动发送']
      },
      offline: {
        title: '客服离线消息',
        tips: '客服离线时，系统自动向他发送一段消息',
        placeholder: '您好，您的客服现在休息中，请稍后联系'
      },
      comment: {
        title: '客服评价消息',
        tips: '对话结束评价系统会向顾客发送评价消息',
        placeholder: '您好，您的对话已结束，请对本次服务打分'
      },
      endMsg: {
        title: '结束对话消息',
        tips: '对话结束会向顾客发送消息',
        placeholder: '您好，您的对话已结束，期待再次为您服务'
      },
      autoMsg: {
        title: '客服自动弹出消息',
        tips: '当您使用弹层客服时，您可以设置自动弹出消息的时间',
        placeholder: '您好，有什么可以帮助到您的',
        text: ['访客浏览', '秒，弹出客服消息']
      },
      enable: '功能启用',
      cancel: '取 消',
      submit: '立即提交'
    }
  },
  // 质检评分
  qualityScore: {
    switch: '开启质检指标',
    table: {
      search: ['选择平台', '全选', '请选择质检指标', '执行'],
      options: ['序号', '质检名称', '对应平台', '客服人数', '客服', '得分']
    },
    setting: {
      title: '设置质检指标',
      last: '分',
      form: ['质检名称', '请输入质检名称', '设置总分', '请选择总分', '质检周期', '请选择质检周期', '登录时间', '客服未按时登录，扣', '话术词语', '出现关键词，扣', '添加关键词', '评价指标', '评分低于', '扣', '话术指标', '重复话术每次扣', '抽查分数', '发起抽查', '对话间隔', '对话间隔超过', '秒', '对话应答', '对话应答超过'],
      table: ['最新抽查时间', '抽查客服', '抽查分数', '备注', '操作', '编辑', '暂无抽查信息'],
      button: ['重复', '提交', '设置客服排班时间', '查看排班表'],
      label: ['每天', '一周', '一个月', '一个季度']
    }
  },
  // 质检报表
  qualityTable: {
    search: ['选择平台', '选择客服', '开始日期', '至', '结束日期', '导出报表'],
    table: ['客服', '周期/时间', '登录', '未回复', '应答超时', '抽查', '评价', '关键词', '总分']
  },
  // 客服报表
  serverTable: {
    search: ['请选择时间', '至', '选择平台', '选择分组', '选择客服'],
    table: ['序号', '客服', '分组', '平均接待时间', '总接待时间', '访客总量', '平均每天接待', '平均响应时间', '评价', '平均质检分数', '服务平台数', '平台名称']
  },
  // 常用语列表
  dailyWord: {
    filter: {
      label: [
        "选择平台：",
        "选择分类："
      ],
      placeholder: [
        '全部',
        "搜索常用语"
      ]
    },
    table: {
      id: '问题标识',
      title: '简略标题',
      word: '内容',
      domain_title: '所属平台',
      type: '所属分类',
      createTime: '创建时间',
      updateTime: '更新时间'
    },
    form: {
      addTitle: '添加常用语',
      editTitle: '编辑常用语',
      label: {
        type: '选择分类',
        title: '简略标题',
        content: '问题内容'
      },
      placeholder: {
        type: '请选择',
        title: '请输入标题',
        content: '请输入问题内容'
      },
      tips: {
        type: '分类不能为空',
        title: '简略标题不能为空',
        content: '问题内容不能为空'
      }
    },
    delete: {
      message: ' 您确定要删除该项？',
      tips: '提示',
      confirm: '确定',
      cancel: '取消'
    }
  },
  // 常用语分类
  dailyWordType: {
    placeholder: '请输入分类名称',
    table: {
      id: '分类标识',
      platform: '平台名称',
      name: '分类名称',
      status: '状态',
      active: '启用',
      unActive: '禁用'
    },
    form: {
      addTitle: '添加分类',
      editTitle: '编辑分类',
      label: {
        platform: '选择平台',
        name: '分类名称',
        status: '是否启用'
      },
      placeholder: {
        platform: '请选择平台',
        name: '请输入分类名称'
      },
      tips: {
        platform: '平台不能为空',
        name: '分类名称不能为空'
      },
      yes: '是',
      no: '否'
    },
    delete: {
      message: ' 您确定要删除该项？',
      tips: '提示',
      confirm: '确定',
      cancel: '取消'
    }
  },
  // 常见问题
  questions: {
    typeTitle: '添加问题类别：',
    questionTitle: '添加常见问题：',
    placeholder: '全部',
    delTips: '请先选择需要删除的问题',
    table: {
      id: '问题标识',
      platform: '平台名称',
      cate_name: '类别名称',
      question: '问题',
      answer: '答案',
      createTime: '创建时间'
    },
    form: {
      addTypeTitle: '添加类别',
      editTypeTitle: '添加类别',
      addTitle: '添加问题',
      editTitle: '编辑问题',
      label: {
        platform: '所属平台',
        cate_id: '选择类别',
        cate_name: '类别名称',
        question: '问题',
        answer: '答案'
      },
      placeholder: {
        platform: '请选择平台',
        question: '请输入问题',
        cate_id: '请选择类别',
        cate_name: '输入类别'
      },
      tips: {
        platform: '所属平台不能为空',
        question: '问题不能为空',
        answer: '答案不能为空',
        cate_name: '类别不能为空',
        cate_id: '类别不能为空'
      }
    },
    delete: {
      message: ' 您确定要删除该项？',
      tips: '提示',
      confirm: '确定',
      cancel: '取消'
    }
  },
  // 机器人设置
  robot: {
    head: ['选择平台名称', '机器人设置'],
    config: {
      robotAble: {
        title: '机器人开关',
        tips: '启用机器人客服'
      },
      robotFirstAble: {
        title: '在客服之前启用机器人客服',
        tips: '在对话之前先由机器人接待客户'
      },
      robotLastAble: {
        title: '在客服离线或坐席全部占满时接待',
        tips: '所有对话优先人工接待，当客服接待到达上限时新对话由机器人接待'
      },
      knowledge: {
        placeholder: '搜索问题',
        entry: '机器人剩余条目',
        import: '导入知识库',
        export: '导出知识库',
        table: {
          question: '问题',
          answer: '答案',
          status: '状态',
          enable: '启用',
          disable: '禁用'
        },
        uploadForm: {
          title: '批量添加知识库',
          editTitle: '编辑知识库',
          addTitle: '添加知识库',
          text: ['点击上传', '导入文档支持格式为xls,xlsx格式上传']
        },
        editForm: {
          addTitle: '添加知识库',
          editTitle: '编辑知识库',
          label: {
            question: '问题',
            date: '问题有效期',
            answer: '答案',
            status: '是否启用'
          },
          placeholder: {
            question: '请输入问题',
            answer: '请输入答案'
          },
          tips: {
            question: '问题不能为空',
            answer: '答案不能为空'
          }
        },
        delete: {
          message: ' 是否删除该项 ?',
          tips: '提示',
          confirm: '确定',
          cancel: '取消'
        }
      },
      robotName: {
        title: '机器人名称',
        tips: '给您的智能客服取个名称吧',
        placeholder: '智能客服小美'
      },
      robotAvatar: {
        title: '机器人头像',
        tips: '给您的智能客服上传个头像吧',
        text: ['自定义头像', '重新上传']
      },
      robotWelMsg: {
        title: '机器人欢迎语',
        tips: '在客服无法接听时，机器人会自动向顾客发送一段欢迎语',
        placeholder: '智能客服为您服务'
      },
      robotUnknownMsg: {
        title: '未知问题回答',
        tips: '当机器人无法识别问题时的回答',
        placeholder: '不太明白您的问题，不过我正在努力的学习中'
      },
      robotEndMsg: {
        title: '机器人结束语',
        placeholder: '智能客服感谢您的使用。下次再见。'
      },
      enable: '功能启用',
      cancel: '取 消',
      submit: '立即提交'
    }
  },
  // 未知问题
  unknownQuestion: {
    placeholder: '请选择平台',
    table: {
      question: '问题',
      questioner: '提问人',
      questionTime: '提问时间',
      status: '状态',
      answered: '已解答',
      unAnswer: '未解答'
    },
    form: {
      addTitle: '添加知识库',
      batchEdit: '批量编辑',
      label: {
        question: '问题',
        answer: '答案',
        status: '是否启用'
      },
      placeholder: {
        question: '请输入问题',
        answer: '请输入答案'
      },
      tips: {
        question: '问题不能为空',
        answer: '答案不能为空'
      }
    },
    delete: {
      message: [' 您确定要删除该问答？', ' 您确定要删除所选问答？'],
      tips: '提示',
      confirm: '确定',
      cancel: '取消'
    },
    tips: ['请先选择需要删除的问答', '请先选择需要解答的问答']
  },
  // 黑名单管理
  blackList: {
    placeholder: ['请选择平台', '请输入IP'],
    table: {
      id: 'ID',
      ip: 'IP',
      customerName: '访客名称',
      realName: '访客备注名称',
      addTime: '添加时间'
    },
    delete: {
      message: ' 您确定要恢复该访客？',
      tips: '提示',
      confirm: '确定',
      cancel: '取消'
    }
  },
  // 客服评价统计
  serverEvaluate: {
    placeholder: ['请选择平台', '开始时间', '结束时间'],
    table: {
      serverName: '客服名称',
      star1: '非常不满意',
      star2: '不满意',
      star3: '一般',
      star4: '满意',
      star5: '非常满意',
      percent: '满意率'
    }
  },
  // 总体评价统计
  overallEvaluate: {
    placeholder: ['请选择平台', '开始时间', '结束时间'],
    table: {
      question: '服务质量问题',
      number: '评价数',
      percent: '满意率'
    }
  },
  // 接待统计
  visitorRecord: {
    placeholder: ['请选择平台', '接待时间', '访客ip', '请选择接待客服', '选择天数'],
    table: {
      visitorName: '访客名',
      visitorIp: '访客ip',
      area: '地区',
      startTime: '开始接待时间',
      endTime: '结束接待时间',
      serviceTime: '接待时长',
      server: '接待的客服',
      total: '总接待量',
      customer: '接待访客'
    }
  },
  // 访客地域统计
  visitorRegion: {
    all: '全部',
    orderOptions: ['从低到高排序', '从高到低排序'],
    text: ['访问地域图', '关联平台', '访客地区分布', '返回'],
    table: {
      province: '来自省份',
      number: '访客数量'
    },
    chart: ['访客地域分布', '高', '低']
  },
  // 左侧导航栏
  router: {
    ewm: '扫码手机登录工作台',
    dashboard: '数据主页',
    serverWorkbench: '客服工作台',
    groupList: '分组列表',
    serverList: '客服列表',
    platformList: '设置平台',
    connectServer: '接入客服',
    customParams: '自定义参数',
    talkManage: '会话管理',
    talkAssign: '会话分配',
    talkRecord: '会话记录',
    messageList: '消息列表',
    autoReplay: '自动消息',
    dailyWord: '常用语管理',
    dailyWordList: '常用语列表',
    dailyWordType: '常用语分类管理',
    questions: '常见问题',
    robotServer: '机器人客服',
    robotConfig: '机器人设置',
    unknownQuestion: '未知问题',
    blackList: '黑名单管理',
    dataStatistics: '数据统计',
    serverEvaluation: '客服评价统计',
    overallEvaluation: '总体评价统计',
    visitorRecord: '接待统计',
    visitorRegion: '访客地域统计',
    qualityTest: '客服质检',
    qualityScore: '质检评分',
    qualityTable: '质检报表',
    serverTable: '客服报表'
  },
  // 客服端
  chatServer: {
    title: '爱洽客服工作台',
    flashTitle: {
      souce: '爱洽客服工作台',
      empty: '【　　　　　　　　】',
      entity: '【收到一条新消息！】'
    },
    online: '在线',
    offline: '离线',
    invisible: '隐身',
    invisibleAlert: {
      message: '目前仍有在线访客<br>请在转接会话或移除会话后重试'
    },
    sessionOptions: ['当前会话', '历史会话', '待接会话'],
    screenshot: ['截取的图片ctrl+v粘贴到输入框即可', '如何发送截图？'],
    curSesActions: ['转接当前会话', '移除当前会话', '会话设置', '邀请群聊', '清理所有已结束会话'],
    closeSession: {
      message: ' 您确定要移除{customer}',
      tips: '警告',
      confirm: '确定',
      cancel: '再想想',
      end: '对话结束！',
      select: '请先选择要关闭的访客'
    },
    hisSesActions: ['接待访客', '请选择需要接待的访客'],
    curSesDialog: {
      title: '会话设置',
      options: ['建立对话时间排序', '访客新消息置顶', '对话结束--保留', '对话结束--移除'],
      showAll: '显示全部访客',
      footer: ['清理结束会话', '确认修改'],
      tips: ['清理成功', '设置成功']
    },
    inviteDialog: {
      title: '邀请加入会话',
      btns: ['邀请', '邀请中', '取消']
    },
    receiveInvite: ['客服', '邀请您加入会话', '接受', '拒绝'],
    header: ['爱洽 客服工作台', '退出', '深夜模式', '声音提示', '语言', '安全退出'],
    chatContent: {
      loading: '加载中...',
      noMore: '没有更多了',
      read: '已读',
      unread: '未读',
      revoke: '撤回',
      hasLeft: '客户离开',
      history: '历史会话',
      failed: '发送失败',
      reSend: '重新发送'
    },
    inputMenu: {
      placeholder: '请输入内容',
      send: '发送',
      soundDialog: {
        title: '录音',
        tips: '正在录音请说话...',
        send: '发 送',
        cancel: '取 消'
      },
      soundNoPerm: '无权限打开麦克风',
      customEmoji: {
        notify: {
          title: '提示',
          message: '已达上限，请删除图片继续'
        }
      },
      clear: '清理对话',
    },
    userInfo: {
      title: '访客信息',
      visit: {
        title: '信息',
        source: '来源：',
        link: '接入链接：',
        ip: 'IP：',
        addr: '地区：',
        device: '设备：',
        system: '系统：',
        chip: "筹码余额：",
        usdt: "USDT余额：",
        ctime: "注册时间："
      },
      card: {
        title: '名片',
        name: '真实姓名：',
        customerName: '用户名：',
        email: '邮箱：',
        phone: '手机：',
        address: '地址：',
        age: '年龄：',
        comment: '备注：',
        gender: '性别:',
        qq: 'QQ：',
        weibo: '微博：',
        weixin: '微信：',
        isming: '是否实名：',
        placeholder: '点击输入'
      },
      mark: {
        title: '备注',
        placeholder: '请输入内容'
      },
      other: {
        title: '操作',
        addBlack: {
          title: '加入黑名单',
          message: ' 确定将该访客加入到黑名单',
          tips: '提示',
          confirm: '确定',
          cancel: '取消',
          text: ['请选择访客', '对话结束！']
        }
      },
      update: {
        success: '记录成功',
        fail: '记录失败'
      }
    },
    commonWords: {
      title: '共用常用语',
      send: '发送'
    },
    customSetLabel: '客服设置',
    customizeWords: {
      title: '自定义常用语',
      button: ['常用语', '添加分类', '添加常用语', '完成']
    },
    editHello: {
      entry: '欢迎语',
      title: '编辑欢迎语',
      button: ['是否启用', '完成'],
      placeholder: '请输入欢迎语',
    },
    transfer: {
      title: '转接会话',
      actions: '转接',
      noServer: '暂无在线客服',
      select: '请选择要转接的访客',
      offline: '当前会话已离线，暂不能转接访客'
    },
    beOffline: '您已被管理员下线',
    invite: {
      notify: ['成功', '已加入群组', '您已加入群组']
    }
  },
  // 客户端
  chatClient: {
    server: '客服',
    closeWindow: '是否要关闭当前窗口',
    tooltip: ['留言', '提示音', '表情', '上传', '语音', '打分', 'skype电话'],
    close: "关闭",
    loading: '客服载入中...',
    chatBody: {
      uploading: '上传中',
      question: '常见问题'
    },
    chatContent: {
      loading: '加载中...',
      noMore: '没有更多了',
      server: ['或转接', '人工客服', '客服暂时离开，请', '留言', '请', '转接智能客服', '或'],
      customer: {
        read: '已读',
        unread: '未读'
      },
      serverHello: '您好。您已接入客服请开始对话吧',
      robotUnknown: '不太明白您的问题，不过我正在努力的学习中',
      transfer: '您已被转接给'
    },
    inputMenu: {
      placeholder: '请输入内容',
      send: '发送',
      soundDialog: {
        title: '录音',
        tips: '正在录音请说话...',
        actions: ['发 送', '取 消']
      },
      praseDialog: {
        tips: '本次对话结束 请为本次服务评分：',
        options: ['非常不满意', '不满意', '一般', '满意', '非常满意'],
        actions: ['发 送', '取 消']
      },
      soundNoPerm: '无权限打开麦克风',
      prased: '已评价过'
    },
    leaveMsg: {
      title: '留言',
      label: {
        name: '联系人/会员名/用户ID',
        phone: '联系方式',
        content: '留言内容'
      },
      placeholder: {
        name: '请输入联系人',
        phone: '请留下联系方式',
        content: '请输入内容'
      },
      tips: {
        name: '联系人不能为空',
        phone: ['请输入正确的联系方式', '联系方式不能为空'],
        content: '留言内容不能为空'
      }
    },
    timeout: {
      message: '网络繁忙，请刷新后重试',
      confirm: '确定'
    }
  },
  action: {
    label: '操作',
    type: {
      login: '登录',
      offline: '下线',
      save: '保 存',
      reset: '重 置',
      continue: '继续添加',
      confirm: '确 定',
      cancel: '取 消',
      search: '查找',
      submit: '提 交',
      addType: '添加类别',
      addQuestion: '添加问题',
      add: '添加',
      copy: '复制',
      edit: '编辑',
      delete: '删除',
      invoke: '调用',
      answer: '解答',
      recovery: '恢复',
      batchEdit: '批量修改',
      batchDelete: '批量删除',
      batchAnswer: '批量解答',
      deleteAnswerQuestion: '删除已解答问题',
      markRead: '标记为已读',
      markAllRead: '全部标记为已读'
    }
  },
  notify: {
    fail: '失败',
    success: '成功',
    copySuccess: '复制成功'
  },
  table: {
    loading: '正在查询中。。。'
  },
  contextmenu: {
    refresh: '刷新',
    close: '关闭',
    closeAll: '关闭其他',
    closeOthers: '关闭所有',
    closeTranslate: '翻译关闭',
  },
  google: {
    title: '谷歌验证',
    label: '请输入验证码',
    btn: '确 认'
  },
  sound: {
    entry: '提示音',
    title: '替换提示音',
    current: '当前提示音:',
    placeholder: '请选择音效',
    audios: [
      "默认音效",
      "音效1",
      "音效2",
      "音效3",
      "音效4",
      "音效5",
      "音效6"
    ]
  },
  "googleCheck": {
    "isgoogle": "谷歌二次验证",
    "title": "谷歌验证",
    "btns": ["上一步", "下一步", "开启", "复制"],
    "step1": {
      "tips": "请扫描二维码并安装谷歌验证器，如果您已安装，请前往下一步",
      "action": "下载验证器",
      "desc": "我已安装 谷歌搜索器"
    },
    "step2": {
      "tips": "请使用谷歌验证器扫描下方二维码，成功后您会获取一个6位数的双重验证码，该验证码每30秒改变一次。",
      "action": "扫描二维码",
      "desc1": "如果扫码失败，请输入上方密钥到验证器，您需要设置一个账号， 例：xxx@DigFinex（xxx处填入您的手机/邮箱账号或您的昵称）。",
      "desc2": "我已有6位双重验证码"
    },
    "step3": {
      "label": "双重验证码",
      "placeholder": "请输入双重验证码"
    }
  }
}
