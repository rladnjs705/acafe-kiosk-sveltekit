<script lang="ts">
  import { goto } from '$app/navigation';
  import { authToken } from '$stores';
  import { extractErrors, loginValidateSchema } from '$utils/validates.js';
  import Swal from 'sweetalert2';

let formValues = {
  userEmail: '',
  password: ''
}

let errors:any = {}

const onEnterLogin = (e:any) => {
    const keyCode = e.keyCode;

    if(keyCode === 13) {
      onSubmitLogin();
    }
  }

async function onSubmitLogin() {
  try {
    await loginValidateSchema.validate(formValues, {abortEarly: false});
    onLogin();
  }
  catch(error) {
    errors = extractErrors(error);
  }
}

async function onLogin () {
  try {
      const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        //"accept": "application/json",
        //'Content-Type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
        body: "userEmail="+formValues.userEmail+"&password="+formValues.password,
      });

      if (response.ok) {
        const result = await response.json();
        authToken.saveAuthToken(result.data);
        goto("mobile/menu");
      } else {
        const result = await response.json();
        console.log(result.data.error);
        Swal.fire({
          icon: 'error',
          text: result.data.error
        });
      }

    } catch (error) {
      console.log(error);
      await Swal.fire({
        icon: 'error',
        text: "에러입니다"
      });
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
        <div class="card-body">
        <div class="mb-3 input-box">
          <label for="userEmail" class="form-label">아이디</label>
          <input id="userEmail" name="userEmail" type="email" class="form-control" placeholder="name@example.com" bind:value={formValues.userEmail} class:inputError={errors.userEmail} required>
          {#if errors.userEmail}
            <span class="invalid-feedback was-validated">{errors.userEmail}</span>
          {/if}
        </div>
        <div class="mb-3">
          <div class="d-flex justify-content-between">
          <label for="password" class="form-label">패스워드</label>
          </div>
          <input id="password" name="password" type="password" class="form-control" placeholder="Password" bind:value={formValues.password} class:inputError={errors.userEmail} on:keydown={onEnterLogin} required>
          {#if errors.password}
            <span class="invalid-feedback was-validated">{errors.password}</span>
          {/if}         
        </div>
        </div>
        <div class="card-bottom d-flex flex-column">
               <button class="btn btn-primary pt-3 pb-3 mb-3" type="button" on:click={onSubmitLogin}>로그인</button>
        <!-- <button class="btn btn-primary pt-3 pb-3 mb-3" type="submit">로그인</button> -->
        <p class="align-self-end"><span><a href="mobile/user/join">[회원가입]</a></span></p>
        </div>
      </div>
    </div>
    </div>
    <!-- login form end -->
  </div>
  </div>
</section>
