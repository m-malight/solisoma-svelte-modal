<script>
  import MdClose from "svelte-icons/md/MdClose.svelte";
  import "./app.css";
  export let visible = false;
  export let useHtml = false;
  export let setHtml = "<div></div>";
  export let onClose;
  export let initialState = {};
  export let classNames = "";
  export let component = null;
  export let btn_in_box = false;
  export let btn_style = "";

  let modalStates = { ...initialState };
  const setModalState = (newState) => (modalStates = { ...newState });
  async function closeModal() {
    if (onClose) await onClose(modalStates);
    modalStates = { ...initialState };
    visible = false;
  }
</script>

<main
  class={`h-screen w-screen ${visible ? "block" : "hidden"} right-0 bottom-0 top-0 left-0 bg-black bg-opacity-40 fixed flex flex-col items-center`}
>
  <div class="relative top-[10vh]">
    {#if !btn_in_box}
      <button
        class={`absolute right-3 w-8 bg-white ${btn_style}`}
        on:click={() => closeModal()}
      >
        <MdClose />
      </button>
    {/if}
    <div
      class={`relative ${btn_in_box && "flex flex-col gap-4"} w-screen h-[75vh] top-9 py-1 px-2 overflow-hidden bg-white border-2 border-gray-300 md:rounded-lg md:w-[70vw] ${classNames}`}
    >
      {#if btn_in_box}
        <div class="flex justify-end">
          <button class={`w-8 ${btn_style}`} on:click={() => closeModal()}>
            <MdClose />
          </button>
        </div>
      {/if}
      <div>
        {#if useHtml}
          {@html setHtml}
        {:else if component}
          <svelte:component
            this={component}
            {modalStates}
            {setModalState}
            {closeModal}
          />
        {:else}
          <slot {modalStates} {setModalState} {closeModal} />
        {/if}
      </div>
    </div>
  </div>
</main>
