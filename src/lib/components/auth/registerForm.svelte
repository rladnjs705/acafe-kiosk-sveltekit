<script lang="ts">
  import { goto } from '$app/navigation';
  import { extractErrors, registerValidateSchema } from '$utils/validates';
  import Swal from 'sweetalert2';


  let formValues = {
    email: '',
    pwd: '',
    pwdConfirm: '',
    userName : '',
    nickName : '',
  }

  let errors:any = {};

  const onSubmitRegister = async () => {
    try {
      await registerValidateSchema.validate(formValues, {abortEarly: false});
      onRegister();
      errors = {};
    }
    catch(error) {
      errors = extractErrors(error);
    }
  }

  const onRegister = async () => {
    try {
      const response = await fetch('/api/user/create', {
        method: 'POST',
        headers: {"accept": "application/json",'Content-Type': 'application/json',},
        body: JSON.stringify(formValues),
      });
      const data = await response.json();
      
      if(data.resultCode === 0){
        Swal.fire({
          icon: 'success',
          text: '회원 가입이 완료되었습니다. 로그인 해주세요.'
        });
        goto('/user/login');
      }else{
        Swal.fire({
          icon: 'error',
          text: data.resultMsg
        });
      }
      
    }
    catch(error) {
      console.error(error);
      //console.assert(error);
    }
  }
</script>

<!-- register from start-->
<div class="row d-flex justify-content-center align-items-center content-auth">
  <div class="auth-box">
    <div class="card auth">
      <div class="card-header">
        <h4>회원가입</h4>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="idTextInput" class="form-label">아이디</label>
          <input type="text" class="form-control" bind:value={formValues.email} class:inputError={errors.email}> 
          {#if errors.email}
            <span class="invalid-feedback was-validated">{errors.email}</span>
          {/if}          
        </div>
        <div class="mb-3">
          <label for="userName" class="form-label">이름</label>
          <input type="text" class="form-control" bind:value={formValues.userName} class:inputError={errors.userName}> 
          {#if errors.userName}
            <span class="invalid-feedback was-validated">{errors.userName}</span>
          {/if}          
        </div>
        <div class="mb-3">
          <label for="nickName" class="form-label">닉네임</label>
          <input type="text" class="form-control" bind:value={formValues.nickName} class:inputError={errors.nickName}> 
          {#if errors.nickName}
            <span class="invalid-feedback was-validated">{errors.nickName}</span>
          {/if}          
        </div>
        <div class="mb-3">
          <label for="pwdTextInput" class="form-label">패스워드</label>
          <input type="password" class="form-control" bind:value={formValues.pwd} class:inputError={errors.pwd}> 
          {#if errors.pwd}
            <span class="invalid-feedback was-validated">{errors.pwd}</span>
          {/if}          
        </div>            
        <div class="mb-3">
          <label for="pwdTextInputAgain" class="form-label">패스워드 확인</label>
          <input type="password" class="form-control" bind:value={formValues.pwdConfirm} class:inputError={errors.pwdConfirm}> 
          {#if errors.pwdConfirm}
            <span class="invalid-feedback was-validated">{errors.pwdConfirm}</span>
          {/if}          
        </div>                        
      </div>
      <div class="card-bottom d-flex flex-column">
        <button class="btn btn-primary pt-3 pb-3 mb-3" on:click={onSubmitRegister}>가입하기</button>
        <p class="align-self-end">이미 회원가입되어 있습니다. <span><a href="/user/login">[로그인]</a></span></p>
      </div>
    </div>
  </div>
</div>
<!-- register from end-->