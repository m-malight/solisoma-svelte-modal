<script>
  import MdClose from "svelte-icons/md/MdClose.svelte";
  import "./app.css";
  export let modalVisible = false;
  export let useHtml = false;
  export let setHtml = "<div></div>";
  export let callbackFn;
  export let modalInitialStates = {};
  export let classNames = "";
  export let component = null;

  let modalStates = { ...modalInitialStates };
  const modalSetStates = (newState) => (modalStates = { ...newState });
  async function modalClose() {
    if (callbackFn) await callbackFn(modalStates);
    modalStates = { ...modalInitialStates };
    modalVisible = false;
  }
</script>

<main
  class={`solisoma-modal-h-[100vh] solisoma-modal-w-[100vw] ${modalVisible ? "solisoma-modal-block" : "solisoma-modal-hidden"} solisoma-modal-right-0 solisoma-modal-bottom-0 solisoma-modal-top-0 solisoma-modal-left-0 solisoma-modal-bg-black solisoma-modal-bg-opacity-40 solisoma-modal-absolute solisoma-modal-flex solisoma-modal-flex-col solisoma-modal-items-center`}
>
  <div class="solisoma-modal-relative solisoma-modal-top-[10vh]">
    <button
      class="solisoma-modal-absolute solisoma-modal-right-3 solisoma-modal-w-8"
      on:click={() => modalClose()}><MdClose /></button
    >
    <div
      class={`solisoma-modal-relative solisoma-modal-w-screen solisoma-modal-h-[75vh] solisoma-modal-top-9 solisoma-modal-py-1 solisoma-modal-px-2 solisoma-modal-overflow-hidden solisoma-modal-bg-white solisoma-modal-border-2 solisoma-modal-border-gray-300 solisoma-modal-md:rounded-lg solisoma-modal-md:w-[70vw] ${classNames}`}
    >
      {#if useHtml}
        {@html setHtml}
      {:else if component}
        <svelte:component
          this={component}
          {modalStates}
          {modalSetStates}
          {modalClose}
        />
      {:else}
        <slot {modalStates} {modalSetStates} {modalClose} />
      {/if}
    </div>
  </div>
</main>
