# @solisoma/svelte-modal

The **@solisoma/svelte-modal** package provides a customizable and easy-to-use modal component for Svelte applications. With this package, you can quickly integrate modals into your Svelte projects with minimal configuration.

## Installation

You can install the **@solisoma/svelte-modal** package via npm:

```bash
npm install @solisoma/svelte-modal
```

## Usage

To use the modal component in your Svelte application, import it into your component and include it in your template.

```svelte
<script>
  import Modal from '@solisoma/svelte-modal';
</script>

<Modal>
  <!-- Your modal content goes here -->
</Modal>
```

Keeping it at the bottom of your html code is recommended;

```svelte
<script>
  import Modal from '@solisoma/svelte-modal';
</script>

<main>
    <!-- Your HTML tags goes here-->
</main>

<Modal>
  <!-- Your modal content goes here -->
</Modal>
```

## Props

The **@solisoma/svelte-modal** supports the following props:

- **visible**: Boolean value indicating whether the modal is visible.
- **useHtml**: Boolean value, indicating that we are using the `@html` for rendering. That means `Modal` should expect a string.
- **setHtml**: String value, holding the html to be rendered.
- **onClose**: Callback function invoked when the modal is closed. It passes `state` as first argument to the function, if initialState was given.
- **initialState**: Object value, holding the initial state of the form in the modal.
- **classNames**: String value use for styling the modal.
- **component**: Svelte component passed as value to be rendered inside the modal.

**@solisoma/svelte-modal** act like a parent component expecting a child. The child is the actual content to be rendered inside the `Modal`.

There are three ways to pass a child to the `Modal`:

- Using string html
- Passing a Svelte component to the `component` prop
- Passing a Svelte component as a direct child

Let break each method down:

### Using string html

Here @solisoma/svelte-modal expects a html written in string format. It uses the `@html` tag to render the html. Let's write a code to explain better.

```svelte
<script>
  import Modal from '@solisoma/svelte-modal';
</script>

<main>
    <!-- Your HTML tags goes here-->
</main>

<Modal visible useHtml setHtml="<div>HelloWorld!</div>" />
```

It's important to use `useHtml` and `setHtml` with caution, as it can expose your application to security vulnerabilities if used improperly, such as by injecting untrusted or unsanitized user input. Always validate and sanitize user-generated content before using it with `setHtml` to prevent cross-site scripting (XSS) attacks.

### Passing a Svelte component to the `component` prop

To implement this feature, you'll need to create another Svelte component responsible for rendering the interface of the `Modal`. Keep in mind that **@solisoma/svelte-modal** passes certain props to its child, whether passed through the `component` prop or as a direct child. These props include:

- `modalClose`: A function prop that enables the developer to close the `Modal` based on events like `on:click`. It doesn't require any parameters.

- `modalState`: This prop holds the current value of the state passed to the `Modal`.

- `modalSetStates`: Used for `setState`, this prop updates the state of the `modalState`.

Here's an example of the child component:

```svelte
// Component.svelte

<script>
  export let modalClose;
  export let modalStates;
  export let modalSetStates;
</script>

<div>
  <p>Hello</p>
  <button on:click={modalClose}>Close Modal</button>
</div>
```

And here's how you would use it with the `Modal` component:

```svelte
<script>
  import Component from "./Component.svelte";
  import Modal from '@solisoma/svelte-modal';
</script>

<main>
  <!-- Your HTML tags go here -->
</main>

<Modal
  visible
  onClose={() => console.log('Modal closed')}
  initialState={{ name: "solisoma", desc: "modal" }}
  component={Component}
/>
```

In the provided example, the child component is passed using the `component` prop.

### Passing a Svelte component as a direct child

In this approach, similar to the previous method, we include the child component directly as a child of the `Modal` component.

Example:

```svelte
// Component.svelte

<script>
  export let modalClose;
  export let modalStates;
  export let modalSetStates;
</script>

<div>
  <p>Hello</p>
  <button on:click={modalClose}>Close Modal</button>
</div>

```

```svelte
<script>
  import Component from "./Component.svelte";
  import Modal from '@solisoma/svelte-modal';
</script>

<main>
  <!-- Your HTML tags go here -->
</main>

<Modal
  visible
  onClose={() => console.log('Modal closed')}
  initialState={{ name: "solisoma", desc: "modal" }}
>
  <Component />
</Modal>
```

This method allows you to pass additional props to the child component if needed, as shown below:

```svelte
<script>
  import Component from "./Component.svelte";
  import Modal from '@solisoma/svelte-modal';
</script>

<main>
  <!-- Your HTML tags go here -->
</main>

<Modal
  visible
  onClose={() => console.log('Modal closed')}
  initialState={{ name: "solisoma", desc: "modal" }}
>
  <Component borderColor="red" />
</Modal>
```

## Styling

The `Modal` component comes with minimal default styling to ensure flexibility and ease of customization. You can apply your own styles by passing them to the `classNames` prop. The `classNames` prop accepts only class names. It's important to note that any styles provided to the modal will override the default styling.

Here's an example of applying custom styles using TailwindCSS:

```svelte
<Modal
  visible
  onClose={() => console.log('Modal closed')}
  initialState={{ name: "solisoma", desc: "modal" }}
  classNames="border-2 border-red-300"
>
  <Component borderColor="red" />
</Modal>
```

While TailwindCSS is used in the example, you can utilize any CSS framework or custom styles to achieve the desired look and feel for your modal component.
