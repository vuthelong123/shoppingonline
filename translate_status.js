const fs = require('fs');

function replaceFile(path, replacements) {
    if (fs.existsSync(path)) {
        let content = fs.readFileSync(path, 'utf8');
        replacements.forEach(r => {
            content = content.replace(r.search, r.replace);
        });
        fs.writeFileSync(path, content);
        console.log('Updated ' + path);
    }
}

// OrderComponent.js
replaceFile('client-admin/src/components/OrderComponent.js', [
    {
        search: /<span className="status-pending">{item\.status}<\/span>/g,
        replace: '<span className="status-pending">CHỜ DUYỆT</span>'
    },
    {
        search: /<span className="status-approved">{item\.status}<\/span>/g,
        replace: '<span className="status-approved">ĐÃ DUYỆT</span>'
    },
    {
        search: /<span className="status-cancelled">{item\.status}<\/span>/g,
        replace: '<span className="status-cancelled">ĐÃ HỦY</span>'
    }
]);

// CustomerComponent.js
replaceFile('client-admin/src/components/CustomerComponent.js', [
    {
        search: /<td>{item\.status}<\/td>/g,
        replace: "<td>{item.status === 'PENDING' ? 'CHỜ DUYỆT' : item.status === 'APPROVED' ? 'ĐÃ DUYỆT' : 'ĐÃ HỦY'}</td>"
    }
]);

// MyordersComponent.js
replaceFile('client-customer/src/components/MyordersComponent.js', [
    {
        search: /<span className="myorders-status">{item\.status}<\/span>/g,
        replace: "<span className=\"myorders-status\">{item.status === 'PENDING' ? 'CHỜ DUYỆT' : item.status === 'APPROVED' ? 'ĐÃ DUYỆT' : 'ĐÃ HỦY'}</span>"
    }
]);

// MycartComponent.js checkout button
replaceFile('client-customer/src/components/MycartComponent.js', [
    {
        search: /CHECKOUT/g,
        replace: 'ĐẶT HÀNG'
    }
]);

