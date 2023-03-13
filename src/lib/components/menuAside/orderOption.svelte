<script lang="ts">
  import Modal from '../common/modal.svelte';
  import { orders, modalActiveOptionOrder, orderErrors, auth, itemOption } from '$stores';
  import 'notyf/notyf.min.css';
  import { Notyf } from 'notyf';
  import 'notyf/notyf.min.css';
  const notyf = new Notyf({
    duration: 3000,
    position: {
      x: 'right',
      y: 'top',
    }
  });

  $: {
    $itemOption;
    shot;
    lightWeight;
    coffeType;
  };

  let shot = 0;
  let lightWeight = '200';
  let coffeType = '200'; // 100: 뜨거움, 200:아이스

  const onAddOption = async () => {
      $itemOption.shot = shot;
      $itemOption.light = lightWeight;
      $itemOption.coffeType = coffeType;

      //옵션 선택 로직
      orderErrors.resetErrors();
      orders.incrementOrder($itemOption, $auth);
      modalActiveOptionOrder.set(false);
      clearItemForm();
  }

  const onAddShot = () => {
    shot += 1;
    if(shot > 2){
      notyf.error('샷추가는 최대 2샷까지만 가능합니다');
      shot = 2;
    }
  }

  const onHandleLight = (light:string) => {
    lightWeight = light;
  }
  
  const onHandleCoffeType = (type:string) => {
    coffeType = type;
  }

  const clearItemForm = () => {
    shot = 0;
    lightWeight = '200';
    coffeType = '200';
    itemOption.resetForm();
  }
</script>

<Modal bind:modalActive={$modalActiveOptionOrder}>
  <h4 slot="modal-title" >옵션 선택</h4>
  <div class="modal-body" slot="modal-body">
    <div class="order-title-box d-flex flex-column justify-content-between ">
      <h4>음료 선택</h4>
      <div class="row g-2 pl-1 pr-3 pt-2 pb-4 list-bg-shadow">
        <div class="col mb-2">
          <div class="order-btn-box d-flex justify-content-start pt-2">
              <button class="btn card ct-shadow-sm menu-item-box mx-2" class:selected={coffeType==='100'} on:click={() => onHandleCoffeType('100')}>
                <img class="img-box" src="/images/hot-icon.png" alt="Mild" style="width: 100%; height:100%;">
                <div class="card-body">
                  <h6 class:selected={coffeType==='100'}>HOT</h6>
                </div>
              </button>
              <button class="btn card ct-shadow-sm menu-item-box mx-2" class:selected={coffeType==='200'} on:click={() => onHandleCoffeType('200')}>
                <img class="img-box" src="/images/cold-icon.png" alt="Medium" style="width: 100%; height:100%;">
                <div class="card-body">
                  <h6 class:selected={coffeType==='200'}>ICE</h6>
                </div>
              </button>
          </div>
        </div>
      </div>
      <h4>추가 선택 (기본2샷 {shot > 0 ? `+ ${shot}` : ''})</h4>
      <div class="row row-cols-3 g-2 pl-1 pr-3 pt-2 pb-4 list-bg-shadow">
        <div class="col mb-2">
          <div class="order-btn-box d-flex justify-content-start pt-2">
            <button class="btn card ct-shadow-sm menu-item-box" class:selected={shot > 0} on:click={onAddShot}>
              <img class="img-box" src="/images/espresso.jpg" alt="espresso" style="width: 100%; height:100%;">
              <div class="card-body">
                <h6 class:selected={shot > 0}>샷추가</h6>
              </div>
            </button>
          </div>
        </div>
      </div>
      <h4>농도 선택</h4>
      <div class="row g-2 pl-1 pr-3 pt-2 pb-4 list-bg-shadow">
        <div class="col mb-2">
          <div class="order-btn-box d-flex justify-content-start pt-2">
              <button class="btn card ct-shadow-sm menu-item-box mx-2" class:selected={lightWeight==='100'} on:click={() => onHandleLight('100')}>
                <img class="img-box" src="/images/option_mild.png" alt="Mild" style="width:8em; height:4em;">
                <div class="card-body">
                  <h6 class:selected={lightWeight==='100'}>연하게</h6>
                </div>
              </button>
              <button class="btn card ct-shadow-sm menu-item-box mx-2" class:selected={lightWeight==='200'} on:click={() => onHandleLight('200')}>
                <img class="img-box" src="/images/option_medium.png" alt="Medium" style="width:8em; height:4em;">
                <div class="card-body">
                  <h6 class:selected={lightWeight==='200'}>보통</h6>
                </div>
              </button>
              <button class="btn card ct-shadow-sm menu-item-box mx-2" class:selected={lightWeight==='300'} on:click={() => onHandleLight('300')}>
                <img class="img-box" src="/images/option_dark.png" alt="Dark" style="width:8em; height:4em;">
                <div class="card-body">
                  <h6 class:selected={lightWeight==='300'}>진하게</h6>
                </div>
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-footer" slot="modal-footer" >
    <button class="btn btn-primary" on:click={onAddOption} >주문담기</button>
  </div>
</Modal>

<style>
  .menu-item-box { 
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .selected {
    border-color: rgb(243, 76, 76);
    border-width: 0.35em;
    border-radius: 1em;
    font-size: 1.1em;
  }

  .btn {
    outline: none;
    text-decoration: none;
    -webkit-tap-highlight-color : rgba(0,0,0,0);
  }

  .btn:focus {
    outline: none;
    text-decoration: none;
    -webkit-tap-highlight-color : rgba(0,0,0,0);
  }

  button:focus {
      outline: none;
  }
</style>
