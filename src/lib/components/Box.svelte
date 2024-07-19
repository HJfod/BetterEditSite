
<script lang="ts">
    export let type: 'warning' | undefined = undefined;
</script>

<div class={type}><p><slot/></p></div>

<style lang="scss">
    div {
        background-color: color-mix(in srgb, var(--bg-color) 25%, transparent);
        padding: 1.6rem;
        border-radius: .5rem;

        --bg-color: var(--background-500);

        &.warning {
            --bg-color: #ffb52b;
        }
    }
</style>
