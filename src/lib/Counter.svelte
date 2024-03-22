<script>
  let count = 0
  const increment = () => {
    count += 1
  }
</script>

<button on:click={increment} class="border-4 border-red-400">
  count is {count}
</button>
