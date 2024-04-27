<script>
  import ModalP from "../package/Modal.svelte";
  import Modal from "./Modal.svelte";
</script>

<ModalP
  btn_in_box
  btn_style="solisoma-modal-text-blue-400"
  visible
  useHtml
  onClose={() => {}}
  setHtml="<div>Hello</div>"
/>

<Modal
  btn_in_box
  btn_style="text-blue-400"
  visible={false}
  useHtml
  onClose={() => {}}
  setHtml="<div>Hello</div>"
/>
