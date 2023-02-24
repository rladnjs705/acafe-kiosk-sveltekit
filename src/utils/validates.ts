import * as yup from 'yup';

yup.setLocale({
  number: {
    min: '메뉴는 ${min}개 이상 선택해야 합니다. '
  }
});

export const extractErrors = (error:any) => {
  return error.inner.reduce((acc:any, error:any) => {
    return {...acc, [error.path]: error.message}
  }, {});
}

export const itemValidateSchema = yup.object().shape({
  itemName: yup.string().required('제품명을 입력해 주세요.'),
  categoryId: yup.string().required('카테고리를 선택해 주세요.'),
  itemPrice: yup.number().typeError('가격은 숫자로 입력해야 합니다.').required(),
  itemImage: yup.string().required('이미지를 선택해 주세요.'),
});

export const categoryValidateSchema = yup.object().shape({
  categoryName: yup.string().required('카테고리 이름을 입력해 주세요.')
});

export const loginValidateSchema = yup.object().shape({
  userEmail: yup.string().required('이메일을 입력해 주세요.').email('이메일 형식이 잘 못 되었습니다. '),
  password: yup.string().required('패스워드를 입력해 주세요.'),
});

export const registerValidateSchema = yup.object().shape({
  email: yup.string().required('이메일을 입력해 주세요.').email('이메일 형식이 잘 못 되었습니다. '),
  pwd: yup.string()
    .required('비밀번호를 입력해 주세요.')
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .max(20, '비밀번호는 최대 20자 이하이어야 합니다.')
    .matches(/^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, '비밀번호는 특수문자를 최소 1개 이상 포함해야 합니다.'),
  pwdConfirm: yup.string().required('비밀본호 확인을 입력해 주세요.')
    .oneOf([yup.ref('pwd'), null], '패스워드와 패스워드 확인이 일치하지 않습니다.' ).label('패스워드확인'),
  userName: yup.string()
    .required('성함을 입력해 주세요.')
    .min(2, '이름은 최소 2자 이상이어야 합니다.')
    .max(10, '이름은 최대 10자 이하여야 합니다.')
    .matches(/^[가-힣]{2,10}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/, '이름 형식이 올바르지 않습니다.'),
  nickName: yup.string()
    .required('닉네임을 입력해 주세요.')
    .min(2, '닉네임은 최소 2자 이상이어야 합니다.')
    .max(10, '닉네임은 최대 10자 이하여야 합니다.')
    .matches(/^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/, '2~10자의 영문, 숫자, 한글 자모음으로 이루어진 닉네임을 입력해주세요.')
});

export const orderValidateSchema = yup.object().shape({
  orderCount: yup.number().min(1).required('상품을 하나 이상 선택해야 합니다. '),
});