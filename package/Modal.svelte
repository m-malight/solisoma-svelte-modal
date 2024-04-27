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
  class={`solisoma-modal-h-screen solisoma-modal-w-screen ${visible ? "solisoma-modal-block" : "solisoma-modal-hidden"} solisoma-modal-right-0 solisoma-modal-bottom-0 solisoma-modal-top-0 solisoma-modal-left-0 solisoma-modal-bg-black solisoma-modal-bg-opacity-40 solisoma-modal-fixed solisoma-modal-flex solisoma-modal-flex-col solisoma-modal-items-center`}
>
  <div class="solisoma-modal-relative solisoma-modal-top-[10vh]">
    {#if !btn_in_box}
      <button
        class={`solisoma-modal-absolute solisoma-modal-right-3 solisoma-modal-w-8 solisoma-modal-bg-white ${btn_style}`}
        on:click={() => closeModal()}
      >
        <MdClose />
      </button>
    {/if}
    <div
      class={`solisoma-modal-relative ${btn_in_box && "solisoma-modal-flex solisoma-modal-flex-col solisoma-modal-gap-4"} solisoma-modal-w-screen solisoma-modal-h-[75vh] solisoma-modal-top-9 solisoma-modal-py-1 solisoma-modal-px-2 solisoma-modal-overflow-hidden solisoma-modal-bg-white solisoma-modal-border-2 solisoma-modal-border-gray-300 solisoma-modal-md:rounded-lg solisoma-modal-md:w-[70vw] ${classNames}`}
    >
      {#if btn_in_box}
        <div class="solisoma-modal-flex solisoma-modal-justify-end">
          <button
            class={`solisoma-modal-w-8 ${btn_style}`}
            on:click={() => closeModal()}
          >
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
