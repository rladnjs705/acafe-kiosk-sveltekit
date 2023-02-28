<script lang="ts">
  import ItemLoading from './itemLoading.svelte';
  import Item from './item.svelte';
  import { modalActiveItem, itemList, itemPage, itemPageLock, itemFormMode, itemCategorySelected, itemSearch, isAdmin, itemMainLoading } from '$stores';
  import axios from 'axios';

  let component:any;
  let elementScroll:any;
  let data:any;

  itemList.getItemList(0);
  $: data = $itemList; 

  const onOpenModalItemForm = () => {
    modalActiveItem.openModal();
    itemFormMode.onAddMode();
  }

  const onScroll = (e:any) => { //스크롤 이벤트 처리
    const scrollHeight = e.target.scrollHeight;
    const clientHeight = e.target.clientHeight;
    const scrollTop = e.target.scrollTop;
    const realHeight = scrollHeight - clientHeight;
    const triggerHeight = realHeight * 0.7;

    const triggerComputed = () => scrollTop > triggerHeight;
    const scrollTrigger = () => triggerComputed() && !$itemPageLock;
    const countCheck = () => $itemList.totalPage <= $itemPage.pageNumber

    if(countCheck()) {
      itemPageLock.set(true);
    }

    if(scrollTrigger()) {
      console.log('next')
      itemPage.nextPage();
      getItemList($itemPage.pageNumber);
    }
  }

  async function getItemList(page:number){
    let params = {
        page: page,
        size: 15,
        itemName: $itemSearch,
        categoryId: $itemCategorySelected,
      }
    const response = await axios.get("/api/user/items", {params});
    itemList.update(items => {
      items.list = [...items.list, ...response.data.data.list]
      return items;
    });
    itemMainLoading.set(false);
    itemPageLock.set(false);
  }

  $: {
    //onScroll 이벤트를 돔에 연동
    //스크롤 액션 인식
    if(component || elementScroll) {
      const element = elementScroll ? elementScroll : component.parentNode;

      element.addEventListener('scroll', onScroll);
      element.addEventListener('resize', onScroll);
    }
    itemMainLoading.set(false);
  }
</script>

<!-- itemList start -->
<div class="row row-cols-4 g-4 pl-3 pr-3 pt-2 pb-4 list-bg-shadow" bind:this={component}>
  {#if $isAdmin}
  <div class="col mb-2">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span class="btn-add-modal-show" on:click={onOpenModalItemForm} >
      <div class="card menu-add-box h-100 d-flex justify-content-center align-items-center">
        <i class='bx bx-plus bx-md' ></i>
      </div>
    </span>
  </div>        
  {/if}                
  {#if data}
    {#each data.list as item (item.itemId)}
      <Item item={item} />
    {/each}
    {:else}
      {#if $itemMainLoading}
      <!-- Loading-box start-->
        <ItemLoading />
      {/if}
      <!-- Loading-box end-->
  {/if}
</div>
<!-- itemList end -->