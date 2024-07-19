
<script lang="ts">
    import type { Picture } from 'vite-imagetools';
    import Icon from './Icon.svelte';
    import Column from './Column.svelte';

    export let title: string;
    export let role: string | undefined = undefined;
    export let pfp: Picture | undefined = undefined;
</script>

<article style="--card-width: {pfp ? '26rem' : '13rem'}; --card-height: {pfp ? 'auto' : '13rem'}">
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
        padding-bottom: .5rem;

        width: var(--card-width);
        height: var(--card-height);
        
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
            gap: .25rem;

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
    }
</style>
