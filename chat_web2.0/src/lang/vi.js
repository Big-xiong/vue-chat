export default {
  // 商户登录
  sellerLogin: {
    title: 'Chuyển đổi đăng nhập',
    label: {
      username: 'Tên người dùng hay hộp thư',
      password: 'mật khẩu',
      captcha: 'Mật khẩu'
    },
    placeholder: {
      username: 'Hãy nhập tên người dùng hay email',
      password: 'Nhập mật khẩu đi.',
      captcha: 'Hãy nhập mật mã kiểm tra.'
    },
    tips: {
      username: 'Hãy nhập tên người dùng hay email',
      password: 'Nhập mật khẩu đi.',
      captcha: 'Mật khẩu không thể rỗng'
    },
    actions: ['Đăng nhập vào Kỳ Tiêu', 'Đội đăng ký', 'Quên mật khẩu?', 'Liên lạc với khách hàng', 'Tới trang web chính thức']
  },
  // 客服登录
  serverLogin: {
    title: 'Mã nhập dịch vụ',
    phone: "Di chuyển",
    phoneTips: "Mã quét điện thoại di động",
    placeholder: {
      seller_code: 'Hãy nhập tên thương gia.',
      username: 'Vui lòng nhập tên người dùng dịch vụ khách hàng',
      password: 'Nhập mật khẩu đi.',
      captcha: 'Hãy nhập mật khẩu bên phải.'
    },
    tips: {
      username: 'Tên ngươi dung không được để trông',
      password: 'mật khẩu không thể rỗng',
      captcha: 'Mật khẩu không thể rỗng'
    },
    login: 'Ký vô.',
    peopleType: ['Nhân viên dịch vụ', 'Trợ']
  },
  // 忘记密码
  forgetPassword: {
    title: 'Quên mật khẩu',
    subTitle: 'Hãy điền vào email đăng nhập và chúng tôi sẽ gửi email kiểm tra',
    placeholder: {
      email: 'Hãy nhập địa chỉ email đã đăng ký',
      veriCode: 'Hãy nhập mật mã kiểm tra.',
      password: 'Hãy nhập mật khẩu mới.',
      repeatPassword: 'Hãy nhập mật khẩu mới.'
    },
    tips: {
      email: ['Hộp thư không thể rỗng', 'Lỗi định dạng thư'],
      veriCode: 'Mật khẩu không thể rỗng',
      password: 'Hãy nhập mật khẩu mới.',
      repeatPassword: 'Hãy nhập mật khẩu mới.'
    },
    veriCode: ['Thu hồi', 'Gửi mã kiểm tra'],
    actions: ['quay', 'đặt lại mật khẩu', 'Liên lạc với khách hàng', 'Quay về trang nhà'],
    resetResult: ['Đặt mật khẩu thành công', 'Lỗi đặt lại mật khẩu'],
    sendResult: ['Gửi thành công', 'thất bại trong gửi']
  },
  // 导航栏
  navbar: {
    periodOfValidity: 'Khoảng thời gian',
    remaind: 'dư',
    remaind: 'nối',
    day: 'ngày',
    show: 'Hiển thị',
    hide: 'Cất đi.',
    refresh: 'Cập nhật',
    messageList: 'Danh sách thông điệp',
    fullScreen: 'Toàn màn hình',
    exitFullScreen: 'Thoát màn hình đầy',
    modifyPwd: 'Đổi mật khẩu',
    buyProd: 'Sản phẩm mua',
    howToUse: 'Làm thế nào để sử dụng',
    logout: 'kí vào đây',
    zh: 'Hoa (Đơn giản)',
    en: 'AnhName',
    vi: 'Tiếng Việt',
    th: 'Thái',
    es: 'Tây Ban',
    pt: 'PortugueName',
    ms: 'tiếng Mã Lai',
    nightMode: 'Chế độ đêm khuya',
    versionInfo: {
      title: 'Thông tin phiên bản',
      curVersion: 'Phiên bản hiện thời: v2.0',
      versionTitle: 'Hợp đồng quyền',
      versionContent: `
      <div>1. AiThanh được phép xác thực chính thức và người dùng có quyền lấy mật mã cập nhật sau đó.</div>
      <div>2. Người Tài liệu có thể sử dụng sản phẩm có bằng cấp cho bất cứ chương trình ứng dụng nào tuân theo luật pháp và quy định quốc gia, và không bị giới hạn bởi số tên miền và dự án.</div>
      <div>3. Nếu người ủy thác sử dụng các dự án thương mại được phát triển bởi các sản phẩm được trả công bởi aiqi (như là ERP, CMS, v.v), thì cần phải lưu trữ các ghi chú nguồn gốc và nguồn gốc của các sản phẩm được phê chuẩn.</div>
      <div>4. Người có trách nhiệm phải tôn trọng quyền sở hữu trí tuệ, bảo đảm là họ không cố tình phát tán mã nguồn hàng, không bán trực tiếp hay bán lại các sản phẩm được cho mình, và không tự nhận mình là sản phẩm của họ sau khi đã đóng gói các sản phẩm đã được cấp phép.Nếu không, chúng tôi có quyền rút lại giấy phép sản xuất và điều tra trách nhiệm pháp lý tương ứng dựa trên mức độ nghiêm trọng của tình hình.</div>
      <div>5. Đã xác nhận mã nguồn của A.A.Thanh được cho phép chưa có chi trả.</div>
      <div>6. Chúng tôi buộc phải cung cấp cho Bộ Tài liệu tải, cập nhật và bảo trì sản trong thời gian hợp lệ. Một khi nó hết hạn, Người Tài liệu không thể có thẩm quyền tương ứng.Giấy phép cả đời là vô hạn.</div>
      <div>7. www.aichating.com Nó có quyền được giải thích cuối cùng.</div>
      `,
      reserved: 'Quyền'
    },
    modifyPwdForm: {
      title: 'Đổi mật khẩu',
      label: {
        oldPwd: 'Mật khẩu cũ',
        newPwd: 'Mật khẩu mới',
        repeatPwd: 'Mật khẩu trùng'
      },
      placeholder: {
        oldPwd: 'Hãy nhập mật khẩu cũ.',
        newPwd: 'Hãy nhập mật khẩu mới.',
        repeatPwd: 'Hãy nhập vào mật khẩu trùng'
      },
      tips: {
        oldPwd: 'Không thể bỏ mật khẩu mới',
        newPwd: 'Không thể bỏ mật khẩu cũ',
        repeatPwd: 'Mật khẩu trùng không thể rỗng',
        notSame: 'Mật khẩu mới và mật khẩu sao lại không có mâu thuẫn'
      }
    }
  },
  // 主页
  dashboard: {
    total: 'nguyên',
    receptionVolume: {
      cumulative: 'Tổng kết',
      today: 'Đón tiếp hôm nay',
      online: 'Dịch vụ khách hàng trực tuyến',
      unConsult: 'Khách không tham gia'
    },
    onlineServer: {
      title: 'Chi tiết dịch vụ trực tuyến',
      name: 'tên người dùng',
      group: 'Nhóm',
      lastLoginTime: 'Lần đăng nhập cuối',
      status: 'Bang',
      serveredNumber: 'Số người được phục vụ',
      totalServeredNumber: 'Số người đã phục vụ tổng hợp',
      online: 'trực tuyến',
      offline: 'tắt',
      invisible: 'vô hình'
    },
    offlineServer: {
      message: ' Dịch vụ khách sạn',
      'tips': 'cảnh báo',
      'confirm': 'xác định',
      'cancel': 'Nghĩ lại đi.'
    },
    receptionOptions: [
      'Đón tiếp trong ba mươi ngày cuối cùng',
      'Đón tiếp trong bảy ngày qua',
      'Đón tiếp trong vòng một lăm ngày.'
    ],
    chart: {
      receptionVolume: 'Số tiếp tân'
    }
  },
  // 分组列表
  group: {
    groupNamePlaceholder: 'Hãy nhập tên nhóm',
    table: {
      groupId: 'Tên nhóm',
      accessType: 'Giấy thông hành',
      platform: 'bục',
      groupName: 'Tên nhóm',
      peopleNumber: 'Số nhóm',
      isPrep: 'Có trước nhóm',
      status: 'Trạng thái nhóm',
      createDate: 'Đã tạo',
      updateDate: 'Thời gian cập nhật',
      yes: 'Phải.',
      no: 'không',
      active: 'Kích hoạt',
      unActive: 'không hoạt động'
    },
    form: {
      addTitle: 'Thêm nhóm',
      editTitle: 'Sửa nhóm',
      yes: 'Phải.',
      no: 'không',
      label: {
        platform: 'PlanName',
        groupName: 'Tên nhóm',
        isActive: 'Kích hoạt',
        isPrep: 'Là nhóm phía trước'
      },
      placeholder: {
        groupName: 'Hãy nhập tên nhóm',
        platform: 'Vui lòng chọn nền'
      },
      tips: {
        groupName: 'Tên nhóm không thể rỗng',
        platform: 'Không thể rỗng'
      }
    },
    delete: {
      message: ' Xoá nhóm: {groupName}',
      tips: 'Mẹo',
      confirm: 'xác định',
      cancel: 'hủy'
    }
  },
  // 客服列表
  server: {
    search: {
      placeholder: {
        serverName: 'Hãy nhập tên dịch vụ khách hàng.',
        serverGroup: 'Hãy chọn nhóm dịch vụ khách hàng'
      }
    },
    table: {
      serverCode: 'Logo của dịch vụ khách.',
      userName: 'tên người dùng',
      serverName: 'Tên dịch vụ',
      serverAvatar: 'Nghĩa vụ Avatar.',
      serverGroup: 'Nhóm',
      maxServedNumber: 'Số người được phục vụ tối đa',
      serverStatus: 'Trạng thái dịch vụ',
      onlineStatus: 'Trạng thái trực tuyến',
      activated: 'Kích hoạt',
      prohibited: 'Cấm',
      online: 'trực tuyến',
      offline: 'tắt',
      invisible: 'vô hình',
      assist: 'trợ'
    },
    form: {
      addTitle: 'Thêm dịch vụ khách',
      editTitle: 'Sửa dịch vụ khách hàng',
      yes: 'Phải.',
      no: 'không',
      change: 'thay',
      peopleType: ['Thêm dịch vụ khách', 'Thêm trợ lý'],
      label: {
        serverName: 'Tên dịch vụ',
        serverPwd: 'Mật khẩu dịch vụ',
        serverGroup: 'Nhóm',
        maxServedNumber: 'Số người được phục vụ tối đa',
        userName: 'tên người dùng',
        activeStatus: 'Kích hoạt',
        serverAvatar: 'Nghĩa vụ Avatar.'
      },
      placeholder: {
        serverName: 'Hãy nhập tên dịch vụ khách hàng.',
        serverPwd: 'Hãy nhập mật khẩu dịch vụ khách hàng.',
        resetPwd: 'Việc khởi động lại',
        serverGroup: 'Hãy chọn nhóm của bạn',
        maxServedNumber: 'Hãy nhập số người được phục vụ tối đa.',
        userName: 'nhập một tên người dùng'
      },
      tips: {
        serverName: 'Tên dịch vụ khách hàng không thể rỗng',
        serverPwd: 'Mật khẩu dịch vụ khách hàng không thể rỗng',
        serverGroup: 'Nhóm mà nó thuộc về không thể rỗng',
        maxServedNumber: 'Số dịch vụ tối đa không thể rỗng',
        minServerNumber: 'Số nhân viên tối đa phải là ít nhất 10',
        userName: [
          'Tên người dùng không thể rỗng',
          'Tên người dùng đã có'
        ]
      },
      assistLabel: {
        userName: 'tên người dùng',
        nickName: 'Biệt danh?',
        password: 'mật khẩu',
        isActive: 'Kích hoạt',
        avatar: 'chân dung đầu'
      },
      assistPlaceholder: {
        userName: 'nhập một tên người dùng',
        nickName: 'Hãy nhập một biệt danh',
        password: 'Nhập mật khẩu đi.',
        isActive: 'Kích hoạt',
        avatar: 'chân dung đầu',
        inputPwd: 'Nhập mật khẩu đi.',
        resetPwd: 'Đặt lại khi nhập'
      },
      assistTips: {
        userName: 'Tên người dùng không thể rỗng',
        nickName: 'Biệt danh không thể rỗng',
        password: 'Mật khẩu không thể rỗng'
      },
      custom: 'Chọn'
    },
    delete: {
      message: ' Xoá dịch vụ khách hàng: {serverName}',
      tips: 'Mẹo',
      confirm: 'xác định',
      cancel: 'hủy'
    }
  },
  // 域名绑定
  platform: {
    platformPlaceholder: 'Hãy nhập tên platform',
    addDomainCourse: 'Tên miền thêm gia sư',
    batchTips: 'Hãy chọn phần nền cần thay đổi trước',
    table: {
      id: 'Số',
      domain: 'tên miền',
      platform: 'Tên platform',
      sign: 'Tín hiệu dịch vụ'
    },
    form: {
      addTitle: 'Thêm tên miền',
      editTitle: 'Sửa tên miền',
      batchEdit: 'Sửa bó',
      label: {
        platformName: 'Tên platform',
        domainName: 'tên miền',
        islayer: 'Lớp Elang',
        withdraw: 'Bỏ thời gian',
        serverSign: 'Tín hiệu dịch vụ',
        skype: 'SKYPE',
        themeColor: 'Màu sắc thái',
        bgColor: 'Màu nền',
        fontColor: 'Màu phông',
        onlineImg: 'Dịch vụ khách hàng online',
        chatBg: 'Chat nền',
        promoteImg: 'Văn bản tổng hợp hộp thoại',
        picSize: 'Đề nghị kích cỡ ảnh: 260*230',
        promoteLink: 'Kết nối'
      },
      placeholder: {
        platformName: 'Hãy nhập tên platform',
        withdraw: 'Hãy chọn thời gian thu hồi',
        domainName: 'Hãy nhập tên miền. Nhiều tên miền dùng đường truyền. Tên miền có thể điền vào các đặc trưng, chủ yếu dùng nhiệm vụ người đọc.',
        serverSign: 'Hãy nhập tên dịch vụ khách hàng.',
        skype: 'Hãy nhập vào Skype.',
        promoteLink: 'Hãy nhập vào link'
      },
      tips: {
        platformName: 'Tên platform không thể rỗng',
        domainName: 'Tên miền không thể rỗng'
      },
      unit: {
        close: 'đóng',
        s: 'giây',
        m: 'phút'
      },
      yes: 'Phải.',
      no: 'không'
    },
    delete: {
      message: ' Xoá tên miền: {domainName}',
      tips: 'Mẹo',
      confirm: 'xác định',
      cancel: 'hủy'
    }
  },
  // 接入客服
  connectServer: {
    type: {
      auto: 'Tự động phân phối',
      fixed: 'Quyền kết nối cố định',
      halfFixed: 'Truy cập kết nối cố định',
      layer: 'Truy cập lớp bom'
    },
    auto: {
      text: [
        'Bạn có thể chọn các điều kiện để tạo liên kết URL:',
        'Nhập hay chọn trình nền thích hợp',
        'Chọn tham số tự chọn',
        'Chọn các tham số',
        'Tạo đường dẫn dịch vụ khách',
        '* Nó được áp dụng cho sự truy cập đồng thời của nhiều dịch vụ khách hàng, và dịch vụ khách hàng được phân phối theo chiến lược phân phối.',
        'Nếu bạn không chọn nhóm, mọi nhóm sẽ được chọn.',
        'Tạo mã QR'
      ],
      placeholder: {
        platform: 'Nhập hay chọn trình nền thích hợp',
        group: 'Chọn nhóm'
      },
      tips: {
        platform: 'Hãy nhập vào hay chọn trình nền thích hợp'
      },
      table: {
        strategy: {
          title: 'Chương trình',
          options: ['Sắp xếp platform', 'Nhập nhóm']
        },
        link: 'Comment=Game thẻ Comment',
        ercode: 'mã QR'
      },
      log: 'Sau khi đánh dấu: Khách truy cập có thể xem cuộc trò chuyện lịch sử với dịch vụ khách hàng',
      domain: 'Tên miền thay thế: Thay thế khi liên kết xuất hiện chặn khu vực',
      logText: 'Lịch sử trò chuyện phía khách'
    },
    fixed: {
      text: [
        'Bạn có thể chọn các điều kiện để tạo liên kết URL:',
        'Luyện tập Comment',
        'Nhập hay chọn trình nền thích hợp',
        'Chọn dịch vụ khách hàng nhóm đã chỉ định',
        'Chọn tham số tự chọn',
        'Tạo đường dẫn dịch vụ khách',
        'Nhập tự động',
        ' * Nó dành cho dịch vụ khách hàng nhiều hay đơn lẻ để kết nối với khách hàng'
      ],
      placeholder: {
        platform: 'Chọn bục',
        group: 'Chọn nhóm',
        server: 'Chọn dịch vụ khách'
      },
      tips: {
        platform: 'Hãy chọn kênh đào tạo',
        group: 'Hãy chọn nhóm'
      },
      table: {
        name: 'dịch vụ khách',
        link: 'Comment'
      },
      course: {
        title: 'Luyện tập Comment',
        content: [
          'Bạn có thể theo những bước này để tạo liên kết bạn cần',
          'Tập tin truy cập cố định',
          '1.Trên trang ràng buộc tên miền, hãy nhắp vào Thêm và nhập tất cả tên miền dưới nền tảng của bạn.',
          '2.Mở cách truy cập trang và chọn tên miền vốn ràng buộc dưới hộp nhập tên miền đã chọn.',
          '3.Trong hộp nhập nhóm chọn, chọn nhóm đã đặt trước.Nếu bạn chỉ chọn nhóm và không chọn dịch vụ khách hàng để tạo liên kết trực tiếp, các liên kết dịch vụ khách hàng của tất cả các nhóm sẽ được hiển thị trong danh sách.',
          '4.Chọn dịch vụ khách hàng dưới nhóm.Các đường dẫn truy cập cho dịch vụ khách hàng này sẽ được tạo ra riêng.',
          '5.Sau khi bạn chọn tên miền, nhóm và dịch vụ khách hàng, hãy nhắp vào đó để tạo liên kết dịch vụ khách hàng, và danh sách sẽ liệt kê các liên kết dịch vụ khách hàng của các điều kiện đã chọn.',
          '6.Sao chép liên kết này và thêm nó vào bất cứ hình ảnh và văn bản nào trên nền Mạng của bạn. Nhấn vào nếu để bật lên cửa sổ sau.Cho thấy quyền truy cập đã hoàn tất.'
        ]
      }
    },
    halfFixed: {
      text: [
        'Bạn có thể chọn các điều kiện để tạo liên kết URL:',
        'Luyện tập Comment',
        'Nhập hay chọn trình nền thích hợp',
        'Chọn dịch vụ tiếp tân khách hàng, và dịch vụ khách hàng ở các nhóm khác là dịch vụ phục vụ khách hàng dự phòng.',
        'Chọn tham số tự chọn',
        'Tạo đường dẫn dịch vụ khách',
        'Nhập tự động',
        'Một dịch vụ khách hàng tiếp tân chính được sửa, và một dịch vụ khách hàng khác trong nhóm là dịch vụ tiếp tân khách. Khi khách hàng chính tắt máy, nó được tiếp nhận bởi dịch vụ tiếp tân khách hàng.'
      ],
      placeholder: {
        platform: 'Chọn bục',
        group: 'Chọn nhóm',
        server: 'Chọn dịch vụ tiếp tân'
      },
      tips: {
        platform: 'Hãy chọn kênh đào tạo',
        group: 'Hãy chọn nhóm'
      },
      table: {
        name: 'dịch vụ khách',
        link: 'Comment'
      },
      course: {
        title: 'Luyện tập Comment',
        content: [
          'Bạn có thể theo những bước này để tạo liên kết bạn cần',
          'Tập tin truy cập cố định',
          '1.Trên trang ràng buộc tên miền, hãy nhắp vào Thêm và nhập tất cả tên miền dưới nền tảng của bạn.',
          '2.Mở cách truy cập trang và chọn tên miền vốn ràng buộc dưới hộp nhập tên miền đã chọn.',
          '3.Trong hộp nhập nhóm chọn, chọn nhóm đã đặt trước.Nếu bạn chỉ chọn nhóm và không chọn dịch vụ khách hàng để tạo liên kết trực tiếp, các liên kết dịch vụ khách hàng của tất cả các nhóm sẽ được hiển thị trong danh sách.',
          '4.Chọn dịch vụ khách hàng dưới nhóm.Các đường dẫn truy cập cho dịch vụ khách hàng này sẽ được tạo ra riêng.',
          '5.Sau khi bạn chọn tên miền, nhóm và dịch vụ khách hàng, hãy nhắp vào đó để tạo liên kết dịch vụ khách hàng, và danh sách sẽ liệt kê các liên kết dịch vụ khách hàng của các điều kiện đã chọn.',
          '6.Sao chép liên kết này và thêm nó vào bất cứ hình ảnh và văn bản nào trên nền Mạng của bạn. Nhấn vào nếu để bật lên cửa sổ sau.Cho thấy quyền truy cập đã hoàn tất.'
        ]
      }
    },
    layer: {
      text: [
        'Luyện tập Comment',
        'Thêm mật mã sau này vào website bạn muốn truy cập:',
        'Chép mã',
        'Sao chép mật mã này vào trang web của bạn sẽ hiển thị biểu tượng của việc xem dịch vụ khách hàng trên website của bạn.',
        '* Bạn có thể tự động tạo ra một biểu tượng phục vụ khách hàng hoặc thay thế nó bằng một biểu tượng xác định người dùng để chỉ định dịch vụ khách hàng theo chính sách phân phối.'
      ],
      course: {
        title: 'Bật hỗ trợ truy cập',
        content: [
          'Bạn có thể theo những bước này để tạo liên kết bạn cần',
          'Bật hỗ trợ truy cập',
          'Làm ơn sao chép mã truy cập vào lớp bom trước.',
          'Sau đó, hãy tìm thư mục nơi bạn đã lưu tập tin web, tìm tập tin chỉ mục.html trong thư mục gốc, nhắp- phải vào con chuột một mình, tìm "cách mở cửa" trong trình đơn thả xuống, và dùng "văn bản" để mở tập tin chỉ mục.html.',
          'Khi bạn mở nó bằng văn bản, bạn sẽ thấy mã của trang web, tìm thẻ thi thể, và dán mã đã sao chép vào thẻ thi thể.',
          'Dán đoạn mã đã sao chép như đã hiển thị bên dưới',
          'Nhấn vào Lưu tập tin HTML.Nhấn đúp chỉ.html. Nếu bạn thấy biểu tượng sau trên trang web, nó có nghĩa là truy cập phục vụ khách hàng Quý sẽ thành công.',
          'Thông tin kiểu như màu sẽ tự động đạt được kiểu được dùng để ràng buộc tên miền.'
        ]
      }
    }
  },
  // 自定义参数
  customParams: {
    placeholder: 'Hãy nhập tên tham số',
    text: [
      'Những thông số sau đây là các tham số được gọi trực tiếp.'
    ],
    table: {
      id: 'Số',
      paramsName: 'Tên Tham số',
      paramsField: 'Tham số trường'
    },
    form: {
      addTitle: 'Thêm tham số tự chọn',
      editTitle: 'Sửa các tham số',
      label: {
        name: 'Tên Tham số',
        field: 'Tham số trường'
      },
      placeholder: {
        name: 'Hãy nhập tên tham số',
        field: 'Hãy nhập vào trường tham số'
      },
      tips: {
        name: 'Tên tham số không thể rỗng',
        field: 'Tham số không thể rỗng'
      }
    },
    delete: {
      message: ' Xoá tham số: {paramsName}',
      tips: 'Mẹo',
      confirm: 'xác định',
      cancel: 'hủy'
    }
  },
  // 会话分配
  sessionAssign: {
    head: 'Nguồn gốc',
    isoff: 'Khách cũ và tiếp khách',
    loading: 'Tiếp chiêu...',
    options: [
      {
        title: 'phân phối theo cách riêng',
        content: 'Đặt vị trí dịch vụ khách hàng. Kết nối các cuộc trò chuyện này được sắp xếp theo thứ này. Chúng được phân phối giữa dịch vụ khách hàng chỉ định, bắt đầu từ đầu'
      },
      {
        title: 'Ưu tiên hàng loại',
        content: 'Đặt vị trí dịch vụ khách hàng đầu, và chỉ định dịch vụ khách hàng đầu đến giới hạn tối đa của số cuộc đối thoại trước khi giao nó cho dịch vụ khách hàng tiếp theo.'
      },
      {
        title: 'Phát hành theo tải hiện thời',
        content: 'Khi có một cuộc đối thoại mới, hãy ưu tiên dịch vụ khách hàng với số cuộc đối thoại hiện thời ít nhất.'
      },
      {
        title: 'Thêm phân phối',
        content: 'Khi có một cuộc đối thoại mới, kiểm tra số cuộc đối thoại của tất cả các dịch vụ khách hàng đều được bố trí trong suốt ngày, và ưu tiên dịch vụ ít khách hàng tối thiểu.'
      },
      {
        title: 'ngẫu nhiên',
        content: 'Khi có một cuộc nói chuyện mới, nó được chỉ định ngẫu nhiên cho dịch vụ khách hàng hiện thời chỉ định sẵn.'
      }
    ]
  },
  // 会话记录
  sessionRecord: {
    customerFilter: {
      label: {
        platformName: 'Tên platform',
        customerName: 'Tên khách hàng',
        serverName: 'Tên dịch vụ',
        serviceTime: 'Thời gian tiếp tân',
        customTime: 'Tự chọn',
        talkType: 'Kiểu chuyển đổi',
        content: "Nội dung đối thoại",
        satisfaction: 'Thỏa mãn'
      },
      placeholder: {
        platformName: 'Chọn bục',
        customerName: 'Hãy nhập tên khách hàng bạn muốn truy vấn',
        serverName: 'Chọn dịch vụ khách',
        serviceTime: 'Thời gian tiếp tân',
        customTime: {
          start: 'Ngày đầu',
          separator: 'đến',
          end: 'Ngày cuối'
        },
        talkType: 'Chọn kiểu đối thoại',
        content: "Hãy nhập vào nội dung cuộc nói chuyện",
        satisfaction: 'Chọn hài lòng'
      },
      timeOptions: ['7 ngày', '30 ngày'],
      talkTypeOptions: ['nguyên', 'Cuộc đối thoại dịch vụ', 'Không nói chuyện.', 'Nhập tự động', 'Nhóm đối thoại'],
      tips: {
        platformName: 'Hãy chọn kênh đào tạo',
        customerName: 'Hãy chọn dịch vụ khách hàng',
        serviceTime: 'Hãy chọn thời gian tiếp tân'
      },
      getCustomer: 'Chuẩn bị'
    },
    customerList: {
      head: ['Danh sách khách hàng', 'Xuất tất cả']
    },
    chatContent: {
      server: 'dịch vụ khách',
      read: 'Đọc',
      unRead: 'Không',
      placeholder: 'Hãy nhập vào nội dung chat',
      export: 'xuất',
      seeCustomerDetail: 'Xem chi tiết khách'
    },
    customerDetail: {
      id: 'Tên phiên chạy',
      userName: 'tên người dùng',
      server: 'Phục vụ khách hàng',
      area: 'vùng',
      userIp: 'IP người dùng',
      phone: 'Điện',
      email: 'Hộp thư',
      enterTime: 'Giờ vào khách thăm',
      duration: 'Phiên chạy',
      source: 'Nguồn phiên chạy',
      satisfaction: 'Thỏa mãn',
      browser: 'trình duyệt',
      system: 'Comment'
    },
    satisfactionOptions: ['Rất thất vọng', 'bất mãn', 'thường', 'thỏa', 'Rất thỏa mãn'],
    noRecord: 'Thêm ghi chép',
    noData: 'Không có dữ liệu',
    noMore: 'Không còn nữa.'
  },
  // 消息列表
  messageList: {
    unreadCount: 'Không có số:',
    placeholder: 'Chọn bục',
    table: {
      name: 'Nguồn',
      nameValue: '【Thông điệp hệ thống】',
      phoneValue: 'không',
      phone: 'Số liên lạc',
      content: 'Thông điệp',
      leaveTime: 'Thời gian nhắn',
      status: 'trạng thái đọc',
      processTime: 'Thời gian xử lý',
      read: 'Đọc',
      unRead: 'Không'
    },
    delete: {
      message: ' Xóa tin nhắn này?',
      tips: 'Mẹo',
      confirm: 'xác định',
      cancel: 'hủy'
    }
  },
  // 自动消息
  authMessage: {
    head: ['Chọn tên nền', 'Thiết lập thư mục'],
    config: {
      promote: {
        title: 'Tin tình báo',
        tips: 'Khi mỗi cuộc đối thoại được mở, hệ thống tự động gửi một nhóm thông điệp thăng tiến cho khách hàng.',
        add: 'Tin mới thăng chức',
        limit: 'Đến năm',
        table: {
          order: 'Số seri',
          content: 'nội dung',
          status: 'Bang'
        },
        form: {
          addTitle: 'Thêm thông điệp thăng tiến',
          editTitle: 'Sửa thông điệp thăng tiến',
          label: {
            status: 'Hàm bật'
          },
          tips: {
            content: 'Thông điệp tiến bộ không thể rỗng'
          }
        },
        delete: {
          message: ' Bạn có chắc muốn xoá thông điệp thăng chức này không?',
          tips: 'Mẹo',
          confirm: 'xác định',
          cancel: 'hủy'
        }
      },
      welcomeMsg: {
        title: 'Tin nhắn Welcome',
        tips: 'Khi mỗi cuộc đối thoại được mở, hệ thống sẽ tự động gửi một thông điệp chào đón đến khách hàng.',
        placeholder: 'Xin chào, tôi có thể giúp gì?'
      },
      noResponse: {
        title: 'Không có tin nhắn đáp',
        tips: 'Khi dịch vụ khách hàng không trả lời tin nhắn của khách hàng trong một thời gian, hệ thống s ẽ tự động gửi thông điệp cho anh ta',
        placeholder: 'Xin chào, cuộc nói chuyện của bạn đã được loại bỏ. bạn có thể liên lạc với chúng tôi bất cứ lúc nào.',
        text: ['Thời gian phát: dịch vụ khách hàng vượt trội', 'Không có đáp ứng tự động sau vài giây.']
      },
      offline: {
        title: 'Thông điệp dịch vụ khách sạn',
        tips: 'Khi dịch vụ khách hàng tắt nguồn, hệ thống sẽ tự động gửi thông điệp cho anh ta.',
        placeholder: 'Khi dịch vụ khách hàng tắt nguồn, hệ thống sẽ tự động gửi thông điệp cho anh ta. Xin chào, dịch vụ khách hàng của bạn đang nghỉ ngơi.'
      },
      comment: {
        title: 'Thông điệp đánh giá dịch vụ',
        tips: 'Kết thúc cuộc nói chuyện, hệ thống đánh giá sẽ gửi thông điệp đánh giá đến khách hàng',
        placeholder: 'Xin chào, cuộc nói chuyện đã kết thúc.'
      },
      endMsg: {
        title: 'Kết thúc tin nhắn',
        tips: 'Một thông điệp sẽ được gửi đến khách hàng sau khi cuộc nói chuyện kết thúc.',
        placeholder: 'Chào, cuộc nói chuyện đã kết thúc, chúng tôi rất mong được phục vụ quý vị.'
      },
      autoMsg: {
        title: 'Thông điệp tự động kích hoạt khách hàng',
        tips: 'Khi bạn sử dụng dịch vụ cấp độ cao, bạn có thể đặt thời gian khi thông điệp sẽ xuất hiện tự động.',
        placeholder: 'Xin chào, tôi có thể giúp gì?',
        text: ['Duyệt khách', 'Thông điệp dịch vụ khách hàng']
      },
      enable: 'Hàm bật',
      cancel: 'hủy',
      submit: 'Gởi ngay đi.'
    }
  },
  // 质检评分
  qualityScore: {
    switch: 'Chỉ số kiểm tra chất lượng mở',
    table: {
      search: ['Chọn một nền tảng', 'tất cả', 'Vui lòng chọn chỉ số kiểm tra chất lượng', 'triển khai thực hiện'],
      options: ['số seri', 'Tên kiểm tra chất lượng', 'Nền tảng tương ứng', 'Số lượng dịch vụ khách hàng', 'dịch vụ khách hàng', 'Ghi bàn']
    },
    setting: {
      title: 'Đặt các chỉ số kiểm tra chất lượng',
      last: 'chi',
      form: ['Tên kiểm tra chất lượng', 'Hãy nhập tên thanh tra chất lượng', 'Đặt ghi số tổng', 'Hãy chọn điểm tổng', 'Vòng kiểm tra chất lượng', 'Hãy chọn một vòng kiểm tra chất lượng', 'Thời gian đăng nhập', 'Nếu dịch vụ khách hàng không đăng nhập đúng giờ, nó sẽ bị khấu trừ.', 'Văn lệnh', 'Giọng nói: khóa', 'Thêm từ khoá', 'ước tính', 'Điểm dưới:', 'Thẻ', 'diễn văn', 'Lặp lại văn lệnh và khấu trừ mỗi lần', 'Điểm kiểm tra chấm', 'Bắt đầu kiểm tra điểm', 'Khoảng đối thoại', 'Giao dịch vượt quá', 'giây', 'Đáp ứng thoại', 'Đáp ứng quá cao'],
      table: ['Mới nhất giờ kiểm tra điểm', 'Kiểm tra điểm khách hàng', 'Điểm kiểm tra chấm', 'nhận', 'Chạy', 'soạn thảo', 'Không có thông tin kiểm tra'],
      button: ['nhắc', 'Gởi', 'Đặt thời gian biểu phục vụ khách', 'Xem bảng phân công'],
      label: ['Mỗi ngày', 'một tuần', 'một tháng', 'Một phần tư']
    }
  },
  // 质检报表
  qualityTable: {
    search: ['Chọn bục', 'Chọn dịch vụ khách', 'Ngày đầu', 'đến', 'Ngày cuối', 'báo cáo xuất'],
    table: ['dịch vụ khách', 'Vòng hoa/ thời gian', 'Ký vô.', 'Không trả lời', 'Khoảng thời gian trả lời', 'Kiểm tra chấm', 'đánh', 'từ khoá', 'Tổng ghi điểm']
  },
  // 客服报表
  serverTable: {
    search: ['Hãy chọn thời gian', 'đến', 'Chọn bục', 'Chọn nhóm', 'Chọn dịch vụ khách'],
    table: ['Số seri', 'dịch vụ khách', 'Nhóm', 'Khoảng thời gian trung bình', 'Thời gian tiếp tân', 'Tổng khách', 'Nhận ngày trung bình', 'Khoảng thời gian trung bình', 'đánh', 'Điểm thanh tra chất lượng trung bình', 'Số sàn dịch vụ', 'Tên platform']
  },
  // 常用语列表
  dailyWord: {
    filter: {
      label: [
        "Chọn một bục:",
        "Chọn phân loại:"
      ],
      placeholder: [
        "nguyên",
        "Tìm kiếm chung"
      ]
    },
    table: {
      id: 'Xác nhận vấn đề',
      title: 'Tên ngắn',
      word: 'nội dung',
      domain_title: 'PlanName',
      type: 'Hạng',
      createTime: 'Đã tạo',
      updateTime: 'Thời gian cập nhật'
    },
    form: {
      addTitle: 'Thêm từ thường',
      editTitle: 'Sửa các từ chung',
      label: {
        type: 'Chọn phân loại',
        title: 'Tên ngắn',
        content: 'Câu hỏi'
      },
      placeholder: {
        type: 'Hãy chọn',
        title: 'Hãy nhập một tựa đề',
        content: 'Hãy nhập vào nội dung câu hỏi'
      },
      tips: {
        type: 'Không thể phân loại rỗng',
        title: 'Đầu đề ngắn không thể rỗng',
        content: 'Không thể bỏ câu hỏi'
      }
    },
    delete: {
      message: ' Bạn có chắc muốn xoá mục này không?',
      tips: 'Mẹo',
      confirm: 'xác định',
      cancel: 'hủy'
    }
  },
  // 常用语分类
  dailyWordType: {
    placeholder: 'Hãy nhập tên phân hạng',
    table: {
      id: 'Số phận',
      platform: '平台名称',
      name: 'Tên phân loại',
      status: 'Bang',
      active: 'Bật',
      unActive: 'Tắt'
    },
    form: {
      addTitle: 'Thêm phân loại',
      editTitle: 'Sửa hạng',
      label: {
        platform: 'PlanName',
        name: 'Tên phân loại',
        status: 'Bật'
      },
      placeholder: {
        platform: 'PlanName',
        name: 'Hãy nhập tên phân hạng'
      },
      tips: {
        platform: 'Không thể rỗng',
        name: 'Tên phân loại không thể rỗng'
      },
      yes: 'Phải.',
      no: 'không'
    },
    delete: {
      message: ' Bạn có chắc muốn xoá mục này không?',
      tips: 'Mẹo',
      confirm: 'xác định',
      cancel: 'hủy'
    }
  },
  // 常见问题
  questions: {
    placeholder: 'nguyên',
    delTips: 'Hãy chọn câu hỏi cần xoá trước',
    table: {
      id: 'Xác nhận vấn đề',
      platform: 'Tên platform',
      question: 'vấn đề',
      answer: 'đáp',
      createTime: 'Đã tạo'
    },
    form: {
      addTitle: 'Thêm câu hỏi',
      editTitle: 'Sửa câu hỏi',
      label: {
        platform: 'PlanName',
        question: 'vấn đề',
        answer: 'đáp'
      },
      placeholder: {
        platform: 'Hãy chọn kênh đào tạo',
        question: 'Hãy nhập vào một câu hỏi'
      },
      tips: {
        platform: 'Không thể rỗng',
        question: 'Câu hỏi không thể rỗng',
        answer: 'Câu trả lời không thể trống rỗng'
      }
    },
    delete: {
      message: ' Bạn có chắc muốn xoá mục này không?',
      tips: 'Mẹo',
      confirm: 'xác định',
      cancel: 'hủy'
    }
  },
  // 机器人设置
  robot: {
    head: ['Chọn tên nền', 'Thiết lập Robot'],
    config: {
      robotAble: {
        title: 'Công tắc Rô-bốt',
        tips: 'Kích hoạt dịch vụ khách sạn'
      },
      robotFirstAble: {
        title: 'Kích hoạt khách hàng robot trước dịch vụ khách hàng',
        tips: 'Trước khi nói chuyện, người máy tiếp nhận khách hàng.'
      },
      robotLastAble: {
        title: 'Đón tiếp khi khách không có khách sạn hay chỗ ngồi đã bị chiếm đóng',
        tips: 'Mọi cuộc đối thoại đều được ưu tiên vào tiếp tân bằng tay. Khi tiếp tân khách đến giới hạn tối đa, người máy sẽ tiếp nhận cuộc đối thoại mới.'
      },
      knowledge: {
        placeholder: 'Hỏi tìm',
        entry: 'Thành phần Robot',
        import: 'Nhập kiến thức',
        export: 'Xuất kiến thức',
        table: {
          question: 'vấn đề',
          answer: 'đáp',
          status: 'Bang',
          enable: 'Bật',
          disable: 'Tắt'
        },
        uploadForm: {
          title: 'Nhóm cộng kiến thức',
          editTitle: 'Sửa nền hiểu biết',
          addTitle: 'Thêm nền hiểu biết',
          text: ['Nhấn vào tải', 'Tài liệu được nhập hỗ trợ việc tải lên dạng xls và xlsx']
        },
        editForm: {
          addTitle: 'Thêm nền hiểu biết',
          editTitle: 'Sửa nền hiểu biết',
          label: {
            question: 'vấn đề',
            answer: 'đáp',
            status: 'Bật'
          },
          placeholder: {
            question: 'Hãy nhập vào một câu hỏi',
            answer: 'Hãy nhập câu trả lời.'
          },
          tips: {
            question: 'Câu hỏi không thể rỗng',
            answer: 'Câu trả lời không thể trống rỗng'
          }
        },
        delete: {
          message: ' Xoá mục này ?',
          tips: 'Mẹo',
          confirm: 'xác định',
          cancel: 'hủy'
        }
      },
      robotName: {
        title: 'Tên robot',
        tips: 'Cho dịch vụ khách hàng thông minh một cái tên',
        placeholder: 'Thông minh phục vụ khách hàng'
      },
      robotAvatar: {
        title: 'Avatar robot.',
        tips: 'Tải ảnh lên cho dịch vụ khách hàng thông minh',
        text: ['Avatar riêng', 'Đăng tải']
      },
      robotWelMsg: {
        title: 'Chào đón Robot.',
        tips: 'Khi dịch vụ khách hàng không thể trả lời, người máy sẽ tự động gửi tin nhắn chào đón đến khách hàng.',
        placeholder: 'Dịch vụ khách hàng thông minh cho bạn'
      },
      robotUnknownMsg: {
        title: 'Câu hỏi lạ',
        tips: 'Đáp lại khi người máy không nhận ra câu hỏi',
        placeholder: 'Tôi không hiểu vấn đề của anh, nhưng t ôi đang học chăm chỉ.'
      },
      robotEndMsg: {
        title: 'Kết luận Rô-bốt',
        placeholder: 'Dịch vụ khách hàng thông minh cảm ơn vì đã sử dụng.Hẹn gặp lại.'
      },
      enable: 'Hàm bật',
      cancel: 'hủy',
      submit: 'Gởi ngay đi.'
    }
  },
  // 未知问题
  unknownQuestion: {
    placeholder: 'Hãy chọn kênh đào tạo',
    table: {
      question: 'vấn đề',
      questioner: 'Thẩm vấn',
      questionTime: 'Giờ câu hỏi',
      status: 'Bang',
      answered: 'đáp',
      unAnswer: 'Không'
    },
    form: {
      addTitle: 'Thêm nền hiểu biết',
      batchEdit: 'Sửa bó',
      label: {
        question: 'vấn đề',
        date: 'Hợp lệ phát',
        answer: 'đáp',
        status: 'Bật'
      },
      placeholder: {
        question: 'Hãy nhập vào một câu hỏi',
        answer: 'Hãy nhập câu trả lời.'
      },
      tips: {
        question: 'Câu hỏi không thể rỗng',
        answer: 'Câu trả lời không thể trống rỗng'
      }
    },
    delete: {
      message: [' Bạn có chắc muốn xoá câu hỏi này và trả lời không?', ' Bạn có chắc muốn xoá câu hỏi và câu trả lời đã chọn không?'],
      tips: 'Mẹo',
      confirm: 'xác định',
      cancel: 'hủy'
    },
    tips: ['Hãy chọn câu hỏi và câu trả lời cần xoá trước.', 'Hãy chọn câu hỏi và câu trả lời cần được trả lời trước.']
  },
  // 黑名单管理
  blackList: {
    placeholder: ['Hãy chọn kênh đào tạo', 'Nhập IP'],
    table: {
      id: 'id',
      ip: 'ip',
      customerName: 'Tên người thăm',
      realName: 'Tên thư thăm',
      addTime: 'Thêm thời gian'
    },
    delete: {
      message: ' Anh có chắc muốn phục hồi vị khách này không?',
      tips: 'Mẹo',
      confirm: 'xác định',
      cancel: 'hủy'
    }
  },
  // 客服评价统计
  serverEvaluate: {
    placeholder: ['Hãy chọn kênh đào tạo', 'giờ khởi chạy', 'Hết giờ'],
    table: {
      serverName: 'Tên dịch vụ',
      star1: 'Rất thất vọng',
      star2: 'bất mãn',
      star3: 'thường',
      star4: 'thỏa',
      star5: 'Rất thỏa mãn',
      percent: 'Tỷ lệ mãn'
    }
  },
  // 总体评价统计
  overallEvaluate: {
    placeholder: ['Hãy chọn kênh đào tạo', 'giờ khởi chạy', 'Hết giờ'],
    table: {
      question: 'Vấn đề chất lượng dịch',
      number: 'Số lần thử',
      percent: 'Tỷ lệ mãn'
    }
  },
  // 接待统计
  visitorRecord: {
    placeholder: ['Hãy chọn kênh đào tạo', 'Thời gian tiếp tân', 'Thăm dò IP', 'Xin hãy chọn dịch vụ khách hàng', 'Chọn ngày'],
    table: {
      visitorName: 'Tên người thăm',
      visitorIp: 'Thăm dò ip',
      area: 'vùng',
      startTime: 'Bắt đầu đếm giờ',
      endTime: 'Khoảng thời gian cuối',
      serviceTime: 'Khoảng thời gian tiếp',
      server: 'Phục vụ khách hàng',
      total: 'Tổng tiếp tân',
      customer: 'Đang nhận khách'
    }
  },
  // 访客地域统计
  visitorRegion: {
    all: 'nguyên',
    orderOptions: ['Sắp xếp từ thấp sang cao', 'Sắp xếp từ cao xuống thấp'],
    text: ['Bản đồ vùng truy cập', 'Liên kết platform', 'Phân chia khu vực', 'quay'],
    table: {
      province: 'Từ tỉnh',
      number: 'Số lần thử lại'
    },
    chart: ['Chương trình địa lý', 'cao', 'thấp']
  },
  // 左侧导航栏
  router: {
    ewm: 'Quét mật mã để đăng nhập vào bảng làm việc.',
    dashboard: 'trang',
    serverWorkbench: 'Chăm sóc khách hàng',
    groupList: 'Danh sách nhóm',
    serverList: 'Danh sách dịch vụ',
    platformList: 'Mục tên miền',
    connectServer: 'Tiếp cận dịch vụ khách',
    customParams: 'Tham số tự chọn',
    talkManage: 'quản lý phiên chạy',
    talkAssign: 'Việc phiên chạy',
    talkRecord: 'Ghi chú phiên chạy',
    messageList: 'Danh sách thông điệp',
    autoReplay: 'Tin nhắn tự động',
    dailyWord: 'Nói chung',
    dailyWordList: 'danh sách',
    dailyWordType: 'phân loại',
    questions: 'vấn đề chung',
    robotServer: 'Dịch vụ Robot',
    robotConfig: 'Thiết lập Robot',
    unknownQuestion: 'Vấn đề lạ',
    blackList: 'đen',
    dataStatistics: 'Thống kê dữ liệu',
    serverEvaluation: 'đánh giá dịch vụ',
    overallEvaluation: 'Đánh giá chung',
    visitorRecord: 'Đón',
    visitorRegion: 'Khu vực thăm',
    qualityTest: 'Kiểm tra chất lượng',
    qualityScore: 'Điểm kiểm tra chất lượng',
    qualityTable: 'Báo cáo kiểm tra chất lượng',
    serverTable: 'Báo cáo dịch vụ khách hàng'
  },
  // 客服端
  chatServer: {
    'title': 'Bàn làm việc phục vụ khách hàng',
    'flashTitle': {
      'souce': 'Bàn làm việc phục vụ khách hàng',
      'empty': '[               ]',
      'entity': '[nhận được tin mới]'
    },
    'online': 'trực tuyến',
    'offline': 'tắt',
    invisible: 'vô hình',
    invisibleAlert: {
      message: 'Hiện tại vẫn có khách online<br>Vui lòng thử lại sau khi chuyển tiếp hoặc xóa phiên'
    },
    'sessionOptions': [
      'Phiên chạy',
      'Câu chuyện lịch sử',
      'Gặp trước'
    ],
    'screenshot': [
      'Dán ảnh đã chụp Ctrl+V vào hộp nhập',
      'Làm sao tôi gửi ảnh chụp?'
    ],
    'curSesActions': [
      'Truyền:',
      'Gỡ bỏ phiên chạy',
      'thiết lập',
      'Chào nhóm chat',
      'Xóa tất cả các phiên chạy đã kết thúc'
    ],
    'closeSession': {
      'message': '  Bạn có chắc muốn gỡ bỏ? {customer}',
      'tips': 'cảnh báo',
      'confirm': 'xác định',
      'cancel': 'Nghĩ lại đi.',
      'end': 'Cuộc nói chuyện kết thúc!',
      'select': 'Hãy chọn khách cần đóng cửa trước.'
    },
    'hisSesActions': [
      'Đang nhận khách',
      'Hãy chọn những vị khách cần nhận.'
    ],
    'curSesDialog': {
      'title': 'Thiết lập phiên chạy',
      'options': [
        'Thu xếp thời gian đối thoại',
        'Tin mới của khách thăm trên đỉnh',
        'Kết thúc cuộc nói chuyện',
        'Kết thúc cuộc nói chuyện'
      ],
      'showAll': 'Hiện tất cả khách',
      'footer': [
        'Xoá bỏ hết phiên chạy',
        'Xác nhận sửa'
      ],
      'tips': [
        'Dọn sạch thành công',
        'Đặt thành công'
      ]
    },
    inviteDialog: {
      title: 'Mời vào phiên chạy',
      btns: ['giấy', 'Mời vào', 'hủy']
    },
    receiveInvite: ['dịch vụ khách', 'Mời bạn tham gia buổi họp', 'chấp nhận', 'từ'],
    'header': [
      'Bàn làm việc phục vụ khách hàng',
      'kí vào đây',
      'Chế độ đêm khuya',
      'Nhắc âm',
      'ngôn ngữ',
      'Lối thoát an toàn'
    ],
    'chatContent': {
      'loading': 'Name',
      'noMore': 'Không còn nữa.',
      'read': 'Đọc',
      'unread': 'Không',
      'revoke': 'rút lui',
      'hasLeft': 'Khách hàng đã đi rồi.',
      'history': 'Họp lịch sử',
      'failed': 'thất bại trong gửi',
      'reSend': 'Đặt'
    },
    'inputMenu': {
      'placeholder': 'Hãy nhập nội dung',
      'send': 'Phát ra',
      'soundDialog': {
        'title': 'âm thanh',
        'tips': 'Ghi âm, nói đi',
        'send': 'Phát ra',
        'cancel': 'Thôi'
      },
      'soundNoPerm': 'Không được phép mở microphone.',
      customEmoji: {
        notify: {
          title: 'Mẹo',
          message: 'Giới hạn trên đã đạt. Xin hãy xóa ảnh để tiếp tục'
        }
      },
      clear: 'Làm sạch cuộc trò chuyện',
    },
    'userInfo': {
      'title': 'thông tin',
      'visit': {
        'title': 'thông tin',
        'source': 'Nguồn:',
        'link': 'Liên kết dịch vụ:',
        'ip': 'IP:',
        'addr': 'Vùng:',
        'device': 'Trang:',
        'system': 'Hệ:',
        'chip': "Tỷ lệ con chip:",
        'usdt': "Hợp đồng:",
        'ctime': "Thời gian đăng ký:"
      },
      'card': {
        'title': 'danh thiếp',
        'name': 'tên:',
        customerName: 'tên tài khoản：',
        'email': 'Email:',
        address: '地址：',
        age: '年龄：',
        comment: '备注：',
        gender: '性别:',
        qq: 'QQ：',
        weibo: '微博：',
        weixin: '微信：',
        isming: '是否实名：',
        'phone': 'di động:',
        'placeholder': 'Nhấn Enter'
      },
      'mark': {
        'title': 'nhận',
        'placeholder': 'Hãy nhập nội dung'
      },
      'other': {
        'title': 'vận hành',
        'addBlack': {
          'title': 'Vào danh sách đen',
          'message': ' Bạn có chắc muốn thêm vị khách này vào danh sách đen không?',
          'tips': 'Mẹo',
          'confirm': 'xác định',
          'cancel': 'hủy',
          'text': [
            'Hãy chọn khách',
            'Cuộc nói chuyện kết thúc!'
          ]
        }
      },
      'update': {
        'success': 'Thành công lưu',
        'fail': 'Lỗi ghi lại'
      }
    },
    'commonWords': {
      'title': 'Đáp lại',
      'send': 'Phát ra'
    },
    customSetLabel: 'cài đặt',
    customizeWords: {
      title: 'Tùy chọn',
      button: ['Văn bản thường', 'Thêm phân loại', 'thêm câu trả lời', 'Hoàn']
    },
    editHello: {
      entry: 'Chào.',
      title: 'thêm chào mừng',
      button: ['cho phép', 'Hoàn'],
      placeholder: 'Nhập chào mừng',
    },
    'transfer': {
      'title': 'Transfer',
      'actions': 'Truyền:',
      'noServer': 'Không có dịch vụ khách hàng',
      'select': 'Hãy chọn vị khách cần chuyển',
      'offline': 'Phiên hiện tại đang ngoại tuyến và không thể chuyển khách vào lúc này',
    },
    beOffline: 'Bạn đã bị nhà quản trị ngoại tuyến',
    invite: {
      notify: ['thành công', 'Nhóm liên kết', 'Bạn đã gia nhập nhóm']
    }
  },
  // 客户端
  chatClient: {
    'server': 'dịch vụ khách',
    'closeWindow': 'Bạn có muốn đóng cửa sổ hiện thời',
    'tooltip': [
      'Để lại tin nhắn.',
      'Giọng nữ',
      'biểu',
      'tải',
      'Giọng',
      'Điểm',
      'Điện thoại Skype'
    ],
    'close': "đóng",
    'loading': 'tải dịch vụ khách hàng...',
    'chatBody': {
      'uploading': 'Gửi',
      'question': 'vấn đề chung'
    },
    'chatContent': {
      'loading': 'Name',
      'noMore': 'Không còn nữa.',
      'server': [
        'Hay chuyển nhượng',
        'Giúp khách hàng thủ',
        'Khách hàng xin tạm thời rời đi.',
        'Để lại tin nhắn.',
        'Mời.',
        'Chuyển sang dịch vụ khách hàng thông minh',
        'hoặc'
      ],
      'customer': {
        'read': 'Đọc',
        'unread': 'Không'
      },
      'serverHello': 'Alô!Bạn đã kết nối tới dịch vụ khách hàng. Xin hãy bắt đầu cuộc nói chuyện.',
      'robotUnknown': 'Tôi không hiểu vấn đề của anh, nhưng t ôi đang học chăm chỉ.',
      'transfer': 'Anh đã được chuyển đến...'
    },
    'inputMenu': {
      'placeholder': 'Hãy nhập nội dung',
      'send': 'Phát ra',
      'soundDialog': {
        'title': 'âm thanh',
        'tips': 'Ghi âm, nói đi',
        'actions': [
          'Phát ra',
          'hủy'
        ]
      },
      'praseDialog': {
        'tips': 'Kết thúc cuộc nói chuyện này, xin đánh giá dịch vụ này:',
        'options': [
          'Rất thất vọng',
          'bất mãn',
          'thường',
          'thỏa',
          'Rất thỏa mãn'
        ],
        'actions': [
          'Phát ra',
          'hủy'
        ]
      },
      'soundNoPerm': 'Không được phép mở microphone.',
      'prased': 'Đánh giá'
    },
    'leaveMsg': {
      'title': 'Để lại tin nhắn.',
      'label': {
        'name': 'liên lạc',
        'phone': 'Thông tin liên lạc',
        'content': 'Thông điệp'
      },
      'placeholder': {
        'name': 'Hãy nhập tên',
        'phone': 'Hãy nhập thông tin liên lạc',
        'content': 'Hãy nhập nội dung'
      },
      'tips': {
        'name': 'Liên lạc không thể rỗng',
        'phone': [
          'Hãy nhập số điện thoại di động đúng',
          'Số điện thoại di động không thể rỗng'
        ],
        'content': 'Không thể rỗng thông tin'
      }
    },
    timeout: {
      message: 'Mạng bận, vui lòng thử lại sau khi làm mới',
      confirm: 'Xác định'
    }
  },
  action: {
    label: 'Chạy',
    type: {
      login: 'Ký vô.',
      offline: 'Comment',
      save: 'bảo:',
      reset: 'Đặt',
      continue: 'tiếp',
      confirm: 'xác định',
      cancel: 'hủy',
      search: 'xem',
      submit: 'Gởi',
      add: 'thêm vào',
      copy: 'Rõ',
      edit: 'soạn thảo',
      delete: 'xóa',
      invoke: 'gọiStencils',
      answer: 'đáp',
      recovery: 'phục',
      batchEdit: 'Sửa bó',
      batchDelete: 'Xóa bó',
      batchAnswer: 'Câu trả lời bó',
      deleteAnswerQuestion: 'Xoá câu trả lời',
      markRead: 'Đánh dấu như đọc',
      markAllRead: 'Đánh dấu tất cả như đọc'
    }
  },
  notify: {
    fail: 'hỏng',
    success: 'thành công',
    copySuccess: 'Chép thành công'
  },
  table: {
    loading: 'Đang xếp...'
  },
  contextmenu: {
    refresh: 'Cập nhật',
    close: 'đóng',
    closeAll: 'Đóng cái khác',
    closeOthers: 'Đóng tất cả',
    closeTranslate: 'Dịch tắt',
  },
  google: {
    title: 'Google Authenaticor',
    label: 'Hãy nhập mật mã kiểm tra.',
    btn: 'Xác nhận'
  },
  sound: {
    entry: 'Sắc bén',
    title: 'Sắc thay thế',
    current: 'Giọng hiện tại:',
    placeholder: 'Hãy chọn hiệu ứng âm thanh',
    audios: [
      "Hiệu ứng âm thanh",
      "Hiệu ứng âm thanh1",
      "Hiệu ứng âm thanh2",
      "Hiệu ứng âm thanh3",
      "Hiệu ứng âm thanh4",
      "Hiệu ứng âm thanh5",
      "Hiệu ứng âm thanh6"
    ]
  },
  "googleCheck": {
    "isgoogle": "Google secondary verification",
    "title": "Google Authenaticor",
    "btns": ["Bước lùi", "bước kế tiếp", "mở", "Rõ"],
    "step1": {
      "tips": "Làm ơn quét mã QR và cài đặt xác nhận Google. Nếu bạn đã cài đặt nó, hãy đến bước kế tiếp.",
      "action": "Tải xác nhận",
      "desc": "Tôi đã lắp tìm kiếm trên Google"
    },
    "step2": {
      "tips": "Hãy dùng hệ thống xác thực Google để quét mã QR bên dưới. Sau khi thành công, bạn sẽ có một mã hai số, mà thay đổi từng 9s.",
      "action": "Dò mã QR",
      "desc1": "Nếu máy quét mật mã thất bại, hãy nhập chìa khóa bên trên vào máy kiểm tra. Bạn cần phải đặt một tài khoản, ví dụ: xxx@DigFinex (điền vào tài khoản điện thoại/ email hay biệt danh của bạn ở XXX).",
      "desc2": "Tôi đã có mã kiểm tra gấp đôi số sáu."
    },
    "step3": {
      "label": "Mật khẩu hai lần",
      "placeholder": "Hãy nhập mã hai lần kiểm tra"
    }
  },
}
