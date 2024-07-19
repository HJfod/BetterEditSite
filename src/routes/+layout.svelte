<script lang="ts">
    import "../app.scss";
    import bgWaves from "$lib/assets/background.svg?raw";
</script>

<span id="top-bg">
    {@html bgWaves}
</span>

<div><main><slot/></main></div>

<span id="bottom-bg">
    {@html bgWaves}
    <p>(c) HJfod 2024</p>
</span>

<style lang="scss">
    @use '$lib/styles/media-queries.scss' as *;

    div {
        display: flex;
        flex-direction: column;
        padding-top: 12rem;
        padding-bottom: 12rem;
        padding-left: 8rem;
        padding-right: 8rem;
        align-items: center;

        @include lt-lg {
            padding-left: 4rem;
            padding-right: 4rem;
        }

        & > main {
            width: min(90vw, 130ch);
            min-height: calc(100vh - 24rem);
            display: flex;
            flex-direction: column;
            align-items: start;
            gap: var(--gap-normal);

            @include lt-lg {
                align-items: center;
            }
        }
    }

    #top-bg {
        position: absolute;
        width: 100%;
        transform: scaleY(-100%) scaleX(-100%);
        z-index: -10;
        pointer-events: none;

        :global(svg) {
            display: block;
        }
    }
    #bottom-bg {
        position: relative;
        width: 100%;
        z-index: -10;
        pointer-events: none;
        margin-top: -10rem;

        @include lt-sm {
            margin-top: -5rem;
        }

        p {
            position: absolute;
            margin-top: -3rem;
            margin-left: 2rem;
            font-family: var(--font-body);
            color: var(--text-950);
            font-weight: bold;
        }

        :global(svg) {
            display: block;
        }
    }
</style>
