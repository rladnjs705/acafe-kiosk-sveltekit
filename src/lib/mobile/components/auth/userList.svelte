<script lang="ts">
    import { goto } from "$app/navigation";
  import { auth } from "$stores";
  import { ADMIN, USER } from "$utils/constans.js";
  import axios from "axios";
    import { onMount } from "svelte";

  let users:any;
  $:data = users;
  onMount(async () => {
    try {
      const response = await axios.get("/api/admin/users");
      users = response.data.data;
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  });

  const updateUserRole = async (id:Number, role:String) => {
    let newRole;
    if(role === ADMIN) {
      newRole = USER;
    } else {
      newRole = ADMIN;
    }
    
    let params = {
      id : id,
      role : newRole
    }

    console.log(params)
    const response = await axios.put("/api/admin/userAuth/update",params);
    console.log(response.data.data.user)
    const index = users.list.findIndex((i:any)=> i.id === response.data.data.user.id);
    users.list = [
      ...users.list.slice(0, index),
      response.data.data.user,
      ...users.list.slice(index+1)
    ];
    console.log(users.list);
  }

  const verifyChecked = (role:String) => {
    if(role === ADMIN) {
      return true;
    } else {
      return false;
    }
  }

  const verifyUser = (userId:any) => {
    if($auth._id === userId){
      return true;
    }else{
      false;
    }
  }

  const goHome = () => goto('/menu');
</script>

<!-- user list start-->
<div class="row d-flex justify-content-center align-items-center content-auth">
  <div class="auth-box">
    <div class="card auth">
      <div class="card-header">
        <h4>로그인</h4>
      </div>
      <div class="card-body">
        <table class="table user-table ">
          <thead>
            <tr>
              <td>이메일</td>
              <td class="text-center">관리권한</td>
              <td class="text-center">관리수정</td>
            </tr>
          </thead>
          <tbody>
            {#if data}
              {#each data.list as user (user.id)}
              <tr>
                <td>{user.email}</td>
                <td class="text-center">{user.role}</td>
                <td class="text-center">
                  <input type="checkbox" 
                    disabled={verifyUser(user.id)}
                    checked={verifyChecked(user.role)} 
                    on:click={() => updateUserRole(user.id, user.role)}/>
                </td>
              </tr>
              {/each}
            {:else}
                <tr>
                  <td colspan="3">
                    <p>Loading</p>
                  </td>
                </tr>
                
            {/if}                            
          </tbody>
        </table>
      </div>
      <div class="card-bottom d-flex flex-column">
        <button class="btn btn-primary pt-3 pb-3 mb-3" on:click={goHome}>확인</button>
      </div>
    </div>
  </div>
</div>
<!-- user list end -->