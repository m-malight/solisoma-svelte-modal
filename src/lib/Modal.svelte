<script>
  import MdClose from 'svelte-icons/md/MdClose.svelte'
  export let modalVisible = false;
  export let useHtml = false;
  export let setHtml = "<div></div>";
  export let callbackFn;
  export let modalInitialStates = {};
  export let classNames = "";
  export let component = null;
  
  let modalStates = {...modalInitialStates};
  const modalSetStates = (newState) => modalStates = {...newState};
  async function modalClose(){
    if(callbackFn) await callbackFn(modalStates);
    modalStates = {...modalInitialStates};
    modalVisible = false;
  }
</script>

<main class={`h-[100vh] w-[100vw] ${modalVisible ? "block" : "hidden"} right-0 bottom-0 top-0 left-0 bg-black bg-opacity-40 absolute flex flex-col items-center`}>
  <div class="relative top-[10vh]">
    <button class="absolute right-3 w-8" on:click={()=> modalClose()}><MdClose /></button>
    <div class={`relative w-screen h-[75vh] top-9 py-1 px-2 overflow-hidden bg-white border-2 border-gray-300 md:rounded-lg md:w-[70vw] ${classNames}`}>
      {#if useHtml}
        {@html setHtml}
      {:else if component}
        <svelte:component this={component} {modalStates} {modalSetStates} {modalClose} />
      {:else}
        <slot {modalStates} {modalSetStates} {modalClose} />
      {/if}
    </div>
  </div>
</main>