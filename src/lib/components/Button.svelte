<script lang="ts">
    import { pushState } from "$app/navigation";
    import type { KnownIcon } from "$lib";
    import Icon from "./Icon.svelte";

    type Style = 
        'primary-filled-dark' |
        'primary-filled' |
        'secondary-filled' |
        'hollow' | 
        'support-filled';
    export let style: Style = 'hollow';
    export let href: string | undefined = undefined;
    export let icon: KnownIcon | undefined = undefined;
    export let iconOnRight = false;
    export let disabled = false;
    
    function scrollToElement(id: string) {
        // Remove any existing scroll highlights
        document.querySelectorAll('.highlight-scrolled')
            .forEach(e => e.classList.remove('highlight-scrolled'));
        
        const target = document.querySelector(id);
        if (target) {
            target.classList.add('highlight-scrolled');
            target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
            const url = new URL(window.location.href);
            url.hash = id;
            pushState(url, {});
        }
    }

    function smoothScrollToAnchor(e: MouseEvent) {
        e.preventDefault();
        const anchor = (e.currentTarget! as HTMLAnchorElement);
        scrollToElement(anchor.getAttribute('href') ?? '');
    }
</script>

<a
    href={href} class={style} class:disabled
    on:click={href?.startsWith('#') ? smoothScrollToAnchor : undefined}
    on:click
>
    {#if iconOnRight}
        <slot/>
    {/if}
    {#if icon}
        <Icon {icon} />
    {/if}
    {#if !iconOnRight}
        <slot/>
    {/if}
</a>

<style lang="scss">
    @use '$lib/styles/media-queries.scss' as *;
    a {
        font-family: var(--font-body);
        text-decoration: none;

        border-style: solid;
        border-width: .15rem;
        border-radius: .15rem;

        display: flex;
        align-items: center;
        justify-content: center;
        padding: .8rem;
        gap: .8rem;
        font-size: 1.1em;
        --icon-size: 1.6em;

        @include lt-sm {
            font-size: 1em;
            padding: .4rem;
            gap: .4rem;
            --icon-size: 1.2em;
        }

        transition: color, background-color, border-color, transform;
        transition-duration: var(--transition-duration);

        cursor: pointer;
        user-select: none;

        // &:hover {
        //     transform: scale(105%) translateY(-.2em);
        // }

        &.primary-filled-dark {
            color: var(--primary-300);
            background-color: var(--primary-950);
            border-color: var(--primary-950);
            box-shadow: 0px .1rem .5rem color-mix(in srgb, var(--primary-950) 50%, transparent);
            &:hover {
                color: var(--secondary-950);
                background-color: var(--primary-50);
                border-color: var(--primary-50);
            }
        }
        &.primary-filled {
            color: var(--primary-950);
            background-color: var(--primary-500);
            border-color: var(--primary-500);
            box-shadow: 0px .1rem .5rem color-mix(in srgb, var(--primary-950) 50%, transparent);
            &:hover {
                color: var(--secondary-950);
                background-color: var(--primary-50);
                border-color: var(--primary-50);
            }
        }
        &.secondary-filled {
            color: var(--secondary-950);
            background-color: var(--secondary-300);
            border-color: var(--secondary-300);
            box-shadow: 0px .1rem .5rem color-mix(in srgb, var(--secondary-950) 50%, transparent);
            &:hover {
                color: var(--secondary-950);
                background-color: var(--secondary-50);
                border-color: var(--secondary-50);
            }
        }
        &.hollow {
            color: var(--text-50);
            background-color: transparent;
            border-color: var(--text-50);
            box-shadow: 0px .1rem .5rem color-mix(in srgb, var(--text-950) 50%, transparent);
            &:hover {
                color: var(--text-950);
                background-color: var(--text-50);
                border-color: var(--text-50);
            }
        }
        &.support-filled {
            color: var(--secondary-950);
            background-color: var(--support-500);
            border-color: var(--support-500);
            box-shadow: 0px .1rem .5rem color-mix(in srgb, var(--secondary-950) 50%, transparent);
            &:hover {
                color: var(--secondary-950);
                background-color: var(--secondary-50);
                border-color: var(--secondary-50);
            }
        }
        &.disabled {
            pointer-events: none;
            color: var(--background-50);
            background-color: var(--background-800);
            border-color: var(--background-800);
            opacity: 35%;
        }
    }

</style>
