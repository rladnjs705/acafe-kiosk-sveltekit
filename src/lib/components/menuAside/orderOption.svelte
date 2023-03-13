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

  $:$itemOption;

  console.log($itemOption)
  console.log($itemOption.coffeeType)

  const onAddOption = async () => {
      
      //옵션 선택 로직
      orderErrors.resetErrors();
      orders.incrementOrder($itemOption, $auth);
      modalActiveOptionOrder.set(false);
      clearItemForm();
  }

  const onAddShot = () => {
    $itemOption.shot += 1;
    if($itemOption.shot > 2){
      notyf.error('샷추가는 최대 2샷까지만 가능합니다');
      $itemOption.shot = 2;
    }
  }

  const onHandleLight = (light:string) => {
    $itemOption.light = light;
  }
  
  const onHandleCoffeeType = (type:string) => {
    $itemOption.coffeeType = type;
  }

  const clearItemForm = () => {
    $itemOption.shot = 0;
    $itemOption.light = '200';
    $itemOption.coffeeType = '200';
    itemOption.resetForm();
  }
</script>

<Modal bind:modalActive={$modalActiveOptionOrder}>
  <h4 slot="modal-title" >옵션 선택</h4>
  <div class="modal-body" slot="modal-body">
    <div class="order-title-box d-flex flex-column justify-content-around ">
      <h4>음료 선택</h4>
      <div class="row g-2 pl-1 pr-3 pt-2 pb-4 list-bg-shadow">
        <div class="col mb-2">
          <div class="order-btn-box d-flex justify-content-start pt-2">
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-missing-attribute -->
              <a class="btn card ct-shadow-sm menu-item-box mx-2" class:selected={$itemOption.coffeeType==='100'} on:click={() => onHandleCoffeeType('100')}>
                <img class="img-box" src="/images/hot-icon.png" alt="HOT" style="width:6em; height:6em;">
                <div class="card-body">
                  <h6 class:selected={$itemOption.coffeeType === '100'}>HOT</h6>
                </div>
              </a>
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-missing-attribute -->
              <a class="btn card ct-shadow-sm menu-item-box mx-2" class:selected={$itemOption.coffeeType==='200'} on:click={() => onHandleCoffeeType('200')}>
                <img class="img-box" src="/images/cold-icon.png" alt="ICE" style="width:6em; height:6em;">
                <div class="card-body">
                  <h6 class:selected={$itemOption.coffeeType === '200'}>ICE</h6>
                </div>
              </a>
          </div>
        </div>
      </div>
      <h4>추가 선택 (기본2샷 {$itemOption.shot > 0 ? `+ ${$itemOption.shot}` : ''})</h4>
      <div class="row row-cols-3 g-2 pl-1 pr-3 pt-2 pb-4 list-bg-shadow">
        <div class="col mb-2">
          <div class="order-btn-box d-flex justify-content-start pt-2">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-missing-attribute -->
            <a class="btn card ct-shadow-sm menu-item-box" class:selected={$itemOption.shot > 0} on:click={onAddShot}>
              <img class="img-box" src="/images/espresso.jpg" alt="espresso" style="width: 100%; height:100%;">
              <div class="card-body">
                <h6 class:selected={$itemOption.shot > 0}>샷추가</h6>
              </div>
            </a>
          </div>
        </div>
      </div>
      <h4>농도 선택</h4>
      <div class="row g-2 pl-1 pr-3 pt-2 pb-4 list-bg-shadow">
        <div class="col mb-2">
          <div class="order-btn-box d-flex justify-content-start pt-2">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-missing-attribute -->
              <a class="btn card ct-shadow-sm menu-item-box mx-2" class:selected={$itemOption.light==='100'} on:click={() => onHandleLight('100')}>
                <img class="img-box" src="/images/option_mild.png" alt="Mild" style="width:8em; height:4em;">
                <div class="card-body">
                  <h6 class:selected={$itemOption.light==='100'}>연하게</h6>
                </div>
              </a>
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-missing-attribute -->
              <a class="btn card ct-shadow-sm menu-item-box mx-2" class:selected={$itemOption.light==='200'} on:click={() => onHandleLight('200')}>
                <img class="img-box" src="/images/option_medium.png" alt="Medium" style="width:8em; height:4em;">
                <div class="card-body">
                  <h6 class:selected={$itemOption.light==='200'}>보통</h6>
                </div>
              </a>
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-missing-attribute -->
              <a class="btn card ct-shadow-sm menu-item-box mx-2" class:selected={$itemOption.light==='300'} on:click={() => onHandleLight('300')}>
                <img class="img-box" src="/images/option_dark.png" alt="Dark" style="width:8em; height:4em;">
                <div class="card-body">
                  <h6 class:selected={$itemOption.light==='300'}>진하게</h6>
                </div>
              </a>
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
