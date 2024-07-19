<script lang="ts">
    export let src: string;
    export let alt: string;
    export let style: 'glow' | 'shadow' | undefined = undefined;
    export let size: string = 'min(90ch, 90vw)';
</script>

<div style="--img-size: {size}">
    <enhanced:img {src} {alt} class="{style}" sizes={size} />
</div>

<style lang="scss">
    div {
        max-width: var(--img-size);
        & > :global(picture > img) {
            border-radius: .25rem;
            width: 100%;
            height: auto;
            &.glow {
                box-shadow: 0 0 7rem color-mix(in srgb, var(--primary-500) 25%, transparent);
            }
            &.shadow {
                box-shadow: 0 0 5rem color-mix(in srgb, var(--background-700) 75%, transparent);
            }
        }
    }
</style>
