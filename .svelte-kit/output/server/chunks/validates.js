import * as yup from "yup";
yup.setLocale({
  number: {
    min: "메뉴는 ${min}개 이상 선택해야 합니다. "
  }
});
yup.object().shape({
  itemName: yup.string().required("제품명을 입력해 주세요."),
  categoryId: yup.string().required("카테고리를 선택해 주세요."),
  itemPrice: yup.number().typeError("가격은 숫자로 입력해야 합니다.").required(),
  itemImage: yup.string().required("이미지를 선택해 주세요.")
});
yup.object().shape({
  categoryName: yup.string().required("카테고리 이름을 입력해 주세요.")
});
yup.object().shape({
  userEmail: yup.string().required("이메일을 입력해 주세요.").email("이메일 형식이 잘 못 되었습니다. "),
  password: yup.string().required("패스워드를 입력해 주세요.")
});
yup.object().shape({
  email: yup.string().required("이메일을 입력해 주세요.").email("이메일 형식이 잘 못 되었습니다. "),
  pwd: yup.string().required("비밀번호를 입력해 주세요."),
  pwdConfirm: yup.string().required("비밀본호 확인을 입력해 주세요.").oneOf([yup.ref("pwd"), null], "패스워드와 패스워드 확인이 일치하지 않습니다.").label("패스워드확인")
});
yup.object().shape({
  orderCount: yup.number().min(1).required("상품을 하나 이상 선택해야 합니다. ")
});
