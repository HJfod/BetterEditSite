
<script lang="ts">
    import type { Picture } from 'vite-imagetools';
    import Icon from './Icon.svelte';
    import Column from './Column.svelte';

    export let title: string;
    export let role: string | undefined = undefined;
    export let pfp: Picture | undefined = undefined;
</script>

<article class:pfp>
    {#if pfp}
        <div class="pfp">
            <enhanced:img src={pfp} alt="Profile picture for {title}"/>
        </div>
    {/if}
    <div class="content">
        <Column align="left" gap="tiny">
            <h2>{title}</h2>
            {#if role}<p class="role">{role}</p>{/if}
        </Column>
        {#if !pfp}<hr>{/if}
        {#if pfp}<Icon icon="quote-start" --icon-color="var(--background-500)"/>{/if}
        <p><slot/></p>
        {#if pfp}
            <span class="align-end">
                <Icon icon="quote-end" --icon-color="var(--background-500)"/>
            </span>
        {/if}
    </div>
</article>

<style lang="scss">
    @use '$lib/styles/media-queries.scss' as *;

    article {
        display: flex;
        flex-direction: row;
        gap: var(--gap-normal);
        align-items: center;
        background-color: color-mix(in srgb, var(--background-800) 50%, transparent);
        border-radius: .5rem;
        padding: 1.5rem;

        width: 13rem;
        height: 13rem;

        &.pfp {
            width: 26rem;
            height: auto;
            padding-bottom: .5rem;
                
            @include lt-sm {
                width: 100%;
                height: auto;
            }
        }
        
        @include lt-sm {
            width: 100%;
            height: auto;
        }
    
        & > .pfp {
            border: .15rem solid var(--text-50);
            border-radius: 50%;
            width: 5rem;
            flex-shrink: 0;

            & :global(img) {
                border-radius: 50%;
            }
        }

        & > .content {
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: start;
            height: 100%;

            & > hr {
                display: block;
                width: 100%;
                opacity: 25%;
                color: var(--text-50);
            }

            & .role {
                font-size: .95em;
                // font-style: italic;
                color: var(--secondary-300);
                opacity: 75%;
            }
            & h2 {
                font-size: 1.2rem;
            }

            & > .align-end {
                align-self: end;
            }
        }
        &.pfp > .content {
            gap: .25rem;
        }
    }
</style>
