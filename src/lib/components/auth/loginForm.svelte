<script>
  import { goto } from '$app/navigation';
  import { authToken } from '$stores';
  import { extractErrors, loginValidateSchema } from '$utils/validates.js';

//const loginWithPassword = mutation(LOGIN_WITH_PASSWORD);

let formValues = {
  email: '',
  pwd: ''
}

const loginWithPassword = {variables: formValues};

let errors = {}

const onSubmitLogin = async () => {
  try {
  await loginValidateSchema.validate(formValues, {abortEarly: false});
  onLogin();
  }
  catch(error) {
  errors = await extractErrors(error);
  }
}

const onLogin = async () => {
  try {
      const result = {};
  // const result = await loginWithPassword({variables: formValues});
  //authToken.saveAuthToken(result);
  goto('/');
  }
  catch(error) {
  //console.log(error.message)
      console.log(error)
  }
}

</script>

<section>
<div>
  <div class="app d-flex container-fluid ">
    <!-- login form start -->
    <div class="row d-flex justify-content-center align-items-center content-auth">
    <div class="auth-box">
      <div class="card auth">
      <div class="card-header">
        <h4>로그인</h4>
      </div>
      <form method="post" action="/user/login">
        <div class="card-body">
        <div class="mb-3 input-box">
          <label for="userEmail" class="form-label">아이디</label>
          <input id="userEmail" name="userEmail" type="email" class="form-control" placeholder="name@example.com" required>
        </div>
        <div class="mb-3">
          <div class="d-flex justify-content-between">
          <label for="password" class="form-label">패스워드</label>
          </div>
          <input id="password" name="password" type="password" class="form-control" placeholder="Password" required>
        </div>
        </div>
        <div class="card-bottom d-flex flex-column">
               <button class="btn btn-primary pt-3 pb-3 mb-3" type="button" on:click={onSubmitLogin}>로그인</button>
        <!-- <button class="btn btn-primary pt-3 pb-3 mb-3" type="submit">로그인</button> -->
        <p class="align-self-end"><span><a href="/user/join">[회원가입]</a></span></p>
        </div>
      </form>
      </div>
    </div>
    </div>
    <!-- login form end -->
  </div>
  </div>
</section>
