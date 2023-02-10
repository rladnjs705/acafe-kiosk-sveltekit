<script lang="ts">
  import ItemLoading from './itemLoading.svelte';
  import Item from './item.svelte';
  import { modalActiveItem, itemList, itemPage, itemPageLock } from '$stores';

  let component;
  let elementScroll;

  itemList.getItemList();
  $: data = $itemList;

  const onOpenModalItemForm = () => {
    modalActiveItem.openModal();
  }

  const onScroll = (e:any) => { //스크롤 이벤트 처리
    const scrollHeight = e.target.scrollHeight;
    const clientHeight = e.target.clientHeight;
    const scrollTop = e.target.scrollTop;
    const realHeight = scrollHeight - clientHeight;
    const triggerHeight = realHeight * 0.7;

    const triggerComputed = () => scrollTop > triggerHeight;
    const scrollTrigger = () => triggerComputed() && !$itemPageLock;
    const countCheck = () => data.itemPageCount <= $itemPage.pageNumber

    if(countCheck()) {
      itemPageLock.set(true);
    }

    if(scrollTrigger()) {
      console.log('next')
      itemPage.nextPage();
    }
  }

  // $: {
  //   if(component || elementScroll) {
  //     const element = elementScroll ? elementScroll : component.parentNode;

  //     element.addEventListener('scroll', onScroll);
  //     element.addEventListener('resize', onScroll);
  //   }

  //   //아이템 다음 페이지
  //   // items.fetchMore({
  //   //   variables: {
  //   //     pageNumber: $itemPage.pageNumber,
  //   //     itemCategoryId: $itemCategorySelected,
  //   //     search: $itemSearch,
  //   //   },
  //   // }).then((result) => {
  //   //   itemPageLock.set(false);
  //   //   itemMainLoading.set(false);
  //   //   itemPageLoading.set(false);
  //   // });
  // }
</script>

<!-- itemList start -->
<div class="row row-cols-4 g-4 pl-3 pr-3 pt-2 pb-4 list-bg-shadow" bind:this={component}>
  <div class="col mb-2">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span class="btn-add-modal-show" on:click={onOpenModalItemForm} >
      <div class="card menu-add-box h-100 d-flex justify-content-center align-items-center">
        <i class='bx bx-plus bx-md' ></i>
      </div>
    </span>
  </div>                        
  {#if data}
    {#each data.list as item (item.itemId)}
      <Item item={item} />
    {/each}
    {:else}
      <!-- Loading-box start-->
      <ItemLoading />
      <!-- Loading-box end-->
  {/if}
</div>
<!-- itemList end -->