<script lang="ts">
  import { itemSearch, itemPage, itemList, itemPageLock, itemMainLoading } from "$stores";

  let itemSearchForm:any;

  const onSearch = (e:any) => {
    const keyCode = e.keyCode;

    if(keyCode === 13) {
      itemMainLoading.set(true);
      itemSearch.set(itemSearchForm);
      itemList.getItemList($itemPage, $itemSearch);
      itemPage.resetPage();
      itemPageLock.set(false);
    }
  }
</script>

<!-- search start-->
<div class="header-box-top d-flex " >
  <h1>아카페</h1>
  <input type="text" class="form-control txt-search-menu border-line" placeholder="원하는 메뉴 이름을 입력해주세요." bind:value={itemSearchForm} on:keydown={onSearch}>
</div>
<!-- search end-->