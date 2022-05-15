import React from "react";

export default function Product() {
  return (
    <div className="grid grid-cols-2">
      <div className="">
        <img src="/NETFLIX1406.png" />
      </div>
      <div className="">
        <p>Tài khoản Netflix Premium for 1 User (1 Tháng)</p>
        <p>Tình trạng: Còn hàng</p>
        <p>Thể loại: App, Giải trí, Xem phim</p>
        <p>79.000đ</p>
        <p>179.000đ</p>
        <p>Thời hạn sử dụng</p>
        <button>1 Tháng</button>
        <button>3 Tháng</button>
        <button>6 Tháng</button>
        <button>1 ngày</button>
        <button>1 tuần</button>
      </div>
    </div>
  );
}
