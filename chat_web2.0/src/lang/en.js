export default {
  // 商户登录
  sellerLogin: {
    title: 'Merchant login',
    label: {
      username: 'User name or mailbox',
      password: 'password',
      captcha: 'Verification Code'
    },
    placeholder: {
      username: 'Please enter user name or email',
      password: 'Please input a password',
      captcha: 'Please enter the verification code'
    },
    tips: {
      username: 'Please enter user name or email',
      password: 'Please input a password',
      captcha: 'Verification code cannot be empty'
    },
    actions: ['Log in to Aichat', 'Registration team', 'Forgot your password?', 'Contact customer service', 'Go to the official website']
  },
  // 客服登录
  serverLogin: {
    title: 'SERVER LOGIN',
    phone: "Mobile login",
    phoneTips: "Code scanning mobile phone login workbench",
    placeholder: {
      seller_code: 'please enter customer service username',
      username: 'please enter user name or email',
      password: 'please enter a password',
      captcha: 'please enter the verify code'
    },
    tips: {
      username: 'username cannot be empty',
      password: 'password cannot be empty',
      captcha: 'verify code cannot be empty'
    },
    login: 'login',
    peopleType: ['Customer service staff', 'Assistant']
  },
  // 忘记密码
  forgetPassword: {
    title: 'Forget password',
    subTitle: 'Please fill in the login email and we will send a verification email',
    placeholder: {
      email: 'Please enter the registered email address',
      veriCode: 'Please enter the verification code',
      password: 'Please enter a new password',
      repeatPassword: 'Please enter a new password'
    },
    tips: {
      email: ['Mailbox cannot be empty', 'Mailbox format error'],
      veriCode: 'Verification code cannot be empty',
      password: 'Please enter a new password',
      repeatPassword: 'Please enter a new password'
    },
    veriCode: ['Retrieve after', 'Send verification code'],
    actions: ['return', 'reset password', 'Contact customer service', 'Return to home page'],
    resetResult: ['Password reset succeeded', 'Failed to reset password'],
    sendResult: ['Sent successfully', 'fail in send']
  },
  // 导航栏
  navbar: {
    periodOfValidity: 'period of validity',
    remaind: 'remaind',
    renew: 'renew',
    day: 'day',
    show: 'show',
    hide: 'hide',
    refresh: 'refresh',
    messageList: 'message list',
    fullScreen: 'full screen',
    exitFullScreen: 'exit full screen',
    modifyPwd: 'Change Password',
    buyProd: 'Purchase products',
    howToUse: 'How to use',
    logout: 'Logout',
    zh: 'Chinese (Simplified)',
    en: 'English',
    vi: 'Vietnamese',
    th: 'Thai',
    es: 'Spanish',
    pt: 'Portuguese',
    ms: 'Malay',
    nightMode: 'Night mode',
    versionInfo: {
      title: 'Version information',
      curVersion: 'current version：v2',
      versionTitle: 'authorization agreement',
      versionContent: `
      <div>1. Aiqia is authorized to obtain official authentication, and users have the right to obtain subsequent updated codes.</div>
      <div>2、The Licensor can use the licensed products for any application platform that complies with national laws and regulations, and is not limited by the number of domain names and projects。</div>
      <div>3、If the authorizer uses the commercial projects developed by aiqia paid products (such as ERP, CMS, etc.), it shall keep the source notes and source of the authorized products。</div>
      <div>4、Licensors must respect intellectual property rights, strictly ensure that they do not maliciously spread the product source code, do not directly resell or resell the authorized products themselves, and do not claim to be their own products after simple packaging of the authorized products. Otherwise, we have the right to withdraw the product authorization and investigate the corresponding legal responsibilities according to the severity of the situation。</div>
      <div>5、Authorized aiqia's official source code paid products, no refund is supported。</div>
      <div>6、We are obliged to provide the Licensor with product download, update and maintenance within the validity period. Once it expires, the Licensor cannot enjoy the corresponding authority. Lifetime authorization is unlimited。</div>
      <div>7、www.aichating.com It has the right of final interpretation</div>
      `,
      reserved: 'copyright'
    },
    modifyPwdForm: {
      title: 'Change Password',
      label: {
        oldPwd: 'old password',
        newPwd: 'new password',
        repeatPwd: 'repeat password'
      },
      placeholder: {
        oldPwd: 'please enter your old password',
        newPwd: 'please enter a new password',
        repeatPwd: 'please enter a repeat password'
      },
      tips: {
        oldPwd: 'old password cannot be empty',
        newPwd: 'new password cannot be empty',
        repeatPwd: 'repeat password cannot be empty',
        notSame: 'the new password and repeat password are inconsistent'
      }
    }
  },
  // 主页
  dashboard: {
    total: 'total',
    receptionVolume: {
      cumulative: 'Accumulative reception total',
      today: 'Today reception total',
      online: 'Current online server',
      unConsult: 'Visitors not consulted'
    },
    onlineServer: {
      title: 'Online server detail',
      name: 'username',
      group: 'group',
      lastLoginTime: 'last login time',
      status: 'status',
      serveredNumber: 'number of served',
      totalServeredNumber: 'total number of served',
      online: 'online',
      offline: 'offline',
      invisible: 'invisible'
    },
    offlineServer: {
      message: ' Customer service offline',
      tips: 'tips',
      confirm: 'confirm',
      cancel: 'cancel'
    },
    receptionOptions: [
      'reception in the last 30 days',
      'reception in the last 7 days',
      'reception in the last 15 days'
    ],
    chart: {
      receptionVolume: 'reception number'
    }
  },
  // 分组列表
  group: {
    groupNamePlaceholder: 'enter a group name',
    table: {
      groupId: 'group id',
      accessType: 'access form',
      platform: 'platform',
      groupName: 'group name',
      peopleNumber: 'group number',
      isPrep: 'front group',
      status: 'status',
      createDate: 'create date',
      updateDate: 'update date',
      yes: 'yes',
      no: 'no',
      active: 'activated',
      unActive: 'not active'
    },
    form: {
      addTitle: 'Add Group',
      editTitle: 'Edit Group',
      yes: 'yes',
      no: 'no',
      label: {
        platform: 'platform',
        groupName: 'group name',
        isActive: 'activate',
        isPrep: 'front group'
      },
      placeholder: {
        groupName: 'please enter a group name',
        platform: 'please enter platform'
      },
      tips: {
        groupName: 'group name cannot be empty',
        platform: 'platform cannot be empty'
      }
    },
    delete: {
      message: ' delete group：{groupName} ?',
      tips: 'Tips',
      confirm: 'confirm',
      cancel: 'cancel'
    }
  },
  // 客服列表
  server: {
    search: {
      placeholder: {
        serverName: 'enter server name',
        serverGroup: 'select server group'
      }
    },
    table: {
      serverCode: 'server code',
      userName: 'user name',
      serverName: 'server name',
      serverAvatar: 'server avatar',
      serverGroup: 'group',
      maxServedNumber: 'max served number',
      serverStatus: 'server status',
      onlineStatus: 'online status',
      activated: 'activated',
      prohibited: 'prohibited',
      online: 'online',
      offline: 'offline',
      invisible: 'invisible',
      assist: 'assist'
    },
    form: {
      addTitle: 'Add Server',
      editTitle: 'Edit Server',
      yes: 'yes',
      no: 'no',
      change: 'change',
      peopleType: ['Add customer service', 'Add assistant'],
      label: {
        serverName: 'server name',
        serverPwd: 'server password',
        serverGroup: 'group',
        maxServedNumber: 'max served number',
        userName: 'user name',
        activeStatus: 'activate',
        serverAvatar: 'server avatar'
      },
      placeholder: {
        serverName: 'please enter server name',
        serverPwd: 'please enter server password',
        resetPwd: 'input is reset',
        serverGroup: 'please select group',
        maxServedNumber: 'please enter max service number',
        userName: 'enter user name'
      },
      tips: {
        serverName: 'server name cannot be empty',
        serverPwd: 'server password cannot be empty',
        serverGroup: 'the group it belongs to cannot be empty',
        maxServedNumber: 'max service number cannot be empty',
        minServerNumber: 'The maximum number of service personnel shall be at least 10',
        userName: [
          'user name cannot be empty',
          'The user name already exists'
        ]
      },
      assistLabel: {
        userName: 'userName',
        nickName: 'nickName',
        password: 'password',
        isActive: 'activate',
        avatar: 'avatar'
      },
      assistPlaceholder: {
        userName: 'Please enter one user name',
        nickName: 'Please enter a nickname',
        password: 'Please input a password',
        isActive: 'Activate',
        avatar: 'avatar',
        inputPwd: 'Please input a password',
        resetPwd: 'Reset upon input'
      },
      assistTips: {
        userName: 'User name cannot be empty',
        nickName: 'Nickname cannot be empty',
        password: 'Password cannot be empty'
      },
      custom: 'custom'
    },
    delete: {
      message: ' delete server：{serverName} ?',
      tips: 'Tips',
      confirm: 'confirm',
      cancel: 'cancel'
    }
  },
  // 域名绑定
  platform: {
    platformPlaceholder: 'enter platform name',
    addDomainCourse: 'Domain Name Addition Tutorial',
    batchTips: 'Please select the platform to be modified first',
    table: {
      id: 'number',
      domain: 'domain',
      platform: 'platform',
      sign: 'sign'
    },
    form: {
      addTitle: 'Add Domain Name',
      editTitle: 'Edit Domain Name',
      batchEdit: 'Batch Edit',
      label: {
        platformName: 'platform name',
        domainName: 'domain name',
        islayer: 'islayer',
        withdraw: 'relinquish time',
        serverSign: 'server sign',
        skype: 'SKYPE',
        themeColor: 'theme color',
        bgColor: 'background color',
        fontColor: 'font color',
        onlineImg: 'online image',
        chatBg: 'chat background',
        promoteImg: 'promote image',
        picSize: 'recommended picture size：260*230',
        promoteLink: 'promote link'
      },
      placeholder: {
        platformName: 'please enter platform name',
        withdraw: 'Please select the recall time',
        domainName: 'please enter the domain name. Multiple domain names use line feed. The domain name can fill in the characteristics, mainly using the referer assignment',
        serverSign: 'please enter server signature',
        skype: 'please enter SKYPE',
        promoteLink: 'please enter promotion link'
      },
      tips: {
        platformName: 'platform name cannot be empty',
        domainName: 'domain name cannot be empty'
      },
      unit: {
        close: 'close',
        s: 'second',
        m: 'minute'
      },
      yes: 'yes',
      no: 'no'
    },
    delete: {
      message: ' delete domain name: {domainName} ?',
      tips: 'Tips',
      confirm: 'confirm',
      cancel: 'cancel'
    }
  },
  // 接入客服
  connectServer: {
    type: {
      auto: 'Automatic allocation access',
      fixed: 'Fixed Access',
      halfFixed: 'Semi Fixed Access',
      layer: 'Layer Access'
    },
    auto: {
      text: [
        'you can select conditions to generate url links',
        'enter or select the appropriate platform',
        'Select custom parameters',
        'Select recommended parameters',
        'Generate customer service link',
        '* It is applicable to the simultaneous access of multiple customer service, and the customer service is allocated according to the allocation strategy',
        'If you do not select a group, all groups are selected',
        'Generate QR code'
      ],
      placeholder: {
        platform: 'enter or select the appropriate platform',
        group: 'Select grouping'
      },
      tips: {
        platform: 'please enter or select the appropriate platform'
      },
      table: {
        strategy: {
          title: 'Allocation rules',
          options: ['Platform allocation', 'Intra group allocation']
        },
        link: 'Access link',
        ercode: 'QR code'
      },
      log: 'When checked: Visitors can see the history of conversations with agents',
      domain: 'Alternate domain name: Replaced when the link is blocked by region',
      logText: 'Guest chat history'
    },
    fixed: {
      text: [
        'you can select conditions to generate url links',
        'access tutorial',
        'enter or select the appropriate platform',
        'select the designated group server',
        'select custom parameters',
        'generate server link',
        'automatic allocation',
        ' * It is suitable for multiple or single customer service to connect with customers'
      ],
      placeholder: {
        platform: 'select platform',
        group: 'select group',
        server: 'select server'
      },
      tips: {
        platform: 'Please select a platform',
        group: 'Please select a group'
      },
      table: {
        name: 'server',
        link: 'link'
      },
      course: {
        title: 'Access Tutorial',
        content: [
          'You can follow these steps to generate the links you need',
          'Fixed link access tutorial',
          '1.On the domain name binding page, click Add and enter all domain names under your platform.',
          '2.Open the how to access page and select the previously bound domain name under the select domain name input box.',
          '3.In the select group input box, select the previously set group. If you only select groups and do not select server to directly generate links, the server links under all groups will be displayed in the list.',
          '4.Select the server under the group. The access link for this server will be generated separately.',
          '5.After you select the domain name, group and server, click generate server link, and the list will list the server links of the selected conditions.',
          '6.Copy this link and add it to any picture and text on your website platform. Click if to pop up the following window. Indicates that your access is complete.'
        ]
      }
    },
    halfFixed: {
      text: [
        'you can select conditions to generate url links',
        'access tutorial',
        'enter or select the appropriate platform',
        'Select the reception customer service, and the customer service in other groups is the backup customer service',
        'select custom parameters',
        'generate server link',
        'automatic allocation',
        'One main reception customer service is fixed, and other customer service in the group is the backup customer service. When the main customer service is offline, it is received by the backup customer service'
      ],
      placeholder: {
        platform: 'select platform',
        group: 'select group',
        server: 'Select reception customer service'
      },
      tips: {
        platform: 'Please select a platform',
        group: 'Please select a group'
      },
      table: {
        name: 'server',
        link: 'link'
      },
      course: {
        title: 'Access Tutorial',
        content: [
          'You can follow these steps to generate the links you need',
          'Fixed link access tutorial',
          '1.On the domain name binding page, click Add and enter all domain names under your platform.',
          '2.Open the how to access page and select the previously bound domain name under the select domain name input box.',
          '3.In the select group input box, select the previously set group. If you only select groups and do not select server to directly generate links, the server links under all groups will be displayed in the list.',
          '4.Select the server under the group. The access link for this server will be generated separately.',
          '5.After you select the domain name, group and server, click generate server link, and the list will list the server links of the selected conditions.',
          '6.Copy this link and add it to any picture and text on your website platform. Click if to pop up the following window. Indicates that your access is complete.'
        ]
      }
    },
    layer: {
      text: [
        'access tutorial',
        'add the following code to the website you want to access:',
        'copy code',
        'Copying this code to your website will display the icon of consulting customer service on your website.',
        '* You can automatically generate a customer service icon or replace it with a user-defined icon to assign customer service according to the allocation policy'
      ],
      course: {
        title: 'Layer Access Tutorial',
        content: [
          'You can follow these steps to generate the links you need',
          'Pop up access tutorial',
          'Please copy the code of bomb layer access first.',
          'After that, please find the folder where you saved the website file, find the index.html file in the root directory, right-click the stand-alone mouse, find "opening method" in the drop-down menu, and use "text" to open the index.html file.',
          'When you open it with text, you will see the code of your website, find the body tag, and paste the code you copied in the body tag.',
          'Paste the code you copied, as shown below',
          'Click Save HTML file. Double click index.html. If you see the following icon on the website, it means that aiqia server access is successful.',
          'The style information such as color will automatically obtain the style you set in the domain name binding.'
        ]
      }
    }
  },
  // 自定义参数
  customParams: {
    placeholder: 'enter params name',
    text: [
      'the following are the set parameters, which you can call directly.'
    ],
    table: {
      id: 'order',
      paramsName: 'params name',
      paramsField: 'params field'
    },
    form: {
      addTitle: 'Add Custom Params',
      editTitle: 'Edit Custom Params',
      label: {
        name: 'params name',
        field: 'params field'
      },
      placeholder: {
        name: 'please enter params name',
        field: 'please enter a params field'
      },
      tips: {
        name: 'params name cannot be empty',
        field: 'params field cannot be empty'
      }
    },
    delete: {
      message: ' delete params: {paramsName} ?',
      tips: 'Tips',
      confirm: 'confirm',
      cancel: 'cancel'
    }
  },
  // 会话分配
  sessionAssign: {
    head: 'basic allocation',
    isoff: 'Old visitors and customer service reception',
    loading: 'reassigning...',
    options: [
      {
        title: 'Distribution in turn by sort',
        content: 'Set a server ranking. New conversations are sorted according to this. They are distributed among assignable server in turn, starting from the top'
      },
      {
        title: 'Prioritize by sort',
        content: 'Set a server ranking, and assign the top server to the upper limit of the number of conversations before assigning it to the next server'
      },
      {
        title: 'Distribute by current load',
        content: 'When a new conversation comes in, give priority to the server with the least number of current conversations'
      },
      {
        title: 'Supplementary distribution',
        content: 'When a new conversation comes in, check the total number of conversations of all assignable server in the past 24 hours, and give priority to the least server'
      },
      {
        title: 'random allocation',
        content: 'When a new conversation comes in, it is completely randomly assigned to the currently assignable server'
      }
    ]
  },
  // 会话记录
  sessionRecord: {
    customerFilter: {
      label: {
        platformName: 'platform name',
        customerName: 'customer name',
        serverName: 'server name',
        serviceTime: 'reception time',
        customTime: 'custom time',
        talkType: 'conversation type',
        content: "Conversation content",
        satisfaction: 'satisfaction'
      },
      placeholder: {
        platformName: 'select platform',
        customerName: 'enter customer name',
        serverName: 'select server',
        serviceTime: 'reception time',
        customTime: {
          start: 'start date',
          separator: 'to',
          end: 'end date'
        },
        talkType: 'Select conversation type',
        content: "Please enter the conversation content",
        satisfaction: 'select satisfaction'
      },
      timeOptions: ['7 days', '30 days'],
      talkTypeOptions: ['all', 'Customer service dialogue', 'No message conversation', 'Automatic conversation', 'Group conversation'],
      tips: {
        platformName: 'Please select a platform',
        customerName: 'Please select server',
        serviceTime: 'Please select the reception time'
      },
      getCustomer: 'get visitors'
    },
    customerList: {
      head: ['customer list', 'Export all']
    },
    chatContent: {
      server: 'server',
      read: 'read',
      unRead: 'unread',
      placeholder: 'please enter chat content',
      export: 'export',
      seeCustomerDetail: 'view customer details'
    },
    customerDetail: {
      id: 'session id',
      userName: 'user name',
      server: 'reception server',
      area: 'area',
      userIp: 'user ip',
      phone: 'phone',
      email: 'email',
      enterTime: 'visitor entry time',
      duration: 'session duration',
      source: 'session source',
      satisfaction: 'satisfaction',
      browser: 'browser',
      system: 'system'
    },
    satisfactionOptions: ['very dissatisfied', 'dissatisfied', 'commonly', 'satisfied', 'very satisfied'],
    noRecord: 'more records',
    noData: 'no data',
    noMore: 'no more'
  },
  // 消息列表
  messageList: {
    unreadCount: 'unread quantity: ',
    placeholder: 'select platform',
    table: {
      name: 'source',
      nameValue: '【System message】',
      phoneValue: 'nothing',
      phone: 'phone',
      content: 'content',
      leaveTime: 'leave time',
      status: 'status',
      processTime: 'process time',
      read: 'read',
      unRead: 'unread'
    },
    delete: {
      message: ' delete this message ?',
      tips: 'Tips',
      confirm: 'confirm',
      cancel: 'cancel'
    }
  },
  // 自动消息
  authMessage: {
    head: ['select platform name', 'automatic message settings'],
    config: {
      promote: {
        title: 'promotion news',
        tips: 'when each conversation is opened, the system automatically sends a group of promotion messages to customers',
        add: 'new promotion news',
        limit: 'max 5',
        table: {
          order: 'order',
          content: 'content',
          status: 'status'
        },
        form: {
          addTitle: 'Add Promotion Message',
          editTitle: 'Edit Promotion Message',
          label: {
            status: 'function enable'
          },
          tips: {
            content: 'promotion message cannot be empty'
          }
        },
        delete: {
          message: ' delete this promotion message ?',
          tips: 'Tips',
          confirm: 'confirm',
          cancel: 'cancel'
        }
      },
      welcomeMsg: {
        title: 'welcome message',
        tips: 'when each conversation is opened, the system automatically sends a welcome message to the customer',
        placeholder: 'hello, how can I help you'
      },
      noResponse: {
        title: 'customer no response message',
        tips: 'when the server does not respond to the customer message for a period of time, the system will automatically send him a message',
        placeholder: 'hello, your conversation has timed out. If you have other questions, you can contact us at any time',
        text: ['sending time: server exceeded', 'seconds auto send without response']
      },
      offline: {
        title: 'customer service offline message',
        tips: 'when the customer service is offline, the system automatically sends him a message',
        placeholder: 'when the customer service is offline, the system will automatically send him a message. Hello, your customer service is now resting. Please contact him later'
      },
      comment: {
        title: 'server evaluation message',
        tips: 'at the end of the conversation, the evaluation system will send an evaluation message to the customer',
        placeholder: 'hello, your conversation has ended. Please rate this service'
      },
      endMsg: {
        title: 'end of conversation message',
        tips: 'a message will be sent to the customer at the end of the conversation',
        placeholder: 'hello, your conversation has ended. We look forward to serving you again'
      },
      autoMsg: {
        title: 'Customer service auto pop-up message',
        tips: 'When you use the elastic layer customer service, you can set the time when the message will pop up automatically',
        placeholder: 'Hello, how can I help you',
        text: ['Guest Browsing', 'Seconds, pop up customer service message']
      },
      enable: 'function enable',
      cancel: 'cancel',
      submit: 'submit'
    }
  },
  // 质检评分
  qualityScore: {
    switch: 'Open quality inspection indicator',
    table: {
      search: ['Select platform', 'Select all', 'Please select a quality inspection indicator', 'implement'],
      options: ['Serial number', 'Quality inspection name', 'Corresponding platform', 'Number of customer service', 'customer service', 'score']
    },
    setting: {
      title: 'Set quality inspection indicators',
      last: 'branch',
      form: ['quality inspection name', 'please enter quality inspection name', 'set total score', 'please select total score', 'quality inspection cycle', 'please select quality inspection cycle', 'login time', 'customer service fails to log in on time, deduct', 'script words', 'keyword appears, deduct', 'add keyword', 'evaluation index', 'score lower than', 'deduct', 'script index', 'deduct each time of repeated script', 'spot check score', 'initiate spot check', 'dialogue interval', 'Conversation interval exceeds', 'seconds', 'conversation response', 'conversation response exceeds'],
      table: ['latest spot check time', 'spot check customer service', 'spot check score', 'remarks', ' operation ', ' Edit ', ' no spot check information '],
      button: ['repeat', 'submit', 'set customer service scheduling time', 'view scheduling table'],
      label: ['every day', 'one week', 'one month', 'one quarter']
    }
  },
  // 质检报表
  qualityTable: {
    search: ['select platform', 'select customer service', 'start date', 'to', 'end date', 'Export Report'],
    table: ['customer service', 'cycle / time', 'Login', 'no reply', 'response timeout', 'spot check', 'evaluation', 'keyword', 'total score']
  },
  // 客服报表
  serverTable: {
    search: ['please select time', 'to', 'select platform', 'select grouping', 'select customer service'],
    table: ['serial number', 'customer service', 'grouping', 'average reception time', 'total reception time', 'total visitors', ' average daily reception ', ' average response time ', ' evaluation ', ' average quality inspection score ', ' number of service platforms', 'platform name']
  },
  // 常用语列表
  dailyWord: {
    filter: {
      label: [
        "Select a platform:",
        "Select classification:"
      ],
      placeholder: [
        "all",
        "Search Common Terms"
      ]
    },
    table: {
      id: 'problem id',
      title: 'title',
      word: 'Content',
      domain_title: 'Platform',
      type: 'type',
      createTime: 'create time',
      updateTime: 'update time'
    },
    form: {
      addTitle: 'Add Common Words',
      editTitle: 'Edit Common Words',
      label: {
        type: 'type',
        title: 'title',
        content: 'content'
      },
      placeholder: {
        type: 'please select type',
        title: 'please enter title',
        content: 'Please enter the question content'
      },
      tips: {
        type: 'type cannot be empty',
        title: 'title cannot be empty',
        content: 'content cannot be empty'
      }
    },
    delete: {
      message: ' delete this item ?',
      tips: 'Tips',
      confirm: 'confirm',
      cancel: 'cancel'
    }
  },
  // 常用语分类
  dailyWordType: {
    placeholder: 'enter class name',
    table: {
      id: 'id',
      platform: 'platformName',
      name: 'name',
      status: 'status',
      active: 'enable',
      unActive: 'disable'
    },
    form: {
      addTitle: 'Add Class',
      editTitle: 'Edit Class',
      label: {
        platform: 'platform',
        name: 'Class name',
        status: 'Enable'
      },
      placeholder: {
        platform: 'platform',
        name: 'Please enter class name'
      },
      tips: {
        platform: 'Platform cannot be empty',
        name: 'class name cannot be empty'
      },
      yes: 'yes',
      no: 'no'
    },
    delete: {
      message: ' delete this item ?',
      tips: 'Tips',
      confirm: 'confirm',
      cancel: 'cancel'
    }
  },
  // 常见问题
  questions: {
    placeholder: 'all',
    delTips: 'Please select the question to delete first',
    table: {
      id: 'problem id',
      platform: 'platform',
      question: 'question',
      answer: 'answer',
      createTime: 'create time'
    },
    form: {
      addTitle: 'Add Question',
      editTitle: 'Editing questions',
      label: {
        platform: 'platform',
        question: 'question',
        answer: 'answer'
      },
      placeholder: {
        platform: 'please select platform',
        question: 'please enter question'
      },
      tips: {
        platform: 'platform cannot be empty',
        question: 'question cannot be empty',
        answer: 'answer cannot be empty'
      }
    },
    delete: {
      message: ' delete this item ?',
      tips: 'Tips',
      confirm: 'confirm',
      cancel: 'cancel'
    }
  },
  // 机器人设置
  robot: {
    head: ['associated platform', 'robot settings'],
    config: {
      robotAble: {
        title: 'robot switch',
        tips: 'enable robot server'
      },
      robotFirstAble: {
        title: 'enable robot server before manual server',
        tips: 'before the conversation, the robot receives the customer'
      },
      robotLastAble: {
        title: 'reception when server is offline or all seats are occupied',
        tips: 'all conversations are given priority to manual reception. When the server reception reaches the upper limit, the new conversation is received by the robot'
      },
      knowledge: {
        placeholder: 'search questions',
        entry: 'robot remaining entries',
        import: 'import knowledge base',
        export: 'export knowledge base',
        table: {
          question: 'question',
          answer: 'answer',
          status: 'status',
          enable: 'enable',
          disable: 'disable'
        },
        uploadForm: {
          title: 'Batch Add Knowledge Base',
          editTitle: 'Edit Knowledge Base',
          addTitle: 'Add Knowledge Base',
          text: ['click upload', 'the imported document supports xls and xlsx format upload']
        },
        editForm: {
          addTitle: 'Add Knowledge base',
          editTitle: 'Edit Knowledge base',
          label: {
            question: 'question',
            answer: 'answer',
            status: 'Enable'
          },
          placeholder: {
            question: 'please enter a question',
            answer: 'please enter the answer'
          },
          tips: {
            question: 'question cannot be empty',
            answer: 'the answer cannot be empty'
          }
        },
        delete: {
          message: ' delete this item ?',
          tips: 'Tips',
          confirm: 'confirm',
          cancel: 'cancel'
        }
      },
      robotName: {
        title: 'robot name',
        tips: 'give your smart server a name',
        placeholder: 'smart server Xiaomei'
      },
      robotAvatar: {
        title: 'robot avatar',
        tips: 'upload a picture to your smart server',
        text: ['custom avatar', 're upload']
      },
      robotWelMsg: {
        title: 'robot welcome',
        tips: 'when the server cannot answer, the robot will automatically send a welcome message to the customer',
        placeholder: 'intelligent server for you'
      },
      robotUnknownMsg: {
        title: 'unknown question answer',
        tips: 'answer when the robot cannot recognize the question',
        placeholder: "I don't quite understand your problem, but I'm studying hard"
      },
      robotEndMsg: {
        title: 'robot conclusion',
        placeholder: 'Intelligent customer service thank you for your use. See you next time.'
      },
      enable: 'function enable',
      cancel: 'cancel',
      submit: 'submit'
    }
  },
  // 未知问题
  unknownQuestion: {
    placeholder: 'select platform',
    table: {
      question: 'question',
      questioner: 'questioner',
      questionTime: 'question time',
      status: 'status',
      answered: 'answered',
      unAnswer: 'unanswered'
    },
    form: {
      addTitle: 'Add Knowledge Base',
      batchEdit: 'Batch Edit',
      label: {
        question: 'question',
        date: 'Issue validity',
        answer: 'answer',
        status: 'enable'
      },
      placeholder: {
        question: 'please enter question',
        answer: 'please enter answer'
      },
      tips: {
        question: 'question cannot be empty',
        answer: 'answer cannot be empty'
      }
    },
    delete: {
      message: [' delete this question and answer ?', ' delete the selected question and answer ?'],
      tips: 'Tips',
      confirm: 'confirm',
      cancel: 'cancel'
    },
    tips: ['Please select the question and answer to be deleted first', 'Please select the question and answer to be answered first']
  },
  // 黑名单管理
  blackList: {
    placeholder: ['select platform', 'enter ip'],
    table: {
      id: 'id',
      ip: 'ip',
      customerName: 'visitor name',
      realName: 'real name',
      addTime: 'add time'
    },
    delete: {
      message: ' restore this visitor ?',
      tips: 'Tips',
      confirm: 'confirm',
      cancel: 'cancel'
    }
  },
  // 客服评价统计
  serverEvaluate: {
    placeholder: ['select platform', 'start time', 'end time'],
    table: {
      serverName: 'server name',
      star1: 'very dissatisfied',
      star2: 'dissatisfied',
      star3: 'commonly',
      star4: 'satisfied',
      star5: 'very satisfied',
      percent: 'satisfaction percentage'
    }
  },
  // 总体评价统计
  overallEvaluate: {
    placeholder: ['select platform', 'start time', 'end time'],
    table: {
      question: 'satisfaction type',
      number: 'number of evaluation',
      percent: 'satisfaction percentage'
    }
  },
  // 接待统计
  visitorRecord: {
    placeholder: ['select platform', 'reception time', 'visitor ip', 'select reception server', 'Select days'],
    table: {
      visitorName: 'visitor name',
      visitorIp: 'visitor ip',
      area: 'address',
      startTime: 'reception start time',
      endTime: 'reception end time',
      serviceTime: 'reception duration',
      server: 'reception server',
      total: 'Total reception',
      customer: 'Receiving Visitors'
    }
  },
  // 访客地域统计
  visitorRegion: {
    all: 'all',
    orderOptions: ['sort from low to high', 'sort from high to low'],
    text: ['visitor map', 'associated platform', 'visitor area distribution', 'return'],
    table: {
      province: 'province',
      number: 'number of visitor'
    },
    chart: ['geographical distribution of visitors', 'high', 'low']
  },
  // 客服端
  chatServer: {
    'title': 'Aiqia customer service workbench',
    'flashTitle': {
      'souce': 'Aiqia customer service workbench',
      'empty': '[　　　　　　　　]',
      'entity': '[received a new message!]'
    },
    'online': 'online',
    'offline': 'offline',
    invisible: 'invisible',
    invisibleAlert: {
      message: 'There are still online visitors<br>Please try again after transferring or removing the session'
    },
    'sessionOptions': [
      'Current session',
      'Historical conversation',
      'Pending session'
    ],
    'screenshot': [
      'Paste the captured picture Ctrl + V into the input box',
      'How do I send screenshots?'
    ],
    'curSesActions': [
      'Transfer',
      'remove',
      'set up',
      'Invite group chat',
      'Clean up all ended sessions'
    ],
    'closeSession': {
      'message': "<i class='material-icons-round delete-warn'>gpp_maybe</i> are you sure you want to remove {customer}",
      'tips': 'warning',
      'confirm': 'determine',
      'cancel': 'Think again',
      'end': 'The conversation is over!',
      'select': 'Please select the visitors to close first'
    },
    'hisSesActions': [
      'Receiving Visitors ',
      'Please select the visitors to receive'
    ],
    'curSesDialog': {
      'title': 'Session settings',
      'options': [
        'Establish conversation time sorting',
        "Visitors' new news at the top",
        'End of conversation -- reserved',
        'End of conversation -- remove'
      ],
      'showAll': 'Show all visitors',
      'footer': [
        'Clean up end session',
        'Confirm modification'
      ],
      'tips': [
        'Cleanup succeeded',
        'Set successfully'
      ]
    },
    inviteDialog: {
      title: 'Invite to join session',
      btns: ['Invite', 'Inviteing', 'cancel']
    },
    receiveInvite: ['customer service', 'Invite you to join the session', 'accept', 'refuse'],
    'header': [
      'Aiqia customer service workbench',
      'sign out',
      'Night mode',
      'Sound prompt',
      'language',
      'Safe exit'
    ],
    'chatContent': {
      'loading': 'Loading',
      'noMore': 'No more',
      'read': 'Read',
      'unread': 'Unread',
      'revoke': 'withdraw',
      'hasLeft': 'The customer has left',
      'history': 'Historical session',
      'failed': 'fail in send',
      'reSend': 'Resend'
    },
    'inputMenu': {
      'placeholder': 'Please enter the content',
      'send': 'send out',
      'soundDialog': {
        'title': 'sound recording',
        'tips': 'Recording, please speak',
        'send': 'send out',
        'cancel': 'Cancel'
      },
      'soundNoPerm': 'No permission to open microphone',
      customEmoji: {
        notify: {
          title: 'Tips',
          message: 'The upper limit has been reached. Please delete the picture to continue'
        }
      },
      clear: 'clear chat',
    },
    'userInfo': {
      'title': 'User Info',
      'visit': {
        'title': 'info',
        'source': 'Source:',
        'link': 'Access link:',
        'ip': 'IP:',
        'addr': 'Region:',
        'device': 'Equipment:',
        'system': 'System:',
        'chip': "Balance of chips:",
        'usdt': "Usdt balance:",
        'ctime': "Registration time:"
      },
      'card': {
        'title': 'card',
        'name': 'real name:',
        'customerName': 'name:',
        'email': 'Email:',
        'phone': 'mobile phone:',
        'address': 'address:',
        'age': 'age:',
        'comment': 'comment:',
        'gender': 'gender:',
        'qq': 'qq:',
        'weibo': 'weibo:',
        'weixin': 'weixin:',
        'isming': 'isming:',
        'placeholder': 'Click enter'
      },
      'mark': {
        'title': 'remarks',
        'placeholder': 'Please enter the content'
      },
      'other': {
        'title': 'operate',
        'addBlack': {
          'title': 'Join the blacklist',
          'message': "<i class='material-icons-round delete-warn'>gpp_maybe</i> are you sure to add the visitor to the blacklist",
          'tips': 'Tips',
          'confirm': 'determine',
          'cancel': 'cancel',
          'text': [
            'Please select a visitor',
            'The conversation is over!'
          ]
        }
      },
      'update': {
        'success': 'Record successful',
        'fail': 'Record failed'
      }
    },
    'commonWords': {
      'title': 'Reply',
      'send': 'send'
    },
    customSetLabel: 'Set up',
    customizeWords: {
      title: 'Custom idioms',
      button: ['answer', 'Add classification', 'Add answer', 'complete']
    },
    editHello: {
      entry: 'welcome',
      title: 'Add welcome',
      button: ['enable', 'complete'],
      placeholder: 'Enter welcome',
    },
    'transfer': {
      'title': 'Transfer',
      'actions': 'Transfer',
      'noServer': 'No online customer service',
      'select': 'Please select the visitor to transfer',
      'offline': "The current session is offline, can't the visitor to transfer",
    },
    beOffline: 'You have been offline by the administrator',
    invite: {
      notify: ['Success', 'Joined group', 'You have joined the group']
    }
  },
  // 客户端
  chatClient: {
    'server': 'customer service',
    'closeWindow': 'Do you want to close the current window',
    'tooltip': [
      'Leaving a message.',
      'Cue tone',
      'expression',
      'upload',
      'voice',
      'Score',
      'Skype phone'
    ],
    'close': "close",
    'loading': 'customer service loading...',
    'chatBody': {
      'uploading': 'Uploading',
      'question': 'common problem'
    },
    'chatContent': {
      'loading': 'Loading',
      'noMore': 'No more',
      'server': [
        'Or transfer',
        'Manual customer service',
        'The customer service is leaving temporarily, please',
        'Leaving a message.',
        'please',
        'Transfer to intelligent customer service',
        'or'
      ],
      'customer': {
        'read': 'Read',
        'unread': 'Unread'
      },
      'serverHello': 'Hello! You have connected to customer service. Please start the conversation',
      'robotUnknown': "I don't quite understand your problem, but I'm studying hard",
      'transfer': 'You have been transferred to'
    },
    'inputMenu': {
      'placeholder': 'Please enter the content',
      'send': 'send out',
      'soundDialog': {
        'title': 'sound recording',
        'tips': 'Recording, please speak',
        'actions': [
          'send out',
          'cancel'
        ]
      },
      'praseDialog': {
        'tips': 'At the end of this conversation, please rate this service:',
        'options': [
          'Very dissatisfied',
          'dissatisfied',
          'commonly',
          'satisfied',
          'Very satisfied'
        ],
        'actions': [
          'send out',
          'cancel'
        ]
      },
      'soundNoPerm': 'No permission to open microphone',
      'prased': 'Evaluated'
    },
    'leaveMsg': {
      'title': 'Leaving a message.',
      'label': {
        'name': 'contacts',
        'phone': 'contact information',
        'content': 'Message content'
      },
      'placeholder': {
        'name': 'Please enter contact',
        'phone': 'Please enter contact information',
        'content': 'Please enter the content'
      },
      'tips': {
        'name': 'Contact cannot be empty',
        'phone': [
          'Please enter the correct mobile phone number',
          'Mobile phone number cannot be empty'
        ],
        'content': 'Message content cannot be empty'
      }
    },
    timeout: {
      message: 'The network is busy, please refresh and try again',
      confirm: 'confirm'
    }
  },
  // 左侧导航栏
  router: {
    ewm: 'Scan the code to log in to the workbench',
    dashboard: 'home',
    serverWorkbench: 'server workbench',
    groupList: 'group list',
    serverList: 'server list',
    platformList: 'domain bind',
    connectServer: 'connect server',
    customParams: 'custom params',
    talkManage: 'session manage',
    talkAssign: 'session assign',
    talkRecord: 'session record',
    messageList: 'message list',
    autoReplay: 'auto message',
    dailyWord: 'daily word',
    dailyWordList: 'list',
    dailyWordType: 'type',
    questions: 'questions',
    robotServer: 'robot server',
    robotConfig: 'robot config',
    unknownQuestion: 'unknown problem',
    blackList: 'blacklist',
    dataStatistics: 'data statistics',
    serverEvaluation: 'server evaluation',
    overallEvaluation: 'overall evaluation',
    visitorRecord: 'visitor record',
    visitorRegion: 'visitor region',
    qualityTest: 'quality inspection',
    qualityScore: 'score',
    qualityTable: 'report',
    serverTable: 'customer report'
  },
  action: {
    label: 'action',
    type: {
      login: 'Sign in',
      offline: 'offline',
      save: 'save',
      reset: 'reset',
      continue: 'continue',
      confirm: 'confirm',
      cancel: 'cancel',
      search: 'search',
      submit: 'submit',
      add: 'add',
      copy: 'copy',
      edit: 'edit',
      delete: 'delete',
      invoke: 'invoke',
      answer: 'answer',
      recovery: 'recovery',
      batchEdit: 'batch edit',
      batchDelete: 'batch delete',
      batchAnswer: 'batch answer',
      deleteAnswerQuestion: 'delete answer question',
      markRead: 'mark read',
      markAllRead: 'mark all read'
    }
  },
  notify: {
    fail: 'fail',
    success: 'success',
    copySuccess: 'copy success'
  },
  table: {
    loading: 'querying...'
  },
  contextmenu: {
    refresh: 'refresh',
    close: 'close',
    closeAll: 'close all',
    closeOthers: 'close others',
    closeTranslate: 'translation off',
  },
  google: {
    title: 'Google Authenticator',
    label: 'Please enter the verification code',
    btn: 'Confirmed'
  },
  sound: {
    entry: 'Clew tone',
    title: 'Replace tone',
    current: 'Current tone:',
    placeholder: 'Please select a sound effect',
    audios: [
      "Default Sound",
      "Sound 1",
      "Sound 2",
      "Sound 3",
      "Sound 4",
      "Sound 5",
      "Sound 6"
    ]
  },
  "googleCheck": {
    "isgoogle": "Google secondary verification",
    "title": "Google Authenticator",
    "btns": ["previous step", "next step", "open", "copy"],
    "step1": {
      "tips": "Please scan the QR code and install Google verifier. If you have already installed it, please go to the next step",
      "action": "Download verifier",
      "desc": "I have installed Google searcher"
    },
    "step2": {
      "tips": "Please use Google verifier to scan the QR code below. After success, you will get a 6-digit dual verification code, which changes every 30 seconds.",
      "action": "Scan QR code",
      "desc1": "If the code scanning fails, please input the above key to the verifier. You need to set an account, for example: xxx@DigFinex (fill in your mobile phone / email account or your nickname at XXX).",
      "desc2": "I already have a 6-digit double verification code"
    },
    "step3": {
      "label": "Double verification code",
      "placeholder": "Please enter the double verification code"
    }
  },
}
