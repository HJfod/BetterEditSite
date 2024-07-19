<script lang="ts">
    import type { KnownIcon } from "$lib";
    import Button from "./Button.svelte";

    export let title: string = "Home";
    export let icon: KnownIcon = "home";
</script>

<nav>
    <Button href="/" icon={icon} style="primary-filled-dark">{title}</Button>
</nav>

<style lang="scss">
    nav {
        position: fixed;
        top: 1rem;
        left: 1rem;
        display: flex;
        flex-direction: row;
    }
</style>
