const fs = require('fs');

const files = [
  {
    path: 'client-admin/src/components/ProductDetailComponent.js',
    replacements: [
      { search: 'value="ADD NEW"', replace: 'value="THÊM MỚI"' },
      { search: 'value="UPDATE"', replace: 'value="CẬP NHẬT"' },
      { search: 'value="DELETE"', replace: 'value="XÓA"' }
    ]
  },
  {
    path: 'client-admin/src/components/CategoryDetailComponent.js',
    replacements: [
      { search: 'value="ADD NEW"', replace: 'value="THÊM MỚI"' },
      { search: 'value="UPDATE"', replace: 'value="CẬP NHẬT"' },
      { search: 'value="DELETE"', replace: 'value="XÓA"' }
    ]
  },
  {
    path: 'client-admin/src/components/LoginComponent.js',
    replacements: [
      { search: '>ADMIN LOGIN<', replace: '>ĐĂNG NHẬP QUẢN TRỊ<' },
      { search: '>Username<', replace: '>Tên đăng nhập<' },
      { search: '>Password<', replace: '>Mật khẩu<' },
      { search: 'value="LOGIN"', replace: 'value="ĐĂNG NHẬP"' }
    ]
  },
  {
    path: 'client-customer/src/components/MyprofileComponent.js',
    replacements: [
      { search: '>MY PROFILE<', replace: '>HỒ SƠ CỦA TÔI<' },
      { search: '>Username<', replace: '>Tên đăng nhập<' },
      { search: '>Password<', replace: '>Mật khẩu<' },
      { search: '>Name<', replace: '>Họ và tên<' },
      { search: '>Phone<', replace: '>Số điện thoại<' },
      { search: '>Email<', replace: '>Email<' },
      { search: 'value="UPDATE"', replace: 'value="CẬP NHẬT"' }
    ]
  }
];

files.forEach(f => {
  if (fs.existsSync(f.path)) {
    let content = fs.readFileSync(f.path, 'utf8');
    f.replacements.forEach(r => {
      content = content.split(r.search).join(r.replace);
    });
    fs.writeFileSync(f.path, content);
    console.log('Updated ' + f.path);
  } else {
    console.log('Not found ' + f.path);
  }
});
