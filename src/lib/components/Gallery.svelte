
<script lang="ts">
    import { onMount } from "svelte";
    import Icon from "./Icon.svelte";

    export let title: string;
    export let images: string[];

    let gallery: HTMLElement;
    let navContainer: HTMLElement;
    let imgContainer: HTMLElement;
    let currentIndex: number;
    let touchStart: number | undefined;

    function select(index: number, longerTimeout: boolean) {
        // wrap around
        if (index >= navContainer.children.length) {
            index = 0;
        }
        if (index < 0) {
            index = navContainer.children.length - 1;
        }

        let i = 0;
        for (const child of navContainer.children) {
            child.classList.toggle('selected', i === index);
            i += 1;
        }

        gallery.querySelector('main > div')!.scroll({
            left: (gallery.querySelector('main > div')!.children.item(index)! as HTMLElement).offsetLeft,
            behavior: 'smooth'
        });
        currentIndex = index;

        clearTimeout(parseInt(gallery.getAttribute('timeout-id') ?? ''));
        gallery.setAttribute(
            'timeout-id',
            setTimeout(() => select(index + 1, false), longerTimeout ? 5000 : 3500).toString()
        );
    }
    function handleSwipeStartOrClick(touchPos: number, click: boolean) {
        const rect = gallery.getBoundingClientRect();
        const hitZone = rect.width / 6;

        // Remove any existing touch-start attribute
        touchStart = undefined;

        // Swipe if the touch wasn't within the side click area
        if (click) {
            if (touchPos <= rect.left + hitZone) {
                select(currentIndex - 1, true);
            }
            else if (touchPos >= rect.right - hitZone) {
                select(currentIndex + 1, true);
            }
        }
        else {
            if (touchPos > rect.left + hitZone && touchPos < rect.right - hitZone) {
                touchStart = touchPos;
            }
        }
    }
    function handleSwipeMove(touchPos: number) {
        if (touchStart !== undefined) {
            const rect = gallery.getBoundingClientRect();

            // Make sure the swipe is long enough
            if (Math.abs(touchPos - touchStart) > rect.width / 6) {
                select(currentIndex + (touchPos > touchStart ? -1 : 1), true);

                // Don't trigger multiple times
                touchStart = undefined;
            }
        }
    }
    
    onMount(() => {
        select(0, false);
    });

</script>

<div bind:this={gallery} class="gallery" style="--image-count:{images.length}">
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <main
        on:click={e => handleSwipeStartOrClick(e.clientX, true)}
        on:touchstart={e => handleSwipeStartOrClick(e.touches[0].clientX, false)}
        on:touchmove={e => handleSwipeMove(e.touches[0].clientX)}
        on:keydown={e => {}}
    >
        <div bind:this={imgContainer}>
            {#each images as src}
                <enhanced:img {src} alt={title} />
            {/each}
        </div>
        <nav>
            <div><Icon icon="left"/></div>
            <div><Icon icon="right"/></div>
        </nav>
    </main>
    <footer bind:this={navContainer}>
        {#each images as _, i}
            <button
                data-index={i}
                on:click={e => select(i, true)}
            />
        {/each}
    </footer>
</div>

<style lang="scss">
    @use '$lib/styles/media-queries.scss' as *;
    .gallery {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--gap-small);

        --gallery-size: 30rem;
        --icon-size: calc(var(--gallery-size) / 18);

        @include lt-sm {
            --gallery-size: 20rem;
        }

        & > main {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            justify-content: stretch;
            align-items: stretch;
            width: var(--gallery-size);
            overflow: hidden;
            border-radius: .3rem;
            border: .15rem solid var(--text-100);
            box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.5);

            & > div {
                box-sizing: border-box;
                position: relative;
                line-height: inherit;

                display: grid;
                grid-template-columns: repeat(var(--image-count), var(--gallery-size));

                overflow: hidden;
                user-select: none;
                border-radius: .3rem;

                & :global(img) {
                    display: block;
                    user-select: none;
                    width: var(--gallery-size);
                    height: auto;
                }
            }
            & > nav {
                position: relative;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: stretch;
                user-select: none;
                opacity: 0%;
                transition: opacity var(--transition-duration);
                
                & > div {
                    color: var(--text-50);
                    background-color: rgba(0, 0, 0, 75%);
                    width: 16.6%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    pointer-events: none;
                    user-select: none;
                }
            }
            & > nav, & > div {
                grid-row: 1;
                grid-column: 1;
            }
            &:hover > nav, &:active > nav {
                opacity: 100%;
            }
        }
        & > footer {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: var(--gap-small);
        }
    }

    button {
        width: 1rem;
        height: 1rem;
        border-radius: 9999px;

        background-color: rgba(255, 255, 255, 0);
        border: .15rem solid var(--text-50);
        opacity: 25%;

        cursor: pointer;
        transition-duration: var(--transition-duration);
        &:hover {
            opacity: 50%;
        }

        &:global(.selected) {
            background-color: var(--text-50);
            width: 1rem;
            height: 1rem;
            opacity: 100%;
        }
    }
</style>
