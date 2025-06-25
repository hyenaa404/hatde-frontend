const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const bankAccountRegex = /^[0-9]{8,16}$/;
export function checkPhone(phone) {
  if (!phoneRegex.test(phone)) {
    alert("Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam hợp lệ.");
    return false;
  }
  return true;
}
export function checkPassword(password) {
    if (!passwordRegex.test(password)) {
    alert("❌ Mật khẩu yếu. Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.");
    return false;
  }
  return true;
}
export function checkMst(mst) {
  if (!bankAccountRegex.test(mst)) {
    alert("❌ Mã số doanh nghiệp không hợp lệ. Vui lòng nhập từ 8 đến 16 chữ số.");
    return false;
  }
  return true;
}
export function checkStk(stk) {
  if (!bankAccountRegex.test(stk)) {
    alert("❌ Số tài khoản không hợp lệ. Vui lòng nhập từ 8 đến 16 chữ số.");
    return false;
  }
  return true;
}
export function CheckEmail(email) {
   if (!emailRegex.test(email)) {
    alert("❌ Email không hợp lệ. Vui lòng nhập đúng định dạng email.");
    return false;
  }
  return true;
}